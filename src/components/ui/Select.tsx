import { cn } from '../../lib/utils';
import { SelectHTMLAttributes, forwardRef } from 'react';

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        'w-full appearance-none rounded-lg border border-brand-border bg-brand-surface px-3 py-2 text-sm text-brand-text focus:border-crimson-500 focus:outline-none focus:ring-1 focus:ring-crimson-500 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = 'Select';
