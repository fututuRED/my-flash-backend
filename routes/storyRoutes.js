const express = require("express");
const router = express.Router();
const Story = require("../models/Story.model");

const isAuth = require("../middlewares/isAuth");

// all stories
router.get("/", async (req, res, next) => {
  try {
    const stories = await Story.find({ status: "Public" }).populate("author");
    res.status(200).json(stories);
  } catch (error) {
    next(error); // Call the error handling middleware
  }
});

// all the stories from an author
router.get("/users/:userId", isAuth, isFriend, async (req, res, next) => {
  const { userId } = req.params;
  try {
    const stories = await Story.find({ author: userId });
    res.status(200).json(stories);
  } catch (error) {
    next(error);
  }
});

// one story
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const story = await Story.findOne({ _id: id, status: "Public" }).populate(
      "author"
    );
    if (story && story.status === "Private") {
      return res.status(404).json({ message: "Story not found" });
    }
    if (story) {
      res.status(200).json(story);
    } else {
      return res.status(404).json({ message: "Story not found" });
    }
  } catch (error) {
    next(error);
  }
});

//create
router.post("/", isAuth, async (req, res, next) => {
  try {
    const { emoticon, backgroundColor, title, content, status } = req.body;
    const storyToCreate = {
      emoticon,
      backgroundColor,
      title,
      content,
      author: req.userId,
      status,
    };
    const createdStory = await Story.create(storyToCreate);
    res.status(201).json(createdStory);
  } catch (error) {
    next(error);
  }
});

//update
router.put("/:id", isAuth, async (req, res, next) => {
  try {
    const { emoticon, backgroundColor, title, content, status } = req.body;
    const { id } = req.params;
    const storyToUpdate = { emoticon, backgroundColor, title, content, status };

    const updatedStory = await Story.findOneAndUpdate(
      { _id: id, author: req.userId },
      storyToUpdate,
      {
        new: true,
      }
    );
    res.status(202).json(updatedStory);
  } catch (error) {
    next(error);
  }
});
// delete
router.delete("/:id", isAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const storyToDelete = await Story.findOneAndDelete({
      _id: id,
      author: req.userId,
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
