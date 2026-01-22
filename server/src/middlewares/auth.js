const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send("Please Login or Signup");
    }

   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.userId || decoded._id;

    if (!userId) {
      throw new Error("Invalid token structure");
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User Not Found");
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).send("ERROR : " + err.message);
  }
};

module.exports = {
  userAuth,
};
