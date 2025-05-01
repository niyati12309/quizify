import React from 'react';
import { QuizProvider } from './context/QuizContext';
import QuizContainer from './components/QuizContainer';

function App() {
  return (
    <QuizProvider>
      <div className="min-h-screen bg-[#CCFF00] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-20">
          <div className="absolute w-20 h-20 top-20 left-20 animate-pulse">★</div>
          <div className="absolute w-16 h-16 top-40 right-40 animate-bounce">♥</div>
          <div className="absolute w-24 h-24 bottom-20 left-1/4 animate-pulse">⚡</div>
        </div>
        
        <header className="py-6 px-4 flex items-center justify-center relative z-10">
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border-2 border-black shadow-[4px_4px_0_#000]">
            <div className="w-10 h-10 flex items-center justify-center bg-purple-500 rounded-lg">
              <span className="text-2xl">❓</span>
            </div>
            <h1 className="text-3xl font-bold text-[#4CACBC]">
              Quizify
            </h1>
          </div>
        </header>
        
        <main className="relative z-10">
          <QuizContainer />
        </main>
        
        <footer className="py-4 text-center text-gray-600 text-sm relative z-10">
          <p>© 2025 Quizify - Test your knowledge!</p>
        </footer>
      </div>
    </QuizProvider>
  );
}

export default App;