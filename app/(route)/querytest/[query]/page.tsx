'use client'
import Loader from '@/components/Loader'
import TestItems from '@/components/TestItems'
import { setLoading, setSubTest } from '@/redux/slices/loaderSlice'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface Test {  
  id: number; 
  name: string;
}

const PurchasedTest = ({params}:{params:{query:string}}) => {
  const {loading} = useSelector((store:any) => store.loader)
  const {query} = React.use<{query:string}>(params)

  console.log(query,)
  const [tests, setTests] = useState<Test[] | null>(null)
    const router = useRouter()

    const dispatch = useDispatch()

    useEffect(()=> {
      const handleTest = async () => {
        dispatch(setLoading(true))
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/quiz/plantest?difficulty=${query}`)
          const test = await res.json()
          console.log(test)
          if(res.ok){
            setTests(test)
          }
        } catch (error) {
          console.log(error)
        } finally {
          dispatch(setLoading(false))
        }
      }
      handleTest()
    },[query])

  return (
    <div className='px-8'>
      {loading && <Loader/>}
    <h1 className='text-4xl font-semibold text-center my-5'>{query}</h1>
    <div className='grid grid-cols-3 md:grid-cols-5 items-center gap-3'>
        {tests && tests?.length > 0  && (tests?.map((test:any, index:number) => (
            <TestItems {...test} key={index}/>
        )))}
      </div>
        </div>
  )
}

export default PurchasedTest

