'use client'
import { Button } from './ui/button'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setPurchaseStatus, setUser } from '@/redux/slices/sectionSlice'
import Image from 'next/image'

const Navbar = () => {
  const dispatch = useDispatch()
  const {user} = useSelector((store:any) => store.section)

  console.log(user, 'uss')

    const handleLogout = async () => {
      try {
         await axios.get('/api/signin')
        dispatch(setUser(null))
        dispatch(setPurchaseStatus(null))
        toast.success("Logged out Successfully")
      } catch (error) {
        console.log(error)
      }
    } 


  return (
    <nav className='flex items-center justify-around shadow-md p-5 z-50'>
      <Link href={'/'}>
        <Image src={"/nav-logo.png"} width={180} height={200} alt='logo'/>
      </Link>
        <div className='flex items-center gap-2'>
          {user ? 
          <div className='flex items-center gap-2 hover:cursor-pointer'>
          <h2 className='px-2 py-2 text-lg uppercase rounded-full border'>{user && user?.newUser?.name}</h2>
         <Button size={'sm'} onClick={handleLogout}>Log-Out</Button>
         {user.newUser.isAdmin === true && (
           <Link href={'/courses'}>
         <Button size={'sm'} className='uppercase bg-blue-900 border-none text-white hover:bg-blue-700 hover:text-white'>Dashboard</Button>
         </Link>
         )}
          </div>
         : <>
         <Link href={'/auth/sign-up'}>
          <Button variant={"outline"} className='uppercase bg-blue-900 border-none text-white hover:bg-blue-700 hover:text-white'>Register</Button>
          </Link>
         <Link href={'/auth/sign-in'}>
          <Button variant={"outline"} className='uppercase border bg-white hover:'>Login</Button>
          </Link>
         </>
          }
        </div>
    </nav>
  )
}

export default Navbar
