const express = require("express");
const {
  getCollections,
  deleteColletion,
  updateCollection,
  createCollection,
} = require("../controllers/collections");
const protect = require("../middleware/auth");
const router = express.Router();

// Include products router
const productsRouter = require("./products");
router.use("/:collectionId/products", productsRouter);

router.route("/").get(getCollections).post(protect, createCollection);

router
  .route("/:id")
  .delete(protect, deleteColletion)
  .put(protect, updateCollection);

module.exports = router;
