import { useDraggable } from "@dnd-kit/react";
import type { Card } from "../models/card.type";
import type { Column } from "../models/column.type";
import AddCardForm from "./AddCardForm";
import CardComponent from "./Card";

type ColumnProps = {
  col: Column;
  onCardAdded: (
    card: { title: string; description: string },
    colId: string,
  ) => void;
};

function ColumnComponent({ col, onCardAdded }: ColumnProps) {
  const cardsTemplate = col.cards.map((card: Card) => {
    const { ref } = useDraggable({
      id: "draggable",
    });
    return <CardComponent key={card.id} card={card} />;
  });

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
