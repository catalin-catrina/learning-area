import Square from "./Square";
import calculateWinner from "./calculateWinner";

function Board({ board, xIsNext, onPlay }) {
  const winner = calculateWinner(board);

  const message = winner
    ? `Winner is ${winner.winner}`
    : `Next to move: ${xIsNext ? "X" : "0"}`;

  function handleClick(i) {
    if (board[i] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "0";

    onPlay(newBoard);
  }

  const grid = Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, (_, colIndex) => colIndex)
  );

  const drawBoard = grid.map((row, rowIndex) => (
    <div key={rowIndex} className="board-row">
      {row.map((square, colIndex) => {
        return (
          <Square
            key={colIndex}
            value={board[rowIndex * 3 + colIndex]}
            onSquareClick={() => handleClick(rowIndex * 3 + colIndex)}
          />
        );
      })}
    </div>
  ));

  return (
    <>
      <div className="status">{message}</div>
      {drawBoard}
    </>
  );
}

export default Board;
