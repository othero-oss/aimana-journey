/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Gestao de Agentes Page
 * Gerencie o ciclo de vida dos agentes de IA
 *
 * Tabs:
 * - Em Desenvolvimento: Pipeline/kanban de agentes sendo construidos
 * - Em Producao: Agentes ativos com metricas de producao
 * - Repositorio: Templates reutilizaveis de agentes concluidos
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState } from 'react';
import { Header } from '@/components/layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AIActionButton, AIModal } from '@/components/ai';
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
import {
  Bot,
  Settings,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Play,
  Pause,
  RefreshCw,
  Send,
  Shield,
  Server,
  Eye,
  Search,
  Filter,
  GitBranch,
  Package,
  Copy,
  Archive,
  Layers,
  Code2,
  FileSearch,
  MessageSquare,
  Wrench,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// MOCK DATA
// ============================================================================

// Pipeline stages for "Em Desenvolvimento"
const pipelineStages = [
  { id: 'ideacao', label: 'Ideacao', color: 'bg-purple-500' },
  { id: 'design', label: 'Design', color: 'bg-blue-500' },
  { id: 'desenvolvimento', label: 'Desenvolvimento', color: 'bg-teal-500' },
  { id: 'testes', label: 'Testes', color: 'bg-amber-500' },
  { id: 'homologacao', label: 'Homologacao', color: 'bg-emerald-500' },
];

const developmentAgents = [
  {
    id: 'd1',
    name: 'HR Assistant',
    description: 'Assistente para processos de RH e onboarding',
    owner: 'Maria Santos',
    stage: 'testes',
    progress: 85,
    daysInStage: 3,
  },
  {
    id: 'd2',
    name: 'Inventory Agent',
    description: 'Gestao automatizada de estoque e reposicao',
    owner: 'Carlos Lima',
    stage: 'desenvolvimento',
    progress: 52,
    daysInStage: 7,
  },
  {
    id: 'd3',
    name: 'Compliance Checker',
    description: 'Verificacao automatica de conformidade regulatoria',
    owner: 'Ana Ferreira',
    stage: 'design',
    progress: 30,
    daysInStage: 4,
  },
  {
    id: 'd4',
    name: 'Meeting Summarizer',
    description: 'Resumo automatico de reunioes e atas',
    owner: 'Pedro Costa',
    stage: 'ideacao',
    progress: 10,
    daysInStage: 2,
  },
  {
    id: 'd5',
    name: 'Quality Assurance Bot',
    description: 'Testes automatizados de qualidade de codigo',
    owner: 'Julia Mendes',
    stage: 'homologacao',
    progress: 95,
    daysInStage: 1,
  },
  {
    id: 'd6',
    name: 'Email Classifier',
    description: 'Classificacao e roteamento inteligente de emails',
    owner: 'Lucas Almeida',
    stage: 'testes',
    progress: 78,
    daysInStage: 5,
  },
  {
    id: 'd7',
    name: 'Contract Reviewer',
    description: 'Revisao automatica de clausulas contratuais',
    owner: 'Beatriz Rocha',
    stage: 'desenvolvimento',
    progress: 40,
    daysInStage: 10,
  },
];

// Production agents
const productionAgents = [
  {
    id: 1,
    name: 'Customer Support Agent',
    description: 'Atendimento ao cliente 24/7',
    status: 'running',
    version: 'v2.3.1',
    uptime: '99.8%',
    requests24h: 1247,
    avgLatency: '1.1s',
    errorRate: 0.2,
    costPerDay: 45.30,
    lastDeployed: '2025-02-01',
    trend: 'up',
  },
  {
    id: 2,
    name: 'Sales Assistant',
    description: 'Qualificacao de leads e propostas',
    status: 'running',
    version: 'v1.8.0',
    uptime: '99.5%',
    requests24h: 523,
    avgLatency: '2.3s',
    errorRate: 0.5,
    costPerDay: 28.50,
    lastDeployed: '2025-01-28',
    trend: 'up',
  },
  {
    id: 3,
    name: 'Document Analyzer',
    description: 'Analise e extracao de documentos',
    status: 'paused',
    version: 'v1.2.0',
    uptime: '98.2%',
    requests24h: 0,
    avgLatency: '3.5s',
    errorRate: 1.2,
    costPerDay: 0,
    lastDeployed: '2025-01-15',
    trend: 'down',
  },
  {
    id: 4,
    name: 'Data Insights Agent',
    description: 'Analise de dados e relatorios',
    status: 'running',
    version: 'v3.0.0',
    uptime: '99.9%',
    requests24h: 892,
    avgLatency: '1.8s',
    errorRate: 0.1,
    costPerDay: 62.80,
    lastDeployed: '2025-02-03',
    trend: 'up',
  },
];

// Repository agents
const repositoryAgents = [
  {
    id: 'r1',
    name: 'Customer Support Agent',
    description: 'Agente completo de atendimento ao cliente com suporte multicanal',
    version: 'v2.3.1',
    category: 'Atendimento',
    timesDeployed: 12,
    lastUpdated: '2025-02-01',
  },
  {
    id: 'r2',
    name: 'Sales Assistant',
    description: 'Qualificacao de leads, geracao de propostas e follow-up automatico',
    version: 'v1.8.0',
    category: 'Vendas',
    timesDeployed: 8,
    lastUpdated: '2025-01-28',
  },
  {
    id: 'r3',
    name: 'Document Analyzer',
    description: 'Extracao de dados, classificacao e resumo de documentos',
    version: 'v1.2.0',
    category: 'Documentos',
    timesDeployed: 5,
    lastUpdated: '2025-01-15',
  },
  {
    id: 'r4',
    name: 'Data Insights Agent',
    description: 'Analise avancada de dados, geracao de relatorios e dashboards',
    version: 'v3.0.0',
    category: 'Analise',
    timesDeployed: 15,
    lastUpdated: '2025-02-03',
  },
  {
    id: 'r5',
    name: 'Onboarding Assistant',
    description: 'Automacao do processo de onboarding de novos colaboradores',
    version: 'v1.0.2',
    category: 'Operacoes',
    timesDeployed: 3,
    lastUpdated: '2024-12-20',
  },
  {
    id: 'r6',
    name: 'Fraud Detection Agent',
    description: 'Deteccao de anomalias e padroes suspeitos em transacoes',
    version: 'v2.1.0',
    category: 'Analise',
    timesDeployed: 7,
    lastUpdated: '2025-01-10',
  },
  {
    id: 'r7',
    name: 'Ticket Router',
    description: 'Classificacao e roteamento inteligente de tickets de suporte',
    version: 'v1.5.3',
    category: 'Atendimento',
    timesDeployed: 10,
    lastUpdated: '2025-01-22',
  },
  {
    id: 'r8',
    name: 'Invoice Processor',
    description: 'Processamento automatico de notas fiscais e faturas',
    version: 'v1.3.0',
    category: 'Documentos',
    timesDeployed: 6,
    lastUpdated: '2025-01-05',
  },
  {
    id: 'r9',
    name: 'Lead Scorer',
    description: 'Pontuacao e priorizacao automatica de leads comerciais',
    version: 'v2.0.1',
    category: 'Vendas',
    timesDeployed: 9,
    lastUpdated: '2025-01-18',
  },
  {
    id: 'r10',
    name: 'Scheduling Agent',
    description: 'Agendamento inteligente de reunioes e compromissos',
    version: 'v1.1.0',
    category: 'Operacoes',
    timesDeployed: 4,
    lastUpdated: '2024-12-30',
  },
];

const repositoryCategories = ['Todos', 'Atendimento', 'Analise', 'Documentos', 'Vendas', 'Operacoes'];

const statusConfig = {
  running: { label: 'Ativo', color: 'bg-status-success', badge: 'success' as const },
  paused: { label: 'Pausado', color: 'bg-status-warning', badge: 'warning' as const },
  error: { label: 'Erro', color: 'bg-status-error', badge: 'error' as const },
};

const categoryIconMap: Record<string, React.ReactNode> = {
  Atendimento: <MessageSquare className="h-4 w-4" />,
  Analise: <Activity className="h-4 w-4" />,
  Documentos: <FileSearch className="h-4 w-4" />,
  Vendas: <TrendingUp className="h-4 w-4" />,
  Operacoes: <Wrench className="h-4 w-4" />,
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function AgentFactory() {
  const [activeTab, setActiveTab] = useState('desenvolvimento');

  // Production tab state
  const [diagModalOpen, setDiagModalOpen] = useState(false);
  const [diagAgent, setDiagAgent] = useState<(typeof productionAgents)[0] | null>(null);

  // Repository tab state
  const [repoSearch, setRepoSearch] = useState('');
  const [repoCategory, setRepoCategory] = useState('Todos');
  const [repoDetailModalOpen, setRepoDetailModalOpen] = useState(false);
  const [repoDetailAgent, setRepoDetailAgent] = useState<(typeof repositoryAgents)[0] | null>(null);

  // Computed production stats
  const totalRequests = productionAgents.reduce((acc, a) => acc + a.requests24h, 0);
  const totalCost = productionAgents.reduce((acc, a) => acc + a.costPerDay, 0);
  const activeAgents = productionAgents.filter((a) => a.status === 'running').length;

  // Computed development stats
  const totalInDev = developmentAgents.length;
  const avgTimeToProd = 24; // mock average days
  const successRate = 87; // mock percentage

  // Filtered repository agents
  const filteredRepoAgents = repositoryAgents.filter((agent) => {
    const matchesSearch =
      repoSearch === '' ||
      agent.name.toLowerCase().includes(repoSearch.toLowerCase()) ||
      agent.description.toLowerCase().includes(repoSearch.toLowerCase());
    const matchesCategory = repoCategory === 'Todos' || agent.category === repoCategory;
    return matchesSearch && matchesCategory;
  });

  // Handlers
  const handleDiagnose = (agent: (typeof productionAgents)[0]) => {
    setDiagAgent(agent);
    setDiagModalOpen(true);
  };

  const handleViewRepoDetails = (agent: (typeof repositoryAgents)[0]) => {
    setRepoDetailAgent(agent);
    setRepoDetailModalOpen(true);
  };

  // Get agents for a specific pipeline stage
  const getAgentsForStage = (stageId: string) =>
    developmentAgents.filter((a) => a.stage === stageId);

  return (
    <div>
      <Header
        title="Gestao de Agentes"
        subtitle="Gerencie o ciclo de vida dos agentes de IA"
      />

      <main className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="desenvolvimento" icon={<GitBranch className="h-4 w-4" />} badge={totalInDev}>
              Em Desenvolvimento
            </TabsTrigger>
            <TabsTrigger value="producao" icon={<Server className="h-4 w-4" />} badge={activeAgents}>
              Em Producao
            </TabsTrigger>
            <TabsTrigger value="repositorio" icon={<Package className="h-4 w-4" />} badge={repositoryAgents.length}>
              Repositorio
            </TabsTrigger>
          </TabsList>

          {/* ================================================================ */}
          {/* TAB 1: EM DESENVOLVIMENTO                                        */}
          {/* ================================================================ */}
          <TabsContent value="desenvolvimento">
            {/* Dev Stats */}
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Em Desenvolvimento</p>
                      <p className="text-2xl font-bold text-text">{totalInDev}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-phase-execute-bg flex items-center justify-center">
                      <Code2 className="h-5 w-5 text-phase-execute" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Tempo Medio ate Producao</p>
                      <p className="text-2xl font-bold text-text">{avgTimeToProd} dias</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-status-warning-bg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-status-warning" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Taxa de Sucesso</p>
                      <p className="text-2xl font-bold text-status-success">{successRate}%</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-status-success-bg flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-status-success" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pipeline Kanban */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-5">
              {pipelineStages.map((stage) => {
                const stageAgents = getAgentsForStage(stage.id);
                return (
                  <div key={stage.id} className="space-y-3">
                    {/* Stage Header */}
                    <div className="flex items-center gap-2 pb-2 border-b border-surface-border">
                      <div className={cn('h-2.5 w-2.5 rounded-full', stage.color)} />
                      <span className="text-sm font-semibold text-text">{stage.label}</span>
                      <Badge variant="outline" size="sm">{stageAgents.length}</Badge>
                    </div>

                    {/* Stage Cards */}
                    <div className="space-y-3 min-h-[200px]">
                      {stageAgents.map((agent) => (
                        <Card key={agent.id} variant="interactive" className="cursor-pointer">
                          <CardContent className="p-3">
                            <div className="flex items-start gap-2 mb-2">
                              <Bot className="h-4 w-4 text-aimana-teal mt-0.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-text truncate">{agent.name}</h4>
                                <p className="text-xs text-text-secondary line-clamp-2 mt-0.5">{agent.description}</p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs text-text-muted">
                                <span>{agent.owner}</span>
                                <span>{agent.progress}%</span>
                              </div>
                              <Progress value={agent.progress} size="sm" />
                              <div className="flex items-center gap-1 text-xs text-text-muted">
                                <Clock className="h-3 w-3" />
                                <span>{agent.daysInStage}d neste estagio</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      {stageAgents.length === 0 && (
                        <div className="flex items-center justify-center h-24 border border-dashed border-surface-border rounded-lg">
                          <p className="text-xs text-text-muted">Nenhum agente</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* ================================================================ */}
          {/* TAB 2: EM PRODUCAO                                               */}
          {/* ================================================================ */}
          <TabsContent value="producao">
            {/* Production Stats Overview */}
            <div className="grid gap-4 md:grid-cols-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Agentes Ativos</p>
                      <p className="text-2xl font-bold text-text">{activeAgents}/{productionAgents.length}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-status-success-bg flex items-center justify-center">
                      <Bot className="h-5 w-5 text-status-success" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Requisicoes (24h)</p>
                      <p className="text-2xl font-bold text-text">{totalRequests.toLocaleString()}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-phase-execute-bg flex items-center justify-center">
                      <Zap className="h-5 w-5 text-phase-execute" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Uptime Medio</p>
                      <p className="text-2xl font-bold text-status-success">99.4%</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-status-success-bg flex items-center justify-center">
                      <Activity className="h-5 w-5 text-status-success" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Custo Diario</p>
                      <p className="text-2xl font-bold text-text">${totalCost.toFixed(2)}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-status-warning-bg flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-status-warning" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Agent List Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text">Agentes em Producao</h2>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-1" />
                Atualizar
              </Button>
            </div>

            {/* Agent Cards */}
            <div className="space-y-4 mb-6">
              {productionAgents.map((agent) => {
                const status = statusConfig[agent.status as keyof typeof statusConfig];
                return (
                  <Card key={agent.id} variant="interactive">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          'flex h-12 w-12 items-center justify-center rounded-xl',
                          agent.status === 'running' ? 'bg-aimana-teal/10' : 'bg-surface-light'
                        )}>
                          <Bot className={cn(
                            'h-6 w-6',
                            agent.status === 'running' ? 'text-aimana-teal' : 'text-text-muted'
                          )} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-text">{agent.name}</h3>
                              <Badge variant={status.badge}>{status.label}</Badge>
                              <Badge variant="outline" size="sm">{agent.version}</Badge>
                            </div>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>

                          <p className="text-sm text-text-secondary mb-3">{agent.description}</p>

                          <div className="grid grid-cols-5 gap-4 text-center">
                            <div>
                              <p className="text-sm font-medium text-text">{agent.requests24h.toLocaleString()}</p>
                              <p className="text-xs text-text-muted">Requisicoes</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-text">{agent.avgLatency}</p>
                              <p className="text-xs text-text-muted">Latencia</p>
                            </div>
                            <div>
                              <p className={cn(
                                'text-sm font-medium',
                                agent.errorRate < 0.5 ? 'text-status-success' : agent.errorRate < 1 ? 'text-status-warning' : 'text-status-error'
                              )}>{agent.errorRate}%</p>
                              <p className="text-xs text-text-muted">Erros</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-status-success">{agent.uptime}</p>
                              <p className="text-xs text-text-muted">Uptime</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-text">${agent.costPerDay.toFixed(2)}</p>
                              <p className="text-xs text-text-muted">Custo/dia</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-surface-border">
                            {agent.status === 'running' ? (
                              <Button variant="outline" size="sm">
                                <Pause className="h-4 w-4 mr-1" />
                                Pausar
                              </Button>
                            ) : (
                              <Button size="sm">
                                <Play className="h-4 w-4 mr-1" />
                                Iniciar
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Logs
                            </Button>
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4 mr-1" />
                              Config
                            </Button>
                            <AIActionButton
                              label="Diagnosticar"
                              action="diagnose"
                              onClick={() => handleDiagnose(agent)}
                              variant="outline"
                              size="sm"
                            />
                            <div className="flex-1" />
                            <div className="flex items-center gap-1 text-xs text-text-muted">
                              <Clock className="h-3 w-3" />
                              Deploy: {agent.lastDeployed}
                            </div>
                            {agent.trend === 'up' ? (
                              <TrendingUp className="h-4 w-4 text-status-success" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-status-error" />
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Alerts Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Alertas Ativos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-2 rounded-lg bg-status-warning-bg">
                  <AlertTriangle className="h-5 w-5 text-status-warning mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-text">Document Analyzer pausado</p>
                    <p className="text-xs text-text-secondary">Taxa de erro acima do limite</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 rounded-lg bg-status-success-bg">
                  <CheckCircle2 className="h-5 w-5 text-status-success mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-text">Todos os limites de custo OK</p>
                    <p className="text-xs text-text-secondary">Dentro do orcamento diario</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================================================================ */}
          {/* TAB 3: REPOSITORIO                                               */}
          {/* ================================================================ */}
          <TabsContent value="repositorio">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <Input
                  placeholder="Buscar agentes no repositorio..."
                  value={repoSearch}
                  onChange={(e) => setRepoSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="h-4 w-4 text-text-muted" />
                {repositoryCategories.map((cat) => (
                  <Button
                    key={cat}
                    variant={repoCategory === cat ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setRepoCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            {/* Info Banner */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-aimana-teal/10 border border-aimana-teal/20 mb-6">
              <Archive className="h-5 w-5 text-aimana-teal flex-shrink-0" />
              <p className="text-sm text-text-secondary">
                Agentes aprovados no pipeline sao adicionados automaticamente ao repositorio como templates reutilizaveis.
              </p>
            </div>

            {/* Agent Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredRepoAgents.map((agent) => (
                <Card key={agent.id} variant="interactive">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-aimana-teal/10 flex-shrink-0">
                        {categoryIconMap[agent.category] || <Bot className="h-5 w-5 text-aimana-teal" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-text truncate">{agent.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" size="sm">{agent.version}</Badge>
                          <Badge variant="execute" size="sm">{agent.category}</Badge>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-text-secondary mb-4 line-clamp-2">{agent.description}</p>

                    <div className="flex items-center justify-between text-xs text-text-muted mb-4">
                      <div className="flex items-center gap-1">
                        <Layers className="h-3 w-3" />
                        <span>{agent.timesDeployed}x implantado</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{agent.lastUpdated}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-surface-border">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Copy className="h-4 w-4 mr-1" />
                        Clonar
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewRepoDetails(agent)}>
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredRepoAgents.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-text-muted">
                  <Search className="h-10 w-10 mb-3 opacity-50" />
                  <p className="text-sm">Nenhum agente encontrado para os filtros selecionados.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* ================================================================ */}
      {/* AI MODALS                                                        */}
      {/* ================================================================ */}

      {/* Diagnose Modal for Production Agents */}
      <AIModal
        title={`Diagnosticar: ${diagAgent?.name || ''}`}
        description="Analise de saude e performance do agente"
        isOpen={diagModalOpen}
        onClose={() => {
          setDiagModalOpen(false);
          setDiagAgent(null);
        }}
        agentName="DiagnosticAgent"
        agentDescription="Analiso metricas, logs e performance dos agentes em producao"
        initialMessage={
          diagAgent
            ? `Diagnostico do **${diagAgent.name}** (${diagAgent.version}):\n\n` +
              `**Status:** ${statusConfig[diagAgent.status as keyof typeof statusConfig]?.label || diagAgent.status}\n` +
              `**Uptime:** ${diagAgent.uptime}\n` +
              `**Requisicoes (24h):** ${diagAgent.requests24h.toLocaleString()}\n` +
              `**Latencia Media:** ${diagAgent.avgLatency}\n` +
              `**Taxa de Erro:** ${diagAgent.errorRate}%\n` +
              `**Custo/dia:** $${diagAgent.costPerDay.toFixed(2)}\n\n` +
              (diagAgent.errorRate >= 1
                ? `**Alerta:** Taxa de erro elevada detectada. Recomendo investigar logs recentes.\n\nPosso analisar padroes de erro, sugerir otimizacoes ou preparar um plano de correcao.`
                : `**Saude:** Agente operando dentro dos parametros normais.\n\nPosso analisar tendencias, sugerir otimizacoes de custo ou revisar configuracoes.`)
            : undefined
        }
        suggestedPrompts={[
          'Analise os padroes de erro recentes',
          'Sugira otimizacoes de performance',
          'Compare com a baseline do mes anterior',
          'Prepare um relatorio de saude completo',
        ]}
      />

      {/* Repository Detail Modal */}
      <AIModal
        title={`Detalhes: ${repoDetailAgent?.name || ''}`}
        description="Informacoes completas do template de agente"
        isOpen={repoDetailModalOpen}
        onClose={() => {
          setRepoDetailModalOpen(false);
          setRepoDetailAgent(null);
        }}
        agentName="RepositoryAgent"
        agentDescription="Forneco informacoes detalhadas sobre templates de agentes"
        initialMessage={
          repoDetailAgent
            ? `**${repoDetailAgent.name}** (${repoDetailAgent.version})\n\n` +
              `**Categoria:** ${repoDetailAgent.category}\n` +
              `**Descricao:** ${repoDetailAgent.description}\n` +
              `**Vezes implantado:** ${repoDetailAgent.timesDeployed}\n` +
              `**Ultima atualizacao:** ${repoDetailAgent.lastUpdated}\n\n` +
              `Posso ajudar a clonar este agente, personalizar configuracoes ou comparar com outros templates.`
            : undefined
        }
        suggestedPrompts={[
          'Quais configuracoes posso personalizar?',
          'Compare com outros agentes da mesma categoria',
          'Quais sao os pre-requisitos para implantacao?',
          'Sugira melhorias para este template',
        ]}
      />
    </div>
  );
}
