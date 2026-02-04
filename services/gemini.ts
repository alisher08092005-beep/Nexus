
import { GoogleGenAI, Type } from "@google/genai";
import { MarketingStrategy } from "../types";

export const generateMarketingStrategy = async (
  businessName: string,
  niche: string,
  goals: string
): Promise<MarketingStrategy | null> => {
  if (!process.env.API_KEY) {
    console.error("Gemini API Key is missing. Please check your environment variables.");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Generate a comprehensive 4-week digital marketing strategy for a business named "${businessName}" in the "${niche}" industry with the goal of "${goals}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            targetAudience: { type: Type.STRING },
            recommendedChannels: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            suggestedTagline: { type: Type.STRING },
            weeklyRoadmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  week: { type: Type.INTEGER },
                  tasks: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING } 
                  }
                },
                required: ["week", "tasks"]
              }
            },
            projectedOutcome: { type: Type.STRING }
          },
          required: ["targetAudience", "recommendedChannels", "suggestedTagline", "weeklyRoadmap", "projectedOutcome"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;

    return JSON.parse(text.trim()) as MarketingStrategy;
  } catch (error) {
    console.error("Strategy generation failed:", error);
    return null;
  }
};
