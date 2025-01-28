'use client'
import { setAnswer, setEliminatedAnswer, toggleBookmark } from '@/redux/slices/sectionSlice'
import { BookCheck, Bookmark } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const MathQna = () => {
    const dispatch = useDispatch()
    const {currentQuestionIndex, currentSectionIndex, 
      eliminatedAnswers, bookmarkedQuestions, test, selectedAnswers} = useSelector((store:any)=> store.section)
    const [eliminate, setEliminate] = useState<boolean | null>(null);


    const handleBookmarkClick = () => {
        // Toggle the bookmark for the current question
        dispatch(toggleBookmark({ section: currentSectionIndex, questionIndex: currentQuestionIndex }));
      };

      const handleAnswerClick = (questionIndex: number, answer: string, letter: string) => {
        dispatch(setAnswer({ section:currentSectionIndex , questionIndex, answer }));
      };

      const handleEliminateAnswer = (answer: string) => {
        dispatch(setEliminatedAnswer({ questionIndex: currentQuestionIndex, answer }));
      };

      const isEliminated = (answer: string) => {
        return eliminatedAnswers[currentQuestionIndex]?.includes(answer);
      };

      const isBookmarked = bookmarkedQuestions[currentSectionIndex]?.includes(currentQuestionIndex);

       const currentSection = test?.sections[currentSectionIndex];
       const currentQuestion = currentSection?.questions[currentQuestionIndex];

  return (
    <div className="h-[35vw]">
      <div className=''>
      <div className='p-5'>
            <div className='flex items-center justify-between h-9 bg-slate-100'>
            <div className='flex items-center gap-2'>
              <h2 className='p-1.5 bg-black text-white'>{currentQuestionIndex + 1}</h2>
            <div onClick={handleBookmarkClick}>
              {isBookmarked ? (
                <BookCheck className='text-red-600'/>
              ) : (
                <Bookmark/>
              )}
            </div>
            <h2>Mark for Review</h2>
            </div>
            <h2 className='p-[2px] rounded-lg text-sm font-semibold 
            line-through m-0.5 border cursor-pointer border-black bg-white' 
            onClick={()=>  setEliminate(!eliminate)}>
              ABC
            </h2>
            </div>
      </div>
      <div className='flex flex-col px-10'>
      {currentQuestion?.answers?.map((answer:string, index:number) => {
            const letter = String.fromCharCode(65 + index);

            // Check if this answer is selected
            const isSelected = selectedAnswers[currentSectionIndex]?.[currentQuestionIndex] === answer;

            return (
            <div className='flex gap-2 items-center'  key={index}>
            <div className={`border border-black w-full p-1 rounded-lg mt-3 
            flex items-center cursor-pointer relative 
            ${isSelected && "border border-orange-300"}
            `}>
            {isEliminated(answer) && <div className='absolute border border-black w-full'></div>}
            <div className={`text-black border border-black font-bold rounded-full 
            w-8 h-8 flex items-center justify-center mr-3 hover:bg-blue-400 hover:text-white
            ${isSelected && "bg-blue-400 text-white"}
            `}
            onClick={() => handleAnswerClick(currentQuestionIndex, answer, letter)}
            >
            {letter}
            </div>
            <li>{answer}</li>
           </div>
           {eliminate && (
             <div className='absolute cursor-pointer right-12 line-through border border-black text-xs px-1 py-0.5 rounded-full w-5 h-5'
             onClick={() => handleEliminateAnswer(answer)}
             >
            {letter}
           </div>
          )}
              </div>
            )})}
      </div>
      </div>
    </div>
  )
}

export default MathQna
