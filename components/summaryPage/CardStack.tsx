"use client";

import { createPortal } from "react-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Summary } from "@/types";
import { useCardNavigation } from "./use-card-navigation";

const SLIDE_VARIANTS = {
  enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d < 0 ? "100%" : "-100%", opacity: 0 }),
};

const TAB_LABELS = ["Overview", "Key Points", "Deep Dive", "Actions"];

interface CardStackProps {
  summary: Summary;
  children: React.ReactNode[];
}

function NavArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous" : "Next"}
      className="absolute top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all hover:scale-110 disabled:opacity-20 disabled:pointer-events-none"
      style={{ [direction === "left" ? "left" : "right"]: 0 }}
    >
      {direction === "left" ? (
        <ChevronLeft className="w-5 h-5" />
      ) : (
        <ChevronRight className="w-5 h-5" />
      )}
    </button>
  );
}

export default function CardStack({ children }: CardStackProps) {
  const router = useRouter();
  const [mounted] = useState(() => typeof window !== "undefined");
  const total = children.length;

  const { idx, dir, go, jumpTo, onDragEnd, isLast } = useCardNavigation({
    total,
    onClose: () => router.push("/dashboard"),
  });

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex flex-col bg-black/75 backdrop-blur-2xl"
      onClick={(e) => {
        if (e.target === e.currentTarget) router.push("/dashboard");
      }}
    >
      <div className="shrink-0 flex items-center justify-between px-4 sm:px-8 py-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {TAB_LABELS.slice(0, total).map((label, i) => (
            <button
              key={i}
              onClick={() => jumpTo(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                i === idx
                  ? "bg-white text-black shadow-lg"
                  : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-4">
          <span className="text-sm text-white/50 font-mono select-none">
            {idx + 1} / {total}
          </span>
          <button
            onClick={() => router.push("/dashboard")}
            aria-label="Close"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 transition-all hover:scale-110"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 relative px-4 sm:px-10 pb-2">
        <AnimatePresence initial={false} custom={dir} mode="wait">
          <motion.div
            key={idx}
            custom={dir}
            variants={SLIDE_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 380, damping: 38, mass: 0.8 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={onDragEnd}
            className="absolute inset-x-4 sm:inset-x-10 top-0 bottom-0 cursor-grab active:cursor-grabbing"
          >
            {children[idx]}
          </motion.div>
        </AnimatePresence>

        <NavArrow direction="left" disabled={idx === 0} onClick={() => go(-1)} />
        <NavArrow direction="right" disabled={isLast} onClick={() => go(1)} />
      </div>

      <div className="shrink-0 flex justify-center items-center gap-2.5 py-5">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => jumpTo(i)}
            aria-label={`Go to card ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === idx ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </motion.div>,
    document.body
  );
}
