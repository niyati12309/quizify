import { Question } from '../types';

const questions: Question[] = [
  {
    id: 1,
    question: 'Which planet is known as the Red Planet?',
    options: [
      'Venus',
      'Mars',
      'Jupiter',
      'Saturn'
    ],
    correctAnswer: 'Mars',
    explanation: 'Mars is called the Red Planet because of the reddish color given to it by the iron oxide (rust) on its surface.',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/mars-planet-5349080-4468357.png'
  },
  {
    id: 2,
    question: 'What is the largest ocean on Earth?',
    options: [
      'Atlantic Ocean',
      'Indian Ocean',
      'Pacific Ocean',
      'Arctic Ocean'
    ],
    correctAnswer: 'Pacific Ocean',
    explanation: 'The Pacific Ocean is the largest and deepest ocean on Earth, covering more than 30% of the Earth\'s surface.',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/earth-globe-5349073-4468350.png'
  },
  {
    id: 3,
    question: 'Which is the fastest land animal?',
    options: [
      'Lion',
      'Cheetah',
      'Gazelle',
      'Kangaroo'
    ],
    correctAnswer: 'Cheetah',
    explanation: 'The cheetah is the fastest land animal, capable of reaching speeds up to 70 mph (113 km/h).',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/cheetah-5349543-4468820.png'
  },
  {
    id: 4,
    question: 'Who painted the Mona Lisa?',
    options: [
      'Vincent van Gogh',
      'Pablo Picasso',
      'Leonardo da Vinci',
      'Michelangelo'
    ],
    correctAnswer: 'Leonardo da Vinci',
    explanation: 'The Mona Lisa was painted by Italian artist Leonardo da Vinci between 1503 and 1519.',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/paint-palette-5349551-4468828.png'
  },
  {
    id: 5,
    question: 'What is the capital city of Japan?',
    options: [
      'Seoul',
      'Beijing',
      'Tokyo',
      'Bangkok'
    ],
    correctAnswer: 'Tokyo',
    explanation: 'Tokyo is the capital and largest city of Japan, with a population of over 37 million in its metropolitan area.',
    image: 'https://cdn3d.iconscout.com/3d/premium/thumb/japan-temple-5349536-4468813.png'
  }
];

export default questions