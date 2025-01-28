import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function POST(req:Request) {
    const { userId, mockTestId, selectedAnswers } = await req.json()
    console.log(userId, mockTestId, selectedAnswers, 'answress')
    
    try {
        if(!userId || !mockTestId) {
            return NextResponse.json("Unauthorized", {status: 402})
        }

        const existingAnswer = await db.userAnswer.findFirst({
            where: {
                    userId,
                    mockTestId
            }
        });

        console.log(existingAnswer, 'seleced')

        if (existingAnswer) {
            // If answer already exists, return an error
            return NextResponse.json(existingAnswer, {status: 200 });
        }

        const createAnswers = await db.userAnswer.create({
            data: {
                userId,
                mockTestId,
                selectedAnswer:selectedAnswers
            }
        })

        console.log('Answer Created:', createAnswers)

        return NextResponse.json(createAnswers, {status: 200})

    } catch (error) {
        console.log('selected', error)
        return NextResponse.json("Something went wrong", {status:500})
    }
}
