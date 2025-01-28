// import { setTest } from "@/redux/slices/sectionSlice"
import axios from "axios"
import { useEffect, useState } from "react"


const useGetResult = () => {
    const [results, setResults] = useState([]);
    useEffect(() => {
        const checkResult = async () => {
            try {
                const res = await axios.get('/api/getresult')
                const data = res.data
                console.log(data, 'dtasss')
                setResults(data)
               
            } catch (error) {
                console.log(error)
            }
        }
            checkResult(); 
        
    },[])
    return results;
}


export default useGetResult;