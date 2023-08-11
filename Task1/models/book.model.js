const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
});

// This Activitry creates the collection called activitimodels
const BookModel = mongoose.model("300341928-vasilii", bookSchema);
module.exports = BookModel;