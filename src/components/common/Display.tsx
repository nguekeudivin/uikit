import { forwardRef } from "react";

interface DisplayProps {
  cond: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Display = forwardRef<HTMLDivElement, DisplayProps>(
  ({ cond, children, className }, ref) => {
    if (!cond) return null;

    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }
);

Display.displayName = "Display";
