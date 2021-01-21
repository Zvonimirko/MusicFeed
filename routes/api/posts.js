const express = require("express");
const router = express.Router();

// @route   GET api/posts
// @desc    Test Route
// @access  Public

router.get("/", (req, res) => {
  res.status(400).send("This is posts route");
});
