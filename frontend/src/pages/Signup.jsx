import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AuthPages.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(email, password, name);
      navigate("/");
    } catch {
      setError("Could not create account. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <form className="auth-form-side" onSubmit={handleSubmit}>
          <div className="auth-brand">🎵 Moodify</div>
          <h2>Create Account ✨</h2>
          <p className="auth-subtitle">Track your mood history and save favorites</p>

          {error && <div className="auth-error">{error}</div>}

          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>

        <div className="auth-visual-side">
          <div className="auth-waveform">
            <span></span><span></span><span></span>
            <span></span><span></span><span></span>
          </div>
          <p className="auth-visual-title">Feel it. Hear it.</p>
          <p className="auth-visual-text">
            AI-powered playlists matched to your mood, every time.
          </p>
        </div>
      </div>
    </div>
  );
}