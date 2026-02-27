import { DragDropProvider } from "@dnd-kit/react";
import type { Column } from "../models/column.type";
import ColumnComponent from "./Column";
import Droppable from "./Droppable";

type BoardProps = { cols: Column[]; colsChanged: (cols: Column[]) => void };

function Board({ cols, colsChanged }: BoardProps) {
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
              ...(col.cards ?? []),
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
          const cardAlreadyInCol = !!targetCol?.cards?.find(
            (card) => card.id === cardId,
          );
          if (!targetCol || cardAlreadyInCol) return;

          const sourceCol = cols.find((col) =>
            col.cards?.some((card) => card.id === cardId),
          );
          const card = cols
            .flatMap((col) => col.cards ?? [])
            .find((c) => c.id === cardId);
          if (!sourceCol || !card) return;

          const newCols: Column[] = cols.map((col: Column) => {
            if (col.id === targetColId) {
              return { ...col, cards: [...(col.cards ?? []), card] };
            } else if (col.id === sourceCol.id) {
              return {
                ...col,
                cards: col.cards?.filter((card) => card.id !== cardId),
              };
            } else {
              return col;
            }
          });

          colsChanged(newCols);
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
