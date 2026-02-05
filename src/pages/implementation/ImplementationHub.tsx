/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Implementation Hub Page
 * Kanban para gerenciamento de implementações de IA
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState } from 'react';
import { Header } from '@/components/layout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
} from '@/components/ui';
import {
  Plus,
  MoreHorizontal,
  User,
  Clock,
  ArrowRight,
  Sparkles,
  Users,
  Code2,
  Building2,
  Zap,
  Filter,
  LayoutGrid,
  List,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Implementation tracks
const tracks = [
  { id: 0, name: 'Self-Service', icon: User, color: 'bg-gray-500' },
  { id: 1, name: 'Ready-made', icon: Sparkles, color: 'bg-aimana-teal' },
  { id: 2, name: 'Champion-built', icon: Users, color: 'bg-aimana-blue' },
  { id: 3, name: 'Coder-built', icon: Code2, color: 'bg-purple-500' },
  { id: 4, name: 'Aimana Services', icon: Building2, color: 'bg-aimana-navy' },
];

// Kanban columns
const columns = [
  { id: 'backlog', name: 'Backlog', color: 'bg-gray-200' },
  { id: 'discovery', name: 'Em Descoberta', color: 'bg-blue-200' },
  { id: 'poc', name: 'Em PoC', color: 'bg-yellow-200' },
  { id: 'building', name: 'Em Construção', color: 'bg-orange-200' },
  { id: 'homolog', name: 'Homologação', color: 'bg-purple-200' },
  { id: 'production', name: 'Em Produção', color: 'bg-green-200' },
];

// Mock initiatives data
const initialInitiatives = [
  {
    id: 1,
    title: 'Triagem de E-mails',
    area: 'Comercial',
    track: 1,
    owner: 'Maria Silva',
    techOwner: 'João Dev',
    status: 'production',
    priority: 'high',
    daysInColumn: 5,
  },
  {
    id: 2,
    title: 'Relatórios Financeiros',
    area: 'Financeiro',
    track: 2,
    owner: 'Carlos Lima',
    techOwner: 'Ana Champion',
    status: 'homolog',
    priority: 'high',
    daysInColumn: 3,
  },
  {
    id: 3,
    title: 'Chatbot CS',
    area: 'Customer Success',
    track: 3,
    owner: 'Pedro Costa',
    techOwner: 'Lucas Coder',
    status: 'building',
    priority: 'medium',
    daysInColumn: 12,
  },
  {
    id: 4,
    title: 'Análise de Contratos',
    area: 'Jurídico',
    track: 3,
    owner: 'Fernanda Alves',
    techOwner: null,
    status: 'poc',
    priority: 'medium',
    daysInColumn: 8,
  },
  {
    id: 5,
    title: 'Previsão de Demanda',
    area: 'Operações',
    track: 4,
    owner: 'Roberto Souza',
    techOwner: 'Aimana Team',
    status: 'discovery',
    priority: 'high',
    daysInColumn: 5,
  },
  {
    id: 6,
    title: 'Copilot de Vendas',
    area: 'Comercial',
    track: 2,
    owner: 'Juliana Santos',
    techOwner: null,
    status: 'backlog',
    priority: 'low',
    daysInColumn: 15,
  },
  {
    id: 7,
    title: 'Onboarding Automático',
    area: 'RH',
    track: 1,
    owner: 'Mariana Oliveira',
    techOwner: null,
    status: 'backlog',
    priority: 'medium',
    daysInColumn: 7,
  },
  {
    id: 8,
    title: 'Resumo de Reuniões',
    area: 'Geral',
    track: 0,
    owner: 'Todos',
    techOwner: null,
    status: 'production',
    priority: 'low',
    daysInColumn: 30,
  },
];

const priorityConfig = {
  high: { label: 'Alta', color: 'bg-status-error', textColor: 'text-status-error' },
  medium: { label: 'Média', color: 'bg-status-warning', textColor: 'text-status-warning' },
  low: { label: 'Baixa', color: 'bg-gray-400', textColor: 'text-text-muted' },
};

export function ImplementationHub() {
  const [initiatives] = useState(initialInitiatives);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [filterTrack, setFilterTrack] = useState<number | null>(null);

  const filteredInitiatives = filterTrack !== null
    ? initiatives.filter((i) => i.track === filterTrack)
    : initiatives;

  const getInitiativesByColumn = (columnId: string) =>
    filteredInitiatives.filter((i) => i.status === columnId);

  const stats = {
    total: initiatives.length,
    inProgress: initiatives.filter((i) => !['backlog', 'production'].includes(i.status)).length,
    production: initiatives.filter((i) => i.status === 'production').length,
  };

  return (
    <div>
      <Header
        title="Hub de Implementações"
        subtitle="Gerencie o ciclo de vida das iniciativas de IA"
      />

      <main className="p-6">
        {/* Top Bar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          {/* Stats */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-text-muted">Total:</span>
              <span className="font-semibold text-text">{stats.total}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-text-muted">Em Andamento:</span>
              <span className="font-semibold text-aimana-blue">{stats.inProgress}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-text-muted">Em Produção:</span>
              <span className="font-semibold text-status-success">{stats.production}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Track Filter */}
            <div className="flex items-center gap-1 mr-2">
              <Button
                variant={filterTrack === null ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setFilterTrack(null)}
              >
                Todos
              </Button>
              {tracks.map((track) => (
                <Button
                  key={track.id}
                  variant={filterTrack === track.id ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterTrack(track.id)}
                  title={track.name}
                >
                  <track.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex border border-surface-border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('kanban')}
                className={cn(
                  'p-2',
                  viewMode === 'kanban' ? 'bg-aimana-navy text-white' : 'text-text-muted hover:bg-surface-hover'
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2',
                  viewMode === 'list' ? 'bg-aimana-navy text-white' : 'text-text-muted hover:bg-surface-hover'
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <Button variant="primary" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Nova Iniciativa
            </Button>
          </div>
        </div>

        {/* Track Legend */}
        <Card className="mb-6">
          <CardContent className="py-3">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-medium text-text">Implementation Tracks:</span>
              {tracks.map((track) => (
                <div key={track.id} className="flex items-center gap-2 text-sm">
                  <div className={cn('h-3 w-3 rounded-full', track.color)} />
                  <span className="text-text-secondary">
                    {track.id}: {track.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Kanban Board */}
        {viewMode === 'kanban' ? (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {columns.map((column) => {
              const columnInitiatives = getInitiativesByColumn(column.id);
              return (
                <div
                  key={column.id}
                  className="flex-shrink-0 w-72"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={cn('h-3 w-3 rounded-full', column.color)} />
                      <h3 className="font-semibold text-text text-sm">{column.name}</h3>
                      <Badge variant="outline" size="sm">
                        {columnInitiatives.length}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="icon-sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Column Cards */}
                  <div className="space-y-3 min-h-[400px] rounded-lg bg-surface-light p-2">
                    {columnInitiatives.map((initiative) => {
                      const track = tracks[initiative.track];
                      const priority = priorityConfig[initiative.priority as keyof typeof priorityConfig];
                      return (
                        <Card
                          key={initiative.id}
                          variant="interactive"
                          padding="sm"
                          className="cursor-grab active:cursor-grabbing"
                        >
                          <CardContent className="p-3">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className={cn('h-2 w-2 rounded-full', track.color)} />
                                <span className="text-xs text-text-muted">Track {track.id}</span>
                              </div>
                              <div className={cn('h-2 w-2 rounded-full', priority.color)} title={`Prioridade ${priority.label}`} />
                            </div>

                            {/* Title */}
                            <h4 className="font-medium text-text text-sm mb-1">
                              {initiative.title}
                            </h4>

                            {/* Area */}
                            <Badge variant="outline" size="sm" className="mb-2">
                              {initiative.area}
                            </Badge>

                            {/* Footer */}
                            <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-surface-border mt-2">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span className="truncate max-w-[80px]">{initiative.owner}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{initiative.daysInColumn}d</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}

                    {columnInitiatives.length === 0 && (
                      <div className="flex items-center justify-center h-24 text-sm text-text-muted">
                        Nenhuma iniciativa
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-border text-left">
                    <th className="p-4 text-xs font-medium text-text-muted">Iniciativa</th>
                    <th className="p-4 text-xs font-medium text-text-muted">Área</th>
                    <th className="p-4 text-xs font-medium text-text-muted">Track</th>
                    <th className="p-4 text-xs font-medium text-text-muted">Status</th>
                    <th className="p-4 text-xs font-medium text-text-muted">Owner</th>
                    <th className="p-4 text-xs font-medium text-text-muted">Prioridade</th>
                    <th className="p-4 text-xs font-medium text-text-muted">Dias</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border">
                  {filteredInitiatives.map((initiative) => {
                    const track = tracks[initiative.track];
                    const column = columns.find((c) => c.id === initiative.status);
                    const priority = priorityConfig[initiative.priority as keyof typeof priorityConfig];
                    return (
                      <tr key={initiative.id} className="hover:bg-surface-hover">
                        <td className="p-4">
                          <span className="font-medium text-text">{initiative.title}</span>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" size="sm">{initiative.area}</Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className={cn('h-2 w-2 rounded-full', track.color)} />
                            <span className="text-sm text-text-secondary">{track.name}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className={cn('h-2 w-2 rounded-full', column?.color)} />
                            <span className="text-sm text-text">{column?.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-text-secondary">{initiative.owner}</td>
                        <td className="p-4">
                          <span className={cn('text-sm font-medium', priority.textColor)}>
                            {priority.label}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-text-muted">{initiative.daysInColumn}d</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
