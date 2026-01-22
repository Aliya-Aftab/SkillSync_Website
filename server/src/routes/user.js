

const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequestModel } = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName photoURL about age gender skills";

// --- 1. GET PENDING REQUESTS ---
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    
    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    
    // Mongoose returns [] if empty, which is fine to send.
    res.status(200).json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });

  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// --- 2. GET CONNECTIONS ---
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate("fromUserId toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.status(200).json({
      message: "Connections fetched successfully", // Added message for consistency
      data,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// --- 3. GET USER PROFILE VIEW ---
userRouter.get("/user/view/:userId", userAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select(USER_SAFE_DATA);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// --- 4. GET FEED ---
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    // Find all requests involved with me (sent or received)
    const connectionRequest = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    // Create a Set of users to hide (people I already interacted with)
    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    // Find users NOT in that Set, and NOT me
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ data: users }); 
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = userRouter;