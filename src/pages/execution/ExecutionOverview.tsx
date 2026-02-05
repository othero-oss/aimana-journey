/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Execution Zone Overview
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
  GraduationCap,
  Sparkles,
  FlaskConical,
  Factory,
  ArrowRight,
  Users,
  Code2,
  Zap,
  BookOpen,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const modules = [
  {
    id: 'learning',
    title: 'Trilhas de Aprendizado',
    description: 'Capacite sua equipe com programas estruturados de IA',
    icon: GraduationCap,
    href: '/execution/learning',
    stats: {
      enrolled: 45,
      completed: 12,
      inProgress: 33,
    },
    tracks: [
      { name: 'Foundations', level: 1, participants: 30 },
      { name: 'Champions', level: 2, participants: 12 },
      { name: 'Coders', level: 3, participants: 3 },
    ],
  },
  {
    id: 'sandbox',
    title: 'AI Sandbox',
    description: 'Ambiente seguro para experimentação com IA',
    icon: FlaskConical,
    href: '/execution/sandbox',
    stats: {
      sessions: 234,
      contexts: 5,
      models: 3,
    },
    features: ['Multi-modelo', 'Governança integrada', 'Histórico de conversas'],
  },
  {
    id: 'agent-studio',
    title: 'Agent Prototype Studio',
    description: 'Crie e teste protótipos de agentes de IA',
    icon: Sparkles,
    href: '/execution/agent-studio',
    stats: {
      prototypes: 8,
      active: 3,
      testing: 2,
    },
    agent: 'AgentPrototypeOrchestrator',
  },
  {
    id: 'agent-factory',
    title: 'Agent Factory',
    description: 'Escale seus agentes para produção',
    icon: Factory,
    href: '/execution/agent-factory',
    stats: {
      inProduction: 5,
      inDevelopment: 3,
    },
    agent: 'AgentFactory',
  },
];

const learningStats = [
  { label: 'Colaboradores Capacitados', value: '45', icon: Users },
  { label: 'Champions Formados', value: '12', icon: Zap },
  { label: 'AI Coders', value: '3', icon: Code2 },
  { label: 'Horas de Treinamento', value: '320', icon: BookOpen },
];

export function ExecutionOverview() {
  return (
    <div>
      <Header
        title="Executar"
        subtitle="Execution Zone - Capacitação, experimentação e construção"
      />

      <main className="p-6">
        {/* Overview Card */}
        <Card className="mb-6 border-l-4 border-l-phase-execute">
          <CardContent>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-text">Execution Zone</h2>
                <p className="mt-1 text-text-secondary">
                  Capacite sua equipe, experimente com IA e construa soluções
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <Badge variant="execute">Fase 2</Badge>
                  <span className="text-sm text-text-muted">
                    45 colaboradores engajados
                  </span>
                </div>
              </div>
              <Button variant="primary">
                <Sparkles className="h-4 w-4 mr-2" />
                Abrir AI Sandbox
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Learning Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          {learningStats.map((stat) => (
            <Card key={stat.label}>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-phase-execute-bg">
                    <stat.icon className="h-5 w-5 text-aimana-teal" />
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

        {/* Modules Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Learning Paths */}
          <Link to="/execution/learning">
            <Card variant="interactive" className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-phase-execute-bg">
                      <GraduationCap className="h-6 w-6 text-aimana-teal" />
                    </div>
                    <div>
                      <CardTitle>Trilhas de Aprendizado</CardTitle>
                      <CardDescription>Foundations • Champions • Coders</CardDescription>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-text-muted" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {modules[0].tracks?.map((track) => (
                    <div key={track.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" size="sm">
                          Nível {track.level}
                        </Badge>
                        <span className="text-sm font-medium text-text">{track.name}</span>
                      </div>
                      <span className="text-sm text-text-muted">
                        {track.participants} participantes
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>

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
                      <CardDescription>Ambiente seguro de experimentação</CardDescription>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-text-muted" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-aimana-teal">234</p>
                    <p className="text-xs text-text-muted">Sessões</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-aimana-teal">5</p>
                    <p className="text-xs text-text-muted">Contextos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-aimana-teal">3</p>
                    <p className="text-xs text-text-muted">Modelos</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {modules[1].features?.map((feature) => (
                    <Badge key={feature} variant="outline" size="sm">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Agent Studio */}
          <Link to="/execution/agent-studio">
            <Card variant="interactive" className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-phase-execute-bg">
                      <Sparkles className="h-6 w-6 text-aimana-teal" />
                    </div>
                    <div>
                      <CardTitle>Agent Prototype Studio</CardTitle>
                      <CardDescription>Prototipação de agentes</CardDescription>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-text-muted" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">🤖 AgentPrototypeOrchestrator</Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-text">8</p>
                    <p className="text-xs text-text-muted">Protótipos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-status-success">3</p>
                    <p className="text-xs text-text-muted">Ativos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-status-warning">2</p>
                    <p className="text-xs text-text-muted">Em Teste</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Agent Factory */}
          <Link to="/execution/agent-factory">
            <Card variant="interactive" className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-phase-execute-bg">
                      <Factory className="h-6 w-6 text-aimana-teal" />
                    </div>
                    <div>
                      <CardTitle>Agent Factory</CardTitle>
                      <CardDescription>Produção e orquestração</CardDescription>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-text-muted" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">🤖 AgentFactory</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-status-success">5</p>
                    <p className="text-xs text-text-muted">Em Produção</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-status-info">3</p>
                    <p className="text-xs text-text-muted">Em Desenvolvimento</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
