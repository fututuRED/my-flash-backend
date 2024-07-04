const express = require("express");
const router = express.Router();
const Interaction = require("../models/Interaction.model");

router.post("/stories/:id/like", async (req, res) => {
  try {
    const interaction = await Interaction.findOne({
      storyIdId: req.params.id,
      user: req.user._id,
    });
    if (!interaction.likes.includes(req.user._id)) {
      interaction.likes.push(req.user._id);
      await interaction.save();
    }
    res.status(200).json(interaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/stories/:id/respect", async (req, res) => {
  try {
    const interaction = await Interaction.findOne({
      storyId: req.params.id,
      user: req.user._id,
    });
    if (!interaction.respects.includes(req.user._id)) {
      interaction.respects.push(req.user._id);
      await interaction.save();
    }
    res.status(200).json(interaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
