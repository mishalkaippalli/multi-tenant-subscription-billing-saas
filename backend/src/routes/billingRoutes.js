const express = require("express");
const router = express.Router();

const {
  runBillingCycle,
  getBillingLogs,
} = require("../controllers/billingController");

const {
  protect,
  isAdmin,
} = require("../middleware/authMiddleware");

router.use(protect);
router.use(isAdmin);

router.post("/run-cycle", runBillingCycle);
router.get("/logs", getBillingLogs);

module.exports = router;