/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA DESIGN SYSTEM - Input Component
 * ═══════════════════════════════════════════════════════════════════════════
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const inputVariants = cva(
  // Base styles
  `flex w-full rounded-lg border bg-white px-3 text-sm text-text
   transition-all duration-200
   placeholder:text-text-muted
   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aimana-teal/20 focus-visible:border-aimana-teal
   disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-light`,
  {
    variants: {
      variant: {
        default: 'border-surface-border',
        error: 'border-status-error focus-visible:ring-status-error/20 focus-visible:border-status-error',
        success: 'border-status-success focus-visible:ring-status-success/20 focus-visible:border-status-success',
      },
      inputSize: {
        sm: 'h-8 text-xs',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Icon or element to show at the start of the input */
  leftElement?: React.ReactNode;
  /** Icon or element to show at the end of the input */
  rightElement?: React.ReactNode;
  /** Error message to display below the input */
  error?: string;
  /** Helper text to display below the input */
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant,
      inputSize,
      leftElement,
      rightElement,
      error,
      helperText,
      ...props
    },
    ref
  ) => {
    const inputVariant = error ? 'error' : variant;

    return (
      <div className="w-full">
        <div className="relative">
          {leftElement && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-muted">
              {leftElement}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant: inputVariant, inputSize }),
              leftElement && 'pl-10',
              rightElement && 'pr-10',
              className
            )}
            ref={ref}
            {...props}
          />
          {rightElement && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted">
              {rightElement}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p
            className={cn(
              'mt-1.5 text-xs',
              error ? 'text-status-error' : 'text-text-muted'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input, inputVariants };
