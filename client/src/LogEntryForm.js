//@ts-nocheck
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createLogEntry } from "./API.js";
function EntryForm({ location, onClose }) {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const onSubmit = async (data) => {
    try {
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      const succes = await createLogEntry(data);
      console.log(succes);
      onClose();
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };
  return (
    <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
      {error ? <h3 className="error">{error}</h3> : null}
      <label htmlFor="apiKey">API KEY</label>
      <input name="apiKey" type="password" required ref={register} />
      <label htmlFor="title">Title</label>
      <input name="title" required ref={register} />
      <label htmlFor="comments">Comments</label>
      <textarea name="comments" rows={2} ref={register}></textarea>
      <label htmlFor="rating">Rating</label>
      <input name="rating" ref={register} />
      <label htmlFor="image">Image</label>
      <input name="image" ref={register} />
      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="Date" required ref={register} />
      <button>Create</button>
    </form>
  );
}
export { EntryForm };
