import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { testId: string } }) {
    const {testId} = await params;
    try {
        const testResult = await db.quizResult.findFirst({
            where: {
                mockTestId: testId 
            },
            include: { 
                mockTest: { 
                    include: { 
                        sections: { 
                            include: { 
                                questions: true, 
                            }, 
                        }, 
                    }, 
                }, 
            },
        });

        // console.log(testResult, 'akk')

        if (!testResult) {
            return NextResponse.json({ message: "No result found for this test" }, { status: 404 });
        }

        return NextResponse.json(testResult, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
