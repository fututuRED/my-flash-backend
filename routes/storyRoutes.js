const express = require("express");
const router = express.Router();
const Story = require("../models/Story.model");

router.post("/", async (req, res, next) => {
  try {
    const newStory = new Story(req.body);
    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    next(error); // Call the error handling middleware
  }
});

// Get all stories by a specific user
router.get("/users/:userId", async (req, res, next) => {
  try {
    const stories = await Story.find({ author: req.params.userId });
    res.status(200).json(stories);
  } catch (error) {
    next(error); // Call the error handling middleware
  }
});

// Get all stories
router.get("/", async (req, res, next) => {
  try {
    const stories = await Story.find();
    res.status(200).json(stories);
  } catch (error) {
    next(error); // Call the error handling middleware
  }
});

// Get a story by ID
router.get("/:id", async (req, res, next) => {
  try {
    const story = await Story.findById(req.params.id).populate("author");
    if (story) {
      res.status(200).json(story);
    } else {
      res.status(404).json({ message: "Story not found" });
    }
  } catch (error) {
    next(error); // Call the error handling middleware
  }
});

module.exports = router;
