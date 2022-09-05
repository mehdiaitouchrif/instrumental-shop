const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    mainImage: String,
    secondaryImages: [String],
    features: {
      type: String,
      required: [true, "Please add product description"],
    },
    inBox: [
      {
        itemName: String,
        quantity: Number,
      },
    ],
    collection: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please link product to a collection id"],
      ref: "Collection",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
