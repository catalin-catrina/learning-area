import { DragDropProvider } from "@dnd-kit/react";
import type { Column } from "../models/column.type";
import ColumnComponent from "./Column";
import { useState } from "react";
import Droppable from "./Droppable";

type BoardProps = { cols: Column[]; colsChanged: (cols: Column[]) => void };

function Board({ cols, colsChanged }: BoardProps) {
  const colsTemplate = cols.map((col: Column) => (
    <Droppable key={col.id} id={col.id}>
      <ColumnComponent key={col.id} col={col} onCardAdded={handleCardAdded} />
    </Droppable>
  ));
  const [target, setTarget] = useState<string | number | undefined>();

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
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;

          setTarget(event.operation.target?.id);
        }}
      >
        <div className="container">
          <div className="cols">{colsTemplate}</div>

          <div className="cards"></div>
        </div>
      </DragDropProvider>
    </>
  );
}

export default Board;
