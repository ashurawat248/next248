import { Circle } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className='flex items-center justify-center w-full h-screen absolute bg-opacity-50 z-10'>
    <Circle className='animate-spin text-blue-700'/>
    </div>
  )
}

export default Loader
