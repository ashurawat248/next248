import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { db } from "@/lib/prismadb";
import bcrypt from "bcrypt"
import nodemailer from 'nodemailer';


export async function POST(req:Request){
    const { email, password } = await req.json();

    if (!email || !password) { 
        return NextResponse.json({ message: "Email and password are required" }, { status: 402 }); 
    }

    const verificationCode = Math.floor(100000 + Math.random() * 90000).toString(); 
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    console.log(verificationCode, 'my code')

    const token = jwt.sign({ email, password }, process.env.SECRET_KEY!, { expiresIn: '15m' });

    await db.verification.create({ 
        data: { 
            email, 
            code: verificationCode, 
            expiresAt 
        } 
    });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS
        }
    });

    const mailOptions = { 
        from: process.env.NODEMAILER_EMAIL, 
        to: email, 
        subject: 'Your Verification Code', 
        text: `Your verification code is ${verificationCode}. It will expire in 15 minutes.`, // Plain text version
        html: `<p>Your verification code is <strong>${verificationCode}</strong>. It will expire in 15 minutes.</p>` // HTML version
    };
    


    const sendingEmail = await transporter.sendMail(mailOptions);
    console.log(transporter, mailOptions, sendingEmail, 'VS')

    return NextResponse.json({ message: "Verification code sent", token }, { status: 200 });
}



export async function PUT(req:Request) {
    const { verificationCode, token } = await req.json();
    console.log(verificationCode, token, 'tokk')

    if (!verificationCode || !token) {
        return NextResponse.json({ message: "Verification code is required" }, { status: 402 });
    }

    try {

        const decoded = jwt.verify(token, process.env.SECRET_KEY!);

         const { email, password } = decoded;
         console.log(email, password)

        const verificationRecord = await db.verification.findFirst({
            where: { 
                email, 
                code: verificationCode, 
                expiresAt: { gte: new Date() } 
            }
        });

        console.log(verificationRecord, 'reccc')

        if (!verificationRecord) {
            return NextResponse.json({ message: "Invalid or expired verification code" }, { status: 404 });
        }

        const user = await db.user.findFirst({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.user.update({
            where: {
                id: user.id
            },
            data: {
                password: hashedPassword
            }
        });

        await db.verification.delete({
            where: {
                id: verificationRecord.id
            }
        });

        return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating password: ", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
