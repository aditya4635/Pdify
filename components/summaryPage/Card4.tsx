"use client";

import { Card } from "../ui/card";
import { ExternalLink, Download, Trash2, ArrowLeft, Info } from "lucide-react";
import { Button } from "../ui/button";
import DeleteButton from "./delete-button";
import Link from "next/link";

interface Card4Props {
  summary: any;
}

export default function Card4({ summary }: Card4Props) {
  // Check if we have structured card data
  const hasCardData = summary.card_data?.card4;
  
  let metadata: any = {};
  let keyTerms: any[] = [];
  let bottomLine = "";

  if (hasCardData) {
    const card4 = summary.card_data.card4;
    metadata = card4.metadata || {};
    keyTerms = card4.keyTerms || [];
    bottomLine = card4.bottomLine || "";
  }

  return (
    <Card className="h-full max-h-[85vh] p-8 flex flex-col justify-between border-2 border-white/10 shadow-2xl overflow-hidden">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Document Actions
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Access your original PDF or manage this summary
        </p>

        {/* File Info */}
        {summary.file_name && (
          <div className="mb-6 p-4 rounded-lg bg-white/50 dark:bg-white/5 border border-white/10">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              File Name
            </p>
            <p className="font-mono text-sm text-gray-900 dark:text-gray-200">
              {summary.file_name}
            </p>
          </div>
        )}

        {/* Document Metadata */}
        {Object.keys(metadata).length > 0 && (
          <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Document Info</h3>
            </div>
            <div className="space-y-2">
              {Object.entries(metadata).map(([key, value]: [string, any]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Terms */}
        {keyTerms.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Key Terms</h3>
            <div className="space-y-3">
              {keyTerms.map((term: any, idx: number) => (
                <div key={idx} className="p-3 rounded-lg bg-white/50 dark:bg-white/5 border border-white/10">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{term.term}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{term.definition}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Line */}
        {bottomLine && (
          <div className="mb-6 p-4 rounded-lg bg-gradient-to-br from-primary/10 to-purple-700/10 border border-primary/20">
            <p className="text-xs font-semibold text-primary mb-2">💡 BOTTOM LINE</p>
            <p className="text-gray-900 dark:text-gray-100 font-medium">{bottomLine}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* View PDF */}
          <Button
            variant="outline"
            className="w-full justify-start text-left h-auto p-4 border-primary/50 hover:bg-primary/10 hover:border-primary transition-all group"
            asChild
          >
            <a
              href={summary.original_file_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  View Original PDF
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Open in new tab
                </p>
              </div>
            </a>
          </Button>

          {/* Download PDF */}
          <Button
            variant="outline"
            className="w-full justify-start text-left h-auto p-4 border-primary/50 hover:bg-primary/10 hover:border-primary transition-all group"
            asChild
          >
            <a href={summary.original_file_url} download>
              <Download className="w-5 h-5 mr-3 group-hover:translate-y-0.5 transition-transform" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  Download PDF
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Save to your device
                </p>
              </div>
            </a>
          </Button>

          {/* Delete Summary */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30">
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  Delete Summary
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This action cannot be undone
                </p>
              </div>
              <DeleteButton summaryId={summary.id} />
            </div>
          </div>
        </div>
      </div>

      {/* Back to Dashboard */}
      <div className="mt-8">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            className="w-full hover:bg-white/10 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Card Number */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-semibold">
            4
          </div>
        </div>
      </div>
    </Card>
  );
}
