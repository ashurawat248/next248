'use client'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useRouter } from "next/navigation"
import React, {useState } from "react"
import { toast } from "sonner"
import ImageUplaod from "./ImageUplaod"
import VideoUpload from "./VideoUplaod"
import SolutionImageUpload from "./SolutionImageUplaod"

export enum QuestionType {
  TRUE_FALSE = "TRUE_FALSE",
  DATA_ENTRY = "DATA_ENTRY",
}

type ValueType = { 
  questionText: string; 
  questionType: QuestionType; 
  imageSrc: string; 
  score:number
  solutionSrc: string; 
  videoSrc: string; 
  answers: string[]; 
  correctAnswer: string; 
  sectionId: string;
}

const QuestionForm = ({sectionId}:{sectionId: string}) => {
  const router = useRouter()

  const [value, setValue] = useState<ValueType>({
    questionText:"",
    score:0,
    questionType:QuestionType.TRUE_FALSE,
    imageSrc:"",
    solutionSrc:"",
    videoSrc:"",
    answers:[], 
    correctAnswer:"",
    sectionId:sectionId,
  })

  console.log(value, 'vall')




  const addAnswer = () => {
    setValue((prev:any) => ({
      ...prev,
      answers: [...prev.answers, ''],
    }));
  };

  // Handle removing an answer
  const removeAnswer = (index: number) => {
    const newAnswers = [...value.answers];
    newAnswers.splice(index, 1);
    setValue(prev => ({
      ...prev,
      answers: newAnswers,
    }));
  };

  // Handle answer change
  const handleAnswerChange = (index:number, newAnswer: string) => {
    const newAnswers = [...value.answers];
    newAnswers[index] = newAnswer;
    setValue(prev => ({
      ...prev,
      answers: newAnswers,
    }));
  };

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
    console.log(value)
   try {
     const res = await axios.post('/api/quiz/section/question', value)
     console.log(res)
     toast.success("Question Created")
      router.refresh()
   } catch (error:any) {
    toast.error(error.message)
   }
  }
  
  return (
    <div className='mt-6 border w-[50%] bg-slate-100 rounded-md p-4'>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 px-5">
        <Label>Enter Question Text</Label>
        <Input type="text" placeholder="e.g Enter questionText" value={value.questionText} 
        onChange={(e)=> setValue({...value, questionText:e.target.value})}/>
        </div>

        <div className="flex flex-col gap-3 px-5 mt-5">
        <Label>Enter QuestionType</Label>
        <div className="flex gap-3">
        <Label className="flex gap-2">
        <Checkbox 
        checked={value.questionType === QuestionType.DATA_ENTRY}  
        onCheckedChange={() => setValue({ ...value, questionType: QuestionType.DATA_ENTRY })}/>
        Data Entry
        </Label>
        <Label className="flex gap-2">
        <Checkbox 
        checked={value.questionType === QuestionType.TRUE_FALSE}  
        onCheckedChange={() => setValue({ ...value, questionType: QuestionType.TRUE_FALSE })}/>
        True False
        </Label>
        </div>
        </div>

       
       {value.questionType === "TRUE_FALSE" && <div className='flex flex-col gap-3 px-5 mt-5'>
        <Label>Answers</Label>
        {value.answers.map((answer, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <Input 
              value={answer} 
              onChange={(e) => handleAnswerChange(index, e.target.value)} 
              placeholder={`Answer ${index + 1}`} 
            />
            <button type="button" onClick={() => removeAnswer(index)} className="text-red-500">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addAnswer} className="text-green-500">Add Answer</button>
        </div>}

        <div>
          <label className="text-2xl font-semibold">Graph's</label>
          <ImageUplaod value={value.imageSrc}  onChange={(newImageSrc: string) => 
          setValue((prevValue) => ({
            ...prevValue, // Keep the previous state intact
            imageSrc: newImageSrc // Update the imageSrc field
          }))}/>
          <label className="text-2xl font-semibold">Solution</label>
          <SolutionImageUpload value={value.solutionSrc}  onChange={(newSolutionSrc: string) => 
          setValue((prevValue) => ({
            ...prevValue, // Keep the previous state intact
            solutionSrc: newSolutionSrc // Update the imageSrc field
          }))}/>
          <label className="text-2xl font-semibold">Video Solution</label>
          <VideoUpload value={value.videoSrc}  onChange={(newVideoSrc: string) => 
          setValue((prevValue) => ({
            ...prevValue, // Keep the previous state intact
            videoSrc: newVideoSrc // Update the imageSrc field
          }))}/>
        </div>

        <div className="flex flex-col gap-3 px-5 mt-5">
        <Label>Add Correct Answers</Label>
       <Input 
       type="text" 
       placeholder="e.g Enter Correct Answers" 
       value={value.correctAnswer} 
       onChange={(e)=> setValue({...value, correctAnswer:e.target.value})}/>
        </div>
        <div className="flex flex-col gap-3 px-5 mt-5">
        <Label>Add Score</Label>
       <Input 
       type="number" 
       placeholder="e.g Enter Correct Answers" 
       value={value.score} 
       onChange={(e)=> setValue({...value, score:Number(e.target.value)})}/>
        </div>

        <Button type="submit" className="mt-5 w-full">Create Question</Button>

      </form>
    </div>
      
  )
}

export default QuestionForm

