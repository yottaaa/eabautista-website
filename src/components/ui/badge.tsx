import { cn } from "../../lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLDivElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-none border border-border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
        className
      )}
      {...props}
    />
  );
}
