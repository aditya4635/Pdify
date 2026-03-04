import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getUserPlanInfo } from "@/lib/user";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async () => {
      const user = await currentUser();
      if (!user) throw new UploadThingError("Unauthorised");

      const planInfo = await getUserPlanInfo(user.id);
      if (planInfo.isOverLimit) {
        throw new UploadThingError(
          `Upload limit reached. You have used ${planInfo.summariesUsed}/${planInfo.limit} summaries on the ${planInfo.plan} plan.`
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