'use client'
import React, { useEffect, useState } from 'react'
import QuizNav from '@/app/(route)/_component/QuizNav';
import QuizFooter from '@/app/(route)/_component/QuizFooter';
import useTimer from '@/app/hook/useTimer';
import { useDispatch, useSelector } from 'react-redux';
import Qna from '../_component/Qna';
import SectionFinesh from '../_component/SectionFinesh';
import useBack from '@/app/hook/useBack';
import useMockTest from '@/app/hook/useMockTest';
import Loader from '@/components/Loader';
import { usePathname } from 'next/navigation';



interface Question {
  id: number;
  question: string;
  options: string[]; 
  answer: string; 
  sectionId: number; 
}

// Type for a section
// interface Section {
//   id: number;
//   name: string;
//   mockTestId: number; // ID of the mock test this section belongs to
//   questions: Question[]; // Array of questions in this section
// }


 const TestPage = ({params}:{params:{testId:string}}) => {
  const pathName = usePathname()

  const {currentSectionIndex, currentQuestionIndex, showNavigation, test} = useSelector((store:any)=> store.section);
 console.log(test, pathName, 'testss')
  const [isQuestionListVisible, setIsQuestionListVisible] = useState(false); // Toggle for question list visibility

  const [testId, setTestId] = useState<string | null>(null); 
  console.log(testId, 'idd')


  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setTestId(resolvedParams.testId || null)
    }
    unwrapParams()
  },[params])

  useMockTest({testId})

  useTimer();
  useBack()
  
  const toggleQuestionList = () => {
    setIsQuestionListVisible(!isQuestionListVisible);
  };
  
  if (!test) return <Loader/> ;
  
  const currentSection = test?.sections?.[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  
  console.log(currentSection, 'indexs')
  
  
  const questionIndexes = currentSection?.questions.map((_:any, index:number) => index) || []; // Get indices of questions in the current section
  

  // useEffect(() => {
  //   if(!pathName.startsWith('/quiz')) {
  //     console.log(pathName, pathName.startsWith('/quiz'))
  //     dispatch(resetSectionState())
  //   }
  // },[pathName])

  return (
    <div className='h-full'>
      <QuizNav name={test?.title} section={currentSection?.name}/>
      
      <div className='h-[100%] overflow-hidden'>
        {showNavigation ? <SectionFinesh questionIndexes={questionIndexes}/> :
        <Qna currentQuestion={currentQuestion}/> 
        }
      </div>

      <QuizFooter 
      currentQuestionIndex={currentQuestionIndex} 
      toggleQuestionList={toggleQuestionList}
      isQuestionListVisible={isQuestionListVisible}
      questionIndexes={questionIndexes}
      setIsQuestionListVisible={setIsQuestionListVisible}
      currentSectionIndex={currentSectionIndex}
      />


         
    </div>
  )
}

export default TestPage;
