const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  publishedYear: Number,
});

const book_Directory = mongoose.model("book", bookSchema);

module.exports = book_Directory;

book_Directory.js;
