/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Management Zone Overview
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
  BarChart3,
  Activity,
  DollarSign,
  FileText,
  TrendingUp,
  TrendingDown,
  Bot,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data
const kpis = [
  {
    label: 'ROI Total',
    value: 'R$ 285k',
    change: '+23%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    label: 'Horas Economizadas',
    value: '1.240h',
    change: '+156h',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    label: 'Agentes Ativos',
    value: '8',
    change: '+2',
    trend: 'up',
    icon: Bot,
  },
  {
    label: 'Health Score',
    value: '87%',
    change: '-3%',
    trend: 'down',
    icon: Activity,
  },
];

const agents = [
  {
    name: 'Assistente de Triagem',
    area: 'Comercial',
    status: 'healthy',
    uptime: 99.9,
    requests: '12.3k',
    roi: 'R$ 45k',
  },
  {
    name: 'Gerador de Relatórios',
    area: 'Financeiro',
    status: 'healthy',
    uptime: 99.5,
    requests: '8.7k',
    roi: 'R$ 62k',
  },
  {
    name: 'Bot de Atendimento',
    area: 'CS',
    status: 'warning',
    uptime: 94.2,
    requests: '45.2k',
    roi: 'R$ 98k',
  },
  {
    name: 'Análise de Contratos',
    area: 'Jurídico',
    status: 'healthy',
    uptime: 99.8,
    requests: '2.1k',
    roi: 'R$ 35k',
  },
  {
    name: 'Copilot de Vendas',
    area: 'Comercial',
    status: 'critical',
    uptime: 78.5,
    requests: '5.4k',
    roi: 'R$ 28k',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'healthy':
      return 'bg-status-success';
    case 'warning':
      return 'bg-status-warning';
    case 'critical':
      return 'bg-status-error';
    default:
      return 'bg-status-pending';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'healthy':
      return <Badge variant="success" dot>Saudável</Badge>;
    case 'warning':
      return <Badge variant="warning" dot>Atenção</Badge>;
    case 'critical':
      return <Badge variant="error" dot>Crítico</Badge>;
    default:
      return <Badge variant="pending" dot>Pendente</Badge>;
  }
};

export function ManagementOverview() {
  const healthyCount = agents.filter((a) => a.status === 'healthy').length;
  const warningCount = agents.filter((a) => a.status === 'warning').length;
  const criticalCount = agents.filter((a) => a.status === 'critical').length;

  return (
    <div>
      <Header
        title="Gerir"
        subtitle="Management Zone - Monitoramento, ROI e relatórios"
      />

      <main className="p-6">
        {/* Overview Card */}
        <Card className="mb-6 border-l-4 border-l-phase-manage">
          <CardContent>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-text">Management Zone</h2>
                <p className="mt-1 text-text-secondary">
                  Monitore a saúde dos agentes, track de ROI e gere relatórios executivos
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <Badge variant="manage">Fase 3</Badge>
                  <span className="text-sm text-text-muted">
                    {agents.length} agentes monitorados
                  </span>
                </div>
              </div>
              <Button variant="secondary">
                <FileText className="h-4 w-4 mr-2" />
                Gerar Relatório
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          {kpis.map((kpi) => (
            <Card key={kpi.label}>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">{kpi.label}</p>
                    <p className="mt-1 text-2xl font-bold text-text">{kpi.value}</p>
                    <p
                      className={`mt-1 text-xs flex items-center gap-1 ${
                        kpi.trend === 'up' ? 'text-status-success' : 'text-status-error'
                      }`}
                    >
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {kpi.change} vs. mês anterior
                    </p>
                  </div>
                  <div className="rounded-lg bg-phase-manage-bg p-2">
                    <kpi.icon className="h-5 w-5 text-phase-manage" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Agents Health */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Health Check de Agentes</CardTitle>
                    <CardDescription>
                      Monitoramento em tempo real dos agentes em produção
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="success">{healthyCount} saudáveis</Badge>
                    {warningCount > 0 && (
                      <Badge variant="warning">{warningCount} atenção</Badge>
                    )}
                    {criticalCount > 0 && (
                      <Badge variant="error">{criticalCount} crítico</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-surface-border text-left">
                        <th className="pb-3 text-xs font-medium text-text-muted">Agente</th>
                        <th className="pb-3 text-xs font-medium text-text-muted">Área</th>
                        <th className="pb-3 text-xs font-medium text-text-muted">Status</th>
                        <th className="pb-3 text-xs font-medium text-text-muted">Uptime</th>
                        <th className="pb-3 text-xs font-medium text-text-muted">Requests</th>
                        <th className="pb-3 text-xs font-medium text-text-muted">ROI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-border">
                      {agents.map((agent) => (
                        <tr key={agent.name} className="hover:bg-surface-hover">
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <Bot className="h-4 w-4 text-text-muted" />
                              <span className="text-sm font-medium text-text">
                                {agent.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className="text-sm text-text-secondary">{agent.area}</span>
                          </td>
                          <td className="py-3">{getStatusBadge(agent.status)}</td>
                          <td className="py-3">
                            <span
                              className={`text-sm font-medium ${
                                agent.uptime >= 99 ? 'text-status-success' :
                                agent.uptime >= 95 ? 'text-status-warning' : 'text-status-error'
                              }`}
                            >
                              {agent.uptime}%
                            </span>
                          </td>
                          <td className="py-3">
                            <span className="text-sm text-text">{agent.requests}</span>
                          </td>
                          <td className="py-3">
                            <span className="text-sm font-medium text-status-success">
                              {agent.roi}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <Link to="/management/portfolio">
              <Card variant="interactive">
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-phase-manage-bg">
                      <BarChart3 className="h-5 w-5 text-phase-manage" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-text">Portfolio Dashboard</h4>
                      <p className="text-sm text-text-secondary">Visão geral de projetos</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-text-muted" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/management/roi">
              <Card variant="interactive">
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-status-success-bg">
                      <DollarSign className="h-5 w-5 text-status-success" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-text">ROI Tracker</h4>
                      <p className="text-sm text-text-secondary">Métricas de valor</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-text-muted" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/management/reports">
              <Card variant="interactive">
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-aimana-blue/10">
                      <FileText className="h-5 w-5 text-aimana-blue" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-text">Relatórios Executivos</h4>
                      <p className="text-sm text-text-secondary">Para C-level e board</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-text-muted" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Alert Card */}
            <Card className="border-status-warning bg-status-warning-bg">
              <CardContent>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-status-warning mt-0.5" />
                  <div>
                    <h4 className="font-medium text-text">Atenção Necessária</h4>
                    <p className="mt-1 text-sm text-text-secondary">
                      2 agentes requerem revisão. O "Copilot de Vendas" está com uptime abaixo de 80%.
                    </p>
                    <Button variant="outline" size="sm" className="mt-3">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
