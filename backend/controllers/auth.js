const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc    Sign up
// @route   POST /auth/register
// @access  Public
exports.signUp = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = user.getSignedJwtToken();
    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

// @desc    Login
// @route   POST /auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) return next(new ErrorResponse("Please enter your email", 400));
    if (!password)
      return next(new ErrorResponse("Please enter your password", 400));

    // Search user
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorResponse("Invalid email or password", 400));

    // Match passwords
    const isMatch = await user.matchPasswords(password);
    if (!isMatch)
      return next(new ErrorResponse("Invalid email or password", 400));

    // Generate token
    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};
