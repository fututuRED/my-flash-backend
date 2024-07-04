const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const userRoutes = require("./userRoutes.js");
const storyRoutes = require("./storyRoutes.js");
const interactionRoutes = require("./interactionRoutes.js");
const followRequestRoutes = require("./followRequestRoutes.js");

router.use("/users", userRoutes);
router.use("/stories", storyRoutes);
router.use("/interactions", interactionRoutes);
router.use("/followrequests", followRequestRoutes);

module.exports = router;
