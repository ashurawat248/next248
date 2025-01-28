import React, { useEffect, useState } from 'react'
import NavigationList from './NavigationList'
import { useDispatch, useSelector } from 'react-redux'
import { handleNextQuestion, handlePreviousQuestion, setTimer } from '@/redux/slices/sectionSlice'
import { useRouter } from 'next/navigation'
import VideoPlayer from './VidoePlayer'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

const QuizFooter = ({ 
  toggleQuestionList, 
  isQuestionListVisible,
  questionIndexes,
  setIsQuestionListVisible,
  currentQuestionIndex,
}:any) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const {isOnBreak, currentSectionIndex, user, showCorrectAnswer, test} = useSelector((store:any) => store.section)
  const [showSolution, setShowSolution] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showImage, setShowImage] = useState(false)

  
  const handleClickPrev = (event: React.MouseEvent<HTMLButtonElement>) => {
    // You can handle the event here if needed
    dispatch(handlePreviousQuestion());
  };
  
  
  // const handleClickNext = () => {
  //   // You can handle the event here if needed
  //   const isLastQuestionInSection4 = currentSectionIndex === 4 && currentQuestionIndex === test.sections[4].questions.length - 1;
    
  //   if(isLastQuestionInSection4) {
  //     setIsRedirecting(true)
  //     dispatch(setTimer(0))
  //   } else {
  //       dispatch(handleNextQuestion());
  //       if(
  //         showCorrectAnswer === true && 
  //         currentSectionIndex === test.sections.length - 1 
  //         && currentQuestionIndex === test.sections[currentSectionIndex].questions.length - 1
  //       ){
  //         router.push(`/finesh/${test.id}`);
  //       } else if (currentSectionIndex > test.sections.length - 1){
  //         router.push(`/finesh/${test.id}`);
  //       } else {
  //         router.push(`/quiz/${test.id}`);
  //       }
  //     }
  // };

  const handleClickNext = () => {
    // You can handle the event here if needed
    const isLastQuestionInSection4 = currentSectionIndex === 4 && currentQuestionIndex === test.sections[4].questions.length - 1;
    
    dispatch(handleNextQuestion());
      if(isLastQuestionInSection4) {
        setIsRedirecting(true)
        dispatch(setTimer(0))
      } else if (
       (showCorrectAnswer === true && currentSectionIndex === test.sections.length - 1 
        && currentQuestionIndex === test.sections[currentSectionIndex].questions.length - 1) || 
          (currentSectionIndex > test.sections.length - 1) 
        ) {
          router.push(`/finesh/${test.id}`);
        } else {
          router.push(`/quiz/${test.id}`);
        }
  };

  const currentSection = test?.sections?.[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  const videoUrl = currentQuestion?.videoSrc
  const solutionUrl = currentQuestion?.solutionSrc
  console.log(videoUrl, "vidoe")

  useEffect(() => {
    if(isRedirecting) {
      router.push(`/finesh/${test.id}`)
    }
  },[isRedirecting])

  useEffect(() => {
    if(isOnBreak === true) {
      router.push('/break')
    }
  },[isOnBreak])


  return (
    <div className='flex items-center justify-between p-5'>
      <h2 className='uppercase text-xs'>
        <Badge>
        {user?.newUser?.name}
        </Badge>
        </h2>
      {showCorrectAnswer && 
      <div className='flex gap-0'>
      <button onClick={() => setShowImage(!showImage)} 
      className='py-0.5 px-3 md:ml-7 ml-24 rounded-md text-sm
       bg-red-700 md:h-10 text-white hover:bg-red-600'>Check Writen Solution</button>
      <button onClick={() => setShowSolution(!showSolution)} 
      className='py-0.5 px-3 md:h-10 md:ml-10 ml-24 rounded-md text-sm
       bg-red-700 text-white hover:bg-red-600'>Check Video Solution</button>
      </div>
      }
      <button className='py-0.5 px-3 md:ml-0 ml-24 rounded-md text-sm bg-black text-white' onClick={toggleQuestionList}>Question {currentQuestionIndex + 1} of {currentSection.questions.length}</button>
     {showImage && (
      <div className='absolute border top-8 left-1/2 object-cover w-[60%] h-[85%] transform -translate-x-1/2 overflow-hidden'>
        <Image src={solutionUrl} alt='solution' fill/>
      </div>        
     )}
     {showSolution && <VideoPlayer videoUrl={videoUrl} showSolution={showSolution} setShowSolution={setShowSolution}/>}

      {isQuestionListVisible && (
        <NavigationList questionIndexes={questionIndexes} setIsQuestionListVisible={setIsQuestionListVisible}/>
      )}

      <div className='flex items-center gap-2'>
        <button className='bg-blue-700 py-1.5 text-sm  px-4 rounded-full text-white' onClick={handleClickPrev}>Back</button>
        <button disabled={isRedirecting} className='bg-blue-700 py-1.5 text-sm  px-4 rounded-full text-white' onClick={handleClickNext}>Next</button>
      </div>
    </div>
  )
}

export default QuizFooter
