const { Schema, model } = require("mongoose");

const reactSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storyId: {
      type: Schema.Types.ObjectId,
      ref: "Story",
      required: true,
    },
    type: {
      type: String,
      enum: ["Like", "Respect"],
      required: true,
    },
  },
  { timestamps: true }
);

const Respect = model("Reaction", reactSchema);

module.exports = Respect;
