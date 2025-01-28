'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { resetSectionState, setShowCorrectAnswer, setTimer } from "@/redux/slices/sectionSlice";
import { persistor } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
  
const Help = ({showHelp, setShowHelp}:{showHelp:boolean, setShowHelp:any}) => {
    const dispatch = useDispatch()
    const router = useRouter()

    const handleReload = useMemo(() => {
        return () => {
          // Dispatch reset action to reset the section state
          dispatch(resetSectionState());
          persistor.purge(); 
          // Redirect to the home page after dispatching the action
          dispatch(setTimer(1800))
          dispatch(setShowCorrectAnswer(false))
          router.push('/');
        };
      }, [dispatch, router]);

  return (
    <Dialog open={showHelp} onOpenChange={(open) => setShowHelp(open)}>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Do You Want to Exit this Practice Test?</DialogTitle>
        <DialogDescription>
        If you exit now, your test will end, and your score will be calculated. 
        You will not be able to return to the test. Are you sure you want to end your test and exit?
        </DialogDescription>
        <div className="flex gap-4">
        <Button className="bg-transparent text-blue-600 font-light 
        hover:bg-transparent hover:underline" onClick={() => setShowHelp(false)}>Continue Practice Test</Button>
        <Button className="bg-yellow-400 text-black font-bold 
        rounded-full hover:bg-yellow-400" onClick={handleReload}>End and Score</Button>
        </div>
        </DialogHeader>
    </DialogContent>
    </Dialog>
  )
}

export default Help
