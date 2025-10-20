import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData)).then(() => navigate("/todos"));
  };

  return (
    <div className="container-custom">
      <h2>Welcome Back 🌼</h2>
      <p className="motivate">“Discipline is the bridge between goals and accomplishment.”</p>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          className="form-control mb-4"
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button className="btn btn-primary w-100 mb-3">Login</button>
        <p>Don’t have an account? <Link to="/">Register</Link></p>
      </form>

      <p className="maryem-signature">✨ Crafted with care by </p>
    </div>
  );
}
