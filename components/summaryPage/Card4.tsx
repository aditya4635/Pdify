"use client";

import { Card } from "../ui/card";
import { ExternalLink, Download, ArrowLeft, Info } from "lucide-react";
import { Button } from "../ui/button";
import DeleteButton from "./delete-button";
import Link from "next/link";
import { Summary } from "@/types";

interface Card4Props {
  summary: Summary;
}

export default function Card4({ summary }: Card4Props) {
  // Check if we have structured card data
  const hasCardData = !!summary.card_data?.card4;
  
  let metadata: Array<{ label: string; value: string }> = [];
  let keyTerms: Array<{ term: string; definition: string }> = [];
  let bottomLine = "Summary completed.";

  if (hasCardData && summary.card_data?.card4) {
    const card4 = summary.card_data.card4;
    metadata = card4.metadata || [];
    keyTerms = card4.keyTerms || [];
    if (card4.bottomLine) bottomLine = card4.bottomLine;
  } else {
    // Fallback
    metadata = [
      { label: "File", value: summary.file_name || "Unknown Document" },
      { label: "Created", value: new Date(summary.created_at).toLocaleDateString() }
    ];
  }

  return (
    <Card className="h-full max-h-[85vh] p-8 flex flex-col justify-between border-none shadow-none bg-white dark:bg-zinc-950 overflow-hidden rounded-[2rem]">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Info className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Doument Info</span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
           {metadata.map((item, idx) => (
             <div key={idx} className="flex flex-col">
               <span className="text-xs text-gray-500 uppercase">{item.label}</span>
               <span className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate" title={item.value}>{item.value}</span>
             </div>
           ))}
        </div>
        
        {/* Key Terms */}
        {keyTerms.length > 0 && (
            <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    Key Terms
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 font-normal">{keyTerms.length}</span>
                </h4>
                <div className="grid grid-cols-1 gap-2 max-h-[150px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {keyTerms.map((term, idx) => (
                        <div key={idx} className="text-sm p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                            <span className="font-semibold text-gray-900 dark:text-gray-100">{term.term}: </span>
                            <span className="text-gray-600 dark:text-gray-400">{term.definition}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>

      {/* Bottom Line & Actions */}
      <div className="space-y-6 mt-6">
        {/* Bottom Line */}
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800">
            <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase mb-1">The Bottom Line</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                "{bottomLine}"
            </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Link href={summary.original_file_url} target="_blank" className="w-full">
            <Button variant="outline" className="w-full gap-2 h-12 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
              <ExternalLink className="w-4 h-4" />
              View PDF
            </Button>
          </Link>
          
          <Link href={summary.original_file_url} download target="_blank" className="w-full">
            <Button variant="outline" className="w-full gap-2 h-12 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
              <Download className="w-4 h-4" />
              Download
            </Button>
          </Link>

          <div className="col-span-2 grid grid-cols-2 gap-3">
             <Link href="/dashboard" className="w-full">
                <Button variant="secondary" className="w-full gap-2 h-12">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
             </Link>
             
             <div className="w-full">
                 <DeleteButton summaryId={summary.id} />
             </div>
          </div>
        </div>
      </div>

      {/* Card Number */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 font-semibold">
          4
        </div>
      </div>
    </Card>
  );
}
