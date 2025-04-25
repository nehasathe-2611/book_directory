import React, { useEffect, useState } from "react";

const BookForm = ({ onAdd, onUpdate, editBook, setEditBook }) => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    publishedYear: "",
  });

  useEffect(() => {
    if (editBook) {
      setForm(editBook);
    }
  }, [editBook]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editBook) {
      onUpdate(editBook._id, form);
    } else {
      onAdd(form);
    }
    setForm({ title: "", author: "", category: "", publishedYear: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="author"
        placeholder="Author"
        value={form.author}
        onChange={handleChange}
        required
      />
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />
      <input
        name="publishedYear"
        placeholder="Year"
        value={form.publishedYear}
        onChange={handleChange}
        required
      />
      <button type="submit">{editBook ? "Update" : "Add"} Book</button>
      {editBook && <button onClick={() => setEditBook(null)}>Cancel</button>}
    </form>
  );
};

export default BookForm;
