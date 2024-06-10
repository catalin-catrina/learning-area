import Square from "./Square";
import calculateWinner from "./calculateWinner";

function Board({ squares, isXTurn, handlePlay }) {
  const winner = calculateWinner(squares);
  const message = winner
    ? `Winner is ${winner}`
    : `Next move: ${isXTurn ? "X" : "0"}`;

  function handleMove(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const newSquares = [...squares];
    newSquares[i] = isXTurn ? "X" : "0";
    handlePlay(newSquares);
  }

  return (
    <div className="game-container">
      <div className="winner-message">{message}</div>
      <div className="board-container">
        <Square value={squares[0]} handleClick={() => handleMove(0)} />
        <Square value={squares[1]} handleClick={() => handleMove(1)} />
        <Square value={squares[2]} handleClick={() => handleMove(2)} />

        <Square value={squares[3]} handleClick={() => handleMove(3)} />
        <Square value={squares[4]} handleClick={() => handleMove(4)} />
        <Square value={squares[5]} handleClick={() => handleMove(5)} />

        <Square value={squares[6]} handleClick={() => handleMove(6)} />
        <Square value={squares[7]} handleClick={() => handleMove(7)} />
        <Square value={squares[8]} handleClick={() => handleMove(8)} />
      </div>
    </div>
  );
}

export default Board;
