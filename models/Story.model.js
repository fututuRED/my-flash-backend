const { Schema, model } = require("mongoose");

const storySchema = new Schema(
  {
    emoticon: {
      type: Array,
      default: [],
    },
    textColor: {
      type: String,
      default: "#000000",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      minLength: 10,
      maxLength: 2500,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Private", "Public"],
      default: "Public",
    },
  },
  { timestamps: true }
);

const Story = model("Story", storySchema);

module.exports = Story;
