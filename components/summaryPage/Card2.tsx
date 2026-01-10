"use client";

import { Card } from "../ui/card";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface Card2Props {
  summary: any;
}

export default function Card2({ summary }: Card2Props) {
  // Check if we have structured card data
  const hasCardData = summary.card_data?.card2;
  
  let keyPoints: string[] = [];
  let description = "Main points extracted from your document";

  if (hasCardData) {
    const card2 = summary.card_data.card2;
    keyPoints = card2.keyPoints || [];
    if (card2.description) description = card2.description;
  } else {
    // Fallback: Try to extract key points from the summary
    const summaryText = summary.summary_text || "";
    const sentences = summaryText.split(/[.!?]+/).filter((s: string) => s.trim().length > 20);
    
    // Get 4-6 key points from the middle section
    keyPoints = sentences.slice(3, 9).map((s: string) => s.trim());
  }
  
  return (
    <Card className="h-full max-h-[85vh] p-8 flex flex-col justify-between border-2 border-white/10 shadow-2xl overflow-hidden">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-10 h-10 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Key Takeaways
          </h2>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {description}
        </p>

        {/* Key Points List */}
        <div className="space-y-4 max-h-[45vh] overflow-y-auto pr-2">
          {keyPoints.map((point: string, index: number) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-lg bg-white/50 dark:bg-white/5 border border-white/10 hover:border-primary/50 transition-colors"
            >
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Card Number */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-semibold">
          2
        </div>
      </div>
    </Card>
  );
}
