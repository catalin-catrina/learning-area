import { useState } from "react";

function AddCardForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event: React.SubmitEvent<HTMLButtonElement>): void {
    event.preventDefault();
    console.log("event", event);
  }

  return (
    <>
      <form>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Description: </label>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onSubmit={handleSubmit}>Submit</button>
      </form>
    </>
  );
}

export default AddCardForm;
