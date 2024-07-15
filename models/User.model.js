const { Schema, model } = require("mongoose");

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

      required: [true, "Email required."],
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
    friends: [
      {
        type: { type: Schema.Types.ObjectId, ref: "User" },
        default: [],
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.isFriendWith = function (userId) {
  return this.friends.includes(userId);
};

const User = model("User", userSchema);

module.exports = User;
