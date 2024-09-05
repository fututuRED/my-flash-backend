const FollowRequest = require("./../models/FollowRequest.model");
const isFriend = async (req, res, next) => {
  if (!req.userId) {
    return res
      .status(403)
      .json({ message: "You must be logged in to access this endpoint" });
  }
  const targetUserId = req.params.userId;
  if (req.userId === targetUserId) {
    return next();
  }
  try {
    console.log("User ID from token (req.userId):", req.userId);
    console.log("Target user ID from params:", targetUserId);
    const isFriend = await FollowRequest.exists({
      status: "Accepted",
      $or: [
        {
          $and: [{ fromUser: req.userId }, { toUser: targetUserId }],
        },
        {
          $and: [{ fromUser: targetUserId }, { toUser: req.userId }],
        },
      ],
    });
    console.log("Friendship existence result:", isFriend);
    // const user = await
    if (!isFriend) {
      return res
        .status(403)
        .json({ message: "You are not friends with this user" });
    }
    // if (!user.isFriendWith(targetUserId)) {
    //   return res
    //     .status(403)
    //     .json({ message: "You are not friends with this user" });
    // }

    next();
  } catch (error) {
    console.log("Error in isFriend middleware:", error);
    next(error);
  }
};

module.exports = isFriend;
