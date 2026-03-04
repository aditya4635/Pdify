"use client";

import { Sparkles, CheckCircle2 } from "lucide-react";
import { Summary } from "@/types";
import { CardShell, CardHeader, CardBody } from "./card-primitives";

function extractKeyPoints(summary: Summary): { points: string[]; description: string } {
  if (summary.card_data?.card2) {
    return {
      points: summary.card_data.card2.keyPoints || [],
      description: summary.card_data.card2.description || "Key Takeaways",
    };
  }
  return {
    points: (summary.summary_text || "").split(". ").filter((s) => s.length > 20).slice(0, 5),
    description: "Key Takeaways",
  };
}

export default function Card2({ summary }: { summary: Summary }) {
  const { points, description } = extractKeyPoints(summary);

  return (
    <CardShell>
      <CardHeader icon={<Sparkles className="w-5 h-5" />} title="Key Points" subtitle={description} />
      <CardBody>
        {points.length > 0 ? (
          <div className="space-y-3">
            {points.map((point, i) => (
              <div
                key={i}
                className="group flex items-start gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/8 border border-white/8 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-white/50 mt-0.5 shrink-0 group-hover:text-white/80 transition-colors" />
                <p className="text-sm text-white/75 leading-relaxed group-hover:text-white/95 transition-colors">
                  {point}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-white/30 text-sm">
            No key points extracted.
          </div>
        )}
      </CardBody>
    </CardShell>
  );
}
