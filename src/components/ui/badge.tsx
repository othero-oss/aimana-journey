/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA DESIGN SYSTEM - Badge Component
 * ═══════════════════════════════════════════════════════════════════════════
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  // Base styles
  'inline-flex items-center rounded-full border font-medium transition-colors',
  {
    variants: {
      variant: {
        // Default - Neutral
        default: 'border-surface-border bg-surface-light text-text-secondary',

        // Phase variants (Journey stages)
        plan: 'border-phase-plan-border bg-phase-plan-bg text-phase-plan',
        execute: 'border-phase-execute-border bg-phase-execute-bg text-aimana-navy',
        manage: 'border-phase-manage-border bg-phase-manage-bg text-phase-manage',

        // Status variants
        success: 'border-transparent bg-status-success-bg text-status-success',
        warning: 'border-transparent bg-status-warning-bg text-status-warning',
        error: 'border-transparent bg-status-error-bg text-status-error',
        pending: 'border-transparent bg-status-pending-bg text-status-pending',
        info: 'border-transparent bg-status-info-bg text-status-info',

        // Brand variants
        primary: 'border-transparent bg-aimana-teal/10 text-aimana-teal',
        secondary: 'border-transparent bg-aimana-blue/10 text-aimana-blue',
        navy: 'border-transparent bg-aimana-navy text-white',

        // Outline variants
        outline: 'border-surface-border bg-transparent text-text',
        'outline-primary': 'border-aimana-teal bg-transparent text-aimana-teal',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** Optional icon to show before the badge text */
  icon?: React.ReactNode;
  /** If true, shows a dot indicator instead of icon */
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, icon, dot, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'mr-1.5 h-1.5 w-1.5 rounded-full',
              variant === 'success' && 'bg-status-success',
              variant === 'warning' && 'bg-status-warning',
              variant === 'error' && 'bg-status-error',
              variant === 'pending' && 'bg-status-pending',
              variant === 'info' && 'bg-status-info',
              variant === 'plan' && 'bg-phase-plan',
              variant === 'execute' && 'bg-phase-execute',
              variant === 'manage' && 'bg-phase-manage',
              variant === 'primary' && 'bg-aimana-teal',
              variant === 'secondary' && 'bg-aimana-blue',
              !variant && 'bg-text-muted'
            )}
          />
        )}
        {icon && !dot && <span className="mr-1">{icon}</span>}
        {children}
      </div>
    );
  }
);
Badge.displayName = 'Badge';

// Pre-styled phase badges for convenience
const PhaseBadge = React.forwardRef<
  HTMLDivElement,
  Omit<BadgeProps, 'variant'> & { phase: 'plan' | 'execute' | 'manage' }
>(({ phase, children, ...props }, ref) => {
  const labels = {
    plan: 'Planejar',
    execute: 'Executar',
    manage: 'Gerir',
  };

  return (
    <Badge ref={ref} variant={phase} {...props}>
      {children || labels[phase]}
    </Badge>
  );
});
PhaseBadge.displayName = 'PhaseBadge';

// Pre-styled status badges for convenience
const StatusBadge = React.forwardRef<
  HTMLDivElement,
  Omit<BadgeProps, 'variant'> & {
    status: 'success' | 'warning' | 'error' | 'pending' | 'info';
  }
>(({ status, dot = true, children, ...props }, ref) => {
  const labels = {
    success: 'Sucesso',
    warning: 'Atenção',
    error: 'Erro',
    pending: 'Pendente',
    info: 'Info',
  };

  return (
    <Badge ref={ref} variant={status} dot={dot} {...props}>
      {children || labels[status]}
    </Badge>
  );
});
StatusBadge.displayName = 'StatusBadge';

export { Badge, PhaseBadge, StatusBadge, badgeVariants };
