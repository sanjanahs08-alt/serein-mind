import { GoogleGenAI, Type, Schema } from "@google/genai";
import { MoodType, AIAnalysisResult } from "../types";

const apiKey = process.env.API_KEY;

// Initialize the client only if the key exists to prevent immediate errors on load if missing
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const analyzeMood = async (
  moodValue: MoodType,
  moodLabel: string,
  note: string
): Promise<AIAnalysisResult> => {
  if (!ai) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const moodValueString = MoodType[moodValue];

  const prompt = `
    The user is performing a mental wellness check-in.
    Current Mood Level: ${moodValueString} (on a scale of 1-5, where 1 is Bad and 5 is Great).
    User's Word for their Mood: "${moodLabel}".
    User's Journal Note: "${note}".

    Please act as an empathetic, professional, and calming mental wellness companion.
    1. Validate their feelings in a short, warm sentence.
    2. Provide 3 simple, actionable, and non-medical coping strategies or activities tailored specifically to their current state.
    3. Suggest a calming color hex code that fits the mood.
  `;

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      empatheticMessage: {
        type: Type.STRING,
        description: "A short, warm, empathetic validation of the user's feelings. Max 2 sentences.",
      },
      suggestions: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "3 simple, actionable coping strategies.",
      },
      colorTheme: {
        type: Type.STRING,
        description: "A hex color code representing the vibe of the response (e.g. soothing blue, warm orange).",
      },
    },
    required: ["empatheticMessage", "suggestions", "colorTheme"],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: "You are Serene, a supportive AI wellness coach. Your tone is gentle, non-judgmental, and concise.",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as AIAnalysisResult;

  } catch (error) {
    console.error("Gemini analysis failed:", error);
    // Fallback response in case of error
    return {
      empatheticMessage: "I hear you, and I'm here for you. Take a deep breath.",
      suggestions: [
        "Take three deep breaths, counting to 4 on inhale and 6 on exhale.",
        "Drink a glass of water.",
        "Step away from screens for 5 minutes."
      ],
      colorTheme: "#E2E8F0"
    };
  }
};