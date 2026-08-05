import { cn } from '../../lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-crimson-500 focus:ring-offset-2 focus:ring-offset-brand-bg disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-crimson-600 text-white hover:bg-crimson-700': variant === 'primary',
            'border border-brand-border bg-brand-surface text-brand-text hover:bg-ink-700': variant === 'secondary',
            'text-brand-muted hover:bg-brand-surface hover:text-brand-text': variant === 'ghost',
            'bg-crimson-950/50 text-crimson-400 border border-crimson-800 hover:bg-crimson-900/50': variant === 'danger',
            'px-3 py-1.5 text-xs': size === 'sm',
            'px-3 py-2 text-sm': size === 'md',
            'px-4 py-2.5 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
