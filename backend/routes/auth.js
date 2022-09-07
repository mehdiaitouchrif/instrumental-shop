const express = require("express");
const { signUp, login, getMe } = require("../controllers/auth");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.post("/register", signUp);
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;
