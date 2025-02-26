const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
});

export async function sendMessageToChat(message) {
  try {
    const result = await chatSession.sendMessage(message);
    const refineResponse = (result.response.text()).replace('```json','').replace('```','');
    return refineResponse; 
  } catch (error) {
    console.error("Error sending message:", error);
    throw error; 
  }
}