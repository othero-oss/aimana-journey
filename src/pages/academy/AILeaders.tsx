/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - AI Leaders Program Page (Gamified)
 * Programa de capacitacao para lideranca executiva com gamificacao
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
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui';
import {
  Users,
  BookOpen,
  Video,
  Clock,
  CheckCircle2,
  Play,
  Bot,
  Send,
  Award,
  Calendar,
  Target,
  Presentation,
  MessageSquare,
  Star,
  Trophy,
  Zap,
  X,
  ArrowRight,
  ThumbsUp,
  MessageCircle,
  Shield,
  TrendingUp,
  Lock,
  Flame,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// Data
// ============================================================================

const modules = [
  {
    id: 1,
    title: 'Fundamentos de IA para Executivos',
    description: 'O que e IA, ML, LLMs e por que importam para o negocio',
    duration: '45 min',
    type: 'video' as const,
    completed: true,
    locked: false,
    xp: 50,
  },
  {
    id: 2,
    title: 'Casos de Uso Estrategicos',
    description: 'Exemplos de sucesso e licoes aprendidas em diferentes setores',
    duration: '30 min',
    type: 'article' as const,
    completed: true,
    locked: false,
    xp: 40,
  },
  {
    id: 3,
    title: 'Avaliando Oportunidades de IA',
    description: 'Framework para identificar e priorizar iniciativas',
    duration: '60 min',
    type: 'workshop' as const,
    completed: true,
    locked: false,
    xp: 75,
  },
  {
    id: 4,
    title: 'Governanca e Etica em IA',
    description: 'Principios, riscos e frameworks de governanca',
    duration: '45 min',
    type: 'video' as const,
    completed: true,
    locked: false,
    xp: 50,
  },
  {
    id: 5,
    title: 'Construindo a Cultura AI-First',
    description: 'Mudanca cultural, comunicacao e gestao de resistencias',
    duration: '60 min',
    type: 'workshop' as const,
    completed: false,
    locked: false,
    xp: 75,
  },
  {
    id: 6,
    title: 'AI Leaders Workshop',
    description: 'Sessao ao vivo para aplicar os conceitos na sua empresa',
    duration: '120 min',
    type: 'live' as const,
    completed: false,
    locked: true,
    xp: 100,
  },
];

const upcomingSessions = [
  {
    title: 'AI Leaders Workshop - Turma 5',
    date: '15 Fev 2025, 14h',
    instructor: 'Dra. Ana Costa',
    spots: 8,
  },
  {
    title: 'Q&A: Implementando IA na sua Empresa',
    date: '20 Fev 2025, 10h',
    instructor: 'Carlos Lima',
    spots: 15,
  },
];

const participants = [
  { name: 'Roberto Silva', role: 'CEO', progress: 100, xp: 390, avatar: 'RS' },
  { name: 'Maria Santos', role: 'CFO', progress: 100, xp: 390, avatar: 'MS' },
  { name: 'Carlos Lima', role: 'COO', progress: 83, xp: 290, avatar: 'CL' },
  { name: 'Ana Costa', role: 'CTO', progress: 67, xp: 215, avatar: 'AC' },
  { name: 'Pedro Almeida', role: 'CMO', progress: 50, xp: 165, avatar: 'PA' },
  { name: 'Lucia Ferreira', role: 'CHRO', progress: 33, xp: 90, avatar: 'LF' },
];

const mentors = [
  {
    name: 'Dra. Ana Costa',
    expertise: ['Estrategia de IA', 'Governanca', 'Transformacao Digital'],
    rating: 4.9,
    sessions: 47,
    avatar: 'AC',
    available: true,
    bio: 'PhD em Ciencia da Computacao, 15 anos de experiencia em transformacao digital.',
  },
  {
    name: 'Carlos Lima',
    expertise: ['Operacoes com IA', 'Automacao', 'Change Management'],
    rating: 4.8,
    sessions: 32,
    avatar: 'CL',
    available: true,
    bio: 'Ex-COO de multinacional, especialista em implementacao de IA em operacoes.',
  },
  {
    name: 'Prof. Ricardo Mendes',
    expertise: ['Etica em IA', 'Regulamentacao', 'Privacidade de Dados'],
    rating: 4.7,
    sessions: 28,
    avatar: 'RM',
    available: false,
    bio: 'Professor titular, autor de 3 livros sobre etica em inteligencia artificial.',
  },
];

const communityTopics = [
  {
    title: 'Como convencer o board a investir em IA?',
    author: 'Roberto Silva',
    authorRole: 'CEO',
    replies: 12,
    likes: 24,
    time: '2h atras',
    tag: 'Estrategia',
  },
  {
    title: 'ROI de projetos de IA: metricas que funcionam',
    author: 'Maria Santos',
    authorRole: 'CFO',
    replies: 8,
    likes: 19,
    time: '5h atras',
    tag: 'Metricas',
  },
  {
    title: 'Gestao de riscos na adocao de IA generativa',
    author: 'Ana Costa',
    authorRole: 'CTO',
    replies: 15,
    likes: 31,
    time: '1d atras',
    tag: 'Governanca',
  },
  {
    title: 'Case: IA no atendimento ao cliente - resultados do Q4',
    author: 'Pedro Almeida',
    authorRole: 'CMO',
    replies: 6,
    likes: 14,
    time: '2d atras',
    tag: 'Case',
  },
];

const typeConfig = {
  video: {
    icon: Video,
    label: 'Video',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  article: {
    icon: BookOpen,
    label: 'Artigo',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  workshop: {
    icon: Presentation,
    label: 'Workshop',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    badgeBg: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  },
  live: {
    icon: Calendar,
    label: 'Ao Vivo',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
};

const milestones = [
  { xp: 100, label: 'Explorador', reached: true },
  { xp: 200, label: 'Estrategista', reached: true },
  { xp: 350, label: 'Visionario', reached: false },
  { xp: 500, label: 'AI Leader', reached: false },
];

// ============================================================================
// Types
// ============================================================================

type ChatMessage = { role: 'user' | 'assistant'; content: string };

// ============================================================================
// Component
// ============================================================================

export function AILeaders() {
  const [activeTab, setActiveTab] = useState('modulos');
  const [mentorChatOpen, setMentorChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Bem-vindo ao programa AI Leaders!

Voce esta com 67% do programa completo e ja acumulou 215 XP.

Proximo modulo: "Construindo a Cultura AI-First"
Recompensa: +75 XP

Como posso ajuda-lo hoje?`,
    },
  ]);

  const completedModules = modules.filter((m) => m.completed).length;
  const progress = Math.round((completedModules / modules.length) * 100);
  const totalXP = modules.filter((m) => m.completed).reduce((sum, m) => sum + m.xp, 0);
  const maxXP = modules.reduce((sum, m) => sum + m.xp, 0);
  const nextModule = modules.find((m) => !m.completed && !m.locked);
  const currentMilestone = milestones.filter((m) => m.reached).pop();
  const nextMilestone = milestones.find((m) => !m.reached);
  const remainingMinutes = modules
    .filter((m) => !m.completed)
    .reduce((sum, m) => sum + parseInt(m.duration), 0);
  const remainingHours = Math.floor(remainingMinutes / 60);
  const remainingMins = remainingMinutes % 60;

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: 'user', content: chatInput }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Otima pergunta!

Principais pontos sobre cultura AI-First:

1. Visao Compartilhada - Comunicar o "porque" antes do "como"
2. Quick Wins - Projetos de alto impacto e baixo risco
3. Capacitacao Continua - Investir em upskilling
4. Gestao de Mudancas - Focar em aumentacao, nao substituicao

Deseja agendar uma mentoria para aprofundar?`,
        },
      ]);
    }, 1500);
  };

  return (
    <div>
      <Header
        title="AI Leaders"
        subtitle="Programa de capacitacao para lideranca executiva"
      />

      <main className="p-6 space-y-6">
        {/* ================================================================
            PROGRESS HERO
            ================================================================ */}
        <Card className="border-l-4 border-l-aimana-teal overflow-hidden">
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* XP Earned */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-aimana-teal/10">
                  <Zap className="h-7 w-7 text-aimana-teal" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">XP Acumulado</p>
                  <p className="text-2xl font-bold text-text">{totalXP} <span className="text-sm font-normal text-text-muted">/ {maxXP} XP</span></p>
                  {currentMilestone && (
                    <Badge variant="execute" size="sm">{currentMilestone.label}</Badge>
                  )}
                </div>
              </div>

              {/* Percentage Complete */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-phase-plan-bg">
                  <Target className="h-7 w-7 text-phase-plan" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-text-secondary">Progresso</p>
                  <p className="text-2xl font-bold text-text">{progress}%</p>
                  <Progress value={progress} size="sm" className="mt-1" />
                </div>
              </div>

              {/* Time Remaining */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/10">
                  <Clock className="h-7 w-7 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Tempo Restante</p>
                  <p className="text-2xl font-bold text-text">
                    {remainingHours > 0 ? `${remainingHours}h ${remainingMins}min` : `${remainingMins}min`}
                  </p>
                  <p className="text-xs text-text-muted">{modules.length - completedModules} modulos restantes</p>
                </div>
              </div>

              {/* Next Milestone */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/10">
                  <Trophy className="h-7 w-7 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Proximo Marco</p>
                  {nextMilestone ? (
                    <>
                      <p className="text-2xl font-bold text-text">{nextMilestone.label}</p>
                      <p className="text-xs text-text-muted">Faltam {nextMilestone.xp - totalXP} XP</p>
                    </>
                  ) : (
                    <p className="text-2xl font-bold text-aimana-teal">Completo!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Milestone Progress Bar */}
            <div className="mt-6 pt-4 border-t border-surface-border">
              <div className="flex items-center justify-between mb-2">
                {milestones.map((m, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all',
                        m.reached
                          ? 'bg-aimana-teal text-aimana-navy'
                          : 'bg-surface-light text-text-muted'
                      )}
                    >
                      {m.reached ? <CheckCircle2 className="h-4 w-4" /> : <Lock className="h-3 w-3" />}
                    </div>
                    <span className={cn(
                      'text-xs font-medium',
                      m.reached ? 'text-aimana-teal' : 'text-text-muted'
                    )}>
                      {m.label}
                    </span>
                    <span className="text-[10px] text-text-muted">{m.xp} XP</span>
                  </div>
                ))}
              </div>
              <Progress
                value={(totalXP / maxXP) * 100}
                variant="journey"
                size="sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* ================================================================
            QUICK ACTIONS
            ================================================================ */}
        <div className="flex flex-wrap gap-3">
          {nextModule && (
            <Button variant="primary">
              <Play className="h-4 w-4" />
              Continuar de onde parou
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
          <Button variant="outline">
            <Calendar className="h-4 w-4" />
            Agendar mentoria
          </Button>
          <Button variant="ghost">
            <Award className="h-4 w-4" />
            Ver certificado
          </Button>
        </div>

        {/* ================================================================
            TABS: Modulos | Mentores | Comunidade
            ================================================================ */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="modulos" icon={<BookOpen className="h-4 w-4" />} badge={modules.length}>
              Modulos
            </TabsTrigger>
            <TabsTrigger value="mentores" icon={<Users className="h-4 w-4" />} badge={mentors.length}>
              Mentores
            </TabsTrigger>
            <TabsTrigger value="comunidade" icon={<MessageSquare className="h-4 w-4" />} badge={communityTopics.length}>
              Comunidade
            </TabsTrigger>
          </TabsList>

          {/* ==============================================================
              TAB: Modulos
              ============================================================== */}
          <TabsContent value="modulos" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Module Roadmap */}
              <div className="lg:col-span-2">
                <div className="relative">
                  {modules.map((module, idx) => {
                    const config = typeConfig[module.type];
                    const Icon = config.icon;
                    const isLast = idx === modules.length - 1;

                    return (
                      <div key={module.id} className="relative flex gap-4">
                        {/* Vertical Line + Node */}
                        <div className="flex flex-col items-center">
                          <div
                            className={cn(
                              'z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
                              module.completed
                                ? 'border-status-success bg-status-success-bg'
                                : module.locked
                                  ? 'border-surface-border bg-surface-light'
                                  : `border-current ${config.bg}`,
                              !module.completed && !module.locked && config.color
                            )}
                          >
                            {module.completed ? (
                              <CheckCircle2 className="h-5 w-5 text-status-success" />
                            ) : module.locked ? (
                              <Lock className="h-4 w-4 text-text-muted" />
                            ) : (
                              <Icon className={cn('h-5 w-5', config.color)} />
                            )}
                          </div>
                          {!isLast && (
                            <div
                              className={cn(
                                'w-0.5 flex-1 min-h-[24px]',
                                module.completed
                                  ? 'bg-status-success'
                                  : 'bg-surface-border'
                              )}
                            />
                          )}
                        </div>

                        {/* Module Card */}
                        <div className={cn('flex-1 pb-6', isLast && 'pb-0')}>
                          <Card
                            variant="interactive"
                            className={cn(
                              'transition-all',
                              module.locked && 'opacity-50',
                              !module.completed && !module.locked && 'ring-1 ring-aimana-teal/20 shadow-sm'
                            )}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                  <div className="flex items-center flex-wrap gap-2 mb-1">
                                    <span className="text-xs text-text-muted font-medium">
                                      Modulo {idx + 1}
                                    </span>
                                    <Badge
                                      size="sm"
                                      className={cn('border', config.badgeBg)}
                                    >
                                      <Icon className={cn('h-3 w-3 mr-1', config.color)} />
                                      {config.label}
                                    </Badge>
                                    {module.locked && (
                                      <Badge variant="pending" size="sm">Bloqueado</Badge>
                                    )}
                                  </div>

                                  <h3 className={cn(
                                    'font-semibold text-sm',
                                    module.completed ? 'text-text-secondary line-through decoration-status-success/30' : 'text-text'
                                  )}>
                                    {module.title}
                                  </h3>
                                  <p className="text-xs text-text-secondary mt-1">
                                    {module.description}
                                  </p>

                                  <div className="flex items-center gap-3 mt-2">
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3 w-3 text-text-muted" />
                                      <span className="text-xs text-text-muted">{module.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Zap className={cn('h-3 w-3', module.completed ? 'text-aimana-teal' : 'text-text-muted')} />
                                      <span className={cn(
                                        'text-xs font-semibold',
                                        module.completed ? 'text-aimana-teal' : 'text-text-muted'
                                      )}>
                                        {module.completed ? `+${module.xp} XP ganho` : `+${module.xp} XP`}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="shrink-0">
                                  {module.completed ? (
                                    <Button variant="outline" size="sm">
                                      Revisar
                                    </Button>
                                  ) : module.locked ? (
                                    <Button variant="outline" size="sm" disabled>
                                      <Lock className="h-3 w-3" />
                                    </Button>
                                  ) : (
                                    <Button variant="primary" size="sm">
                                      <Play className="h-4 w-4" />
                                      Iniciar
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Upcoming Sessions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-aimana-teal" />
                      Proximas Sessoes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingSessions.map((session, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-surface-light">
                        <p className="font-medium text-text text-sm">{session.title}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-text-muted">
                          <Calendar className="h-3 w-3" />
                          {session.date}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-text-muted">{session.instructor}</span>
                          <Badge variant="outline" size="sm">{session.spots} vagas</Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Turma / Cohort Participants */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Users className="h-4 w-4 text-aimana-teal" />
                        Turma 5
                      </CardTitle>
                      <Badge variant="plan" size="sm">{participants.length} membros</Badge>
                    </div>
                    <CardDescription>Sua turma de AI Leaders</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* Avatars Row */}
                    <div className="flex items-center -space-x-2 mb-3">
                      {participants.slice(0, 5).map((p, idx) => (
                        <div
                          key={idx}
                          className="h-9 w-9 rounded-full bg-aimana-navy flex items-center justify-center text-white text-xs font-medium border-2 border-surface ring-0"
                          title={p.name}
                        >
                          {p.avatar}
                        </div>
                      ))}
                      {participants.length > 5 && (
                        <div className="h-9 w-9 rounded-full bg-surface-light flex items-center justify-center text-text-muted text-xs font-medium border-2 border-surface">
                          +{participants.length - 5}
                        </div>
                      )}
                    </div>

                    {/* Participant List */}
                    {participants.map((p, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="relative">
                          <div className="h-8 w-8 rounded-full bg-aimana-navy flex items-center justify-center text-white text-xs font-medium">
                            {p.avatar}
                          </div>
                          {p.progress === 100 && (
                            <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-status-success flex items-center justify-center">
                              <CheckCircle2 className="h-2.5 w-2.5 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text truncate">{p.name}</p>
                          <p className="text-xs text-text-muted">{p.role}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs font-semibold text-aimana-teal">{p.xp} XP</p>
                          <p className="text-[10px] text-text-muted">{p.progress}%</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Certificate Preview */}
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Award className="h-4 w-4 text-aimana-teal" />
                      Certificado
                    </CardTitle>
                    <CardDescription>Complete todos os modulos para obter</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative rounded-lg border-2 border-dashed border-surface-border p-4 text-center bg-surface-light/50">
                      <div className="absolute inset-0 bg-gradient-to-br from-aimana-teal/5 to-purple-500/5 rounded-lg" />
                      <div className="relative">
                        <div className="mx-auto h-12 w-12 rounded-full bg-aimana-teal/10 flex items-center justify-center mb-2">
                          <Award className="h-6 w-6 text-aimana-teal" />
                        </div>
                        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                          Certificado de Conclusao
                        </p>
                        <p className="text-sm font-bold text-text mt-1">AI Leaders Program</p>
                        <p className="text-[10px] text-text-muted mt-1">Aimana AI-First Journey</p>
                        <div className="mt-3 flex items-center justify-center gap-1">
                          {[1, 2, 3].map((s) => (
                            <Star key={s} className="h-3 w-3 text-aimana-teal fill-aimana-teal" />
                          ))}
                        </div>
                        <Progress
                          value={progress}
                          size="sm"
                          className="mt-3"
                          label={`${progress}% concluido`}
                        />
                        {progress < 100 && (
                          <p className="text-[10px] text-text-muted mt-2">
                            Complete {modules.length - completedModules} modulos restantes para desbloquear
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ==============================================================
              TAB: Mentores
              ============================================================== */}
          <TabsContent value="mentores" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mentors.map((mentor, idx) => (
                <Card key={idx} variant="interactive" className="overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="h-14 w-14 rounded-full bg-aimana-navy flex items-center justify-center text-white text-lg font-bold">
                          {mentor.avatar}
                        </div>
                        {mentor.available && (
                          <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-status-success border-2 border-surface" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-text truncate">{mentor.name}</h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs font-medium text-text">{mentor.rating}</span>
                          <span className="text-xs text-text-muted">({mentor.sessions} sessoes)</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-text-secondary mt-3">{mentor.bio}</p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {mentor.expertise.map((exp, i) => (
                        <Badge key={i} variant="outline" size="sm">{exp}</Badge>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-surface-border">
                      {mentor.available ? (
                        <Button variant="primary" size="sm" className="w-full">
                          <Calendar className="h-4 w-4" />
                          Agendar Mentoria
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="w-full" disabled>
                          <Clock className="h-4 w-4" />
                          Indisponivel
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Upcoming Mentoring Sessions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-aimana-teal" />
                  Sessoes Agendadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {upcomingSessions.map((session, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-lg bg-surface-light">
                      <div className="h-10 w-10 rounded-lg bg-aimana-teal/10 flex items-center justify-center">
                        <Presentation className="h-5 w-5 text-aimana-teal" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-text text-sm">{session.title}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-text-muted">{session.date}</span>
                          <span className="text-xs text-text-muted">{session.instructor}</span>
                        </div>
                      </div>
                      <Badge variant="success" size="sm">{session.spots} vagas</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ==============================================================
              TAB: Comunidade
              ============================================================== */}
          <TabsContent value="comunidade" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Topics */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-text">Discussoes Recentes</h3>
                  <Button variant="primary" size="sm">
                    <MessageSquare className="h-4 w-4" />
                    Novo Topico
                  </Button>
                </div>

                {communityTopics.map((topic, idx) => (
                  <Card key={idx} variant="interactive">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-aimana-navy flex items-center justify-center text-white text-xs font-medium shrink-0">
                          {topic.author.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-text text-sm">{topic.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-text-secondary">{topic.author}</span>
                            <span className="text-xs text-text-muted">{topic.authorRole}</span>
                            <span className="text-xs text-text-muted">{topic.time}</span>
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge variant="outline" size="sm">{topic.tag}</Badge>
                            <div className="flex items-center gap-1 text-xs text-text-muted">
                              <MessageCircle className="h-3 w-3" />
                              {topic.replies}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-text-muted">
                              <ThumbsUp className="h-3 w-3" />
                              {topic.likes}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Community Sidebar */}
              <div className="space-y-6">
                {/* Community Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-aimana-teal" />
                      Estatisticas da Comunidade
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-surface-light">
                      <span className="text-sm text-text-secondary">Topicos</span>
                      <span className="text-sm font-bold text-text">24</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-surface-light">
                      <span className="text-sm text-text-secondary">Respostas</span>
                      <span className="text-sm font-bold text-text">156</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-surface-light">
                      <span className="text-sm text-text-secondary">Membros Ativos</span>
                      <span className="text-sm font-bold text-text">{participants.length}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Top Contributors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Flame className="h-4 w-4 text-orange-400" />
                      Top Contribuidores
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {participants.slice(0, 3).map((p, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <span className={cn(
                          'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold',
                          idx === 0
                            ? 'bg-yellow-400/20 text-yellow-400'
                            : idx === 1
                              ? 'bg-slate-300/20 text-slate-300'
                              : 'bg-orange-400/20 text-orange-400'
                        )}>
                          {idx + 1}
                        </span>
                        <div className="h-7 w-7 rounded-full bg-aimana-navy flex items-center justify-center text-white text-[10px] font-medium">
                          {p.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text truncate">{p.name}</p>
                        </div>
                        <Badge variant="execute" size="sm">
                          <Zap className="h-3 w-3 mr-0.5" />
                          {p.xp}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Popular Tags */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Tags Populares</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {['Estrategia', 'Governanca', 'ROI', 'Case', 'Metricas', 'Cultura', 'Implementacao', 'Etica'].map((tag) => (
                        <Badge key={tag} variant="outline" size="sm" className="cursor-pointer hover:border-aimana-teal hover:text-aimana-teal transition-colors">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* ================================================================
          FLOATING MENTOR IA BUTTON + MODAL
          ================================================================ */}
      {!mentorChatOpen && (
        <button
          onClick={() => setMentorChatOpen(true)}
          className={cn(
            'fixed bottom-6 right-6 z-50',
            'flex h-14 w-14 items-center justify-center rounded-full',
            'bg-aimana-teal text-aimana-navy shadow-lg',
            'hover:shadow-teal-glow hover:scale-105 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-aimana-teal focus:ring-offset-2'
          )}
          aria-label="Abrir Mentor IA"
        >
          <Bot className="h-6 w-6" />
        </button>
      )}

      {mentorChatOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => setMentorChatOpen(false)}
          />

          {/* Modal */}
          <div className="fixed bottom-6 right-6 z-50 w-full max-w-md animate-in slide-in-from-bottom-4 fade-in-0 duration-300">
            <Card className="shadow-2xl border-aimana-teal/20 overflow-hidden">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-surface-border bg-surface-light/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-aimana-teal">
                    <Bot className="h-5 w-5 text-aimana-navy" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text text-sm">Mentor IA</h3>
                    <p className="text-xs text-text-muted">Suporte ao programa AI Leaders</p>
                  </div>
                </div>
                <button
                  onClick={() => setMentorChatOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-hover transition-colors"
                  aria-label="Fechar chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="h-72 overflow-y-auto p-4 space-y-3 scrollbar-thin">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={cn(
                      'rounded-lg px-3 py-2.5 text-sm',
                      msg.role === 'user'
                        ? 'bg-aimana-navy text-white ml-8'
                        : 'bg-surface-light text-text mr-4'
                    )}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="border-t border-surface-border p-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Pergunte sobre o programa..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                    inputSize="sm"
                  />
                  <Button variant="primary" size="sm" onClick={handleChatSend}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
