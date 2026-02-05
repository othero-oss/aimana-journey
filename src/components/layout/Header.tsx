/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Header Component
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { Bell, Search, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-docked flex h-16 items-center justify-between border-b border-surface-border bg-white px-6">
      {/* Left side - Page title */}
      <div>
        {title && <h1 className="text-lg font-semibold text-text">{title}</h1>}
        {subtitle && <p className="text-sm text-text-secondary">{subtitle}</p>}
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Buscar..."
            className="h-9 w-64 rounded-lg border border-surface-border bg-surface-light pl-9 pr-4 text-sm placeholder:text-text-muted focus:border-aimana-teal focus:outline-none focus:ring-2 focus:ring-aimana-teal/20"
          />
        </div>

        {/* Notifications */}
        <button className="relative rounded-lg p-2 text-text-secondary hover:bg-surface-hover hover:text-text">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-aimana-teal" />
        </button>

        {/* User menu */}
        <button className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-surface-hover">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-aimana-navy text-white">
            <User className="h-4 w-4" />
          </div>
          <div className="hidden text-left md:block">
            <p className="text-sm font-medium text-text">Usuário</p>
            <p className="text-xs text-text-muted">Admin</p>
          </div>
          <ChevronDown className="h-4 w-4 text-text-muted" />
        </button>
      </div>
    </header>
  );
}
