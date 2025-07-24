require('dotenv').config();
const OpenAI = require("openai");

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

module.exports = AI;
