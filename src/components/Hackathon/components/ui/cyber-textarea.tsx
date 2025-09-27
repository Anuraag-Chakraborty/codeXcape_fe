import * as React from "react";
import { cn } from "@/lib/utils";

export interface CyberTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const CyberTextarea = React.forwardRef<HTMLTextAreaElement, CyberTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "cyber-input flex min-h-[100px] w-full rounded-md px-3 py-2 text-sm",
          "disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

CyberTextarea.displayName = "CyberTextarea";

export { CyberTextarea };