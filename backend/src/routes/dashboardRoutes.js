const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controllers/dashboardController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.use(protect);
router.use(isAdmin);

router.get("/", getDashboard);

module.exports = router;