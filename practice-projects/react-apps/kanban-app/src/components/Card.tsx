import type { Card } from "../models/card.type";

function CardComponent({ card }: { card: Card }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{card.title}</h2>
      </div>
      <div className="card-body">{card.description}</div>
    </div>
  );
}

export default CardComponent;
