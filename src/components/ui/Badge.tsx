import { cn } from '../../lib/utils';
import { HTMLAttributes } from 'react';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'muted';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = 'default', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        {
          'bg-ink-800 text-brand-text': variant === 'default',
          'bg-emerald-900/50 text-emerald-400': variant === 'success',
          'bg-amber-900/50 text-amber-400': variant === 'warning',
          'bg-crimson-900/50 text-crimson-400': variant === 'danger',
          'bg-sky-900/50 text-sky-400': variant === 'info',
          'bg-ink-800 text-brand-muted': variant === 'muted',
        },
        className
      )}
      {...props}
    />
  );
}
