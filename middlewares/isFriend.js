const FollowRequest = require("./../models/FollowRequest.model");
const isFriend = async (req, res, next) => {
  if (!req.userId) {
    return res
      .status(403)
      .json({ message: "You must be logged in to access this endpoint" });
  }

  try {
    const targetUserId = req.params.userId;
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
    console.log(req.userId, targetUserId);
    console.log(isFriend);
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
    next(error);
  }
};

module.exports = isFriend;
