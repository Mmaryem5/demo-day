
const Todo = require("../models/todoModel");

const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user });
  res.json(todos);
};

const addTodo = async (req, res) => {
  const todo = await Todo.create({ text: req.body.text, user: req.user });
  res.json(todo);
};

const updateTodo = async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    req.body,
    { new: true }
  );
  res.json(todo);
};

const deleteTodo = async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, user: req.user });
  res.json({ message: "Deleted" });
};

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };