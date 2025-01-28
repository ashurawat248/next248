'use client'
import { db } from "@/lib/prismadb";
import * as z from 'zod'
import axios from "axios";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";


interface sectionformProps {
    mockTestId: string | undefined
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is Requierd"
    }),
    breakAfter: z.boolean().default(false), // Add validation for breakAfter as boolean
    difficulty: z.boolean().default(false),
    testId: z.string().optional()
});


export const SectionForm = ({ mockTestId }:sectionformProps) => {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:"",
            breakAfter: false,
            difficulty: false,
            testId:mockTestId,
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values, 'vall')
        try {
                const res = await axios.post('/api/quiz/section', values)
                console.log(res, 'quizzzz')
                router.refresh()
                router.push(`/section/${mockTestId}`)
                toast.success('Section Created')
        } catch (error) {
            toast.error('Somethng went wrong')
        }
    }

    return (
        <div className='mt-6 border bg-slate-100 rounded-md p-4'>
            <h1>Section Title</h1>
           <Form {...form}>
          <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 mt-4'
          >
              <FormField control={form.control} name='name' render={({field}) => (
                  <FormItem>
                      <FormControl>
                          <Input disabled={isSubmitting} placeholder='e.g. Advance web devevlopment' {...field}/>
                      </FormControl>
                      <FormMessage/>
                  </FormItem>
              )}/>
              <FormField control={form.control} name='breakAfter' render={({field}) => (
                  <FormItem>
                      <FormControl>
                      {/* <label className="text-sm font-medium">Break After</label> */}
                          <Checkbox 
                          checked={field.value}
                          disabled={isSubmitting}
                          onCheckedChange={(checked) => field.onChange(checked)}
                          />
                      </FormControl>
                          <Label className="text-sm font-medium ml-1 items-center">Break After</Label>
                      <FormMessage />
                  </FormItem>
              )}/>
              <FormField control={form.control} name='difficulty' render={({field}) => (
                  <FormItem>
                      <FormControl>
                      {/* <label className="text-sm font-medium">Break After</label> */}
                          <Checkbox 
                          checked={field.value}
                          disabled={isSubmitting}
                          onCheckedChange={(checked) => field.onChange(checked)}
                          />
                      </FormControl>
                          <Label className="text-sm font-medium ml-1 items-center">Difficulty</Label>
                      <FormMessage />
                  </FormItem>
              )}/>
              <div className='flex items-center gap-x-2'>
                  <Button 
                  disabled={!isValid || isSubmitting}
                  type='submit'
                  >
                      Create
                  </Button>
              </div>
          </form>
      </Form>
        </div>
    );
};