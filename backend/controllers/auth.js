const crypto = require("crypto");
const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const sendEmail = require("../utils/sendEmail");

// @desc    Sign up
// @route   POST /auth/register
// @access  Public
exports.signUp = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = user.getSignedJwtToken();

    //****** Send Confirmation Email */ */
    const confirmEmailToken = user.generateEmailConfirmationToken();

    const confirmEmailURL = `${req.protocol}://${req.get(
      "host"
    )}/api/auth/confirmemail?confirmToken=${confirmEmailToken}`;

    const message = `Hey ${user.firstName}, <br /> Please confirm your Instrumental Shop email address by following the link below. `;

    user.save({ validateBeforeSave: false });

    await sendEmail({
      email: user.email,
      subject: "Email confirmation token",
      message,
      url: confirmEmailURL,
      buttonTitle: "Confirm Email",
    });

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

// @desc    Current user
// @route   GER /auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  res.status(200).json({ success: true, data: req.user });
};

// @desc  Confirm email
// @route   GET /auth/confirmemail
// @access  Public
exports.confirmEmail = async (req, res, next) => {
  try {
    // grab token from email
    const { confirmToken } = req.query;

    if (!confirmToken) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    const splitToken = confirmToken.split(".")[0];
    const confirmEmailToken = crypto
      .createHash("sha256")
      .update(splitToken)
      .digest("hex");

    // get user by token
    const user = await User.findOne({
      confirmEmailToken,
      isEmailConfirmed: false,
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    // update confirmed to true
    user.confirmEmailToken = undefined;
    user.isEmailConfirmed = true;

    // save
    user.save({ validateBeforeSave: false });

    // regenerate auth token
    const token = user.getSignedJwtToken();
    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};
