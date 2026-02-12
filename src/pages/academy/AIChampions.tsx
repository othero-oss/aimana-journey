/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - AI Champions Program Page (Gamified)
 * Programa de formacao de multiplicadores de IA com gamificacao
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
  Trophy,
  Users,
  BookOpen,
  Clock,
  CheckCircle2,
  Play,
  Bot,
  Send,
  Award,
  Target,
  Star,
  Zap,
  Flame,
  Crown,
  Shield,
  Swords,
  CalendarClock,
  BarChart3,
  TrendingUp,
  Heart,
  Presentation,
  GraduationCap,
  MapPin,
  ChevronRight,
  Lock,
  Sparkles,
  X,
  MessageCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// Data
// ============================================================================

// Champion levels
const CHAMPION_LEVELS = [
  { name: 'Apprentice', minXP: 0, maxXP: 499, icon: Shield, color: 'text-slate-400' },
  { name: 'Champion', minXP: 500, maxXP: 1499, icon: Swords, color: 'text-aimana-blue' },
  { name: 'Senior Champion', minXP: 1500, maxXP: 2999, icon: Crown, color: 'text-aimana-teal' },
  { name: 'Master Champion', minXP: 3000, maxXP: Infinity, icon: Sparkles, color: 'text-status-warning' },
];

function getChampionLevel(xp: number) {
  const level = CHAMPION_LEVELS.findIndex((l) => xp >= l.minXP && xp <= l.maxXP);
  return {
    level: level + 1,
    ...CHAMPION_LEVELS[level >= 0 ? level : 0],
  };
}

// Current user stats
const userStats = {
  xp: 980,
  peoplesTrained: 8,
  rankingPosition: 4,
  activeStreak: 12,
  workshopsGiven: 3,
  badgesEarned: 3,
  materialsCreated: 2,
  satisfactionRating: 4.7,
  areasCovered: ['Tech', 'Produto'],
};

// Program phases with XP milestones
const phases = [
  {
    id: 1,
    title: 'Fundamentos',
    description: 'Conhecimentos essenciais sobre IA',
    modules: 4,
    completedModules: 4,
    status: 'completed' as const,
    xpReward: 200,
    xpEarned: 200,
    milestones: ['Conceitos de IA', 'Machine Learning Basico', 'IA Generativa', 'Etica em IA'],
  },
  {
    id: 2,
    title: 'Aplicacao Pratica',
    description: 'Prompt engineering e ferramentas',
    modules: 4,
    completedModules: 2,
    status: 'in_progress' as const,
    xpReward: 300,
    xpEarned: 150,
    milestones: ['Prompt Basico', 'Chain-of-Thought', 'Ferramentas de IA', 'Automacoes'],
  },
  {
    id: 3,
    title: 'Multiplicacao',
    description: 'Tecnicas de facilitacao e treinamento',
    modules: 3,
    completedModules: 0,
    status: 'locked' as const,
    xpReward: 400,
    xpEarned: 0,
    milestones: ['Facilitacao', 'Didatica para IA', 'Workshop Design'],
  },
  {
    id: 4,
    title: 'Certificacao',
    description: 'Projeto final e avaliacao',
    modules: 2,
    completedModules: 0,
    status: 'locked' as const,
    xpReward: 500,
    xpEarned: 0,
    milestones: ['Projeto Final', 'Defesa e Certificacao'],
  },
];

// Champions leaderboard (expanded)
const champions = [
  { name: 'Maria Silva', area: 'Comercial', points: 1250, badges: 5, people_trained: 15, workshops: 6, streak: 21 },
  { name: 'Joao Santos', area: 'Operacoes', points: 1180, badges: 4, people_trained: 12, workshops: 5, streak: 18 },
  { name: 'Ana Costa', area: 'Produto', points: 1050, badges: 4, people_trained: 10, workshops: 4, streak: 14 },
  { name: 'Carlos Lima', area: 'Tech', points: 980, badges: 3, people_trained: 8, workshops: 3, streak: 12 },
  { name: 'Paula Nunes', area: 'RH', points: 920, badges: 3, people_trained: 18, workshops: 7, streak: 9 },
  { name: 'Ricardo Alves', area: 'Financeiro', points: 870, badges: 2, people_trained: 6, workshops: 2, streak: 7 },
  { name: 'Lucia Ferreira', area: 'Marketing', points: 810, badges: 2, people_trained: 9, workshops: 3, streak: 15 },
  { name: 'Pedro Martins', area: 'Logistica', points: 750, badges: 2, people_trained: 5, workshops: 2, streak: 5 },
];

