const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET Products
router.get("/products", async (req, res, next) => {
  try {
    let products = await Product.getAllProducts();
    res.json({ msg: "got products", products });
  } catch (error) {
    throw error;
  }
});

module.exports = router;
