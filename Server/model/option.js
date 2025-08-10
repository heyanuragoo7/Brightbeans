const  mongoose = require("mongoose");

const option = new mongoose.Schema({
  total: Number,
  skip: Number,
  limit: Number
});

const options = mongoose.model('options', option);
module.exports = options