import { Suspense, lazy } from 'react';
import useApp from '../hooks/useApp';
import ColorSwatch from './color-swatch';
// import ExpensiveComponent from './expensive-component';
import GameInput from './game-input';
import GameStatus from './game-status';
const ExpensiveComponent = lazy(() =>
  delayForDemo(import('./expensive-component')),
);

async function delayForDemo(promise: Promise<any>): Promise<any> {
  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
  return await promise;
}

const Application = () => {
  const {
    colorGuess,
    correctAnswer,
    hasGuessed,
    isWinner,
    setColorGuess,
    setHasGuessed,
    handleReset,
    error,
  } = useApp();

  return (
    <main className="mx-auto my-8 flex w-96 flex-col gap-8">
      <ColorSwatch color={correctAnswer} />
      <GameInput
        value={colorGuess}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setColorGuess(e.target.value)
        }
        onSubmit={() => setHasGuessed(true)}
        disabled={hasGuessed}
        error={error}
      />
      <GameStatus isWinner={isWinner} hasGuessed={hasGuessed} />
      <button onClick={handleReset}>Reset Color</button>

      {/* 
      Si el componente es muy caro en términos de computación o de bytes se puede 
      hacer un suspense para cargar un skeleton mientras o un simple loading.
      
      Para que el suspense funcione necesitaremos hacer un chunk separado del 
      componente con lazy

      const ExpensiveComponent = lazy(() => import('./expensive-component'));
      */}
      <Suspense fallback={<div>Loading...</div>}>
        <ExpensiveComponent />
      </Suspense>
    </main>
  );
};

export default Application;
