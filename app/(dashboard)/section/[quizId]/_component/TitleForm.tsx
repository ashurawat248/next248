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
import { Pencil } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


interface TitleformProps {
    initialData: {
        title: string
    };
    mockTestId: string
}

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is Requierd"
    }),
});

const TitleForm = ({
    initialData,
    mockTestId
}:TitleformProps) => {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)

const toggleEdit = () => setIsEditing((current) => !current)

const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
});

const { isSubmitting, isValid } = form.formState;

const onSubmit  = async (values: z.infer<typeof formSchema>) => {
    try {
        await axios.patch(`/api/quiz/${mockTestId}`, values);
        toast.success("Course Updated")
        toggleEdit();
        router.refresh()
    } catch (error) {
        toast.error('Somethng went wrong')
    }
}

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
    <div className='flex items-center justify-between font-medium'>
      Test title
      <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
              <>Cancel</>
          ): (
              <>
      <Pencil className='h-4 w-4 mt-2'/>
       Edit title
              </>
      )}
      </Button>
    </div>
    {!isEditing && (
      <p className='text-sm mt-2'>
          {initialData.title}
      </p>
    )}
    {isEditing && (
      <Form {...form}>
          <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 mt-4'
          >
              <FormField control={form.control} name='title' render={({field}) => (
                  <FormItem>
                      <FormControl>
                          <Input disabled={isSubmitting} placeholder='e.g. Advance web devevlopment' {...field}/>
                      </FormControl>
                      <FormMessage/>
                  </FormItem>
              )}/>
              <div className='flex items-center gap-x-2'>
                  <Button 
                  disabled={!isValid || isSubmitting}
                  type='submit'
                  >
                      Save
                  </Button>
              </div>
          </form>
      </Form>
    )}
  </div>
  )
}

export default TitleForm
