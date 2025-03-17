import { Suspense } from 'react';
import useApp from '../hooks/useApp';
import ColorSwatch from './color-swatch';
import ExpensiveComponent from './expensive-component';
import GameInput from './game-input';
import GameStatus from './game-status';

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
      Si el componente es muy caro en términos de computación se podría 
      hacer un suspense para cargar un skeleton mientras o un simple loading.
      
      Si el componente pesa mucho se podrían hacer también un lazy para que se creara
      un chunk separado y no se cargara todo el componente al inicio. 

      const ExpensiveComponent = lazy(() => import('./expensive-component'));
      
      Para evitar que el componente se volviera a calcular si es muy caro 
      también se podría usar un memo y evitar rerenders innecesarios.

      const MemoizedExpensiveComponent = React.memo(ExpensiveComponent);
      */}
      <Suspense fallback={<div>Loading...</div>}>
        <ExpensiveComponent />
      </Suspense>
    </main>
  );
};

export default Application;
