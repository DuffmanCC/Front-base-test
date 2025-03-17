interface Props {
  hasGuessed: boolean;
  isWinner: boolean;
}

const statusMap = {
  guessedNotWinner: {
    text: 'Nope. Sorry.',
    styles: 'border border-red-900 bg-red-300 p-4 text-red-700',
  },
  guessedWinner: {
    text: 'Wow, you actually won.',
    styles: 'border border-green-900 bg-green-300 p-4 text-green-700',
  },
  default: {
    text: 'Try and guess, I guess.',
    styles: 'border border-cyan-700 bg-cyan-300 p-4 text-cyan-900',
  },
};

const GameStatus = ({ hasGuessed, isWinner }: Props) => {
  const status = hasGuessed
    ? isWinner
      ? statusMap.guessedWinner
      : statusMap.guessedNotWinner
    : statusMap.default;

  return (
    <div className={status.styles} data-testid="game-status">
      {status.text}
    </div>
  );
};

export default GameStatus;
