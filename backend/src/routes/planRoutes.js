const express = require("express");
const router = express.Router();

const {
  createPlan,
  getPlans,
  deletePlan,
} = require("../controllers/planController");

const {
  protect,
  isAdmin,
} = require("../middleware/authMiddleware");

router.use(protect);
router.use(isAdmin);

router.post("/", createPlan);
router.get("/", getPlans);
router.delete("/:id", deletePlan);

module.exports = router;