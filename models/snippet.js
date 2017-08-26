const mongoose = require('mongoose');


// TODO: GET DATA FROM REQ.USER SOMEWHERE AND PASS IT INTO USER KEY
const snippetSchema = new mongoose.Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  notes: String,
  language: {type: String, required: true},
  tags: Array,
  user: String
});
const Snippet = mongoose.model('Snippet', snippetSchema)
module.exports = Snippet;
