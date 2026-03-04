import React from 'react';

export function SummarySkeleton() {
  return (
    <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-2xl relative h-full p-4 sm:p-6 animate-pulse">
      <div className="absolute top-2 right-2 w-8 h-8 bg-muted rounded" />
      
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex item-start gap-2 sm:gap-4">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/20 rounded mt-1" />
          <div className="flex-1 min-w-0 space-y-2">
            <div className="h-5 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/4" />
          </div>
        </div>
        
        <div className="space-y-2 pl-2">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-5/6" />
        </div>
        
        <div className="flex justify-between item-center mt-2 sm:mt-4">
          <div className="h-6 bg-muted rounded-full w-24" />
        </div>
      </div>
    </div>
  );
}
