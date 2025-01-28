'use client'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { db } from '@/lib/prismadb';
import React, { useEffect, useState } from 'react';
import SolutionImageUpload from '../../[sectionId]/_component/SolutionImageUplaod';
import VideoUpload from '../../[sectionId]/_component/VideoUplaod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export enum QuestionType {
  TRUE_FALSE = "TRUE_FALSE",
  DATA_ENTRY = "DATA_ENTRY",
}

type ValueType = { 
  questionText: string; 
  questionType: QuestionType; 
  imageSrc: string | null ; 
  score: number;
  solutionSrc: string | null; 
  videoSrc: string | null; 
  answers: string[]; 
  correctAnswer: string; 
  // sectionId: string;
}

const Page = ({ params }: { params: { questionId: string } }) => {
    const {questionId} = React.use(params);
    const router = useRouter()
  const [value, setValue] = useState<ValueType>({
    questionText: '',
    score: 0,
    questionType: QuestionType.TRUE_FALSE,
    imageSrc: '',
    solutionSrc: '',
    videoSrc: '',
    answers: [],
    correctAnswer: ''
  });

  useEffect(() => {
    const fetchQuestionDetails = async () => {
    //   const questionId = params?.questionId;
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/quiz/section/question/${questionId}`)  
      const data = await res.json()
      console.log(data)
    //   const findQuestion = data?.singleQuestion
      if (data) {
        setValue({
          questionText: data.questionText,
          score: data.score,
          questionType: data.questionType,
          imageSrc: data.imageSrc,
          solutionSrc: data.solutionSrc,
          videoSrc: data.videoSrc,
          answers: data.answers,
          correctAnswer: data.correctAnswer,
        });
      }
    };

    fetchQuestionDetails();
  }, [params]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.patch(`/api/quiz/section/question/${questionId}`, value)
    console.log(res, 'working')
    router.refresh()
    toast.success("Question Updated Successfully")
  };

  const handleAnswerChange = (index: number, newValue: string) => {
    const newAnswers = [...value.answers];
    newAnswers[index] = newValue;
    setValue({ ...value, answers: newAnswers });
  };

  const addAnswer = () => {
    setValue({ ...value, answers: [...value.answers, ''] });
  };

  const removeAnswer = (index: number) => {
    const newAnswers = value.answers.filter((_, i) => i !== index);
    setValue({ ...value, answers: newAnswers });
  };

  return (
    <div className='mt-6 border w-[50%] bg-slate-100 rounded-md p-4'>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 px-5">
          <Label>Enter Question Text</Label>
          <Input type="text" placeholder="e.g Enter questionText" value={value.questionText} 
            onChange={(e) => setValue({ ...value, questionText: e.target.value })} />
        </div>

        <div className="flex flex-col gap-3 px-5 mt-5">
          <Label>Enter QuestionType</Label>
          <div className="flex gap-3">
            <Label className="flex gap-2">
              <Checkbox 
                checked={value.questionType === QuestionType.DATA_ENTRY}  
                onCheckedChange={() => setValue({ ...value, questionType: QuestionType.DATA_ENTRY })} />
              Data Entry
            </Label>
            <Label className="flex gap-2">
              <Checkbox 
                checked={value.questionType === QuestionType.TRUE_FALSE}  
                onCheckedChange={() => setValue({ ...value, questionType: QuestionType.TRUE_FALSE })} />
              True False
            </Label>
          </div>
        </div>

        {value.questionType === QuestionType.TRUE_FALSE && (
          <div className='flex flex-col gap-3 px-5 mt-5'>
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
          </div>
        )}

        <div>
          <label className="text-2xl font-semibold">Graph's</label>
          <SolutionImageUpload value={value.imageSrc} onChange={(newImageSrc: string) => 
            setValue((prevValue) => ({
              ...prevValue,
              imageSrc: newImageSrc,
            }))} />
          <label className="text-2xl font-semibold">Solution</label>
          <SolutionImageUpload value={value.solutionSrc} onChange={(newSolutionSrc: string) => 
            setValue((prevValue) => ({
              ...prevValue,
              solutionSrc: newSolutionSrc,
            }))} />
          <label className="text-2xl font-semibold">Video Solution</label>
          <VideoUpload value={value.videoSrc} onChange={(newVideoSrc: string) => 
            setValue((prevValue) => ({
              ...prevValue,
              videoSrc: newVideoSrc,
            }))} />
        </div>

        <div className="flex flex-col gap-3 px-5 mt-5">
          <Label>Add Correct Answers</Label>
          <Input 
            type="text" 
            placeholder="e.g Enter Correct Answers" 
            value={value.correctAnswer} 
            onChange={(e) => setValue({ ...value, correctAnswer: e.target.value })} />
        </div>
        <div className="flex flex-col gap-3 px-5 mt-5">
          <Label>Add Score</Label>
          <Input 
            type="number" 
            placeholder="e.g Enter Correct Answers" 
            value={value.score} 
            onChange={(e) => setValue({ ...value, score: Number(e.target.value) })} />
        </div>

        <Button type="submit" className="mt-5 w-full">Update Question</Button>
      </form>
    </div>
  );
};

export default Page;
