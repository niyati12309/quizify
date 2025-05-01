import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface FeedbackModalProps {
  isCorrect: boolean;
  explanation: string;
  onNext: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ 
  isCorrect, 
  explanation,
  onNext
}) => {
  useEffect(() => {
    // Updated audio URLs to more reliable sources
    const audioElement = new Audio(
      isCorrect 
        ? 'https://assets.mixkit.co/active_storage/sfx/2190/2190-preview.mp3'
        : 'https://assets.mixkit.co/active_storage/sfx/2194/2194-preview.mp3'
    );
    
    audioElement.volume = 0.5;
    
    // Add proper error handling for audio playback
    const playAudio = async () => {
      try {
        await audioElement.play();
      } catch (error) {
        console.warn('Audio playback failed silently - continuing without sound');
      }
    };
    
    playAudio();
    
    // Auto proceed after 4 seconds
    const timerId = setTimeout(() => {
      onNext();
    }, 4000);
    
    return () => {
      clearTimeout(timerId);
      audioElement.pause();
      audioElement.src = '';
    };
  }, [isCorrect, onNext]);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md mx-4 transform transition-all duration-300 animate-scaleIn border-2 border-black">
        <div className="flex items-center mb-4">
          {isCorrect ? (
            <>
              <CheckCircle2 className="text-green-500 mr-3" size={28} />
              <h3 className="text-xl font-bold text-green-600">Correct!</h3>
            </>
          ) : (
            <>
              <XCircle className="text-red-500 mr-3" size={28} />
              <h3 className="text-xl font-bold text-red-600">
                {explanation === "Time's up!" ? "Time's Up!" : "Incorrect!"}
              </h3>
            </>
          )}
        </div>
        
        <p className="text-gray-700 mb-6">{explanation}</p>
        
        <button
          onClick={onNext}
          className="w-full py-3 px-4 bg-lime-400 hover:bg-lime-500 text-gray-800 font-medium rounded-xl flex items-center justify-center transition-all duration-200 border-2 border-black shadow-[4px_4px_0_#000]"
        >
          Continue <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;