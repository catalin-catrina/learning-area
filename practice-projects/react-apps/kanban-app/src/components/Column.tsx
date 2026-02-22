import type { Card } from "../models/card.type";
import type { Column } from "../models/column.type";
import AddCardForm from "./AddCardForm";
import CardComponent from "./Card";

function ColumnComponent({ col }: {col: Column}) {
  return (
    <div>
      <div className="col">
        <div className="col-header">
          <h2>{col.title}</h2>
        </div>
        <div className="col-body">
          {col.cards.map((card: Card) => (
            <CardComponent key={card.id} card={card} />
          ))}
        </div>
      </div>
      <AddCardForm />
    </div>
  );
}

export default ColumnComponent;
