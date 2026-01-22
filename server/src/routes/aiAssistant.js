const express = require("express");
const jwt = require("jsonwebtoken");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios"); 
const User = require("../models/user");
const router = express.Router();


const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error("MISSING API KEY: Add GEMINI_API_KEY to your .env file");
}

const genAI = new GoogleGenerativeAI(API_KEY);


async function getWorkingModelName() {
  try {
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );
    const models = response.data.models;
    const viableModel = models.find(m => 
      m.name.includes("gemini") && 
      m.supportedGenerationMethods.includes("generateContent")
    );
    return viableModel ? viableModel.name.replace("models/", "") : "gemini-pro";
  } catch (err) {
    return "gemini-pro";
  }
}

router.post("/ai-assistant", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message required" });

    
    let userContext = "User: Guest";
    try {
      const token = req.cookies?.token;
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId || decoded._id;
        const user = await User.findById(userId);
        if (user) {
          userContext = `User Profile:\n- Name: ${user.firstName} ${user.lastName}\n- Skills: ${user.skills?.join(", ") || "None listed"}\n- Bio: ${user.about || "No bio"}`;
        }
      }
    } catch (e) { /* Ignore token errors */ }

    // 2. Dynamic Model Selection
    const modelName = await getWorkingModelName();
    const model = genAI.getGenerativeModel({ model: modelName });

    // 3. THE FINAL SKILLSYNC PROMPT 
    const systemPrompt = `You are "CodeMate", the official AI Architect for the SkillSync platform.
    
    ABOUT SKILLSYNC:
    SkillSync is a premier network for developers to connect, collaborate, and grow. 
    It features intelligent skill-based matching, real-time chat, and professional portfolio showcases.
    
    CURRENT USER CONTEXT:
    ${userContext}
    
    YOUR GUIDELINES:
    1. **Identity:** You are witty, professional, and technically sharp. You are a Senior Developer Mentor.
    2. **Platform:** Always refer to this platform as "SkillSync". Never mention "Tinder" or other apps.
    3. **Actionable Advice:** If the user asks for help, use their specific skills (listed above) to give tailored advice.
    4. **Brevity:** Keep responses concise (max 3-4 sentences) unless a detailed technical explanation is requested.
    5. **Mission:** Encourage the user to update their projects and connect with others on SkillSync.`;

    const finalPrompt = `${systemPrompt}\n\nUser Question: ${message}`;

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    
    res.json({ reply: response.text() });

  } catch (err) {
    console.error("AI FAILURE:", err.message);
    res.status(500).json({ 
      error: "AI Error", 
      reply: "I am currently compiling. Please check the backend console." 
    });
  }
});

module.exports = router;