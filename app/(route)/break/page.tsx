'use client'
import { resetBreak, decrementBreakTimer, setTimer, setCurrentQuestionIndex, setCurrentSectionIndex } from '@/redux/slices/sectionSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const BreakPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {breakTimer, currentSectionIndex, test, isOnBreak} = useSelector((store:any) => store.section)

    console.log(currentSectionIndex, 'break test')

    const handleClick = () => {
        // Reset the break state and move to the next section
        dispatch(resetBreak()); // Reset break state
        const mathSectionIndex = 3;
        dispatch(setCurrentSectionIndex(mathSectionIndex)); // Move to the next section
        dispatch(setCurrentQuestionIndex(0)); // Reset to the first question of the new section
        dispatch(setTimer(1800)); // Reset the timer for the next section
        router.push(`/quiz/${test.id}`); // Navigate to the quiz page
        console.log(`Navigating to section: ${mathSectionIndex}`);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (breakTimer <= 0) {
                clearInterval(intervalId);
                // When the break is over, transition to the next section
                dispatch(resetBreak()); // Reset break state
                const mathSectionIndex = 3;
                dispatch(setCurrentSectionIndex(mathSectionIndex)); // Move to the next section
                dispatch(setCurrentQuestionIndex(0)); 
                dispatch(setTimer(1800)); 
                router.push(`/quiz/${test.id}`); // Navigate to the quiz page
            } else {
                dispatch(decrementBreakTimer()); 
            }
        }, 1000); // Decrement every second

        return () => clearInterval(intervalId); // Cleanup the interval on unmount
    }, [breakTimer, dispatch, currentSectionIndex, router]);


    return (
        <div className='bg-black absolute h-full w-full'>
            <div className='flex items-center justify-center gap-8'>
            <div className='text-white flex flex-col gap-8 items-center rounded-lg'>
            <div className='text-white px-8 py-5 flex flex-col gap-4 items-center rounded-lg border'>
            <h1 className='text-xl'>Remaining Break Time:</h1>
            <p className='text-4xl'>{Math.floor(breakTimer / 60)}:{(breakTimer % 60).toString().padStart(2, '0')}</p>
            </div>
            <button className='bg-yellow-400 p-2 text-black rounded-full' onClick={handleClick}>Resume Testing</button>
            </div>

            <div className='h-screen w-[40%] px-12'>
            <div className='flex flex-col gap-5'>
            <h1 className='text-white text-xl'>Practice Test Break</h1>
            <p className='text-white'>You can resume this practice test as soon as you're ready to move on. On test day, you'll wait until the clock counts down. 
            Read below to see how breaks work on test day.</p>
            </div>
                <div className='border w-80 border-white my-5'></div>
            <div>
                <div className='text-white flex flex-col gap-8'>
                <h1 className='text-white text-4xl'>Take a Break</h1>
                    <p>You may leave the room, but do not disturb students who are still testing.</p>
                    <p>Do not exit the app or close your device. Testing won't resume until you return.</p>
                    <h1 className='text-xl'>Follow these rules during the break:</h1>
                    <div>

                    <h3>
                        1. Do not access your phone, smartwatch, textbooks, notes, or the internet.
                    </h3>
                    <h3>
                        2. Do not eat or drink in the test room.
                    </h3>
                    <h3>
                        3. Do not speak in the test room; outside the test room, do not discuss the exam with anyone
                    </h3>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </div>
    );
};

export default BreakPage;
