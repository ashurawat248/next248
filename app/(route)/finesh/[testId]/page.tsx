'use client'
import {useEffect, useState} from 'react'
import FreeResult from '../_component/FreeResult'
import PaidResult from '../_component/PaidResult'
import * as React from 'react'
import { useSelector,  } from 'react-redux'


const page = ({params}:{params:{testId:string}}) => {
  const { testId } = React.use<{ testId: string }>(params);
  const {test, selectedAnswers} = useSelector((store:any) => store.section)
  console.log(selectedAnswers, test, 'selectt')

  return (
    <div>
     {test?.isFree ?  <FreeResult />  :  <PaidResult testId={testId}/>  }
    </div>
  )
}

export default page
