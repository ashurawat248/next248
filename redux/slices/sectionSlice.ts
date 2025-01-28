import { MockTest } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface teststate {
  test:any
  timer:number
  isOnBreak:boolean,
  user:any,
  currentSectionIndex:number
  currentQuestionIndex:number
  attemptedSections:boolean[]
  purchaseStatus: any
  showNavigation:boolean
  bookmarkedQuestions:any
  eliminatedAnswers: any
  showCorrectAnswer:boolean
  breakTimer:number
  hasResult:boolean
  selectedAnswers: {
    [section: string]: {
      [questionIndex: number]: string;
    };
  };
  sectionTimes: any
}

const initialState:teststate = {
    test: null,
    attemptedSections: [false, false, false, false, false, false],
    purchaseStatus:false,
    hasResult:false,
    user:null,
    timer:1800,
    breakTimer:0,
    showCorrectAnswer:false,
    currentSectionIndex: 0,  // Initial section index
    currentQuestionIndex: 0,  // Initial question index
    showNavigation: false,
    isOnBreak: false,
    bookmarkedQuestions: {},
    eliminatedAnswers: {},
    selectedAnswers:{
      section1:{},
      section2:{},
      section3:{},
      section4:{}
    },
    sectionTimes:{}
};

export const calculateScore = (state:any) => {
    const currentSection = state.test.sections[state.currentSectionIndex];
    const questions = currentSection.questions
    // const correctAnswers = currentSection.questions.map((question:any) => question.correctAnswer);
    const userAnswers = Object.values(state?.selectedAnswers[`section${state.currentSectionIndex + 1}`]);
  
    // let correctCount = 0;

    let totalScore = 0; 
    let maxPossibleScore = 0; 

    // alert(`User Answers: ${JSON.stringify(userAnswers)}`);
     
    questions.forEach((question:any, index:any) => { 
      // alert(`Question ${index + 1} Score: ${question.score}, User Answer: ${userAnswers[index]}, Correct Answer: ${question.correctAnswer}`);
      if (userAnswers[index] === question.correctAnswer) { 
        totalScore += question.score; 
      } 
      maxPossibleScore += question.score; 
    });
    
  
    // Compare user answers with correct answers using index
    // correctAnswers.forEach((correctAnswer:any, index:number) => {
    //   if (userAnswers[index] === correctAnswer) {
    //     correctCount++;
    //   }
    // });
  
    // const totalQuestions = currentSection.questions.length;
    // const score = (correctCount / totalQuestions) * 100;
    const scorePercentage = (totalScore / maxPossibleScore) * 100;
    // alert(`Score Percentage: ${scorePercentage}, Total Score: ${totalScore}`); // Debug statement
    return scorePercentage;
};
  

