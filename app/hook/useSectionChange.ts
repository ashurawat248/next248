import { setCurrentQuestionIndex, setCurrentSectionIndex } from '@/redux/slices/sectionSlice';
import { setTimer } from '@/redux/slices/loaderSlice';
import React from 'react'

const useSectionChange = ({nextSectionIndex, mockTest}: {nextSectionIndex: number, mockTest:any}) => {
    if (mockTest && nextSectionIndex < mockTest.sections.length) {
        setCurrentSectionIndex(nextSectionIndex);
        setCurrentQuestionIndex(0); // Reset to the first question of the new section
        setTimer(1800); // Reset the timer for the new section
      } else {
        alert('Quiz completed!');
        // Redirect or show results (you can redirect to a results page or show a summary)
      }
}

export default useSectionChange
