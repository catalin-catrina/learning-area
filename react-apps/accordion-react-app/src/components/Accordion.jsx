import React, { useState } from 'react';
import data from '../data';
import './Accordion.css';

function Accordion() {
  const [selected, setSelected] = useState(null);
  const [multiSelected, setMultiSelected] = useState([]);
  const [multiple, setMultiple] = useState(false);

  const toggleMultiple = () => {
    setMultiple(prev => !prev);
    if (multiple) {
      setMultiSelected([]);
    } else {
      setSelected(null);
    }
  };

  const handleSingleSelection = currentId => {
    currentId === selected ? setSelected(null) : setSelected(currentId);
  };

  const handleMultipleSelection = currentId => {
    const multiSelectedCopy = [...multiSelected];
    if (multiSelectedCopy.includes(currentId)) {
      setMultiSelected(multiSelectedCopy.filter(id => currentId !== id));
    } else {
      setMultiSelected([...multiSelectedCopy, currentId]);
    }
  };

  return (
    <div className="wrapper">
      <button onClick={toggleMultiple}>Enable multiple selection</button>
      <div className="accordion">
        {data ? (
          data.map(item => (
            <div key={item.id} className="item">
              <div
                className="title"
                onClick={() =>
                  multiple
                    ? handleMultipleSelection(item.id)
                    : handleSingleSelection(item.id)
                }
              >
                <h3>{item.question}</h3>
                <span>+</span>
              </div>
              {multiple
                ? multiSelected.includes(item.id) && (
                    <div className="acc-content">{item.answer}</div>
                  )
                : selected === item.id && (
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
