import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Badge } from './ui/badge'
import { TiTick } from 'react-icons/ti'
import Link from 'next/link'

  const options = [
    { id:1, text: "Personalized Feedback"},
    { id:2, text: "Priority Support"},
    { id:3, text: "Track Your Progress"},
    { id:4, text: "Comprehensive Coverage"},
    { id:5, text: "Adapted Test"},
  ]

const FreeCard = () => {
  return (
    <Card className='cursor-pointer hover:scale-105 transition-all duration-300 '>
        <CardHeader>
          <CardTitle>
          <Badge>FREE</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className='text-lg'>$<span className='text-5xl font-semibold px-2'>FREE</span></h1>
          <p className='text-xs font-semibold w-56 mt-2'>
          Start your journey towards excellence today with our Free Mock Test Plan and experience the difference it can make in your preparation!
          </p>
          <div className='flex flex-col  gap-2 mt-5'>
           {options?.map((item) => (
            <div key={item.id} className='flex gap-2 items-center'>
             <TiTick className='text-green-600'/>   
            <h1>{item?.text}</h1>
            </div>
           ))}
          </div>
        </CardContent>
        <CardFooter className='flex items-center justify-center'>
            <Link href={"/freequiz"}>
          <button className='border py-1 px-4 rounded-lg
           bg-[#1E40AF] text-white uppercase font-semibold hover:bg-[#1b3fb6]'>
            FREE
            </button>
               </Link>
        </CardFooter>
      </Card>
  )
}

export default FreeCard
