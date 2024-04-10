const express = require("express");
const {
  getOrder,
  getOrders,
  makeOrder,
  getMyOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  createStripeSession,
  deleteOrder,
} = require("../controllers/orders");
const { protect, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(protect, requireAdmin, getOrders)
  .post(protect, makeOrder);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/deliver", protect, requireAdmin, updateOrderToDelivered);
router.route("/:id/create-stripe-session").post(createStripeSession);

router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrder);
router.delete("/:id", protect, deleteOrder);

module.exports = router;
