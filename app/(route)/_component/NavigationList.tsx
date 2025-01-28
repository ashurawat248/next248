'use client'
import { X } from 'lucide-react';
import { GoBookmarkFill } from "react-icons/go";
import { FaMapMarkerAlt } from "react-icons/fa";
import React from 'react'
import ReviewPageData from './ReviewPageData';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQuestionIndex, setShowNavigation } from '@/redux/slices/sectionSlice';

const NavigationList = ({questionIndexes, setIsQuestionListVisible}:{setIsQuestionListVisible:(value: boolean) => void, questionIndexes:number[]}) => {
    const dispatch = useDispatch()
    const {currentQuestionIndex, currentSectionIndex, bookmarkedQuestions, 
      showNavigation, selectedAnswers} = useSelector((store:any)=> store.section);
    const isBookmarked = (index: number) =>
      bookmarkedQuestions[currentSectionIndex]?.includes(index);
 
    return (
    <div className="absolute shadow-lg bottom-20 z-10 left-[33vw] border 
    rounded-md bg-white p-5 pt-1 w-[35%] h-[60vh] overflow-hidden md:w-[60%] md:h-[40vh] md:left-[16vw]
    xl:w-[35%] xl:h-[60vh] xl:left-[33vw]">
    <div className="flex justify-between px-2">
    <h2 className="font-semibold mb-3">Navigate to a Question:</h2>
    <button onClick={() => setIsQuestionListVisible(false)}><X size={10}/></button>
    </div>
    <h2 className='border border-black w-full'></h2>
    <div className='my-3'>
      <ReviewPageData/>
    </div>
    <h2 className='border border-black w-full'></h2>

    <ul className="flex flex-wrap gap-2 items-center justify-start mt-10">
      {questionIndexes?.map((index:number) => {
        const isAnswered = selectedAnswers[`section${currentSectionIndex + 1}`]?.[index] !== undefined;
        const currentAnswer = selectedAnswers[`section${currentSectionIndex + 1}`]?.[index];
        const isSelected = isAnswered && currentAnswer !== '';
        
        return (
          <li
        key={index}
        className={`cursor-pointer p-1 px-3 border border-black border-dashed hover:bg-gray-200 relative 
          ${isSelected ? "bg-blue-700 text-white" : ""}
           `}
        onClick={() => 
          dispatch(setCurrentQuestionIndex(index))}
        >
           {isBookmarked(index) && (
                <GoBookmarkFill size={20} className="absolute top-[-8px] left-[33px] transform -translate-x-1/2 text-red-600" />
              )}
           {currentQuestionIndex === index && (
             <FaMapMarkerAlt size={16} className={`absolute top-[-20px] left-1/2 transform -translate-x-1/2 z-10 ${isSelected && 'text-black'}`} />
            )}
          {index + 1}
        </li>
        )})}
    </ul>

    <div className='flex items-center justify-center mt-10'>
    <button className='px-2 py-0.5 border rounded-full border-sky-600 text-xs text-sky-500 font-semibold'
    onClick={() => dispatch(setShowNavigation(!showNavigation))}
    >Go to Review Page</button>
    </div>
  </div>
  )
}

export default NavigationList
