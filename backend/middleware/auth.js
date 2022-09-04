const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // Make sure token exists
    if (!token) {
      return next(
        new ErrorResponse("Not authorized to access this route", 401)
      );
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      // Invalid token
      return next(
        new ErrorResponse("Not authorized to access this route", 401)
      );
    }
  } catch (error) {
    console.log("Error: ", error);
    return next(new ErrorResponse("Something went wrong", 500));
  }
};

module.exports = protect;
