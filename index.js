// routes/index.js

const express = require('express');
const router = express.Router();
const ToDoList = require('../models/todoList');

// View all ToDo lists
router.get('/', async (req, res) => {
  try {
    const allLists = await ToDoList.find({});
    res.render('index', { lists: allLists });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new ToDo list
router.post('/create-list', async (req, res) => {
  try {
    const { listDescription, listType } = req.body;
    const newList = new ToDoList({ name: req.body.listName, description: listDescription, type: listType });
    await newList.save();
    res.redirect('/');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add a card to a ToDo list
router.post('/add-card/:listId', async (req, res) => {
  try {
    const listId = req.params.listId;
    const newCard = {
      name: req.body.cardName,
      dueDate: req.body.dueDate,
      checklist: req.body.checklist.split(',').map(item => item.trim()),
      labels: req.body.labels.split(',').map(item => item.trim())
    };

    await ToDoList.findByIdAndUpdate(listId, { $push: { tasks: newCard } });
    res.redirect('/');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a ToDo list
router.post('/delete-list/:listId', async (req, res) => {
  try {
    const listId = req.params.listId;
    await ToDoList.findByIdAndRemove(listId);
    res.redirect('/');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a card from a ToDo list
router.post('/delete-card/:listId/:cardId', async (req, res) => {
  try {
    const { listId, cardId } = req.params;
    await ToDoList.findByIdAndUpdate(listId, { $pull: { tasks: { _id: cardId } } });
    res.redirect('/');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete selected lists
router.post('/delete-selected-lists', async (req, res) => {
  try {
    const selectedLists = req.body.selectedLists;
    await ToDoList.deleteMany({ _id: { $in: selectedLists } });
    res.redirect('/');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
