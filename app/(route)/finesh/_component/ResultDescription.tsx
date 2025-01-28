import { Separator } from '@/components/ui/separator'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import React from 'react'

const ResultDescription = () => {
  return (
    <div>
    <div className='w-80 h-[40%] px-3 border-black my-2 
    rounded-xl py-2 relative overflow-hidden bg-gradient-to-t from-green-300 to-white'>
      <h1 className='text-4xl my-3'>82%</h1>
      <p className='text-xs font-semibold'>Join the 82% of students excelling in their exams with NumberNurdAcademy!</p>
      <div className='flex gap-2 items-center space-x-4 mt-2'>
        <h1 className='text-xs'>NUMBERNERD-ACADEMY</h1>
        <Separator orientation="vertical" />
        <p className='uppercase text-xs'>2+ Year Experience</p>
      </div>
    </div>
    <div className='w-80 h-[55%] rounded-lg px-3 bg-gradient-to-t from-purple-300 to-white'>
    <div className='flex py-4 gap-2'>
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <h3 className='flex flex-col'>NUMBERNERD<span className='text-xs'>
    Create impactful courses that transform learning experiences and elevate academic success
      </span></h3>
    </div>
    <div className='flex flex-col gap-1 px-4 mt-2'>
    <h3>Effective Study Techniques</h3>
    <h3>Healthy Study Habits</h3>
    <h3>Consistent Practice and Review</h3>
    <h3>Utilize Available Resources</h3>
    </div>
    </div>
    </div>
  )
}

export default ResultDescription
