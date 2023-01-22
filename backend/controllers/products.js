const Product = require("../models/Product");
const ErrorResponse = require("../utils/ErrorResponse");
const cloudinary = require("../utils/cloudinary");

// @desc    Get products
// @route   GET /api/products || /api/collections/:collectionId/products
// @access  Public
exports.getProducts = async (req, res, next) => {
  try {
    // Get collection products
    if (req.params.collectionId) {
      const products = await Product.find({
        collectionRef: req.params.collectionId,
      });
      return res.status(200).json({ success: true, data: products });
    }

    const products = await Product.find({}).populate("collectionRef");
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:slug
// @access  Public
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
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

// @desc  Upload product main image
// @route PUT /products/:id/main_image
// @access  Private
exports.uploadMainImage = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorResponse("No product found", 404));
    }
    if (!req.file) {
      return next(new ErrorResponse("Please import an image ", 400));
    }
    const { secure_url } = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: `Intrumental-shop/Products/${product.slug}/main`,
      overwrite: true,
    });

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { mainImage: secure_url },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload product secondary images
// @route   PUT /api/products/:id/secondary_images
// @access  Private
exports.uploadSecondaryImages = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorResponse("No product found", 404));
    }

    const files = req.files;
    if (!files) {
      return next(new ErrorResponse("Please select at least 2 images ", 400));
    }

    const promises = files.map((file) =>
      cloudinary.v2.uploader.upload(file.path, {
        folder: `Intrumental-shop/Products/${product.slug}/secondary`,
        overwrite: true,
      })
    );

    const data = (await Promise.all(promises)).map((obj) => obj.secure_url);

    product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        secondaryImages: data,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};
