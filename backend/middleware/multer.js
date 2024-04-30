const multer = require("multer");
const ErrorResponse = require("../utils/ErrorResponse");

const uploadMiddleware = multer({
  storage: multer.diskStorage({
    destination: null,
  }),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/png||jpeg||jpg||gif$i/)) {
      cb(new ErrorResponse("File does not support", 400));
      return;
    }

    cb(null, true);
  },
});

module.exports = uploadMiddleware;
