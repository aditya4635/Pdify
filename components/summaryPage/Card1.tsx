"use client";

import { Card } from "../ui/card";
import { cn, formatFileName } from "@/lib/utils";
import { formatDistanceToNow} from 'date-fns';
import { FileText } from "lucide-react";
import { Summary } from "@/types";

const SummaryHeader = ({
  fileUrl,
  title,
  createdAt,
}: {
  fileUrl: string;
  title: string | null;
  createdAt: string;
}) => {
  return (
    <div className="flex item-start gap-2 sm:gap-4">
      <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-primary mt-1" />
      <div className="flex-1 min-w-0">
        <h3 className="text-base xl:text-lg font-semibold text-gray-900 dark:text-gray-200 truncate w-4/5">
          {title || formatFileName(fileUrl)}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{formatDistanceToNow(new Date(createdAt),{addSuffix:true})}</p>
      </div>
    </div>
  );
};


interface Card1Props {
  summary: Summary;
}

export default function Card1({ summary }: Card1Props) {
  // Check if we have structured card data
  const hasCardData = !!summary.card_data?.card1;
  
  // Use structured data if available
  let title = summary.title || formatFileName(summary.original_file_url);
  let subtitle = "";
  let overview = "";
  
  let metadata: Array<{ label: string; value: string }> = [];
  let status = summary.status || "completed";

  if (hasCardData && summary.card_data?.card1) {
    const card1 = summary.card_data.card1;
    const sections = card1.sections || [];
    
    // Extract title section
    const titleSection = sections.find((s) => s.type === "title");
    if (titleSection?.content) title = titleSection.content;
    
    // Extract subtitle
    const subtitleSection = sections.find((s) => s.type === "subtitle");
    if (subtitleSection?.content) subtitle = subtitleSection.content;
    
    // Extract overview
    const overviewSection = sections.find((s) => s.type === "overview");
    if (overviewSection?.content) overview = overviewSection.content;
    
    // Extract metadata
    const metadataSection = sections.find((s) => s.type === "metadata");
    if (metadataSection) {
      metadata = metadataSection.items || [];
      const statusItem = metadata.find((m) => m.label === "Status");
      if (statusItem) status = statusItem.value;
    }
  } else {
    // Fallback: Split summary into first part (overview)
    const summaryText = summary.summary_text || "";
    const sentences = summaryText.split(". ");
    overview = sentences.slice(0, 3).join(". ") + (sentences.length > 3 ? "." : "");
  }

  return (
    <Card className="h-full max-h-[85vh] p-8 flex flex-col justify-between border-2 border-white/10 shadow-2xl backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="space-y-6">
        <SummaryHeader 
          fileUrl={summary.original_file_url}
          title={title}
          createdAt={summary.created_at}
        />
        
        {subtitle && (
          <p className="text-sm font-medium text-primary/80 uppercase tracking-wider">
            {subtitle}
          </p>
        )}
      </div>

      {/* Main Content - Overview */}
      <div className="flex-1 overflow-y-auto my-6 pr-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
        <div className="prose dark:prose-invert max-w-none">
          <h4 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Overview
          </h4>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            {overview}
          </p>
        </div>
      </div>

      {/* Footer / Metadata */}
      <div>
        {/* Metadata items */}
        {metadata.length > 0 && (
          <div className="mb-6 space-y-2">
            
            {metadata.filter((m) => m.label !== "Status").map((item, idx: number) => (
              <div key={idx} className="text-sm">
                <span className="text-gray-600 dark:text-gray-400">{item.label}: </span>
                <span className="text-gray-800 dark:text-gray-200 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        )}


      
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Status</span>
            <span className={cn(
              "text-sm font-medium mt-1",
              status.toLowerCase() === 'completed' ? "text-green-600 dark:text-green-400" : "text-yellow-600 dark:text-yellow-400"
            )}>
              {status}
            </span>
          </div>
          <div className="text-right">
             <span className="text-xs text-gray-400">Swipe for details →</span>
          </div>
        </div>
      </div>

      {/* Card Number */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-semibold">
          1
        </div>
      </div>
    </Card>
  );
}
