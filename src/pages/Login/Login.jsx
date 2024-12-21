import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css"
const apiUrl = import.meta.env.VITE_API_URL;



const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For displaying error messages

  const navigate = useNavigate()

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await axios.post(`${apiUrl}/api/v1/auth/login`, {
        email,
        password,
      });

      if (response.data.token) {
        // Optionally save the token (if using JWT)
        localStorage.setItem("authToken", response.data.token); 

        // Redirect to a different platform (e.g., another domain like https://localhost:4000)
        navigate("/")
          } else {
        setError("Failed to login. Please try again.");
      }
    } catch (e) {
      alert("Invalid email or password");
      console.log(e);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Login</h2>

        {/* Error message */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
          >
            Login
          </button>
        </form>

        <p className="register-link">
          Don&apos;t have an account?{" "}
          <NavLink to="/register">Register here</NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
