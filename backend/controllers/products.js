const Product = require("../models/Product");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc    Get products
// @route   GET /api/products || /api/collections/:collectionId/products
// @access  Public
exports.getProducts = async (req, res, next) => {
  try {
    // Get collection products
    if (req.params.collectionId) {
      const products = await Product.find({
        collection: req.params.collectionId,
      });
      return res.status(200).json({ success: true, data: products });
    }

    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new ErrorResponse("No product found", 404));

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Create product
// @route   POST /api/collections/:collectionId/products
// @access  Private
exports.createProduct = async (req, res, next) => {
  try {
    req.body.collectionRef = req.params.collectionId;
    const product = await Product.create(req.body);
    product.setCollectionProduct(req.params.collectionId);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorResponse("No product found", 404));
    }

    await product.remove();
    product.setCollectionProduct(product.collectionRef);

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
