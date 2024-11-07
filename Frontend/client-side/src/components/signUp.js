import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setUser, setError } from "../redux/authSlice";
import axios from "axios";
import SignUpImage from "../assets/SignUp-Image.png";
import "./signUp.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleSignInNavigate = () => {
    navigate("/signIn");
  }

  const validateForm = () => {
    if (!name || !surname || !email || !password) {
      setErrorMessage("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Invalid email format.");
      return false;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const signUpUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("User Input:", { name, surname, email, password });
    dispatch(setLoading());
    try {
      const response = await axios.post("https://share-space-backend-2-0.onrender.com/auth/sign-up", {
        name,
        surname,
        email,
        password,
      });
      console.log("API Response:", response.data);
      dispatch(setUser(response.data));
      alert("Sign Up successfully!");
      navigate("/"); 
    } catch (error) {
      console.error("Sign Up Error:", error.response?.data?.error || error.message);
      dispatch(setError(error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="sign-up-card">
      <div className="sign-up-image">
        <img src={SignUpImage} alt="Sign Up" />
      </div>
      <div className="sign-up-form">
        <h1 className="sign-up-form-heading1">Welcome to Share Space</h1>
        <h2 className="sign-up-form-heading2">Sign Up</h2>
        <input
          className="sign-up-form-inputs"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errorMessage && <p className="sign-up-error-message">{errorMessage}</p>}
        <input
          className="sign-up-form-inputs"
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        {errorMessage && <p className="sign-up-error-message">{errorMessage}</p>}
        <input
          className="sign-up-form-inputs"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errorMessage && <p className="sign-up-error-message">{errorMessage}</p>}
        <input
          className="sign-up-form-inputs"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <p className="sign-up-error-message">{errorMessage}</p>}
        <button className="sign-up-form-button" onClick={signUpUser}>
          Sign Up
        </button>
        <span className="bottom-info">
          By creating an account you agree with our{" "}
          <span className="terms-and-conditions">Terms of Service</span>,
          <span className="privacy-policy"> Privacy Policy</span>
        </span>
        <span className="to-sign-in">Already have an account?<span className="to-sign-in-link" onClick={handleSignInNavigate}> Sign In</span></span>
      </div>
    </div>
  );
}

export default SignUp;
