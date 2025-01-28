import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";



export async function GET(req:Request, {params}:{params: {mockTestId:string}}) {
    try {
        // const user = await currentUser()
        const {mockTestId} = await params
        // console.log(params.mockTestId, 'ttt')

        const topper = await db.quizResult.findFirst({
            where: {
                mockTestId
            },
            orderBy:{
                score: "desc"
            }
        })

        if(!topper) {
            return NextResponse.json("No Result Found", {status: 404})
        }

        return NextResponse.json(topper, {status: 200})

    } catch (error) {
        return NextResponse.json("Something went wrong", {status: 500})
    }
}