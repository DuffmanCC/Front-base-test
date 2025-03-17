import { useEffect, useState } from 'react';
import generateRandomColor from '../lib/generate-random-color';

/*
Extraer la lógica de la aplicación a un hook personalizado suele mejorar 
la legibilidad de los componentes aunque en este caso puesto que no se va 
a reeutilizar la lógica en otro componente no es necesario pero siempre es 
una buena práctica pensando en el futuro y en la escalabilidad de la aplicación.
*/

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
