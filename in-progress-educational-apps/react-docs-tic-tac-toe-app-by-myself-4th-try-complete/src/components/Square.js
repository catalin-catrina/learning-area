const Square = ({ squareNrStyle, square, onSquareClick }) => {
  return (
    <div className={`square square-${squareNrStyle}`} onClick={onSquareClick}>
      {square}
    </div>
  );
};

export default Square;
