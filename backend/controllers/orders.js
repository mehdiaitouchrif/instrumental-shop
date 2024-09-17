const Order = require("../models/Order");
const ErrorResponse = require("../utils/ErrorResponse");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// @desc    Create a new order
// @route   POST /orders
// @access  Private
exports.makeOrder = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// @desc    Create payment session
// @route   POST /api/orders/:id/create-stripe-session
// @access  Privatee
exports.createStripeSession = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorResponse("No order found", 404));
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      allow_promotion_codes: true,
      line_items: [
        ...order.orderItems.map((item) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [item.image],
              },
              unit_amount: +item.price * 100,
            },
            quantity: +item.qty,
          };
        }),
        // Add shipping as a line item
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Shipping",
            },
            unit_amount: +order.shippingPrice * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/success/${order._id}`,
      cancel_url: `${process.env.CLIENT_URL}/orders/${order._id}`,
    });

    res.status(200).json(session.url);
  } catch (error) {
    console.log("Stripe error:", error);
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
exports.updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new ErrorResponse("No order found", 404));
    }
    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
exports.updateOrderToDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return next(new ErrorResponse("No order found", 404));

    order.isDelivered = req.body.isDelivered;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order
// @route   GET /orders/:id
// @access  Private
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate("user");
    if (!order) return next(new ErrorResponse("No order found", 404));
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user orders
// @route   GET /orders/myorders
// @access  Private (user)
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      isPaid: 1,
      updatedAt: -1,
      isDelivered: -1,
    });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

// @desc    Get orders
// @route   GET /orders
// @access  Private (admin)
exports.getOrders = async (req, res) => {
  // Pagination
  const count = await Order.find({ isPaid: true }).countDocuments();
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 3;

  const skip = (page - 1) * pageSize;
  const orders = await Order.find({ isPaid: true })
    .sort({ isDelivered: 1, updatedAt: 1 })
    .skip(skip)
    .limit(pageSize);

  res.status(200).json({
    success: true,
    data: {
      orders,
      count,
      page,
    },
  });
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorResponse("No order found", 404));
    }

    // Verify ownership
    const { _id: userId } = req.user;
    if (
      userId.toString() !== order.user.toString() &&
      req.user.role !== "admin"
    ) {
      return next(
        new ErrorResponse("Not authorized to access this route", 401)
      );
    }

    await order.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
