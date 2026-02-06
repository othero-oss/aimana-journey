/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Portfolio Dashboard Page
 * Reestruturado: Layout full-width, sem chat, com insights IA no topo
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
  Input,
  Progress,
} from '@/components/ui';
import { AIInsightBanner, AIActionButton } from '@/components/ai';
import {
  LayoutGrid,
  List,
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Target,
  ArrowRight,
  MoreVertical,
  Calendar,
  Users,
  AlertTriangle,
  CheckCircle2,
  Search,
  Plus,
  Download,
  PieChart,
  Activity,
  Sparkles,
  ChevronRight,
  Eye,
  Edit,
  Pause,
  Play,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Portfolio initiatives
const initiatives = [
  {
    id: 1,
    name: 'Automação de Atendimento',
    description: 'Agente de suporte ao cliente com IA',
    phase: 'Gerir',
    status: 'active',
    progress: 100,
    roi: 320,
    investment: 150000,
    savings: 480000,
    timeline: 'Q1 2025',
    owner: 'Maria Santos',
    team: 'Customer Success',
    priority: 'high',
    health: 'green',
    lastUpdate: '2 dias atrás',
  },
  {
    id: 2,
    name: 'Análise Preditiva de Vendas',
    description: 'Previsão de demanda e oportunidades',
    phase: 'Executar',
    status: 'active',
    progress: 65,
    roi: 180,
    investment: 200000,
    savings: 360000,
    timeline: 'Q2 2025',
    owner: 'Carlos Lima',
    team: 'Comercial',
    priority: 'high',
    health: 'yellow',
    lastUpdate: '1 dia atrás',
  },
  {
    id: 3,
    name: 'Extração de Documentos',
    description: 'OCR e processamento automático',
    phase: 'Executar',
    status: 'paused',
    progress: 40,
    roi: 95,
    investment: 80000,
    savings: 76000,
    timeline: 'Q2 2025',
    owner: 'Ana Costa',
    team: 'Operações',
    priority: 'medium',
    health: 'red',
    lastUpdate: '5 dias atrás',
  },
  {
    id: 4,
    name: 'Assistente de RH',
    description: 'Onboarding e FAQ para colaboradores',
    phase: 'Planejar',
    status: 'planning',
    progress: 20,
    roi: 150,
    investment: 60000,
    savings: 90000,
    timeline: 'Q3 2025',
    owner: 'Roberto Silva',
    team: 'RH',
    priority: 'medium',
    health: 'green',
    lastUpdate: '3 dias atrás',
  },
  {
    id: 5,
    name: 'Otimização de Supply Chain',
    description: 'Previsão de estoque e logística',
    phase: 'Planejar',
    status: 'planning',
    progress: 10,
    roi: 250,
    investment: 300000,
    savings: 750000,
    timeline: 'Q4 2025',
    owner: 'Carlos Lima',
    team: 'Operações',
    priority: 'high',
    health: 'green',
    lastUpdate: '1 semana atrás',
  },
];

const phaseConfig = {
  Planejar: { color: 'bg-purple-500', textColor: 'text-purple-400', badge: 'plan' as const },
  Executar: { color: 'bg-blue-500', textColor: 'text-blue-400', badge: 'execute' as const },
  Gerir: { color: 'bg-teal-500', textColor: 'text-teal-400', badge: 'manage' as const },
};

const healthConfig = {
  green: { color: 'text-emerald-400', bg: 'bg-emerald-500', bgLight: 'bg-emerald-500/20', label: 'No prazo' },
  yellow: { color: 'text-amber-400', bg: 'bg-amber-500', bgLight: 'bg-amber-500/20', label: 'Atenção' },
  red: { color: 'text-red-400', bg: 'bg-red-500', bgLight: 'bg-red-500/20', label: 'Em risco' },
};

const statusConfig = {
  active: { label: 'Ativo', color: 'text-emerald-400', icon: Play },
  paused: { label: 'Pausado', color: 'text-amber-400', icon: Pause },
  planning: { label: 'Planejando', color: 'text-blue-400', icon: Edit },
};

export function Portfolio() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPhase, setFilterPhase] = useState<string | null>(null);
  const [filterHealth, setFilterHealth] = useState<string | null>(null);

  const totalInvestment = initiatives.reduce((acc, i) => acc + i.investment, 0);
  const totalSavings = initiatives.reduce((acc, i) => acc + i.savings, 0);
  const avgROI = Math.round(initiatives.reduce((acc, i) => acc + i.roi, 0) / initiatives.length);
  const atRiskCount = initiatives.filter((i) => i.health === 'red').length;

  const insights = [
    {
      id: '1',
      type: 'warning' as const,
      title: '1 projeto em risco requer atenção',
      description: 'Extração de Documentos está pausado há 5 dias. Taxa de erro acima de 1% em produção.',
      action: { label: 'Ver detalhes', onClick: () => {} },
    },
    {
      id: '2',
      type: 'positive' as const,
      title: 'ROI médio acima da meta',
      description: `ROI médio de ${avgROI}% supera a meta de 150%. Automação de Atendimento lidera com 320%.`,
    },
    {
      id: '3',
      type: 'suggestion' as const,
      title: 'Oportunidade de realocar recursos',
      description: 'Projeto de Supply Chain pode acelerar se recursos do projeto pausado forem realocados.',
      action: { label: 'Simular cenário', onClick: () => {} },
    },
  ];

  const filteredInitiatives = initiatives.filter((initiative) => {
    const matchesSearch = searchTerm === '' ||
      initiative.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      initiative.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPhase = filterPhase === null || initiative.phase === filterPhase;
    const matchesHealth = filterHealth === null || initiative.health === filterHealth;
    return matchesSearch && matchesPhase && matchesHealth;
  });

  const phaseDistribution = Object.entries(phaseConfig).map(([phase]) => ({
    phase,
    count: initiatives.filter((i) => i.phase === phase).length,
  }));

  return (
    <div className="min-h-screen bg-navy-900">
      <Header
        title="Portfolio Dashboard"
        subtitle="Visão consolidada de todas as iniciativas de IA"
      />

      <main className="p-6 space-y-6">
        {/* AI Insights Banner */}
        <AIInsightBanner insights={insights} onDismiss={() => {}} />

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Iniciativas</p>
                  <p className="text-3xl font-bold text-white">{initiatives.length}</p>
                </div>
                <div className="p-3 rounded-xl bg-teal-500/20">
                  <Target className="h-6 w-6 text-teal-400" />
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                {initiatives.filter((i) => i.status === 'active').length} ativas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Investimento</p>
                  <p className="text-3xl font-bold text-white">R${(totalInvestment / 1000).toFixed(0)}k</p>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/20">
                  <DollarSign className="h-6 w-6 text-amber-400" />
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-500">Total alocado</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Economia</p>
                  <p className="text-3xl font-bold text-emerald-400">R${(totalSavings / 1000).toFixed(0)}k</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/20">
                  <TrendingUp className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-500">Projetada/ano</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">ROI Médio</p>
                  <p className="text-3xl font-bold text-blue-400">{avgROI}%</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/20">
                  <PieChart className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <p className="mt-2 text-sm text-emerald-400">+49% vs meta</p>
            </CardContent>
          </Card>

          <Card className={atRiskCount > 0 ? 'border-red-500/30' : ''}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Em Risco</p>
                  <p className={cn('text-3xl font-bold', atRiskCount > 0 ? 'text-red-400' : 'text-emerald-400')}>
                    {atRiskCount}
                  </p>
                </div>
                <div className={cn('p-3 rounded-xl', atRiskCount > 0 ? 'bg-red-500/20' : 'bg-emerald-500/20')}>
                  <AlertTriangle className={cn('h-6 w-6', atRiskCount > 0 ? 'text-red-400' : 'text-emerald-400')} />
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                {atRiskCount > 0 ? 'Requer atenção' : 'Todos saudáveis'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar - Filters & Distribution */}
          <div className="space-y-4">
            {/* Search */}
            <Card>
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Buscar iniciativa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Phase Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Por Fase</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {phaseDistribution.map(({ phase, count }) => {
                  const config = phaseConfig[phase as keyof typeof phaseConfig];
                  const isActive = filterPhase === phase;
                  return (
                    <button
                      key={phase}
                      onClick={() => setFilterPhase(isActive ? null : phase)}
                      className={cn(
                        'w-full flex items-center justify-between p-3 rounded-lg transition-all',
                        isActive ? 'bg-navy-700 ring-1 ring-teal-500/30' : 'bg-navy-800 hover:bg-navy-700'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn('w-3 h-3 rounded', config.color)} />
                        <span className={cn('text-sm', isActive ? config.textColor : 'text-slate-300')}>
                          {phase}
                        </span>
                      </div>
                      <Badge variant="outline" size="sm">{count}</Badge>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Health Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Por Saúde</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(healthConfig).map(([health, config]) => {
                  const count = initiatives.filter((i) => i.health === health).length;
                  const isActive = filterHealth === health;
                  return (
                    <button
                      key={health}
                      onClick={() => setFilterHealth(isActive ? null : health)}
                      className={cn(
                        'w-full flex items-center justify-between p-2 rounded-lg transition-all',
                        isActive ? config.bgLight : 'hover:bg-navy-800'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <div className={cn('w-2 h-2 rounded-full', config.bg)} />
                        <span className={cn('text-sm', isActive ? config.color : 'text-slate-400')}>
                          {config.label}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">{count}</span>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-2">
              <AIActionButton
                label="Análise do Portfolio"
                action="analyze"
                onClick={() => {}}
                variant="gradient"
                size="md"
                className="w-full"
              />
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Exportar Relatório
              </Button>
            </div>
          </div>

          {/* Initiatives List */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                {filteredInitiatives.length} Iniciativas
                {(filterPhase || filterHealth) && (
                  <button
                    onClick={() => { setFilterPhase(null); setFilterHealth(null); }}
                    className="ml-2 text-sm text-teal-400 hover:underline"
                  >
                    Limpar filtros
                  </button>
                )}
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex rounded-lg border border-navy-700 overflow-hidden">
                  <button
                    className={cn(
                      'p-2 transition-colors',
                      viewMode === 'grid' ? 'bg-navy-700 text-teal-400' : 'text-slate-400 hover:text-white'
                    )}
                    onClick={() => setViewMode('grid')}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    className={cn(
                      'p-2 transition-colors',
                      viewMode === 'list' ? 'bg-navy-700 text-teal-400' : 'text-slate-400 hover:text-white'
                    )}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Nova Iniciativa
                </Button>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredInitiatives.map((initiative) => {
                  const phase = phaseConfig[initiative.phase as keyof typeof phaseConfig];
                  const health = healthConfig[initiative.health as keyof typeof healthConfig];
                  const status = statusConfig[initiative.status as keyof typeof statusConfig];
                  const StatusIcon = status.icon;
                  return (
                    <Card key={initiative.id} className="hover:border-teal-500/30 transition-colors">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Badge variant={phase.badge}>{initiative.phase}</Badge>
                            <div className={cn('flex items-center gap-1 text-xs', status.color)}>
                              <StatusIcon className="h-3 w-3" />
                              {status.label}
                            </div>
                          </div>
                          <div className={cn('flex items-center gap-1.5 px-2 py-1 rounded-full text-xs', health.bgLight, health.color)}>
                            <div className={cn('w-1.5 h-1.5 rounded-full', health.bg)} />
                            {health.label}
                          </div>
                        </div>

                        <h3 className="font-semibold text-white mb-1">{initiative.name}</h3>
                        <p className="text-sm text-slate-400 mb-4">{initiative.description}</p>

                        <div className="flex items-center gap-2 mb-4">
                          <Progress value={initiative.progress} size="sm" className="flex-1" />
                          <span className="text-sm font-medium text-slate-300">{initiative.progress}%</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="p-2 bg-navy-800 rounded-lg">
                            <p className="text-emerald-400 font-semibold">{initiative.roi}%</p>
                            <p className="text-xs text-slate-500">ROI</p>
                          </div>
                          <div className="p-2 bg-navy-800 rounded-lg">
                            <p className="text-blue-400 font-semibold">R${(initiative.savings / 1000).toFixed(0)}k</p>
                            <p className="text-xs text-slate-500">Economia</p>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-navy-700 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-navy-700 flex items-center justify-center">
                              <Users className="h-3 w-3 text-slate-400" />
                            </div>
                            <div>
                              <p className="text-xs text-slate-300">{initiative.owner}</p>
                              <p className="text-xs text-slate-500">{initiative.team}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-slate-500" />
                            <span className="text-xs text-slate-500">{initiative.timeline}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-navy-700">
                          <th className="text-left p-4 text-sm font-medium text-slate-400">Iniciativa</th>
                          <th className="text-left p-4 text-sm font-medium text-slate-400">Fase</th>
                          <th className="text-left p-4 text-sm font-medium text-slate-400">Progresso</th>
                          <th className="text-left p-4 text-sm font-medium text-slate-400">ROI</th>
                          <th className="text-left p-4 text-sm font-medium text-slate-400">Economia</th>
                          <th className="text-left p-4 text-sm font-medium text-slate-400">Saúde</th>
                          <th className="text-left p-4 text-sm font-medium text-slate-400">Owner</th>
                          <th className="text-left p-4 text-sm font-medium text-slate-400"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInitiatives.map((initiative) => {
                          const phase = phaseConfig[initiative.phase as keyof typeof phaseConfig];
                          const health = healthConfig[initiative.health as keyof typeof healthConfig];
                          return (
                            <tr key={initiative.id} className="border-b border-navy-800 last:border-0 hover:bg-navy-800/50 transition-colors">
                              <td className="p-4">
                                <div>
                                  <p className="font-medium text-white">{initiative.name}</p>
                                  <p className="text-xs text-slate-500">{initiative.description}</p>
                                </div>
                              </td>
                              <td className="p-4">
                                <Badge variant={phase.badge} size="sm">{initiative.phase}</Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <Progress value={initiative.progress} size="sm" className="w-20" />
                                  <span className="text-xs text-slate-400">{initiative.progress}%</span>
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="text-emerald-400 font-medium">{initiative.roi}%</span>
                              </td>
                              <td className="p-4">
                                <span className="text-slate-300">R${(initiative.savings / 1000).toFixed(0)}k</span>
                              </td>
                              <td className="p-4">
                                <div className={cn('flex items-center gap-1.5 px-2 py-1 rounded-full text-xs w-fit', health.bgLight, health.color)}>
                                  <div className={cn('w-1.5 h-1.5 rounded-full', health.bg)} />
                                  {health.label}
                                </div>
                              </td>
                              <td className="p-4">
                                <p className="text-sm text-slate-300">{initiative.owner}</p>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-1">
                                  <Button variant="ghost" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* At Risk Section */}
            {initiatives.filter((i) => i.health === 'red').length > 0 && (
              <Card className="border-red-500/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <CardTitle className="text-base">Projetos em Risco</CardTitle>
                    </div>
                    <AIActionButton
                      label="Diagnóstico IA"
                      action="diagnose"
                      onClick={() => {}}
                      variant="outline"
                      size="sm"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {initiatives.filter((i) => i.health === 'red').map((initiative) => (
                      <div key={initiative.id} className="flex items-center justify-between p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-red-500/20 rounded-lg">
                            <AlertTriangle className="h-5 w-5 text-red-400" />
                          </div>
                          <div>
                            <p className="font-medium text-white">{initiative.name}</p>
                            <p className="text-sm text-slate-400">
                              {initiative.status === 'paused' ? 'Pausado' : 'Atrasado'} • Última atualização: {initiative.lastUpdate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
