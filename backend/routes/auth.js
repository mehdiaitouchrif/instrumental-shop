const express = require("express");
const {
  signUp,
  login,
  getMe,
  confirmEmail,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateDetails,
  logout,
} = require("../controllers/auth");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.post("/register", signUp);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/logout", protect, logout);
router.get("/confirmemail", confirmEmail);

router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);

router.put("/updatepassword", protect, updatePassword);
router.put("/updatedetails", protect, updateDetails);

module.exports = router;
