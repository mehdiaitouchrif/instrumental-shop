const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Collection name is necessary"],
      unique: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

// Cascade delete products when a collection is deleted
collectionSchema.pre("remove", async function (next) {
  await this.model("Product").deleteMany({ collectionRef: this._id });
  next();
});

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
