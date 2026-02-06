import * as React from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
  variant?: 'default' | 'pills' | 'underline';
}

interface TabsContentProps {
  value: string;
  activeTab: string;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className, variant = 'default' }: TabsProps) {
  const baseStyles = 'flex gap-1';

  const tabBaseStyles = 'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg';

  const variantStyles = {
    default: {
      container: 'bg-navy-800/50 p-1 rounded-xl',
      tab: {
        active: 'bg-teal-500 text-white shadow-lg',
        inactive: 'text-slate-400 hover:text-white hover:bg-navy-700/50'
      }
    },
    pills: {
      container: 'gap-2',
      tab: {
        active: 'bg-teal-500/20 text-teal-400 border border-teal-500/30',
        inactive: 'text-slate-400 hover:text-white border border-transparent hover:border-slate-700'
      }
    },
    underline: {
      container: 'border-b border-navy-700 gap-0',
      tab: {
        active: 'text-teal-400 border-b-2 border-teal-400 rounded-none -mb-[1px]',
        inactive: 'text-slate-400 hover:text-white border-b-2 border-transparent rounded-none -mb-[1px]'
      }
    }
  };

  const currentVariant = variantStyles[variant];

  return (
    <div className={cn(baseStyles, currentVariant.container, className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            tabBaseStyles,
            activeTab === tab.id ? currentVariant.tab.active : currentVariant.tab.inactive
          )}
        >
          {tab.icon}
          <span>{tab.label}</span>
          {tab.badge !== undefined && (
            <span className={cn(
              'ml-1 px-2 py-0.5 text-xs rounded-full',
              activeTab === tab.id
                ? 'bg-white/20 text-white'
                : 'bg-navy-700 text-slate-400'
            )}>
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export function TabsContent({ value, activeTab, children, className }: TabsContentProps) {
  if (value !== activeTab) return null;

  return (
    <div className={cn('animate-in fade-in-50 duration-200', className)}>
      {children}
    </div>
  );
}

// Compound component for more flexible usage
interface TabsRootProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextType | null>(null);

export function TabsRoot({ defaultValue, value, onValueChange, children, className }: TabsRootProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');

  const activeTab = value !== undefined ? value : internalValue;

  const setActiveTab = React.useCallback((newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  }, [value, onValueChange]);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a TabsRoot');
  }
  return context;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'pills' | 'underline';
}

export function TabsList({ children, className, variant = 'default' }: TabsListProps) {
  const variantStyles = {
    default: 'bg-navy-800/50 p-1 rounded-xl',
    pills: 'gap-2',
    underline: 'border-b border-navy-700 gap-0'
  };

  return (
    <div className={cn('flex gap-1', variantStyles[variant], className)}>
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export function TabsTrigger({ value, children, className, icon, badge, disabled }: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => !disabled && setActiveTab(value)}
      disabled={disabled}
      className={cn(
        'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg',
        isActive
          ? 'bg-teal-500 text-white shadow-lg'
          : 'text-slate-400 hover:text-white hover:bg-navy-700/50',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {icon}
      <span>{children}</span>
      {badge !== undefined && (
        <span className={cn(
          'ml-1 px-2 py-0.5 text-xs rounded-full',
          isActive ? 'bg-white/20 text-white' : 'bg-navy-700 text-slate-400'
        )}>
          {badge}
        </span>
      )}
    </button>
  );
}

interface TabsContentCompoundProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsContentCompound({ value, children, className }: TabsContentCompoundProps) {
  const { activeTab } = useTabsContext();

  if (value !== activeTab) return null;

  return (
    <div className={cn('animate-in fade-in-50 duration-200', className)}>
      {children}
    </div>
  );
}
