"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon, Zap } from "lucide-react";
import { PLANS, type PriceType } from "@/lib/constants";

const FreePricingCard = ({ name, description, features, paymentLink }: PriceType) => (
  <motion.div
    className="relative w-full max-w-sm"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut", delay: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    whileHover={{ y: -8, transition: { type: "spring", stiffness: 260, damping: 20 } }}
  >
    <div className="flex flex-col h-full bg-gray-50 dark:bg-zinc-900 rounded-[2rem] p-8 border-2 border-dashed border-gray-300 dark:border-zinc-700 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl capitalize font-extrabold text-gray-900 dark:text-white">
          {name}
        </span>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300">
          FREE
        </span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 h-10 mb-6">{description}</p>

      <div className="flex gap-2 mb-8">
        <p className="text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">$0</p>
        <div className="flex flex-col justify-end mb-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">forever</p>
        </div>
      </div>

      <ul className="space-y-4 flex-1 mb-8">
        {features.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
            <CheckIcon size={20} className="text-gray-900 dark:text-white shrink-0 mt-0.5" />
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>

      <Link
        href={paymentLink || "/sign-up"}
        className="w-full rounded-xl flex items-center justify-center gap-2 font-bold py-4 transition-colors bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600"
      >
        Start Free <ArrowRight size={18} />
      </Link>
    </div>
  </motion.div>
);

const PricingCard = ({ name, price, description, features, paymentLink }: PriceType) => {
  const isPro = name.toLowerCase() === "pro";

  return (
    <motion.div
      className="relative w-full max-w-sm"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: isPro ? 0.15 : 0.07 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 260, damping: 20 } }}
    >
      <div
        className={cn(
          "flex flex-col h-full bg-white dark:bg-zinc-950 rounded-[2rem] p-8 border border-gray-200 dark:border-zinc-800",
          isPro ? "shadow-xl ring-2 ring-black dark:ring-white scale-105" : "shadow-sm"
        )}
      >
        {isPro && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
            <Zap size={12} /> Most Popular
          </div>
        )}

        <div className="flex flex-col gap-2 mb-6">
          <p className="text-xl capitalize font-extrabold text-gray-900 dark:text-white">{name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 h-10">{description}</p>
        </div>

        <div className="flex gap-2 mb-8">
          <p className="text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">${price}</p>
          <div className="flex flex-col justify-end mb-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">/month</p>
          </div>
        </div>

        <ul className="space-y-4 flex-1 mb-8">
          {features.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
              <CheckIcon size={20} className="text-gray-900 dark:text-white shrink-0 mt-0.5" />
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-center w-full mt-auto">
          <Link
            href={paymentLink || "/"}
            className={cn(
              "w-full rounded-xl flex items-center justify-center gap-2 font-bold py-4 transition-colors",
              isPro
                ? "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
            )}
          >
            Buy Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Pricing = () => {
  return (
    <section
      className="relative overflow-hidden bg-white dark:bg-zinc-950 py-16 lg:py-24"
      id="pricing"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center justify-center w-full pb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Start free. Upgrade when you need more.
          </p>
        </motion.div>

        <div className="relative flex flex-col lg:flex-row justify-center items-stretch gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan) =>
            plan.price === "$0" ? (
              <FreePricingCard key={plan.name} {...plan} />
            ) : (
              <PricingCard key={plan.name} {...plan} />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
