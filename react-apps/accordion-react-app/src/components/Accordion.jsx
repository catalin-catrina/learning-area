import React, { useState } from "react";
import data from "../data";
import "./Accordion.css";

function Accordion() {
  const [selected, setSelected] = useState(null);

  const handleSingleSelection = (id) => {
    id === selected ? setSelected(null) : setSelected(id);
  };

  return (
    <div className="wrapper">
      <button onClick={}>Enable multiple selection</button>
      <div className="accordion">
        {data ? (
          data.map((item) => (
            <div key={item.id} className="item">
              <div
                className="title"
                onClick={() => handleSingleSelection(item.id)}
              >
                <h3>{item.question}</h3>
                <span>+</span>
              </div>
              {selected === item.id && (
                <div className="acc-content">{item.answer}</div>
              )}
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}

export default Accordion;
