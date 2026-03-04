import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

function stripMarkdownFences(text: string): string {
  if (text.startsWith("```json")) {
    return text.replace(/```json\n?/g, "").replace(/```\n?$/g, "").trim();
  }
  if (text.startsWith("```")) {
    return text.replace(/```\n?/g, "").trim();
  }
  return text;
}

export async function generateSummaryFromGemini(pdfText: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    generationConfig: { temperature: 0.7, maxOutputTokens: 4000 },
  });

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          { text: SUMMARY_SYSTEM_PROMPT },
          { text: `Transform this document into a structured JSON summary with 4 cards:\n\n${pdfText}` },
        ],
      },
    ],
  });

  const rawText = result.response.text().trim();
  if (!rawText) throw new Error("Empty response from Gemini API");

  const cleaned = stripMarkdownFences(rawText);

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("Gemini returned invalid JSON");
  }

  if (!parsed.card1 || !parsed.card2 || !parsed.card3 || !parsed.card4) {
    throw new Error("Gemini response is missing required card data");
  }

  return {
    cardData: {
      card1: parsed.card1,
      card2: parsed.card2,
      card3: parsed.card3,
      card4: parsed.card4,
    },
    summaryText: (parsed.summaryText as string) || cleaned,
  };
}