"use client";

import { Card } from "../ui/card";
import { BookOpen } from "lucide-react";

interface Card3Props {
  summary: any;
}

export default function Card3({ summary }: Card3Props) {
  // Check if we have structured card data
  const hasCardData = summary.card_data?.card3;
  
  let sections: any[] = [];
  let description = "Detailed insights and analysis";

  if (hasCardData) {
    const card3 = summary.card_data.card3;
    sections = card3.sections || [];
    if (card3.description) description = card3.description;
  } else {
    // Fallback: Use full summary text
    sections = [{
      heading: "Full Summary",
      content: summary.summary_text || ""
    }];
  }

  return (
    <Card className="h-full max-h-[85vh] p-8 flex flex-col border-2 border-white/10 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="mb-6 flex-shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-10 h-10 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Deep Dive
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>

      {/* Content - Scrollable with max height */}
      <div className="flex-1 overflow-y-auto pr-2 min-h-0 custom-scrollbar">
        <div className="prose dark:prose-invert max-w-none space-y-6">
          {sections.map((section: any, idx: number) => (
            <div key={idx}>
              {section.heading && (
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {section.heading}
                </h3>
              )}
              {section.content && (
                <p className="text-gray-800 dark:text-gray-300 text-base leading-relaxed whitespace-pre-wrap mb-4">
                  {section.content}
                </p>
              )}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="space-y-2 ml-4">
                  {section.bullets.map((bullet: string, bulletIdx: number) => (
                    <li key={bulletIdx} className="text-gray-800 dark:text-gray-300">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Card Number */}
      <div className="mt-6 pt-4 border-t border-white/10 flex-shrink-0">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-semibold">
            3
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </Card>
  );
}