// Missions
type Mission = {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  type: 'weekly' | 'monthly';
  deadline: string;
  progress: number;
  target: number;
  status: 'active' | 'completed' | 'expired';
  icon: typeof Target;
};

const missions: Mission[] = [
  {
    id: 'm1',
    title: 'Treine 3 pessoas esta semana',
    description: 'Realize sessoes individuais ou em grupo para compartilhar conhecimento de IA',
    xpReward: 200,
    type: 'weekly',
    deadline: '14 Fev',
    progress: 1,
    target: 3,
    status: 'active',
    icon: Users,
  },
  {
    id: 'm2',
    title: 'Crie 1 material didatico',
    description: 'Desenvolva um guia, apresentacao ou tutorial sobre IA para sua area',
    xpReward: 150,
    type: 'weekly',
    deadline: '14 Fev',
    progress: 0,
    target: 1,
    status: 'active',
    icon: BookOpen,
  },
  {
    id: 'm3',
    title: 'Complete o modulo Chain-of-Thought',
    description: 'Finalize o proximo modulo da Fase 2: Aplicacao Pratica',
    xpReward: 100,
    type: 'weekly',
    deadline: '14 Fev',
    progress: 0,
    target: 1,
    status: 'active',
    icon: GraduationCap,
  },
  {
    id: 'm4',
    title: 'Realize 2 workshops este mes',
    description: 'Organize e facilite workshops de IA para equipes da organizacao',
    xpReward: 400,
    type: 'monthly',
    deadline: '28 Fev',
    progress: 1,
    target: 2,
    status: 'active',
    icon: Presentation,
  },
  {
    id: 'm5',
    title: 'Treine 10 pessoas este mes',
    description: 'Alcance 10 pessoas treinadas em IA durante o mes',
    xpReward: 500,
    type: 'monthly',
    deadline: '28 Fev',
    progress: 8,
    target: 10,
    status: 'active',
    icon: Target,
  },
  {
    id: 'm6',
    title: 'Mantenha streak de 7 dias',
    description: 'Acesse a plataforma e estude por 7 dias consecutivos',
    xpReward: 100,
    type: 'weekly',
    deadline: '14 Fev',
    progress: 7,
    target: 7,
    status: 'completed',
    icon: Flame,
  },
  {
    id: 'm7',
    title: 'Avalie 3 materiais de colegas',
    description: 'Faca revisao e de feedback em materiais criados por outros champions',
    xpReward: 120,
    type: 'weekly',
    deadline: '14 Fev',
    progress: 2,
    target: 3,
    status: 'active',
    icon: Star,
  },
];

// Impact monthly data (for chart concept)
const impactMonthly = [
  { month: 'Set', trained: 0, workshops: 0 },
  { month: 'Out', trained: 2, workshops: 1 },
  { month: 'Nov', trained: 3, workshops: 1 },
  { month: 'Dez', trained: 1, workshops: 0 },
  { month: 'Jan', trained: 2, workshops: 1 },
];

type ChatMessage = { role: 'user' | 'assistant'; content: string };

// ============================================================================
// Component
// ============================================================================

