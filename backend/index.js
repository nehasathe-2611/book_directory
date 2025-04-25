const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Book = require("./book"); // Assuming 'book.js' exports the Mongoose model
const mongoURI =
  "mongodb+srv://nehasathe51:neha@databasecluster.pa0kd0e.mongodb.net/?retryWrites=true&w=majority&appName=databaseCluster";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://nehasathe51:neha@databasecluster.pa0kd0e.mongodb.net/BookStore?retryWrites=true&w=majority&appName=databaseCluster",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Add a new book
app.post("/add", async (req, res) => {
  try {
    const { title, author, category, publishedYear } = req.body;
    const newBook = await Book.create({
      title,
      author,
      category,
      publishedYear,
    });
    console.log("Book created:", newBook);
    res.status(201).json({ message: "Book added successfully", data: newBook });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Failed to add book" });
  }
});

// Get all books
app.get("/get", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to retrieve books" });
  }
});

// Delete a book
app.delete("/delete/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted successfully", data: deletedBook });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Failed to delete book" });
  }
});

// Update a book
app.put("/update/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book updated successfully", data: updatedBook });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Failed to update book" });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
