const express = require("express");
const {
  signUp,
  login,
  getMe,
  confirmEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.post("/register", signUp);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/confirmemail", confirmEmail);

router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);

module.exports = router;
