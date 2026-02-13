import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export default function LoadingScreen({
  loadingText,
  className,
}: {
  loadingText: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-dvh w-dvw flex-col items-center justify-center gap-4 bg-slate-950 sm:gap-7",
        className,
      )}
    >
      <h1 className="text-center font-sans text-4xl text-cyan-300 sm:text-6xl">
        {loadingText}
      </h1>
      <Spinner className="size-8 text-cyan-300 sm:size-16" />
    </div>
  );
}
