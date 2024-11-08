import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signUp";
import SignIn from "./components/signIn";
import Navigation from "./components/navigation";
import ResetPassword from "./components/resetPassword";
import Home from "./components/home";
import Display from "./components/display";
import DisplayItem from "./components/displayItem";
import Admin from "./components/admin";
import UserItems from "./components/userItems";
import Payment from "./components/payment";
import { setLoading, clearLoading } from "./redux/dbSlice";
import Loader from "./components/loader";
import "./App.css";
import { initializeUser } from "./redux/authSlice";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const loading = useSelector((state) => state.db.loading);
  const dispatch = useDispatch();

  const initialOptions = {
    "client-id":
      "AfIAqx5qwADS2y3HBA3G9jY9LTQxgY71yk1o5OT6ca0OwgiOfGQ2hUnNVYNRVYUDF3MgjtvljjF2m_iN",
    "enable-funding": "venmo",
    currency: "USD",
  };

  useEffect(() => {
    dispatch(setLoading());
    setTimeout(() => {
      dispatch(clearLoading());
    }, 2000);
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  const addToCart = (item) => {
    if (!cartItems.some((existingItem) => existingItem.id === item.id)) {
      setCartItems([...cartItems, item]);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return total + price;
    }, 0).toFixed(2);
  };

  const handlePaymentSuccess = (details) => {
    console.log("Payment successful:", details);
  };

  const handlePaymentError = (error) => {
    console.log("Payment failed:", error);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <BrowserRouter>
      <PayPalScriptProvider options={initialOptions}>
        <Routes>
          <Route path="/" element={<><Navigation cartItems={cartItems} /><Home /></>} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/reset" element={<><Navigation cartItems={cartItems} /><ResetPassword /></>} />
          <Route path="/display" element={<><Navigation cartItems={cartItems} /><Display /></>} />
          <Route path="/display/:id" element={<><Navigation cartItems={cartItems} /><DisplayItem addToCart={addToCart} /></>} />
          <Route path="/userItems" element={<><Navigation cartItems={cartItems} /><UserItems cartItems={cartItems} /></>} />
          <Route 
            path="/payment" 
            element={
              <Payment 
                totalPrice={calculateTotalPrice()} 
                cartItems={cartItems} 
                onPaymentSuccess={handlePaymentSuccess} 
                onPaymentError={handlePaymentError} 
              />
            } 
          />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        </PayPalScriptProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
