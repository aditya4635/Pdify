import BgGradient from "@/components/ui/home/bg-gradient";
import UploadHeader from "@/components/upload/upload-header";
import UploadForm from "@/components/upload/upload-form";
import UpgradeCTA from "@/components/upload/upgrade-cta";
import { getUserPlanInfo } from "@/lib/user";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

// ─── Upload Page — server-gated by plan usage ─────────────────────────────────

export default async function UploadPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const planInfo = await getUserPlanInfo(userId);

  return (
    <section className="min-h-screen bg-white dark:bg-zinc-950">
      <BgGradient />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <UploadHeader />

          {planInfo.isOverLimit ? (
            <UpgradeCTA
              plan={planInfo.plan}
              summariesUsed={planInfo.summariesUsed}
              limit={planInfo.limit}
            />
          ) : (
            <>
              {/* Usage indicator badge */}
              <p className="mt-4 mb-8 text-sm text-gray-500 dark:text-gray-400 font-medium">
                {planInfo.plan === "pro"
                  ? "Pro plan · Unlimited summaries"
                  : `${planInfo.plan.charAt(0).toUpperCase() + planInfo.plan.slice(1)} plan · ${planInfo.summariesUsed} / ${planInfo.limit} summar${planInfo.limit === 1 ? "y" : "ies"} used`}
                {" · "}
                <span className="text-zinc-400">{planInfo.maxFileSizeMB}MB max file size</span>
              </p>
              <UploadForm maxFileSizeMB={planInfo.maxFileSizeMB} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
