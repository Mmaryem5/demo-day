
const express = require("express");
const protect = require("../middleware/authMiddleware");
const { getTodos, addTodo, updateTodo, deleteTodo } = require("../controllers/todoController");
const router = express.Router();

router.get("/", protect, getTodos);
router.post("/", protect, addTodo);
router.put("/:id", protect, updateTodo);
router.delete("/:id", protect, deleteTodo);

module.exports = router;