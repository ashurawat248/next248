import { db } from '@/lib/prismadb'
import React from 'react'
import TrashButton from './TrashButton';
import Link from 'next/link';

const AllQuestions = async ({sectionId}:{sectionId:string}) => {

    const questions = await db.section.findUnique({
        where: {
            id: sectionId,
        },
        include:{
            questions:true
        }
    })

    console.log(questions?.questions)
      

   

  return (
    <div className='space-y-6 w-full px-20'>
      {questions?.questions.map((item, index) => (
        <Link href={`/section/question/updatequestion/${item.id}`}>
        <div key={index} 
        className="space-y-4 mt-6 flex items-center justify-between border bg-slate-100 rounded-md p-4 w-full hover:cursor-pointer">
        <h1>{item.questionText}</h1>
        <TrashButton itemId={item.id}/>
        </div>
          </Link>
      ))}
    </div>
  )
}

export default AllQuestions
