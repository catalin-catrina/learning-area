const Square = ({ value, squareNumber, onSquareClick }) => {
  return (
    <div className={`square square-${squareNumber}`} onClick={onSquareClick}>
      <div className="square-content">{value}</div>
    </div>
  );
};

export default Square;
