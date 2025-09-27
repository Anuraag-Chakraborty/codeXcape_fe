import * as React from "react";
import { cn } from "@/lib/utils";

export interface CyberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const CyberInput = React.forwardRef<HTMLInputElement, CyberInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "cyber-input flex h-12 w-full rounded-md px-3 py-2 text-sm",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

CyberInput.displayName = "CyberInput";

export { CyberInput };