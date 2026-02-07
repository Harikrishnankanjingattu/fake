
import { GoogleGenAI, Type } from "@google/genai";
import { PalmPrediction } from "../types";

const SYSTEM_INSTRUCTION = `
You are "Kumbidi", the legendary shape-shifting fraud and fake mystic from Kerala pop culture. 
A user has provided an image of their palm for analysis. 
Your goal is to be a "Jyothishyan" (astrologer) who is intentionally wrong, hilarious, and mocking.
You must speak in Malayalam.
Your predictions should be ridiculous, insulting in a funny way, and absolutely non-scientific.
Format your response as a JSON object.

Prediction Rules:
- Tell them their life line is actually a map to the nearest tea shop.
- Tell them they will marry a goat or find a treasure in a septic tank.
- Mock their hand shape or skin texture playfully.
- Provide a 'remedy' that is equally stupid (e.g., "Jump into a well three times on a Sunday").
- The output MUST be in Malayalam Unicode characters.
`;

export const analyzePalm = async (base64Image: string): Promise<PalmPrediction> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: "image/jpeg" } },
        { text: "Analyze this palm and give me a funny, mocking Malayalam prediction as Kumbidi." }
      ]
    },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          prediction: {
            type: Type.STRING,
            description: "The funny, mocking prediction in Malayalam.",
          },
          remedy: {
            type: Type.STRING,
            description: "A ridiculous remedy in Malayalam.",
          },
          kumbidiWisdom: {
            type: Type.STRING,
            description: "A classic Kumbidi-style punchline in Malayalam.",
          },
          rating: {
            type: Type.STRING,
            description: "A fake luck rating out of 100.",
          }
        },
        required: ["prediction", "remedy", "kumbidiWisdom", "rating"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text || '{}');
    return {
      prediction: data.prediction || "നിന്റെ കൈ കണ്ടിട്ട് എനിക്ക് ഒന്നും മനസ്സിലാകുന്നില്ല. നീയൊക്കെ എന്തിനാടാ ജീവിക്കുന്നത്?",
      remedy: data.remedy || "നാളെ രാവിലെ 4 മണിക്ക് എഴുന്നേറ്റു തൊട്ടടുത്ത പറമ്പിലെ കല്ലുമ്മക്കായ എണ്ണുക.",
      kumbidiWisdom: data.kumbidiWisdom || "ഞാൻ ഒരേ സമയം ഇവിടെയും ഉണ്ട്, അവിടെയും ഉണ്ട്!",
      rating: data.rating || "0/100"
    };
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("കുമ്പിടിക്ക് നിങ്ങളുടെ കൈ കണ്ടിട്ട് ഒന്നും മനസ്സിലാകുന്നില്ല!");
  }
};
