import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import {GoogleGenerativeAI} from "@google/generative-ai";


const genAI =new GoogleGenerativeAI( process.env.GEMINI_API_KEY || '');

export const generateSummaryFromGemini = async (pdfText: string)=> { 
try{
const model =genAI.getGenerativeModel({ model:
"gemini-2.0-flash-exp", generationConfig: {
    temperature:0.7,
    maxOutputTokens: 4000,
},});

const prompt = {contents: [{role:'user', parts:[{text:SUMMARY_SYSTEM_PROMPT },
    {text: `Transform this document into a structured JSON summary with 4 cards: \n\n${pdfText}`}]}]};

const result= await model.generateContent(prompt);
const response= await result.response;

if(!response.text()){
    throw new Error('empty response from GEMINI API')
}

let responseText = response.text().trim();

// Remove markdown code blocks if present
if (responseText.startsWith('```json')) {
    responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?$/g, '').trim();
} else if (responseText.startsWith('```')) {
    responseText = responseText.replace(/```\n?/g, '').trim();
}

// Parse the JSON response
let parsedData;
try {
    parsedData = JSON.parse(responseText);
} catch (parseError) {
    console.error('Failed to parse JSON from Gemini:', parseError);
    console.error('Raw response:', responseText);
    throw new Error('Gemini returned invalid JSON format');
}

// Validate the structure
if (!parsedData.card1 || !parsedData.card2 || !parsedData.card3 || !parsedData.card4) {
    console.error('Missing required cards in response:', parsedData);
    throw new Error('Gemini response missing required card data');
}

// Return both the structured card data and backward-compatible text
return {
    cardData: {
        card1: parsedData.card1,
        card2: parsedData.card2,
        card3: parsedData.card3,
        card4: parsedData.card4,
    },
    summaryText: parsedData.summaryText || responseText,
};

}catch (error: any) {

   console.error('Gemini API Error:', error);
throw error;
 }
};