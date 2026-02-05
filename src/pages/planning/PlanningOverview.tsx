/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Planning Zone Overview
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
  Target,
  Lightbulb,
  Database,
  Shield,
  Wrench,
  ArrowRight,
  CheckCircle2,
  Circle,
  PlayCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const modules = [
  {
    id: 'strategy',
    title: 'AI Strategy Hub',
    description: 'Defina a visão e estratégia de IA alinhada com a liderança',
    icon: Target,
    href: '/planning/strategy',
    status: 'completed' as const,
    progress: 100,
  },
  {
    id: 'maturity',
    title: 'Diagnóstico de Maturidade',
    description: 'Avalie o nível de maturidade de IA por dimensão',
    icon: Target,
    href: '/planning/maturity',
    status: 'in_progress' as const,
    progress: 65,
    agent: 'MaturityDiagnosticAgent',
  },
  {
    id: 'opportunities',
    title: 'Mapeamento de Oportunidades',
    description: 'Identifique e priorize oportunidades de aplicação de IA',
    icon: Lightbulb,
    href: '/planning/opportunities',
    status: 'in_progress' as const,
    progress: 40,
    agent: 'OpportunityMiningAgent',
  },
  {
    id: 'data-readiness',
    title: 'Data Readiness',
    description: 'Avalie a prontidão dos dados para iniciativas de IA',
    icon: Database,
    href: '/planning/data-readiness',
    status: 'pending' as const,
    progress: 0,
    agent: 'DataReadinessAgent',
  },
  {
    id: 'governance',
    title: 'Governança & Stack',
    description: 'Configure políticas de uso e stack de ferramentas de IA',
    icon: Shield,
    href: '/planning/governance',
    status: 'pending' as const,
    progress: 0,
    agent: 'GovernanceCopilot',
  },
];

const getStatusIcon = (status: 'completed' | 'in_progress' | 'pending') => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="h-5 w-5 text-status-success" />;
    case 'in_progress':
      return <PlayCircle className="h-5 w-5 text-aimana-blue" />;
    case 'pending':
      return <Circle className="h-5 w-5 text-text-muted" />;
  }
};

const getStatusBadge = (status: 'completed' | 'in_progress' | 'pending') => {
  switch (status) {
    case 'completed':
      return <Badge variant="success">Concluído</Badge>;
    case 'in_progress':
      return <Badge variant="info">Em Andamento</Badge>;
    case 'pending':
      return <Badge variant="pending">Pendente</Badge>;
  }
};

export function PlanningOverview() {
  const completedCount = modules.filter((m) => m.status === 'completed').length;
  const totalProgress = Math.round(
    modules.reduce((acc, m) => acc + m.progress, 0) / modules.length
  );

  return (
    <div>
      <Header
        title="Planejar"
        subtitle="Planning Zone - Diagnóstico e estratégia de IA"
      />

      <main className="p-6">
        {/* Overview Card */}
        <Card className="mb-6 border-l-4 border-l-phase-plan">
          <CardContent>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-text">Planning Zone</h2>
                <p className="mt-1 text-text-secondary">
                  Entenda onde sua empresa está na jornada de IA e defina o caminho a seguir
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <Badge variant="plan">Fase 1</Badge>
                  <span className="text-sm text-text-muted">
                    {completedCount} de {modules.length} módulos concluídos
                  </span>
                </div>
              </div>
              <div className="w-full md:w-64">
                <Progress value={totalProgress} showLabel variant="secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modules Grid */}
        <div className="grid gap-4">
          {modules.map((module, index) => (
            <Link key={module.id} to={module.href}>
              <Card variant="interactive">
                <CardContent>
                  <div className="flex items-center gap-4">
                    {/* Step number */}
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-phase-plan-bg text-sm font-semibold text-phase-plan">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-phase-plan-bg">
                      <module.icon className="h-6 w-6 text-phase-plan" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-text">{module.title}</h3>
                        {module.agent && (
                          <Badge variant="outline" size="sm">
                            🤖 {module.agent}
                          </Badge>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm text-text-secondary">
                        {module.description}
                      </p>
                      {module.status !== 'pending' && (
                        <div className="mt-2 w-48">
                          <Progress value={module.progress} size="sm" variant="secondary" />
                        </div>
                      )}
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-3">
                      {getStatusBadge(module.status)}
                      <ArrowRight className="h-5 w-5 text-text-muted" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Help Card */}
        <Card className="mt-6 bg-gradient-header text-white">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Precisa de ajuda?</h3>
                <p className="mt-1 text-white/70">
                  Nossa equipe de consultores pode guiar você em cada etapa do planejamento
                </p>
              </div>
              <Button variant="primary">
                Falar com Especialista
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
