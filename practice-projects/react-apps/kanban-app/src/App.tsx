import { useState } from "react";
import type { Column } from "./models/column.type";
import Board from "./components/Board";
import "./App.css";

function App() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "To Do",
      cards: [
        {
          id: "card-1",
          title: "Card 1",
          description: "sdajdsaadsadsasddasdasd",
        },
      ],
    },
    {
      id: "inprogress",
      title: "In Progress",
      cards: [
        {
          id: "card-2",
          title: "Card 2",
          description: "sdajdsaadsadsasddasdasd",
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      cards: [
        {
          id: "card-3",
          title: "Card 3",
          description: "sdajdsaadsadsasddasdasd",
        },
      ],
    },
  ]);

  function onColsChanged(cols) {
    setColumns(cols);
  }

  return (
    <>
      <Board cols={columns} colsChanged={onColsChanged} />
    </>
  );
}

export default App;
