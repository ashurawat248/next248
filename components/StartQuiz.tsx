import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

interface StartQuizProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    link: string
  }

const StartQuiz = ({setShowModal,  link}:StartQuizProps) => {
    const router = useRouter()

    const handleStartTest = () => {
        setShowModal(false); // Hide the modal
        // You can optionally redirect to a specific route or store the quiz state
        router.push(link)
      }
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg w-1/3'>
            <h2 className='text-xl font-semibold'>Rules and Time Information</h2>
            <p className='mt-4'>
              1. You have 30 minutes to complete the quiz.
            </p>
            <p className='mt-2'>
              2. You can navigate between questions and sections using the "Next" and "Back" buttons.
            </p>
            <p className='mt-2'>
              3. Once the timer ends, the test will automatically submit.
            </p>
            <Button onClick={handleStartTest} className='mt-4 w-full'>
              Start Quiz
            </Button>
          </div>
        </div>
  )
}

export default StartQuiz
