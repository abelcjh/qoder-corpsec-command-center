import { cn } from '../../lib/utils';
import { TextareaHTMLAttributes, forwardRef } from 'react';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'w-full rounded-lg border border-brand-border bg-brand-surface px-3 py-2 text-sm text-brand-text placeholder:text-brand-muted focus:border-crimson-500 focus:outline-none focus:ring-1 focus:ring-crimson-500 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px] resize-y',
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';
