const express = require("express");
const {
  getCollections,
  deleteColletion,
  updateCollection,
  createCollection,
  getCollection,
} = require("../controllers/collections");
const { protect, requireAdmin } = require("../middleware/auth");
const { redisCachingMiddleware } = require("../middleware/redis");
const router = express.Router();

// Include products router
const productsRouter = require("./products");
router.use("/:collectionId/products", productsRouter);

router.post("/", protect, requireAdmin, createCollection);
router.get("/", redisCachingMiddleware(), getCollections);

router
  .route("/:id")
  .delete(protect, requireAdmin, deleteColletion)
  .put(protect, requireAdmin, updateCollection);

router.get("/:slug", redisCachingMiddleware(), getCollection);

module.exports = router;
