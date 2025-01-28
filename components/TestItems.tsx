'use client'
import React, { useCallback, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from 'next/image'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'

import StartQuiz from './StartQuiz'
import { useRouter } from 'next/navigation';

  

interface TestItemsProps {
    id: string
    title: string
    isFree: boolean
    sections: []
}

const TestItems = ({id, title, isFree}:TestItemsProps) => {
  const router = useRouter()
  const {purchaseStatus, user} = useSelector((store:any) => store.section)
  const [showModal, setShowModal] = useState(false);
 
  
  console.log(user)

  const results = user?.newUser?.userResult
  
  const hasCompletedTest = results && results?.some((result:any) => result?.mockTestId === id && result?.userId === user?.newUser?._id);
  

  console.log(purchaseStatus, hasCompletedTest, results, 'tsult')

  const handleButtonClick = useCallback((id:any) => {
    console.log(id, 'ss')
    if (hasCompletedTest) {
      // Redirect to the results page
      router.push(`/finesh/${id}`);
    } else {
        setShowModal(true)
      }
  },[router]);
    
    const link = `/quiz/${id}`
  
  return (
    <div>
        <Card>
        <CardHeader>
            <CardTitle className='text-sm'>SAT Online Practice Test</CardTitle>
            <CardDescription>{title}</CardDescription>
        </CardHeader>
        <CardContent>
            <Image src={'/freeevent.png'} alt='free' width={150} height={48} className='object-cover'/>
        </CardContent>
        <CardFooter>
            <Button size="sm"  onClick={() => handleButtonClick(id)} className={`${isFree && "bg-blue-500 text-white"}`}>
              {hasCompletedTest ? "View Result" : "Start Course"}
              </Button>
           {showModal && (<StartQuiz setShowModal={setShowModal} link={link}/>)}
        </CardFooter>
        </Card>
    </div>
  )
}

export default TestItems
