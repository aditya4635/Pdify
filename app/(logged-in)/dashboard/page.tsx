import SummaryCard from "@/components/summaryPage/summary-Card";
import { Button } from "@/components/ui/button";
import BgGradient from "@/components/ui/home/bg-gradient";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";

import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const uploadLimit = 5;
  const user = await currentUser();
  const userId = user?.id;
  if (!user?.id) {
    return redirect("/sign-in");
  }
  const summaries = await getSummaries(userId);
  return (
    <main className="min-h-screen">
      <BgGradient />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="flex flex-row justify-around mt-5">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl text-gray-900 dark:text-gray-100">Your Summaries</h1>
            <p className="text-gray-700 dark:text-gray-300">Transform your PDF into concise, actionable insights</p>
          </div>
          <div>
            <Button
              variant={"link"}
              className="bg-gradient-to-r from-primary to-purple-700 hover:from-purple-600 hover:to-purple-800 hover:scale-105 transition-all duration-300 group hover:no-underline"
            >
              <Link href="/upload" className="flex items-center text-white">
                <Plus className="w-5 h-5 mr-2"></Plus>
                New Summary
              </Link>
            </Button>
          </div>
        </div>
        <div className="mb-6">
          <div className="glass-card rounded-lg p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {" "}
              You've reached the limit of your {uploadLimit} summaries for basic
              plan{" "}
              <Link
                href="/#pricing"
                className="text-primary underline font-medium underline-offset-4 inline-flex items-center hover:text-primary/80"
              >
                Click here to upgrade to Pro{" "}
                <ArrowRight className="w-4 h4 inline-block" />{" "}
              </Link>{" "}
              for unlimited uploads
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
          {summaries.map((summary, index) => (
            <SummaryCard key={index} summary={summary} />
          ))}
        </div>
      </div>
    </main>
  );
}
