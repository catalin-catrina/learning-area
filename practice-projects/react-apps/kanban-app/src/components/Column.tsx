import { useDraggable } from "@dnd-kit/react";
import type { Card } from "../models/card.type";
import type { Column } from "../models/column.type";
import AddCardForm from "./AddCardForm";
import CardComponent from "./Card";
import { Draggable } from "./Draggable";

type ColumnProps = {
  col: Column;
  onCardAdded: (
    card: { title: string; description: string },
    colId: string,
  ) => void;
};

function ColumnComponent({ col, onCardAdded }: ColumnProps) {
  const cardsTemplate = col.cards.map((card: Card) => (
    <Draggable key={card.id} id={card.id}>
      <CardComponent key={card.id} card={card} />;
    </Draggable>
  ));

  function handleCardAdded(cardData: { title: string; description: string }) {
    onCardAdded(cardData, col.id);
  }

  return (
    <div>
      <div className="col">
        <div className="col-header">
          <h2>{col.title}</h2>
        </div>
        <div className="col-body">{cardsTemplate}</div>
      </div>
      <AddCardForm onCardAdded={handleCardAdded} />
    </div>
  );
}

export default ColumnComponent;
