import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../features/todos/todoSlice";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaCheck, FaUserCircle } from "react-icons/fa";

export default function Todos() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todos = useSelector((state) => state.todos.items);
  const user = useSelector((state) => state.auth.user);
  const [text, setText] = useState("");
  const [quote, setQuote] = useState("");

  const quotes = [
    "🌸 Believe in yourself — you’re doing great!",
    "💫 Every small step adds up to something beautiful.",
    "🌻 Focus on progress, not perfection.",
    "✨ Dreams don’t work unless you do.",
    "🌿 You have everything you need to shine today!",
    "🌼 Keep going, the best is yet to come!",
  ];

  useEffect(() => {
    dispatch(fetchTodos());
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, [dispatch]);

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="container-custom">
      {/* Header with greeting */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-2">
          <FaUserCircle size={32} color="#6c63ff" />
          <h4 className="mb-0">Hi {user?.username } 👋</h4>
        </div>
        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Quote box */}
      <div className="quote-box">
        <p className="motivate mb-0">{quote}</p>
      </div>

      {/* Add todo input */}
      <div className="input-group mb-4">
        <input
          className="form-control"
          placeholder="What’s one thing you want to achieve today?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          Add
        </button>
      </div>

      {/* Todo List */}
      <div>
        {todos.length === 0 ? (
          <p className="text-muted">No todos yet. Let’s start strong today 💪</p>
        ) : (
          todos.map((todo) => (
            <div key={todo._id} className={`todo-item ${todo.completed ? "done" : ""}`}>
              <span>{todo.text}</span>
              <div>
                <button
                  className="btn btn-sm btn-outline-success me-2"
                  onClick={() =>
                    dispatch(updateTodo({ id: todo._id, data: { completed: !todo.completed } }))
                  }
                >
                  <FaCheck />
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => dispatch(deleteTodo(todo._id))}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Signature */}
      <p className="maryem-signature">💜 Designed & Crafted with love </p>
    </div>
  );
}


