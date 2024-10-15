import React from "react";
import data from "./data";
import "./Accordion.css";

function Accordion() {
  const [selected, setSelected] = React.useState(null);
  const [multiSelected, setMultiSelected] = React.useState([]);
  const [multiple, setMultiple] = React.useState(false);

  const handleSingleSelection = (currentId) => {
    if (selected === currentId) {
      setSelected(null);
    } else {
      setSelected(currentId);
    }
  };

  const handleMultipleSelection = (currentId) => {
    const multiSelectedCopy = [...multiSelected];
    if (multiSelectedCopy.includes(currentId)) {
      setMultiSelected(multiSelectedCopy.filter((id) => currentId !== id));
    } else {
      setMultiSelected([...multiSelectedCopy, currentId]);
    }
  };

  const toggleMultiple = () => {
    setMultiple((prevMultiple) => !prevMultiple);
    if (multiple) {
      setMultiSelected([]);
    } else {
      setSelected(null);
    }
  };

  return (
    <div className="wrapper">
      <button onClick={toggleMultiple}>Toggle multiple selection</button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((item, key) => (
            <div key={item.id} className="item">
              <div
                className="title"
                onClick={
                  multiple
                    ? () => handleMultipleSelection(item.id)
                    : () => handleSingleSelection(item.id)
                }
              >
                <h3>{item.question}</h3>
                <span>+</span>
              </div>
              {multiple
                ? multiSelected.includes(item.id) && (
                    <div style={{ color: "#fff" }}>{item.answer}</div>
                  )
                : selected === item.id && (
                    <div style={{ color: "#fff" }}>{item.answer}</div>
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
