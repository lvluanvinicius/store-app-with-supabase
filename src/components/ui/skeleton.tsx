import { cn } from "@/lib/utils";

type SkeletonProps = {
  /** classes tailwind extras (ex: "w-64 h-6") */
  className?: string;
  /** arredondamento (ex: "rounded-md", "rounded-full") */
  rounded?: string;
  /** liga/desliga o efeito de brilho (shimmer) */
  shimmer?: boolean;
  /** acessibilidade: descreve o que está carregando */
  label?: string;
};

export function Skeleton({
  className,
  rounded = "rounded-md",
  shimmer = true,
  label = "Carregando…",
}: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        "relative overflow-hidden bg-zinc-200/70 dark:bg-zinc-800/70",
        rounded,
        className,
      )}
    >
      {shimmer && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0",
            "-translate-x-full animate-[shimmer_1.2s_infinite]",
            "bg-linear-to-r from-transparent via-white/20 to-transparent",
            "dark:via-white/10",
          )}
        />
      )}
      <span className="sr-only">{label}</span>

      {/* keyframes do shimmer (Tailwind arbitrary) */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
