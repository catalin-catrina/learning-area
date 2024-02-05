import { useState } from "react";

function FormComponent() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  return (
    <>
      First name:
      <input
        value={form.firstName}
        onChange={(e) => {
          setForm({ ...form, firstName: e.target.value });
        }}
      ></input>
      Last name:
      <input
        value={form.lastName}
        onChange={(e) => {
          setForm({ ...form, lastName: e.target.value });
        }}
      ></input>
      Email:
      <input
        value={form.email}
        onChange={(e) => {
          setForm({ ...form, email: e.target.value });
        }}
      ></input>
      <p>
        {form.firstName} {form.lastName} {form.email}
      </p>
    </>
  );
}

export default FormComponent;
