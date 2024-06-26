const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      uniqued: true,
    },
    slug: String,
    price: {
      type: Number,
      required: [true, "Please add product price"],
      default: 0,
    },
    mainImage: { type: String, default: "main_image.png" },
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
    collectionRef: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please link product to a collection id"],
      ref: "Collection",
    },
  },
  { timestamps: true }
);

// Generate slug
productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Sets latest product for a collection
productSchema.methods.setCollectionProduct = async function (collectionRef) {
  try {
    const products = await this.model("Product").find({ collectionRef });
    await this.model("Collection").findByIdAndUpdate(collectionRef, {
      product: products[products.length - 1],
    });
  } catch (error) {
    console.log(error);
  }
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
