const express = require("express");
const {
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
  getProduct,
} = require("../controllers/products");
const protect = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router.route("/").get(getProducts).post(protect, createProduct);

router
  .route("/:id")
  .delete(protect, deleteProduct)
  .put(protect, updateProduct)
  .get(getProduct);

module.exports = router;
