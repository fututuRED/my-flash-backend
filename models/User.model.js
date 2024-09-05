const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      minLength: 3,
      maxLenght: 10,
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
    storiess: [
      {
        type: {
          type: Schema.Types.ObjectId,
          ref: "Story",
        },
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
