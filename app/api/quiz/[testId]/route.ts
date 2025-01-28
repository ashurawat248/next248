import { db } from "@/lib/prismadb"
import { NextResponse } from "next/server"


export async function GET(req:Request, {params}:{params:{testId:string}}){
    // console.log(params.testId, 'ddd')
    const {testId } = await params
    try {
        const mockTest = await db.mockTest.findUnique({
            where: {
                id: testId 
            },
            include: {
                sections: {
                    orderBy: { 
                        createdAt: 'asc' 
                    },
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

export async function DELETE(req:Request, {params}:{params: {testId: string}}){
    const testId = params?.testId
    console.log(testId, 'idss')

    try {
        const deletedTest = await db.mockTest.delete({
            where: { 
                id: testId 
            }
        })

        if (!deletedTest) {
            return NextResponse.json("Failed to delete the test", { status: 402 });
        }
        return NextResponse.json("Test has been Deleted", {status: 200})
    } catch (error) {
        console.error('Error deleting test:error', error)
        return NextResponse.json("Something went wrong", {status: 500})
    }
}