import { useRef } from "react";

export default function UncontrolledComponent() {
  const inputRef = useRef(null);
  const fileInput = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // this is how  to create a ref to the DOM node to access any files selected in the form submit handler
    const files = fileInput.current.files;
    // Do something with the files here
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} type="text" />

      {/* In React, an <input type="file" /> is always an uncontrolled component because its value is read-only and can't be set programmatically.  */}

      <input ref={fileInput} type="file" />
    </form>
  );
}
