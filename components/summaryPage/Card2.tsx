"use client";

import { Card } from "../ui/card";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { Summary } from "@/types";

interface Card2Props {
  summary: Summary;
}

export default function Card2({ summary }: Card2Props) {
  // Check if we have structured card data
  const hasCardData = !!summary.card_data?.card2;
  
  let keyPoints: string[] = [];
  let description = "Key Takeaways";

  if (hasCardData && summary.card_data?.card2) {
    const card2 = summary.card_data.card2;
    keyPoints = card2.keyPoints || [];
    if (card2.description) description = card2.description;
  } else {
    // Fallback: Extract key points (simple constraint-based heuristic)
    const summaryText = summary.summary_text || "";
    const sentences = summaryText.split(". ").filter((s) => s.length > 20);
    // Grab 3-5 sentences that look like key points
    keyPoints = sentences.slice(0, 5);
  }

  return (
    <Card className="h-full max-h-[85vh] p-8 flex flex-col border-2 border-white/10 shadow-2xl backdrop-blur-sm overflow-hidden bg-gradient-to-br from-white/90 to-white/50 dark:from-gray-900/90 dark:to-gray-900/50">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 shrink-0">
        <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
           <h3 className="text-xl font-bold text-gray-900 dark:text-white">Key Points</h3>
           <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-200 dark:scrollbar-thumb-purple-900">
        {keyPoints.length > 0 ? (
          <div className="space-y-4">
             {keyPoints.map((point, idx) => (
               <div key={idx} className="group flex items-start gap-4 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors border border-transparent hover:border-purple-100 dark:hover:border-purple-800/30">
                 <CheckCircle2 className="w-5 h-5 text-purple-500 mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                 <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                   {point}
                 </p>
               </div>
             ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-500">
             <p>No key points extracted yet.</p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 text-right shrink-0">
         <span className="text-xs text-gray-400">Swipe for more →</span>
      </div>
    </Card>
  );
}
