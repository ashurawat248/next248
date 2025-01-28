"use client"
import React, { useState } from 'react'
import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import EnterCode from './_component/EnterCode'

const formSchema = z.object({
   email:z.string(),
  password: z.string()
});
const ForgetPass= () => {
    const [showCode, setShowCode] = useState(false)

  const dispatch = useDispatch()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
        password: ""
    },
});

const { isSubmitting, isValid } = form.formState;

const onSubmit  = async (values: z.infer<typeof formSchema>) => {
  try {
      const res = await axios.post('/api/signin/forgetpass', values);
      console.log(res, 'user')
      if(res.status === 200){
        localStorage.setItem('resetToken', res.data.token);
        setShowCode(true)
      } else {
        setShowCode(false)
      }
    //   toast.success(res.data)
    //   router.refresh()
    //   router.push("/auth/sign-in")
  } catch (error) {
      toast.error('Somethng went wrong')
  }
}

  return (
    <div className='px-52 relative h-screen bg-gradient-to-t from-blue-500 to-white'>
         <span className='thrd-box-shape absolute w-64 h-64 top-12 left-20 z-10 bg-blue-400 hover:rotate-6 transition-all duration-300 '/>
        <span className='thrd-box-shape absolute w-64 left-16 top-[-48]   h-64 bg-blue-200 hover:rotate-6 transition-all duration-300 '/>
      <div className='flex items-center justify-center pt-28'>
       <Card className='w-[48%]'>
        <CardTitle className='text-4xl text-center text-blue-400 uppercase font-semibold my-7'>Forget Password</CardTitle>
            <CardContent>
            <Form {...form}>
                    <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4 mt-4'
                    >
                        <FormField control={form.control} name='email' render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input disabled={isSubmitting} 
                                    placeholder='e.g. Enter Your Email' {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name='password' render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='password' disabled={isSubmitting} 
                                    placeholder='e.g. Enter Your New Password' {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                            <Button 
                            disabled={!isValid || isSubmitting}
                            type='submit'
                            className='w-full bg-blue-500 hover:bg-blue-800'
                            >
                                Change-Password
                            </Button>
                    </form>
                    <CardFooter className='text-sm text-blue-500 pt-4 font-semibold flex gap-2 justify-between hover:cursor-pointer'>
                    <Link href={'/auth/sign-in'} className='hover:text-blue-600'>
                    Sign-In Again?
                    </Link>
                    </CardFooter>
                </Form>
            </CardContent>
       </Card>
    </div>

    {showCode &&
    <EnterCode/>
    }
    </div>
  )
}

export default ForgetPass;
