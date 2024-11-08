import React from "react";
import { useLocation } from "react-router-dom";
import "./displayItem.css";
// import Navigation from "./navigation";

function DisplayItem({ addToCart }) {
  const location = useLocation();
  const item = location.state.item;

  return (
    <div className="item-display">
      {/* <Navigation /> */}
      <div className="item-details">
        <img src={item.image} alt={item.title} className="item-image" />
        <div className="item-info">
          <h2 className="item-title">{item.productName}</h2>
          <p className="item-description">{item.description}</p>
          <p className="item-category">Category: {item.category}</p>
          <p className="item-price">Price: ${item.price}</p>
          <div
              className="availability-text"
            >
              {item.availability}
            </div>
            <br />
          {/* <div className="item-artist-background">
            <h3>Artist Background</h3>
            <p>{item.artistBackground}</p>
          </div> */}
        </div>
        <button onClick={() => addToCart(item)}>Add to Cart</button>
      </div>
    </div>
  );
}

export default DisplayItem;
