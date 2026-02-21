const Square = ({ styleNr, square, onSquareClick }) => {
  return (
    <div className={`square square-${styleNr}`} onClick={onSquareClick}>
      <div className="square-content">{square}</div>
    </div>
  );
};

export default Square;
