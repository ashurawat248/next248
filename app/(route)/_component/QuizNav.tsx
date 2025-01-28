'use client'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { FaPencilAlt } from "react-icons/fa";
import { TbMath1Divide3 } from "react-icons/tb";
import { HiDotsVertical } from "react-icons/hi";
import { FcAlarmClock } from "react-icons/fc";
import { FaCalculator } from "react-icons/fa";
import Select from './Select';
import CalculatorContainer from '@/components/Calculator';
import MathGraph from './MathGraph';

const QuizNav = ({name, section}:{name:string, section:string}) => {
  const [open, setOpen] = useState(false)
  const [showCal, setShowCal] = useState(false)
  const [showTime, setShowTime] = useState(false)
  const {timer, currentSectionIndex} = useSelector((store: any) => store.section);
  const [showSelect, setShowSelect] = useState(false)
  const [showGraph, setShowGraph] = useState(false)

  return (
    <div className='flex items-center justify-between p-2 px-8'>
      <div>
      <h1 className='text-sm sm:text-xl font-sans'>Section 1: {name}</h1>
      <h2 className='text-sm sm:text-lg'>{section}</h2>
      <button className='flex items-center cursor-pointer transition ease-in-out duration-200' onClick={()=> setOpen(!open)}>
      <h3>Directions</h3>
      { open ? 
      <BiCaretUp/> :
      <BiCaretDown/> 
      }
      </button>
     {open && 
     <>
      <div className='h-[86%] flex flex-col gap-5 w-[75%] absolute z-10 border top-22 left-8 bg-white p-8'>
        <h2>The questions in this section address a number of important reading and writing skills. 
          Each question includes one or more texts, which may include a table or graph. 
          Read each text and question carefully, and then choose the best answer to the question based on the passage(s).
       </h2>
       <h2>
       All questions in this section are multiple-choice with four answer choices. Each question has a single best answer.
       </h2>
      </div>
      <button className='bg-yellow-200 right-[25%]
       hover:bg-yellow-400 bottom-5 py-1 rounded-full border
        border-black px-4 z-10 absolute' onClick={()=> setOpen(false)}>Close</button>
     </>
      }
      </div>
      <div className='flex flex-col sm:mr-24 items-center gap-2'>
        {showTime ?
          <h2 className='text-2xl'>{Math.floor(timer / 60)}:{timer % 60}</h2>
          : <FcAlarmClock className='text-2xl cursor-pointer' />
        }
        <button className='boder border-black cursor-pointer bg-transparent text-xs border rounded-xl py-0.5 px-2'
        onClick={()=> setShowTime(!showTime)}>{showTime ? 'Hide' : "Show"}</button>
      </div>
      <div className='flex gap-5'>

        {(currentSectionIndex === 3 || currentSectionIndex === 4 || currentSectionIndex === 5) && 
        <div className='flex items-center gap-2'>
        <h2 className='flex flex-col items-center gap-2 cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-2'
        onClick={() => setShowCal(!showCal)}
        >
          <FaCalculator/>
          <span className='text-sm'>Calculator</span>
        </h2>

        <h2 className='flex flex-col items-center gap-2 cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-2'
        onClick={() => setShowGraph(!showGraph)}
        >
          <TbMath1Divide3 />
          <span className='text-sm'>Graph</span>
        </h2>
       </div>
        }

        <h2 className='flex flex-col items-center gap-2 cursor-pointer 
        hover:underline hover:underline-offset-4 hover:decoration-2' onClick={()=> setShowSelect(!showSelect)}>
          <HiDotsVertical />
         <span className='text-sm'>More</span>
        </h2>
        {showSelect && <Select/>}
        {showCal && <CalculatorContainer/>}
        {showGraph && <MathGraph/>}
      </div>
    </div>
  )
}

export default QuizNav
