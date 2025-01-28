import React from 'react'
import { useSelector } from 'react-redux';
import { FaClock } from "react-icons/fa";

const TimeCalculate = () => {

    const {sectionTimes} = useSelector((store:any) => store.section)

    const calculateSectionDuration = (startTime:number, endTime:number) => { 
        if (startTime && endTime) { 
          const start = new Date(startTime); 
          const end = new Date(endTime); 
          if (start.getTime() > end.getTime()) {
            console.warn(`Start time is later than end time for section. Start: ${start}, End: ${end}`);
        }

        const duration = (end.getTime() - start.getTime()) / 1000; // Convert milliseconds to seconds
        console.log(`Section Duration: ${duration} seconds`, start, end);

        // Ensure positive duration (take absolute value)
        return Math.abs(duration);
        }
        return 0
      }

      const formatTime = (totalSeconds: number) => { 
        const hours = Math.floor(totalSeconds / 3600); // Get the hours
        const minutes = Math.floor((totalSeconds % 3600) / 60); // Get the minutes
        const seconds = Math.floor(totalSeconds % 60); // Get the remaining seconds

        // Format the hours, minutes, and seconds to be two digits if less than 10
        const formattedHours = hours > 0 ? `${String(hours).padStart(2, '0')}:` : '';
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
    };

    let totalDuration = 0;

    Object.keys(sectionTimes).forEach((sectionIndex) => {
      const times = sectionTimes[sectionIndex];
      const duration = calculateSectionDuration(times.startTime, times.endTime);
      totalDuration += duration;
  });

  console.log(`Total Duration: ${totalDuration} seconds`);

    

  return (
    <div>
      {/* {Object.keys(sectionTimes).map((sectionIndex) => { 
        const times = sectionTimes[sectionIndex]; 
        const duration = calculateSectionDuration(times.startTime, times.endTime); 
        totalDuration += duration;
        return ( 
        <div key={sectionIndex}> 
        </div> 
    ); 
})} */}
    <div> 
     <h3 className='flex items-center gap-2'>
        <FaClock size={20} className='text-orange-600'/>
        Time Taken:{formatTime(totalDuration)}
    </h3> 
    </div>
    </div>
  )
}

export default TimeCalculate
