
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData)).then(() => navigate("/login"));
  };

  return (
    <div className="container-custom">
      <h2>Welcome to MindFlow 🌸</h2>
      <p className="motivate">
        “The first step toward getting somewhere is to decide you’re not going to stay where you are.”
      </p>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Username"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
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
        <button className="btn btn-primary w-100 mb-3">Create Account</button>
        <p>Already part of MindFlow? <Link to="/login">Login</Link></p>
      </form>

      <p className="maryem-signature">✨ Created with passion by </p>
    </div>
  );
}
