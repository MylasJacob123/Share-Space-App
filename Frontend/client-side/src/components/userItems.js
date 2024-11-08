import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./userItems.css";

function UserItems({ cartItems }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [payTogether, setPayTogether] = useState(true);
  const navigate = useNavigate(); // React Router hook to navigate

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

  const handleItemSelect = (item) => {
    if (selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.id !== item.id)); // Deselect
    } else {
      setSelectedItems([...selectedItems, item]); // Select item
    }
  };

  const handleProceedToPayment = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to proceed with the payment.");
    } else {
      navigate("/payment", { state: { selectedItems } }); // Passing selected items to payment page
    }
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
                <input
                  type="checkbox"
                  checked={selectedItems.some((selectedItem) => selectedItem.id === item.id)}
                  onChange={() => handleItemSelect(item)}
                />
                <img src={item.image} alt={item.productName} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-details-info">{item.productName}</h3>
                  <p className="cart-item-details-info">Artist: {item.artist}</p>
                  <p className="cart-item-details-info">Category: {item.category}</p>
                  <div className="availability-text">{item.availability}</div>
                  <p className="cart-item-details-info">${item.price}</p>
                  {payTogether ? null : (
                    <p className="cart-item-details-info">Price per item: ${item.price}</p>
                  )}
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

        <div className="proceed-to-payment">
          <button 
            onClick={handleProceedToPayment} 
            disabled={selectedItems.length === 0} // Disable button if no items selected
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserItems;
