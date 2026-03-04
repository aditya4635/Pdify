"use client";

import { useState, useEffect, useCallback } from "react";
import { PanInfo } from "framer-motion";

interface UseCardNavigationOptions {
  total: number;
  onClose: () => void;
}

export function useCardNavigation({ total, onClose }: UseCardNavigationOptions) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(0);

  const go = useCallback(
    (delta: number) => {
      const next = idx + delta;
      if (next < 0 || next >= total) return;
      setDir(delta);
      setIdx(next);
    },
    [idx, total]
  );

  const jumpTo = useCallback(
    (i: number) => {
      setDir(i > idx ? 1 : -1);
      setIdx(i);
    },
    [idx]
  );

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (info.offset.x > 60 && info.velocity.x > 0) go(-1);
      else if (info.offset.x < -60 && info.velocity.x < 0) go(1);
    },
    [go]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return { idx, dir, go, jumpTo, onDragEnd, isFirst: idx === 0, isLast: idx === total - 1 };
}
