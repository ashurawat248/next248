'use client'
import { CldUploadWidget } from 'next-cloudinary'
import React, { useCallback } from 'react'
import Image from "next/image";
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
    var cloudinary:any;
}

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string |null
}

const SolutionImageUpload:React.FC<ImageUploadProps> = ({
    onChange,
    value
}) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    },[onChange])
  return (
   <CldUploadWidget
   onSuccess={handleUpload}
   uploadPreset='ecv7rqof'
   options={{
    maxFiles: 1
   }}
   >
    {({open}) => {
        return (
            <div onClick={() => open?.()} className='relative cursor-pointer hover:opacity-70 transition
             borderdashed border-2 p-20 border-neutral-300 flex flex-col justify-center gap-4 text-neutral-600 '>
                <TbPhotoPlus size={50}/>
                <div className='font-semibold text-lg'>
                    Click to Upload    
                 </div> 
         {
         value && (
        <div className='absoluet inset-0 w-full h-full'>
            <Image 
            src={value} 
            alt='upload' 
            fill
            style={{objectFit: 'cover'}}
            />
          </div>
          ) 
         }
         </div>
        )
    }}
   </CldUploadWidget>
  )
}

export default SolutionImageUpload;
