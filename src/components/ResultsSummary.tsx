import React, { useState } from 'react';
import { Share2, RotateCcw } from 'lucide-react';
import { HighScore } from '../types';

interface ResultsSummaryProps {
  score: number;
  totalQuestions: number;
  highScores: HighScore[];
  onRestart: () => void;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ 
  score, 
  totalQuestions,
  highScores,
  onRestart
}) => {
  const [shareSuccess, setShareSuccess] = useState<boolean | null>(null);
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getFeedback = () => {
    if (percentage >= 90) return "Excellent! You're a quiz master! 🏆";
    if (percentage >= 70) return "Great job! You know your stuff! 🌟";
    if (percentage >= 50) return "Good effort! Keep learning! 📚";
    return "Keep practicing! You'll improve! 💪";
  };
  
  const handleShare = async () => {
    const shareText = `I scored ${score}/${totalQuestions} (${percentage}%) on the Quizify quiz! Can you beat my score? 🎯`;
    
    try {
      if (navigator.share) {
        await navigator.share({ title: 'My Quizify Score', text: shareText });
      } else {
        await navigator.clipboard.writeText(shareText);
      }
      setShareSuccess(true);
    } catch (error) {
      setShareSuccess(false);
    }
    
    setTimeout(() => setShareSuccess(null), 3000);
  };
  
  return (
    <div className="quiz-card bg-[#FFE15D] rounded-2xl overflow-hidden animate-fadeIn border-2 border-black shadow-[8px_8px_0_#000]">
      <div className="p-8 text-center">
        <div className="text-8xl mb-4 mx-auto w-32 h-32 flex items-center justify-center">🏆</div>
        <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
        <div className="text-4xl font-bold mb-4">
          {score}/{totalQuestions}
        </div>
        <div className="inline-block bg-white px-6 py-3 rounded-full border-2 border-black">
          {percentage}% - {getFeedback()}
        </div>
      </div>
      
      <div className="bg-white p-6 border-t-2 border-black">
        <div className="bg-[#4CACBC] rounded-2xl p-6 mb-6 border-2 border-black">
          <h3 className="text-xl font-bold mb-4 text-white">Leaderboard 🏆</h3>
          <div className="space-y-2">
            {highScores.slice(0, 3).map((score, index) => (
              <div 
                key={index} 
                className={`relative flex items-center justify-between p-4 rounded-xl border-2 border-black ${
                  index === 0 ? 'bg-[#FFD700] translate-y-0' :
                  index === 1 ? 'bg-[#C0C0C0] -translate-y-2' :
                  'bg-[#CD7F32] -translate-y-4'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold border-2 border-black">
                    {index + 1}
                  </div>
                  <span className="font-medium">{new Date(score.date).toLocaleDateString()}</span>
                </div>
                <span className="font-bold">{score.score}/{score.totalQuestions}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleShare}
            className="flex-1 py-3 px-4 bg-[#FFB6C1] border-2 border-black rounded-xl font-bold flex items-center justify-center hover:translate-y-[-2px] transition-all shadow-[4px_4px_0_#000]"
          >
            <Share2 size={20} className="mr-2" />
            {shareSuccess === null && "Share Results"}
            {shareSuccess === true && "Shared! 🎉"}
            {shareSuccess === false && "Couldn't share 😢"}
          </button>
          
          <button
            onClick={onRestart}
            className="flex-1 py-3 px-4 bg-[#98FB98] border-2 border-black rounded-xl font-bold flex items-center justify-center hover:translate-y-[-2px] transition-all shadow-[4px_4px_0_#000]"
          >
            <RotateCcw size={20} className="mr-2" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummary;