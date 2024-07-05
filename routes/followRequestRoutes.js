const express = require("express");
const router = express.Router();
const FollowRequest = require("../models/FollowRequest.model");
const isAuth = require("../middlewares/isAuth");

// create
router.post("/:userId", isAuth, async (req, res, next) => {
  try {
    const newRequest = await FollowRequest.create({
      fromUser: req.userId,
      toUser: req.params.userId,
    });
    res.status(201).json(newRequest);
  } catch (error) {
    next(error);
  }
});

// update
router.put("/:id", isAuth, async (req, res, next) => {
  try {
    const { status } = req.body;

    const followRequest = await FollowRequest.findOneAndUpdate(
      { _id: req.params.id, toUser: req.userId },
      { status },
      { new: true }
    );
    res.status(202).json(followRequest);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
