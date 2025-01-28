import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux';

const MathGraph = () => {
    const {test, currentSectionIndex, currentQuestionIndex} = useSelector((store:any) => store.section)
    const currentSection = test?.sections?.[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  const currentQuestionGraph = currentQuestion?.imageSrc
  return (
    <div className='border w-[50%] h-[70%] absolute top-[5rem] bg-white z-10 right-8 overflow-hidden'>
      <Image src={currentQuestionGraph} alt='graph' fill className='object-cover'/>
    </div>
  )
}

export default MathGraph
