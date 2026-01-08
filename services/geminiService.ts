
import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch {
    return '';
  }
};

export const getTenderInsight = async (tenderDetails: string) => {
  const apiKey = getApiKey();
  if (!apiKey) return "AI services are currently offline. Check your configuration.";
  
  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following tender details and provide a professional 3-sentence summary including key risks or opportunities. Format as a single paragraph. Details: ${tenderDetails}`,
    });
    return response.text || "Insight analysis complete, but no content returned.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI advisor. Please try again later.";
  }
};

export const getFinancialHealthSummary = async (transactions: any[]) => {
  const apiKey = getApiKey();
  if (!apiKey) return "Financial analysis module unavailable.";

  const ai = new GoogleGenAI({ apiKey });
  try {
    const dataStr = JSON.stringify(transactions);
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze these recent transactions and provide a short summary of financial health and one actionable budget tip: ${dataStr}`,
    });
    return response.text || "Financial insight currently unavailable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating health summary.";
  }
};
