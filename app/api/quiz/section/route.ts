import { db } from "@/lib/prismadb"
import { NextResponse } from "next/server"



export async function POST(req:Request){
    try {
        const body = await req.json()
        const {name, breakAfter, difficulty, testId} = body
        // console.log(body, 'work')

        if(!testId ){
            return NextResponse.json("Unauthorized", {status: 401})
        }
        

        const section = await db.section.create({
            data: {
                name,
                breakAfter,
                difficulty, 
                testId
                // test: {
                //     connect: { id: testId }  // This connects the section to an existing MockTest by its testId
                // }
            }
        })

        return NextResponse.json(section)

    } catch (error) {
        console.error('Section creation error:', error);
        return NextResponse.json("Internal server", {status: 500})
    }
}