import { db } from "@/lib/prismadb"
import { NextResponse } from "next/server"



export async function GET(req:Request){
    try {
        const result = await db.quizResult.findMany({})

        // console.log(result, 'rsulttt')

        if(!result) {
            return NextResponse.json("Can'y have Result", {status: 402})
        }

        return NextResponse.json(result, {status: 200})
        
    } catch (error) {
        return NextResponse.json("Something wnet wrong", {status: 500})
    }
}