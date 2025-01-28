import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary";


export async function POST(req:Request){
    try {
        const {questionText, sectionId, questionType, imageSrc, solutionSrc, videoSrc, answers, correctAnswer} = await req.json();

        
        if(!sectionId || !questionType || !questionText){
            return NextResponse.json('Internal server', {status: 401})
        }

        const processedAnswers = answers.map((answer:any) => answer.toLowerCase().replace(/\s+/g, ''));
        const processedCorrectAnswer = correctAnswer.toLowerCase().replace(/\s+/g, '');
        console.log(questionText, sectionId, questionType, solutionSrc, videoSrc, imageSrc, processedAnswers, processedCorrectAnswer, 'work')
        
        const question = await db.question.create({
            data: {
                questionText,  
                questionType, 
                answers:processedAnswers, 
                imageSrc,
                solutionSrc,
                videoSrc,
                correctAnswer:processedCorrectAnswer,  
                section: {
                    connect: {id: sectionId}
                }
            }
        })

        if(videoSrc) {
            const videoPublicId = videoSrc.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(videoPublicId, { resource_type: 'video' })
        }

        if(imageSrc) {   
            const imagePublicId = imageSrc.split('/').pop().split('.')[0]; // Extract public_id from
            await cloudinary.uploader.destroy(imagePublicId)
        }
        if(solutionSrc) {   
            const imagePublicId = solutionSrc.split('/').pop().split('.')[0]; // Extract public_id from
            await cloudinary.uploader.destroy(imagePublicId)
        }

        return NextResponse.json(question)
    } catch (error) {
        console.log(error)
        return NextResponse.json('Internal server', {status: 500})
    }
}