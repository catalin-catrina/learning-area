function Square({ square, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {square}
    </button>
  );
}

export default Square;
