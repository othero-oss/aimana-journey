/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - AI Strategy Hub Page
 * Definição de visão e estratégia de IA
 * Layout com 3 abas: Visão & Roadmap | Inputs Liderança | Prep. Workshop
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
  Progress,
  Tabs,
  TabsContent,
} from '@/components/ui';
import {
  Target,
  Users,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Calendar,
  ArrowRight,
  Download,
  Eye,
  Edit2,
  Sparkles,
  Send,
  Clock,
  MapPin,
  UserPlus,
  Mail,
  Presentation,
  Plus,
  Play,
  ChevronRight,
  BarChart3,
  TrendingUp,
  Milestone,
  Flag,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AIInsightBanner, AIActionButton, AIModal } from '@/components/ai';

// Leadership inputs
const leadershipInputs = [
  {
    id: 1,
    leader: 'CEO - Roberto Silva',
    role: 'Chief Executive Officer',
    avatar: 'RS',
    vision: 'Tornar a empresa referência em inovação com IA no setor',
    priorities: ['Transformação digital', 'Vantagem competitiva', 'Eficiência'],
    opportunities: ['Automação de processos', 'Novos produtos digitais'],
    risks: ['Resistência cultural', 'Investimento inicial'],
    timeline: 'Médio prazo (12-18 meses)',
    status: 'completed',
    submittedAt: '2025-01-28',
  },
  {
    id: 2,
    leader: 'CFO - Maria Santos',
    role: 'Chief Financial Officer',
    avatar: 'MS',
    vision: 'Reduzir custos operacionais em 20% com automação inteligente',
    priorities: ['ROI mensurável', 'Redução de custos', 'Compliance'],
    opportunities: ['Automação financeira', 'Previsão de fluxo de caixa'],
    risks: ['Qualidade dos dados', 'Compliance'],
    timeline: 'Curto prazo (6-12 meses)',
    status: 'completed',
    submittedAt: '2025-01-30',
  },
  {
    id: 3,
    leader: 'COO - Carlos Lima',
    role: 'Chief Operating Officer',
    avatar: 'CL',
    vision: 'Otimizar operações e supply chain com IA preditiva',
    priorities: ['Eficiência operacional', 'Previsibilidade', 'Qualidade'],
    opportunities: ['Previsão de demanda', 'Manutenção preditiva'],
    risks: ['Integração com sistemas legados'],
    timeline: 'Médio prazo (12-18 meses)',
    status: 'completed',
    submittedAt: '2025-02-01',
  },
  {
    id: 4,
    leader: 'CTO - Ana Costa',
    role: 'Chief Technology Officer',
    avatar: 'AC',
    vision: 'Construir capacidades internas de IA e ML',
    priorities: ['Infraestrutura', 'Talentos', 'Governança'],
    opportunities: ['Plataforma de dados', 'MLOps'],
    risks: ['Escassez de talentos', 'Governança de dados'],
    timeline: 'Longo prazo (18-24 meses)',
    status: 'pending',
    submittedAt: null,
  },
];

