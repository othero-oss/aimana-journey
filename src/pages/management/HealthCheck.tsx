/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Health Check Page
 * Monitoramento de saúde das iniciativas de IA
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
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Bot,
  Send,
  RefreshCw,
  Server,
  Database,
  Zap,
  Shield,
  Eye,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
    lastIncident: null,
    alerts: [],
  },
  {
    id: 2,
    name: 'Sales Assistant',
    status: 'warning',
    uptime: 99.2,
    latency: 2.8,
    errorRate: 0.8,
    throughput: 28,
    lastIncident: '2025-02-03',
    alerts: ['Latência acima do SLA'],
  },
  {
    id: 3,
    name: 'Document Analyzer',
    status: 'critical',
    uptime: 85.5,
    latency: 5.2,
    errorRate: 3.5,
    throughput: 5,
    lastIncident: '2025-02-04',
    alerts: ['Taxa de erro crítica', 'Throughput baixo'],
  },
  {
    id: 4,
    name: 'Data Insights Agent',
    status: 'healthy',
    uptime: 99.9,
    latency: 1.5,
    errorRate: 0.1,
    throughput: 45,
    lastIncident: null,
    alerts: [],
  },
];

// System health
const systemHealth = [
  { name: 'API Gateway', status: 'healthy', uptime: 99.99 },
  { name: 'Vector Database', status: 'healthy', uptime: 99.95 },
  { name: 'LLM Providers', status: 'warning', uptime: 99.5 },
  { name: 'Trust Layer', status: 'healthy', uptime: 100 },
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
];

