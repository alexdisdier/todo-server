/////////////////
// TODO MODEL //
////////////////

const mongoose = require("mongoose");

const Todo = mongoose.model("Todo", {
  date: {
    type: Date,
    default: new Date()
  },
  title: {
    type: String,
    default: "",
    minlength: 1,
    maxlength: 150,
    required: true
  },
  isDone: {
    type: Boolean,
    default: false
  }
});

module.exports = Todo;
