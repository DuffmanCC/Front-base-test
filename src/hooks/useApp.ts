import { useEffect, useState } from 'react';
import generateRandomColor from '../lib/generate-random-color';

export default function useApp() {
  const [colorGuess, setColorGuess] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(generateRandomColor());
  const [hasGuessed, setHasGuessed] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [error, setError] = useState('');

  function handleReset() {
    setCorrectAnswer(generateRandomColor());
    setHasGuessed(false);
    setColorGuess('');
    setIsWinner(false);
  }

  useEffect(() => {
    if (!hasGuessed) return;

    if (colorGuess === correctAnswer) {
      setIsWinner(true);
    }
  }, [hasGuessed, correctAnswer, colorGuess]);

  useEffect(() => {
    const match = /[a-fA-F0-9]{6}/.test(colorGuess);

    if (match || colorGuess === '') {
      setError('');
    } else {
      setError('Please enter a valid hex color');
    }
  }, [colorGuess]);

  return {
    colorGuess,
    correctAnswer,
    hasGuessed,
    isWinner,
    setColorGuess,
    setCorrectAnswer,
    setHasGuessed,
    setIsWinner,
    handleReset,
    error,
  };
}
