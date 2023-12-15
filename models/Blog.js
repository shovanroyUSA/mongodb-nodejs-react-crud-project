const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: String,
  writer: String,
  body: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
//Exporting the Model: "Blog" and will be used to interact with the "blogs" collection in the connected MongoDB database.
module.exports = mongoose.model("Blog", blogSchema); 
