/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Opportunities Page
 * Mapeamento e priorização de oportunidades de IA
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
  Lightbulb,
  TrendingUp,
  Clock,
  Users,
  Zap,
  Filter,
  Plus,
  ArrowUpRight,
  Bot,
  Send,
  BarChart3,
  Target,
  DollarSign,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock opportunities data
const opportunities = [
  {
    id: 1,
    title: 'Automação de Triagem de E-mails',
    description: 'Usar IA para classificar e rotear e-mails automaticamente para as equipes corretas',
    area: 'Comercial',
    impact: 'high',
    effort: 'low',
    score: 92,
    hoursPerMonth: 120,
    tasks: ['Leitura de e-mails', 'Classificação', 'Encaminhamento'],
    status: 'prioritized',
    track: 1,
  },
  {
    id: 2,
    title: 'Geração de Relatórios Financeiros',
    description: 'Automatizar a criação de relatórios mensais com análise de variações',
    area: 'Financeiro',
    impact: 'high',
    effort: 'medium',
    score: 85,
    hoursPerMonth: 80,
    tasks: ['Coleta de dados', 'Análise', 'Formatação', 'Distribuição'],
    status: 'prioritized',
    track: 2,
  },
  {
    id: 3,
    title: 'Chatbot de Atendimento ao Cliente',
    description: 'Implementar assistente virtual para dúvidas frequentes de clientes',
    area: 'Customer Success',
    impact: 'high',
    effort: 'high',
    score: 78,
    hoursPerMonth: 200,
    tasks: ['Responder FAQs', 'Escalar tickets', 'Coletar feedback'],
    status: 'analyzing',
    track: 3,
  },
  {
    id: 4,
    title: 'Análise de Contratos',
    description: 'Extrair cláusulas e riscos automaticamente de contratos',
    area: 'Jurídico',
    impact: 'medium',
    effort: 'medium',
    score: 72,
    hoursPerMonth: 40,
    tasks: ['Leitura de PDFs', 'Extração de cláusulas', 'Identificação de riscos'],
    status: 'backlog',
    track: 3,
  },
  {
    id: 5,
    title: 'Previsão de Demanda',
    description: 'Usar ML para prever demanda de produtos e otimizar estoque',
    area: 'Operações',
    impact: 'high',
    effort: 'high',
    score: 68,
    hoursPerMonth: 60,
    tasks: ['Análise histórica', 'Modelagem', 'Recomendações'],
    status: 'backlog',
    track: 4,
  },
];

const impactLabels = {
  high: { label: 'Alto', color: 'text-status-success', bg: 'bg-status-success-bg' },
  medium: { label: 'Médio', color: 'text-status-warning', bg: 'bg-status-warning-bg' },
  low: { label: 'Baixo', color: 'text-text-muted', bg: 'bg-gray-100' },
};

const effortLabels = {
  high: { label: 'Alto', color: 'text-status-error' },
  medium: { label: 'Médio', color: 'text-status-warning' },
  low: { label: 'Baixo', color: 'text-status-success' },
};

const statusConfig = {
  prioritized: { label: 'Priorizado', variant: 'success' as const },
  analyzing: { label: 'Em Análise', variant: 'info' as const },
  backlog: { label: 'Backlog', variant: 'pending' as const },
};

