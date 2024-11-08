import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser, setError, initializeUser } from "../redux/authSlice";
import SignInImage from "../assets/SignIn-Image.png";
import "./signIn.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./loader";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  const handleResetNavigate = () => {
    navigate("/reset");
  };

  const handleSignUpNavigate = () => {
    navigate("/signUp");
  };

  const validateForm = () => {
    if (!email || !password) {
      setErrorMessage("Both email and password are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Invalid email format.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const signInUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(setLoading());
    try {
      const response = await axios.post("https://share-space-backend-2-0.onrender.com/auth/sign-in", {
        email,
        password,
      });

      const { userId, email, isAdmin } = response.data;
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }

      dispatch(setUser({ userId, email, isAdmin }));
      alert("Signed in successfully!");
    } catch (error) {
      dispatch(setError(error.response?.data?.error || error.message));
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="sign-in-card">
      {loading && <Loader />}
      <div className="sign-in-image">
        <img src={SignInImage} alt="Sign In" />
      </div>
      <div className="sign-in-form">
        <h1 className="sign-in-form-heading1">Welcome back to Share Space</h1>
        <h2 className="sign-up-form-heading1">Sign In</h2>
        <input
          className="sign-in-form-inputs"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errorMessage && <p className="sign-in-error-message">{errorMessage}</p>}
        <input
          className="sign-in-form-inputs"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <p className="sign-in-error-message">{errorMessage}</p>}
        <span className="forgot-password" onClick={handleResetNavigate}>Forgot Password?</span>
        <button className="sign-in-form-button" onClick={signInUser} disabled={loading}>
          Sign in
        </button>
        <span className="to-sign-up">Don't have an account?<span className="to-sign-up-link" onClick={handleSignUpNavigate}> Sign Up</span></span>
      </div>
    </div>
  );
}

export default SignIn;
