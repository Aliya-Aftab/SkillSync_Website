
const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const { ConnectionRequestModel } = require("../models/connectionRequest");

const router = express.Router();

const cosineSimilarity = (vecA, vecB) => {
  let dotProduct = 0,
    magA = 0,
    magB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magA += vecA[i] * vecA[i];
    magB += vecB[i] * vecB[i];
  }
  if (magA === 0 || magB === 0) return 0;
  return dotProduct / (Math.sqrt(magA) * Math.sqrt(magB));
};

// GET /api/smart-matches?page=1&limit=5
router.get("/smart-matches", userAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const currentUser = await User.findById(req.user._id);
    const allUsers = await User.find({ _id: { $ne: req.user._id } });

    const connections = await ConnectionRequestModel.find({
      $or: [
        { fromUserId: req.user._id, status: "accepted" },
        { toUserId: req.user._id, status: "accepted" },
      ],
    });

    const connectedIds = new Set(
      connections.map((conn) =>
        conn.fromUserId.toString() === req.user._id.toString()
          ? conn.toUserId.toString()
          : conn.fromUserId.toString()
      )
    );

    const allRequests = await ConnectionRequestModel.find({
      $or: [{ fromUserId: req.user._id }, { toUserId: req.user._id }],
    });

    const alreadyInteractedIds = new Set();
    allRequests.forEach((req) => {
      alreadyInteractedIds.add(req.fromUserId.toString());
      alreadyInteractedIds.add(req.toUserId.toString());
    });

    const skillSet = new Set();
    allUsers.forEach((u) =>
      (u.skills || []).forEach((s) => skillSet.add(s.toLowerCase()))
    );
    (currentUser.skills || []).forEach((s) => skillSet.add(s.toLowerCase()));
    const skillList = Array.from(skillSet);

    const currentSkills = (currentUser.skills || []).map((s) =>
      s.toLowerCase()
    );
    const userVector = skillList.map((skill) =>
      currentSkills.includes(skill) ? 1 : 0
    );

    const suggestions = [];

    for (const otherUser of allUsers) {
      const otherId = otherUser._id.toString();
      if (connectedIds.has(otherId) || alreadyInteractedIds.has(otherId))
        continue;

      const otherSkills = (otherUser.skills || []).map((s) => s.toLowerCase());
      const otherVector = skillList.map((skill) =>
        otherSkills.includes(skill) ? 1 : 0
      );

      const similarity = cosineSimilarity(userVector, otherVector);
      if (similarity > 0) {
        suggestions.push({ user: otherUser, similarity });
      }
    }

    suggestions.sort((a, b) => b.similarity - a.similarity);
    const paginatedSuggestions = suggestions.slice(skip, skip + limit);

    res.json({
      matches: paginatedSuggestions,
      total: suggestions.length,
      page,
      totalPages: Math.ceil(suggestions.length / limit),
    });
  } catch (err) {
    console.error("Smart match error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
