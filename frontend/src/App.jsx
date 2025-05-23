import React, { useEffect, useState } from "react";
import axios from "axios";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

const App = () => {
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);

  const fetchBooks = async () => {
    const res = await axios.get("https://book-directory-27wr.onrender.com/get");
    setBooks(res.data);
  };

  const addBook = async (bookData) => {
    await axios.post("https://book-directory-27wr.onrender.com/add", bookData);
    fetchBooks();
  };

  const updateBook = async (id, updatedData) => {
    await axios.put(
      `https://book-directory-27wr.onrender.com/update/${id}`,
      updatedData
    );
    setEditBook(null);
    fetchBooks();
  };

  const deleteBook = async (id) => {
    await axios.delete(`https://book-directory-27wr.onrender.com/delete/${id}`);
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📚 Book Directory</h1>
      <BookForm
        onAdd={addBook}
        onUpdate={updateBook}
        editBook={editBook}
        setEditBook={setEditBook}
      />
      <BookList books={books} onDelete={deleteBook} onEdit={setEditBook} />
    </div>
  );
};

export default App;
