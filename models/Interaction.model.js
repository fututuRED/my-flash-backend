const { Schema, model } = require("mongoose");

const interactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    petId: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    likes: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    respects: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
  },
  { timestamps: true }
);

const Interaction = model("Interaction", interactionSchema);

module.exports = Interaction;
