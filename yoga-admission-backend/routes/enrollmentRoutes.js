const express = require("express");
const {
  enrollUser,
  changeBatch,
} = require("../controllers/enrollmentController");

const router = express.Router();

// POST route for enrollment
router.post("/enroll", enrollUser);
router.post("/change-batch", changeBatch);

module.exports = router;
