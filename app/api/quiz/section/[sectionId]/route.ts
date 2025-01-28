import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function DELETE(req:Request, {params}:{params:{sectionId: string}}){
    const sectionId = params.sectionId;
    // console.log(sectionId, 'working');
    try {
      if (!sectionId) throw new Error("No Question Found");
  
      const deleteSection = await db.section.delete({
        where: {
          id: sectionId,
        },
      });
  
      return NextResponse.json({ message: 'Section deleted successfully', deleteSection });
  
    } catch (error) {
      return NextResponse.json({ message: 'Something went wrong', status: 500 });
    }
}