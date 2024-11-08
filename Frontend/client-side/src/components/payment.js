import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./payment.css";

function Payment({ onPaymentSuccess, onPaymentError }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedItems } = location.state || {};

  if (!selectedItems || selectedItems.length === 0) {
    return <div>No items selected for checkout.</div>;
  }

  const totalPrice = selectedItems.reduce((total, item) => {
    return total + parseFloat(item.price.replace("$", ""));
  }, 0);

  const handleApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      console.log("Payment Success:", details);
      onPaymentSuccess(details);
    });
  };

  const handleError = (err) => {
    console.error("Error with payment:", err);
    onPaymentError(err);
  };

  return (
    <div className="payment-summary-container">
      <div className="payment-summary-back-arrow">
        <FontAwesomeIcon
          className="payment-summary-back-arrow"
          icon={faArrowLeft}
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="main-content">
        <div className="summary-section">
          <h2>Review Your Order</h2>
          <ul className="order-items-list">
            {selectedItems.map((item, index) => (
              <li key={index} className="order-item-card">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="order-item-image"
                />
                <div className="order-item-card-details">
                  <h3 className="order-item-title">{item.productName}</h3>
                  <p className="order-item-details-information">
                    Artist: {item.artist}
                  </p>
                  <p className="order-item-details-information">
                    Category: {item.category}
                  </p>
                  <p className="order-item-details-information">
                    Price: ${item.price}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="order-item-total-price">
            Total Price: ${totalPrice.toFixed(2)}
          </h3>
        </div>

        <div className="payment-section">
          <PayPalScriptProvider
            options={{
              "client-id":
                "Ac5BE6LbIeYHZYca62eZjpI8DlcGBprKXhwMd89igjzVzzqU1CtTfNL-ZNQ6-qq405c8YsdK-SvMpPk4",
            }}
          >
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: totalPrice.toFixed(2),
                      },
                      items: selectedItems.map((item) => ({
                        name: item.title,
                        quantity: 1,
                        unit_amount: {
                          value: item.price.replace("$", ""),
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
      </div>
    </div>
  );
}

export default Payment;
