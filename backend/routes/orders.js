const express = require("express");
const {
  getOrder,
  getOrders,
  makeOrder,
  getMyOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require("../controllers/orders");
const { protect, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(protect, requireAdmin, getOrders)
  .post(protect, makeOrder);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/deliver", protect, requireAdmin, updateOrderToDelivered);

router.get("/:id", protect, getOrder);
router.get("/myorders", protect, getMyOrders);

module.exports = router;
