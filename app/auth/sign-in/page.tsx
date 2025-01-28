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
import { setUser } from '@/redux/slices/sectionSlice'

const formSchema = z.object({
  email:z.string(),
  password: z.string()
});
const Signin = () => {

  const dispatch = useDispatch()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
        password: "",
    },
});

// const toggleCreating = () => setIsCreating((current) => !current)

const { isSubmitting, isValid } = form.formState;

const onSubmit  = async (values: z.infer<typeof formSchema>) => {
  try {
      const res = await axios.post(`/api/signin`, values);
      console.log(res, 'user')
      dispatch(setUser(res.data))
      toast.success("Log In Successfully")
      router.refresh()
      router.push("/")
  } catch (error) {
      toast.error('Somethng went wrong')
  }
}

  return (
    <div className='px-52 h-screen relative bg-gradient-to-t from-blue-500 to-white'>
        <span className='second-box-shape absolute w-64 h-64 top-12 left-20 z-10 bg-blue-400 hover:rotate-6 transition-all duration-300 '/>
        <span className='second-box-shape absolute w-64 left-16 top-[-48] h-64 bg-blue-200 hover:rotate-6 transition-all duration-300 '/>
      <div className='flex items-center justify-center pt-24'>
        <Card className='w-[48%]'>
        <CardTitle className='text-4xl text-center text-blue-400 uppercase font-semibold my-7'>LogIn</CardTitle>
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
                                    placeholder='e.g. Enter Your Password' {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                            <Button 
                            disabled={!isValid || isSubmitting}
                            type='submit'
                            className='w-full bg-blue-500 hover:bg-blue-800'
                            >
                                Sign-In
                            </Button>
                    </form>
                    <CardFooter className='text-sm text-blue-500 pt-4 font-semibold flex gap-2 justify-between hover:cursor-pointer'>
                    <Link href={'/auth/sign-up'} className='hover:text-blue-600'>
                    Don't Have Account?
                    </Link>
                    <Link href={'/auth/sign-in/forget-pass'} className='hover:text-blue-600'>
                    Forget Password?
                    </Link>
                    </CardFooter>
                </Form>
             </CardContent>
        </Card>       
      </div>
    {/* <h2 className='text-4xl font-semibold my-10'>Log In</h2> */}
    </div>
  )
}

export default Signin
