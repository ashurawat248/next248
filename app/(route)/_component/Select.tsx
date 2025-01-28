import { VscQuestion } from "react-icons/vsc";
import { CiKeyboard } from "react-icons/ci";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import React, { useState } from 'react'
import Help from "./Help";
import HelpPage from "./HelpPage";
import { Separator } from "@/components/ui/separator"



const Select = () => {
    const [showHelp, setShowHelp] = useState(false)
    const [showHelpPage, setShowHelpPage] = useState(false)
  return (
    <div className='border w-52 h-36 absolute top-[5rem] bg-white z-10 right-8 overflow-hidden'>
      <div className="flex flex-col cursor-pointer">
        <h3 className="flex items-center gap-3 text-lg p-4 hover:bg-slate-100 hover:underline"
        onClick={()=> setShowHelpPage(!showHelpPage)}
        >
        <VscQuestion size={20}/>
         Help
        </h3>
        <Separator className="my-1" />
        <h3 
        className="flex items-center gap-3 text-lg p-4 hover:bg-slate-100 hover:underline"
        onClick={() => setShowHelp(!showHelp)}
        >
        <VscWorkspaceTrusted size={20}/>
         End and Score
        </h3>
      </div>
      {showHelp && <Help showHelp={showHelp} setShowHelp={setShowHelp}/>}
      {showHelpPage && <HelpPage showHelpPage={showHelpPage} setShowHelpPage={setShowHelpPage}/>}
    </div>
  )
}

export default Select
