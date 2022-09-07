const express = require("express");
const {
  getCollections,
  deleteColletion,
  updateCollection,
  createCollection,
} = require("../controllers/collections");
const { protect, requireAdmin } = require("../middleware/auth");
const router = express.Router();

// Include products router
const productsRouter = require("./products");
router.use("/:collectionId/products", productsRouter);

router
  .route("/")
  .get(getCollections)
  .post(protect, requireAdmin, createCollection);

router
  .route("/:id")
  .delete(protect, requireAdmin, deleteColletion)
  .put(protect, requireAdmin, updateCollection);

module.exports = router;
