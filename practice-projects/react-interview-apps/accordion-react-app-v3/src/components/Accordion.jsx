import { useState } from 'react';
import data from '../data';

function Accordion() {
  const [selected, setSelected] = useState(null);
  const [multiple, setMultiple] = useState([]);
  const [multipleSelection, setMultipleSelection] = useState(false);

  const handleClick = id => {
    if (!multipleSelection) {
      setSelected(prevSelected => (prevSelected === id ? null : id));
    } else {
      setMultiple(prevMultiple =>
        prevMultiple.includes(id)
          ? prevMultiple.filter(item => item !== id)
          : [...prevMultiple, id]
      );
    }
  };

  const handleToggleMultipleSelection = () => {
    setSelected(null);
    setMultiple([]);
    setMultipleSelection(!multipleSelection);
  };

  return (
    <div className="acc-wrapper">
      <button onClick={handleToggleMultipleSelection}>
        Toggle Multiple Selection
      </button>
      <div className="accordion">
        {data.map(dataItem => (
          <div
            className="item"
            key={dataItem.id}
            onClick={() => handleClick(dataItem.id)}
          >
            <div className="title">
              <h3> {dataItem.question}</h3>
              <span>+</span>
            </div>

            {!multipleSelection && dataItem.id === selected && (
              <div style={{ color: '#fff' }}>{dataItem.answer}</div>
            )}

            {multipleSelection && multiple.includes(dataItem.id) && (
              <div style={{ color: '#fff' }}>{dataItem.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accordion;
