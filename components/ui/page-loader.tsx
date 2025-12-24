"use client";

import React from 'react';
import { LoadingSpinner } from './loading-spinner';

interface PageLoaderProps {
  message?: string;
}

export function PageLoader({ message = 'Loading...' }: PageLoaderProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="glass-card p-8 rounded-2xl flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" variant="primary" />
        <p className="text-sm font-medium text-foreground/80 animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
}
