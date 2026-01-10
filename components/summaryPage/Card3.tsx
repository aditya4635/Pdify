"use client";

import { Card } from "../ui/card";
import { BookOpen } from "lucide-react";
import { Summary, CardSection } from "@/types";

interface Card3Props {
  summary: Summary;
}

export default function Card3({ summary }: Card3Props) {
  // Check if we have structured card data
  const hasCardData = !!summary.card_data?.card3;
  
  let sections: CardSection[] = [];
  let description = "Detailed insights and analysis";

  if (hasCardData && summary.card_data?.card3) {
    const card3 = summary.card_data.card3;
    sections = card3.sections || [];
    if (card3.description) description = card3.description;
  } else {
    // Fallback: Use full summary
    sections = [{
      type: "full_content",
      heading: "Full Summary",
      content: summary.summary_text
    }];
  }

  return (
    <Card className="h-full max-h-[85vh] p-8 flex flex-col border-2 border-white/10 shadow-2xl backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 shrink-0">
        <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
           <h3 className="text-xl font-bold text-gray-900 dark:text-white">Deep Dive</h3>
           <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-200 dark:scrollbar-thumb-blue-900">
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div key={idx} className="prose dark:prose-invert max-w-none">
              {section.heading && (
                <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  {section.heading}
                </h4>
              )}
              {section.content && (
                <p className="text-gray-800 dark:text-gray-300 text-base leading-relaxed whitespace-pre-wrap mb-4">
                  {section.content}
                </p>
              )}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="space-y-2 ml-4">
                  {section.bullets.map((bullet, bulletIdx) => (
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

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 text-right shrink-0">
          <span className="text-xs text-gray-400">Swipe for actions →</span>
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
