'use client'
import { User2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Progress } from "@/components/ui/progress"
import { FaGraduationCap } from 'react-icons/fa'
import { GiProgression } from "react-icons/gi";
import Image from 'next/image'


interface LeftDivProps {
  totalCorrectAnswers: number
  totalQuestions: number
  completed:boolean
  score: number
  toppers:number
  createdAt:string
}

const LeftDiv = ({totalCorrectAnswers, toppers, totalQuestions, createdAt, completed, score}:LeftDivProps) => {
    const {test} = useSelector((store:any) => store.section)
    const [progress, setProgress] = useState({
      totalCorrectAnswers: 0,
      progressPercentage: 0,
    });
    console.log(test,toppers, createdAt, totalQuestions, progress.progressPercentage, 'left diiv')
  
    
    
    useEffect(() => {
        const progressPer = (score / totalQuestions) * 100;
        const progressRounded = Number(progressPer.toFixed(0));
        // Simulate delay for updating progress values
        const timer = setTimeout(() => {
      
          if(completed) {
            setProgress({
              totalCorrectAnswers: score,
              progressPercentage:progressRounded
            })
          } else {
            setProgress({
              totalCorrectAnswers: totalCorrectAnswers,
              progressPercentage: progressRounded,
            });
          }
          }, 500); // You can adjust the delay time as needed
    
        // Cleanup timeout when the component unmounts
        return () => clearTimeout(timer);
      }, [totalCorrectAnswers]);

      const formatDate = (dateString: string | null) => {
        // Convert the date string to a Date object
        const createdAt = dateString ? new Date(dateString) : null;
      
        // Check if the createdAt date is valid
        const formattedDate =
          createdAt && !isNaN(createdAt.getTime())
            ? new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeStyle: "short" }).format(createdAt)
            : "Date not available"; 
      
        return formattedDate;
      };
      

      const formattedCompletionDate = test?.createdAt ? formatDate(createdAt) : "Date not available";

  return (
    <div className='w-full flex justify-between my-2 p-3 bg-gradient-to-t from-blue-300 to-white rounded-lg'>
      <div className='w-full'>
      <div className="flex flex-col justify-center items-center max-w-md ml-40">
      <h3 className="text-2xl font-semibold mt-2">Test Completion Date</h3>
        <p>{formattedCompletionDate}</p>
      </div>
      <div className='flex flex-col max-w-md px-18'>
     <h3 className='text-sm  font-semibold text-dark uppercase'>
      Your Score
      </h3>
        <p className='text-8xl px-6'>{progress.totalCorrectAnswers}</p> 
        <h2 className='flex items-center gap-2 w-full'>
        <Progress value={progress.totalCorrectAnswers} color='blue-700'/>
        </h2>
        </div>
        <h3 className='text-sm font-semibold mt-4'>TOPPERS</h3>
        <div className='flex flex-col items-center max-w-md px-18'>
          <p className='text-5xl'>{toppers}</p>
          <h2 className='flex items-center gap-2 w-full'>
          <FaGraduationCap size={20} />
            <Progress value={toppers}/>
          </h2>
        </div>
        <h3 className='text-sm font-semibold mt-4'>PROGRESS</h3>
      <div className='flex flex-col items-center max-w-md px-18'>
        <p className='text-5xl'>{progress.progressPercentage}%</p> 
        <h2 className='flex items-center gap-2 w-full'>
         <GiProgression  size={20}/>
        <Progress value={progress.progressPercentage}/>
        </h2>
        </div>
    </div>
    <div className='w-full'>
        <Image src={"/study.png"} alt='study' width={400} height={400} className='mt-48'/>
      </div>
    </div>
  )
}

export default LeftDiv
