import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const Base_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    const trimmedEmail = email.trim();
  
    if (!trimmedEmail) {
      setEmailError("Email is required");
      return false;
    }
  
    if (/\s/.test(trimmedEmail)) {
      setEmailError("Email cannot contain spaces");
      return false;
    }
  
    if (!emailRegex.test(trimmedEmail)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
  
    const domainParts = trimmedEmail.split("@")[1]?.split(".");
    if (domainParts && domainParts.length < 2) {
      setEmailError("Invalid domain format");
      return false;
    }
  
    setEmailError("");
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit Clicked");

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      try {
        const response = await axios.post(`${Base_URL}/api/auth/login`, {
          email,
          password,
        });

        if (response.data.status === 1) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
         
          toast.success("Login successful!");

          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="login-container">
      <ToastContainer /> 
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
            />
            {emailError && <span className="error-message">{emailError}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
            />
            {passwordError && (
              <span className="error-message">{passwordError}</span>
            )}
          </div>

          <div className="login-actions">
            <a href="/forgot-password">Forgot your password?</a>

            <button type="submit" className="login-button">
              Login
            </button>
          </div>
          <div>
            <Link to="/register">
              <button type="button" className="signup-button">
                Sign up now
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
