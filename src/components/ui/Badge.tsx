'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'bestseller' | 'limited' | 'trending' | 'new';
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
      secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive: 'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
      outline: 'text-foreground',
      bestseller: 'border-gold/30 bg-gradient-to-r from-gold/20 to-gold-deep/20 text-gold-soft backdrop-blur-sm',
      limited: 'border-red-500/30 bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-300 backdrop-blur-sm',
      trending: 'border-emerald-500/30 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-300 backdrop-blur-sm',
      new: 'border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 backdrop-blur-sm',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, type BadgeProps };