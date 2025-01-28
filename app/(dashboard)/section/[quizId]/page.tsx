import { IconBadge } from '@/components/Icon-badge';
import { db } from '@/lib/prismadb';
import { LayoutDashboard, ListChecks } from 'lucide-react'
import { redirect } from 'next/navigation';
import React from 'react'
import TitleForm from './_component/TitleForm';
import { SectionForm } from './_component/SectionForm';
import Link from 'next/link';
import TrashButton from '../question/[sectionId]/_component/TrashButton';

const page = async ({params}:{params: {quizId:string}}) => {

    console.log(params, 'idss')
    const quizId = params?.quizId;

    
    const mockTest = await db.mockTest.findUnique({
        where: {
            id: quizId,
        },
        include: {
            sections: {
                include: {
                    questions: true
                }
            },
        },
    })

    console.log(mockTest?.sections, 'tesst')

    const sections = await db.section.findMany({
        orderBy: {
            name: 'asc'
        }
    })

    

    if(!mockTest) {
        return redirect('/')
    }

    const requiredFields = [
        mockTest.title,
        mockTest.sections.length > 0, // Ensure there is at least one section
        mockTest.sections.every(section => section.questions.length > 0) // Ensure every section has at least one question
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`
  return (
    <div className='p-6'>
        <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-y-2'>
                <h1>Section setup</h1>
                <span className='text-sm text-slate-700'>
                    Complete all fields {completionText}
                </span>
            </div>
        </div>

        <div className='grid hrid-cols-1 md:grid-cols-2 gap-6 mt-16'>
            <div>
                <div className='flex items-center gap-c-2'>
                <IconBadge  icon={LayoutDashboard}/>
                <h2 className='text-xl'>
                        Customize your Section
                    </h2>
                </div>
                <TitleForm initialData={mockTest} mockTestId={mockTest?.id} />
                <SectionForm mockTestId={mockTest.id} />
            </div>
            <div className="space-y-6">
                <div>
                <div className="flex items-start gap-x-2">
                            <IconBadge icon={ListChecks} />
                            <h2 className="text-xl">
                                Sections & Questions
                            </h2>
                        </div>
                        <div className='flex flex-col items-center'>
                        {mockTest?.sections.map((section) => (
                            <div 
                            key={section.id} 
                            className="space-y-4 mt-6 border flex justify-between items-center bg-slate-100 rounded-md p-4 w-full">
                               <Link href={`/section/question/${section?.id}`}>
                                <h3 className="font-semibold">{section?.name}</h3>
                               </Link>
                                <TrashButton sectionId={section?.id}/>
                            </div>
                        ))}
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page
