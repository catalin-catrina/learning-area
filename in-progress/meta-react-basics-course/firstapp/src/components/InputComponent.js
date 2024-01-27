import { useState } from "react";

function InputComponent() {
  // useState hook (predefined react hook)
  const [inputText, setText] = useState("mere");

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <>
      <input value={inputText} onChange={handleChange} />
      <p>You typed: {inputText}</p>
      <button onClick={() => setText("")}>Reset</button>
    </>
  );
}

export default InputComponent;
