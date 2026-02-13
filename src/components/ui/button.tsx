/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA DESIGN SYSTEM - Button Component
 * ═══════════════════════════════════════════════════════════════════════════
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  // Base styles
  `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg
   text-sm font-medium transition-all duration-200 ease-out
   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aimana-teal focus-visible:ring-offset-2
   disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        // Primary - Teal background (main CTA)
        primary: `
          bg-aimana-teal text-aimana-navy
          hover:bg-aimana-teal-light hover:shadow-teal-glow
          active:bg-aimana-teal
        `,
        // Secondary - Navy background
        secondary: `
          bg-aimana-navy text-white
          hover:bg-aimana-navy-light
          active:bg-aimana-navy
        `,
        // Outline - Border only
        outline: `
          border border-white/15 bg-transparent text-slate-200
          hover:border-aimana-teal hover:text-aimana-teal
          active:bg-white/5
        `,
        // Ghost - No background
        ghost: `
          bg-transparent text-slate-400
          hover:bg-white/5 hover:text-white
          active:bg-white/10
        `,
        // Destructive - Error/danger actions
        destructive: `
          bg-status-error text-white
          hover:bg-red-600
          active:bg-red-700
        `,
        // Link - Text only, looks like a link
        link: `
          bg-transparent text-aimana-teal underline-offset-4
          hover:underline hover:text-aimana-teal-light
        `,
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Shows a loading spinner and disables the button */
  isLoading?: boolean;
  /** Icon to show before the button text */
  leftIcon?: React.ReactNode;
  /** Icon to show after the button text */
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && !isLoading ? (
          <span className="shrink-0">{rightIcon}</span>
        ) : null}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
