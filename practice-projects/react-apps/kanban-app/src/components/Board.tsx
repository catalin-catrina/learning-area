import type { Column } from "../models/column.type";
import ColumnComponent from "./Column";

function Board({ cols, colsChanged }) {
  const colsTemplate = cols.map((col: Column) => (
    <ColumnComponent key={col.id} col={col} onCardAdded={handleCardAdded} />
  ));

  function handleCardAdded(
    cardData: { title: string; description: string },
    colId: string,
  ) {
    const updatedCols = cols.map((col) =>
      col.id === colId
        ? {
            ...col,
            cards: [
              ...col.cards,
              { id: String(Math.random() * 100), ...cardData },
            ],
          }
        : col,
    );

    colsChanged(updatedCols);
  }

  return (
    <>
      <div className="container">
        <div className="cols">{colsTemplate}</div>

        <div className="cards"></div>
      </div>
    </>
  );
}

export default Board;
