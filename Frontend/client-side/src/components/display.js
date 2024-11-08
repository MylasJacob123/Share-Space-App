import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./display.css";
// import Navigation from "./navigation";

function Display() {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://share-space-backend-2-0.onrender.com/api/getProducts"
        );
        setItems(response.data.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const handleItemClick = (item) => {
    navigate(`/display/${item.id}`, { state: { item } });
  };

  return (
    <div className="display">
      {/* <Navigation cartItems={[]} /> */}
      <div className="display-categories">
        <ul>
          {["All", "Posters", "Images", "Manga", "Illustration", "Gear"].map(
            (category) => (
              <li
                key={category}
                className={activeCategory === category ? "active-tab" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </li>
            )
          )}
        </ul>
      </div>
      <div className="display-container">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="card"
            onClick={() => handleItemClick(item)}
          >
            <img
              src={item.image}
              alt={item.productName}
              className="card-image"
            />
            <h3 className="card-title">{item.productName}</h3>
            <p className="card-artist">Artist: {item.artist}</p>
            <p className="card-category">Category: {item.category}</p>
            <p className="card-price">Price: ${item.price}</p>
            <div
              className="availability-text"
            >
              {item.availability}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Display;
