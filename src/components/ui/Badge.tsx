import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Badge = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold transition-colors text-white/80 hover:border-primary/50 hover:text-primary hover:bg-primary/5 cursor-default",
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";
export { Badge };
