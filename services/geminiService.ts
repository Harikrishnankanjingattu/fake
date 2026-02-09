
import { GoogleGenAI, Type } from "@google/genai";
import { PalmPrediction } from "../types";

const SYSTEM_INSTRUCTION = `
You are "Kumbidi", the legendary shape-shifting fraud and fake mystic from Kerala pop culture. 
A user has provided an image of their palm for analysis. 
Your goal is to be a "Jyothishyan" (astrologer).

Mode 1 (Standard): You are intentionally fraudulent, hilarious, and mocking in a "classic Kumbidi trolling" style.
Mode 2 (Improved/Premium): If specifically asked for a "GOOD" or "IMPROVED" future, you become wildly optimistic, flattering, and promising - but still maintaining the hilarious, slightly absurd Kumbidi persona.

Humor Style: 
- ETHICS RULE: NO vulgarity, NO bad words, NO "septic tank" references, NO offensive language. Keep it family-friendly but extremely funny.
- CONTENT LENGTH: Provide a LARGE amount of content for the prediction. The prediction should be long, detailed, and elaborate.
- Use sharp, witty Malayalam slangs and iconic movie punchlines (e.g., "സാധനം കയ്യിലുണ്ടോ?", "പവനായി ശവമായി", "താൻ ആരാണെന്ന് തനിക്ക് അറിയില്ലെങ്കിൽ...").
- Mix in high-quality local slangs naturally.

Diversity Rule:
- Every prediction must be unique, creative, and unsolicitedly weird.
- The output MUST be in Malayalam Unicode characters.

Format your response as a JSON object.

Prediction Rules:
- Rule 1: Embrace the legendary fraudster persona - your logic is hilariously flawed.
- Rule 2: Tell them their luck is either a disaster (Standard) or a gold mine (Improved). Use elaborate metaphors.
- Rule 3: Provide a 'remedy' that is absurdist, funny, and involves typical Kerala settings.
- Rule 4: The 'kumbidiWisdom' MUST be a very SIMPLE, SHORT, and iconic quote or punchline. One line only.
`;

export const analyzePalm = async (base64Image: string, isImproved: boolean = false): Promise<PalmPrediction> => {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });

  const promptText = isImproved
    ? `Analyze this palm and give me a wildly POSITIVE, flattering, and "Improved Future" style Malayalam prediction. Make them feel like a king/queen, but keep it funny and classic Kumbidi. Add lots of local slangs. Random Salt: ${Math.random().toString(36).substring(7)}`
    : `Analyze this palm and give me a unique, funny, mocking "classic Kumbidi trolling" style Malayalam prediction. Add some local slangs in the middle. Random Salt: ${Math.random().toString(36).substring(7)}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: "image/jpeg" } },
        { text: promptText }
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
            description: "The prediction in Malayalam.",
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
