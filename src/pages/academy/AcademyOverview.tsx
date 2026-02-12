/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Academy Overview Page
 * Centro de aprendizado e capacitação em IA com gamificação
 *
 * REESTRUTURADO:
 * - Gamificação: XP, Streaks, Badges, Níveis
 * - Layout mais espaçoso (sem chat sidebar)
 * - Inspirado em Duolingo/Trailhead/Coursera
 * - Tutor IA como botão flutuante
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState } from 'react';
import { Header } from '@/components/layout';
import { AIModal } from '@/components/ai';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
  Progress,
} from '@/components/ui';
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Play,
  Clock,
  TrendingUp,
  Star,
  ArrowRight,
  Bot,
  Code,
  Trophy,
  Target,
  Flame,
  Zap,
  Medal,
  Crown,
  Sparkles,
  CheckCircle2,
  Lock,
  ChevronRight,
  BarChart3,
  Calendar,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

// ============================================================================
// DADOS MOCK
// ============================================================================

// Dados do usuário logado
const currentUser = {
  name: 'Maria Silva',
  level: 7,
  levelName: 'AI Explorer',
  xp: 2450,
  xpToNextLevel: 3000,
  streak: 12,
  totalBadges: 8,
  rank: 3,
  completedModules: 18,
  totalModules: 45,
};

// Níveis de progressão
const levels = [
  { level: 1, name: 'AI Curious', minXP: 0 },
  { level: 5, name: 'AI Learner', minXP: 1000 },
  { level: 7, name: 'AI Explorer', minXP: 2000 },
  { level: 10, name: 'AI Practitioner', minXP: 3500 },
  { level: 15, name: 'AI Champion', minXP: 6000 },
  { level: 20, name: 'AI Master', minXP: 10000 },
];

// Programas de capacitação
const programs = [
  {
    id: 'leaders',
    title: 'AI Leaders',
    subtitle: 'Liderança estratégica em IA',
    description: 'Capacitação para C-Level e diretores sobre estratégia, governança e impacto de IA nos negócios',
    icon: Users,
    color: 'from-blue-500 to-blue-700',
    bgLight: 'bg-blue-500/10',
    textColor: 'text-blue-600',
    href: '/academy/leaders',
    modules: 6,
    duration: '8 horas',
    enrolled: 12,
    completed: 8,
    xpReward: 500,
    difficulty: 'Intermediário',
  },
  {
    id: 'champions',
    title: 'AI Champions',
    subtitle: 'Multiplicadores de IA',
    description: 'Forme embaixadores de IA que disseminam conhecimento e criam soluções no-code/low-code',
    icon: Trophy,
    color: 'from-aimana-teal to-emerald-600',
    bgLight: 'bg-aimana-teal/10',
    textColor: 'text-aimana-teal',
    href: '/academy/champions',
    modules: 10,
    duration: '16 horas',
    enrolled: 28,
    completed: 15,
    xpReward: 1000,
    difficulty: 'Intermediário',
  },
  {
    id: 'coders',
    title: 'AI Coders',
    subtitle: 'Desenvolvimento com IA',
    description: 'Capacitação técnica para desenvolvedores construírem agentes, RAG e soluções de IA avançadas',
    icon: Code,
    color: 'from-aimana-navy to-indigo-800',
    bgLight: 'bg-aimana-navy/10',
    textColor: 'text-aimana-navy',
    href: '/academy/coders',
    modules: 15,
    duration: '40 horas',
    enrolled: 20,
    completed: 5,
    xpReward: 2000,
    difficulty: 'Avançado',
  },
];

// Badges/Conquistas
const badges = [
  { id: 1, name: 'Primeiro Passo', description: 'Complete seu primeiro módulo', icon: '🎯', earned: true, xp: 50 },
  { id: 2, name: 'Streak 7', description: '7 dias consecutivos', icon: '🔥', earned: true, xp: 100 },
  { id: 3, name: 'Explorador', description: 'Acesse todos os programas', icon: '🧭', earned: true, xp: 75 },
  { id: 4, name: 'Quiz Master', description: '100% em 5 quizzes', icon: '🧠', earned: true, xp: 150 },
  { id: 5, name: 'Colaborador', description: 'Ajude 3 colegas no fórum', icon: '🤝', earned: false, xp: 100 },
  { id: 6, name: 'AI Builder', description: 'Crie seu primeiro agente', icon: '🤖', earned: false, xp: 200 },
  { id: 7, name: 'Champion', description: 'Complete AI Champions', icon: '🏆', earned: false, xp: 500 },
  { id: 8, name: 'Velocista', description: 'Complete 3 módulos em 1 semana', icon: '⚡', earned: true, xp: 150 },
];

