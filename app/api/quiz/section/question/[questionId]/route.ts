import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { questionId: string } }) {
  const questionId = params.questionId;
  // console.log(questionId, 'working');
  try {
    if (!questionId) throw new Error("No Question Found");

    const deleteQuestion = await db.question.delete({
      where: {
        id: questionId,
      },
    });

    return NextResponse.json({ message: 'Question deleted successfully', deleteQuestion });

  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong', status: 500 });
  }
}

export async function PATCH(req: Request, {params}:{params:{questionId:String}}){
  const { questionId } = params;  // Awaiting not needed here
  const { questionText, questionType, imageSrc, score, solutionSrc, videoSrc, answers, correctAnswer } = await req.json();

  try {
    if(!questionId) {
      return NextResponse.json("Can't find a Question", {status:402});
    }

    await db.question.update({
      where: {
        id: questionId
      },
      data: { 
        questionText, 
        questionType, 
        imageSrc, 
        score, 
        solutionSrc, 
        videoSrc, 
        answers, 
        correctAnswer 
      }
    });

    return NextResponse.json("Your Question is updated successfully!", {status:200});
  } catch (error) {
    return NextResponse.json("Something went wrong", {status:500});
  }
}


export async function GET(req: Request, {params}:{params:{questionId:String}}){
  const questionId = await params.questionId
  try {
    if(!questionId) {
      return NextResponse.json("Can't find a Question", {status:402})
    }

    const singleQuestion = await db.question.findFirst({
      where:{
        id: questionId
      }
    })

    return NextResponse.json(singleQuestion, {status:200})

  } catch (error) {
    return NextResponse.json("Something went wrong", {status:500})
  }
}


