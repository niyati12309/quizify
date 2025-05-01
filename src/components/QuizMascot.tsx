import React from 'react';

interface QuizMascotProps {
  isCorrect: boolean | null;
  isAnswered: boolean;
}

const QuizMascot: React.FC<QuizMascotProps> = ({ isCorrect, isAnswered }) => {
  const getMessage = () => {
    if (!isAnswered) return "Take your time to think! 🤔";
    return isCorrect ? "You're doing amazing! 🌟" : "Keep going, you've got this! 💪";
  };

  return (
    <div className="mascot fixed left-8 bottom-8 w-48 h-48 flex flex-col items-center z-50">
      <div className="relative w-40 h-40">
        {!isAnswered && (
          <div className="w-full h-full text-8xl animate-bounce">🐋</div>
        )}
        {isAnswered && isCorrect && (
          <div className="w-full h-full text-8xl animate-bounce">🐋</div>
        )}
        {isAnswered && !isCorrect && (
          <div className="w-full h-full text-8xl">🐋</div>
        )}
      </div>
      <div className="mt-2 px-6 py-3 bg-white rounded-full border-2 border-black text-base font-bold shadow-[4px_4px_0_#000]">
        {getMessage()}
      </div>
    </div>
  );
};

export default QuizMascot;