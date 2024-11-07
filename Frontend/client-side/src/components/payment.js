import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import './payment.css';

function Payment({ totalPrice, cartItems, onPaymentSuccess, onPaymentError }) {
  const handleApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      console.log('Payment Success:', details);
      onPaymentSuccess(details);  // You can implement additional logic on successful payment
    });
  };

  const handleError = (err) => {
    console.error('Error with payment:', err);
    onPaymentError(err);  // You can implement error handling logic here
  };

  return (
    <div className="payment-container">
      <h2>Review Your Order</h2>
      <div className="order-summary">
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="order-item">
              <img src={item.image} alt={item.title} className="order-item-image" />
              <div className="order-item-details">
                <h3>{item.title}</h3>
                <p>Price: {item.price}</p>
              </div>
            </li>
          ))}
        </ul>
        <h3>Total Price: ${totalPrice}</h3>
      </div>

      {/* PayPal Script Provider - Wrap your app with this component */}
      <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID", "currency": "USD" }}>
        {/* PayPal Buttons */}
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: totalPrice.toFixed(2), // Total price for the transaction
                  },
                  items: cartItems.map((item) => ({
                    name: item.title,
                    quantity: 1,
                    unit_amount: {
                      value: item.price.replace('$', ''), // Remove dollar sign before sending to PayPal
                    },
                  })),
                },
              ],
            });
          }}
          onApprove={handleApprove}
          onError={handleError}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default Payment;
