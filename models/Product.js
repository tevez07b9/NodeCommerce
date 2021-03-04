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

module.exports.getAllProducts = async (query, sort) => {

  try {
    
    // String Matching Regex
    return await Product.find(query).sort(sort);

  } catch (error) {
    throw error;
  }
};

module.exports.getProductsById = async (ids) => {
  try {

    let parsedIds = ids.map(id => mongoose.Types.ObjectId(id));

    return await Product.find({
      '_id': { $in : [...parsedIds] }
    });
  } catch (error) {
    console.log("server error: ", error);
    return [];
  }
}
