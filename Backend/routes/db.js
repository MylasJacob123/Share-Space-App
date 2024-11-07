const express = require("express");
const router = express.Router();
const { addProduct, getProducts, deleteEmployee, updateProduct } = require("../controllers/db");

router.post("/addProduct", addProduct);
router.get("/getProducts", getProducts);
router.delete("/deleteProduct/:id", deleteEmployee);
router.put("/updateProduct/:id", updateProduct); 

module.exports = router;
