const express = require("express");
const {
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
  getProduct,
} = require("../controllers/products");
const { protect, requireAdmin } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router.route("/").get(getProducts).post(protect, requireAdmin, createProduct);

router
  .route("/:id")
  .delete(protect, requireAdmin, deleteProduct)
  .put(protect, requireAdmin, updateProduct)
  .get(getProduct);

module.exports = router;
