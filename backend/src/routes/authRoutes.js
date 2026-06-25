const express = require("express");
const router = express.Router();

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  register,
  login,
} = require("../controllers/authController");

router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;