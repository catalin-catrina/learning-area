export default function Square({ value, onSquareClick, winnerBackground }) {
  return (
    <button className={`square ${winnerBackground}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}
