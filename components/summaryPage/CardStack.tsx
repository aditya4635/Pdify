"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface CardStackProps {
  summary: any;
  children: React.ReactNode[];
}

export default function CardStack({ summary, children }: CardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const totalCards = children.length;

  // Ensure component is mounted (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 300);
    
    return () => {
      document.body.style.overflow = "auto";
      clearTimeout(timer);
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < totalCards) {
      setDirection(newDirection);
      setCurrentIndex(newIndex);
    }
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 50;

    if (info.offset.x > swipeThreshold && info.velocity.x > 0) {
      paginate(-1);
    } else if (info.offset.x < -swipeThreshold && info.velocity.x < 0) {
      paginate(1);
    }
  };

  const handleClose = () => {
    router.push("/dashboard");
  };

  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1200 : -1200,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1200 : -1200,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  // Don't render until mounted (prevents SSR issues)
  if (!mounted) return null;

  const modalContent = (
    <>
      {isLoading ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white text-lg">Loading summary...</p>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-lg overflow-hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={handleClose}
            className="absolute top-4 right-4 z-[10000] p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all hover:scale-110"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>

          {/* Card Container */}
          <div className="relative w-full max-w-2xl mx-4 h-[85vh] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                  rotateY: { duration: 0.4 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: 1.05, cursor: "grabbing" }}
                className="absolute w-full cursor-grab active:cursor-grabbing"
                style={{ perspective: 1000 }}
              >
                {children[currentIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 md:px-8 pointer-events-none"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => paginate(-1)}
              disabled={currentIndex === 0}
              className="pointer-events-auto bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/25 disabled:opacity-20 hover:scale-125 transition-all disabled:hover:scale-100 shadow-xl"
            >
              <ChevronLeft className="w-7 h-7 text-white" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => paginate(1)}
              disabled={currentIndex === totalCards - 1}
              className="pointer-events-auto bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/25 disabled:opacity-20 hover:scale-125 transition-all disabled:hover:scale-100 shadow-xl"
            >
              <ChevronRight className="w-7 h-7 text-white" />
            </Button>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-2xl"
          >
            {Array.from({ length: totalCards }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-10 bg-primary shadow-lg shadow-primary/50"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </motion.div>

          {/* Card Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium bg-black/30 backdrop-blur-sm px-4 py-1 rounded-full"
          >
            {currentIndex + 1} / {totalCards}
          </motion.div>

          {/* Swipe Hint */}
          {currentIndex === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute top-8 left-1/2 -translate-x-1/2 text-white/70 text-sm flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full"
            >
              <motion.div
                animate={{ x: [-10, 0, -10] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.div>
              <span>Drag or use arrows to navigate</span>
              <motion.div
                animate={{ x: [10, 0, 10] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </>
  );

  // Render modal using portal to document.body
  return createPortal(modalContent, document.body);
}