const statusConfig = {
  healthy: { label: 'Saudável', color: 'text-status-success', bg: 'bg-status-success', icon: CheckCircle2 },
  warning: { label: 'Atenção', color: 'text-status-warning', bg: 'bg-status-warning', icon: AlertTriangle },
  critical: { label: 'Crítico', color: 'text-status-error', bg: 'bg-status-error', icon: XCircle },
};

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export function HealthCheck() {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Olá! Sou o **HealthAgent**. Status atual do sistema:

**Resumo:**
✅ 2 agentes saudáveis
⚠️ 1 agente com atenção
❌ 1 agente crítico

**Alerta Crítico:**
🔴 Document Analyzer com taxa de erro de 3.5%

**Recomendação imediata:**
Pausar o Document Analyzer e investigar causa raiz.

Posso gerar um relatório detalhado?`,
    },
  ]);

  const healthyCount = healthMetrics.filter((m) => m.status === 'healthy').length;
  const warningCount = healthMetrics.filter((m) => m.status === 'warning').length;
  const criticalCount = healthMetrics.filter((m) => m.status === 'critical').length;

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: 'user' as const, content: chatInput }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content: `**Diagnóstico do Document Analyzer:**

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
- Custo adicional: ~$50/mês

Deseja que eu aplique o fix automaticamente?`,
        },
      ]);
    }, 1500);
  };

  return (
    <div>
      <Header
        title="Health Check"
        subtitle="Monitoramento de saúde das iniciativas de IA"
      />

      <main className="p-6">
        {/* Status Overview */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card className="border-l-4 border-l-status-success">
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
          <Card className="border-l-4 border-l-status-error">
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
                  <p className="text-3xl font-bold text-text">
                    {(healthMetrics.reduce((acc, m) => acc + m.uptime, 0) / healthMetrics.length).toFixed(1)}%
                  </p>
                </div>
                <Activity className="h-8 w-8 text-aimana-teal" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Agent Health */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text">Saúde dos Agentes</h2>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-1" />
                Atualizar
              </Button>
            </div>

            <div className="space-y-4">
              {healthMetrics.map((agent) => {
                const status = statusConfig[agent.status as keyof typeof statusConfig];
                return (
                  <Card key={agent.id} variant="interactive" className={cn(
                    'border-l-4',
                    agent.status === 'healthy' && 'border-l-status-success',
                    agent.status === 'warning' && 'border-l-status-warning',
                    agent.status === 'critical' && 'border-l-status-error'
                  )}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            'flex h-10 w-10 items-center justify-center rounded-lg',
                            agent.status === 'healthy' && 'bg-status-success-bg',
                            agent.status === 'warning' && 'bg-status-warning-bg',
                            agent.status === 'critical' && 'bg-status-error-bg'
                          )}>
                            <status.icon className={cn('h-5 w-5', status.color)} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-text">{agent.name}</h3>
                            <Badge variant={agent.status === 'healthy' ? 'success' : agent.status === 'warning' ? 'warning' : 'error'}>
                              {status.label}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Detalhes
                          </Button>
                          <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center p-2 rounded-lg bg-surface-light">
                          <p className={cn(
                            'text-lg font-bold',
                            agent.uptime >= 99 ? 'text-status-success' : agent.uptime >= 95 ? 'text-status-warning' : 'text-status-error'
                          )}>{agent.uptime}%</p>
                          <p className="text-xs text-text-muted">Uptime</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-surface-light">
                          <p className={cn(
                            'text-lg font-bold',
                            agent.latency <= 2 ? 'text-status-success' : agent.latency <= 3 ? 'text-status-warning' : 'text-status-error'
                          )}>{agent.latency}s</p>
                          <p className="text-xs text-text-muted">Latência</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-surface-light">
                          <p className={cn(
                            'text-lg font-bold',
                            agent.errorRate < 1 ? 'text-status-success' : agent.errorRate < 2 ? 'text-status-warning' : 'text-status-error'
                          )}>{agent.errorRate}%</p>
                          <p className="text-xs text-text-muted">Erro</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-surface-light">
                          <p className="text-lg font-bold text-text">{agent.throughput}/h</p>
                          <p className="text-xs text-text-muted">Throughput</p>
                        </div>
                      </div>

                      {agent.alerts.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-surface-border">
                          <div className="flex flex-wrap gap-2">
                            {agent.alerts.map((alert, idx) => (
                              <Badge key={idx} variant="error" size="sm">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                {alert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recent Incidents */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Incidentes Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentIncidents.map((incident) => (
                    <div
                      key={incident.id}
                      className={cn(
                        'flex items-start gap-3 p-3 rounded-lg',
                        incident.status === 'open' ? 'bg-status-error-bg' : 'bg-surface-light'
                      )}
                    >
                      <div className={cn(
                        'mt-0.5',
                        incident.severity === 'high' && 'text-status-error',
                        incident.severity === 'medium' && 'text-status-warning',
                        incident.severity === 'low' && 'text-text-muted'
                      )}>
                        {incident.status === 'open' ? (
                          <XCircle className="h-4 w-4" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4 text-status-success" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-text text-sm">{incident.agent}</span>
                          <Badge variant={incident.status === 'open' ? 'error' : 'success'} size="sm">
                            {incident.status === 'open' ? 'Aberto' : 'Resolvido'}
                          </Badge>
                        </div>
                        <p className="text-sm text-text-secondary">{incident.description}</p>
                        <p className="text-xs text-text-muted mt-1">{incident.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Chat */}
            <Card>
              <CardHeader className="border-b border-surface-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-aimana-teal">
                    <Bot className="h-5 w-5 text-aimana-navy" />
                  </div>
                  <div>
                    <CardTitle className="text-base">HealthAgent</CardTitle>
                    <CardDescription>Diagnóstico de saúde</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-64 overflow-y-auto p-4 space-y-3 scrollbar-thin">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={cn(
                        'rounded-lg px-3 py-2 text-sm',
                        msg.role === 'user'
                          ? 'bg-aimana-navy text-white ml-8'
                          : 'bg-surface-light text-text mr-4'
                      )}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-surface-border p-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Pergunte sobre a saúde..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                      inputSize="sm"
                    />
                    <Button size="sm" onClick={handleChatSend}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Infraestrutura</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {systemHealth.map((system, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        'w-2 h-2 rounded-full',
                        system.status === 'healthy' ? 'bg-status-success' : 'bg-status-warning'
                      )} />
                      <span className="text-sm text-text">{system.name}</span>
                    </div>
                    <span className="text-xs text-text-muted">{system.uptime}%</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-header text-white">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Ações Rápidas</h3>
                <div className="space-y-2 text-sm">
                  <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10 justify-start">
                    <Server className="h-4 w-4 mr-2" />
                    Reiniciar Agente
                  </Button>
                  <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10 justify-start">
                    <Database className="h-4 w-4 mr-2" />
                    Limpar Cache
                  </Button>
                  <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10 justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Rollback Versão
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
