const express = require("express");
const router = express.Router();

const {
    createUser,
    getUsers
} = require("../controllers/userController");

const {
    protect,
    isAdmin
} = require("../middleware/authMiddleware");

router.use(protect);
router.use(isAdmin);

router.post("/", createUser);
router.get("/", getUsers);

module.exports = router;