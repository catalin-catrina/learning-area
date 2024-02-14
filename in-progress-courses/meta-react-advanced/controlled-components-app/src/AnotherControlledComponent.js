import React from "react";
import { useState } from "react";

function AnotherControlledComponent() {
  const [score, setScore] = useState("5");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(score) < 5 && comment.length <= 10) {
      alert("Please provide a comment on what we should improve");
      return;
    }

    console.log("Thank you for the review");
    setComment("");
    setScore("5");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label style={{ display: "block" }}>Score: {score}</label>
      <input
        type="range"
        min="1"
        max="10"
        value={score}
        onChange={(event) => setScore(event.target.value)}
      ></input>

      <label style={{ display: " block" }}>Leave a comment:</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <button type="submit">Submit form</button>
    </form>
  );
}

export default AnotherControlledComponent;
