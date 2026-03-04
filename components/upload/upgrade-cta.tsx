"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { PLANS } from "@/lib/constants";
import { UserPlan } from "@/types";
import { cn } from "@/lib/utils";

interface UpgradeCTAProps {
  plan: UserPlan;
  summariesUsed: number;
  limit: number;
}

export default function UpgradeCTA({ plan, summariesUsed, limit }: UpgradeCTAProps) {
  const paidPlans = PLANS.filter((p) => Number(p.price.replace("$", "")) > 0);

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-10 text-center mt-12 px-4"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="flex items-center justify-center h-20 w-20 rounded-full bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
        >
          <Lock className="h-9 w-9 text-gray-500 dark:text-gray-400" />
        </motion.div>

        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            You&apos;ve used your {plan === "free" ? "free" : ""} summary
            {limit > 1 ? "ies" : ""}
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            You&apos;ve used{" "}
            <span className="font-bold text-gray-900 dark:text-gray-100">
              {summariesUsed}/{limit === Infinity ? "∞" : limit}
            </span>{" "}
            summary on your{" "}
            <span className="capitalize font-semibold">{plan}</span> plan.
            Upgrade to keep summarising.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        {paidPlans.map((p, i) => {
          const isPro = p.name.toLowerCase() === "pro";
          return (
            <motion.div
              key={p.name}
              className={cn(
                "relative rounded-3xl border p-7 flex flex-col gap-4 text-left",
                isPro
                  ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-2xl"
                  : "bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-zinc-800 shadow-sm"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1, ease: "easeOut", duration: 0.45 }}
              whileHover={{ y: -5, transition: { type: "spring", stiffness: 260, damping: 20 } }}
            >
              {isPro && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-black text-black dark:text-white text-xs font-bold px-4 py-1 rounded-full border border-gray-200 dark:border-zinc-800 shadow">
                  Most Popular
                </span>
              )}
              <div className="flex items-center gap-2">
                {isPro ? (
                  <Zap className="h-5 w-5" />
                ) : (
                  <Sparkles className="h-5 w-5 text-gray-500" />
                )}
                <span className="text-xl font-extrabold capitalize">{p.name}</span>
              </div>
              <ul className={cn("text-sm space-y-1 mb-2", isPro ? "text-gray-300 dark:text-gray-600" : "text-gray-500 dark:text-gray-400")}>
                {p.features.slice(0, 2).map((f, fi) => (
                  <li key={fi}>• {f}</li>
                ))}
              </ul>
              <p className="text-4xl font-extrabold tracking-tight">
                ${p.price}
                <span className={cn("text-sm font-normal ml-1", isPro ? "text-gray-300 dark:text-gray-600" : "text-gray-500 dark:text-gray-400")}>
                  /month
                </span>
              </p>
              <Link
                href={p.paymentLink || "/#pricing"}
                className={cn(
                  "mt-auto w-full rounded-xl py-3 font-bold flex items-center justify-center gap-2 transition-colors",
                  isPro
                    ? "bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-900"
                    : "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-700"
                )}
              >
                Upgrade to {p.name} <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
