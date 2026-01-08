import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'veg' | 'non-veg' | 'jain' | 'success' | 'warning' | 'error' | 'info';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'info', children, ...props }, ref) => {
    const variants = {
      veg: 'bg-green-100 text-green-800 border border-green-500 dark:bg-green-900 dark:text-green-200',
      'non-veg': 'bg-red-100 text-red-800 border border-red-500 dark:bg-red-900 dark:text-red-200',
      jain: 'bg-purple-100 text-purple-800 border border-purple-500 dark:bg-purple-900 dark:text-purple-200',
      success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
          variants[variant],
          className
        )}
        {...props}
      >
        {(variant === 'veg' || variant === 'non-veg' || variant === 'jain') && (
          <span className="mr-1">
            <span className={cn(
              'inline-block w-2 h-2 border',
              variant === 'veg' && 'border-green-600 bg-green-600',
              variant === 'non-veg' && 'border-red-600 bg-red-600',
              variant === 'jain' && 'border-purple-600 bg-purple-600'
            )} />
          </span>
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
