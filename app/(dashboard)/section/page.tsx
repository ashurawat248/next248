import React from 'react'
import TestItems from './_component/TestItems'
import { db } from '@/lib/prismadb'

const page = async () => {
  const test = await db.mockTest.findMany({})
  const data = test
  console.log(data)

  

  return (
    <div>
      <h1 className='text-2xl text-center my-5'>ALL TESTS</h1>
     <TestItems data={data}/>
    </div>
  )
}

export default page
