import type { Column } from "../models/column.type";
import ColumnComponent from "./Column";

function Board({ cols }: { cols: Column[] }) {
  const colsTemplate = cols.map((col: Column) => <ColumnComponent key={col.id} col={col} />);

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
