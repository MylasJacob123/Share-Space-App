import React, { useState, useEffect } from "react";
import axios from "axios";
import "./admin.css";

function Admin() {
  const [view, setView] = useState("add product form");
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
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // State for editing product

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://share-space-backend-2-0.onrender.com/api/getProducts");
        setItems(response.data.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async () => {
    setLoading(true);
    const newProduct = { productName, description, price, category, image, artist, availability };

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
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://share-space-backend-2-0.onrender.com/api/deleteProduct/${id}`);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete the item. Please try again.");
    }
  };

  const handleEditItem = (item) => {
    setEditingProduct(item); // Set product to edit
    setProductName(item.productName);
    setDescription(item.description);
    setPrice(item.price);
    setCategory(item.category);
    setImage(item.image);
    setArtist(item.artist);
    setAvailability(item.availability);
    setView("add product form"); // Switch to the form view to edit
  };

  const handleUpdateItem = async () => {
    if (!editingProduct) return;
    const updatedProduct = {
      productName,
      description,
      price,
      category,
      image,
      artist,
      availability
    };

    try {
      await axios.put(`https://share-space-backend-2-0.onrender.com/api/updateProduct/${editingProduct.id}`, updatedProduct);
      alert("Item updated successfully!");
      setEditingProduct(null); // Reset editing state
      setView("view products"); // Go back to view products
      setProductName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage("");
      setArtist("");
      setAvailability("Available");
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Error updating product.");
    }
  };

  const filteredItems = items.filter(
    (item) => item.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
              (availabilityFilter === "" || item.availability === availabilityFilter)
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name": setProductName(value); break;
      case "description": setDescription(value); break;
      case "price": setPrice(value); break;
      case "category": setCategory(value); break;
      case "image": setImage(value); break;
      case "artist": setArtist(value); break;
      case "availability": setAvailability(value); break;
      default: break;
    }
  };

  return (
    <div className="admin-system">
      <h1 className="admin-system-heading">Admin Dashboard</h1>

      <div className="split-screen">
        <div className="sidebar">
          <button className="admin-button" onClick={() => setView("add product form")}>Add Product</button>
          <button className="admin-button" onClick={() => setView("view products")}>View Products</button>
          <button className="admin-button" onClick={() => setView("orders")}>View Orders</button>
          <button className="admin-button">Logout</button>
        </div>

        <div className="admin-main-content">
          {view === "view products" && (
            <div>
              <h2>Manage Items</h2>
              <div className="filters">
                <input
                  className="admin-items"
                  type="text"
                  placeholder="Search items"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  className="admin-items"
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                >
                  <option value="">Select Availability</option>
                  <option value="Available">Available</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

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
                        className={item.availability === "Available" ? "availability-available" : "availability-out"}
                      >
                        <td>{item.productName}</td>
                        <td>${item.price}</td>
                        <td>{item.availability}</td>
                        <td className="td-action">
                          <button
                            className="admin-edit"
                            onClick={() => handleEditItem(item)} // Trigger edit
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
            </div>
          )}

          {view === "add product form" && (
            <div>
              <h2>{editingProduct ? "Edit Item" : "Add New Item"}</h2>
              <div className="admin-form-container">
                <form className="admin-form">
                  <div className="admin-input-group">
                    <label htmlFor="productName">Product Name</label>
                    <input
                      className="admin-inputs"
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
                      className="admin-inputs"
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
                      className="admin-inputs"
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
                      className="admin-inputs"
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
                      className="admin-inputs"
                      type="text"
                      id="image"
                      name="image"
                      placeholder="Enter Image URL"
                      value={image}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="admin-input-group">
                    <label htmlFor="artist">Artist</label>
                    <input
                      className="admin-inputs"
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
                      className="admin-inputs"
                      id="availability"
                      name="availability"
                      value={availability}
                      onChange={handleInputChange}
                    >
                      <option value="Available">Available</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>

                  <div className="admin-input-group">
                    <button
                      type="button"
                      className="admin-submit"
                      onClick={editingProduct ? handleUpdateItem : addProduct}
                      disabled={loading} // Disable button while loading
                    >
                      {loading ? "Adding..." : editingProduct ? "Update Product" : "Add Product"}
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
