const express = require("express");
const {
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
  getProduct,
  uploadSecondaryImages,
  uploadMainImage,
} = require("../controllers/products");
const { protect, requireAdmin } = require("../middleware/auth");
const uploadMiddleware = require("../middleware/multer");

const router = express.Router({ mergeParams: true });

router.route("/").get(getProducts).post(protect, requireAdmin, createProduct);

router
  .route("/:id")
  .delete(protect, requireAdmin, deleteProduct)
  .put(protect, requireAdmin, updateProduct);

router.put(
  "/:id/main_image",
  protect,
  requireAdmin,
  uploadMiddleware.single("mainImage"),
  uploadMainImage
);
router.put(
  "/:id/secondary_images",
  protect,
  requireAdmin,
  uploadMiddleware.array("secondaryImages", 6),
  uploadSecondaryImages
);

router.get("/:slug", getProduct);

module.exports = router;
