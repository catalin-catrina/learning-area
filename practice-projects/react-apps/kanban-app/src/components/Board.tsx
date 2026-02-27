import { DragDropProvider } from "@dnd-kit/react";
import type { Column } from "../models/column.type";
import ColumnComponent from "./Column";
import { useState } from "react";
import Droppable from "./Droppable";

type BoardProps = { cols: Column[]; colsChanged: (cols: Column[]) => void };

function Board({ cols, colsChanged }: BoardProps) {
  const [target, setTarget] = useState<string | number | undefined>();

  const colsTemplate = cols.map((col: Column) => (
    <Droppable key={col.id} id={col.id}>
      <ColumnComponent key={col.id} col={col} onCardAdded={handleCardAdded} />
    </Droppable>
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
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;

          const cardId = event.operation.source?.id;
          const targetColId = event.operation.target?.id;
          if (!cardId || !targetColId) return;

          const targetCol = cols.find((col) => col.id === targetColId);
          const cardAlreadyInCol = !!targetCol?.cards.find(
            (card) => card.id === cardId,
          );
          if (!targetCol || cardAlreadyInCol) return;

          const card = cols.map((col) =>
            col.cards.find((c) => c.id === cardId),
          );
          if (!card) return;

          const newCols = cols.map((col) =>
            col.id === targetColId
              ? { ...col, cards: [...col.cards, card] }
              : col,
          );
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
