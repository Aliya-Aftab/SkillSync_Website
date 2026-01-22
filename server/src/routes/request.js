
const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequestModel } = require("../models/connectionRequest");
const User = require("../models/user");

// --- 1. SEND CONNECTION REQUEST ---
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // 1. Valid Status Check
      const allowedStatuses = ["ignored", "interested"];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status type: " + status });
      }

      // 2. Self-Connection Check 
      if (fromUserId.toString() === toUserId) {
        return res.status(400).json({ message: "Cannot send request to yourself!" });
      }

      // 3. To User Exists Check
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // 4. Existing Connection Check
      // (Checks if A->B OR B->A already exists)
      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      
      if (existingConnectionRequest) {
        return res.status(400).json({ message: "Connection Request already exists!!" });
      }

      // 5. Create & Save
      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });

    } catch (error) {
      res.status(400).send("ERROR: " + error.message);
    }
  }
);

// --- 2. REVIEW REQUEST (Accept/Reject) ---
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatuses = ["accepted", "rejected"];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Status not allowed!" });
      }

      // Validate the request exists AND belongs to the loggedInUser
      const connectionRequest = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res.status(404).json({ message: "Connection request not found" });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.json({ message: "Connection request " + status, data });
      
    } catch (error) {
      res.status(400).send("ERROR: " + error.message);
    }
  }
);

// --- 3. DISCONNECT (Remove a Connection by User ID) ---
requestRouter.delete(
  "/request/disconnect/:targetUserId",
  userAuth,
  async (req, res) => {
    try {
      const { targetUserId } = req.params;
      const loggedInUserId = req.user._id;

      // Find and delete the connection (whether I sent it or they sent it)
      const connection = await ConnectionRequestModel.findOneAndDelete({
        $or: [
          { fromUserId: loggedInUserId, toUserId: targetUserId },
          { fromUserId: targetUserId, toUserId: loggedInUserId },
        ],
        status: "accepted",
      });

      if (!connection) {
        return res.status(404).json({ message: "Connection not found" });
      }

      res.json({ message: "Connection removed successfully" });
    } catch (error) {
      res.status(400).send("ERROR: " + error.message);
    }
  }
);
module.exports = requestRouter;
