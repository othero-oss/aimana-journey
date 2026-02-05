/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Agent Factory Page
 * Ambiente de produção para agentes aprovados
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
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
    description: 'Qualificação de leads e propostas',
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
    description: 'Análise e extração de documentos',
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
    description: 'Análise de dados e relatórios',
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

// Deployment queue
const deploymentQueue = [
  { name: 'HR Assistant', status: 'testing', progress: 85, eta: '2 dias' },
  { name: 'Inventory Agent', status: 'review', progress: 60, eta: '5 dias' },
];

const statusConfig = {
  running: { label: 'Ativo', color: 'bg-status-success', badge: 'success' as const },
  paused: { label: 'Pausado', color: 'bg-status-warning', badge: 'warning' as const },
  error: { label: 'Erro', color: 'bg-status-error', badge: 'error' as const },
};

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export function AgentFactory() {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Olá! Sou o **FactoryAgent**. Monitoro seus agentes em produção.

**Status atual:**
✅ 3 agentes ativos
⏸️ 1 agente pausado
📈 1,770 requisições nas últimas 24h

**Alertas:**
⚠️ Document Analyzer pausado por taxa de erro

Posso ajudar com deploy, rollback ou análise?`,
    },
  ]);

  const totalRequests = productionAgents.reduce((acc, a) => acc + a.requests24h, 0);
  const totalCost = productionAgents.reduce((acc, a) => acc + a.costPerDay, 0);
  const activeAgents = productionAgents.filter((a) => a.status === 'running').length;

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: 'user' as const, content: chatInput }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content: `Análise do **Document Analyzer**:

**Causa raiz identificada:**
O agente foi pausado automaticamente após exceder 1% de taxa de erro por 30 minutos.

**Diagnóstico:**
- Erro mais comum: Timeout em documentos > 50 páginas
- 12 de 15 erros envolveram PDFs complexos

**Recomendações:**
1. Aumentar timeout para documentos grandes
2. Implementar chunking de documentos
3. Adicionar retry logic

Deseja que eu prepare um hotfix?`,
        },
      ]);
    }, 1500);
  };

  return (
    <div>
      <Header
        title="Agent Factory"
        subtitle="Gerencie agentes em produção"
      />

      <main className="p-6">
        {/* Stats Overview */}
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
                  <p className="text-sm text-text-muted">Requisições (24h)</p>
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
                  <p className="text-sm text-text-muted">Uptime Médio</p>
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
                  <p className="text-sm text-text-muted">Custo Diário</p>
                  <p className="text-2xl font-bold text-text">${totalCost.toFixed(2)}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-status-warning-bg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-status-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Agents List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text">Agentes em Produção</h2>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-1" />
                Atualizar
              </Button>
            </div>

            <div className="space-y-4">
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
                              <p className="text-xs text-text-muted">Requisições</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-text">{agent.avgLatency}</p>
                              <p className="text-xs text-text-muted">Latência</p>
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

            {/* Deployment Queue */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Fila de Deploy</CardTitle>
                <CardDescription>Agentes aguardando produção</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {deploymentQueue.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-surface-light">
                    <Bot className="h-5 w-5 text-text-muted" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-text">{item.name}</span>
                        <Badge variant={item.status === 'testing' ? 'execute' : 'warning'}>{item.status}</Badge>
                      </div>
                      <Progress value={item.progress} size="sm" />
                    </div>
                    <span className="text-xs text-text-muted">ETA: {item.eta}</span>
                  </div>
                ))}
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
                    <CardTitle className="text-base">FactoryAgent</CardTitle>
                    <CardDescription>Operações e monitoramento</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-72 overflow-y-auto p-4 space-y-3 scrollbar-thin">
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
                      placeholder="Pergunte sobre os agentes..."
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

            {/* Alerts */}
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
                    <p className="text-xs text-text-secondary">Dentro do orçamento diário</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-header text-white">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Ações Rápidas</h3>
                <div className="space-y-2 text-sm">
                  <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10 justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Verificar Trust Layer
                  </Button>
                  <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10 justify-start">
                    <Server className="h-4 w-4 mr-2" />
                    Status da Infraestrutura
                  </Button>
                  <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10 justify-start">
                    <Activity className="h-4 w-4 mr-2" />
                    Dashboard de Métricas
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
