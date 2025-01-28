'use client'
import React from 'react'
import Sidebar from './_component/Sidebar'
import { useSelector } from 'react-redux'
import { usePathname, useRouter } from 'next/navigation'

const DashboardLayout = ({children}:{children:React.ReactNode}) => {
  const {user} = useSelector((store:any)=> store.section)
  const pathname = usePathname()
  const router = useRouter()

  const isRedirectdPath = pathname.startsWith('/courses') || pathname.startsWith('/section')

  if(isRedirectdPath && user?.newUser?.isAdmin !== true){
    router.push('/')
    return null;
  }
  return (
    <div className='h-full'>
       <div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50'>
            <Sidebar/>
        </div>
      <main className='md:pl-56 pt-[80px] h-full' >
      {children}
      </main>
    </div>
  )
}

export default DashboardLayout
