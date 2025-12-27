import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export const Input = ({
  className,
  type,
  ...props
}: ComponentProps<"input">) => (
  <input
    type={type}
    className={cn(
      "rounded-md border border-neutral-500/60 bg-neutral-900 px-4 py-2 text-sm placeholder:text-neutral-500/70",
      className,
    )}
    {...props}
  />
);
