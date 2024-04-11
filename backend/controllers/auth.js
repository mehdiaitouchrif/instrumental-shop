const crypto = require("crypto");
const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const sendEmail = require("../utils/sendEmail");
const { sendAuthResponse } = require("../utils/sendAuthResponse");

// @desc    Sign up
// @route   POST /auth/register
// @access  Public
exports.signUp = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    //****** Send Confirmation Email */ */
    try {
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
    } catch (error) {
      console.log(error);
    }

    sendAuthResponse(user, res, 201);
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

    sendAuthResponse(user, res);
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

// @desc      Logout / destroy auth cookie
// @route     GET /auth/logout
// @access    Private
exports.logout = async (req, res, next) => {
  res.clearCookie("auth.token-instrumental");

  res.status(200).json({
    success: true,
    data: {},
  });
};

// @desc      Update user profile
// @route     PUT /api/auth/updatedetails
// @access    Private
exports.updateDetails = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Update password
// @route     PUT /api/auth/updatepassword
// @access    Private
exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    // Check current password
    if (!(await user.matchPasswords(req.body.currentPassword))) {
      return next(new ErrorResponse("Password is incorrect", 401));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendAuthResponse(user, res);
  } catch (error) {
    next(error);
  }
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

    sendAuthResponse(user, res);
  } catch (error) {
    next(error);
  }
};

// @desc      Forgot password
// @route     POST /api/auth/forgotpassword
// @access    Public
exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new ErrorResponse("No user found", 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/auth/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password.<br /> To reset your password, please follow the link bellow.`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset Request",
        message,
        url: resetUrl,
        buttonTitle: "Reset Password",
      });

      res.status(200).json({ success: true, data: "Email sent" });
    } catch (err) {
      console.log(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (error) {
    next(error);
  }
};

// @desc      Reset password
// @route     PUT /api/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = async (req, res, next) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resettoken)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid token", 400));
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendAuthResponse(user, res);
  } catch (error) {
    next(error);
  }
};
