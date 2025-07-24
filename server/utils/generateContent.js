
const AI = require('../config/ai');

exports.generateContent = async (prompt, length) => {
  const response = await AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: length,
  });

  return response.choices[0].message.content;
};