// Strategy pillars
const strategyPillars = [
  {
    id: 'efficiency',
    title: 'Eficiência Operacional',
    description: 'Automatizar processos repetitivos e reduzir custos',
    initiatives: 5,
    progress: 45,
    kpis: ['Redução de 20% em custos operacionais', 'Automação de 50% dos processos repetitivos'],
    icon: Target,
    color: 'text-status-success',
    bg: 'bg-status-success-bg',
  },
  {
    id: 'experience',
    title: 'Experiência do Cliente',
    description: 'Melhorar atendimento e personalização com IA',
    initiatives: 3,
    progress: 30,
    kpis: ['NPS +15 pontos', 'Tempo de resposta -50%'],
    icon: Users,
    color: 'text-phase-execute',
    bg: 'bg-phase-execute-bg',
  },
  {
    id: 'innovation',
    title: 'Inovação de Produtos',
    description: 'Criar novos produtos e serviços baseados em IA',
    initiatives: 2,
    progress: 15,
    kpis: ['2 novos produtos AI-powered', 'Revenue +10%'],
    icon: Lightbulb,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
];

// Roadmap items
const roadmapItems = [
  { phase: 'Q1 2025', title: 'Foundation', items: ['Diagnóstico de Maturidade', 'Definição de Governança', 'Quick Wins'], status: 'completed' },
  { phase: 'Q2 2025', title: 'Piloto', items: ['Customer Support Agent', 'Data Platform MVP', 'Academy Rollout'], status: 'in_progress' },
  { phase: 'Q3 2025', title: 'Escala', items: ['Sales Assistant', 'Expansão de Agentes', 'Integração Completa'], status: 'planned' },
  { phase: 'Q4 2025', title: 'Otimização', items: ['Novos Casos de Uso', 'Métricas Avançadas', 'AI Factory'], status: 'planned' },
];

// Workshop agenda
const workshopAgenda = [
  { time: '09:00', title: 'Abertura e Contexto', duration: '30min', presenter: 'CEO', type: 'presentation' },
  { time: '09:30', title: 'Visão AI-First: Proposta', duration: '45min', presenter: 'CDO', type: 'presentation' },
  { time: '10:15', title: 'Coffee Break', duration: '15min', presenter: null, type: 'break' },
  { time: '10:30', title: 'Alinhamento de Prioridades', duration: '60min', presenter: 'Facilitador', type: 'workshop' },
  { time: '11:30', title: 'Definição de Pilares', duration: '60min', presenter: 'Facilitador', type: 'workshop' },
  { time: '12:30', title: 'Almoço', duration: '60min', presenter: null, type: 'break' },
  { time: '13:30', title: 'Roadmap e Quick Wins', duration: '60min', presenter: 'CTO', type: 'workshop' },
  { time: '14:30', title: 'Governança e Riscos', duration: '45min', presenter: 'CFO/Legal', type: 'workshop' },
  { time: '15:15', title: 'Coffee Break', duration: '15min', presenter: null, type: 'break' },
  { time: '15:30', title: 'Compromissos e Próximos Passos', duration: '30min', presenter: 'CEO', type: 'presentation' },
];

// AI Insights
const aiInsights = [
  {
    id: '1',
    type: 'info' as const,
    title: 'Coleta de Inputs 75% Completa',
    description: '3 de 4 líderes já responderam. CTO ainda pendente.',
    action: { label: 'Enviar Lembrete', onClick: () => {} },
  },
  {
    id: '2',
    type: 'positive' as const,
    title: 'Alto Alinhamento Detectado',
    description: 'Todos os líderes concordam com foco em eficiência operacional como prioridade.',
  },
  {
    id: '3',
    type: 'warning' as const,
    title: 'Gap de Timeline',
    description: 'Divergência entre CFO (curto prazo) e CTO (longo prazo). Recomendado alinhar no workshop.',
  },
];

export function AIStrategy() {
  const [activeTab, setActiveTab] = useState('vision');
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showWorkshopModal, setShowWorkshopModal] = useState(false);
  const [insightsDismissed, setInsightsDismissed] = useState<string[]>([]);

  const completedInputs = leadershipInputs.filter((l) => l.status === 'completed').length;
  const visibleInsights = aiInsights.filter((i) => !insightsDismissed.includes(i.id));

  const tabs = [
    { id: 'vision', label: 'Visão & Roadmap', icon: <Target className="h-4 w-4" /> },
    { id: 'inputs', label: 'Inputs Liderança', icon: <Users className="h-4 w-4" />, badge: `${completedInputs}/${leadershipInputs.length}` },
    { id: 'workshop', label: 'Prep. Workshop', icon: <Calendar className="h-4 w-4" /> },
    { id: 'apply', label: 'Aplicar Workshop', icon: <Play className="h-4 w-4" /> },
  ];

  const handleAIMessage = async (message: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return `Analisando "${message}"...

Com base nos inputs coletados, aqui está minha análise:

**Pontos de Alinhamento:**
✓ Foco em eficiência operacional é unânime
✓ Todos reconhecem a importância de dados de qualidade
✓ Automação como prioridade de curto prazo

**Gaps Identificados:**
⚠ Timeline divergente entre CFO e CTO
⚠ Diferentes perspectivas sobre build vs buy

**Recomendação:**
Usar o workshop para alinhar timeline e definir abordagem híbrida (quick wins imediatos + capacidades internas no médio prazo).`;
  };

  return (
    <div>
      <Header
        title="AI Strategy Hub"
        subtitle="Defina a visão e estratégia de IA alinhada com a liderança"
      />

      <main className="p-6 space-y-6">
        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab: Visão & Roadmap */}
        <TabsContent value="vision" activeTab={activeTab}>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Vision Document */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-phase-plan" />
                        Documento de Visão AI-First
                      </CardTitle>
                      <CardDescription>Visão estratégica consolidada para aprovação</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <AIActionButton
                        label="Rascunhar com IA"
                        action="draft"
                        onClick={() => setShowDocumentModal(true)}
                        variant="outline"
                        size="sm"
                      />
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Exportar
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg bg-surface-light border border-surface-border">
                    <div className="prose prose-sm max-w-none">
                      <h4 className="text-text font-semibold mb-2">Missão de IA</h4>
                      <p className="text-text-secondary text-sm mb-4">
                        Transformar a organização em uma empresa AI-First, utilizando inteligência artificial
                        para criar vantagem competitiva sustentável, melhorar a eficiência operacional e
                        entregar experiências excepcionais aos clientes.
                      </p>

                      <h4 className="text-text font-semibold mb-2">Objetivos Estratégicos</h4>
                      <ul className="text-text-secondary text-sm space-y-1 mb-4 list-disc list-inside">
                        <li>Reduzir custos operacionais em 20% através de automação</li>
                        <li>Aumentar NPS em 15 pontos com IA no atendimento</li>
                        <li>Lançar 2 novos produtos AI-powered até 2026</li>
                      </ul>

                      <div className="flex items-center gap-2 text-xs text-text-muted">
                        <Badge variant="pending" size="sm">Rascunho</Badge>
                        <span>Última atualização: 05/02/2025</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Strategy Pillars */}
              <Card>
                <CardHeader>
                  <CardTitle>Pilares Estratégicos</CardTitle>
                  <CardDescription>Áreas de foco para a transformação AI-First</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {strategyPillars.map((pillar) => (
                    <div key={pillar.id} className="p-4 rounded-lg bg-surface-light border border-surface-border">
                      <div className="flex items-start gap-4">
                        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', pillar.bg)}>
                          <pillar.icon className={cn('h-5 w-5', pillar.color)} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-text">{pillar.title}</h4>
                            <Badge variant="outline" size="sm">{pillar.initiatives} iniciativas</Badge>
                          </div>
                          <p className="text-sm text-text-secondary mb-3">{pillar.description}</p>
                          <Progress value={pillar.progress} size="sm" variant="secondary" showLabel />
                          <div className="flex flex-wrap gap-2 mt-3">
                            {pillar.kpis.map((kpi, idx) => (
                              <Badge key={idx} variant="outline" size="sm">
                                <Target className="h-3 w-3 mr-1" />
                                {kpi}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Roadmap */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Milestone className="h-5 w-5 text-phase-plan" />
                        Roadmap 2025
                      </CardTitle>
                      <CardDescription>Fases de implementação da estratégia</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit2 className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    {roadmapItems.map((item, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'p-4 rounded-lg border',
                          item.status === 'completed' && 'border-status-success bg-status-success-bg',
                          item.status === 'in_progress' && 'border-phase-execute bg-phase-execute-bg',
                          item.status === 'planned' && 'border-surface-border bg-surface-light'
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge
                            variant={
                              item.status === 'completed' ? 'success' :
                              item.status === 'in_progress' ? 'execute' : 'outline'
                            }
                            size="sm"
                          >
                            {item.phase}
                          </Badge>
                          {item.status === 'completed' && <CheckCircle2 className="h-4 w-4 text-status-success" />}
                          {item.status === 'in_progress' && <Play className="h-4 w-4 text-phase-execute" />}
                        </div>
                        <h4 className="font-semibold text-text mb-2">{item.title}</h4>
                        <ul className="text-xs text-text-secondary space-y-1">
                          {item.items.map((i, iIdx) => (
                            <li key={iIdx} className="flex items-center gap-1">
                              <ChevronRight className="h-3 w-3" />
                              {i}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Progresso Geral</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-text-muted">Inputs coletados</span>
                      <span className="font-medium text-text">{completedInputs}/{leadershipInputs.length}</span>
                    </div>
                    <Progress value={(completedInputs / leadershipInputs.length) * 100} size="sm" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-text-muted">Documento de Visão</span>
                      <Badge variant="pending" size="sm">Rascunho</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-text-muted">Workshop</span>
                      <Badge variant="outline" size="sm">Não agendado</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Documents */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-4 w-4 text-text-muted" />
                    Documentos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Visão AI-First (Rascunho)
                    <Badge variant="pending" size="sm" className="ml-auto">Draft</Badge>
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                    <Presentation className="h-4 w-4 mr-2" />
                    Apresentação Executiva
                    <Download className="h-4 w-4 ml-auto" />
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Análise de Alinhamento
                    <Eye className="h-4 w-4 ml-auto" />
                  </Button>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="bg-gradient-header text-white">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Próximos Passos</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-aimana-teal" />
                      <span className="text-white/80 line-through">Coletar input CEO</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-white/50 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-white/50" />
                      </div>
                      <span>Coletar input CTO</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-white/50" />
                      <span className="text-white/70">Finalizar documento</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-white/50" />
                      <span className="text-white/70">Agendar workshop</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Tab: Inputs Liderança */}
        <TabsContent value="inputs" activeTab={activeTab}>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-text">Inputs da Liderança</h2>
                <div className="flex items-center gap-2">
                  <AIActionButton
                    label="Analisar Alinhamento"
                    action="analyze"
                    onClick={() => setShowDocumentModal(true)}
                    variant="outline"
                    size="sm"
                  />
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-1" />
                    Enviar Lembretes
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {leadershipInputs.map((input) => (
                  <Card
                    key={input.id}
                    className={cn(
                      input.status === 'completed' ? 'border-status-success/30' : 'border-dashed'
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          'h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold',
                          input.status === 'completed' ? 'bg-aimana-navy' : 'bg-surface-light text-text-muted'
                        )}>
                          {input.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <h3 className="font-semibold text-text">{input.leader}</h3>
                              <p className="text-xs text-text-muted">{input.role}</p>
                            </div>
                            {input.status === 'completed' ? (
                              <Badge variant="success">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Respondido
                              </Badge>
                            ) : (
                              <Badge variant="pending">
                                <Clock className="h-3 w-3 mr-1" />
                                Pendente
                              </Badge>
                            )}
                          </div>

                          {input.status === 'completed' ? (
                            <div className="mt-3 space-y-3">
                              <div className="p-3 rounded-lg bg-surface-light">
                                <p className="text-xs font-medium text-text-muted mb-1">Visão</p>
                                <p className="text-sm text-text">{input.vision}</p>
                              </div>

                              <div className="grid grid-cols-3 gap-3">
                                <div>
                                  <p className="text-xs font-medium text-text-muted mb-1">Prioridades</p>
                                  <div className="flex flex-wrap gap-1">
                                    {input.priorities.map((p, i) => (
                                      <Badge key={i} variant="plan" size="sm">{p}</Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-text-muted mb-1">Oportunidades</p>
                                  <div className="flex flex-wrap gap-1">
                                    {input.opportunities.map((o, i) => (
                                      <Badge key={i} variant="success" size="sm">{o}</Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-text-muted mb-1">Riscos</p>
                                  <div className="flex flex-wrap gap-1">
                                    {input.risks.map((r, i) => (
                                      <Badge key={i} variant="warning" size="sm">{r}</Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-surface-border">
                                <span>Timeline: {input.timeline}</span>
                                <span>Enviado: {input.submittedAt}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-3">
                              <p className="text-sm text-text-muted mb-3">
                                Aguardando resposta do questionário de pré-trabalho
                              </p>
                              <Button variant="outline" size="sm">
                                <Mail className="h-4 w-4 mr-1" />
                                Enviar Lembrete
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Analysis Summary */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-aimana-teal" />
                    Análise de Alinhamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-status-success-bg">
                    <p className="text-xs font-medium text-status-success mb-1">Concordâncias</p>
                    <ul className="text-xs text-text-secondary space-y-1">
                      <li>• Eficiência operacional como prioridade</li>
                      <li>• Importância da qualidade de dados</li>
                      <li>• Automação como quick win</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-status-warning-bg">
                    <p className="text-xs font-medium text-status-warning mb-1">Gaps a Resolver</p>
                    <ul className="text-xs text-text-secondary space-y-1">
                      <li>• Divergência de timeline</li>
                      <li>• Build vs Buy não definido</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Send Questionnaire */}
              <Card className="bg-gradient-header text-white">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Adicionar Líder
                  </h3>
                  <p className="text-sm text-white/80 mb-3">
                    Envie o questionário de pré-trabalho para novos participantes.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-white/30 text-white hover:bg-white/10"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Convidar Líder
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Tab: Prep. Workshop */}
        <TabsContent value="workshop" activeTab={activeTab}>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Workshop Info */}
              <Card className="border-l-4 border-l-phase-plan">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-text">AI Leaders Workshop</h2>
                      <p className="text-sm text-text-secondary mt-1">
                        Workshop de alinhamento estratégico com a liderança
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="pending">Não agendado</Badge>
                      <p className="text-xs text-text-muted mt-1">Duração: ~7 horas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Agenda */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-phase-plan" />
                        Agenda Sugerida
                      </CardTitle>
                      <CardDescription>Gerada pela IA com base nos inputs coletados</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <AIActionButton
                        label="Refinar Agenda"
                        action="suggest"
                        onClick={() => setShowWorkshopModal(true)}
                        variant="outline"
                        size="sm"
                      />
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Exportar
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {workshopAgenda.map((item, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'flex items-center gap-4 p-3 rounded-lg',
                          item.type === 'break' ? 'bg-surface-light/50' : 'bg-surface-light'
                        )}
                      >
                        <div className="w-16 text-center">
                          <span className="text-sm font-medium text-text">{item.time}</span>
                          <p className="text-xs text-text-muted">{item.duration}</p>
                        </div>
                        <div className="flex-1">
                          <h4 className={cn(
                            'font-medium',
                            item.type === 'break' ? 'text-text-muted' : 'text-text'
                          )}>{item.title}</h4>
                          {item.presenter && (
                            <p className="text-xs text-text-muted">{item.presenter}</p>
                          )}
                        </div>
                        <Badge
                          variant={
                            item.type === 'presentation' ? 'plan' :
                            item.type === 'workshop' ? 'execute' : 'outline'
                          }
                          size="sm"
                        >
                          {item.type === 'presentation' ? 'Apresentação' :
                           item.type === 'workshop' ? 'Workshop' : 'Intervalo'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Materials */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-phase-plan" />
                    Materiais do Workshop
                  </CardTitle>
                  <CardDescription>Documentos e apresentações para o workshop</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Button variant="outline" className="justify-start h-auto py-3">
                      <Presentation className="h-5 w-5 mr-3 text-orange-500" />
                      <div className="text-left">
                        <p className="font-medium">Apresentação Inicial</p>
                        <p className="text-xs text-text-muted">Contexto e objetivos</p>
                      </div>
                      <Badge variant="success" size="sm" className="ml-auto">Pronto</Badge>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto py-3">
                      <FileText className="h-5 w-5 mr-3 text-blue-500" />
                      <div className="text-left">
                        <p className="font-medium">Canvas de Alinhamento</p>
                        <p className="text-xs text-text-muted">Template para dinâmica</p>
                      </div>
                      <Badge variant="pending" size="sm" className="ml-auto">Rascunho</Badge>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto py-3">
                      <BarChart3 className="h-5 w-5 mr-3 text-green-500" />
                      <div className="text-left">
                        <p className="font-medium">Análise de Inputs</p>
                        <p className="text-xs text-text-muted">Consolidação para discussão</p>
                      </div>
                      <Badge variant="success" size="sm" className="ml-auto">Pronto</Badge>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto py-3">
                      <Target className="h-5 w-5 mr-3 text-purple-500" />
                      <div className="text-left">
                        <p className="font-medium">Template de Compromissos</p>
                        <p className="text-xs text-text-muted">Próximos passos</p>
                      </div>
                      <Badge variant="outline" size="sm" className="ml-auto">Pendente</Badge>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Participants */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Users className="h-4 w-4 text-text-muted" />
                      Participantes
                    </CardTitle>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {leadershipInputs.map((input) => (
                    <div key={input.id} className="flex items-center gap-3 p-2 rounded-lg bg-surface-light">
                      <div className="h-8 w-8 rounded-full bg-aimana-navy text-white flex items-center justify-center text-xs font-medium">
                        {input.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text truncate">{input.leader.split(' - ')[1]}</p>
                        <p className="text-xs text-text-muted">{input.leader.split(' - ')[0]}</p>
                      </div>
                      {input.status === 'completed' && (
                        <CheckCircle2 className="h-4 w-4 text-status-success" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Schedule */}
              <Card className="bg-gradient-header text-white">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Agendar Workshop
                  </h3>
                  <p className="text-sm text-white/80 mb-4">
                    Selecione uma data para o AI Leaders Workshop.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/10"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Escolher Data
                  </Button>
                </CardContent>
              </Card>

              {/* Checklist */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-status-success" />
                      <span className="text-text-muted line-through">Coletar inputs (75%)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded border border-surface-border" />
                      <span className="text-text">Finalizar agenda</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded border border-surface-border" />
                      <span className="text-text">Preparar materiais</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded border border-surface-border" />
                      <span className="text-text">Confirmar sala/local</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded border border-surface-border" />
                      <span className="text-text">Enviar convites</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Tab: Aplicar Workshop */}
        <TabsContent value="apply" activeTab={activeTab}>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Info Banner */}
              <Card className="bg-gradient-to-r from-aimana-teal/10 to-phase-plan/10 border-aimana-teal/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-aimana-teal/20">
                      <Play className="h-6 w-6 text-aimana-teal" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text mb-1">Durante ou após o Workshop</h3>
                      <p className="text-sm text-text-secondary">
                        Use esta aba para registrar decisões em tempo real, votar em iniciativas e capturar ações.
                        As informações aqui serão consolidadas automaticamente no Documento de Visão.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Decisions Capture */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-status-success" />
                        Decisões Registradas
                      </CardTitle>
                      <CardDescription>Capture as decisões tomadas durante o workshop</CardDescription>
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Nova Decisão
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { id: 1, decision: 'Priorizar eficiência operacional como foco principal de 2025', votes: 4, status: 'approved', area: 'Estratégia' },
                      { id: 2, decision: 'Começar com 2 pilotos: Customer Support e Análise Financeira', votes: 4, status: 'approved', area: 'Roadmap' },
                      { id: 3, decision: 'Adotar abordagem híbrida: quick wins com parceiros + capacidades internas', votes: 3, status: 'approved', area: 'Execução' },
                    ].map((item) => (
                      <div key={item.id} className="p-4 rounded-lg bg-status-success-bg border border-status-success/20">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-status-success" />
                            <Badge variant="success" size="sm">{item.area}</Badge>
                          </div>
                          <Badge variant="outline" size="sm">{item.votes} votos</Badge>
                        </div>
                        <p className="text-text font-medium">{item.decision}</p>
                      </div>
                    ))}

                    {/* Pending Decision */}
                    <div className="p-4 rounded-lg bg-status-warning-bg border border-status-warning/20">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-status-warning" />
                          <Badge variant="warning" size="sm">Governança</Badge>
                        </div>
                        <Badge variant="outline" size="sm">Em votação</Badge>
                      </div>
                      <p className="text-text font-medium mb-3">Timeline para implementação de políticas de IA</p>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">3 meses (CFO)</Button>
                        <Button variant="outline" size="sm">6 meses (CTO)</Button>
                        <Button variant="outline" size="sm">Híbrido</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Priority Voting */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-phase-plan" />
                        Priorização de Iniciativas
                      </CardTitle>
                      <CardDescription>Vote nas iniciativas para definir prioridades</CardDescription>
                    </div>
                    <AIActionButton
                      label="Sugerir Priorização"
                      action="suggest"
                      onClick={() => setShowWorkshopModal(true)}
                      variant="outline"
                      size="sm"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { id: 1, name: 'Automação de Atendimento', votes: 4, priority: 1, track: 'Champion-built' },
                      { id: 2, name: 'Análise Financeira Automatizada', votes: 3, priority: 2, track: 'Ready-made' },
                      { id: 3, name: 'Previsão de Demanda', votes: 2, priority: 3, track: 'Coder-built' },
                      { id: 4, name: 'Assistente de RH', votes: 1, priority: 4, track: 'Ready-made' },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg bg-surface-light">
                        <div className="w-8 h-8 rounded-full bg-aimana-navy text-white flex items-center justify-center font-bold">
                          {item.priority}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-text">{item.name}</p>
                          <Badge variant="outline" size="sm">{item.track}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-text-muted">{item.votes} votos</span>
                          <Progress value={item.votes * 25} size="sm" className="w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Items */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Flag className="h-5 w-5 text-status-warning" />
                        Ações e Responsáveis
                      </CardTitle>
                      <CardDescription>Próximos passos definidos no workshop</CardDescription>
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Nova Ação
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { id: 1, action: 'Detalhar business case para piloto de Atendimento', owner: 'Maria Santos (CFO)', deadline: '15/02', status: 'pending' },
                      { id: 2, action: 'Mapear integrações necessárias com sistemas existentes', owner: 'Ana Costa (CTO)', deadline: '20/02', status: 'pending' },
                      { id: 3, action: 'Apresentar políticas de IA para aprovação do board', owner: 'Roberto Silva (CEO)', deadline: '28/02', status: 'pending' },
                      { id: 4, action: 'Identificar AI Champions em cada área', owner: 'Carlos Lima (COO)', deadline: '10/02', status: 'in_progress' },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg border border-surface-border">
                        <div className={cn(
                          'w-2 h-2 rounded-full',
                          item.status === 'in_progress' ? 'bg-status-warning' : 'bg-text-muted'
                        )} />
                        <div className="flex-1">
                          <p className="text-sm text-text">{item.action}</p>
                          <p className="text-xs text-text-muted">{item.owner}</p>
                        </div>
                        <Badge variant={item.status === 'in_progress' ? 'warning' : 'outline'} size="sm">
                          {item.deadline}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Consolidate to Document */}
              <Card className="bg-gradient-header text-white">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Consolidar no Documento
                  </h3>
                  <p className="text-sm text-white/80 mb-4">
                    Gere automaticamente o Documento de Visão AI-First com base nas decisões e ações registradas.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/10"
                    onClick={() => setShowDocumentModal(true)}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Gerar Documento
                  </Button>
                </CardContent>
              </Card>

              {/* Workshop Summary */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Resumo do Workshop</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-status-success-bg rounded-lg">
                      <p className="text-2xl font-bold text-status-success">3</p>
                      <p className="text-xs text-text-muted">Decisões aprovadas</p>
                    </div>
                    <div className="text-center p-3 bg-status-warning-bg rounded-lg">
                      <p className="text-2xl font-bold text-status-warning">1</p>
                      <p className="text-xs text-text-muted">Em votação</p>
                    </div>
                    <div className="text-center p-3 bg-surface-light rounded-lg">
                      <p className="text-2xl font-bold text-phase-execute">4</p>
                      <p className="text-xs text-text-muted">Ações definidas</p>
                    </div>
                    <div className="text-center p-3 bg-surface-light rounded-lg">
                      <p className="text-2xl font-bold text-text">4</p>
                      <p className="text-xs text-text-muted">Iniciativas priorizadas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Participants */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-4 w-4 text-text-muted" />
                    Participantes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {leadershipInputs.map((input) => (
                    <div key={input.id} className="flex items-center gap-3 p-2 rounded-lg bg-surface-light">
                      <div className="h-8 w-8 rounded-full bg-aimana-navy text-white flex items-center justify-center text-xs font-medium">
                        {input.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text truncate">{input.leader.split(' - ')[1]}</p>
                        <p className="text-xs text-text-muted">{input.leader.split(' - ')[0]}</p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-status-success" title="Online" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Export */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Exportar Ata
                </Button>
                <Button variant="outline" className="flex-1" size="sm">
                  <Send className="h-4 w-4 mr-1" />
                  Enviar Resumo
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </main>

      {/* AI Document Modal */}
      <AIModal
        title="Assistente de Estratégia"
        description="Ajudo a criar e refinar documentos estratégicos"
        isOpen={showDocumentModal}
        onClose={() => setShowDocumentModal(false)}
        agentName="Strategy Copilot"
        agentDescription="Especialista em estratégia de IA e transformação digital"
        initialMessage={`Analisando os inputs da liderança...

**Alinhamentos identificados:**
✓ Todos concordam com foco em eficiência operacional
✓ Automação é prioridade unânime
✓ Preocupação comum com qualidade de dados

**Gaps a resolver no workshop:**
⚠ Divergência de timeline (curto vs médio prazo)
⚠ Build vs Buy não definido

Como posso ajudar?
• Rascunhar seção do documento de visão
• Analisar alinhamento detalhado
• Sugerir pontos para o workshop`}
        suggestedPrompts={[
          'Rascunhar visão AI-First',
          'Detalhar gaps de alinhamento',
          'Sugerir KPIs por pilar',
          'Gerar apresentação executiva',
        ]}
        onSendMessage={handleAIMessage}
      />

      {/* Workshop Modal */}
      <AIModal
        title="Preparação do Workshop"
        description="Assistente para planejamento do AI Leaders Workshop"
        isOpen={showWorkshopModal}
        onClose={() => setShowWorkshopModal(false)}
        agentName="Strategy Copilot"
        agentDescription="Especialista em facilitação e estratégia"
        initialMessage={`Vamos preparar o AI Leaders Workshop!

**Participantes confirmados:** ${completedInputs}/${leadershipInputs.length}
**Duração sugerida:** 7 horas
**Formato:** Presencial

**Agenda atual inclui:**
• Abertura e contexto
• Alinhamento de prioridades
• Definição de pilares
• Roadmap e quick wins
• Governança e próximos passos

Como posso ajudar?`}
        suggestedPrompts={[
          'Refinar agenda com base nos inputs',
          'Sugerir dinâmicas interativas',
          'Gerar template de facilitação',
          'Criar materiais de apoio',
        ]}
        onSendMessage={handleAIMessage}
      />
    </div>
  );
}
