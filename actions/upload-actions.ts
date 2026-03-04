"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { getUserPlanInfo, incrementSummaryUsage } from "@/lib/user";
import { getDbConnection } from "@/lib/db";

type UploadedFile = {
  serverData: {
    userId: string;
    file: { url: string; name: string };
  };
};

type StoreSummaryInput = {
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
  cardData?: unknown;
};

async function saveSummaryToDb(userId: string, input: StoreSummaryInput) {
  const sql = await getDbConnection();
  const rows = await sql`
    INSERT INTO pdf_summaries (user_id, original_file_url, summary_text, title, file_name, card_data)
    VALUES (
      ${userId},
      ${input.fileUrl},
      ${input.summary},
      ${input.title},
      ${input.fileName},
      ${input.cardData ? JSON.stringify(input.cardData) : null}
    )
    RETURNING *
  `;
  return rows[0] as { id: string };
}

export async function generatePdfSummary(uploadResponse: UploadedFile[]) {
  if (!uploadResponse?.length) {
    return { success: false, error: "No file provided.", data: null };
  }

  const { serverData: { file: { url: pdfUrl, name: fileName } } } = uploadResponse[0];

  if (!pdfUrl) {
    return { success: false, error: "File URL is missing.", data: null };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    const result = await generateSummaryFromGemini(pdfText);

    return {
      success: true,
      data: {
        title: formatFileNameAsTitle(fileName),
        summary: result.summaryText,
        cardData: result.cardData,
      },
    };
  } catch (error) {
    console.error("Error in generatePdfSummary:", error);
    return { success: false, error: "Failed to process the PDF. Please try again.", data: null };
  }
}

export async function storePdfSummary(input: StoreSummaryInput) {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, message: "Not authenticated." };
  }

  const planInfo = await getUserPlanInfo(userId);
  if (planInfo.isOverLimit) {
    return {
      success: false,
      code: "LIMIT_REACHED" as const,
      message: `You've used all ${planInfo.limit} ${planInfo.limit === 1 ? "summary" : "summaries"} on the ${planInfo.plan} plan. Please upgrade to continue.`,
    };
  }

  try {
    const saved = await saveSummaryToDb(userId, input);
    await incrementSummaryUsage(userId);
    revalidatePath(`/summaries/${saved.id}`);
    revalidatePath("/dashboard");
    return { success: true, data: { id: saved.id } };
  } catch (error) {
    console.error("Error in storePdfSummary:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to save summary.",
    };
  }
}