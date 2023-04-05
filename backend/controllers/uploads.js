const ErrorResponse = require("../utils/ErrorResponse");
const cloudinary = require("../utils/cloudinary");

// @desc  Upload single image
// @route POST /uploads/main_image
// @access  Private
exports.uploadSingleImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new ErrorResponse("Please import an image ", 400));
    }
    const { secure_url } = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: `Instrumental-shop/main`,
      overwrite: true,
    });

    res.status(200).json({ success: true, data: secure_url });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload multiple images
// @route   POST /api/uploads/secondary_images
// @access  Private
exports.uploadMultipleImages = async (req, res, next) => {
  try {
    const files = req.files;
    if (!files) {
      return next(new ErrorResponse("Please select at least 2 images ", 400));
    }

    const promises = files.map((file) =>
      cloudinary.v2.uploader.upload(file.path, {
        folder: `Instrumental-shop/secondary`,
        overwrite: true,
      })
    );

    const data = (await Promise.all(promises)).map((obj) => obj.secure_url);

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