// Leaderboard
const leaderboard = [
  { rank: 1, name: 'João Santos', xp: 3200, level: 9, streak: 21, avatar: '👨‍💻' },
  { rank: 2, name: 'Ana Costa', xp: 2800, level: 8, streak: 15, avatar: '👩‍🔬' },
  { rank: 3, name: 'Maria Silva', xp: 2450, level: 7, streak: 12, avatar: '👩‍💼', isCurrentUser: true },
  { rank: 4, name: 'Carlos Lima', xp: 2100, level: 6, streak: 8, avatar: '👨‍🏫' },
  { rank: 5, name: 'Beatriz Rocha', xp: 1950, level: 6, streak: 5, avatar: '👩‍🎓' },
];

// Desafio da semana
const weeklyChallenge = {
  title: 'Prompt Engineering Sprint',
  description: 'Complete 3 exercícios de prompt engineering e ganhe XP bônus',
  progress: 1,
  total: 3,
  xpReward: 300,
  deadline: '3 dias restantes',
};

// Atividade recente
const recentActivity = [
  { type: 'module', title: 'Introdução a Agentes de IA', program: 'AI Champions', xp: 75, time: 'Hoje, 14:30' },
  { type: 'badge', title: 'Badge: Quiz Master', program: '', xp: 150, time: 'Ontem, 16:00' },
  { type: 'quiz', title: 'Quiz: Fundamentos de LLMs', program: 'AI Leaders', xp: 50, time: 'Ontem, 10:15' },
  { type: 'module', title: 'RAG: Retrieval Augmented Generation', program: 'AI Coders', xp: 100, time: '2 dias atrás' },
];

