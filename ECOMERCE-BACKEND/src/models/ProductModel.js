const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // id product - extra
    // origin
    name: { type: String, required: true },
    masanpham: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    discount: { type: Number },
    selled: { type: Number },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
