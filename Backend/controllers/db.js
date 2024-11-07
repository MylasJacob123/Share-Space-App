const {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} = require("firebase/firestore");
const { db } = require("../config/firebase");

const addProduct = async (req, res) => {
  const { productName, image, description, price, category, artist, availability } = req.body;
  console.log('Request Body:', req.body);

  try {
    const docRef = await addDoc(collection(db, "Products"), {
      productName: productName,
      image: image,
      description: description,
      price: price,
      category: category,
      artist: artist,
      availability: availability,
    });
    console.log("Product added successfully:", docRef.id);
    res.json({ message: "Product added successfully", productId: docRef.id });
  } catch (error) {
    console.log("Error in adding product", error);
    res.status(500).json({ error: "Error adding product to Firestore" });
  }
};


const getProducts = async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "Products"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json({
      data: data,
    });
  } catch (error) {
    console.log("Error in getting Products", error);
    res.status(500).json({ error: "Error fetching Products" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, image, description, price, category, artist, availability } = req.body;

    console.log("Updating product ID:", id);

    if (!productName || !image || !description || !price || !category || !artist || !availability) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const productDocRef = doc(db, "Products", id);

    await setDoc(
      productDocRef,
      {
        productName,
        image,
        description,
        price,
        category,
        artist,
        availability,
      },
      { merge: true }
    );

    res.json({
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log("Error in updating Product", error);
    res.status(500).json({ error: "Failed to update Product" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting Product with id:", id);
    const productDocRef = doc(db, "Product", id);
    await deleteDoc(productDocRef);

    res.json({
      message: "Product successfully deleted",
    });
  } catch (error) {
    console.log("Error in deleting Product", error);
    res.status(500).json({ error: "Failed to delete Product" });
  }
};

module.exports = {
  addProduct,
  getProducts,
  deleteEmployee,
  updateProduct,
};
