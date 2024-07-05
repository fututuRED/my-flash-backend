const express = require("express");
const router = express.Router();
const Story = require("../models/Story.model");
const Reaction = require("../models/reaction.model");
const isAuth = require("../middlewares/isAuth");
const isFriend = require("../middlewares/isFriend");

// all stories (public)
router.get("/", async (req, res, next) => {
  try {
    const stories = await Story.find({ status: "Public" });
    res.status(200).json(stories);
  } catch (error) {
    next(error); // Call the error handling middleware
  }
});

// get all the stories from an author / private access
// TODO WIP
router.get("/users/:userId", isAuth, isFriend, async (req, res, next) => {
  const { userId } = req.params;
  try {
    const stories = await Story.find({ author: userId });
    res.status(200).json(stories);
  } catch (error) {
    next(error);
  }
});

//create  /private
router.post("/", isAuth, async (req, res, next) => {
  try {
    const { emoticon, shape, title, content, status } = req.body;
    const storyToCreate = {
      emoticon,
      shape,
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
    const { emoticon, shape, title, content, status } = req.body;
    const { id } = req.params;
    const storyToUpdate = { emoticon, shape, title, content, status };

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

router.post("/:id/reaction", isAuth, async (req, res, next) => {
  const { id } = req.params;

  try {
    // Check if the user already liked the story

    if (!["Like", "Respect"].includes(type)) {
      return res.status(400).json({ message: "Invalid reaction type" });
    }
    const story = await Story.findone({ _id: id });

    let existingReaction = await Reaction.findOne({
      story: id,
      user: req.userId,
      type,
    });

    if (existingReaction) {
      return res.status(400).json({
        message: `You have already ${type.toLowerCase()}d this story`,
      });
    }

    const newReaction = await Reaction.create({
      story: id,
      user: req.userId,
      type,
    });

    res.status(200).json({
      message: `Story ${type.toLowerCase()}d!`,
      reaction: newReaction,
    });
  } catch (error) {
    next(error);
  }
});

//UPDATE REACTIONS OR DELETE ??
module.exports = router;
