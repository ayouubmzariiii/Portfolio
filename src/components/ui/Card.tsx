import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-white/10 bg-card p-6 shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(204,255,0,0.1)]",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";
export { Card };
