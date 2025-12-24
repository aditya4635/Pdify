"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PageLoader } from './ui/page-loader';

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsNavigating(true);
    const timeout = setTimeout(() => setIsNavigating(false), 300);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {isNavigating && <PageLoader />}
      {children}
    </>
  );
}
