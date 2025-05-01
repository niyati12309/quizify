import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progress = (current / total) * 100;
  
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-gray-800">
          Question {current} of {total}
        </span>
        <span className="text-sm font-bold text-[#4CACBC]">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border-2 border-black">
        <div 
          className="h-full bg-[#4CACBC] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar