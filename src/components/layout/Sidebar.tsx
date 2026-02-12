/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Sidebar Component
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Lightbulb,
  Rocket,
  BarChart3,
  GraduationCap,
  Database,
  Sparkles,
  ChevronDown,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  phase?: 'plan' | 'execute' | 'manage';
  children?: { label: string; href: string }[];
}

const navigation: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: 'Planejar',
    href: '/planning',
    icon: <Lightbulb className="h-5 w-5" />,
    phase: 'plan',
    children: [
      { label: 'AI Strategy', href: '/planning/strategy' },
      { label: 'Maturidade', href: '/planning/maturity' },
      { label: 'Oportunidades', href: '/planning/opportunities' },
      { label: 'Hub de Ideias', href: '/planning/ideas' },
      { label: 'Data Readiness', href: '/planning/data-readiness' },
      { label: 'Governança', href: '/planning/governance' },
    ],
  },
  {
    label: 'Executar',
    href: '/execution',
    icon: <Rocket className="h-5 w-5" />,
    phase: 'execute',
    children: [
      { label: 'AI Sandbox', href: '/execution/sandbox' },
      { label: 'Implementações IA', href: '/execution/implementations' },
    ],
  },
  {
    label: 'Gerir',
    href: '/management',
    icon: <BarChart3 className="h-5 w-5" />,
    phase: 'manage',
    children: [
      { label: 'Centro de Excelência', href: '/management/excellence' },
      { label: 'Operações', href: '/management/operations' },
      { label: 'Relatórios', href: '/management/reports' },
    ],
  },
  {
    label: 'Academy',
    href: '/academy',
    icon: <GraduationCap className="h-5 w-5" />,
    children: [
      { label: 'Trilhas', href: '/academy/tracks' },
      { label: 'AI Leaders', href: '/academy/leaders' },
      { label: 'AI Champions', href: '/academy/champions' },
      { label: 'AI Coders', href: '/academy/coders' },
      { label: 'Tutor IA', href: '/academy/tutor' },
      { label: 'Certificações', href: '/academy/certifications' },
    ],
  },
  {
    label: 'Conectores',
    href: '/connectors',
    icon: <Database className="h-5 w-5" />,
  },
];

export function Sidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['/planning', '/execution', '/management']);

  const toggleExpand = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href]
    );
  };

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const getPhaseColor = (phase?: 'plan' | 'execute' | 'manage') => {
    switch (phase) {
      case 'plan':
        return 'text-aimana-blue';
      case 'execute':
        return 'text-aimana-teal';
      case 'manage':
        return 'text-white';
      default:
        return '';
    }
  };

  return (
    <aside className="fixed left-0 top-0 z-sticky flex h-screen w-[280px] flex-col bg-aimana-navy">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-aimana-teal">
          <Sparkles className="h-5 w-5 text-aimana-navy" />
        </div>
        <div>
          <h1 className="font-semibold text-white">Aimana</h1>
          <p className="text-xs text-white/50">AI-First Journey</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.href}>
              {item.children ? (
                // Item with submenu - label is a NavLink, chevron toggles expand
                <div>
                  <div
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                      isActive(item.href)
                        ? 'bg-white/10 text-white'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    <NavLink
                      to={item.href}
                      className="flex flex-1 items-center gap-3"
                    >
                      <span className={cn(getPhaseColor(item.phase))}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </NavLink>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(item.href);
                      }}
                      className="ml-2 rounded p-0.5 hover:bg-white/10"
                    >
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform',
                          expandedItems.includes(item.href) && 'rotate-180'
                        )}
                      />
                    </button>
                  </div>

                  {/* Submenu */}
                  {expandedItems.includes(item.href) && (
                    <ul className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <NavLink
                            to={child.href}
                            className={({ isActive }) =>
                              cn(
                                'block rounded-lg px-3 py-2 text-sm transition-all',
                                isActive
                                  ? 'bg-white/10 text-white'
                                  : 'text-white/60 hover:bg-white/5 hover:text-white'
                              )
                            }
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                // Simple item
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    )
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-2">
          <NavLink
            to="/settings"
            className="flex flex-1 items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white"
          >
            <Settings className="h-4 w-4" />
            <span>Configurações</span>
          </NavLink>
          <button className="rounded-lg p-2 text-white/60 hover:bg-white/5 hover:text-white">
            <HelpCircle className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
