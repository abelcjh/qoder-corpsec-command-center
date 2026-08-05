import { cn } from '../../lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-lg border border-brand-border bg-brand-surface px-3 py-2 text-sm text-brand-text placeholder:text-brand-muted focus:border-crimson-500 focus:outline-none focus:ring-1 focus:ring-crimson-500 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';
