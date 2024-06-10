import Square from "./Square";

function Board() {
  return (
    <div className="game-container">
      <div className="winner-message"></div>
      <div className="board-container">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>
    </div>
  );
}

export default Board;
