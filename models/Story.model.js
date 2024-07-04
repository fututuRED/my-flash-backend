const { Schema, model } = require("mongoose");

const storySchema = new Schema(
  {
    emoticon: {
      type: String,
      default: "",
    },
    shape: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      minLength: 3,
      maxLength: 2500,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Story = model("Story", storySchema);

module.exports = Story;
