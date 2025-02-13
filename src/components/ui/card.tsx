import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl h-full w-full bg-white relative shadow",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pb-4", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

interface CardTitleProps {
  label?: string;
  action?: any;
  count?: number;
  className?: string;
  ref: any;
  children?: React.ReactNode;
}
const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
  ({ className, label, children, action, count, ...props }, ref) => (
    <div ref={ref} className={cn("text-2xl", className)} {...props}>
      {label && (
        <div className="justify-between flex items-center">
          <h3 className="text-2xl font-medium">
            {label}
            {count != undefined && (
              <span className="text-muted-foreground text-sm ml-2">
                ({count})
              </span>
            )}
          </h3>
          <div>{action}</div>
        </div>
      )}
      {children && <>{children}</>}
    </div>
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(" p-6 border-t", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
