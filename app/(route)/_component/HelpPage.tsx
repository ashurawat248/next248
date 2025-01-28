import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  import { Separator } from "@/components/ui/separator"

const HelpPage = ({showHelpPage, setShowHelpPage}:{showHelpPage:boolean, setShowHelpPage:any}) => {
  return (
    <Dialog open={showHelpPage} onOpenChange={(open) => setShowHelpPage(open)}>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Help</DialogTitle>
        <Separator className="my-6" />
        <DialogDescription>
         <h1 className='text-xl text-black font-semibold'>Screen Magnification</h1>
        <Separator className="my-2" />
        <p>Screen magnification technology enlarges the content displayed on the computer screen in order to assist students with visual impairments. Although the exam app supports some non-embedded screen magnifier tools from third parties, all users can zoom using their device's native controls (Control +/- on a PC; Command +/- on a Mac; pinch and zoom on an iPad).</p>
        <Separator className="my-4" />
         <h1 className='text-xl text-black font-semibold'>Submitting Your Answer's</h1>
        <Separator className="my-2" />
        <p>Screen magnification technology enlarges the content displayed on the computer screen in order to assist students with visual impairments. Although the exam app supports some non-embedded screen magnifier tools from third parties, all users can zoom using their device's native controls (Control +/- on a PC; Command +/- on a Mac; pinch and zoom on an iPad).</p>
        </DialogDescription>
        </DialogHeader>
    </DialogContent>
    </Dialog>
  )
}

export default HelpPage