const trackLabels = {
  0: 'Self-Service',
  1: 'Ready-made',
  2: 'Champion-built',
  3: 'Coder-built',
  4: 'Aimana Services',
};

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export function Opportunities() {
  const [filter, setFilter] = useState('all');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Olá! Sou o **OpportunityMiningAgent**. Posso ajudá-lo a:

• Mapear novas oportunidades de IA
• Analisar processos e tarefas
• Estimar impacto e esforço
• Sugerir priorização

Descreva um processo ou área que gostaria de analisar!`,
    },
  ]);

  const stats = {
    total: opportunities.length,
    prioritized: opportunities.filter((o) => o.status === 'prioritized').length,
    totalHours: opportunities.reduce((acc, o) => acc + o.hoursPerMonth, 0),
    avgScore: Math.round(opportunities.reduce((acc, o) => acc + o.score, 0) / opportunities.length),
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [...prev, { role: 'user' as const, content: chatInput }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content: `Analisando "${chatInput}"...

**Oportunidade Identificada:**
Baseado na descrição, identifiquei potencial para automação.

**Tarefas decompostas:**
1. Coleta e organização de dados
2. Processamento e análise
3. Geração de outputs/relatórios

**Estimativa inicial:**
• Impacto: Alto
• Esforço: Médio
• Economia potencial: ~40h/mês
• Track sugerido: Champion-built (2)

Deseja que eu adicione esta oportunidade ao backlog?`,
        },
      ]);
    }, 1500);
  };

  const filteredOpportunities =
    filter === 'all'
      ? opportunities
      : opportunities.filter((o) => o.status === filter);

  return (
    <div>
      <Header
        title="Mapeamento de Oportunidades"
        subtitle="Identifique e priorize onde IA pode gerar valor"
      />

      <main className="p-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-aimana-teal/10">
                  <Lightbulb className="h-5 w-5 text-aimana-teal" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">{stats.total}</p>
                  <p className="text-xs text-text-muted">Oportunidades</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-status-success-bg">
                  <Target className="h-5 w-5 text-status-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">{stats.prioritized}</p>
                  <p className="text-xs text-text-muted">Priorizadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-aimana-blue/10">
                  <Clock className="h-5 w-5 text-aimana-blue" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">{stats.totalHours}h</p>
                  <p className="text-xs text-text-muted">Potencial/mês</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-phase-plan-bg">
                  <BarChart3 className="h-5 w-5 text-phase-plan" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">{stats.avgScore}</p>
                  <p className="text-xs text-text-muted">Score Médio</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Opportunities List */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                {['all', 'prioritized', 'analyzing', 'backlog'].map((status) => (
                  <Button
                    key={status}
                    variant={filter === status ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setFilter(status)}
                  >
                    {status === 'all' ? 'Todas' : statusConfig[status as keyof typeof statusConfig]?.label}
                  </Button>
                ))}
              </div>
              <Button variant="primary" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Nova Oportunidade
              </Button>
            </div>

            {/* Opportunities Cards */}
            <div className="space-y-4">
              {filteredOpportunities.map((opp) => (
                <Card key={opp.id} variant="interactive">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-text">{opp.title}</h3>
                          <Badge variant={statusConfig[opp.status as keyof typeof statusConfig].variant}>
                            {statusConfig[opp.status as keyof typeof statusConfig].label}
                          </Badge>
                        </div>
                        <p className="text-sm text-text-secondary">{opp.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-aimana-teal">{opp.score}</div>
                        <div className="text-xs text-text-muted">Score</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <Badge variant="outline">{opp.area}</Badge>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Impacto:{' '}
                        <span className={impactLabels[opp.impact as keyof typeof impactLabels].color}>
                          {impactLabels[opp.impact as keyof typeof impactLabels].label}
                        </span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        Esforço:{' '}
                        <span className={effortLabels[opp.effort as keyof typeof effortLabels].color}>
                          {effortLabels[opp.effort as keyof typeof effortLabels].label}
                        </span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {opp.hoursPerMonth}h/mês
                      </span>
                      <Badge variant="navy" size="sm">
                        Track {opp.track}: {trackLabels[opp.track as keyof typeof trackLabels]}
                      </Badge>
                    </div>

                    <div className="mt-3 pt-3 border-t border-surface-border">
                      <p className="text-xs text-text-muted mb-2">Tarefas identificadas:</p>
                      <div className="flex flex-wrap gap-1">
                        {opp.tasks.map((task, i) => (
                          <span
                            key={i}
                            className="inline-block rounded bg-surface-light px-2 py-0.5 text-xs text-text-secondary"
                          >
                            {task}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Agent Chat */}
          <div>
            <Card className="sticky top-6">
              <CardHeader className="border-b border-surface-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-aimana-teal">
                    <Bot className="h-5 w-5 text-aimana-navy" />
                  </div>
                  <div>
                    <CardTitle className="text-base">OpportunityMiningAgent</CardTitle>
                    <CardDescription>Mapeamento de oportunidades</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-3 scrollbar-thin">
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

                {/* Input */}
                <div className="border-t border-surface-border p-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Descreva um processo..."
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

            {/* Impact x Effort Matrix Preview */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-sm">Matriz Impacto x Esforço</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-40 border border-surface-border rounded-lg">
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                    <div className="border-r border-b border-surface-border bg-status-success-bg/30 flex items-center justify-center text-xs text-text-muted">
                      Quick Wins
                    </div>
                    <div className="border-b border-surface-border bg-aimana-teal/10 flex items-center justify-center text-xs text-text-muted">
                      Projetos Estratégicos
                    </div>
                    <div className="border-r border-surface-border flex items-center justify-center text-xs text-text-muted">
                      Baixa Prioridade
                    </div>
                    <div className="flex items-center justify-center text-xs text-text-muted">
                      Avaliar
                    </div>
                  </div>
                  {/* Dots for opportunities */}
                  <div className="absolute top-4 left-8 h-3 w-3 rounded-full bg-aimana-teal" title="Triagem E-mails" />
                  <div className="absolute top-6 right-12 h-3 w-3 rounded-full bg-aimana-blue" title="Relatórios" />
                  <div className="absolute top-8 right-8 h-3 w-3 rounded-full bg-status-warning" title="Chatbot" />
                </div>
                <p className="text-xs text-text-muted mt-2 text-center">
                  ↑ Impacto | Esforço →
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
