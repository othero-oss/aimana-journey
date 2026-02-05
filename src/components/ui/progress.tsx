/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA DESIGN SYSTEM - Progress Component
 * ═══════════════════════════════════════════════════════════════════════════
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const progressVariants = cva('w-full overflow-hidden rounded-full bg-surface-light', {
  variants: {
    size: {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const progressFillVariants = cva(
  'h-full rounded-full transition-all duration-500 ease-out',
  {
    variants: {
      variant: {
        default: 'bg-aimana-teal',
        primary: 'bg-aimana-teal',
        secondary: 'bg-aimana-blue',
        navy: 'bg-aimana-navy',
        success: 'bg-status-success',
        warning: 'bg-status-warning',
        error: 'bg-status-error',
        // Journey gradient (Navy -> Blue -> Teal)
        journey: 'bg-gradient-journey',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressFillVariants> {
  /** Current value (0-100) */
  value?: number;
  /** Maximum value */
  max?: number;
  /** Show percentage label */
  showLabel?: boolean;
  /** Custom label */
  label?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      size,
      variant,
      showLabel,
      label,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div className="w-full">
        {(showLabel || label) && (
          <div className="mb-1.5 flex items-center justify-between text-sm">
            {label && <span className="text-text-secondary">{label}</span>}
            {showLabel && (
              <span className="font-medium text-text">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          className={cn(progressVariants({ size }), className)}
          {...props}
        >
          <div
            className={cn(progressFillVariants({ variant }))}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);
Progress.displayName = 'Progress';

// Journey Progress - Shows progress through the 3 phases
interface JourneyProgressProps extends Omit<ProgressProps, 'variant'> {
  /** Current phase: 1 = Plan, 2 = Execute, 3 = Manage */
  currentPhase?: 1 | 2 | 3;
}

const JourneyProgress = React.forwardRef<HTMLDivElement, JourneyProgressProps>(
  ({ currentPhase = 1, value, className, ...props }, ref) => {
    // Calculate progress based on phase
    const phaseProgress = value ?? ((currentPhase - 1) / 2) * 100;

    return (
      <div className="w-full">
        <Progress
          ref={ref}
          value={phaseProgress}
          variant="journey"
          className={className}
          {...props}
        />
        <div className="mt-2 flex justify-between text-xs">
          <span
            className={cn(
              'font-medium',
              currentPhase >= 1 ? 'text-aimana-navy' : 'text-text-muted'
            )}
          >
            Planejar
          </span>
          <span
            className={cn(
              'font-medium',
              currentPhase >= 2 ? 'text-aimana-blue' : 'text-text-muted'
            )}
          >
            Executar
          </span>
          <span
            className={cn(
              'font-medium',
              currentPhase >= 3 ? 'text-aimana-teal' : 'text-text-muted'
            )}
          >
            Gerir
          </span>
        </div>
      </div>
    );
  }
);
JourneyProgress.displayName = 'JourneyProgress';

export { Progress, JourneyProgress, progressVariants, progressFillVariants };
