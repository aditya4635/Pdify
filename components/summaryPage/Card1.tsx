"use client";

import { Card } from "../ui/card";
import { FileText, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { formatFileName } from "@/lib/utils";
import { motion } from "framer-motion";

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.3, type: "spring" }}
      className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${
        status === "completed"
          ? "bg-green-300 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      }`}
    >
      {status}
    </motion.span>
  );
};

interface Card1Props {
  summary: any;
}

export default function Card1({ summary }: Card1Props) {
  // Check if we have structured card data
  const hasCardData = summary.card_data?.card1;
  
  // Use structured data if available
  let title = summary.title || formatFileName(summary.original_file_url);
  let subtitle = "";
  let overview = "";
  let metadata: any[] = [];
  let status = summary.status || "completed";

  if (hasCardData) {
    const card1 = summary.card_data.card1;
    const sections = card1.sections || [];
    
    // Extract title section
    const titleSection = sections.find((s: any) => s.type === "title");
    if (titleSection) title = titleSection.content;
    
    // Extract subtitle
    const subtitleSection = sections.find((s: any) => s.type === "subtitle");
    if (subtitleSection) subtitle = subtitleSection.content;
    
    // Extract overview
    const overviewSection = sections.find((s: any) => s.type === "overview");
    if (overviewSection) overview = overviewSection.content;
    
    // Extract metadata
    const metadataSection = sections.find((s: any) => s.type === "metadata");
    if (metadataSection) {
      metadata = metadataSection.items || [];
      const statusItem = metadata.find((m: any) => m.label === "Status");
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
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-start gap-4 mb-6"
        >
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <FileText className="w-12 h-12 text-primary flex-shrink-0" />
          </motion.div>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                {subtitle}
              </p>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>
                {formatDistanceToNow(new Date(summary.created_at), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Metadata items */}
        {metadata.length > 0 && (
          <div className="mb-6 space-y-2">
            {metadata.filter((m: any) => m.label !== "Status").map((item: any, idx: number) => (
              <div key={idx} className="text-sm">
                <span className="text-gray-600 dark:text-gray-400">{item.label}: </span>
                <span className="text-gray-800 dark:text-gray-200 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Status Badge */}
        <div className="mb-6">
          <StatusBadge status={status} />
        </div>

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-primary/10 to-purple-700/10 rounded-lg p-6 border border-white/10"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Overview
          </h3>
          <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
            {overview}
          </p>
        </motion.div>
      </div>

      {/* Card Number */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        className="mt-6 text-center"
      >
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-semibold">
          1
        </div>
      </motion.div>
    </Card>
  );
}
