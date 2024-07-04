const { Schema, model } = require("mongoose");

const followRequestSchema = new Schema(
  {
    fromUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const FollowRequest = model("FollowRequest", followRequestSchema);

module.exports = FollowRequest;
