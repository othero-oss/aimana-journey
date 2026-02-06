/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Health Check Page
 * Monitoramento de saúde das iniciativas de IA
 * Layout full-width com IA contextual via botões e modais
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
  Activity,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Bot,
  RefreshCw,
  Server,
  Database,
  Zap,
  Shield,
  Eye,
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  FileText,
  Filter,
  Search,
  Cpu,
  HardDrive,
  Wifi,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AIInsightBanner, AIActionButton, AIModal } from '@/components/ai';

// Health metrics
const healthMetrics = [
  {
    id: 1,
    name: 'Customer Support Agent',
    status: 'healthy',
    uptime: 99.8,
    latency: 1.1,
    errorRate: 0.2,
    throughput: 52,
    requests24h: 1248,
    avgResponseTime: 1.1,
    lastIncident: null,
    alerts: [],
    version: '2.1.0',
    model: 'GPT-4',
    memory: 68,
    cpu: 45,
  },
  {
    id: 2,
    name: 'Sales Assistant',
    status: 'warning',
    uptime: 99.2,
    latency: 2.8,
    errorRate: 0.8,
    throughput: 28,
    requests24h: 672,
    avgResponseTime: 2.8,
    lastIncident: '2025-02-03',
    alerts: ['Latência acima do SLA'],
    version: '1.8.3',
    model: 'Claude 3',
    memory: 72,
    cpu: 58,
  },
  {
    id: 3,
    name: 'Document Analyzer',
    status: 'critical',
    uptime: 85.5,
    latency: 5.2,
    errorRate: 3.5,
    throughput: 5,
    requests24h: 120,
    avgResponseTime: 5.2,
    lastIncident: '2025-02-04',
    alerts: ['Taxa de erro crítica', 'Throughput baixo'],
    version: '1.5.2',
    model: 'GPT-4',
    memory: 92,
    cpu: 88,
  },
  {
    id: 4,
    name: 'Data Insights Agent',
    status: 'healthy',
    uptime: 99.9,
    latency: 1.5,
    errorRate: 0.1,
    throughput: 45,
    requests24h: 1080,
    avgResponseTime: 1.5,
    lastIncident: null,
    alerts: [],
    version: '3.0.1',
    model: 'Claude 3.5',
    memory: 55,
    cpu: 38,
  },
  {
    id: 5,
    name: 'Report Generator',
    status: 'healthy',
    uptime: 99.7,
    latency: 2.1,
    errorRate: 0.3,
    throughput: 18,
    requests24h: 432,
    avgResponseTime: 2.1,
    lastIncident: null,
    alerts: [],
    version: '2.0.0',
    model: 'GPT-4',
    memory: 61,
    cpu: 42,
  },
];

// System health
const systemHealth = [
  { name: 'API Gateway', status: 'healthy', uptime: 99.99, icon: Wifi },
  { name: 'Vector Database', status: 'healthy', uptime: 99.95, icon: Database },
  { name: 'LLM Providers', status: 'warning', uptime: 99.5, icon: Cpu },
  { name: 'Trust Layer', status: 'healthy', uptime: 100, icon: Shield },
  { name: 'Storage', status: 'healthy', uptime: 99.98, icon: HardDrive },
];

// Incidents
const recentIncidents = [
  {
    id: 1,
    agent: 'Document Analyzer',
    type: 'error_spike',
    description: 'Taxa de erro excedeu 3%',
    timestamp: '2025-02-04 14:30',
    status: 'open',
    severity: 'high',
  },
  {
    id: 2,
    agent: 'Sales Assistant',
    type: 'latency',
    description: 'Latência p95 acima de 3s por 15min',
    timestamp: '2025-02-03 09:15',
    status: 'resolved',
    severity: 'medium',
  },
  {
    id: 3,
    agent: 'Customer Support',
    type: 'throughput',
    description: 'Pico de requisições - auto-scaling ativado',
    timestamp: '2025-02-01 18:45',
    status: 'resolved',
    severity: 'low',
  },
  {
    id: 4,
    agent: 'Data Insights Agent',
    type: 'maintenance',
    description: 'Atualização de modelo concluída',
    timestamp: '2025-01-30 02:00',
    status: 'resolved',
    severity: 'low',
  },
];

const statusConfig = {
  healthy: { label: 'Saudável', color: 'text-status-success', bg: 'bg-status-success', icon: CheckCircle2 },
  warning: { label: 'Atenção', color: 'text-status-warning', bg: 'bg-status-warning', icon: AlertTriangle },
  critical: { label: 'Crítico', color: 'text-status-error', bg: 'bg-status-error', icon: XCircle },
};

