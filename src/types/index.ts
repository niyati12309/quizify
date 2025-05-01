export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  image: string;
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  selectedOption: string | null;
  isAnswered: boolean;
  isCorrect: boolean | null;
  showFeedback: boolean;
  timeRemaining: number;
  quizCompleted: boolean;
  highScores: HighScore[];
}

export interface HighScore {
  date: string;
  score: number;
  totalQuestions: number;
}

export type QuizAction =
  | { type: 'START_QUIZ' }
  | { type: 'SELECT_OPTION'; payload: string }
  | { type: 'CHECK_ANSWER' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'SHOW_FEEDBACK'; payload: boolean }
  | { type: 'UPDATE_TIMER'; payload: number }
  | { type: 'TIME_UP' }
  | { type: 'COMPLETE_QUIZ' }
  | { type: 'RESTART_QUIZ' };