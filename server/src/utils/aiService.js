const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * @param {string} prompt - The user's message
 * @param {string} systemInstruction - The "persona" or context for the AI
 */
const generateResponse = async (prompt, systemInstruction) => {
  try {
    const fullPrompt = `${systemInstruction}\n\nUser Query: ${prompt}`;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini AI Error:", error);
    throw new Error("Failed to generate AI response");
  }
};

module.exports = { generateResponse };