// AI Insights
const aiInsights = [
  {
    id: '1',
    type: 'warning' as const,
    title: 'Agente Crítico Detectado',
    description: 'Document Analyzer com taxa de erro de 3.5% - requer atenção imediata. Padrão: 80% dos erros com PDFs > 50 páginas.',
    action: {
      label: 'Diagnosticar',
      onClick: () => {},
    },
  },
  {
    id: '2',
    type: 'info' as const,
    title: 'Otimização Disponível',
    description: 'Sales Assistant pode reduzir latência em 40% com ajuste de cache.',
  },
];

export function HealthCheck() {
  const [statusFilter, setStatusFilter] = useState<'all' | 'healthy' | 'warning' | 'critical'>('all');
  const [showDiagnosticModal, setShowDiagnosticModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<typeof healthMetrics[0] | null>(null);
  const [insightsDismissed, setInsightsDismissed] = useState<string[]>([]);

  const healthyCount = healthMetrics.filter((m) => m.status === 'healthy').length;
  const warningCount = healthMetrics.filter((m) => m.status === 'warning').length;
  const criticalCount = healthMetrics.filter((m) => m.status === 'critical').length;
  const avgUptime = (healthMetrics.reduce((acc, m) => acc + m.uptime, 0) / healthMetrics.length).toFixed(1);
  const totalRequests = healthMetrics.reduce((acc, m) => acc + m.requests24h, 0);

  const filteredAgents = healthMetrics.filter(
    (agent) => statusFilter === 'all' || agent.status === statusFilter
  );

  const handleDiagnose = (agent: typeof healthMetrics[0]) => {
    setSelectedAgent(agent);
    setShowDiagnosticModal(true);
  };

  const handleAIMessage = async (message: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (selectedAgent?.status === 'critical') {
      return `**Diagnóstico do ${selectedAgent.name}:**

**Análise de logs (últimas 24h):**
- 127 erros de timeout
- 45 erros de parsing
- 12 erros de memória

**Padrão identificado:**
80% dos erros ocorrem com documentos PDF > 50 páginas

**Causa provável:**
Limite de memória insuficiente para documentos grandes

**Ações sugeridas:**
1. Aumentar limite de memória (4GB → 8GB)
2. Implementar chunking de documentos
3. Adicionar validação de tamanho no input

**Impacto estimado:**
- Redução de 70% nos erros
- Custo adicional: ~$50/mês`;
    }

    return `Analisando "${message}" para ${selectedAgent?.name || 'o sistema'}...

Os logs indicam operação normal. Métricas dentro dos parâmetros esperados.

**Recomendações de manutenção preventiva:**
- Verificar limites de rate limiting
- Revisar políticas de retry
- Monitorar tendências de latência`;
  };

  const visibleInsights = aiInsights.filter((i) => !insightsDismissed.includes(i.id));

  return (
    <div>
      <Header
        title="Health Check"
        subtitle="Monitoramento de saúde das iniciativas de IA"
      />

      <main className="p-6 space-y-6">
        {/* AI Insights Banner */}
        {visibleInsights.length > 0 && (
          <AIInsightBanner
            insights={visibleInsights}
            onDismiss={(id) => setInsightsDismissed((prev) => [...prev, id])}
          />
        )}

        {/* Status Overview */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card
            className={cn(
              "border-l-4 border-l-status-success cursor-pointer transition-all",
              statusFilter === 'healthy' && "ring-2 ring-status-success"
            )}
            onClick={() => setStatusFilter(statusFilter === 'healthy' ? 'all' : 'healthy')}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">Saudáveis</p>
                  <p className="text-3xl font-bold text-status-success">{healthyCount}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-status-success" />
              </div>
            </CardContent>
          </Card>

          <Card
            className={cn(
              "border-l-4 border-l-status-warning cursor-pointer transition-all",
              statusFilter === 'warning' && "ring-2 ring-status-warning"
            )}
            onClick={() => setStatusFilter(statusFilter === 'warning' ? 'all' : 'warning')}
          >
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

          <Card
            className={cn(
              "border-l-4 border-l-status-error cursor-pointer transition-all",
              statusFilter === 'critical' && "ring-2 ring-status-error"
            )}
            onClick={() => setStatusFilter(statusFilter === 'critical' ? 'all' : 'critical')}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">Críticos</p>
                  <p className="text-3xl font-bold text-status-error">{criticalCount}</p>
                </div>
                <XCircle className="h-8 w-8 text-status-error" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">Uptime Médio</p>
                  <p className="text-3xl font-bold text-text">{avgUptime}%</p>
                </div>
                <Activity className="h-8 w-8 text-aimana-teal" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">Requisições 24h</p>
                  <p className="text-3xl font-bold text-text">{totalRequests.toLocaleString()}</p>
                </div>
                <Zap className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Agent Health - Full Width */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-text">Saúde dos Agentes</h2>
                {statusFilter !== 'all' && (
                  <Badge variant="outline" className="cursor-pointer" onClick={() => setStatusFilter('all')}>
                    Filtro: {statusConfig[statusFilter].label}
                    <XCircle className="h-3 w-3 ml-1" />
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <AIActionButton
                  label="Diagnóstico Geral"
                  action="diagnose"
                  onClick={() => {
                    setSelectedAgent(null);
                    setShowDiagnosticModal(true);
                  }}
                  variant="outline"
                  size="sm"
                />
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Atualizar
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredAgents.map((agent) => {
                const status = statusConfig[agent.status as keyof typeof statusConfig];
                return (
                  <Card
                    key={agent.id}
                    variant="interactive"
                    className={cn(
                      'border-l-4',
                      agent.status === 'healthy' && 'border-l-status-success',
                      agent.status === 'warning' && 'border-l-status-warning',
                      agent.status === 'critical' && 'border-l-status-error'
                    )}
                  >
                    <CardContent className="p-4">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            'flex h-10 w-10 items-center justify-center rounded-lg',
                            agent.status === 'healthy' && 'bg-status-success-bg',
                            agent.status === 'warning' && 'bg-status-warning-bg',
                            agent.status === 'critical' && 'bg-status-error-bg'
                          )}>
                            <Bot className={cn('h-5 w-5', status.color)} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-text">{agent.name}</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                              <Badge
                                variant={
                                  agent.status === 'healthy' ? 'success' :
                                  agent.status === 'warning' ? 'warning' : 'error'
                                }
                                size="sm"
                              >
                                {status.label}
                              </Badge>
                              <span className="text-xs text-text-muted">v{agent.version}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        <div className="text-center p-2 rounded-lg bg-surface-light">
                          <p className={cn(
                            'text-sm font-bold',
                            agent.uptime >= 99 ? 'text-status-success' :
                            agent.uptime >= 95 ? 'text-status-warning' : 'text-status-error'
                          )}>{agent.uptime}%</p>
                          <p className="text-[10px] text-text-muted">Uptime</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-surface-light">
                          <p className={cn(
                            'text-sm font-bold',
                            agent.latency <= 2 ? 'text-status-success' :
                            agent.latency <= 3 ? 'text-status-warning' : 'text-status-error'
                          )}>{agent.latency}s</p>
                          <p className="text-[10px] text-text-muted">Latência</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-surface-light">
                          <p className={cn(
                            'text-sm font-bold',
                            agent.errorRate < 1 ? 'text-status-success' :
                            agent.errorRate < 2 ? 'text-status-warning' : 'text-status-error'
                          )}>{agent.errorRate}%</p>
                          <p className="text-[10px] text-text-muted">Erros</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-surface-light">
                          <p className="text-sm font-bold text-text">{agent.throughput}/h</p>
                          <p className="text-[10px] text-text-muted">Throughput</p>
                        </div>
                      </div>

                      {/* Resource Usage */}
                      <div className="flex items-center gap-4 mb-4 text-xs">
                        <div className="flex items-center gap-2 flex-1">
                          <Cpu className="h-3 w-3 text-text-muted" />
                          <div className="flex-1 h-1.5 bg-surface-light rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                agent.cpu > 80 ? "bg-status-error" :
                                agent.cpu > 60 ? "bg-status-warning" : "bg-status-success"
                              )}
                              style={{ width: `${agent.cpu}%` }}
                            />
                          </div>
                          <span className="text-text-muted">{agent.cpu}%</span>
                        </div>
                        <div className="flex items-center gap-2 flex-1">
                          <HardDrive className="h-3 w-3 text-text-muted" />
                          <div className="flex-1 h-1.5 bg-surface-light rounded-full overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                agent.memory > 80 ? "bg-status-error" :
                                agent.memory > 60 ? "bg-status-warning" : "bg-status-success"
                              )}
                              style={{ width: `${agent.memory}%` }}
                            />
                          </div>
                          <span className="text-text-muted">{agent.memory}%</span>
                        </div>
                      </div>

                      {/* Alerts */}
                      {agent.alerts.length > 0 && (
                        <div className="mb-4 p-2 rounded-lg bg-status-error-bg">
                          <div className="flex flex-wrap gap-1">
                            {agent.alerts.map((alert, idx) => (
                              <span key={idx} className="text-xs text-status-error flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                {alert}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-3 border-t border-surface-border">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          Logs
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          {agent.status === 'critical' ? (
                            <>
                              <Pause className="h-3 w-3 mr-1" />
                              Pausar
                            </>
                          ) : (
                            <>
                              <RotateCcw className="h-3 w-3 mr-1" />
                              Reiniciar
                            </>
                          )}
                        </Button>
                        <AIActionButton
                          label="Diagnóstico"
                          action="diagnose"
                          onClick={() => handleDiagnose(agent)}
                          variant="outline"
                          size="sm"
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Health */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Server className="h-4 w-4 text-aimana-teal" />
                  Infraestrutura
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {systemHealth.map((system, idx) => {
                  const Icon = system.icon;
                  return (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          'w-2 h-2 rounded-full',
                          system.status === 'healthy' ? 'bg-status-success' : 'bg-status-warning'
                        )} />
                        <Icon className="h-3.5 w-3.5 text-text-muted" />
                        <span className="text-sm text-text">{system.name}</span>
                      </div>
                      <span className={cn(
                        'text-xs font-medium',
                        system.uptime >= 99.9 ? 'text-status-success' :
                        system.uptime >= 99 ? 'text-status-warning' : 'text-status-error'
                      )}>{system.uptime}%</span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Recent Incidents */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-status-warning" />
                  Incidentes Recentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {recentIncidents.slice(0, 4).map((incident) => (
                  <div
                    key={incident.id}
                    className={cn(
                      'p-2 rounded-lg text-xs',
                      incident.status === 'open' ? 'bg-status-error-bg' : 'bg-surface-light'
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-text">{incident.agent}</span>
                      <div className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        incident.status === 'open' ? 'bg-status-error' : 'bg-status-success'
                      )} />
                    </div>
                    <p className="text-text-secondary line-clamp-1">{incident.description}</p>
                    <p className="text-text-muted mt-1">{incident.timestamp}</p>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  Ver todos os incidentes
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-header text-white">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Ações Rápidas
                </h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-white/30 text-white hover:bg-white/10 justify-start"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reiniciar Todos
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-white/30 text-white hover:bg-white/10 justify-start"
                  >
                    <Database className="h-4 w-4 mr-2" />
                    Limpar Cache Global
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-white/30 text-white hover:bg-white/10 justify-start"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Exportar Relatório
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* AI Diagnostic Modal */}
      <AIModal
        title={selectedAgent ? `Diagnóstico: ${selectedAgent.name}` : 'Diagnóstico Geral'}
        description={selectedAgent
          ? `Análise detalhada de saúde e performance`
          : 'Análise completa do sistema de agentes'
        }
        isOpen={showDiagnosticModal}
        onClose={() => {
          setShowDiagnosticModal(false);
          setSelectedAgent(null);
        }}
        agentName="HealthAgent"
        agentDescription="Especialista em diagnóstico e otimização de agentes de IA"
        initialMessage={selectedAgent
          ? `Analisando ${selectedAgent.name}...

**Status atual:** ${statusConfig[selectedAgent.status as keyof typeof statusConfig].label}
**Uptime:** ${selectedAgent.uptime}%
**Taxa de erro:** ${selectedAgent.errorRate}%
**Latência média:** ${selectedAgent.latency}s

${selectedAgent.alerts.length > 0
  ? `**Alertas ativos:**\n${selectedAgent.alerts.map(a => `⚠️ ${a}`).join('\n')}\n\n`
  : ''}Como posso ajudar no diagnóstico?`
          : `**Resumo do Sistema:**

✅ ${healthyCount} agentes saudáveis
⚠️ ${warningCount} agentes com atenção
❌ ${criticalCount} agentes críticos

**Uptime médio:** ${avgUptime}%
**Requisições 24h:** ${totalRequests.toLocaleString()}

${criticalCount > 0 ? '**Ação recomendada:** Investigar agentes críticos imediatamente.' : ''}

O que você gostaria de analisar?`
        }
        suggestedPrompts={selectedAgent ? [
          'Analisar logs de erro',
          'Identificar causa raiz',
          'Sugerir otimizações',
          'Gerar relatório completo',
        ] : [
          'Diagnóstico de agentes críticos',
          'Análise de tendências',
          'Recomendações de otimização',
          'Relatório de saúde geral',
        ]}
        onSendMessage={handleAIMessage}
      />
    </div>
  );
}
