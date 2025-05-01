import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Question, QuizState, QuizAction, HighScore } from '../types';
import questions from '../data/questions';

const shuffleQuestions = (questions: Question[]): Question[] => {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getHighScores = (): HighScore[] => {
  const saved = localStorage.getItem('quizify-high-scores');
  return saved ? JSON.parse(saved) : [];
};

const saveHighScore = (score: number, totalQuestions: number): void => {
  const highScores = getHighScores();
  const newScore: HighScore = {
    date: new Date().toISOString(),
    score,
    totalQuestions
  };
  
  highScores.push(newScore);
  highScores.sort((a, b) => (b.score / b.totalQuestions) - (a.score / a.totalQuestions));
  
  const topScores = highScores.slice(0, 10);
  localStorage.setItem('quizify-high-scores', JSON.stringify(topScores));
};

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  selectedOption: null,
  isAnswered: false,
  isCorrect: null,
  showFeedback: false,
  timeRemaining: 15, // Changed from 30 to 15 seconds
  quizCompleted: false,
  highScores: []
};

const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case 'START_QUIZ':
      return {
        ...initialState,
        questions: shuffleQuestions(questions),
        highScores: getHighScores()
      };
    
    case 'SELECT_OPTION':
      return {
        ...state,
        selectedOption: action.payload,
        isAnswered: true
      };
    
    case 'CHECK_ANSWER':
      const currentQuestion = state.questions[state.currentQuestionIndex];
      const isCorrect = state.selectedOption === currentQuestion.correctAnswer;
      
      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        isCorrect,
        showFeedback: true
      };
    
    case 'NEXT_QUESTION':
      const isLastQuestion = state.currentQuestionIndex === state.questions.length - 1;
      
      if (isLastQuestion) {
        saveHighScore(state.score, state.questions.length);
        return {
          ...state,
          quizCompleted: true,
          showFeedback: false,
          highScores: getHighScores()
        };
      }
      
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        selectedOption: null,
        isAnswered: false,
        isCorrect: null,
        showFeedback: false,
        timeRemaining: 15 // Reset to 15 seconds for next question
      };
    
    case 'SHOW_FEEDBACK':
      return {
        ...state,
        showFeedback: action.payload
      };
    
    case 'UPDATE_TIMER':
      return {
        ...state,
        timeRemaining: action.payload
      };
    
    case 'TIME_UP':
      return {
        ...state,
        isAnswered: true,
        isCorrect: false,
        showFeedback: true
      };
    
    case 'COMPLETE_QUIZ':
      saveHighScore(state.score, state.questions.length);
      return {
        ...state,
        quizCompleted: true,
        highScores: getHighScores()
      };
    
    case 'RESTART_QUIZ':
      return {
        ...initialState,
        questions: shuffleQuestions(questions),
        highScores: getHighScores()
      };
    
    default:
      return state;
  }
};

interface QuizContextType {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'START_QUIZ' });
  }, []);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};