import { cn } from "@/lib/utils";

interface CardShellProps {
  children: React.ReactNode;
}

export function CardShell({ children }: CardShellProps) {
  return (
    <div className="h-full flex flex-col border border-white/10 shadow-2xl bg-zinc-900/95 rounded-3xl overflow-hidden">
      {children}
    </div>
  );
}

interface CardHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export function CardHeader({ icon, title, subtitle }: CardHeaderProps) {
  return (
    <div className="shrink-0 flex items-center gap-4 px-6 pt-6 pb-4 border-b border-white/8">
      <div className="p-2.5 rounded-xl bg-white/10 text-white shrink-0">{icon}</div>
      <div className="min-w-0">
        <h3 className="text-lg font-bold text-white leading-tight">{title}</h3>
        <p className="text-sm text-white/50 truncate">{subtitle}</p>
      </div>
    </div>
  );
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function CardBody({ children, className }: CardBodyProps) {
  return (
    <div
      className={cn(
        "flex-1 min-h-0 overflow-y-auto px-6 pb-6 pt-4",
        "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
        className
      )}
    >
      {children}
    </div>
  );
}
