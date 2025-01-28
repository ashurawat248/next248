import { BookmarkCheckIcon, X } from 'lucide-react';
import { FaMapMarkerAlt } from "react-icons/fa";
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQuestionIndex } from '@/redux/slices/sectionSlice';
import ReviewPageData from '../../_component/ReviewPageData';

interface SectionFineshProps { 
  questionIndexes: number[]; 
}

const SectionFinesh = ({questionIndexes}:SectionFineshProps) => {
    const dispatch = useDispatch()
    const {currentQuestionIndex, currentSectionIndex, 
      bookmarkedQuestions, selectedAnswers} = useSelector((store:any)=> store.section);
    console.log(selectedAnswers, 'itss answresss')

    const isBookmarked = (index: number) =>
      bookmarkedQuestions[currentSectionIndex]?.includes(index);
    
  
    return (
    <div className="bg-white shadow-lg p-5 pt-1 w-full h-[35vw] md:h-[82vh] lg:h-[86vh] xl:h-[35vw] border-red-500 overflow-auto">

        <div className='mt-8 flex flex-col items-center justify-center'>
        <h1 className='text-2xl'>Check Your Work</h1>
        <p className='px-[23rem] md:px-[20%]'>On test day, you won’t be able to move on to the next module until time expires.
        For these practice questions, you can click Next when you’re ready to move on.</p>
        </div>

    <div className='flex items-center mt-8 justify-center'>
    <div className='rounded-lg h-[25vw] shadow-md shadow-black w-[50vw] md:w-[67vw] md:h-[58vw] xl:h-[25vw] pt-1 px-3'>
        
    <div className="flex items-center justify-between px-5">
    <h2 className="font-semibold mb-3">Navigate to a Question:</h2>
    <div className='my-3'>
      <ReviewPageData/>
    </div>
    </div>
    <h2 className='border border-black w-full'></h2>

    <ul className="flex flex-wrap gap-5 px-5 items-center justify-start mt-10">
      {questionIndexes?.map((index:number) => {
        const isAnswered = selectedAnswers[`section${currentSectionIndex + 1}`]?.[index] !== undefined;
        const currentAnswer = selectedAnswers[`section${currentSectionIndex + 1}`]?.[index];
        const isSelected = isAnswered && currentAnswer !== '';
        
        return (
          <li
        key={index}
        className={`cursor-pointer p-1 px-3 border border-black border-dashed relative 
          ${isSelected ? "bg-blue-700 text-white" : "" }
          `}
        onClick={() => 
          dispatch(setCurrentQuestionIndex(index))}
        >
          {isBookmarked(index) && (
                <BookmarkCheckIcon size={20} className="absolute top-[-8px] left-[33px] transform -translate-x-1/2 text-red-600" />
              )}
           {currentQuestionIndex === index && (
             <FaMapMarkerAlt size={16} className={`absolute top-[-20px] left-1/2 transform -translate-x-1/2 ${isSelected && "text-black"} z-10`} />
            )}
          {index + 1}
        </li>
        )})}
    </ul>
    </div>
    </div>
    </div>

  )
}

export default SectionFinesh

