const dotenv = require('dotenv');
dotenv.config();

let groqInstance = null;

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_groq_api_key_here') {
    return null;
  }
  
  if (!groqInstance) {
    try {
      const { Groq } = require('groq-sdk');
      groqInstance = new Groq({ apiKey });
    } catch (err) {
      console.warn('⚠️ Groq SDK initialization warning:', err.message);
      return null;
    }
  }
  return groqInstance;
}

/**
 * Executes a chat completion via Groq (Llama 3.3 70B),
 * or returns null if no key is configured, allowing fallback heuristics.
 */
async function callGroq({ messages, model = 'llama-3.3-70b-versatile', temperature = 0.2, jsonMode = false }) {
  const client = getGroqClient();
  if (!client) {
    return null;
  }

  try {
    const params = {
      messages,
      model,
      temperature,
    };
    if (jsonMode) {
      params.response_format = { type: 'json_object' };
    }
    const response = await client.chat.completions.create(params);
    return response.choices?.[0]?.message?.content || null;
  } catch (error) {
    console.error('❌ Groq API Error, falling back to local reasoning:', error.message);
    return null;
  }
}

module.exports = {
  getGroqClient,
  callGroq
};
