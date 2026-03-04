import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getUserPlanInfo } from "@/lib/user";

const f = createUploadthing();

export const ourFileRouter = {
  // Set the absolute cap to 32MB, and gate stricter limits in the middleware
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async ({ files }) => {
      const user = await currentUser();
      if (!user) throw new UploadThingError("Unauthorised");

      const planInfo = await getUserPlanInfo(user.id);
      
      // Check Plan Limit usage
      if (planInfo.isOverLimit) {
        throw new UploadThingError(
          `Upload limit reached. You have used ${planInfo.summariesUsed}/${planInfo.limit} summaries on the ${planInfo.plan} plan.`
        );
      }

      // Check Plan File Size Limits
      const maxBytes = planInfo.maxFileSizeMB * 1024 * 1024;
      const file = files[0];
      if (file && file.size > maxBytes) {
        throw new UploadThingError(
          `File exceeds the ${planInfo.maxFileSizeMB}MB limit for your ${planInfo.plan} plan.`
        );
      }

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => ({
      userId: metadata.userId,
      file: { url: file.url, name: file.name },
    })),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;