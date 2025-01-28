'use client'
import { Button } from '@/components/ui/button'
import { resetSectionState, setShowCorrectAnswer, setTimer } from '@/redux/slices/sectionSlice'
import { persistor } from '@/redux/store'
import { AiFillQuestionCircle } from "react-icons/ai";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useRouter } from 'next/navigation'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TimeCalculate from '../_component/TimeCalculate';
import TotalTimeOfSection from '../_component/TotalTimeOfSection';
import useBack from '@/app/hook/useBack';
import Loader from '@/components/Loader';

const FreeResult = () => {
  const router = useRouter()
  const  dispatch = useDispatch()
  const {test, selectedAnswers} = useSelector(((store:any) => store.section))
   const {loading} = useSelector((store:any)=> store.loader)
  console.log(loading, 'anss')

  const handleReload = useMemo(() => {
    return () => {
      router.push('/');
      dispatch(resetSectionState());
      dispatch(setShowCorrectAnswer(false))
      persistor.purge(); 
      dispatch(setTimer(1800))
    };
  }, [dispatch, router]);

  function getTotalQuestions() {
    let totalQuestion = 0

    test?.sections?.slice(0, 4).forEach((section: any)=> {
      totalQuestion += section.questions.length
    });
    return totalQuestion;
  }

  const totalQuestions = getTotalQuestions()
  console.log(totalQuestions, 'questt')

  const countCorrectAnswers = () => {
    let correctCount = 0

    test?.sections?.forEach((section:any, sectionIndex:number)=> {

      section?.questions?.forEach((question:any, questionIndex:number)=> {

        const userAnswersForSection = selectedAnswers[`section${sectionIndex + 1}`]
        if(userAnswersForSection) {
          const userAnswer = userAnswersForSection[questionIndex] || {};
          if (userAnswer && userAnswer === question.correctAnswer) { 
            correctCount += 1;
          }
        }
      });
    });
    return correctCount;
  }

  const totalCorrectAnswers = countCorrectAnswers()
  console.log('totall', totalCorrectAnswers)

  if(loading) return <Loader/>

  useBack()

  return (
    <div className='mt-20 h-screen'>
      <div className='flex flex-col items-center justify-center gap-3'>
        <h1 className='text-3xl font-extralight'>You're All Fineshed</h1>
        <h3 className='text-2xl font-bold'>SCORE</h3>
        <h3 className='text-3xl text-blue-700'>{totalCorrectAnswers}</h3>
        <p className='text-sm text-muted-foreground'>Out of {totalQuestions}</p>
      </div>
      <div className='flex items-center justify-around my-3'>
        <div className='flex items-center gap-2'>
        <AiFillQuestionCircle size={24} className='text-purple-600'/>
        <h3>Total Questions</h3>
        </div>
        <h2>{totalQuestions}</h2>
      </div>
      <div className='flex items-center justify-around my-3'>
        <h3 className='flex items-center gap-2'>
        <IoIosCheckmarkCircle size={24} className='text-green-600'/>
        Correct Answers
        </h3>
        <h3>
          {totalCorrectAnswers}
        </h3>
      </div>
      <div className='flex items-center justify-around px-16'>
        <TimeCalculate/>
        <TotalTimeOfSection/>
      </div>
      <div className='flex items-center justify-center py-5'>
      <Button size="sm" className='uppercase bg-blue-900 border-none text-white hover:bg-blue-700 hover:text-white' onClick={handleReload}>Finesh Your Test</Button>
      </div>
    </div>
  )
}

export default FreeResult;
