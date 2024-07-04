const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      maxLenght: 10,
      minLength: 3,
      required: [true, "Username required."],
    },
    email: {
      type: String,

      required: [true, "Username required."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    avatarUrl: {
      type: String,
      default: "images/default-avatar.png",
    },
    stories: {
      type: [{ type: Schema.Types.ObjectId, ref: "Story" }],
      default: [],
    },
    friends: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
