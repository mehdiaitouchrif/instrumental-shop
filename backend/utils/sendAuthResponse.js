// Get token & create cookie
exports.sendAuthResponse = (user, res, statusCode = 200) => {
  try {
    // Create token
    const token = user.getSignedJwtToken();
    const expires = process.env.JWT_COOKIE_EXPIRE;

    const options = {
      expires: new Date(Date.now() + expires * 24 * 60 * 60 * 1000),
      httpOnly: process.env.NODE_ENV === "production",
    };

    res
      .status(statusCode)
      .cookie("auth.token-instrumental", token, options)
      .json({ success: true, token, user });
  } catch (error) {
    console.error("Error generating token", error);
    res.status(500).json({ success: false, error: "Error generating token" });
  }
};
