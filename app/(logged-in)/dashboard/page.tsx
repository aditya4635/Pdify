import SummaryCard from "@/components/summaryPage/summary-Card";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/summaries";
import { getUserPlanInfo } from "@/lib/user";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) return redirect("/sign-in");

  const [summaries, planInfo] = await Promise.all([
    getSummaries(userId),
    getUserPlanInfo(userId),
  ]);

  const { plan, summariesUsed, limit, isOverLimit } = planInfo;
  const isUnlimited = limit === Infinity;
  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);
  const usageText = isUnlimited
    ? `${planLabel} plan · Unlimited summaries`
    : `${planLabel} plan · ${summariesUsed} / ${limit} summar${limit === 1 ? "y" : "ies"} used`;

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-8 mb-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl text-gray-900 dark:text-gray-100 font-bold tracking-tight">
              Your Summaries
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              Transform your PDF into concise, actionable insights
            </p>
          </div>
          <Button
            asChild
            className="rounded-full px-6 bg-black hover:bg-black/90 text-white shadow-sm transition-transform hover:scale-105"
          >
            <Link href="/upload" className="flex items-center text-white">
              <Plus className="w-5 h-5 mr-2" />
              New Summary
            </Link>
          </Button>
        </div>

        {/* Plan usage bar */}
        <div className="mb-4">
          <div className="glass-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {usageText}
            </p>
            {isOverLimit && (
              <Link
                href="/#pricing"
                className="text-sm font-bold text-primary underline underline-offset-4 inline-flex items-center hover:text-primary/80 shrink-0"
              >
                Upgrade plan <ArrowRight className="w-4 h-4 ml-1 inline-block" />
              </Link>
            )}
            {!isUnlimited && (
              <div className="w-full sm:max-w-[180px]">
                <div className="h-2 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-2 rounded-full transition-all duration-500 bg-gray-900 dark:bg-white"
                    style={{ width: `${Math.min((summariesUsed / limit) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary cards grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
          {summaries.map((summary, index) => (
            <SummaryCard key={index} summary={summary} />
          ))}
        </div>
      </div>
    </main>
  );
}
