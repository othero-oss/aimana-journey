/**
 * ===============================================================================
 * AIMANA JOURNEY - Operações & Monitoramento
 * Consolidação de HealthCheck + Reports
 *
 * Abas:
 * - Monitoramento: Status em tempo real dos agentes
 * - Incidentes: Timeline de incidentes e severidade
 * - Relatórios: Templates e geração de relatórios
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
  Activity,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Pause,
  Play,
  RefreshCw,
  Server,
  Cpu,
  MemoryStick,
  Network,
  FileText,
  Download,
  Calendar,
  Filter,
  Search,
  Settings,
  Eye,
  Bell,
  BellOff,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  ChevronRight,
  Timer,
  Zap,
  DollarSign,
  BarChart3,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// DADOS MOCK
// ============================================================================

const agents = [
  {
    id: 1,
    name: 'Email Triage Bot',
    status: 'running',
    uptime: 99.9,
    latency: 120,
    requestsPerMin: 45,
    errorsToday: 2,
    costToday: 12.50,
    lastUpdate: '2 min atrás',
    area: 'Comercial',
    version: 'v2.1.3',
  },
  {
    id: 2,
    name: 'Customer Support Agent',
    status: 'running',
    uptime: 99.5,
    latency: 250,
    requestsPerMin: 120,
    errorsToday: 8,
    costToday: 45.80,
    lastUpdate: '1 min atrás',
    area: 'Customer Success',
    version: 'v1.4.0',
  },
  {
    id: 3,
    name: 'Financial Analyzer',
    status: 'warning',
    uptime: 98.2,
    latency: 450,
    requestsPerMin: 15,
    errorsToday: 25,
    costToday: 8.20,
    lastUpdate: '5 min atrás',
    area: 'Financeiro',
    version: 'v1.0.2',
  },
  {
    id: 4,
    name: 'Contract Reviewer',
    status: 'paused',
    uptime: 0,
    latency: 0,
    requestsPerMin: 0,
    errorsToday: 0,
    costToday: 0,
    lastUpdate: '2 dias atrás',
    area: 'Jurídico',
    version: 'v0.9.1',
  },
];

const incidents = [
  {
    id: 1,
    title: 'Alta latência no Customer Support Agent',
    description: 'Latência acima de 500ms detectada entre 14:00 e 14:30',
    agent: 'Customer Support Agent',
    severity: 'medium',
    status: 'resolved',
    startTime: '2025-02-11 14:00',
    endTime: '2025-02-11 14:30',
    duration: '30 min',
    rootCause: 'Sobrecarga no endpoint de API externa',
    resolution: 'Implementado cache de respostas frequentes',
  },
  {
    id: 2,
    title: 'Erros de parsing no Financial Analyzer',
    description: 'Formato de dados não reconhecido em 25 requisições',
    agent: 'Financial Analyzer',
    severity: 'high',
    status: 'investigating',
    startTime: '2025-02-11 09:15',
    endTime: null,
    duration: null,
    rootCause: 'Em investigação',
    resolution: null,
  },
  {
    id: 3,
    title: 'Agente Contract Reviewer pausado',
    description: 'Agente pausado manualmente para manutenção',
    agent: 'Contract Reviewer',
    severity: 'low',
    status: 'acknowledged',
    startTime: '2025-02-09 10:00',
    endTime: null,
    duration: null,
    rootCause: 'Manutenção programada',
    resolution: 'Aguardando aprovação de nova versão',
  },
];

const reportTemplates = [
  { id: 1, name: 'Relatório Executivo Semanal', description: 'Resumo de métricas para liderança', frequency: 'Semanal', format: 'PDF', lastGenerated: '2025-02-07' },
  { id: 2, name: 'Status Mensal de Agentes', description: 'Performance e health check de todos os agentes', frequency: 'Mensal', format: 'PDF/Excel', lastGenerated: '2025-01-31' },
  { id: 3, name: 'ROI Trimestral', description: 'Análise de retorno sobre investimento', frequency: 'Trimestral', format: 'PPT', lastGenerated: '2025-01-15' },
  { id: 4, name: 'Incidentes da Semana', description: 'Timeline de incidentes e resoluções', frequency: 'Semanal', format: 'PDF', lastGenerated: '2025-02-07' },
];

const statusConfig = {
  running: { label: 'Rodando', color: 'text-status-success', bg: 'bg-status-success-bg', icon: CheckCircle2 },
  warning: { label: 'Atenção', color: 'text-status-warning', bg: 'bg-status-warning-bg', icon: AlertTriangle },
  paused: { label: 'Pausado', color: 'text-text-muted', bg: 'bg-surface-light', icon: Pause },
  error: { label: 'Erro', color: 'text-status-error', bg: 'bg-status-error-bg', icon: XCircle },
};

const severityConfig = {
  critical: { label: 'Crítico', color: 'text-white', bg: 'bg-status-error', icon: XCircle },
  high: { label: 'Alto', color: 'text-status-error', bg: 'bg-status-error-bg', icon: AlertTriangle },
  medium: { label: 'Médio', color: 'text-status-warning', bg: 'bg-status-warning-bg', icon: AlertCircle },
  low: { label: 'Baixo', color: 'text-aimana-teal', bg: 'bg-aimana-teal/10', icon: Bell },
};

const incidentStatusConfig = {
  resolved: { label: 'Resolvido', color: 'text-status-success', bg: 'bg-status-success-bg' },
  investigating: { label: 'Investigando', color: 'text-status-warning', bg: 'bg-status-warning-bg' },
  acknowledged: { label: 'Reconhecido', color: 'text-aimana-teal', bg: 'bg-aimana-teal/10' },
  open: { label: 'Aberto', color: 'text-status-error', bg: 'bg-status-error-bg' },
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export function Operations() {
  const [activeTab, setActiveTab] = useState('monitoring');
  const [selectedAgent, setSelectedAgent] = useState<typeof agents[0] | null>(null);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [showReportModal, setShowReportModal] = useState(false);

  // Cálculos
  const runningCount = agents.filter(a => a.status === 'running').length;
  const warningCount = agents.filter(a => a.status === 'warning').length;
  const pausedCount = agents.filter(a => a.status === 'paused').length;
  const totalCostToday = agents.reduce((acc, a) => acc + a.costToday, 0);
  const avgUptime = agents.filter(a => a.status === 'running' || a.status === 'warning').reduce((acc, a) => acc + a.uptime, 0) / (runningCount + warningCount) || 0;
  const totalRequests = agents.reduce((acc, a) => acc + a.requestsPerMin, 0);

  const openIncidents = incidents.filter(i => i.status !== 'resolved').length;

  const tabs = [
    { id: 'monitoring', label: 'Monitoramento', icon: <Activity className="h-4 w-4" /> },
    { id: 'incidents', label: 'Incidentes', icon: <AlertTriangle className="h-4 w-4" />, badge: openIncidents > 0 ? openIncidents.toString() : undefined },
    { id: 'reports', label: 'Relatórios', icon: <FileText className="h-4 w-4" /> },
  ];

  const handleAIMessage = async (message: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return `Analisando "${message}"...

**Análise Operacional:**

Com base nos dados atuais dos agentes:

- **${runningCount} agentes** rodando normalmente
- **${warningCount} agentes** necessitam atenção
- **Uptime médio:** ${avgUptime.toFixed(1)}%
- **Custo total hoje:** R$ ${totalCostToday.toFixed(2)}

**Recomendações:**
1. Investigar erros no Financial Analyzer
2. Aprovar nova versão do Contract Reviewer
3. Monitorar latência do Customer Support

Como posso ajudar?`;
  };

  return (
    <div>
      <Header
        title="Operações & Monitoramento"
        subtitle="Acompanhe o status e performance dos agentes em produção"
      />

      <main className="p-6 space-y-6">
        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* ================================================================ */}
        {/* ABA 1: MONITORAMENTO */}
        {/* ================================================================ */}
        <TabsContent value="monitoring" activeTab={activeTab}>
          <div className="space-y-6">
            {/* KPIs de Monitoramento */}
            <div className="grid gap-4 md:grid-cols-5">
              <Card className="border-l-4 border-l-status-success">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Rodando</p>
                      <p className="text-3xl font-bold text-status-success">{runningCount}</p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-status-success" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-status-warning">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Atenção</p>
                      <p className="text-3xl font-bold text-status-warning">{warningCount}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-status-warning" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-aimana-teal">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Uptime Médio</p>
                      <p className="text-3xl font-bold text-text">{avgUptime.toFixed(1)}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-aimana-teal" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-phase-execute">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Req/min</p>
                      <p className="text-3xl font-bold text-text">{totalRequests}</p>
                    </div>
                    <Zap className="h-8 w-8 text-phase-execute" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-phase-plan">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Custo Hoje</p>
                      <p className="text-2xl font-bold text-text">R$ {totalCostToday.toFixed(0)}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-phase-plan" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de Agentes */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Status dos Agentes</CardTitle>
                    <CardDescription>Monitoramento em tempo real</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Atualizar
                    </Button>
                    <AIActionButton
                      label="Análise"
                      onClick={() => setShowReportModal(true)}
                      size="sm"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agents.map((agent) => {
                    const status = statusConfig[agent.status as keyof typeof statusConfig];
                    const StatusIcon = status.icon;
                    return (
                      <div
                        key={agent.id}
                        className={cn(
                          'p-4 rounded-lg border transition-all cursor-pointer',
                          selectedAgent?.id === agent.id ? 'border-aimana-teal ring-1 ring-aimana-teal/30' : 'border-surface-border hover:border-aimana-teal/50'
                        )}
                        onClick={() => setSelectedAgent(agent)}
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn('p-3 rounded-lg', status.bg)}>
                            <StatusIcon className={cn('h-6 w-6', status.color)} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-semibold text-text">{agent.name}</h3>
                              <Badge variant={agent.status === 'running' ? 'success' : agent.status === 'warning' ? 'warning' : 'secondary'}>
                                {status.label}
                              </Badge>
                              <Badge variant="outline" size="sm">{agent.version}</Badge>
                            </div>
                            <p className="text-sm text-text-muted">{agent.area} • Atualizado {agent.lastUpdate}</p>
                          </div>
                          <div className="grid grid-cols-5 gap-6 text-center">
                            <div>
                              <p className={cn(
                                'text-lg font-bold',
                                agent.uptime >= 99.5 ? 'text-status-success' : agent.uptime >= 98 ? 'text-status-warning' : 'text-status-error'
                              )}>{agent.uptime}%</p>
                              <p className="text-xs text-text-muted">Uptime</p>
                            </div>
                            <div>
                              <p className={cn(
                                'text-lg font-bold',
                                agent.latency < 200 ? 'text-status-success' : agent.latency < 400 ? 'text-status-warning' : 'text-status-error'
                              )}>{agent.latency}ms</p>
                              <p className="text-xs text-text-muted">Latência</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-text">{agent.requestsPerMin}</p>
                              <p className="text-xs text-text-muted">Req/min</p>
                            </div>
                            <div>
                              <p className={cn(
                                'text-lg font-bold',
                                agent.errorsToday === 0 ? 'text-status-success' : agent.errorsToday < 10 ? 'text-status-warning' : 'text-status-error'
                              )}>{agent.errorsToday}</p>
                              <p className="text-xs text-text-muted">Erros</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-text">R${agent.costToday.toFixed(0)}</p>
                              <p className="text-xs text-text-muted">Custo</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {agent.status !== 'paused' ? (
                              <Button variant="ghost" size="sm" title="Pausar">
                                <Pause className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button variant="ghost" size="sm" title="Iniciar">
                                <Play className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" title="Logs">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Configurar">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Alertas Ativos */}
            {warningCount > 0 && (
              <Card className="border-status-warning">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2 text-status-warning">
                    <AlertTriangle className="h-5 w-5" />
                    Alertas Ativos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {agents.filter(a => a.status === 'warning').map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between p-3 rounded-lg bg-status-warning-bg mb-2">
                      <div>
                        <p className="font-medium text-text">{agent.name}</p>
                        <p className="text-sm text-text-muted">{agent.errorsToday} erros, latência {agent.latency}ms</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Investigar
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* ================================================================ */}
        {/* ABA 2: INCIDENTES */}
        {/* ================================================================ */}
        <TabsContent value="incidents" activeTab={activeTab}>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Filtros */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <select
                    value={filterSeverity}
                    onChange={(e) => setFilterSeverity(e.target.value)}
                    className="text-sm border border-surface-border rounded-lg px-3 py-2 bg-white"
                  >
                    <option value="all">Todas as severidades</option>
                    <option value="critical">Crítico</option>
                    <option value="high">Alto</option>
                    <option value="medium">Médio</option>
                    <option value="low">Baixo</option>
                  </select>
                </div>
                <Button size="sm">
                  <Bell className="h-4 w-4 mr-1" />
                  Configurar Alertas
                </Button>
              </div>

              {/* Timeline de Incidentes */}
              <Card>
                <CardHeader>
                  <CardTitle>Timeline de Incidentes</CardTitle>
                  <CardDescription>{incidents.length} incidentes registrados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-surface-light" />
                    <div className="space-y-6">
                      {incidents.map((incident) => {
                        const severity = severityConfig[incident.severity as keyof typeof severityConfig];
                        const incidentStatus = incidentStatusConfig[incident.status as keyof typeof incidentStatusConfig];
                        const SeverityIcon = severity.icon;
                        return (
                          <div key={incident.id} className="relative pl-10">
                            <div className={cn(
                              'absolute left-0 w-8 h-8 rounded-full flex items-center justify-center',
                              severity.bg
                            )}>
                              <SeverityIcon className={cn('h-4 w-4', severity.color)} />
                            </div>
                            <Card className={cn('border-l-4', incident.status === 'resolved' ? 'border-l-status-success' : incident.status === 'investigating' ? 'border-l-status-warning' : 'border-l-aimana-teal')}>
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h4 className="font-semibold text-text">{incident.title}</h4>
                                    <p className="text-sm text-text-muted">{incident.agent}</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge className={cn(severity.bg, severity.color)}>
                                      {severity.label}
                                    </Badge>
                                    <Badge className={cn(incidentStatus.bg, incidentStatus.color)}>
                                      {incidentStatus.label}
                                    </Badge>
                                  </div>
                                </div>
                                <p className="text-sm text-text-secondary mb-3">{incident.description}</p>
                                <div className="flex items-center gap-4 text-xs text-text-muted">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {incident.startTime}
                                  </span>
                                  {incident.duration && (
                                    <span className="flex items-center gap-1">
                                      <Timer className="h-3 w-3" />
                                      Duração: {incident.duration}
                                    </span>
                                  )}
                                </div>
                                {incident.rootCause && (
                                  <div className="mt-3 pt-3 border-t border-surface-border">
                                    <p className="text-xs text-text-muted"><strong>Root Cause:</strong> {incident.rootCause}</p>
                                    {incident.resolution && (
                                      <p className="text-xs text-text-muted"><strong>Resolução:</strong> {incident.resolution}</p>
                                    )}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Resumo */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Resumo de Incidentes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">Abertos</span>
                    <Badge variant="error">{openIncidents}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">Resolvidos (7d)</span>
                    <Badge variant="success">{incidents.filter(i => i.status === 'resolved').length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">MTTR médio</span>
                    <span className="text-sm font-medium text-text">25 min</span>
                  </div>
                </CardContent>
              </Card>

              {/* Por Severidade */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Por Severidade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Object.entries(severityConfig).map(([key, config]) => {
                    const count = incidents.filter(i => i.severity === key).length;
                    const Icon = config.icon;
                    return (
                      <div key={key} className={cn('flex items-center justify-between p-2 rounded-lg', config.bg)}>
                        <div className="flex items-center gap-2">
                          <Icon className={cn('h-4 w-4', config.color)} />
                          <span className="text-sm text-text">{config.label}</span>
                        </div>
                        <span className="font-medium text-text">{count}</span>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ================================================================ */}
        {/* ABA 3: RELATÓRIOS */}
        {/* ================================================================ */}
        <TabsContent value="reports" activeTab={activeTab}>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Templates de Relatório */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Templates de Relatório</CardTitle>
                      <CardDescription>Gere relatórios com um clique ou agende</CardDescription>
                    </div>
                    <AIActionButton
                      label="Gerar com IA"
                      icon={<Sparkles className="h-4 w-4" />}
                      onClick={() => setShowReportModal(true)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {reportTemplates.map((template) => (
                      <div key={template.id} className="p-4 rounded-lg border border-surface-border hover:border-aimana-teal/50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-surface-light">
                            <FileText className="h-5 w-5 text-aimana-navy" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-text">{template.name}</h4>
                            <p className="text-sm text-text-muted mb-2">{template.description}</p>
                            <div className="flex items-center gap-3 text-xs text-text-muted">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {template.frequency}
                              </span>
                              <Badge variant="outline" size="sm">{template.format}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm" className="flex-1">
                            <Download className="h-4 w-4 mr-1" />
                            Gerar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Relatórios Recentes */}
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {reportTemplates.slice(0, 3).map((template) => (
                      <div key={template.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-light">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-aimana-navy" />
                          <div>
                            <p className="text-sm font-medium text-text">{template.name}</p>
                            <p className="text-xs text-text-muted">Gerado em {template.lastGenerated}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Agendar Relatório */}
              <Card className="bg-gradient-header text-white">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Agendar Envio
                  </h3>
                  <p className="text-sm text-white/80 mb-4">
                    Configure relatórios automáticos para serem enviados por email.
                  </p>
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                    Configurar Agendamento
                  </Button>
                </CardContent>
              </Card>

              {/* Exportação Rápida */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Exportação Rápida</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Métricas de Hoje (CSV)
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Logs de Incidentes (JSON)
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Dashboard Completo (PDF)
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* AI Insights Banner - No final */}
          <AIInsightBanner
            title="Análise Operacional"
            insights={[
              `${runningCount} agentes rodando com uptime médio de ${avgUptime.toFixed(1)}%`,
              `${openIncidents} incidente(s) em aberto requerem atenção`,
              `Custo operacional hoje: R$ ${totalCostToday.toFixed(2)}`,
            ]}
            onAnalyze={() => setShowReportModal(true)}
            className="mt-6"
          />
        </TabsContent>
      </main>

      {/* AI Report Modal */}
      <AIModal
        title="Assistente de Relatórios"
        description="Gere relatórios personalizados com ajuda da IA"
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        agentName="Report Assistant"
        agentDescription="Especialista em análise e geração de relatórios"
        initialMessage={`Olá! Posso ajudar a gerar relatórios personalizados.

**Dados disponíveis:**
- ${agents.length} agentes monitorados
- ${runningCount} em produção, ${warningCount} com alertas
- ${incidents.length} incidentes registrados
- Uptime médio: ${avgUptime.toFixed(1)}%

**O que posso fazer:**
- Gerar relatório executivo
- Analisar tendências de performance
- Comparar métricas entre períodos
- Investigar incidentes específicos

Qual relatório você precisa?`}
        suggestedPrompts={[
          'Relatório executivo semanal',
          'Análise de incidentes',
          'Performance por agente',
          'Projeção de custos',
        ]}
        onSendMessage={handleAIMessage}
      />
    </div>
  );
}
