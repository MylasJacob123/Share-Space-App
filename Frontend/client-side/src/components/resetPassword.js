import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setUser, setError } from "../redux/authSlice";
import axios from "axios";
import ResetPasswordImg from "../assets/ResetPassword-Image.png";
import { useNavigate } from "react-router-dom";
import "./resetPassword.css";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const validateForm = () => {
    if (!email) {
      setErrorMessage("Email is required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Invalid email format.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const getResetPasswordLink = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; 

    console.log("User Input:", { email });
    dispatch(setLoading());
    try {
      const response = await axios.post("https://share-space-backend-2-0.onrender.com/auth/reset-password", { email });
      console.log("API Response:", response.data);
      dispatch(setUser(response.data));
      alert("Password reset email sent successfully!");
      navigate("/"); 
    } catch (error) {
      console.error("Reset Password Error:", error.response?.data?.error || error.message);
      dispatch(setError(error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="reset-password-card">
      <div className="reset-password-image">
        <img src={ResetPasswordImg} alt="Reset Password" />
      </div>
      <div className="reset-password-form">
        <h2 className="reset-password-form-heading2">Reset Password</h2>
        {errorMessage && <p className="reset-password-error-message">{errorMessage}</p>}
        <input
          className="reset-password-form-inputs"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="reset-password-form-button" onClick={getResetPasswordLink}>
          Send Reset Link
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
