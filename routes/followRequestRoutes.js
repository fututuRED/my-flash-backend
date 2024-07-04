const express = require("express");
const router = express.Router();
const FollowRequest = require("../models/FollowRequest.model");

// Create a follow request
router.post("/", async (req, res) => {
  try {
    const { fromUser, toUser } = req.body;
    const newRequest = new FollowRequest({ fromUser, toUser });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update follow request status (e.g., accept or reject the request)
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body; // "accepted" or "rejected"
    const followRequest = await FollowRequest.findById(req.params.id);
    if (followRequest) {
      followRequest.status = status;
      await followRequest.save();
      res.status(200).json(followRequest);
    } else {
      res.status(404).json({ message: "Follow request not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
