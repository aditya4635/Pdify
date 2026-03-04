"use client";

import React, { useRef, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUploadThing } from "@/utils/upload.thing";
import { generatePdfSummary, storePdfSummary } from "@/actions/upload-actions";
import UploadFormInput from "./upload-form-input";

const fileSchema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((f) => f.size <= 24 * 1024 * 1024, "File must be under 24 MB")
    .refine((f) => f.type === "application/pdf", "Only PDF files are supported"),
});

export default function UploadForm() {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      toast.dismiss("upload");
      toast.success("File uploaded.");
    },
    onUploadError: (err) => {
      toast.dismiss("upload");
      const isLimitError = err.message?.toLowerCase().includes("limit");
      toast.error(isLimitError ? "Plan limit reached. Please upgrade." : "Upload failed. Please try again.");
    },
    onUploadBegin: () => {
      toast.loading("Uploading — our AI is reading your PDF…", { id: "upload" });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const file = new FormData(e.currentTarget).get("file") as File;
      const validated = fileSchema.safeParse({ file });

      if (!validated.success) {
        toast.error(validated.error.errors[0].message);
        return;
      }

      const uploaded = await startUpload([file]);
      if (!uploaded?.length) {
        toast.error("Upload failed. Please try again.");
        return;
      }

      const summaryResult = await generatePdfSummary(
        uploaded.map((r) => ({ serverData: r.serverData }))
      );

      if (!summaryResult.data?.summary) {
        toast.error(summaryResult.error ?? "Failed to generate summary. Please try again.");
        return;
      }

      toast.loading("Saving summary…", { id: "save" });

      const storeResult = await storePdfSummary({
        fileUrl: uploaded[0].serverData.file.url,
        summary: summaryResult.data.summary,
        title: summaryResult.data.title,
        fileName: file.name,
        cardData: summaryResult.data.cardData,
      });

      toast.dismiss("save");

      if (!storeResult.success) {
        if ("code" in storeResult && storeResult.code === "LIMIT_REACHED") {
          toast.error(storeResult.message ?? "Plan limit reached.");
          router.refresh();
        } else {
          toast.error(storeResult.message ?? "Failed to save summary.");
        }
        return;
      }

      toast.success("Summary saved!");
      formRef.current?.reset();
      router.push(`/summaries/${storeResult.data!.id}`);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
      <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit} />
    </div>
  );
}