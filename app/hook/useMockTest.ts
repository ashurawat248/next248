import { setTest } from "@/redux/slices/sectionSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";



const useMockTest =  ({testId}:{testId: string | null}) => {
    const dispatch = useDispatch()
    useEffect(() => {
    const fetchMockTest = async () => {
         if(testId) {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/quiz/${testId}`);
            const data = response.data;
            console.log(data, 'test')
            dispatch(setTest(data))
            // setMockTest(data);
    } catch (error) {
      console.log('Error fetching mock test:', error);
    }
        }
 };
          fetchMockTest();
},[testId])
}

export default useMockTest;