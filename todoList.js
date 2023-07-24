// // models/todoList.js

// const mongoose = require('mongoose');

// const cardSchema = new mongoose.Schema({
//   name: String,
//   dueDate: Date,
//   checklist: [String],
//   labels: [String]
// });

// const toDoListSchema = new mongoose.Schema({
//   name: String,
//   tasks: [cardSchema]
// });

// const ToDoList = mongoose.model('ToDoList', toDoListSchema);

// module.exports = ToDoList;
// models/todoList.js

const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: String,
  dueDate: Date,
  checklist: [String],
  labels: [String]
});

const toDoListSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
  createdAt: { type: Date, default: Date.now },
  tasks: [cardSchema]
});

const ToDoList = mongoose.model('ToDoList', toDoListSchema);

module.exports = ToDoList;
