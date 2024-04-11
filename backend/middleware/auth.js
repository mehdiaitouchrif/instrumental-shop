const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies["auth.token-instrumental"]) {
      token = req.cookies["auth.token-instrumental"];
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

exports.requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User role ${req.user.role} is not authorized to access this route`,
        403
      )
    );
  }
  next();
};
