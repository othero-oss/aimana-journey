/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Execution Zone Overview
 * Foco: Construir, testar e escalar soluções de IA
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { Header } from '@/components/layout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Progress,
  Button,
} from '@/components/ui';
import {
  FlaskConical,
  ArrowRight,
  Bot,
  Cpu,
  Layers,
  Activity,
  Rocket,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const executionStats = [
  { label: 'Implementações Ativas', value: '8', icon: Layers, color: 'text-status-success' },
  { label: 'Em Desenvolvimento', value: '5', icon: Cpu, color: 'text-status-info' },
  { label: 'Sessões Sandbox', value: '234', icon: FlaskConical, color: 'text-aimana-teal' },
  { label: 'Agentes em Produção', value: '5', icon: Bot, color: 'text-aimana-blue' },
];

const recentActivity = [
  { action: 'Agente "Assistente RH" promovido para produção', time: '2h atrás', status: 'success' as const },
  { action: 'Nova versão do "Sales Agent" em teste no Sandbox', time: '5h atrás', status: 'warning' as const },
  { action: 'Modelo ML "Lead Scorer" concluiu treinamento', time: '6h atrás', status: 'info' as const },
  { action: 'Automação "Invoice Processor" em homologação', time: '1d atrás', status: 'info' as const },
  { action: 'Template "Chatbot Suporte" adicionado ao repositório', time: '1d atrás', status: 'success' as const },
];

export function ExecutionOverview() {
  return (
    <div>
      <Header
        title="Executar"
        subtitle="Construa, teste e escale suas soluções de IA"
      />

      <main className="p-6">
        {/* Overview Card */}
        <Card className="mb-6 border-l-4 border-l-phase-execute">
          <CardContent>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-text">Execution Zone</h2>
                <p className="mt-1 text-text-secondary">
                  Prototipe, teste e coloque em produção suas soluções de IA
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <Badge variant="execute">Fase 2</Badge>
                  <span className="text-sm text-text-muted">
                    8 implementações ativas &middot; 5 em desenvolvimento
                  </span>
                </div>
              </div>
              <Link to="/execution/sandbox">
                <Button variant="primary">
                  <FlaskConical className="h-4 w-4 mr-2" />
                  Abrir AI Sandbox
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Execution Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          {executionStats.map((stat) => (
            <Card key={stat.label}>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-phase-execute-bg">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text">{stat.value}</p>
                    <p className="text-xs text-text-secondary">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modules Grid - 2 modules */}
        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          {/* AI Sandbox */}
          <Link to="/execution/sandbox">
            <Card variant="interactive" className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-phase-execute-bg">
                      <FlaskConical className="h-6 w-6 text-aimana-teal" />
                    </div>
                    <div>
                      <CardTitle>AI Sandbox</CardTitle>
                      <CardDescription>Experimentação, prototipação e testes</CardDescription>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-text-muted" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text-secondary mb-4">
                  Ambiente unificado para experimentar com modelos de IA, construir agentes
                  a partir de templates e testar soluções antes de colocar em produção.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <p className="text-2xl font-bold text-aimana-teal">234</p>
                    <p className="text-xs text-text-muted">Sessões</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-aimana-teal">16</p>
                    <p className="text-xs text-text-muted">Templates</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-aimana-teal">3</p>
                    <p className="text-xs text-text-muted">Modelos</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" size="sm">Experimentar</Badge>
                  <Badge variant="outline" size="sm">Agent Studio</Badge>
                  <Badge variant="outline" size="sm">Construir</Badge>
                  <Badge variant="outline" size="sm">Testar</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Implementações IA */}
          <Link to="/execution/implementations">
            <Card variant="interactive" className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-phase-execute-bg">
                      <Rocket className="h-6 w-6 text-aimana-teal" />
                    </div>
                    <div>
                      <CardTitle>Implementações IA</CardTitle>
                      <CardDescription>Gestão do ciclo de vida completo</CardDescription>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-text-muted" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text-secondary mb-4">
                  Gerencie todas as implementações de IA: agentes, assistentes, modelos ML
                  e automações. Pipeline de desenvolvimento até produção.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <p className="text-2xl font-bold text-status-success">8</p>
                    <p className="text-xs text-text-muted">Ativas</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-status-info">5</p>
                    <p className="text-xs text-text-muted">Pipeline</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-muted">12</p>
                    <p className="text-xs text-text-muted">Templates</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                    <span>Pipeline de produção</span>
                    <span>62%</span>
                  </div>
                  <Progress value={62} size="sm" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-aimana-teal" />
              <CardTitle>Atividade Recente</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-surface-light">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-border">
                    {item.status === 'success' ? (
                      <CheckCircle2 className="h-4 w-4 text-status-success" />
                    ) : item.status === 'warning' ? (
                      <AlertTriangle className="h-4 w-4 text-status-warning" />
                    ) : (
                      <Clock className="h-4 w-4 text-status-info" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text">{item.action}</p>
                  </div>
                  <span className="text-xs text-text-muted">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
