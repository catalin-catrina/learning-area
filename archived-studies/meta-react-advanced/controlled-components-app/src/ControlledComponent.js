import React, { useState } from "react";

function ControlledComponent() {
  const [name, setName] = useState("");

  const handleChange = function (event) {
    setName(event.target.value);
  };

  const handleSubmit = function (event) {
    event.preventDefault();
    console.log(name);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input id="name" value={name} onChange={handleChange}></input>
        <button disabled={!name} type="submit">
          Submit
        </button>
        <h1>{name}</h1>
      </form>
    </div>
  );
}

export default ControlledComponent;
