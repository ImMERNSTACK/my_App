const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true, // Ensure id is unique
  },
  title: {
    type: String,
    required: true, // Ensure title is required
  },
  price: {
    type: Number,
    required: true, // Ensure price is required
  },
  quantity: {
    type: Number,
    required: true, // Ensure quantity is required
  },
  total: {
    type: Number,
    required: true, // Ensure total is required (You could calculate this from price * quantity)
  },
  discountPercentage: {
    type: Number,
    required: true, // Ensure discount percentage is required
  },
  discountedTotal: {
    type: Number,
    required: true, // Ensure discounted total is required (Could calculate based on discount logic)
  },
  thumbnail: {
    type: String,
    required: true, // Ensure thumbnail URL is required
  }
});

// Create the Product model (Note: Singular naming convention is commonly used)
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
