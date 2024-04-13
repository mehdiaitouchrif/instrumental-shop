const express = require("express");
const {
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
  getProduct,
} = require("../controllers/products");
const { protect, requireAdmin } = require("../middleware/auth");
const { redisCachingMiddleware } = require("../middleware/redis");

const router = express.Router({ mergeParams: true });

router.post("/", protect, requireAdmin, createProduct);
router.get("/", redisCachingMiddleware(), getProducts);

router
  .route("/:id")
  .delete(protect, requireAdmin, deleteProduct)
  .put(protect, requireAdmin, updateProduct);

router.get("/:slug", redisCachingMiddleware(), getProduct);

module.exports = router;
