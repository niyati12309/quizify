import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface OptionsListProps {
  options: string[];
  selectedOption: string | null;
  correctAnswer: string | null;
  onSelect: (option: string) => void;
  disabled: boolean;
}

const OptionsList: React.FC<OptionsListProps> = ({ 
  options, 
  selectedOption, 
  correctAnswer,
  onSelect,
  disabled
}) => {
  const getOptionClasses = (option: string) => {
    let baseClasses = "option-button relative w-full p-4 mb-3 rounded-xl text-left transition-all duration-200 ";
    
    if (disabled) {
      if (correctAnswer === option) {
        return baseClasses + "bg-[#9FE6A0] border-black text-black";
      } else if (selectedOption === option && selectedOption !== correctAnswer) {
        return baseClasses + "bg-[#FF9B9B] border-black text-black";
      } else {
        return baseClasses + "bg-gray-100 border-black text-gray-400";
      }
    }
    
    if (selectedOption === option) {
      return baseClasses + "bg-[#FFE15D] border-black";
    }
    
    return baseClasses + "bg-white border-black hover:bg-[#FFE15D]";
  };
  
  return (
    <div className="space-y-2">
      {options.map((option, index) => (
        <button
          key={index}
          className={getOptionClasses(option)}
          onClick={() => onSelect(option)}
          disabled={disabled}
        >
          <div className="flex items-center">
            <span className="mr-3 w-7 h-7 flex items-center justify-center rounded-full bg-[#4CACBC] text-white font-bold border border-black">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="flex-1 font-medium">{option}</span>
            
            {disabled && option === correctAnswer && (
              <CheckCircle2 size={20} className="text-green-700 ml-2" />
            )}
            
            {disabled && selectedOption === option && option !== correctAnswer && (
              <XCircle size={20} className="text-red-700 ml-2" />
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default OptionsList