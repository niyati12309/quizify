import React from 'react';
import { Trophy } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  total: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, total }) => {
  return (
    <div className="flex items-center">
      <Trophy size={18} className="text-yellow-500 mr-2" />
      <span className="font-medium">
        Score: <span className="text-purple-600">{score}</span>/{total}
      </span>
    </div>
  );
};

export default ScoreDisplay;