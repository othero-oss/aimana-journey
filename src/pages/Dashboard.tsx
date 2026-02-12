/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Dashboard Page
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { Header } from '@/components/layout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
  Progress,
  JourneyProgress,
} from '@/components/ui';
import {
  Lightbulb,
  Rocket,
  BarChart3,
  TrendingUp,
  Users,
  BrainCircuit,
  ArrowRight,
  Sparkles,
  Target,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data
const stats = [
  {
    label: 'Maturidade IA',
    value: '42%',
    change: '+8%',
    icon: Target,
    color: 'text-aimana-teal',
    bgColor: 'bg-aimana-teal/10',
  },
  {
    label: 'Oportunidades Mapeadas',
    value: '24',
    change: '+5',
    icon: Lightbulb,
    color: 'text-aimana-blue',
    bgColor: 'bg-aimana-blue/10',
  },
  {
    label: 'Agentes Ativos',
    value: '8',
    change: '+2',
    icon: BrainCircuit,
    color: 'text-phase-execute',
    bgColor: 'bg-phase-execute-bg',
  },
  {
    label: 'ROI Estimado',
    value: 'R$ 120k',
    change: '+15%',
    icon: TrendingUp,
    color: 'text-status-success',
    bgColor: 'bg-status-success-bg',
  },
];

const recentActivities = [
  {
    title: 'Diagnóstico de Maturidade concluído',
    description: 'Score: 42/100 - 3 dimensões precisam de atenção',
    time: '2h atrás',
    phase: 'plan' as const,
  },
  {
    title: 'Novo agente em produção',
    description: 'Assistente de Triagem de E-mails - Área: Comercial',
    time: '5h atrás',
    phase: 'execute' as const,
  },
  {
    title: 'ROI atualizado',
    description: 'Economia de 120h/mês identificada no processo de relatórios',
    time: '1d atrás',
    phase: 'manage' as const,
  },
  {
    title: 'Nova ideia submetida',
    description: 'Automação de onboarding de clientes - Área: CS',
    time: '2d atrás',
    phase: 'plan' as const,
  },
];

const quickActions = [
  {
    title: 'Iniciar Diagnóstico',
    description: 'Avalie a maturidade de IA da sua empresa',
    href: '/planning/maturity',
    icon: Target,
    color: 'bg-phase-plan',
  },
  {
    title: 'Mapear Oportunidades',
    description: 'Identifique onde IA pode gerar valor',
    href: '/planning/opportunities',
    icon: Lightbulb,
    color: 'bg-aimana-blue',
  },
  {
    title: 'Abrir AI Sandbox',
    description: 'Experimente IA em ambiente seguro',
    href: '/execution/sandbox',
    icon: Sparkles,
    color: 'bg-aimana-teal',
  },
  {
    title: 'Submeter Ideia',
    description: 'Proponha uma nova aplicação de IA',
    href: '/planning/ideas',
    icon: BrainCircuit,
    color: 'bg-aimana-navy',
  },
];

export function Dashboard() {
  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Visão geral da sua jornada AI-First"
      />

      <main className="p-6">
        {/* Journey Progress */}
        <Card className="mb-6">
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-text">Sua Jornada AI-First</h3>
                <p className="text-sm text-text-secondary">Progresso geral nas 3 fases</p>
              </div>
              <Badge variant="primary" className="text-sm">
                Fase: Planejar
              </Badge>
            </div>
            <JourneyProgress currentPhase={1} value={25} size="lg" />
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">{stat.label}</p>
                    <p className="mt-1 text-2xl font-bold text-text">{stat.value}</p>
                    <p className="mt-1 text-xs text-status-success">
                      {stat.change} vs. mês anterior
                    </p>
                  </div>
                  <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-text">Ações Rápidas</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {quickActions.map((action) => (
                <Link key={action.href} to={action.href}>
                  <Card variant="interactive" className="h-full">
                    <CardContent>
                      <div className="flex items-start gap-4">
                        <div className={`rounded-lg p-2.5 ${action.color}`}>
                          <action.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-text">{action.title}</h4>
                          <p className="mt-1 text-sm text-text-secondary">
                            {action.description}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-text-muted" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-text">Atividade Recente</h3>
            <Card>
              <CardContent className="p-0">
                <ul className="divide-y divide-surface-border">
                  {recentActivities.map((activity, index) => (
                    <li key={index} className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-1 h-2 w-2 rounded-full ${
                            activity.phase === 'plan'
                              ? 'bg-phase-plan'
                              : activity.phase === 'execute'
                              ? 'bg-phase-execute'
                              : 'bg-phase-manage'
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text truncate">
                            {activity.title}
                          </p>
                          <p className="mt-0.5 text-xs text-text-secondary line-clamp-2">
                            {activity.description}
                          </p>
                          <p className="mt-1 text-xs text-text-muted flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Phase Cards */}
        <h3 className="mt-8 mb-4 text-lg font-semibold text-text">Módulos da Jornada</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Planejar */}
          <Link to="/planning">
            <Card variant="interactive" className="h-full border-l-4 border-l-phase-plan">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-phase-plan-bg">
                    <Lightbulb className="h-5 w-5 text-phase-plan" />
                  </div>
                  <div>
                    <CardTitle>Planejar</CardTitle>
                    <CardDescription>Planning Zone</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• Diagnóstico de Maturidade</li>
                  <li>• Mapeamento de Oportunidades</li>
                  <li>• Estratégia de IA</li>
                  <li>• Governança</li>
                </ul>
                <div className="mt-4">
                  <Progress value={65} variant="secondary" size="sm" />
                  <p className="mt-1 text-xs text-text-muted">65% completo</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Executar */}
          <Link to="/execution">
            <Card variant="interactive" className="h-full border-l-4 border-l-phase-execute">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-phase-execute-bg">
                    <Rocket className="h-5 w-5 text-aimana-teal" />
                  </div>
                  <div>
                    <CardTitle>Executar</CardTitle>
                    <CardDescription>Execution Zone</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• AI Sandbox</li>
                  <li>• Implementações IA</li>
                </ul>
                <div className="mt-4">
                  <Progress value={30} variant="primary" size="sm" />
                  <p className="mt-1 text-xs text-text-muted">30% completo</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Gerir */}
          <Link to="/management">
            <Card variant="interactive" className="h-full border-l-4 border-l-phase-manage">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-phase-manage-bg">
                    <BarChart3 className="h-5 w-5 text-phase-manage" />
                  </div>
                  <div>
                    <CardTitle>Gerir</CardTitle>
                    <CardDescription>Management Zone</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>• Centro de Excelência</li>
                  <li>• Operações</li>
                  <li>• Relatórios</li>
                </ul>
                <div className="mt-4">
                  <Progress value={15} variant="navy" size="sm" />
                  <p className="mt-1 text-xs text-text-muted">15% completo</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
