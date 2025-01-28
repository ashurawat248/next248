'use client'
import { CldUploadWidget } from 'next-cloudinary'
import React, { useCallback } from 'react'
import { TbPhotoPlus } from 'react-icons/tb';  // Icon for uploading
// import VideoPlayer from 'react-player/lazy';  // Video Player for preview

declare global {
  var cloudinary: any;
}

interface VideoUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onChange, value }) => {

    console.log(value, 'vall')

  const handleUpload = useCallback((result: any) => {
    // Get the video URL after upload
    onChange(result.info.secure_url); // This will return the URL of the uploaded video
  }, [onChange]);

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset='ecv7rqof'  // Replace with your Cloudinary preset
      options={{
        maxFiles: 1,  // Allow only 1 video file to be uploaded
        resourceType: 'video',  // Ensure the upload is of type 'video'
      }}
    >
      {({ open }) => (
        <div
          onClick={() => open?.()}
          className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center gap-4 text-neutral-600"
        >
          <TbPhotoPlus size={50} />
          <div className="font-semibold text-lg">Click to Upload Video</div>

          {/* If there's an uploaded video, display it as a preview */}
          {value && (
            <div className="absolute inset-0 w-full h-[20%] ">
              <video
                // url={value}  // Use the Cloudinary video URL for the preview
                width={1000}
                height={50}
                controls
                key={value}
                className='rounded-sm h-[22vw]'
                style={{ objectFit: 'cover' }}
              >
                <source src={value} type='video/mp4'/>
              </video>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default VideoUpload;
