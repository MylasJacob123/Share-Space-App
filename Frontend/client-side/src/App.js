import React, { useState } from "react";
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

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    if (!cartItems.some(existingItem => existingItem.id === item.id)) {
      setCartItems([...cartItems, item]);
    }
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + price;
    }, 0).toFixed(2);
  };

  const handlePaymentSuccess = (details) => {
    console.log("Payment successful:", details);
    // Add your success logic here
  };

  const handlePaymentError = (error) => {
    console.log("Payment failed:", error);
    // Add your error handling logic here
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Navigation cartItems={cartItems} /><Home /></>} />
          <Route path="/signIn" element={<><Navigation cartItems={cartItems} /><SignIn /></>} />
          <Route path="/signUp" element={<><Navigation cartItems={cartItems} /><SignUp /></>} />
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
      </BrowserRouter>
    </div>
  );
}

export default App;
