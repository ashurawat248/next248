import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function GET(req:Request){
    const { searchParams } = new URL(req.url);
    const difficulty = searchParams.get('difficulty');
    console.log(difficulty, 'params')
    try {
        const test = await db.mockTest.findMany({
            where:{
                difficulty: difficulty 
            },
            include:{
               sections:{
                include:{
                    questions:true
                }
            }
            }
        })

        if(!test){
            return NextResponse.json({message:"No Test Found", status:401})
        }

        return NextResponse.json(test, {status:200})

    } catch (error) {
        return NextResponse.json({message: "Something went wrong", status:500})
    }
}