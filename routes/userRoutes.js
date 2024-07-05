const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const isAuth = require("../middlewares/isAuth");

router.get("/", isAuth, async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// GET one user
router.get("/:id", isAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const oneUser = await User.findOne({ _id: id }).populate("stories friends");
    res.status(200).json(oneUser);
  } catch (error) {
    next(error);
  }
});

//create
router.post("/", async (req, res, next) => {
  try {
    const { username, email, password, avatarUrl } = req.body;
    const userToCreate = { username, email, password, avatarUrl };
    const newUser = await User.create(userToCreate);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});
//update
router.put("/me", isAuth, async (req, res, next) => {
  try {
    const { username, avatarUrl } = req.body;
    const userToUpdate = { username, avatarUrl };

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.userId },
      userToUpdate,
      {
        new: true,
      }
    );
    res.status(202).json(updatedUser);
  } catch (error) {
    next(error);
  }
});
// delete
router.delete("/:id", isAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userToDelete = await User.findOneAndDelete({
      _id: id,
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
