import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTimer, decrementTimer, setIsOnBreak, 
  setCurrentQuestionIndex, 
  setCurrentSectionIndex, 
  setTimer, 
  setBreakTimer, 
  setSectionStartTime, 
  setSectionEndTime,  
  setShowNavigation} from '@/redux/slices/sectionSlice';
import { useRouter } from 'next/navigation';



// Custom hook to manage the timer
const useTimer = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {test, 
    timer, 
    selectedAnswers, 
    currentSectionIndex, 
    isOnBreak, 
    showCorrectAnswer, 
    currentQuestionIndex
  } = useSelector((store:any)=> store.section)

  console.log(isOnBreak, "breakskskks")

  const calculateScores = () => {
    console.log(currentSectionIndex, selectedAnswers, 'chec')
    const currentSection = test?.sections[currentSectionIndex];
    const questions = currentSection.questions
    // const correctAnswers = currentSection?.questions?.map((question:any) => question?.correctAnswer);
    const userAnswers = Object?.values(selectedAnswers[`section${currentSectionIndex + 1}`]);
    console.log(userAnswers, currentSectionIndex, 'userAnswers check');
    // let correctCount = 0;
    let totalScore = 0; 
    let maxPossibleScore = 0; 

    questions.forEach((question:any, index:any) => { 
      // alert(`Question ${index + 1} Score: ${question.score}, User Answer: ${userAnswers[index]}, Correct Answer: ${question.correctAnswer}`);
      if (userAnswers[index] === question.correctAnswer) { 
        totalScore += question.score; 
      } 
      maxPossibleScore += question.score; 
    });
  
    // Compare user answers with correct answers using index
    // correctAnswers?.forEach((correctAnswer:any, index:number) => {
    //   if (userAnswers[index] === correctAnswer) {
    //     correctCount++;
    //   }
    // });
  
    // const totalQuestions = currentSection?.questions.length;
    // const score = (correctCount / totalQuestions) * 100;
    // console.log(score, correctCount, 'working');
    // return score;
    const scorePercentage = (totalScore / maxPossibleScore) * 100;
    return scorePercentage;
  }

  useEffect(() => {

    if (showCorrectAnswer) { 
      return; 
    }


    if (timer === 1800) { 
      const startTime = new Date().toISOString(); 
      dispatch(setSectionStartTime({ sectionIndex: currentSectionIndex, startTime }));
     }

    // Only set interval if the timer is greater than 0
    if (timer <= 0){
      const endTime = new Date().toISOString(); 
      dispatch(setSectionEndTime({ sectionIndex: currentSectionIndex, endTime }));

      //calculating Score
      if(currentSectionIndex === 0 || currentSectionIndex === 3) {

        const score = calculateScores()
        const averageScore = 50;
        if(score >= averageScore) {
          console.log(currentSectionIndex, 'secttt')
          dispatch(setCurrentSectionIndex(currentSectionIndex + 2))
          dispatch(setCurrentQuestionIndex(0))
          dispatch(setShowNavigation(false))
          dispatch(setTimer(1800))
          dispatch(setSectionStartTime({
            sectionTimes: {[currentSectionIndex]:{ 
              startTime: new Date().toISOString(), 
              endTime: null, 
            }
          }
        }))
        return;
      }
     } 
     if(test && test.sections && currentSectionIndex !== undefined) {

       if(test && test?.sections[currentSectionIndex]?.breakAfter) {
         dispatch(setIsOnBreak(true))
        dispatch(setBreakTimer(600))
        router.push('/break')
      }else {
        if(test && test?.sections && currentSectionIndex < test?.sections.length - 1){
          dispatch(setCurrentSectionIndex(currentSectionIndex + 1))
          dispatch(setCurrentQuestionIndex(0))
          dispatch(setTimer(1800))
          // useSectionChange(currentSectionIndex + 1);
        } else {
          dispatch(setTimer(0)); 
          router.push(`/finesh/${test?.id}`);
        }
      }
    }
      return;
    } 

    const intervalId = setInterval(() => {
      if (timer <= 0) {
        clearInterval(intervalId);
        dispatch(clearTimer());

        const endTime = new Date().toISOString(); 
        dispatch(setSectionEndTime({ sectionIndex: currentSectionIndex, endTime }));
        
        
        // If current section is Section 1, move to Section 2
        if (currentSectionIndex === 0 || (currentSectionIndex === 4 && currentQuestionIndex === test.sections[4].questions.length - 1)) {
          if(test && currentSectionIndex < test?.sections.length  ){
            dispatch(setCurrentSectionIndex(currentSectionIndex + 1))
            dispatch(setCurrentQuestionIndex(0))
            dispatch(setTimer(1800))
            // useSectionChange(currentSectionIndex + 1);
          } else {
            dispatch(setTimer(0)); 
            router.push(`/finish/${test?.id}`);
          }
        }
        return; // Timer ended, exit the effect
      }

      // Dispatch the decrementTimer action to decrease the timer
      dispatch(decrementTimer());
    }, 1000); // Decrement every second

    // Cleanup the interval when the component unmounts or timer changes
    return () => clearInterval(intervalId);
  }, [timer, currentSectionIndex, dispatch]); // Dependencies array
};

export default useTimer;