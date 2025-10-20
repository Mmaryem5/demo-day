
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodo, deleteTodo } from "../features/todos/todoSlice";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleToggle = () => {
    dispatch(updateTodo({ id: todo._id, data: { completed: !todo.completed } }));
  };

  const handleSave = () => {
    if (text.trim() === "") return;
    dispatch(updateTodo({ id: todo._id, data: { text: text.trim() } }));
    setEditing(false);
  };

  const handleDelete = () => {
    if (confirm("Delete this task?")) {
      dispatch(deleteTodo(todo._id));
    }
  };

  return (
    <div className="todo-item" style={{ display: "flex", alignItems: "center", gap: 8, padding: 8 }}>
      <input
        type="checkbox"
        checked={!!todo.completed}
        onChange={handleToggle}
        aria-label={`Mark ${todo.text} as ${todo.completed ? "incomplete" : "complete"}`}
      />

      {editing ? (
        <>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") { setEditing(false); setText(todo.text); } }}
            style={{ flex: 1, padding: 6 }}
            autoFocus
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => { setEditing(false); setText(todo.text); }}>Cancel</button>
        </>
      ) : (
        <>
          <span
            style={{
              flex: 1,
              textDecoration: todo.completed ? "line-through" : "none",
              opacity: todo.completed ? 0.6 : 1,
            }}
          >
            {todo.text}
          </span>

          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}