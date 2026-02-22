import CardComponent from "./Card";
import type { Card } from "../models/card.type";
import type { Column } from "../models/column.type";

function Board({ cols }: { cols: Column[] }) {
  const colsTemplate = cols.map((col: Column) => (
    <div className="col">
      <div className="col-header">
        <h2>{col.title}</h2>
      </div>
      <div className="col-body">
        {col.cards.map((card: Card) => (
          <CardComponent card={card} />
        ))}
      </div>
    </div>
  ));

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
