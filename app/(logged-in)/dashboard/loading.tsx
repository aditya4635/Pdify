import BgGradient from '@/components/ui/home/bg-gradient';
import { SummarySkeleton } from '@/components/summaryPage/summary-skeleton';

export default function DashboardLoading() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-8 mb-8">
          <div className="flex flex-col gap-4">
            <div className="h-10 bg-muted/50 rounded w-64 animate-pulse" />
            <div className="h-5 bg-muted/50 rounded w-96 animate-pulse" />
          </div>
          <div className="h-10 bg-muted/50 rounded-full w-40 animate-pulse" />
        </div>
        
        <div className="mb-6">
          <div className="h-16 bg-muted/50 rounded-lg animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
          {[1, 2, 3].map((i) => (
            <SummarySkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
