import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";
// import {Resend} from "resend"
// import KoalaWelcomeEmail from "@/components/email-template";

export async function POST(req: Request) {
  // const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await req.json();

    const { mockTestId, userId, score, selectedAnswer, userEmail, totalQuestions } = body;

    console.log(mockTestId, userId, score, userEmail, selectedAnswer, totalQuestions, process.env.RESEND_API_KEY, 'id');

    if (!userId || !mockTestId || !score || !totalQuestions) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const existingResult = await db.quizResult.findFirst({
      where: { 
        userId, 
        mockTestId 
      },
      include: { 
        mockTest: { 
            include: { 
                sections: { 
                    include: { 
                        questions: {
                          orderBy: {
                            createdAt: 'asc'
                          }
                        }, 
                    }, 
                }, 
            }, 
        }, 
    },
    });

    if (existingResult) {
      return NextResponse.json(existingResult, { status: 200 });
    }

    const result = await db.quizResult.create({
      data: {
        mockTestId,
        score,
        selectedAnswer,
        completed: true,
        userId,
        totalQuestions
      },
    });

    // const info = await resend.emails.send({
    //   from: "allteam@numbernerdacademy.com",
    //   to: userEmail,
    //   subject: "Your Test Results for Mock Test",
    //   react: KoalaWelcomeEmail({score})
    // })

    console.log('Message Sent', result);
    
    
    
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error, 'hass');
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}


//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     // host: SMTP_SERVER_HOST,
//     port: 587,
//     secure: true,
//     auth: {
//       user: process.env.SMTP_SERVER_USER,
//       pass: process.env.SMTP_SERVER_PASSWORD,
//     },
//   });

//   const subject = `Your Test Results for Mock Test`;
//   const text = `Hello PD,\n\nThank you for completing the mock test. Your score is ${score} out of ${totalQuestions}.\nKeep up the great work as you continue your learning journey.`;
//   const html = `
//   <p>Hello <strong>PD</strong>,</p>
//   <p>Thank you for completing the mock test. Here are your results:</p>
//   <p>Score: <strong>${score}</strong> out of <strong>${totalQuestions}</strong>.</p>
//   <p>We hope this helps you on your learning journey. Keep going!</p>
// `;