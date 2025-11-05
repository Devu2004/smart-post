require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateCaption(base64ImageFile) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile,
              },
            },
            {
              text: `You are a professional social media AI.
Generate ONE creative caption for this image.
Format must be:
Line 1: Short catchy sentence (max 10 words)
Line 2: 3–5 short hashtags.
No extra words, no numbering, no emojis explanation.`,
            },
          ],
        },
      ],
    });

    let caption = "No caption generated";

    if (response.output && Array.isArray(response.output)) {
      caption = response.output[0]?.content?.[0]?.text || caption;
    } else if (response.text) {
      caption = response.text;
    } else if (response.candidates) {
      caption = response.candidates[0]?.content?.parts?.[0]?.text || caption;
    }

    caption = caption.trim();

    console.log("🧠 Generated Caption:", caption);
    return caption;
  } catch (error) {
    console.error("🚨 AI Caption Error:", error);
    return "Could not generate caption.";
  }
}

module.exports = generateCaption;
