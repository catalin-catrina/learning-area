const Square = ({ squareNumber, square, onSquareClick }) => {
  return (
    <div className={`square square-${squareNumber}`} onClick={onSquareClick}>
      <div className="square-content">{square}</div>
    </div>
  );
};

export default Square;
