"use client";

import { ExternalLink, Download, ArrowLeft, Info } from "lucide-react";
import Link from "next/link";
import { Summary } from "@/types";
import { CardShell, CardHeader, CardBody } from "./card-primitives";
import DeleteButton from "./delete-button";

function extractCard4Data(summary: Summary) {
  if (summary.card_data?.card4) {
    const { metadata = [], keyTerms = [], bottomLine = "Summary completed." } = summary.card_data.card4;
    return { metadata, keyTerms, bottomLine };
  }
  return {
    metadata: [
      { label: "File", value: summary.file_name || "Unknown Document" },
      { label: "Created", value: new Date(summary.created_at).toLocaleDateString() },
    ],
    keyTerms: [],
    bottomLine: "Summary completed.",
  };
}

function ActionButton({ href, icon, label, download }: { href: string; icon: React.ReactNode; label: string; download?: boolean }) {
  return (
    <Link href={href} target="_blank" download={download} className="contents">
      <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/8 hover:bg-white/14 border border-white/10 text-white/75 hover:text-white text-sm font-medium transition-all">
        {icon}
        {label}
      </button>
    </Link>
  );
}

export default function Card4({ summary }: { summary: Summary }) {
  const { metadata, keyTerms, bottomLine } = extractCard4Data(summary);

  return (
    <CardShell>
      <CardHeader icon={<Info className="w-5 h-5" />} title="Document Info" subtitle="Metadata & Actions" />
      <CardBody>
        {metadata.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-5">
            {metadata.map((item, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/8">
                <p className="text-xs text-white/40 uppercase tracking-wide mb-0.5">{item.label}</p>
                <p className="text-sm text-white font-medium truncate" title={item.value}>{item.value}</p>
              </div>
            ))}
          </div>
        )}

        {keyTerms.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/35">Key Terms</p>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50">{keyTerms.length}</span>
            </div>
            <div className="space-y-2">
              {keyTerms.map((term, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/8 text-sm">
                  <span className="font-semibold text-white/90">{term.term}: </span>
                  <span className="text-white/55">{term.definition}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 rounded-2xl bg-white/5 border border-white/8 mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-1.5">The Bottom Line</p>
          <p className="text-sm text-white/70 italic leading-relaxed">"{bottomLine}"</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <ActionButton href={summary.original_file_url} icon={<ExternalLink className="w-4 h-4" />} label="View PDF" />
          <ActionButton href={summary.original_file_url} icon={<Download className="w-4 h-4" />} label="Download" download />
          <Link href="/dashboard" className="contents">
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/8 hover:bg-white/14 border border-white/10 text-white/75 hover:text-white text-sm font-medium transition-all">
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </button>
          </Link>
          <DeleteButton summaryId={summary.id} />
        </div>
      </CardBody>
    </CardShell>
  );
}
