const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

const parseRange = (query) => {
  console.log('incomming data: ', query);
  
  if(Array.isArray(query.range) && query.range.length === 2) {
    query.price = { $gt: query.range[0], $lt: query.range[1] };
    delete query.range;
  }
  
  if(query.size && query.size !== "") {
    query.size = {
      $regex: query.size,
      $options: 'i'
    };
  }
  
  return query;
};

// GET Products
router.post("/products", async (req, res, next) => {
  try {
    
    let { query, sort } = req.body;
    if(!query)
      query = {};
    if(!sort)
      sort = {};
    query = parseRange(query);
    console.log(query);
    let products = await Product.getAllProducts(query, sort);
    res.json({ msg: "got products", products });
  } catch (error) {
    throw error;
  }
});


module.exports = router;
