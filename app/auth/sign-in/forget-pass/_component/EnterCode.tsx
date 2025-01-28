"use client"
import React, { useRef, useState } from 'react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


const EnterCode =  () => {
    const router = useRouter()
    const [verificationCode, setVerificationCode] = useState('');
    const formRef = useRef(null);
    console.log(verificationCode)

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(e)
       try {

         const token = localStorage.getItem('resetToken');
         console.log(token, verificationCode, 'tok')
         const res = await axios.put("/api/signin/forgetpass", {verificationCode, token})
         console.log(res, 'ress')
         if(res.status === 200){
          toast.success(res.data.message)  
          localStorage.removeItem('resetToken'); 
            router.push('/auth/sign-in');

         } else {
            toast.error(res.data.message)
            setVerificationCode("")
         }
       } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
       }
    }

    // const handleOTPChange = (code:string) => { 
    //     setVerificationCode(code); 
    //     if (code.length === 6) { 
    //         formRef.current.requestSubmit(); 
    //     } 
    // };
  return (
     <div className='absolute border bg-white w-[40%] z-20 flex items-center justify-center 
     mt-[-23%] left-[30%] h-[40%]'>
    <div>
    <form ref={formRef} onSubmit={handleSubmit}>
      <InputOTP maxLength={6}  value={verificationCode}
        onChange={(value) => setVerificationCode(value)}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
        </form>
    </div>
    </div>
  )
}

export default EnterCode
