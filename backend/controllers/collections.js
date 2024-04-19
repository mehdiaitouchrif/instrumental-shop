const { removeResourceCache } = require("../middleware/redis");
const Collection = require("../models/Collection");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc    Get all collection
// @route   GET /collections
// @access  Public
exports.getCollections = async (req, res) => {
  const collections = await Collection.find({}).populate({
    path: "product",
    select: "name slug mainImage",
  });
  res.status(200).json({ success: true, data: collections });
};

// @desc  Get single collection
// @route GET /collections/:slug
// @access  public
exports.getCollection = async (req, res, next) => {
  try {
    const collection = await Collection.findOne({
      slug: req.params.slug,
    }).populate("products");
    if (!collection) return next(new ErrorResponse("No collection found", 404));

    res.status(200).json({ success: true, data: collection });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new collection
// @route   POST /collections
// @access  Private
exports.createCollection = async (req, res, next) => {
  try {
    console.log(req.user);
    const collection = await Collection.create(req.body);

    await removeResourceCache("collections");
    res.status(201).json({ success: true, data: collection });
  } catch (error) {
    next(error);
  }
};

// @desc    Update collection
// @route   PUT /collections/:id
// @access  Private
exports.updateCollection = async (req, res, next) => {
  try {
    let collection = await Collection.findById(req.params.id);

    if (!collection) {
      return next(new ErrorResponse("No collection found", 404));
    }

    collection = await Collection.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      {
        new: true,
        runValidators: true,
      }
    );

    await removeResourceCache("collections");

    res.status(200).json({ success: true, data: collection });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete collection
// @route   DELETE /collections/:id
// @access  Private
exports.deleteColletion = async (req, res, next) => {
  try {
    const collection = await Collection.findById(req.params.id);

    if (!collection) {
      return next(new ErrorResponse("No collection found", 404));
    }

    await collection.remove();
    await removeResourceCache("collections");

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
