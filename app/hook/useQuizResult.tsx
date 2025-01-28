import { setTest, setUser } from "@/redux/slices/sectionSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface useQuizResultProps {
    mockTestId: string | null | undefined
    score: number | null | undefined
    totalQuestions: number | null | undefined
    existingResult: any;
    selectedAnswer:any
}


const useQuizResult = ({mockTestId, existingResult, score, totalQuestions, selectedAnswer}:useQuizResultProps) => {
    const {user} = useSelector((store:any) => store.section)
    const userId = user.newUser._id
    const userEmail = user?.newUser?.email
    const  dispatch = useDispatch()
    const [resultCreated, setResultCreated] = useState(false);
    console.log(userEmail, 'email')

    useEffect(()=> {
        if (!mockTestId || resultCreated || existingResult) return;

        const quizResult = async () => {
            try {
                console.log("Sending data:", { mockTestId, score, totalQuestions, userEmail })
                const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/quizresult`, {
                    userId,
                    mockTestId,
                    score,
                    selectedAnswer,
                    userEmail,
                    totalQuestions
                })
                console.log(res, 'wokr')
                setResultCreated(true);

                    dispatch(setUser({
                        ...user,
                        newUser: {
                            ...user.newUser,
                            userResult: [
                                ...user.newUser.userResult, 
                                res.data
                            ]
                        }
                    }))
            } catch (error) {
                console.log(error)
            }
        }
        quizResult()
    },[mockTestId, score, totalQuestions, resultCreated])

    return null;
}

export default useQuizResult;