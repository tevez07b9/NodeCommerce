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

  try {
    // String Matching Regex
    return await Product.find({ color: 'Black', size: {
      '$regex': 'XL',
      "$options": 'i'
    } });

    // return await Product.find({ size: {
    //     $elemMatch: { $eq: 1 },
    //   } 
    // });

  } catch (error) {
    throw error;
  }
};
