/**
 * ===============================================================================
 * AIMANA JOURNEY - Centro de Excelência IA
 * Consolidação de Portfolio + ROI Tracker
 *
 * Abas:
 * - Dashboard: Visão consolidada do programa de IA
 * - Iniciativas: Lista completa com filtros
 * - Métricas & ROI: Breakdown de investimento e economia
 * - Evolução: Gráficos de evolução ao longo do tempo
 * ===============================================================================
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
  Progress,
  Tabs,
  TabsContent,
} from '@/components/ui';
import { AIInsightBanner, AIActionButton, AIModal } from '@/components/ai';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  DollarSign,
  Target,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Pause,
  Play,
  Plus,
  Filter,
  Search,
  Download,
  Settings,
  ChevronRight,
  Activity,
  Sparkles,
  Bot,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  Flag,
  Milestone,
  Award,
  LineChart,
  PieChart,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// DADOS MOCK
// ============================================================================

const initiatives = [
  {
    id: 1,
    name: 'Automação de E-mails',
    description: 'Triagem e classificação automática de e-mails',
    status: 'production',
    phase: 'Gerenciar',
    owner: 'Maria Santos',
    area: 'Comercial',
    track: 'Ready-made',
    startDate: '2024-11-01',
    goLiveDate: '2025-01-15',
    investment: 15000,
    monthlySavings: 8000,
    roi: 320,
    usersImpacted: 25,
    hoursMonthSaved: 150,
    health: 'green',
  },
  {
    id: 2,
    name: 'Chatbot de Atendimento',
    description: 'Assistente virtual para suporte ao cliente',
    status: 'production',
    phase: 'Gerenciar',
    owner: 'Carlos Lima',
    area: 'Customer Success',
    track: 'Coder-built',
    startDate: '2024-10-15',
    goLiveDate: '2025-01-20',
    investment: 45000,
    monthlySavings: 22000,
    roi: 186,
    usersImpacted: 120,
    hoursMonthSaved: 400,
    health: 'green',
  },
  {
    id: 3,
    name: 'Análise Financeira',
    description: 'Relatórios automatizados com insights',
    status: 'development',
    phase: 'Executar',
    owner: 'Ana Costa',
    area: 'Financeiro',
    track: 'Champion-built',
    startDate: '2024-12-01',
    goLiveDate: null,
    investment: 25000,
    monthlySavings: 0,
    roi: 0,
    usersImpacted: 8,
    hoursMonthSaved: 0,
    health: 'yellow',
  },
  {
    id: 4,
    name: 'Previsão de Demanda',
    description: 'ML para otimização de estoque',
    status: 'planning',
    phase: 'Planejar',
    owner: 'Pedro Silva',
    area: 'Operações',
    track: 'Aimana Services',
    startDate: '2025-01-15',
    goLiveDate: null,
    investment: 80000,
    monthlySavings: 0,
    roi: 0,
    usersImpacted: 15,
    hoursMonthSaved: 0,
    health: 'gray',
  },
  {
    id: 5,
    name: 'Análise de Contratos',
    description: 'Extração de cláusulas e riscos',
    status: 'paused',
    phase: 'Executar',
    owner: 'Roberto Alves',
    area: 'Jurídico',
    track: 'Coder-built',
    startDate: '2024-11-15',
    goLiveDate: null,
    investment: 35000,
    monthlySavings: 0,
    roi: 0,
    usersImpacted: 5,
    hoursMonthSaved: 0,
    health: 'red',
  },
];

const monthlyMetrics = [
  { month: 'Set', agentsProduction: 0, savings: 0, investment: 20000, maturity: 25 },
  { month: 'Out', agentsProduction: 0, savings: 0, investment: 35000, maturity: 28 },
  { month: 'Nov', agentsProduction: 1, savings: 5000, investment: 45000, maturity: 32 },
  { month: 'Dez', agentsProduction: 1, savings: 8000, investment: 55000, maturity: 38 },
  { month: 'Jan', agentsProduction: 2, savings: 18000, investment: 65000, maturity: 45 },
  { month: 'Fev', agentsProduction: 2, savings: 30000, investment: 75000, maturity: 52 },
];

const milestones = [
  { id: 1, date: '2024-11-15', title: 'Primeiro agente em produção', type: 'success' },
  { id: 2, date: '2025-01-15', title: 'Segundo agente em produção', type: 'success' },
  { id: 3, date: '2025-01-20', title: '100 horas/mês economizadas', type: 'milestone' },
  { id: 4, date: '2025-02-01', title: 'ROI positivo atingido', type: 'success' },
];

const statusConfig = {
  production: { label: 'Em Produção', color: 'text-status-success', bg: 'bg-status-success-bg', icon: CheckCircle2 },
  development: { label: 'Em Desenvolvimento', color: 'text-status-warning', bg: 'bg-status-warning-bg', icon: Settings },
  planning: { label: 'Planejamento', color: 'text-aimana-teal', bg: 'bg-aimana-teal/10', icon: Target },
  paused: { label: 'Pausado', color: 'text-status-error', bg: 'bg-status-error-bg', icon: Pause },
};

const healthConfig = {
  green: { label: 'Saudável', color: 'text-status-success', icon: CheckCircle2 },
  yellow: { label: 'Atenção', color: 'text-status-warning', icon: AlertTriangle },
  red: { label: 'Crítico', color: 'text-status-error', icon: XCircle },
  gray: { label: 'N/A', color: 'text-text-muted', icon: Clock },
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export function ExcellenceCenter() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNavigatorModal, setShowNavigatorModal] = useState(false);

  // Cálculos
  const totalInvestment = initiatives.reduce((acc, i) => acc + i.investment, 0);
  const totalMonthlySavings = initiatives.filter(i => i.status === 'production').reduce((acc, i) => acc + i.monthlySavings, 0);
  const productionCount = initiatives.filter(i => i.status === 'production').length;
  const developmentCount = initiatives.filter(i => i.status === 'development').length;
  const totalUsersImpacted = initiatives.filter(i => i.status === 'production').reduce((acc, i) => acc + i.usersImpacted, 0);
  const totalHoursSaved = initiatives.filter(i => i.status === 'production').reduce((acc, i) => acc + i.hoursMonthSaved, 0);

  // ROI geral
  const totalSavingsToDate = monthlyMetrics.reduce((acc, m) => acc + m.savings, 0);
  const overallROI = totalInvestment > 0 ? Math.round(((totalSavingsToDate - totalInvestment) / totalInvestment) * 100) : 0;

  // Filtragem de iniciativas
  const filteredInitiatives = initiatives.filter(i => {
    if (filterStatus !== 'all' && i.status !== filterStatus) return false;
    if (searchTerm && !i.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'initiatives', label: 'Iniciativas', icon: <Layers className="h-4 w-4" />, badge: initiatives.length.toString() },
    { id: 'metrics', label: 'Métricas & ROI', icon: <DollarSign className="h-4 w-4" /> },
    { id: 'evolution', label: 'Evolução', icon: <LineChart className="h-4 w-4" /> },
  ];

  const handleAIMessage = async (message: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return `Analisando sua solicitação: "${message}"...

**AI Navigator - Assistente de Iniciativas**

Com base no contexto da sua empresa e no mapa de oportunidades, posso ajudar a:

1. **Sugerir novas oportunidades** baseadas em gaps identificados
2. **Calcular ROI estimado** para uma nova iniciativa
3. **Recomendar track e abordagem** ideal
4. **Identificar dependências** com outras iniciativas

O que gostaria de explorar?`;
  };

  return (
    <div>
      <Header
        title="Centro de Excelência IA"
        subtitle="Visão consolidada do programa de IA da empresa"
      />

      <main className="p-6 space-y-6">
        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* ================================================================ */}
        {/* ABA 1: DASHBOARD EXECUTIVO */}
        {/* ================================================================ */}
        <TabsContent value="dashboard" activeTab={activeTab}>
          <div className="space-y-6">
            {/* KPIs Principais */}
            <div className="grid gap-4 md:grid-cols-6">
              <Card className="border-l-4 border-l-aimana-teal">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Total Iniciativas</p>
                      <p className="text-3xl font-bold text-text">{initiatives.length}</p>
                    </div>
                    <Layers className="h-8 w-8 text-aimana-teal" />
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <Badge variant="success" size="sm">{productionCount} produção</Badge>
                    <Badge variant="warning" size="sm">{developmentCount} dev</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-status-success">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Em Produção</p>
                      <p className="text-3xl font-bold text-status-success">{productionCount}</p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-status-success" />
                  </div>
                  <p className="text-xs text-text-muted mt-2">agentes ativos</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-phase-plan">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Investimento</p>
                      <p className="text-2xl font-bold text-text">R$ {(totalInvestment / 1000).toFixed(0)}k</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-phase-plan" />
                  </div>
                  <p className="text-xs text-text-muted mt-2">total acumulado</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-status-success">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Economia/mês</p>
                      <p className="text-2xl font-bold text-status-success">R$ {(totalMonthlySavings / 1000).toFixed(0)}k</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-status-success" />
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-status-success">
                    <ArrowUpRight className="h-3 w-3" />
                    +12% vs mês anterior
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-phase-execute">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Usuários</p>
                      <p className="text-3xl font-bold text-text">{totalUsersImpacted}</p>
                    </div>
                    <Users className="h-8 w-8 text-phase-execute" />
                  </div>
                  <p className="text-xs text-text-muted mt-2">impactados</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-aimana-navy">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Horas/mês</p>
                      <p className="text-3xl font-bold text-text">{totalHoursSaved}</p>
                    </div>
                    <Clock className="h-8 w-8 text-aimana-navy" />
                  </div>
                  <p className="text-xs text-text-muted mt-2">economizadas</p>
                </CardContent>
              </Card>
            </div>

            {/* ROI e Status de Saúde */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* ROI Card */}
              <Card className="bg-gradient-header text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">ROI do Programa</h3>
                    <PieChart className="h-6 w-6 text-white/70" />
                  </div>
                  <div className="text-center mb-4">
                    <span className={cn(
                      'text-5xl font-bold',
                      overallROI >= 0 ? 'text-aimana-teal' : 'text-red-400'
                    )}>
                      {overallROI > 0 ? '+' : ''}{overallROI}%
                    </span>
                    <p className="text-white/70 text-sm mt-1">retorno sobre investimento</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white/50">Investido</p>
                      <p className="font-semibold">R$ {(totalInvestment / 1000).toFixed(0)}k</p>
                    </div>
                    <div>
                      <p className="text-white/50">Economia Total</p>
                      <p className="font-semibold text-aimana-teal">R$ {(totalSavingsToDate / 1000).toFixed(0)}k</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status de Saúde */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="h-5 w-5 text-aimana-teal" />
                    Status de Saúde
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(healthConfig).map(([key, config]) => {
                      const count = initiatives.filter(i => i.health === key).length;
                      if (count === 0) return null;
                      const Icon = config.icon;
                      return (
                        <div key={key} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className={cn('h-4 w-4', config.color)} />
                            <span className="text-sm text-text">{config.label}</span>
                          </div>
                          <Badge variant="outline">{count}</Badge>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t border-surface-border">
                    <p className="text-sm text-text-muted mb-2">Alertas Prioritários</p>
                    {initiatives.filter(i => i.health === 'red' || i.health === 'yellow').slice(0, 2).map(i => (
                      <div key={i.id} className={cn(
                        'flex items-center gap-2 p-2 rounded-lg mb-2',
                        i.health === 'red' ? 'bg-status-error-bg' : 'bg-status-warning-bg'
                      )}>
                        <AlertTriangle className={cn('h-4 w-4', i.health === 'red' ? 'text-status-error' : 'text-status-warning')} />
                        <span className="text-sm text-text">{i.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Marcos Recentes */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Milestone className="h-5 w-5 text-status-success" />
                    Marcos Alcançados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {milestones.slice(0, 4).map((milestone) => (
                      <div key={milestone.id} className="flex items-start gap-3">
                        <div className={cn(
                          'w-2 h-2 rounded-full mt-2',
                          milestone.type === 'success' ? 'bg-status-success' : 'bg-aimana-teal'
                        )} />
                        <div>
                          <p className="text-sm text-text">{milestone.title}</p>
                          <p className="text-xs text-text-muted">{milestone.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Iniciativas Recentes */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Iniciativas Recentes</CardTitle>
                    <CardDescription>Últimas atividades do programa de IA</CardDescription>
                  </div>
                  <Button size="sm" onClick={() => setActiveTab('initiatives')}>
                    Ver Todas
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {initiatives.slice(0, 4).map((initiative) => {
                    const status = statusConfig[initiative.status as keyof typeof statusConfig];
                    const StatusIcon = status.icon;
                    return (
                      <div key={initiative.id} className={cn('flex items-center gap-4 p-3 rounded-lg', status.bg)}>
                        <StatusIcon className={cn('h-5 w-5', status.color)} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-text">{initiative.name}</p>
                            <Badge variant="outline" size="sm">{initiative.area}</Badge>
                          </div>
                          <p className="text-sm text-text-muted">{initiative.owner}</p>
                        </div>
                        <Badge variant={initiative.status === 'production' ? 'success' : initiative.status === 'development' ? 'warning' : 'secondary'}>
                          {status.label}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ================================================================ */}
        {/* ABA 2: INICIATIVAS */}
        {/* ================================================================ */}
        <TabsContent value="initiatives" activeTab={activeTab}>
          <div className="space-y-6">
            {/* Header com Ações */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Buscar iniciativa..."
                    className="pl-9 pr-4 py-2 text-sm border border-surface-border rounded-lg bg-white w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="text-sm border border-surface-border rounded-lg px-3 py-2 bg-white"
                >
                  <option value="all">Todos os status</option>
                  <option value="production">Em Produção</option>
                  <option value="development">Em Desenvolvimento</option>
                  <option value="planning">Planejamento</option>
                  <option value="paused">Pausados</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <AIActionButton
                  label="AI Navigator"
                  icon={<Bot className="h-4 w-4" />}
                  onClick={() => setShowNavigatorModal(true)}
                />
                <Button onClick={() => setShowNavigatorModal(true)}>
                  <Plus className="h-4 w-4 mr-1" />
                  Nova Iniciativa
                </Button>
              </div>
            </div>

            {/* Lista de Iniciativas */}
            <div className="space-y-4">
              {filteredInitiatives.map((initiative) => {
                const status = statusConfig[initiative.status as keyof typeof statusConfig];
                const health = healthConfig[initiative.health as keyof typeof healthConfig];
                const StatusIcon = status.icon;
                const HealthIcon = health.icon;
                return (
                  <Card key={initiative.id} className="hover:border-aimana-teal/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={cn('p-3 rounded-lg', status.bg)}>
                          <StatusIcon className={cn('h-6 w-6', status.color)} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-text">{initiative.name}</h3>
                            <Badge variant={initiative.status === 'production' ? 'success' : initiative.status === 'development' ? 'warning' : 'secondary'}>
                              {status.label}
                            </Badge>
                            <div className={cn('flex items-center gap-1 text-xs', health.color)}>
                              <HealthIcon className="h-3 w-3" />
                              {health.label}
                            </div>
                          </div>
                          <p className="text-sm text-text-secondary mb-3">{initiative.description}</p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {initiative.owner}
                            </span>
                            <span>{initiative.area}</span>
                            <Badge variant="outline" size="sm">{initiative.track}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          {initiative.status === 'production' ? (
                            <>
                              <p className="text-2xl font-bold text-status-success">+{initiative.roi}%</p>
                              <p className="text-sm text-text-muted">ROI</p>
                              <p className="text-sm text-status-success">R$ {(initiative.monthlySavings / 1000).toFixed(0)}k/mês</p>
                            </>
                          ) : (
                            <>
                              <p className="text-2xl font-bold text-text-muted">R$ {(initiative.investment / 1000).toFixed(0)}k</p>
                              <p className="text-sm text-text-muted">investimento</p>
                            </>
                          )}
                        </div>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>

        {/* ================================================================ */}
        {/* ABA 3: MÉTRICAS & ROI */}
        {/* ================================================================ */}
        <TabsContent value="metrics" activeTab={activeTab}>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Breakdown de Investimento */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-phase-plan" />
                    Breakdown de Investimento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {initiatives.map((initiative) => (
                      <div key={initiative.id} className="flex items-center gap-4">
                        <div className="w-32 text-sm text-text truncate">{initiative.name}</div>
                        <div className="flex-1">
                          <Progress
                            value={(initiative.investment / totalInvestment) * 100}
                            size="md"
                          />
                        </div>
                        <div className="w-24 text-right text-sm font-medium text-text">
                          R$ {(initiative.investment / 1000).toFixed(0)}k
                        </div>
                        <div className="w-16 text-right text-xs text-text-muted">
                          {Math.round((initiative.investment / totalInvestment) * 100)}%
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-surface-border flex items-center justify-between">
                      <span className="font-semibold text-text">Total</span>
                      <span className="text-xl font-bold text-text">R$ {(totalInvestment / 1000).toFixed(0)}k</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Breakdown de Economia */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-status-success" />
                    Breakdown de Economia Mensal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {initiatives.filter(i => i.status === 'production').map((initiative) => (
                      <div key={initiative.id} className="flex items-center gap-4">
                        <div className="w-32 text-sm text-text truncate">{initiative.name}</div>
                        <div className="flex-1">
                          <Progress
                            value={(initiative.monthlySavings / totalMonthlySavings) * 100}
                            size="md"
                            variant="success"
                          />
                        </div>
                        <div className="w-24 text-right text-sm font-medium text-status-success">
                          R$ {(initiative.monthlySavings / 1000).toFixed(0)}k
                        </div>
                        <div className="w-16 text-right text-xs text-text-muted">
                          {Math.round((initiative.monthlySavings / totalMonthlySavings) * 100)}%
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-surface-border flex items-center justify-between">
                      <span className="font-semibold text-text">Total</span>
                      <span className="text-xl font-bold text-status-success">R$ {(totalMonthlySavings / 1000).toFixed(0)}k/mês</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* ROI por Iniciativa */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">ROI por Iniciativa</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {initiatives.filter(i => i.status === 'production').map((initiative) => (
                    <div key={initiative.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-light">
                      <span className="text-sm text-text">{initiative.name}</span>
                      <span className={cn(
                        'text-lg font-bold',
                        initiative.roi > 100 ? 'text-status-success' : initiative.roi > 0 ? 'text-aimana-teal' : 'text-status-error'
                      )}>
                        +{initiative.roi}%
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Projeções */}
              <Card className="bg-gradient-to-br from-aimana-teal/10 to-phase-plan/10 border-aimana-teal/30">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-text mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-aimana-teal" />
                    Projeção 12 meses
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-muted">Economia projetada</span>
                      <span className="text-lg font-bold text-status-success">R$ {(totalMonthlySavings * 12 / 1000).toFixed(0)}k</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-muted">ROI projetado</span>
                      <span className="text-lg font-bold text-aimana-teal">+{Math.round((totalMonthlySavings * 12 / totalInvestment - 1) * 100)}%</span>
                    </div>
                  </div>
                  <AIActionButton
                    label="Simular Cenários"
                    onClick={() => setShowNavigatorModal(true)}
                    variant="outline"
                    className="w-full mt-4"
                  />
                </CardContent>
              </Card>

              {/* Export */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Exportar Relatórios</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Relatório Executivo (PDF)
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Dados de ROI (Excel)
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ================================================================ */}
        {/* ABA 4: EVOLUÇÃO */}
        {/* ================================================================ */}
        <TabsContent value="evolution" activeTab={activeTab}>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Gráfico de Evolução */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-aimana-teal" />
                    Evolução ao Longo do Tempo
                  </CardTitle>
                  <CardDescription>Métricas mensais do programa de IA</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Simplified Chart Representation */}
                  <div className="grid grid-cols-6 gap-4 text-center">
                    {monthlyMetrics.map((m, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="h-32 flex flex-col justify-end gap-1">
                          <div
                            className="bg-status-success rounded-t"
                            style={{ height: `${(m.savings / 30000) * 100}%`, minHeight: m.savings > 0 ? '4px' : '0' }}
                          />
                          <div
                            className="bg-aimana-teal/30 rounded-t"
                            style={{ height: `${(m.investment / 80000) * 100}%`, minHeight: '4px' }}
                          />
                        </div>
                        <p className="text-xs font-medium text-text">{m.month}</p>
                        <div className="text-xs text-text-muted">
                          <p className="text-status-success">{m.savings > 0 ? `R$${(m.savings / 1000).toFixed(0)}k` : '-'}</p>
                          <p className="text-aimana-teal">R${(m.investment / 1000).toFixed(0)}k</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-surface-border">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-status-success" />
                      <span className="text-sm text-text-muted">Economia</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-aimana-teal/30" />
                      <span className="text-sm text-text-muted">Investimento</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Maturidade ao Longo do Tempo */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-phase-plan" />
                    Evolução da Maturidade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-6 gap-4">
                    {monthlyMetrics.map((m, idx) => (
                      <div key={idx} className="text-center">
                        <div className="relative h-24 flex items-end justify-center">
                          <div
                            className="w-8 bg-gradient-to-t from-phase-plan to-aimana-teal rounded-t"
                            style={{ height: `${m.maturity}%` }}
                          />
                        </div>
                        <p className="text-xs font-medium text-text mt-2">{m.month}</p>
                        <p className="text-lg font-bold text-text">{m.maturity}%</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Resumo de Evolução */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Resumo de Evolução</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">Agentes em Produção</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-text">{productionCount}</span>
                      <span className="text-xs text-status-success flex items-center">
                        <ArrowUpRight className="h-3 w-3" />
                        +2 em 6m
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">Economia Acumulada</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-status-success">R$ {(totalSavingsToDate / 1000).toFixed(0)}k</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">Maturidade Atual</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-text">{monthlyMetrics[monthlyMetrics.length - 1].maturity}%</span>
                      <span className="text-xs text-status-success flex items-center">
                        <ArrowUpRight className="h-3 w-3" />
                        +27pts
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline de Marcos */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Flag className="h-4 w-4 text-aimana-teal" />
                    Timeline de Marcos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-surface-light" />
                    <div className="space-y-4">
                      {milestones.map((milestone) => (
                        <div key={milestone.id} className="flex items-start gap-4 relative">
                          <div className={cn(
                            'w-4 h-4 rounded-full border-2 bg-white z-10',
                            milestone.type === 'success' ? 'border-status-success' : 'border-aimana-teal'
                          )} />
                          <div>
                            <p className="text-sm text-text">{milestone.title}</p>
                            <p className="text-xs text-text-muted">{milestone.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* AI Insights Banner - No final */}
          <AIInsightBanner
            title="Análise de Evolução"
            insights={[
              `ROI cresceu ${overallROI}% nos últimos 6 meses`,
              `${productionCount} agentes em produção gerando economia de R$${(totalMonthlySavings / 1000).toFixed(0)}k/mês`,
              'Maturidade aumentou 27 pontos desde setembro',
            ]}
            onAnalyze={() => setShowNavigatorModal(true)}
            className="mt-6"
          />
        </TabsContent>
      </main>

      {/* AI Navigator Modal */}
      <AIModal
        title="AI Navigator"
        description="Assistente para criação e gestão de iniciativas de IA"
        isOpen={showNavigatorModal}
        onClose={() => setShowNavigatorModal(false)}
        agentName="AI Navigator"
        agentDescription="Especialista em planejamento e ROI de iniciativas de IA"
        initialMessage={`Olá! Sou o AI Navigator, seu assistente para iniciativas de IA.

**O que posso fazer:**
- Ajudar a criar novas iniciativas
- Sugerir oportunidades do mapa
- Calcular ROI estimado
- Recomendar track e abordagem
- Identificar dependências

**Contexto atual:**
- ${initiatives.length} iniciativas no programa
- ${productionCount} em produção
- ROI geral: ${overallROI}%

Como posso ajudar?`}
        suggestedPrompts={[
          'Criar nova iniciativa',
          'Analisar oportunidades',
          'Calcular ROI',
          'Sugerir próximos passos',
        ]}
        onSendMessage={handleAIMessage}
      />
    </div>
  );
}
