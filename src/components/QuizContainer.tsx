import React, { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import ScoreDisplay from './ScoreDisplay';
import Timer from './Timer';
import FeedbackModal from './FeedbackModal';
import ResultsSummary from './ResultsSummary';
import QuizMascot from './QuizMascot';

const QuizContainer: React.FC = () => {
  const { state, dispatch } = useQuiz();
  const { 
    questions, 
    currentQuestionIndex, 
    quizCompleted, 
    showFeedback,
    timeRemaining 
  } = state;

  useEffect(() => {
    if (!quizCompleted && !showFeedback && timeRemaining > 0) {
      const timerId = setTimeout(() => {
        dispatch({ type: 'UPDATE_TIMER', payload: timeRemaining - 1 });
      }, 1000);

      return () => clearTimeout(timerId);
    } else if (timeRemaining === 0 && !showFeedback) {
      dispatch({ type: 'TIME_UP' });
    }
  }, [timeRemaining, quizCompleted, showFeedback, dispatch]);

  const handleRestart = () => {
    dispatch({ type: 'RESTART_QUIZ' });
  };

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-xl">Loading quiz...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6">
      <div className="w-full max-w-2xl">
        {!quizCompleted ? (
          <div className="quiz-card bg-white rounded-2xl overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b-2 border-black">
              <ScoreDisplay score={state.score} total={questions.length} />
              <Timer seconds={timeRemaining} />
            </div>
            
            <div className="p-5">
              <ProgressBar 
                current={currentQuestionIndex + 1} 
                total={questions.length} 
              />
              
              <QuestionCard 
                question={questions[currentQuestionIndex]} 
                selectedOption={state.selectedOption}
                isAnswered={state.isAnswered}
                isCorrect={state.isCorrect}
              />
            </div>
          </div>
        ) : (
          <ResultsSummary 
            score={state.score} 
            totalQuestions={questions.length} 
            highScores={state.highScores}
            onRestart={handleRestart}
          />
        )}
      </div>
      
      {showFeedback && !quizCompleted && (
        <FeedbackModal 
          isCorrect={state.isCorrect || false}
          explanation={questions[currentQuestionIndex].explanation}
          onNext={() => dispatch({ type: 'NEXT_QUESTION' })}
        />
      )}

      <QuizMascot isCorrect={state.isCorrect} isAnswered={state.isAnswered} />
    </div>
  );
};

export default QuizContainer