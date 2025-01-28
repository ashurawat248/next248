import {SquareDashed } from 'lucide-react'
import { FaMapMarkerAlt } from "react-icons/fa";
import { GoBookmarkFill } from "react-icons/go";
import React from 'react'

const ReviewPageData = () => {
  return (
    <div className='flex items-center justify-center gap-5'>
      <div className='flex items-center gap-1'>
        <FaMapMarkerAlt size={12} className="text-black !important"/>
        <h2 className='text-xs font-semibold'>Current</h2>
      </div>
      <div className='flex items-center gap-1'>
        <SquareDashed size={12}/>
        <h2 className='text-xs font-semibold'>Unanswered</h2>
      </div>
      <div className='flex items-center gap-1'>
        <GoBookmarkFill size={12} className='text-red-500'/>
        <h2 className='text-xs font-semibold'>For Review</h2>
      </div>
    </div>
  )
}

export default ReviewPageData