// Trilhas recomendadas
const recommendedTracks = [
  { title: 'Prompt Engineering', modules: 5, duration: '3h', difficulty: 'Iniciante', xp: 250 },
  { title: 'Automações com IA', modules: 8, duration: '6h', difficulty: 'Intermediário', xp: 400 },
  { title: 'Segurança e Ética em IA', modules: 4, duration: '2h', difficulty: 'Iniciante', xp: 200 },
];

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export function AcademyOverview() {
  const [showTutorModal, setShowTutorModal] = useState(false);

  const progressPercent = Math.round((currentUser.xp / currentUser.xpToNextLevel) * 100);

  return (
    <div>
      <Header
        title="Academy"
        subtitle="Centro de aprendizado e capacitação em IA"
      />

      <main className="p-6 space-y-6">
        {/* ================================================================ */}
        {/* HERO: STATUS DO USUÁRIO */}
        {/* ================================================================ */}
        <Card className="bg-gradient-to-r from-aimana-navy via-aimana-navy/95 to-aimana-navy/80 text-white overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              {/* User Info */}
              <div className="flex items-center gap-4 flex-1">
                <div className="h-16 w-16 rounded-2xl bg-aimana-teal/20 flex items-center justify-center text-2xl">
                  👩‍💼
                </div>
                <div>
                  <h2 className="text-xl font-bold">Olá, {currentUser.name}!</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-aimana-teal/20 text-aimana-teal border-0">
                      Nível {currentUser.level} — {currentUser.levelName}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-6">
                {/* XP */}
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <Zap className="h-4 w-4 text-aimana-teal" />
                    <span className="text-2xl font-bold">{currentUser.xp.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-white/60">XP Total</p>
                </div>

                {/* Streak */}
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <Flame className="h-4 w-4 text-orange-400" />
                    <span className="text-2xl font-bold">{currentUser.streak}</span>
                  </div>
                  <p className="text-xs text-white/60">Dias seguidos</p>
                </div>

                {/* Badges */}
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <Medal className="h-4 w-4 text-yellow-400" />
                    <span className="text-2xl font-bold">{currentUser.totalBadges}</span>
                  </div>
                  <p className="text-xs text-white/60">Badges</p>
                </div>

                {/* Rank */}
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <Crown className="h-4 w-4 text-yellow-400" />
                    <span className="text-2xl font-bold">#{currentUser.rank}</span>
                  </div>
                  <p className="text-xs text-white/60">Ranking</p>
                </div>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/70">Progresso para Nível {currentUser.level + 1}</span>
                <span className="text-sm text-white/70">{currentUser.xp} / {currentUser.xpToNextLevel} XP</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-aimana-teal to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================================================================ */}
        {/* GRID PRINCIPAL */}
        {/* ================================================================ */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Coluna Principal (2/3) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Desafio da Semana */}
            <Card className="border-l-4 border-l-aimana-teal">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-aimana-teal/10 flex items-center justify-center">
                      <Target className="h-6 w-6 text-aimana-teal" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-text">Desafio da Semana</h3>
                        <Badge variant="primary" size="sm">+{weeklyChallenge.xpReward} XP</Badge>
                      </div>
                      <p className="text-sm font-medium text-text">{weeklyChallenge.title}</p>
                      <p className="text-sm text-text-secondary mt-1">{weeklyChallenge.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-text-muted flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {weeklyChallenge.deadline}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <Progress value={(weeklyChallenge.progress / weeklyChallenge.total) * 100} size="sm" className="flex-1" />
                  <span className="text-sm font-medium text-text">{weeklyChallenge.progress}/{weeklyChallenge.total}</span>
                  <Button size="sm">Continuar</Button>
                </div>
              </CardContent>
            </Card>

            {/* Programas de Capacitação */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text">Programas de Capacitação</h2>
                <Link to="/academy/tracks">
                  <Button variant="ghost" size="sm">
                    Ver Todas as Trilhas
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {programs.map((program) => {
                  const completionPercent = Math.round((program.completed / program.enrolled) * 100);
                  return (
                    <Link key={program.id} to={program.href}>
                      <Card variant="interactive" className="h-full hover:shadow-lg transition-all group">
                        <CardContent className="p-5">
                          {/* Icon & Badge */}
                          <div className="flex items-start justify-between mb-4">
                            <div className={cn(
                              'h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center',
                              program.color
                            )}>
                              <program.icon className="h-6 w-6 text-white" />
                            </div>
                            <Badge variant="outline" size="sm" className="text-xs">
                              +{program.xpReward} XP
                            </Badge>
                          </div>

                          {/* Info */}
                          <h3 className="font-bold text-text mb-1 group-hover:text-aimana-teal transition-colors">
                            {program.title}
                          </h3>
                          <p className="text-xs text-text-muted mb-1">{program.subtitle}</p>
                          <p className="text-xs text-text-secondary mb-4 line-clamp-2">
                            {program.description}
                          </p>

                          {/* Stats */}
                          <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3" />
                              {program.modules} módulos
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {program.duration}
                            </span>
                          </div>

                          {/* Progress */}
                          <div className="flex items-center gap-2">
                            <Progress value={completionPercent} size="sm" className="flex-1" />
                            <span className="text-xs text-text-muted">{completionPercent}%</span>
                          </div>

                          {/* Difficulty */}
                          <div className="flex items-center justify-between mt-3">
                            <Badge variant="secondary" size="sm" className="text-xs">
                              {program.difficulty}
                            </Badge>
                            <span className="text-xs text-text-muted">
                              {program.enrolled} inscritos
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Trilhas Recomendadas */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-aimana-teal" />
                  <CardTitle className="text-base">Recomendado para Você</CardTitle>
                </div>
                <CardDescription>Baseado no seu perfil e progresso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendedTracks.map((track, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-3 rounded-lg border border-surface-border hover:border-aimana-teal/30 hover:bg-surface-light/50 transition-all cursor-pointer"
                    >
                      <div className="h-10 w-10 rounded-lg bg-aimana-teal/10 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-aimana-teal" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-text">{track.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-text-muted mt-1">
                          <span>{track.modules} módulos</span>
                          <span>{track.duration}</span>
                          <Badge variant="secondary" size="sm" className="text-xs">{track.difficulty}</Badge>
                        </div>
                      </div>
                      <Badge variant="outline" size="sm">+{track.xp} XP</Badge>
                      <ChevronRight className="h-4 w-4 text-text-muted" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Atividade Recente */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className={cn(
                        'h-8 w-8 rounded-full flex items-center justify-center',
                        activity.type === 'module' ? 'bg-aimana-teal/10' :
                        activity.type === 'badge' ? 'bg-yellow-100' : 'bg-blue-100'
                      )}>
                        {activity.type === 'module' && <BookOpen className="h-4 w-4 text-aimana-teal" />}
                        {activity.type === 'badge' && <Medal className="h-4 w-4 text-yellow-600" />}
                        {activity.type === 'quiz' && <Target className="h-4 w-4 text-blue-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-text truncate">{activity.title}</p>
                        {activity.program && (
                          <p className="text-xs text-text-muted">{activity.program}</p>
                        )}
                      </div>
                      <Badge variant="outline" size="sm" className="text-xs text-aimana-teal">
                        +{activity.xp} XP
                      </Badge>
                      <span className="text-xs text-text-muted whitespace-nowrap">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna Lateral (1/3) */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <Card className="border-aimana-teal/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-aimana-teal" />
                  <CardTitle className="text-base">Ranking</CardTitle>
                </div>
                <CardDescription>Top learners da organização</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className={cn(
                        'flex items-center gap-3 p-2 rounded-lg transition-colors',
                        user.isCurrentUser ? 'bg-aimana-teal/10 border border-aimana-teal/20' : 'hover:bg-surface-light'
                      )}
                    >
                      <span className={cn(
                        'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold',
                        user.rank === 1 && 'bg-yellow-400 text-yellow-900',
                        user.rank === 2 && 'bg-gray-300 text-gray-700',
                        user.rank === 3 && 'bg-orange-300 text-orange-800',
                        user.rank > 3 && 'bg-surface-light text-text-muted'
                      )}>
                        {user.rank}
                      </span>
                      <span className="text-lg">{user.avatar}</span>
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          'text-sm font-medium truncate',
                          user.isCurrentUser ? 'text-aimana-teal' : 'text-text'
                        )}>
                          {user.name} {user.isCurrentUser && '(Você)'}
                        </p>
                        <p className="text-xs text-text-muted">Nível {user.level}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-text">{user.xp.toLocaleString()}</p>
                        <div className="flex items-center gap-1 text-xs text-text-muted">
                          <Flame className="h-3 w-3 text-orange-400" />
                          {user.streak}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Badges / Conquistas */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Medal className="h-4 w-4 text-yellow-500" />
                    <CardTitle className="text-base">Conquistas</CardTitle>
                  </div>
                  <Badge variant="outline" size="sm">
                    {badges.filter(b => b.earned).length}/{badges.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className={cn(
                        'flex flex-col items-center gap-1 p-2 rounded-lg transition-all',
                        badge.earned
                          ? 'bg-surface-light cursor-pointer hover:bg-aimana-teal/10'
                          : 'opacity-40'
                      )}
                      title={badge.earned ? `${badge.name}: ${badge.description} (+${badge.xp} XP)` : `${badge.name}: ${badge.description} (Bloqueado)`}
                    >
                      <span className="text-2xl">{badge.earned ? badge.icon : '🔒'}</span>
                      <span className="text-[10px] text-text-muted text-center leading-tight truncate w-full">
                        {badge.name}
                      </span>
                    </div>
                  ))}
                </div>
                <Link to="/academy/certifications">
                  <Button variant="ghost" size="sm" className="w-full mt-3">
                    Ver Todas as Conquistas
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Estatísticas da Organização */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-aimana-navy" />
                  <CardTitle className="text-base">Organização</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Pessoas Ativas</span>
                    <span className="text-sm font-bold text-text">60</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Taxa de Conclusão</span>
                    <span className="text-sm font-bold text-status-success">47%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Horas de Aprendizado</span>
                    <span className="text-sm font-bold text-text">480h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Certificações Emitidas</span>
                    <span className="text-sm font-bold text-text">15</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">XP Médio por Pessoa</span>
                    <span className="text-sm font-bold text-aimana-teal">1.450</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-gradient-to-br from-aimana-teal/5 to-aimana-teal/10 border-aimana-teal/20">
              <CardContent className="p-4 space-y-2">
                <Link to="/academy/tracks" className="block">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Explorar Trilhas
                  </Button>
                </Link>
                <Link to="/academy/certifications" className="block">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Award className="h-4 w-4 mr-2" />
                    Certificações
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                  onClick={() => setShowTutorModal(true)}
                >
                  <Bot className="h-4 w-4 mr-2" />
                  Falar com Tutor IA
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Botão Flutuante do Tutor IA */}
      <button
        onClick={() => setShowTutorModal(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-aimana-teal shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center z-50 group"
      >
        <Bot className="h-7 w-7 text-white" />
        <span className="absolute right-full mr-3 bg-aimana-navy text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Tutor IA
        </span>
      </button>

      {/* AI Tutor Modal */}
      <AIModal
        isOpen={showTutorModal}
        onClose={() => setShowTutorModal(false)}
        title="Tutor IA"
        agentName="LIFOW"
        initialPrompt="Olá! Sou o LIFOW, seu tutor de IA personalizado. Posso ajudar com trilhas de aprendizado, explicar conceitos, recomendar conteúdos baseados no seu perfil e responder dúvidas sobre IA. O que gostaria de aprender hoje?"
        suggestedPrompts={[
          'Qual trilha devo começar?',
          'Explique o que é RAG',
          'Como me tornar um AI Champion?',
          'Quais são as melhores práticas de prompt engineering?',
        ]}
      />
    </div>
  );
}
