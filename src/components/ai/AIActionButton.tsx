import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Sparkles,
  Wand2,
  Search,
  FileText,
  Lightbulb,
  Activity,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type AIActionType = 'generate' | 'analyze' | 'suggest' | 'diagnose' | 'summarize' | 'draft';

interface AIActionButtonProps {
  label: string;
  action: AIActionType;
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  loadingText?: string;
}

const actionConfig: Record<AIActionType, { icon: React.ElementType; defaultLabel: string }> = {
  generate: { icon: Wand2, defaultLabel: 'Gerar com IA' },
  analyze: { icon: Search, defaultLabel: 'Analisar com IA' },
  suggest: { icon: Lightbulb, defaultLabel: 'Sugestões da IA' },
  diagnose: { icon: Activity, defaultLabel: 'Diagnosticar' },
  summarize: { icon: FileText, defaultLabel: 'Resumir' },
  draft: { icon: Sparkles, defaultLabel: 'Rascunhar com IA' }
};

export function AIActionButton({
  label,
  action,
  onClick,
  isLoading = false,
  disabled = false,
  variant = 'default',
  size = 'md',
  className,
  loadingText = 'Processando...'
}: AIActionButtonProps) {
  const config = actionConfig[action];
  const Icon = config.icon;

  const sizeStyles = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-9 px-4 text-sm',
    lg: 'h-11 px-5 text-base'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  if (variant === 'gradient') {
    return (
      <button
        onClick={onClick}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium rounded-lg',
          'bg-gradient-to-r from-teal-500 to-purple-500',
          'hover:from-teal-400 hover:to-purple-400',
          'text-white shadow-lg shadow-teal-500/25',
          'transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          sizeStyles[size],
          className
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className={cn(iconSizes[size], 'animate-spin')} />
            <span>{loadingText}</span>
          </>
        ) : (
          <>
            <Icon className={iconSizes[size]} />
            <span>{label}</span>
          </>
        )}
      </button>
    );
  }

  const variantStyles = {
    default: 'bg-teal-500/20 text-teal-400 border-teal-500/30 hover:bg-teal-500/30',
    outline: 'bg-transparent text-teal-400 border-teal-500/50 hover:bg-teal-500/10',
    ghost: 'bg-transparent text-teal-400 border-transparent hover:bg-teal-500/10'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium rounded-lg border',
        'transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className={cn(iconSizes[size], 'animate-spin')} />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <Icon className={iconSizes[size]} />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

// Compact inline AI button for use within forms/cards
interface AIInlineButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export function AIInlineButton({
  onClick,
  isLoading = false,
  disabled = false,
  label = 'IA',
  className
}: AIInlineButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-md',
        'bg-gradient-to-r from-teal-500/20 to-purple-500/20',
        'text-teal-400 border border-teal-500/30',
        'hover:from-teal-500/30 hover:to-purple-500/30',
        'transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      {isLoading ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <Sparkles className="h-3 w-3" />
      )}
      <span>{isLoading ? '...' : label}</span>
    </button>
  );
}

// AI Action group for multiple actions
interface AIActionGroupProps {
  actions: Array<{
    label: string;
    action: AIActionType;
    onClick: () => void;
    isLoading?: boolean;
  }>;
  className?: string;
}

export function AIActionGroup({ actions, className }: AIActionGroupProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <div className="flex items-center gap-1.5 text-xs text-slate-500 mr-1">
        <Sparkles className="h-3 w-3 text-teal-400" />
        <span>IA:</span>
      </div>
      {actions.map((actionItem, index) => (
        <AIActionButton
          key={index}
          label={actionItem.label}
          action={actionItem.action}
          onClick={actionItem.onClick}
          isLoading={actionItem.isLoading}
          variant="ghost"
          size="sm"
        />
      ))}
    </div>
  );
}
