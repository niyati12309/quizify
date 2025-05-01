import React from 'react';
import { Question } from '../types';
import { useQuiz } from '../context/QuizContext';
import OptionsList from './OptionsList';

interface QuestionCardProps {
  question: Question;
  selectedOption: string | null;
  isAnswered: boolean;
  isCorrect: boolean | null;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  selectedOption,
  isAnswered,
  isCorrect 
}) => {
  const { dispatch } = useQuiz();
  
  const handleOptionSelect = (option: string) => {
    if (!isAnswered) {
      dispatch({ type: 'SELECT_OPTION', payload: option });
      dispatch({ type: 'CHECK_ANSWER' });
    }
  };

  const cardColors = [
    'bg-[#FFB6C1]', // Pink
    'bg-[#98FB98]', // Pale Green
    'bg-[#87CEEB]', // Sky Blue
    'bg-[#DDA0DD]', // Plum
    'bg-[#F0E68C]'  // Khaki
  ];
  
  const currentColor = cardColors[question.id - 1] || cardColors[0];
  
  return (
    <div className="animate-fadeIn">
      <div className={`quiz-card ${currentColor} p-6 rounded-2xl mb-6`}>
        <img 
          src={question.image} 
          alt="Question illustration"
          className="w-24 h-24 mx-auto mb-4 object-contain"
        />
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {question.question}
        </h2>
      </div>
      
      <OptionsList 
        options={question.options}
        selectedOption={selectedOption}
        correctAnswer={isAnswered ? question.correctAnswer : null}
        onSelect={handleOptionSelect}
        disabled={isAnswered}
      />
    </div>
  );
};

export default QuestionCard;