export function AIChampions() {
  const [activeTab, setActiveTab] = useState('jornada');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Ola, Champion! Estou aqui para ajudar na sua jornada como multiplicador de IA.\n\nSeu status atual:\n- Fase 2: Aplicacao Pratica\n- 6 de 13 modulos completos\n- Proximo: "Chain-of-Thought Prompting"\n\nComo posso ajuda-lo hoje?`,
    },
  ]);

  const totalModules = phases.reduce((acc, p) => acc + p.modules, 0);
  const completedModules = phases.reduce((acc, p) => acc + p.completedModules, 0);
  const overallProgress = Math.round((completedModules / totalModules) * 100);
  const currentLevel = getChampionLevel(userStats.xp);
  const xpToNextLevel = currentLevel.maxXP === Infinity ? 0 : currentLevel.maxXP - userStats.xp + 1;
  const levelProgress =
    currentLevel.maxXP === Infinity
      ? 100
      : Math.round(
          ((userStats.xp - currentLevel.minXP) / (currentLevel.maxXP - currentLevel.minXP + 1)) *
            100
        );

  const activeMissions = missions.filter((m) => m.status === 'active');
  const completedMissions = missions.filter((m) => m.status === 'completed');
  const weeklyMissions = missions.filter((m) => m.type === 'weekly');
  const monthlyMissions = missions.filter((m) => m.type === 'monthly');

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: 'user', content: chatInput }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Para treinar sua equipe, recomendo este roteiro:\n\nWorkshop de 2 horas - "IA no Dia a Dia"\n\n1. Abertura (15min) - Por que IA importa para nossa area\n2. Hands-on (60min) - Exercicios praticos de prompt\n3. Discussao (30min) - Oportunidades identificadas\n4. Encerramento (15min) - Recursos e proximos passos\n\nPosso gerar os slides e materiais de apoio?`,
        },
      ]);
    }, 1500);
  };

  // Max bar value for impact chart
  const maxTrained = Math.max(...impactMonthly.map((d) => d.trained), 1);

  return (
    <div>
      <Header title="AI Champions" subtitle="Programa de formacao de multiplicadores" />

      <main className="p-6 max-w-7xl mx-auto">
        {/* ================================================================
            HERO SECTION - Large stats + Level
            ================================================================ */}
        <div className="mb-8 rounded-2xl bg-gradient-header p-6 md:p-8 text-white">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Level & XP info */}
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <currentLevel.icon className={cn('h-8 w-8', currentLevel.color)} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold">
                    {currentLevel.name} Nivel {currentLevel.level}
                  </h2>
                  <Badge variant="navy" size="sm" className="bg-white/20 border-white/30 text-white">
                    {userStats.xp} XP
                  </Badge>
                </div>
                <p className="text-sm text-white/70 mb-2">
                  {xpToNextLevel > 0
                    ? `${xpToNextLevel} XP para o proximo nivel`
                    : 'Nivel maximo alcancado!'}
                </p>
                <div className="w-48">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-aimana-teal transition-all duration-500"
                      style={{ width: `${levelProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
              <div className="rounded-xl bg-white/10 backdrop-blur-sm px-4 py-3 text-center">
                <Zap className="h-5 w-5 mx-auto mb-1 text-aimana-teal" />
                <p className="text-2xl font-bold">{userStats.xp}</p>
                <p className="text-xs text-white/60">XP Total</p>
              </div>
              <div className="rounded-xl bg-white/10 backdrop-blur-sm px-4 py-3 text-center">
                <Users className="h-5 w-5 mx-auto mb-1 text-aimana-teal" />
                <p className="text-2xl font-bold">{userStats.peoplesTrained}</p>
                <p className="text-xs text-white/60">Treinados</p>
              </div>
              <div className="rounded-xl bg-white/10 backdrop-blur-sm px-4 py-3 text-center">
                <Trophy className="h-5 w-5 mx-auto mb-1 text-status-warning" />
                <p className="text-2xl font-bold">#{userStats.rankingPosition}</p>
                <p className="text-xs text-white/60">Ranking</p>
              </div>
              <div className="rounded-xl bg-white/10 backdrop-blur-sm px-4 py-3 text-center">
                <Flame className="h-5 w-5 mx-auto mb-1 text-orange-400" />
                <p className="text-2xl font-bold">{userStats.activeStreak}</p>
                <p className="text-xs text-white/60">Dias seguidos</p>
              </div>
              <div className="rounded-xl bg-white/10 backdrop-blur-sm px-4 py-3 text-center hidden sm:block">
                <Award className="h-5 w-5 mx-auto mb-1 text-status-warning" />
                <p className="text-2xl font-bold">{userStats.badgesEarned}</p>
                <p className="text-xs text-white/60">Badges</p>
              </div>
            </div>
          </div>

          {/* Overall progress */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-white/70">Progresso geral do programa</span>
              <span className="font-medium">
                {completedModules} de {totalModules} modulos ({overallProgress}%)
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-aimana-teal transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* ================================================================
            TABS
            ================================================================ */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="jornada" icon={<MapPin className="h-4 w-4" />}>
              Jornada
            </TabsTrigger>
            <TabsTrigger value="ranking" icon={<Trophy className="h-4 w-4" />}>
              Ranking
            </TabsTrigger>
            <TabsTrigger
              value="missoes"
              icon={<Target className="h-4 w-4" />}
              badge={activeMissions.length}
            >
              Missoes
            </TabsTrigger>
            <TabsTrigger value="impacto" icon={<BarChart3 className="h-4 w-4" />}>
              Impacto
            </TabsTrigger>
          </TabsList>

          {/* ==============================================================
              TAB: JORNADA (Roadmap)
              ============================================================== */}
          <TabsContent value="jornada">
            <div className="space-y-6">
              {/* Visual Roadmap */}
              <div className="relative">
                {phases.map((phase, idx) => {
                  const isLast = idx === phases.length - 1;
                  const phaseProgress =
                    phase.modules > 0
                      ? Math.round((phase.completedModules / phase.modules) * 100)
                      : 0;

                  return (
                    <div key={phase.id} className="relative flex gap-4 pb-8">
                      {/* Vertical connector line */}
                      {!isLast && (
                        <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-surface-border">
                          {phase.status === 'completed' && (
                            <div className="absolute inset-0 bg-status-success" />
                          )}
                          {phase.status === 'in_progress' && (
                            <div
                              className="absolute top-0 left-0 right-0 bg-aimana-teal"
                              style={{ height: `${phaseProgress}%` }}
                            />
                          )}
                        </div>
                      )}

                      {/* Phase node */}
                      <div className="relative z-10 flex-shrink-0">
                        <div
                          className={cn(
                            'flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold transition-all',
                            phase.status === 'completed' &&
                              'bg-status-success text-white shadow-lg shadow-green-500/20',
                            phase.status === 'in_progress' &&
                              'bg-aimana-teal text-aimana-navy shadow-lg shadow-teal-500/20 ring-2 ring-aimana-teal/30',
                            phase.status === 'locked' && 'bg-surface-light text-text-muted'
                          )}
                        >
                          {phase.status === 'completed' ? (
                            <CheckCircle2 className="h-6 w-6" />
                          ) : phase.status === 'locked' ? (
                            <Lock className="h-5 w-5" />
                          ) : (
                            idx + 1
                          )}
                        </div>
                      </div>

                      {/* Phase card */}
                      <Card
                        variant="interactive"
                        className={cn(
                          'flex-1',
                          phase.status === 'locked' && 'opacity-60',
                          phase.status === 'in_progress' && 'ring-1 ring-aimana-teal/20'
                        )}
                      >
                        <CardContent className="p-5">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-text text-lg">
                                  Fase {phase.id}: {phase.title}
                                </h3>
                                {phase.status === 'in_progress' && (
                                  <Badge variant="execute" size="sm">
                                    Em andamento
                                  </Badge>
                                )}
                                {phase.status === 'completed' && (
                                  <Badge variant="success" size="sm">
                                    Completo
                                  </Badge>
                                )}
                                {phase.status === 'locked' && (
                                  <Badge variant="pending" size="sm">
                                    Bloqueado
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-text-secondary mb-3">
                                {phase.description}
                              </p>

                              {/* Milestones */}
                              <div className="flex flex-wrap gap-2 mb-3">
                                {phase.milestones.map((milestone, mi) => (
                                  <div
                                    key={mi}
                                    className={cn(
                                      'flex items-center gap-1 text-xs px-2 py-1 rounded-md',
                                      mi < phase.completedModules
                                        ? 'bg-status-success-bg text-status-success'
                                        : 'bg-surface-light text-text-muted'
                                    )}
                                  >
                                    {mi < phase.completedModules ? (
                                      <CheckCircle2 className="h-3 w-3" />
                                    ) : (
                                      <div className="h-3 w-3 rounded-full border border-current" />
                                    )}
                                    {milestone}
                                  </div>
                                ))}
                              </div>

                              {/* Progress bar */}
                              <div>
                                <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                                  <span>
                                    {phase.completedModules} de {phase.modules} modulos
                                  </span>
                                  <span>{phaseProgress}%</span>
                                </div>
                                <Progress
                                  value={phaseProgress}
                                  size="sm"
                                  variant={phase.status === 'completed' ? 'success' : 'default'}
                                />
                              </div>
                            </div>

                            {/* XP reward and action */}
                            <div className="flex flex-col items-end gap-2 sm:min-w-[120px]">
                              <div className="flex items-center gap-1 text-sm">
                                <Zap className="h-4 w-4 text-aimana-teal" />
                                <span className="font-semibold text-aimana-teal">
                                  {phase.xpEarned}/{phase.xpReward} XP
                                </span>
                              </div>
                              {phase.status === 'in_progress' && (
                                <Button size="sm" variant="primary">
                                  <Play className="h-4 w-4" />
                                  Continuar
                                </Button>
                              )}
                              {phase.status === 'completed' && (
                                <Button size="sm" variant="ghost">
                                  Revisar
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>

              {/* XP Summary for Journey */}
              <Card className="bg-surface-light">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-aimana-teal" />
                      <div>
                        <p className="font-medium text-text">XP do Programa</p>
                        <p className="text-sm text-text-secondary">
                          Complete todas as fases para ganhar{' '}
                          {phases.reduce((acc, p) => acc + p.xpReward, 0)} XP
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-aimana-teal">
                        {phases.reduce((acc, p) => acc + p.xpEarned, 0)}/
                        {phases.reduce((acc, p) => acc + p.xpReward, 0)} XP
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ==============================================================
              TAB: RANKING
              ============================================================== */}
          <TabsContent value="ranking">
            <div className="space-y-6">
              {/* Top 3 podium */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {champions.slice(0, 3).map((champ, idx) => {
                  const podiumOrder = [1, 0, 2]; // Display: 2nd, 1st, 3rd
                  const champIdx = podiumOrder[idx];
                  const champion = champions[champIdx];
                  const champLevel = getChampionLevel(champion.points);
                  const medals = ['bg-status-warning', 'bg-gray-400', 'bg-orange-600'];
                  const heights = ['h-32', 'h-40', 'h-28'];

                  return (
                    <Card
                      key={champIdx}
                      className={cn(
                        'text-center overflow-hidden',
                        champIdx === 0 && 'ring-2 ring-status-warning/30 sm:order-2',
                        champIdx === 1 && 'sm:order-1',
                        champIdx === 2 && 'sm:order-3'
                      )}
                    >
                      <CardContent className="p-5">
                        <div className="flex flex-col items-center">
                          {/* Medal */}
                          <div
                            className={cn(
                              'flex h-10 w-10 items-center justify-center rounded-full text-white font-bold text-lg mb-3',
                              medals[champIdx]
                            )}
                          >
                            {champIdx + 1}
                          </div>

                          {/* Avatar placeholder */}
                          <div
                            className={cn(
                              'flex items-center justify-center rounded-full bg-surface-light text-text font-bold text-lg mb-2',
                              champIdx === 0 ? 'h-16 w-16' : 'h-14 w-14'
                            )}
                          >
                            {champion.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </div>

                          <h3 className="font-semibold text-text">{champion.name}</h3>
                          <p className="text-xs text-text-muted mb-2">{champion.area}</p>

                          {/* Level badge */}
                          <Badge variant="outline" size="sm" className="mb-3">
                            <champLevel.icon className={cn('h-3 w-3 mr-1', champLevel.color)} />
                            {champLevel.name}
                          </Badge>

                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-2 w-full text-center">
                            <div>
                              <p className="text-lg font-bold text-aimana-teal">
                                {champion.points}
                              </p>
                              <p className="text-[10px] text-text-muted">XP</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-text">
                                {champion.people_trained}
                              </p>
                              <p className="text-[10px] text-text-muted">Treinados</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-text">{champion.workshops}</p>
                              <p className="text-[10px] text-text-muted">Workshops</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Full leaderboard */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-status-warning" />
                    <CardTitle className="text-base">Ranking Completo</CardTitle>
                  </div>
                  <CardDescription>
                    {champions.length} champions ativos no programa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-surface-border">
                          <th className="text-left p-3 text-xs font-medium text-text-muted">#</th>
                          <th className="text-left p-3 text-xs font-medium text-text-muted">
                            Champion
                          </th>
                          <th className="text-left p-3 text-xs font-medium text-text-muted">
                            Area
                          </th>
                          <th className="text-left p-3 text-xs font-medium text-text-muted">
                            Nivel
                          </th>
                          <th className="text-center p-3 text-xs font-medium text-text-muted">
                            XP
                          </th>
                          <th className="text-center p-3 text-xs font-medium text-text-muted">
                            Badges
                          </th>
                          <th className="text-center p-3 text-xs font-medium text-text-muted">
                            Treinados
                          </th>
                          <th className="text-center p-3 text-xs font-medium text-text-muted">
                            Workshops
                          </th>
                          <th className="text-center p-3 text-xs font-medium text-text-muted">
                            Streak
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {champions.map((champion, idx) => {
                          const champLevel = getChampionLevel(champion.points);
                          const isCurrentUser = champion.name === 'Carlos Lima';

                          return (
                            <tr
                              key={idx}
                              className={cn(
                                'border-b border-surface-border last:border-0 transition-colors',
                                isCurrentUser && 'bg-aimana-teal/5'
                              )}
                            >
                              <td className="p-3">
                                <span
                                  className={cn(
                                    'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold',
                                    idx === 0 && 'bg-status-warning text-white',
                                    idx === 1 && 'bg-gray-400 text-white',
                                    idx === 2 && 'bg-orange-600 text-white',
                                    idx > 2 && 'text-text-muted'
                                  )}
                                >
                                  {idx + 1}
                                </span>
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-text">{champion.name}</span>
                                  {isCurrentUser && (
                                    <Badge variant="primary" size="sm">
                                      Voce
                                    </Badge>
                                  )}
                                </div>
                              </td>
                              <td className="p-3">
                                <span className="text-sm text-text-muted">{champion.area}</span>
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-1">
                                  <champLevel.icon
                                    className={cn('h-4 w-4', champLevel.color)}
                                  />
                                  <span className="text-xs text-text-secondary">
                                    {champLevel.name}
                                  </span>
                                </div>
                              </td>
                              <td className="p-3 text-center">
                                <span className="font-medium text-aimana-teal">
                                  {champion.points}
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <Award className="h-4 w-4 text-status-warning" />
                                  <span className="text-sm">{champion.badges}</span>
                                </div>
                              </td>
                              <td className="p-3 text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <Users className="h-4 w-4 text-text-muted" />
                                  <span className="text-sm">{champion.people_trained}</span>
                                </div>
                              </td>
                              <td className="p-3 text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <Presentation className="h-4 w-4 text-text-muted" />
                                  <span className="text-sm">{champion.workshops}</span>
                                </div>
                              </td>
                              <td className="p-3 text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <Flame className="h-4 w-4 text-orange-400" />
                                  <span className="text-sm">{champion.streak}</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ==============================================================
              TAB: MISSOES
              ============================================================== */}
          <TabsContent value="missoes">
            <div className="space-y-6">
              {/* Mission summary */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card className="bg-surface-light">
                  <CardContent className="p-4 text-center">
                    <Target className="h-6 w-6 mx-auto mb-2 text-aimana-teal" />
                    <p className="text-2xl font-bold text-text">{activeMissions.length}</p>
                    <p className="text-xs text-text-muted">Missoes ativas</p>
                  </CardContent>
                </Card>
                <Card className="bg-surface-light">
                  <CardContent className="p-4 text-center">
                    <CheckCircle2 className="h-6 w-6 mx-auto mb-2 text-status-success" />
                    <p className="text-2xl font-bold text-text">{completedMissions.length}</p>
                    <p className="text-xs text-text-muted">Concluidas</p>
                  </CardContent>
                </Card>
                <Card className="bg-surface-light">
                  <CardContent className="p-4 text-center">
                    <Zap className="h-6 w-6 mx-auto mb-2 text-status-warning" />
                    <p className="text-2xl font-bold text-text">
                      {activeMissions.reduce((acc, m) => acc + m.xpReward, 0)}
                    </p>
                    <p className="text-xs text-text-muted">XP disponivel</p>
                  </CardContent>
                </Card>
              </div>

              {/* Weekly missions */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CalendarClock className="h-5 w-5 text-aimana-blue" />
                  <h3 className="text-lg font-semibold text-text">Missoes Semanais</h3>
                  <Badge variant="outline" size="sm">
                    Encerram em 14 Fev
                  </Badge>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {weeklyMissions.map((mission) => {
                    const MissionIcon = mission.icon;
                    const missionProgress = Math.round(
                      (mission.progress / mission.target) * 100
                    );

                    return (
                      <Card
                        key={mission.id}
                        variant="interactive"
                        className={cn(
                          mission.status === 'completed' &&
                            'ring-1 ring-status-success/30 bg-status-success-bg/30'
                        )}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div
                              className={cn(
                                'flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0',
                                mission.status === 'completed'
                                  ? 'bg-status-success text-white'
                                  : 'bg-aimana-teal/10 text-aimana-teal'
                              )}
                            >
                              {mission.status === 'completed' ? (
                                <CheckCircle2 className="h-5 w-5" />
                              ) : (
                                <MissionIcon className="h-5 w-5" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="font-medium text-text text-sm">
                                  {mission.title}
                                </h4>
                                <Badge
                                  variant={
                                    mission.status === 'completed' ? 'success' : 'warning'
                                  }
                                  size="sm"
                                  className="flex-shrink-0"
                                >
                                  <Zap className="h-3 w-3 mr-0.5" />
                                  {mission.xpReward} XP
                                </Badge>
                              </div>
                              <p className="text-xs text-text-muted mb-3">
                                {mission.description}
                              </p>
                              <div>
                                <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                                  <span>
                                    {mission.progress}/{mission.target}
                                  </span>
                                  <span>{missionProgress}%</span>
                                </div>
                                <Progress
                                  value={missionProgress}
                                  size="sm"
                                  variant={
                                    mission.status === 'completed' ? 'success' : 'default'
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Monthly missions */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CalendarClock className="h-5 w-5 text-aimana-teal" />
                  <h3 className="text-lg font-semibold text-text">Missoes Mensais</h3>
                  <Badge variant="outline" size="sm">
                    Encerram em 28 Fev
                  </Badge>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {monthlyMissions.map((mission) => {
                    const MissionIcon = mission.icon;
                    const missionProgress = Math.round(
                      (mission.progress / mission.target) * 100
                    );

                    return (
                      <Card
                        key={mission.id}
                        variant="interactive"
                        className={cn(
                          mission.status === 'completed' &&
                            'ring-1 ring-status-success/30 bg-status-success-bg/30'
                        )}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div
                              className={cn(
                                'flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0',
                                mission.status === 'completed'
                                  ? 'bg-status-success text-white'
                                  : 'bg-aimana-blue/10 text-aimana-blue'
                              )}
                            >
                              {mission.status === 'completed' ? (
                                <CheckCircle2 className="h-5 w-5" />
                              ) : (
                                <MissionIcon className="h-5 w-5" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="font-medium text-text text-sm">
                                  {mission.title}
                                </h4>
                                <Badge
                                  variant={
                                    mission.status === 'completed' ? 'success' : 'execute'
                                  }
                                  size="sm"
                                  className="flex-shrink-0"
                                >
                                  <Zap className="h-3 w-3 mr-0.5" />
                                  {mission.xpReward} XP
                                </Badge>
                              </div>
                              <p className="text-xs text-text-muted mb-3">
                                {mission.description}
                              </p>
                              <div>
                                <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                                  <span>
                                    {mission.progress}/{mission.target}
                                  </span>
                                  <span>{missionProgress}%</span>
                                </div>
                                <Progress
                                  value={missionProgress}
                                  size="sm"
                                  variant={
                                    mission.status === 'completed' ? 'success' : 'secondary'
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ==============================================================
              TAB: IMPACTO
              ============================================================== */}
          <TabsContent value="impacto">
            <div className="space-y-6">
              {/* Impact KPIs */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="h-6 w-6 mx-auto mb-2 text-aimana-teal" />
                    <p className="text-3xl font-bold text-text">
                      {userStats.peoplesTrained}
                    </p>
                    <p className="text-xs text-text-muted">Pessoas treinadas</p>
                    <div className="flex items-center justify-center gap-1 mt-1 text-xs text-status-success">
                      <TrendingUp className="h-3 w-3" />
                      +2 este mes
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Presentation className="h-6 w-6 mx-auto mb-2 text-aimana-blue" />
                    <p className="text-3xl font-bold text-text">
                      {userStats.workshopsGiven}
                    </p>
                    <p className="text-xs text-text-muted">Workshops realizados</p>
                    <div className="flex items-center justify-center gap-1 mt-1 text-xs text-status-success">
                      <TrendingUp className="h-3 w-3" />
                      +1 este mes
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <BookOpen className="h-6 w-6 mx-auto mb-2 text-phase-manage" />
                    <p className="text-3xl font-bold text-text">
                      {userStats.materialsCreated}
                    </p>
                    <p className="text-xs text-text-muted">Materiais criados</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Heart className="h-6 w-6 mx-auto mb-2 text-status-error" />
                    <p className="text-3xl font-bold text-text">
                      {userStats.satisfactionRating}
                    </p>
                    <p className="text-xs text-text-muted">Nota de satisfacao</p>
                    <p className="text-[10px] text-text-muted mt-0.5">de 5.0</p>
                  </CardContent>
                </Card>
              </div>

              {/* People trained over time - bar chart concept */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-aimana-teal" />
                    <CardTitle className="text-base">Pessoas Treinadas por Mes</CardTitle>
                  </div>
                  <CardDescription>Evolucao do seu impacto ao longo do tempo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-3 h-40">
                    {impactMonthly.map((data, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs font-medium text-text">
                          {data.trained > 0 ? data.trained : ''}
                        </span>
                        <div className="w-full flex flex-col items-center gap-0.5">
                          <div
                            className="w-full max-w-[48px] rounded-t-md bg-aimana-teal transition-all duration-500"
                            style={{
                              height: `${
                                data.trained > 0
                                  ? Math.max((data.trained / maxTrained) * 100, 8)
                                  : 4
                              }px`,
                              minHeight: data.trained > 0 ? '12px' : '4px',
                              opacity: data.trained > 0 ? 1 : 0.2,
                            }}
                          />
                        </div>
                        <span className="text-[10px] text-text-muted">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Areas covered */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-aimana-blue" />
                      <CardTitle className="text-base">Areas Impactadas</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {userStats.areasCovered.map((area) => (
                        <div
                          key={area}
                          className="flex items-center justify-between p-3 rounded-lg bg-surface-light"
                        >
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-aimana-teal" />
                            <span className="font-medium text-text text-sm">{area}</span>
                          </div>
                          <Badge variant="success" size="sm">
                            Ativa
                          </Badge>
                        </div>
                      ))}
                      <div className="flex items-center justify-between p-3 rounded-lg bg-surface-light opacity-50">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-text-muted" />
                          <span className="text-text-muted text-sm">Comercial</span>
                        </div>
                        <Badge variant="pending" size="sm">
                          Em breve
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-surface-light opacity-50">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-text-muted" />
                          <span className="text-text-muted text-sm">Operacoes</span>
                        </div>
                        <Badge variant="pending" size="sm">
                          Em breve
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Satisfaction & Feedback */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-status-warning" />
                      <CardTitle className="text-base">Feedback dos Treinamentos</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Overall rating */}
                      <div className="text-center p-4 rounded-xl bg-surface-light">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                'h-5 w-5',
                                i < Math.floor(userStats.satisfactionRating)
                                  ? 'text-status-warning fill-status-warning'
                                  : i < userStats.satisfactionRating
                                  ? 'text-status-warning fill-status-warning/50'
                                  : 'text-text-muted'
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-2xl font-bold text-text">
                          {userStats.satisfactionRating}
                        </p>
                        <p className="text-xs text-text-muted">
                          Media de {userStats.peoplesTrained} avaliacoes
                        </p>
                      </div>

                      {/* Rating breakdown */}
                      <div className="space-y-2">
                        {[
                          { label: 'Clareza', value: 92 },
                          { label: 'Relevancia', value: 88 },
                          { label: 'Praticidade', value: 95 },
                        ].map((rating) => (
                          <div key={rating.label}>
                            <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                              <span>{rating.label}</span>
                              <span>{rating.value}%</span>
                            </div>
                            <Progress value={rating.value} size="sm" variant="default" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Impact summary card */}
              <Card className="bg-gradient-header text-white">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Resumo de Impacto</h3>
                      <p className="text-sm text-white/70">
                        Voce ja contribuiu significativamente para a transformacao digital da
                        organizacao
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold">{userStats.peoplesTrained}</p>
                        <p className="text-xs text-white/60">Vidas impactadas</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold">
                          {userStats.workshopsGiven * 2}h
                        </p>
                        <p className="text-xs text-white/60">De treinamento</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold">
                          {userStats.areasCovered.length}
                        </p>
                        <p className="text-xs text-white/60">Areas alcancadas</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* ================================================================
          FLOATING MENTOR CHAMPION BUTTON + MODAL
          ================================================================ */}

      {/* Floating button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className={cn(
            'fixed bottom-6 right-6 z-50',
            'flex h-14 w-14 items-center justify-center rounded-full',
            'bg-aimana-teal text-aimana-navy shadow-lg shadow-aimana-teal/30',
            'hover:scale-105 hover:shadow-xl hover:shadow-aimana-teal/40',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-aimana-teal focus:ring-offset-2'
          )}
          aria-label="Abrir Mentor Champion"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat modal */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)]">
          <Card className="shadow-2xl border border-surface-border overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-header text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Mentor Champion</h3>
                  <p className="text-xs text-white/70">Coaching para multiplicadores</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                aria-label="Fechar chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3 bg-surface scrollbar-thin">
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
            <div className="border-t border-surface-border p-3 bg-surface">
              <div className="flex gap-2">
                <Input
                  placeholder="Pergunte ao mentor..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                  inputSize="sm"
                />
                <Button size="sm" variant="primary" onClick={handleChatSend}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
