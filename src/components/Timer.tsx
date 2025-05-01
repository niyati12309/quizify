import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  seconds: number;
}

const Timer: React.FC<TimerProps> = ({ seconds }) => {
  const [isWarning, setIsWarning] = useState(false);
  
  useEffect(() => {
    setIsWarning(seconds <= 5);
  }, [seconds]);
  
  return (
    <div className="flex items-center bg-white px-4 py-2 rounded-full border-2 border-black shadow-[4px_4px_0_#000]">
      <Clock 
        className={`w-6 h-6 mr-2 ${isWarning ? 'animate-pulse text-red-500' : 'text-[#4CACBC]'}`}
      />
      <span 
        className={`font-bold ${
          isWarning 
            ? "text-red-500 animate-pulse" 
            : "text-[#4CACBC]"
        }`}
      >
        {seconds}s
      </span>
    </div>
  );
};

export default Timer;