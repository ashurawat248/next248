import React, { useState } from 'react'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import { useDispatch, useSelector } from 'react-redux';
import { Bookmark} from 'lucide-react';
import { GoBookmarkFill } from "react-icons/go";
import { setAnswer, setEliminatedAnswer, toggleBookmark } from '@/redux/slices/sectionSlice';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

interface Question { 
  questionText: string; 
  questionType: string;
  answers: string[]
  correctAnswer: string
}

const Qna = ({currentQuestion,}:{currentQuestion:Question}) => {
  const dispatch = useDispatch()

    const {currentQuestionIndex, 
      currentSectionIndex, 
      showCorrectAnswer, 
      eliminatedAnswers, 
      test, 
      bookmarkedQuestions, 
      selectedAnswers} = useSelector((store:any)=> store.section);

      console.log(test, selectedAnswers, 'sss')
    const [eliminate, setEliminate] = useState<boolean | null>(null);


  const handleAnswerClick = (questionIndex: number, sectionIndex:number, answer: string, letter: string) => {
    if (showCorrectAnswer) return;
    dispatch(setAnswer({ 
      section: `section${sectionIndex + 1}`, 
      questionIndex, 
      answer }));
  };

  const isBookmarked = bookmarkedQuestions[currentSectionIndex]?.includes(currentQuestionIndex);
  console.log(isBookmarked, bookmarkedQuestions, showCorrectAnswer, currentSectionIndex, currentQuestionIndex, 'mark')
  
  const handleBookmarkClick = () => {
    console.log('am bookmark')
    if(showCorrectAnswer) return;
    // Toggle the bookmark for the current question
    dispatch(toggleBookmark({ section: currentSectionIndex, questionIndex: currentQuestionIndex }));
  };

  const handleEliminateAnswer = (answer: string) => {
    if(showCorrectAnswer) return;
    dispatch(setEliminatedAnswer({ questionIndex: currentQuestionIndex, answer }));
  };

  // Check if the answer is eliminated from Redux state
  const isEliminated = (answer: string) => {
    return eliminatedAnswers[currentQuestionIndex]?.includes(answer);
  };

  const handleDataEntryChange = (e:any, sectionIndex:number, questionIndex:number) => {
    if (showCorrectAnswer) return;
    const value = e.target.value;
    console.log(value, 'itsssss')
    // Update the selected answer for the specific section and question
    dispatch(setAnswer({
      section: `section${sectionIndex + 1}`,
      questionIndex: questionIndex,
      answer: value
    }));
  };

 
  const currentSection = test?.completed ? test?.mockTest?.sections[currentSectionIndex] : test?.sections[currentSectionIndex]
  
  // const currentSection = test?.sections[currentSectionIndex];
  console.log(currentSectionIndex, currentSection, 'qna section')

  const userAnswer = selectedAnswers[`section${currentSectionIndex + 1}`]?.[currentQuestionIndex]


  return (
    <div className='sm:h-[105vw] md:h-[82vh] lg:h-[86vh] xl:h-[35vw] h-auto bg-[#f0f7fa]'>
      <div className='flex items-center justify-center '>
      <Image src={'/Numbernerd.png'} alt='logo' width={370} height={140} className='absolute mt-[130%] sm:mt-[70vh] opacity-15 '/>
      </div>
      <ResizablePanelGroup direction={currentSectionIndex === 3 ? 'vertical' : 'horizontal'} 
      className={`flex justify-between overflow-hidden px-3 sm:px-10 z-50 border-t-4 border-b-4 border-blue-400
      ${(currentSectionIndex === 3 || currentSectionIndex === 4 || currentSectionIndex === 5) && 'flex-col px-80'}`}>


       
        {(currentSectionIndex !== 3 && currentSectionIndex !== 4 && currentSectionIndex !== 5) && (
        <ResizablePanel
        className='mt-4 overflow-hidden w-full'>
        <h3 className='text-md text-sm sm:text-lg font-light lg:text-3xl xl:text-xl sm:px-5 my-10'>{currentQuestion?.questionText}</h3>
        </ResizablePanel>
        )}

        {(currentSectionIndex !== 3 && currentSectionIndex !== 4 && currentSectionIndex !== 5) && (
        <ResizableHandle 
            className="w-1 bg-gray-400 cursor-col-resize transition-all duration-150 "
            />
        )}

        
        <ResizablePanel 
        className='mt-4 h-auto overflow-hidden md:h-auto w-full'>
        <ul>
          <div className='p-5'>
            <div className='flex items-center justify-between border-b-4 border-blue-400 h-9 bg-slate-200'>
            <div className='flex items-center gap-2'>
              <h2 className='p-1.5 bg-black text-white'>{currentQuestionIndex + 1}</h2>
            <div onClick={handleBookmarkClick} className='z-10'>
              {isBookmarked ? (
                <GoBookmarkFill size={24} className='text-red-600 '/>
              ) : (
                <Bookmark/>
              )}
            </div>
            <h2 className='text-xs'>Mark for Review</h2>
            </div>
            <h2 className='p-[2px] rounded-lg text-sm font-semibold 
            line-through m-0.5 border cursor-pointer border-black bg-white' 
            onClick={()=>  setEliminate(!eliminate)}>
              ABC
            </h2>
            </div>
          </div>


          <div className='flex flex-col my-3 px-4 sm:px-10'>
          {(currentSectionIndex !== 3 && currentSectionIndex !== 4 && currentSectionIndex !== 5) ? (
          <h2 className='text-xs'>Which choice Completes the text with the most logical and precise word phrase?</h2>
         ) : (
          <div className='sm:mt-4 h-auto w-full'>
          <h3 className='text-xs sm:text-lg lg:text-2xl xl:text-lg font-light px-5'>{currentQuestion?.questionText}</h3>
          </div>
          )}

          {currentQuestion?.questionType === 'DATA_ENTRY' ? (
              <div className='flex flex-col mt-5'>
              <Input type='number' 
              className='w-36 py-8 z-10 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500'
              value={selectedAnswers[`section${currentSectionIndex + 1}`]?.[currentQuestionIndex] || ''}
              onChange={(e) => handleDataEntryChange(e, currentSectionIndex, currentQuestionIndex)}
              />
              <h1 className='text-lg font-semibold'>Answer Preview:</h1>
              </div>
           ): (
            currentQuestion?.answers?.map((answer:string, index:number) => {
            const letter = String.fromCharCode(65 + index);
            // Check if this answer is selected
            const isSelected = selectedAnswers[`section${currentSectionIndex + 1}`]?.[currentQuestionIndex] === answer;
            console.log(isSelected, answer, 'isSelected')
            const isCorrect = currentQuestion?.correctAnswer === answer;
            
            const isAnswered = selectedAnswers[`section${currentSectionIndex + 1}`]?.[currentQuestionIndex]
            
            console.log(isCorrect, isSelected, isAnswered, letter, 'correct')
            
            return (
              // ${showCorrectAnswer && isCorrect && isSelected === false && "bg-green-200"  }
            <div className='flex gap-2 items-center' key={index}>
            <div className={`border border-black w-full p-1 rounded-lg mt-3 
            flex items-center cursor-pointer sm:my-3 md:my-4 md:p-2 lg:p-2 xl:py-2 xl:my-1 relative 
            ${isSelected && !showCorrectAnswer && "border border-orange-400"}
            ${showCorrectAnswer && isSelected && isCorrect &&  "bg-green-200"}
            ${showCorrectAnswer && isSelected && !isCorrect && "bg-red-600" }
            ${showCorrectAnswer && isCorrect === true && "bg-green-200" }
            `}
            onClick={() => handleAnswerClick(currentQuestionIndex, currentSectionIndex, answer, letter)}
            >
            {isEliminated(answer) && <div className='absolute border border-black w-full'></div>}
            <div className={`text-black border border-black font-bold rounded-full 
            w-8 h-8 flex items-center justify-center mr-3 lg:text-xl xl:text-sm hover:bg-blue-500 hover:text-white
            ${isSelected && "bg-blue-500 text-white"}
            `}
            // onClick={() => handleAnswerClick(currentQuestionIndex, currentSectionIndex, answer, letter)}
            >
            {letter}
            </div>
              <li className='lg:text-2xl xl:text-lg'>{answer}</li>
           </div>
           {eliminate && (
             <div className={`absolute cursor-pointer
              ${(currentSection?.name === 3 || currentSection?.name === 4 || currentSection?.name === 5) && 'right-80'}
               right-12 line-through border border-black text-xs px-1 py-0.5 rounded-full w-5 h-5`}
             onClick={() => handleEliminateAnswer(answer)}
             >
            {letter}
           </div>
          )}
              </div>
            )})
          )}    
          </div>
          {showCorrectAnswer && <p className='text-center text-lg'>Your Selected Answer <span className='font-semibold'>{userAnswer}</span></p>}
        </ul>
         </ResizablePanel>
      </ResizablePanelGroup>
      </div>
  )
}

export default Qna
