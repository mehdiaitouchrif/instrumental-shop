const mongoose = require("mongoose");
const slugify = require("slugify");

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Collection name is necessary"],
      unique: true,
    },
    slug: String,
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Generate slug
collectionSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Reverse populate with virtuals
collectionSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "collectionRef",
  justOne: false,
});

// Cascade delete products when a collection is deleted
collectionSchema.pre("remove", async function (next) {
  await this.model("Product").deleteMany({ collectionRef: this._id });
  next();
});

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
