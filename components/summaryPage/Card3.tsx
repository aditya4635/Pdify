"use client";

import { BookOpen } from "lucide-react";
import { Summary, CardSection } from "@/types";
import { CardShell, CardHeader, CardBody } from "./card-primitives";

function extractSections(summary: Summary): { sections: CardSection[]; description: string } {
  if (summary.card_data?.card3) {
    return {
      sections: summary.card_data.card3.sections || [],
      description: summary.card_data.card3.description || "Detailed insights and analysis",
    };
  }
  return {
    sections: [{ type: "full_content", heading: "Full Summary", content: summary.summary_text }],
    description: "Detailed insights and analysis",
  };
}

export default function Card3({ summary }: { summary: Summary }) {
  const { sections, description } = extractSections(summary);

  return (
    <CardShell>
      <CardHeader icon={<BookOpen className="w-5 h-5" />} title="Deep Dive" subtitle={description} />
      <CardBody>
        <div className="space-y-6">
          {sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h4 className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-2">
                  {section.heading}
                </h4>
              )}
              {section.content && (
                <p className="text-sm text-white/65 leading-relaxed whitespace-pre-wrap">
                  {section.content}
                </p>
              )}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-2 space-y-1.5">
                  {section.bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-2 text-sm text-white/65">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </CardBody>
    </CardShell>
  );
}
