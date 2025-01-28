import { Button } from '@/components/ui/button'
import { 
  resetSectionState, 
  setAnswer, 
  setCurrentQuestionIndex, 
  setCurrentSectionIndex, 
  setShowCorrectAnswer, 
  setTest, 
  setTimer 
} from '@/redux/slices/sectionSlice'
import { useRouter } from 'next/navigation'
import React, { useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { persistor } from '@/redux/store'
import LeftDiv from './LeftDiv'
import ResultDescription from './ResultDescription'
import { setLoading } from '@/redux/slices/loaderSlice'
import useQuizResult from '@/app/hook/useQuizResult'
import useFindTopper from '@/app/hook/useFindTopper'



const PaidResult = ({testId}:{testId:string}) => {
  const {test, user, selectedAnswers} = useSelector((store:any) => store.section)
  const {loading} = useSelector((store:any) => store.loader)
    const dispatch = useDispatch()
    const router = useRouter()

    console.log(loading, test, user, selectedAnswers, testId, 'idss')

    
    
    const countCorrectAnswers = () => {
      let totalScore = 0
  
      test?.sections?.forEach((section:any, sectionIndex:number)=> {
  
        section?.questions?.forEach((question:any, questionIndex:number)=> {
  
          const userAnswersForSection = selectedAnswers[`section${sectionIndex + 1}`]
          if(userAnswersForSection) {
            const userAnswer = userAnswersForSection[questionIndex] || {};
            if (userAnswer && userAnswer === question.correctAnswer) { 
              totalScore +=  question.score;
            }
          }
        });
      });
      return totalScore;
    }
    
    const totalCorrectAnswers = countCorrectAnswers()
    // alert(`Total Score of Correct Answers: ${totalCorrectAnswers}`);
    
    // const totalQuestions = test?.sections?.reduce((total:number, section:any) => { 
    //   return total + section?.questions?.length; 
    // }, 0);

    // const totalQuestions = test?.sections.slice(0, 4)

    const totalQuestions = test?.sections?.slice(0, 4).reduce((total: number, section: any) => {
      console.log(`Processing section: ${section.name}`);
      const sectionTotal = section.questions.reduce((sectionTotal: number, question: any) => {
          console.log(`Processing question ID: ${question.id}, Score: ${question.score}`);
          return sectionTotal + (question.score || 0);
      }, 0);
      console.log(`Section Total: ${sectionTotal}`);
      return total + sectionTotal;
  }, 0);
  
  console.log(`Total Score: ${totalQuestions}`);

  
  
  const existingResult = user && user?.newUser?.userResult.find((result: any) => result?.mockTestId === testId)
  console.log(existingResult, 'sscc')
    
    
    useQuizResult({
      mockTestId: testId,
      score: totalCorrectAnswers,
      selectedAnswer:selectedAnswers,
      totalQuestions: totalQuestions,
      existingResult:existingResult
    })
    
    const {toppers} = useFindTopper({ mockTestId: testId})
    console.log(existingResult, toppers, 'resultt')

      useEffect(() => { 
        if (!test && user?.newUser?.userResult && existingResult) { 
          //seting Test
          dispatch(setTest(existingResult?.mockTest)); 
          const selectedAnswers = existingResult?.selectedAnswer

          console.log(selectedAnswers, 'answress')

          for(const section in selectedAnswers){
            const answers = selectedAnswers[section];
            if (answers) {
              Object.entries(answers).forEach(([questionIndex, answer]) => {
                 dispatch(setAnswer({
                     section,
                     questionIndex: Number(questionIndex),
                     answer: answer as string,
                 }));
      });
            }
          }
        
        }
         
      }, [existingResult, dispatch]);

    
    
    const handleReload = () => {
          dispatch(resetSectionState());
          dispatch(setShowCorrectAnswer(false))
          persistor.purge(); 
          
          dispatch(setLoading(false))
          router.push('/');
      };

    const handleSolution = () => {
       if(test?.completed === true) {
         dispatch(setShowCorrectAnswer(true))
         dispatch(setCurrentSectionIndex(0)); 
         dispatch(setCurrentQuestionIndex(0));
         dispatch(setTimer(0))
         router.push(`/quiz/${test?.mockTest?.id}`)
        }else {
          dispatch(setShowCorrectAnswer(true))
          dispatch(setCurrentSectionIndex(0)); 
          dispatch(setCurrentQuestionIndex(0));
          dispatch(setTimer(0))
          router.push(`/quiz/${test?.id}`)
        }
      }
      

  return (
    <div className='w-full h-screen my-2 p-12 overscroll-y-none bg-gradient-to-t from-blue-500 to-white'>
      <div>
        <h1 className='text-center text-4xl font-semibold text-blue-500'>Your MockTest Result</h1>
        <p></p>
      </div>
        <div className='flex justify-between gap-2'>
          <LeftDiv 
          totalCorrectAnswers={totalCorrectAnswers} 
          totalQuestions={totalQuestions}
          completed={existingResult?.completed}
          score={existingResult?.score}
          createdAt={existingResult?.createdAt}
          toppers={toppers}
          />
          <ResultDescription/>
        </div>
        <div className='flex items-center gap-2 justify-center my-6'>
        <Button size="sm" className='bg-blue-900 rounded-full hover:bg-blue-800' onClick={handleReload}>FINESH TEST</Button>
        <Button size="sm" className='bg-blue-900 rounded-full hover:bg-blue-800' onClick={handleSolution}>CHECK SOLUTION</Button>
        </div>
    </div>
  )
}

export default PaidResult
