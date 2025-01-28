import React from 'react'
import TestItems from './TestItems'

const TestCard = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/quiz`)
    const tests = await res.json()
    console.log(tests, 'tt')

    

  return (
    <div>
      <div className='grid grid-cols-3 md:grid-cols-5 items-center gap-3'>
        {tests && (tests?.map((test:any, index:number) => (
            <TestItems {...test} key={index}/>
        )))}
      </div>
    </div>
  )
}

export default TestCard
