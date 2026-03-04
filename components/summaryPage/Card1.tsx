"use client";

import { formatDistanceToNow } from "date-fns";
import { FileText, Clock, CircleDot } from "lucide-react";
import { Summary } from "@/types";
import { formatFileName } from "@/lib/utils";
import { CardShell, CardHeader, CardBody } from "./card-primitives";

function extractCard1Data(summary: Summary) {
  const fallbackTitle = summary.title || formatFileName(summary.original_file_url);
  const fallbackOverview = (summary.summary_text || "")
    .split(". ")
    .slice(0, 3)
    .join(". ");

  if (!summary.card_data?.card1) {
    return { title: fallbackTitle, subtitle: "", overview: fallbackOverview, metadata: [], status: summary.status || "completed" };
  }

  const sections = summary.card_data.card1.sections || [];
  const find = (type: string) => sections.find((s) => s.type === type);

  const metaSection = find("metadata");
  const metadata = metaSection?.items || [];
  const statusItem = metadata.find((m) => m.label === "Status");

  return {
    title: find("title")?.content || fallbackTitle,
    subtitle: find("subtitle")?.content || "",
    overview: find("overview")?.content || fallbackOverview,
    metadata,
    status: statusItem?.value || summary.status || "completed",
  };
}

export default function Card1({ summary }: { summary: Summary }) {
  const { title, subtitle, overview, metadata, status } = extractCard1Data(summary);
  const timeAgo = formatDistanceToNow(new Date(summary.created_at), { addSuffix: true });
  const visibleMeta = metadata.filter((m) => m.label !== "Status");

  return (
    <CardShell>
      <CardHeader
        icon={<FileText className="w-5 h-5" />}
        title={title}
        subtitle={subtitle || formatFileName(summary.original_file_url)}
      />
      <CardBody>
        <div className="flex items-center gap-4 mt-4 mb-5 text-xs text-white/40">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {timeAgo}
          </span>
          <span className="flex items-center gap-1.5">
            <CircleDot className="w-3.5 h-3.5" />
            <span className="capitalize">{status}</span>
          </span>
        </div>

        {overview && (
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-2">Overview</p>
            <p className="text-base text-white/80 leading-relaxed">{overview}</p>
          </div>
        )}

        {visibleMeta.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-4">
            {visibleMeta.map((item, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/8">
                <p className="text-xs text-white/40 uppercase tracking-wide mb-0.5">{item.label}</p>
                <p className="text-sm text-white font-medium truncate" title={item.value}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </CardShell>
  );
}
