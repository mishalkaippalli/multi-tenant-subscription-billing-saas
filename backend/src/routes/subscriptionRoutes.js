const express = require("express");
const router = express.Router();

const {
  createSubscription,
  getSubscriptions,
} = require("../controllers/subscriptionController");

const {
  protect,
  isAdmin,
} = require("../middleware/authMiddleware");

router.use(protect);
router.use(isAdmin);

router.post("/", createSubscription);
router.get("/", getSubscriptions);

module.exports = router;