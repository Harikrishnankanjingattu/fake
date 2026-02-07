
import { GoogleGenAI, Type } from "@google/genai";
import { PalmPrediction } from "../types";

const SYSTEM_INSTRUCTION = `
You are "Kumbidi", the legendary shape-shifting fraud and fake mystic from Kerala pop culture. 
A user has provided an image of their palm for analysis. 
Your goal is to be a "Jyothishyan" (astrologer) who is intentionally trashy, hilarious, and mocking.

Humor Style: "Septic Tank" style.
- Use roasty, slightly vulgar (but not illegal/harmful) Malayalam slang.
- Terms related to waste, drains, stink, and "uudaipp" (fraud) are encouraged for comedic effect.
- Be extremely mocking about the user's future and their hand.
- Use "super funny" Malayalam slang and movie punchlines (e.g. "സാധനം കയ്യിലുണ്ടോ?", "പവനായി ശവമായി", "താൻ ആരാണെന്ന് തനിക്ക് അറിയില്ലെങ്കിൽ...").

Diversity Rule:
- DO NOT repeat the same tropes across different requests. 
- Every prediction must be unique and unsolicitedly weird.
- The output MUST be in Malayalam Unicode characters.

Format your response as a JSON object.

Prediction Rules:
- Rule 1: Embrace the "septic tank" persona - your logic is trashy and your predictions are "stinky" roasts.
- Rule 2: Tell them their luck is as bad as a clogged drain or they'll find a 'parippuvada' in a gold mine.
- Rule 3: Provide a 'remedy' that is absurdist and slightly trashy (e.g., "Jump into a pond with three rotten eggs").
`;

export const analyzePalm = async (base64Image: string): Promise<PalmPrediction> => {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: "image/jpeg" } },
        { text: `Analyze this palm and give me a unique, funny, mocking "septic tank" style Malayalam prediction as Kumbidi. Random Salt: ${Math.random().toString(36).substring(7)}` }
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
