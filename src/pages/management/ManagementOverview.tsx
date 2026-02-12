/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Management Zone Overview
 * Hub limpo com KPIs e acesso direto às 3 subpáginas
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
  ArrowRight,
  Shield,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const kpis = [
  { label: 'ROI Total', value: 'R$ 285k', change: '+23%', trend: 'up', icon: DollarSign },
  { label: 'Horas Economizadas', value: '1.240h', change: '+156h', trend: 'up', icon: TrendingUp },
  { label: 'Agentes Ativos', value: '8', change: '+2', trend: 'up', icon: Bot },
  { label: 'Health Score', value: '87%', change: '-3%', trend: 'down', icon: Activity },
];

export function ManagementOverview() {
  return (
    <div>
      <Header
        title="Gerir"
        subtitle="Monitore operações, acompanhe resultados e gere relatórios"
      />

      <main className="p-6">
        {/* Overview */}
        <Card className="mb-6 border-l-4 border-l-phase-manage">
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-text">Management Zone</h2>
                <p className="mt-1 text-text-secondary">
                  Acompanhe a saúde das implementações, resultados de negócio e compliance
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <Badge variant="manage">Fase 3</Badge>
                  <span className="text-sm text-text-muted">8 implementações monitoradas</span>
                </div>
              </div>
              <Link to="/management/reports">
                <Button variant="secondary">
                  <FileText className="h-4 w-4 mr-2" />
                  Relatórios
                </Button>
              </Link>
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
                    <p className={`mt-1 text-xs flex items-center gap-1 ${kpi.trend === 'up' ? 'text-status-success' : 'text-status-error'}`}>
                      {kpi.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
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

        {/* 3 Module Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          {/* Centro de Excelência */}
          <Link to="/management/excellence">
            <Card variant="interactive" className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-phase-manage-bg">
                    <Shield className="h-5 w-5 text-phase-manage" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Centro de Excelência</CardTitle>
                    <CardDescription>Governança, padrões e melhores práticas</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Compliance</span>
                  <span className="font-medium text-status-success">92%</span>
                </div>
                <Progress value={92} size="sm" variant="success" className="mt-2" />
                <div className="flex items-center justify-between mt-4 text-xs text-text-muted">
                  <span>12 políticas ativas</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Operações */}
          <Link to="/management/operations">
            <Card variant="interactive" className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-phase-manage-bg">
                    <Activity className="h-5 w-5 text-phase-manage" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Operações</CardTitle>
                    <CardDescription>Monitoramento e incidentes</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-3">
                  <Badge variant="success" size="sm">3 rodando</Badge>
                  <Badge variant="warning" size="sm">1 atenção</Badge>
                  <Badge variant="error" size="sm">1 crítico</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Uptime médio</span>
                  <span className="font-medium text-text">94.4%</span>
                </div>
                <Progress value={94} size="sm" className="mt-2" />
                <div className="flex items-center justify-between mt-4 text-xs text-text-muted">
                  <span>2 incidentes abertos</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Relatórios */}
          <Link to="/management/reports">
            <Card variant="interactive" className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-phase-manage-bg">
                    <FileText className="h-5 w-5 text-phase-manage" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Relatórios</CardTitle>
                    <CardDescription>Operacionais, negócio e sprint</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Gerados este mês</span>
                    <span className="font-medium text-text">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Agendados</span>
                    <span className="font-medium text-text">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Pendentes revisão</span>
                    <span className="font-medium text-status-warning">3</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 text-xs text-text-muted">
                  <span>ROI, Maturidade, Sprint...</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Alert */}
        <Card className="border-status-warning bg-status-warning-bg">
          <CardContent>
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-status-warning mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-text">Atenção Necessária</h4>
                <p className="mt-1 text-sm text-text-secondary">
                  2 implementações requerem revisão. O "Copilot de Vendas" está com uptime abaixo de 80%.
                </p>
                <Link to="/management/operations">
                  <Button variant="outline" size="sm" className="mt-3">
                    Ver Operações
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
