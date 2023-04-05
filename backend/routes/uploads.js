const express = require("express");
const { protect, requireAdmin } = require("../middleware/auth");
const uploadMiddleware = require("../middleware/multer");
const {
  uploadSingleImage,
  uploadMultipleImages,
} = require("../controllers/uploads");
const router = express.Router();

router.post(
  "/main_image",
  protect,
  requireAdmin,
  uploadMiddleware.single("mainImage"),
  uploadSingleImage
);
router.post(
  "/secondary_images",
  protect,
  requireAdmin,
  uploadMiddleware.array("secondaryImages", 6),
  uploadMultipleImages
);

module.exports = router;
