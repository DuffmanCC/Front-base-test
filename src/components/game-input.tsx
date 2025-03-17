interface Props {
  onSubmit: (e: React.FormEvent) => void;
  disabled: boolean;
  value: string;
  error?: string;
  [key: string]: any;
}

const GameInput = ({ onSubmit, disabled, value, error, ...props }: Props) => {
  return (
    <form
      className="mb-4 flex items-end"
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(e);
      }}
    >
      <div className="relative flex flex-col gap-2">
        <label htmlFor="game-input">
          Enter some letters
          <input
            id="game-input"
            type="text"
            maxLength={6}
            pattern="[a-fA-F0-9]{6}"
            placeholder="C0FF33"
            disabled={disabled}
            value={value}
            aria-describedby="input-error"
            {...props}
          />
        </label>

        {error && (
          <p className="absolute -bottom-8 text-red-500" id="input-error">
            {error}
          </p>
        )}
      </div>

      <button
        className="whitespace-nowrap"
        type="submit"
        disabled={disabled || !!error || value === ''}
      >
        Take a Guess
      </button>
    </form>
  );
};

export default GameInput;
