'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import * as z from 'zod';
import{ useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

enum Difficulty {
  BASIC = 'BASIC', 
  STANDARD = 'STANDARD', 
  PREMIUM = 'PREMIUM'
}


const formSchema = z.object({
  title: z.string().min(1, {
      message: 'Title is required'
  }),
  isFree: z.boolean(),
  difficulty: z.nativeEnum(Difficulty).optional(),
})

const page = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      title:"",
      isFree: false,
      difficulty: undefined
    }
  })

  const {isSubmitting, isValid} = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values, 'yup')
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/quiz`, values);
        console.log(res, 'quizzzz')
        router.push(`/section/${res.data.id}`);
        toast.success("Course created");
      } catch {
        toast('Somethng went wrong')
    }
}

  return (
    <div className='max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6'>
    <div>
        <h1 className='text-2xl '>Name Your Test</h1>
        <p className='text-sm text-slate-600'>What would you like to name your Test? Don&apos;t worry, you can change it later</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-8'>
            <FormField control={form.control} name='title' render={({field}) => (
                <FormItem>
                    <FormLabel>
                        Test title
                    </FormLabel>
                    <FormControl>
                        <Input disabled={isSubmitting} placeholder="e.g.'Mock test' " {...field}/>
                    </FormControl>
                    <FormDescription>What will you give Your Test Name?</FormDescription>
                    <FormMessage/>
                </FormItem>
            )}/>
            <FormField control={form.control} name='isFree' render={({field}) => (
                <FormItem>
                    <FormLabel className='mx-2'>
                        IsFree 
                    </FormLabel>
                    <FormControl>
                        <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange}  
                        disabled={isSubmitting}  
                        {...field}/>
                    </FormControl>
                    <FormDescription>What will you give Your Test Name?</FormDescription>
                    <FormMessage/>
                </FormItem>
            )}/>
            <FormField control={form.control} name='difficulty' render={({field}) => (
                <FormItem>
                    <FormLabel className='mx-2'>
                       Difficulty 
                    </FormLabel>
                    <FormControl>
                    <Select onValueChange={field.onChange} value={field.value ?? ''} defaultValue={field.value ?? ''}>
                    <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <SelectItem value="">Select Difficulty</SelectItem> */}
                    <SelectItem value={Difficulty.BASIC }>BASIC</SelectItem>
                    <SelectItem value={Difficulty.STANDARD }>STANDARD</SelectItem>
                    <SelectItem value={Difficulty.PREMIUM}>PREMIUM</SelectItem>
                  </SelectContent>
                  </Select>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
            <div className='flex items-center gap-x-2'>
                <Link href={'/'}>
                <Button type='button' variant={'ghost'}>
                    Cancel
                </Button>
                </Link>
                <Button type='submit' disabled={!isValid || isSubmitting}>
                    Continue
                </Button>
            </div>
        </form>
      </Form>
    </div>
</div>
  )
}

export default page
