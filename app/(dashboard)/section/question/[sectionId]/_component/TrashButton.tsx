'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoTrashBin } from 'react-icons/io5';
import { toast } from 'sonner';

interface TrashButtonProps {
  itemId?: string;
  sectionId?: string
}


const TrashButton: React.FC<TrashButtonProps> = ({ itemId, sectionId}) => {
    const router = useRouter()

    const removeQuestion = async () => {
       try {
        const res = sectionId ? await axios.delete(`/api/quiz/section/${sectionId}`) 
        : await axios.delete(`/api/quiz/section/question/${itemId}`)
         if(res.status === 200){
             toast.success('Deleted Successfully')
             router.refresh()
         }else {
            toast.error('Failed to delete')
         }
       } catch (error:any) {
        toast.error(error)
       }
    }

  return (
    <IoTrashBin size={16} onClick={removeQuestion} />
  );
};

export default TrashButton;
