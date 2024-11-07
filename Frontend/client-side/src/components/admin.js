import React, { useState, useEffect } from "react";
import axios from "axios";
import "./admin.css";

function Admin() {
  const [view, setView] = useState("items");
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [artist, setArtist] = useState("");
  const [availability, setAvailability] = useState("Available");

  const [items, setItems] = useState([]);

  const fetchItemsFromFirestore = async () => {
    try {
      const response = await axios.get("/api/getProducts");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItemsFromFirestore();
  }, []);

  const addProduct = async () => {
    const newProduct = {
      productName,
      description,
      price,
      category,
      image,
      artist,
      availability,
    };

    try {
      await axios.post("https://share-space-backend-2-0.onrender.com/api/addProduct", newProduct);
      alert("Product added successfully!");
      setProductName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage("");
      setArtist("");
      setAvailability("Available");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product.");
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`/api/deleteProduct/${id}`);
      fetchItemsFromFirestore();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleUpdateItem = async (id, updatedItemData) => {
    try {
      await axios.put(`/api/updateProduct/${id}`, updatedItemData);
      fetchItemsFromFirestore();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (availabilityFilter === "" || item.availability === availabilityFilter)
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setProductName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "image":
        setImage(value);
        break;
      case "artist":
        setArtist(value);
        break;
      case "availability":
        setAvailability(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="admin-system">
      <h1 className="admin-system-heading">Admin Dashboard</h1>

      <div className="split-screen">
        <div className="sidebar">
          <button className="admin-button" onClick={() => setView("items")}>
            Manage Items
          </button>
          <button className="admin-button" onClick={() => setView("orders")}>
            View Orders
          </button>
          <button className="admin-button">Logout</button>
        </div>

        <div className="admin-main-content">
          {view === "items" && (
            <div>
              <h2>Manage Items</h2>
              <div className="filters">
                <input
                  type="text"
                  placeholder="Search items"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                >
                  <option value="">Select Availability</option>
                  <option value="Available">Available</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <button
                className="admin-button"
                onClick={fetchItemsFromFirestore}
              >
                Refresh Items
              </button>

              <button
                className="admin-button"
                onClick={fetchItemsFromFirestore}
              >
                Added Products
              </button>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Price</th>
                      <th>Availability</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => (
                      <tr
                        key={item.id}
                        className={
                          item.availability === "Available"
                            ? "availability-available"
                            : "availability-out"
                        }
                      >
                        <td>{item.productName}</td>
                        <td>${item.price}</td>
                        <td>{item.availability}</td>
                        <td>
                          <button
                            className="admin-edit"
                            onClick={() => handleUpdateItem(item.id, {})}
                          >
                            Edit
                          </button>
                          <button
                            className="admin-delete"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2>Add New Item</h2>
              <div className="admin-form-container">
                <form className="admin-form">
                  <div className="admin-input-group">
                    <label htmlFor="productName">Product Name</label>
                    <input
                      type="text"
                      id="productName"
                      name="name"
                      placeholder="Enter Product Name"
                      value={productName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="admin-input-group">
                    <label htmlFor="description">Product Description</label>
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Enter Product Description"
                      value={description}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="admin-input-group">
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      placeholder="Enter Product Price"
                      value={price}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="admin-input-group">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      name="category"
                      value={category}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Category</option>
                      <option value="Posters">Posters</option>
                      <option value="Manga">Manga</option>
                      <option value="Images">Images</option>
                      <option value="Illustration">Illustration</option>
                      <option value="Gear">Gear</option>
                    </select>
                  </div>

                  <div className="admin-input-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      placeholder="Enter Image URL"
                      value={image}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="admin-input-group">
                    <label htmlFor="artist">Artist Name</label>
                    <input
                      type="text"
                      id="artist"
                      name="artist"
                      placeholder="Enter Artist Name"
                      value={artist}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="admin-input-group">
                    <label htmlFor="availability">Availability</label>
                    <select
                      id="availability"
                      name="availability"
                      value={availability}
                      onChange={handleInputChange}
                    >
                      <option value="Available">Available</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>

                  <div className="form-actions">
                    <button type="button" onClick={addProduct}>
                      Add Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
