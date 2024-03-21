import React from "react";

function Die({ value, isHeld, holdDice }) {
  return (
    <div
      onClick={holdDice}
      className="die__container"
      style={
        isHeld ? { backgroundColor: "#59E391" } : { backgroundColor: "#fff" }
      }
    >
      <div className="die">{value}</div>
    </div>
  );
}

export default Die;
