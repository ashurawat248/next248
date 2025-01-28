import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server"


export async function POST(req:Request){
    try {
        const {title, isFree, difficulty} = await req.json();

        // console.log(title, isFree, 'vall')

        if (!title) {
            return NextResponse.json(
                { error: "Missing 'title' in request body" },
                { status: 400 }
            );
        }

        const quiz = await db.mockTest.create({
            data: {
                title,
                isFree,
                difficulty
            }
        })

        return NextResponse.json(quiz)
    } catch (error) {
        console.log(error)
        return NextResponse.json('Internal server', {status: 500})
    }
}

export async function GET(req:Request){
    try {
        const mockTest = await db.mockTest.findMany({
            where:{
                isFree:true
            },
            include: {
                sections: {
                    include: {
                        questions:true
                    }
                }
            }
        })
        return NextResponse.json(mockTest)
    } catch (error) {
        return NextResponse.json("Internal server", {status:500})
    }
}