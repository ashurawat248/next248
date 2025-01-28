import { useEffect, useState } from "react";



const useFindTopper = ({mockTestId}:{mockTestId: string}) => {
  const [toppers, setToppers] = useState(0)
  console.log(mockTestId, toppers, 'testid')
    useEffect(() => {
        const topper = async () => {
       try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/quizresult/findtopper/${mockTestId}`)
         const topper = await res.json()
         console.log(topper.score, 'topper')
         setToppers(topper.score)
       } catch (error) {
        console.error("Error fetching topper:", error)
       }
        }
            topper(); 
    },[mockTestId])
    return{toppers}
}

export default useFindTopper;