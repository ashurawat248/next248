import React from 'react';


const TotalTimeOfSection = () => {
  const calculateTotalAvailableTime = () => {
    const numberOfSections = 4;
    const totalMinutes = numberOfSections * 30;
    return totalMinutes * 60; // Convert to seconds
  };

  const formatTime = (totalSeconds: number) => {
    const hours= Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const formattedHours = String(hours)
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  };

  const totalDurationInSeconds = calculateTotalAvailableTime();
  const formattedTotalTime = formatTime(totalDurationInSeconds);
  console.log(`Total Available Section Time: ${formattedTotalTime}`);

  return (
    <div>
      <h3 className='flex items-center gap-2'>
        Total Time: {formattedTotalTime}
      </h3>
    </div>
  );
};

export default TotalTimeOfSection;
