const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  imagePath: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  department: {
    type: String
  },
  category: {
    type: String
  },
  price: {
    type: Number
  },
  color: {
    type: String
  },
  size: {
    type: String
  },
  quantity: {
    type: Number
  },
  date: {
    type: Number
  }
});

const Product = (module.exports = mongoose.model("Product", productSchema));

module.exports.getAllProducts = async () => {
  return await Product.find({});
};
