import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col pt-48 items-center justify-center gap-5'>
      <h2 className='text-5xl text-blue-500 text-center font-semibold'>Congratulations!</h2>
      <p className='px-28 text-center'>You're ready to test your knowledge and boost your exam preparation with our extensive mock tests. 
        Your selected plan is now activated, and you're just one click away from starting your practice. 
        It’s time to level up your preparation and head towards success!</p>
        <Link href={"/"}>
        <Button size="sm">Start Now</Button>
        </Link>
    </div>
  )
}

export default page