export  const sectionSlice = createSlice({
    name: 'section',
    initialState,
    reducers: {
      setUser:(state, action:PayloadAction<any>) => {
        state.user = action.payload;
      },
      setTest:(state, action: PayloadAction<MockTest[]>) => {
          state.test = action.payload;
      },
      setPurchaseStatus: (state, action) => {
        state.purchaseStatus = action.payload
      },
      setTimer: (state, action) => {
        state.timer = action.payload;
       },
      decrementTimer: (state) => {
        if (state.timer > 0) {
          state.timer -= 1;
       }
      },
      clearTimer: (state) => {
        state.timer = 0; // Clear the timer (reset to 0 when test finishes)
      },
      setSectionStartTime:(state, action) => {
        const { sectionIndex, startTime } = action.payload;
        if (!state.sectionTimes[sectionIndex]) { 
          state.sectionTimes[sectionIndex] = { startTime: null, endTime: null };
         }
         state.sectionTimes[sectionIndex].startTime = startTime;
      },
      setSectionEndTime:(state, action) => {
        const { sectionIndex, endTime } = action.payload;
        if (!state.sectionTimes[sectionIndex]) { 
          state.sectionTimes[sectionIndex] = { startTime: null, endTime: null }; 
        }
        state.sectionTimes[sectionIndex].endTime = endTime;
      },
      setHasResult: (state, action) => {
        state.hasResult = action.payload;
      },
      // Action to set the current section index
      setCurrentSectionIndex: (state, action: PayloadAction<number>) => {
        state.currentSectionIndex = action.payload;
      },
      setCurrentQuestionIndex: (state, action) => {
        state.currentQuestionIndex = action.payload
      },
      // Action to set the current question index
      handleNextQuestion: (state) => {
        const currentSection = state.test?.sections[state.currentSectionIndex];
        const isLastQuestion = currentSection && state.currentQuestionIndex === currentSection.questions.length - 1;
          if (!isLastQuestion) {
              // If not on the last question, move to the next question in the current section
              state.currentQuestionIndex += 1;
              state.showNavigation = false;
          } else {
            if(!state.showNavigation){
              state.showNavigation = true
            }else {
              if(!state.showCorrectAnswer){
                const endTime = new Date().toISOString(); 
                state.sectionTimes[state.currentSectionIndex].endTime = endTime;
                
                // Mark the current section as attempted
                state.attemptedSections[state.currentSectionIndex] = true;
                
              }
              if (state.currentSectionIndex < state.test.sections.length - 1) {

                 //calculating score
                 if(state.timer > 0 && (state.currentSectionIndex === 0 || state.currentSectionIndex === 3)) {
                  const scorePercentage = calculateScore(state)
                  //  alert(`Score Percentage: ${scorePercentage}`);
                   const averageScore = 50;
  
                   if(scorePercentage >= averageScore) {
                    console.log(state.currentSectionIndex, 'secttt')
                     state.currentSectionIndex += 2
                     state.currentQuestionIndex = 0; // Reset to the first question of the new section
                      state.showNavigation = false; // Hide navigation since we're on a new section
                      state.timer = 1800; // Reset timer for the next section
                      state.sectionTimes[state.currentSectionIndex] = { 
                        startTime: new Date().toISOString(), 
                        endTime: null, 
                      };
                      return;
                  }
                 } 
                 
                 if (currentSection?.breakAfter && state.showCorrectAnswer === false) {
                  state.isOnBreak = true; // Set the break flag
                  state.breakTimer = 600; // 10 minutes break time
                } else {
                  if(state.showCorrectAnswer) {

                  const attemptedSections = Object.keys(state.selectedAnswers).filter(setcion =>
                    state.selectedAnswers[setcion] && Object.keys(state.selectedAnswers[setcion]).length > 0 
                   ).map(section => parseInt(section.replace("section", "")))

                   
                   attemptedSections.forEach(sectionIndex => {
                     state.attemptedSections[sectionIndex - 1] = true
                    })
          
                    console.log(attemptedSections, "atempt")
                          
                          const nextAttemptedSectionIndex = attemptedSections?.find(
                            (sectionIndex) => sectionIndex > state.currentSectionIndex + 1
                          );

                          if(nextAttemptedSectionIndex !== undefined) {
                            state.currentSectionIndex = nextAttemptedSectionIndex - 1
                            state.currentQuestionIndex = 0
                            state.showNavigation = false;
                            state.timer = 1800;
                            return;
                          }

                  } else {
                    // Move to the next section's first question
                  const startTime = new Date().toISOString();
                  state.currentSectionIndex += 1; // Move to the next section
                  console.log(state.currentSectionIndex, 'secttt')
                  state.currentQuestionIndex = 0; // Reset to the first question of the new section
                  state.showNavigation = false; // Hide navigation since we're on a new section
                  state.timer = 1800; // Reset timer for the next section
                  state.sectionTimes[state.currentSectionIndex] = { 
                    startTime, 
                    endTime: null, 
                  };
                }
            }
              
            } else {
                // If there is no next section, handle quiz completion
                state.timer = 0; // Set timer to 0
                
            }
          }
          }
      },

      handlePreviousQuestion:(state) => {
        if(state.currentQuestionIndex > 0 ){
          state.currentQuestionIndex -= 1
        }else if (state.showCorrectAnswer && state.currentSectionIndex > 0) { 
            const attemptedSections = state.attemptedSections
            .map((attempted, index) => (attempted ? index : null))
            .filter(index => index !== null);
            
            const prevAttemptedSectionIndex = attemptedSections?.slice().reverse().find(
              (sectionIndex) => sectionIndex < state.currentSectionIndex
            );

            if( prevAttemptedSectionIndex !== undefined) {
              state.currentSectionIndex =  prevAttemptedSectionIndex
              const prevSection = state.test.sections[state.currentSectionIndex];
              state.currentQuestionIndex = prevSection.questions.length - 1;
              state.showNavigation = false;
              state.timer = 1800;
              return;
            }
          }
      },
      setShowNavigation(state, action: PayloadAction<boolean>) {
        state.showNavigation = action.payload;
      },
      setAnswer: (state, action: PayloadAction<{ section: string; questionIndex: number; answer: string }>) => {
        const { section, questionIndex, answer } = action.payload;
         if (!state.selectedAnswers[section]) { 
          state.selectedAnswers[section] = {}; 
        } 
        state.selectedAnswers[section] = {
          ...state.selectedAnswers[section], // Spread the previous answers to preserve them
          [questionIndex]: answer, // Update the current question's answer
        };
      },
      // Action to reset the quiz progress (useful when the quiz is reset or completed)
      resetSectionState(state) {
        state.currentSectionIndex = 0;
        state.currentQuestionIndex = 0;
        state.timer = 1800;
        state.test = null;
        state.hasResult = false;
        state.showNavigation = false;
        state.bookmarkedQuestions = {},
        state.eliminatedAnswers = {},
        state.selectedAnswers = {}; // Optionally reset answers if you track selected answers
      },
      toggleBookmark: (state, action: PayloadAction<{ section: number; questionIndex: number }>) => {
        const { section, questionIndex } = action.payload;
        console.log(section, questionIndex, 'toglle working')
  
        // Toggle the bookmarked question for the specific section and question
        const sectionBookmarks = state.bookmarkedQuestions[section] || [];
        if (sectionBookmarks.includes(questionIndex)) {
          // Remove from bookmarks if already bookmarked
          state.bookmarkedQuestions[section] = sectionBookmarks.filter((index:number) => index !== questionIndex);
        } else {
          // Add to bookmarks
          state.bookmarkedQuestions[section] = [...sectionBookmarks, questionIndex];
        }
      },
      setEliminatedAnswer(state, action) {
        const { questionIndex, answer } = action.payload;
        if (!state.eliminatedAnswers[questionIndex]) {
          state.eliminatedAnswers[questionIndex] = [];
        }
        // Toggle the elimination (add or remove)
        const eliminatedIndex = state.eliminatedAnswers[questionIndex].indexOf(answer);
        if (eliminatedIndex > -1) {
          state.eliminatedAnswers[questionIndex].splice(eliminatedIndex, 1); // Remove it if already eliminated
        } else {
          state.eliminatedAnswers[questionIndex].push(answer); // Add to eliminated if not already there
        }
      },
      setIsOnBreak: (state, action:PayloadAction<boolean>) =>{
        state.isOnBreak = action.payload
      },
      setBreakTimer(state, action: PayloadAction<number>) {
        state.breakTimer = action.payload;
      },
      decrementBreakTimer(state) {
          if (state.breakTimer > 0) {
              state.breakTimer -= 1;
          }
      },
      resetBreak(state) {
          state.isOnBreak = false;
          state.breakTimer = 0;
          state.showNavigation = false;
      },
      setShowCorrectAnswer:(state, action) => {
        state.showCorrectAnswer = action.payload
      },
      setSelectedAnswer: (state, action: PayloadAction<{
          section: string;
          questionIndex: number;
          answer: string;
        }>
      ) => {
        const { section, questionIndex, answer } = action.payload;
        if (state.selectedAnswers[section]) {
          state.selectedAnswers[section][questionIndex] = answer;
        }
      },
    },
  });
  
  export const {
    setCurrentSectionIndex,
    setCurrentQuestionIndex,
    handlePreviousQuestion,
    setUser,
    selectedAnswers,
    setHasResult,
    setPurchaseStatus,
    setBreakTimer,
    setIsOnBreak,
    setSectionStartTime, 
    setSectionEndTime,
    handleNextQuestion,
    setAnswer,
    resetBreak,
    setShowCorrectAnswer,
    decrementBreakTimer,
    setSelectedAnswer,
    toggleBookmark,
    setEliminatedAnswer,
    setShowNavigation,
    resetSectionState,
    setTest,
    setTimer, decrementTimer, clearTimer
  } = sectionSlice.actions;
  
  export default sectionSlice.reducer;