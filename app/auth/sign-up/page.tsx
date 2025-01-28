'use client'
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
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

const formSchema = z.object({
  name: z.string(),
  email:z.string(),
  password: z.string()
});
const Signup = () => {

  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        email: "",
        password: "",
    },
});

const toggleCreating = () => setIsCreating((current) => !current)

const { isSubmitting, isValid } = form.formState;

const onSubmit  = async (values: z.infer<typeof formSchema>) => {
  try {
      await axios.post(`/api/signup`, values);
      toast.success("User Registered Successfully")
      toggleCreating();
      router.refresh()
  } catch (error) {
      toast.error('Somethng went wrong')
  }
}

  return (
    <div className='px-52 relative h-screen bg-gradient-to-t from-blue-500 to-white'>
        <span className='box-shape absolute w-64 h-64 top-16 left-20 bg-blue-200 hover:rotate-6 transition-all duration-300 '/>
        <span className='box-shape absolute w-64 left-4 h-64 bg-blue-300 hover:rotate-6 transition-all duration-300 '/>
        <div className='flex items-center justify-center pt-24 '>
        <Card className='w-[48%]'>
            <CardTitle className='text-4xl text-center text-blue-400 uppercase font-semibold my-7'>Register</CardTitle>
            <CardContent>
       <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 mt-4'
            >
                <FormField control={form.control} name='name' render={({field}) => (
                    <FormItem>
                            <label>Name:</label>
                        <FormControl>
                            <Input disabled={isSubmitting} 
                            placeholder='e.g. Enter Your Name' {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField control={form.control} name='email' render={({field}) => (
                    <FormItem>
                        <label>Email:</label>
                        <FormControl>
                            <Input disabled={isSubmitting} 
                            placeholder='e.g. Enter Your Email' {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField control={form.control} name='password' render={({field}) => (
                    <FormItem>
                        <label>Password:</label>
                        <FormControl>
                            <Input disabled={isSubmitting} 
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
                        Sign-Up
                    </Button>
            </form>
            <CardFooter className='text-sm text-blue-500 pt-4 font-semibold flex gap-2 justify-center hover:cursor-pointer'>
              <Link href={'/auth/sign-in'}>
              Already Have Account?
              </Link>
            </CardFooter>
        </Form>

            </CardContent>
        </Card>
        </div>
    </div>
  )
}

export default Signup
