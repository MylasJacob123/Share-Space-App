import React, { useState } from "react";
import "./userItems.css";

function UserItems({ cartItems }) {
  const [payTogether, setPayTogether] = useState(true);

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return acc + price;
  }, 0);

  const totalPriceSeparate = cartItems.map((item) => {
    return parseFloat(item.price.replace("$", ""));
  });

  const handlePaymentToggle = () => {
    setPayTogether(!payTogether);
  };

  return (
    <div className="user-items-page">
      <div className="user-items">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>{item.artist}</p>
                  <p>{item.category}</p>
                  <p>{item.price}</p>
                  {payTogether ? null : <p>Price per item: {item.price}</p>}
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="payment-toggle">
          <button onClick={handlePaymentToggle}>
            {payTogether ? "Pay All Together" : "Pay Separately"}
          </button>
        </div>

        <div className="total-price">
          <h3>
            Total Price: $
            {payTogether ? totalPrice : totalPriceSeparate.join(" + ")}
          </h3>
          {payTogether ? null : (
            <div className="individual-price-summary">
              <p>Individual Prices: ${totalPriceSeparate.join(" + ")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserItems;
