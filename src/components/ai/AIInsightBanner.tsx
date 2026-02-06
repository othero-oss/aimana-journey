import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Info,
  X,
  ChevronRight,
  Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Insight {
  id: string;
  type: 'positive' | 'warning' | 'info' | 'suggestion';
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface AIInsightBannerProps {
  insights: Insight[];
  onDismiss?: (id: string) => void;
  onDismissAll?: () => void;
  className?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const insightConfig = {
  positive: {
    icon: TrendingUp,
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    titleColor: 'text-emerald-400'
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    titleColor: 'text-amber-400'
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    titleColor: 'text-blue-400'
  },
  suggestion: {
    icon: Lightbulb,
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    iconColor: 'text-purple-400',
    titleColor: 'text-purple-400'
  }
};

export function AIInsightBanner({
  insights,
  onDismiss,
  onDismissAll,
  className,
  collapsed = false,
  onToggleCollapse
}: AIInsightBannerProps) {
  if (insights.length === 0) return null;

  if (collapsed) {
    return (
      <button
        onClick={onToggleCollapse}
        className={cn(
          'w-full flex items-center justify-between px-4 py-3 rounded-xl',
          'bg-gradient-to-r from-teal-500/10 via-purple-500/10 to-blue-500/10',
          'border border-teal-500/20 hover:border-teal-500/40 transition-all',
          className
        )}
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-teal-500/20 rounded-lg">
            <Sparkles className="h-4 w-4 text-teal-400" />
          </div>
          <span className="text-sm font-medium text-slate-300">
            {insights.length} insight{insights.length > 1 ? 's' : ''} da IA disponível{insights.length > 1 ? 'eis' : ''}
          </span>
        </div>
        <ChevronRight className="h-4 w-4 text-slate-400" />
      </button>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-br from-teal-500/20 to-purple-500/20 rounded-lg">
            <Sparkles className="h-4 w-4 text-teal-400" />
          </div>
          <span className="text-sm font-semibold text-slate-200">Insights da IA</span>
        </div>
        <div className="flex items-center gap-2">
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="text-slate-400 hover:text-white h-7 px-2"
            >
              Minimizar
            </Button>
          )}
          {onDismissAll && insights.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismissAll}
              className="text-slate-400 hover:text-white h-7 px-2"
            >
              Dispensar todos
            </Button>
          )}
        </div>
      </div>

      {/* Insights */}
      <div className="grid gap-2">
        {insights.map((insight) => {
          const config = insightConfig[insight.type];
          const Icon = config.icon;

          return (
            <div
              key={insight.id}
              className={cn(
                'flex items-start gap-3 p-3 rounded-xl border transition-all',
                config.bgColor,
                config.borderColor
              )}
            >
              <div className={cn('p-1.5 rounded-lg', config.bgColor)}>
                <Icon className={cn('h-4 w-4', config.iconColor)} />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className={cn('text-sm font-medium', config.titleColor)}>
                  {insight.title}
                </h4>
                <p className="text-sm text-slate-400 mt-0.5 line-clamp-2">
                  {insight.description}
                </p>

                {insight.action && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={insight.action.onClick}
                    className={cn('mt-2 h-7 px-2', config.titleColor, 'hover:bg-white/5')}
                  >
                    {insight.action.label}
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                )}
              </div>

              {onDismiss && (
                <button
                  onClick={() => onDismiss(insight.id)}
                  className="text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Single insight card for inline usage
interface AIInsightCardProps {
  insight: Insight;
  onDismiss?: () => void;
  className?: string;
}

export function AIInsightCard({ insight, onDismiss, className }: AIInsightCardProps) {
  const config = insightConfig[insight.type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border transition-all',
        config.bgColor,
        config.borderColor,
        className
      )}
    >
      <div className={cn('p-2 rounded-lg', config.bgColor)}>
        <Icon className={cn('h-5 w-5', config.iconColor)} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3 w-3 text-teal-400" />
          <span className="text-xs text-teal-400 font-medium">Insight da IA</span>
        </div>
        <h4 className={cn('text-sm font-medium mt-1', config.titleColor)}>
          {insight.title}
        </h4>
        <p className="text-sm text-slate-400 mt-1">
          {insight.description}
        </p>

        {insight.action && (
          <Button
            variant="outline"
            size="sm"
            onClick={insight.action.onClick}
            className="mt-3"
          >
            {insight.action.label}
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        )}
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-slate-500 hover:text-slate-300 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
