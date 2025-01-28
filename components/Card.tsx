'use client'
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
import {useSelector } from 'react-redux'

interface ThreeCardProps {
    title:string
    price:string
    desc:string
    options:{ id: number; text: string }[];
    onSelect: () => Promise<void>
}

  
  const ThreeCardClient = ({
    title,
    price,
    desc,
    options,
    onSelect
  }:ThreeCardProps) => {
    console.log(title, 'till')

    const {user} = useSelector((store:any) => store.section)
    const userId = user?.newUser?._id

    const isPurchased = user?.newUser?.purchase?.some((purchase:any) => purchase?.userId === userId && purchase.planType === title)
    console.log(isPurchased, 'prr')

    return (
        <Card className='cursor-pointer hover:scale-105 transition-all duration-300 '>
        <CardHeader>
          <div>
          {( title === "STANDARD") || (title === "PREMIUM") && (
            <span className="first-span"> 
            <span className="second-span"> 
              Popular
              </span> 
              </span>
          )
        }
        </div>
          <CardTitle>
          <Badge className='tracking-widest'>{title}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className='text-lg'>$<span className='text-5xl font-semibold px-2'>{price}</span></h1>
          <p className='text-xs font-semibold w-56 mt-2'>{desc}</p>
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
          <button className='border py-1 px-4 rounded-lg
           bg-[#1E40AF] text-white uppercase font-semibold hover:bg-[#1b3fb6]' onClick={onSelect}>
            {isPurchased ? "View Tests" : "Buy Now"}
            </button>
        </CardFooter>
      </Card>
      
    )
  }
  
  export default ThreeCardClient;
  