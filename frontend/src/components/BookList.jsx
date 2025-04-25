import React from "react";

const BookList = ({ books, onDelete, onEdit }) => {
  return (
    <div>
      <h2>📖 All Books</h2>
      {books.map((book) => (
        <div
          key={book._id}
          style={{
            border: "1px solid #ccc",
            margin: "1rem 0",
            padding: "1rem",
          }}
        >
          <p>
            <strong>Title:</strong> {book.title}
          </p>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Category:</strong> {book.category}
          </p>
          <p>
            <strong>Published Year:</strong> {book.publishedYear}
          </p>
          <button onClick={() => onEdit(book)}>Edit</button>
          <button onClick={() => onDelete(book._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default BookList;
