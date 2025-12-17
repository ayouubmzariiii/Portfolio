import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
          "h-12 px-8 py-2 uppercase tracking-wide font-display clip-path-slant",
          {
            "bg-primary text-black hover:shadow-[0_0_20px_rgba(204,255,0,0.6)] hover:-translate-y-1": variant === 'primary',
            "bg-white text-black hover:bg-gray-200 hover:-translate-y-1": variant === 'secondary',
            "border-2 border-primary text-primary hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(204,255,0,0.3)]": variant === 'outline',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
export { Button };
