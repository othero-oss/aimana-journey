/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Certifications Page
 * Certificações e credenciais em IA com gamificação avançada
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
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui';
import {
  Award,
  CheckCircle2,
  Clock,
  Download,
  Share2,
  Lock,
  Star,
  Trophy,
  Target,
  Zap,
  Shield,
  GraduationCap,
  Flame,
  TrendingUp,
  ExternalLink,
  Calendar,
  Users,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Available certifications with XP
const certifications = [
  {
    id: 1,
    title: 'AI Fundamentals',
    description: 'Fundamentos de Inteligência Artificial para negócios',
    level: 'Iniciante',
    requirements: [
      { text: 'Completar trilha IA para Líderes', done: true },
      { text: 'Passar no exame (80%)', done: true },
    ],
    status: 'earned' as const,
    earnedDate: '2025-01-15',
    expiresDate: '2027-01-15',
    xpReward: 500,
    badge: '🎓',
    color: 'border-l-status-success',
    holders: 45,
  },
  {
    id: 2,
    title: 'Prompt Engineer',
    description: 'Especialista em comunicação efetiva com LLMs',
    level: 'Intermediário',
    requirements: [
      { text: 'Completar trilha Prompt Engineering', done: true },
      { text: 'Passar no exame (75%)', done: false },
      { text: '5 projetos práticos', done: false },
    ],
    status: 'in_progress' as const,
    progress: 67,
    xpReward: 750,
    badge: '💬',
    color: 'border-l-phase-execute',
    holders: 28,
  },
  {
    id: 3,
    title: 'AI Champion',
    description: 'Multiplicador certificado de conhecimento em IA',
    level: 'Intermediário',
    requirements: [
      { text: 'Completar programa AI Champions', done: false },
      { text: 'Treinar 10+ pessoas', done: false },
      { text: 'Projeto de impacto', done: false },
    ],
    status: 'in_progress' as const,
    progress: 45,
    xpReward: 1000,
    badge: '🏆',
    color: 'border-l-phase-execute',
    holders: 15,
  },
  {
    id: 4,
    title: 'AI Solutions Architect',
    description: 'Arquiteto de soluções de IA em produção',
    level: 'Avançado',
    requirements: [
      { text: 'Completar programa AI Coders', done: false },
      { text: '3 projetos em produção', done: false },
      { text: 'Exame técnico', done: false },
    ],
    status: 'locked' as const,
    xpReward: 1500,
    badge: '🏗️',
    color: 'border-l-text-muted',
    holders: 5,
  },
  {
    id: 5,
    title: 'AI Strategy Leader',
    description: 'Líder estratégico de transformação com IA',
    level: 'Avançado',
    requirements: [
      { text: 'Completar AI Leaders', done: false },
      { text: 'Liderar iniciativa de IA', done: false },
      { text: 'Case study apresentado', done: false },
    ],
    status: 'locked' as const,
    xpReward: 2000,
    badge: '👑',
    color: 'border-l-text-muted',
    holders: 3,
  },
];

// Badge collection with levels
const badgeCollection = [
  { name: 'Primeira Trilha', icon: '🎯', date: '10 Jan', earned: true, xp: 50, description: 'Completou primeira trilha' },
  { name: 'Maratonista', icon: '🏃', date: '20 Jan', earned: true, xp: 100, description: '7 dias seguidos de estudo' },
  { name: 'Questionador', icon: '❓', date: '25 Jan', earned: true, xp: 75, description: '50 perguntas ao Tutor IA' },
  { name: 'Compartilhador', icon: '🔗', date: '1 Fev', earned: true, xp: 50, description: 'Compartilhou conhecimento' },
  { name: 'Mentor', icon: '🧑‍🏫', date: null, earned: false, xp: 150, description: 'Mentore 5 colegas' },
  { name: 'Expert', icon: '🧠', date: null, earned: false, xp: 200, description: 'Complete 5 trilhas' },
  { name: 'Inovador', icon: '💡', date: null, earned: false, xp: 250, description: 'Submeta 3 ideias de IA' },
  { name: 'Arquiteto', icon: '🏛️', date: null, earned: false, xp: 500, description: 'Deploy 3 soluções de IA' },
  { name: 'Líder IA', icon: '👑', date: null, earned: false, xp: 1000, description: 'Todas as certificações' },
];

// Leaderboard
const leaderboard = [
  { rank: 1, name: 'Maria Silva', area: 'Produto', certs: 4, badges: 8, xp: 4250 },
  { rank: 2, name: 'João Santos', area: 'Tech', certs: 3, badges: 7, xp: 3800 },
  { rank: 3, name: 'Ana Costa', area: 'Operações', certs: 3, badges: 6, xp: 3200 },
  { rank: 4, name: 'Carlos Lima', area: 'Comercial', certs: 2, badges: 5, xp: 2800 },
  { rank: 5, name: 'Paula Nunes', area: 'RH', certs: 2, badges: 5, xp: 2600 },
  { rank: 6, name: 'Roberto Dias', area: 'Finance', certs: 1, badges: 4, xp: 1850 },
  { rank: 7, name: 'Você', area: 'Operações', certs: 1, badges: 4, xp: 1850, isYou: true },
];

const statusConfig = {
  earned: { label: 'Conquistado', variant: 'success' as const },
  in_progress: { label: 'Em progresso', variant: 'execute' as const },
  locked: { label: 'Bloqueado', variant: 'pending' as const },
};

export function Certifications() {
  const [activeTab, setActiveTab] = useState('certifications');
  const earnedCount = certifications.filter((c) => c.status === 'earned').length;
  const inProgressCount = certifications.filter((c) => c.status === 'in_progress').length;
  const earnedBadges = badgeCollection.filter((b) => b.earned).length;
  const totalXp = 1850;

  return (
    <div>
      <Header
        title="Certificações & Conquistas"
        subtitle="Conquiste credenciais e demonstre sua expertise em IA"
      />

      <main className="p-6">
        {/* Hero Stats */}
        <div className="grid gap-4 md:grid-cols-5 mb-6">
          <Card className="border-l-4 border-l-aimana-teal">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-aimana-teal/10">
                  <Zap className="h-6 w-6 text-aimana-teal" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">{totalXp.toLocaleString()}</p>
                  <p className="text-xs text-text-muted">XP Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-status-success">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-status-success/10">
                  <GraduationCap className="h-6 w-6 text-status-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">{earnedCount}</p>
                  <p className="text-xs text-text-muted">Certificações</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-status-warning">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-status-warning/10">
                  <Trophy className="h-6 w-6 text-status-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">{earnedBadges}</p>
                  <p className="text-xs text-text-muted">Badges</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-phase-execute">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-phase-execute/10">
                  <TrendingUp className="h-6 w-6 text-phase-execute" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">{inProgressCount}</p>
                  <p className="text-xs text-text-muted">Em progresso</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-phase-plan">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-phase-plan/10">
                  <BarChart3 className="h-6 w-6 text-phase-plan" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">#7</p>
                  <p className="text-xs text-text-muted">Ranking</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="mb-6 bg-gradient-to-r from-aimana-navy via-aimana-blue to-aimana-teal text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold">
                  3
                </div>
                <div>
                  <p className="text-sm text-white/70">Seu Nível</p>
                  <p className="text-xl font-bold">Intermediário</p>
                  <p className="text-xs text-white/60">1,850 / 2,500 XP para Nível 4 (Avançado)</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{earnedCount}/{certifications.length}</p>
                  <p className="text-xs text-white/60">Certificações</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{earnedBadges}/{badgeCollection.length}</p>
                  <p className="text-xs text-white/60">Badges</p>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <Progress value={74} size="sm" className="bg-white/20" />
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="certifications">
              <GraduationCap className="h-4 w-4 mr-2" />
              Certificações
            </TabsTrigger>
            <TabsTrigger value="badges">
              <Trophy className="h-4 w-4 mr-2" />
              Badges
            </TabsTrigger>
            <TabsTrigger value="ranking">
              <BarChart3 className="h-4 w-4 mr-2" />
              Ranking
            </TabsTrigger>
          </TabsList>

          {/* Certifications Tab */}
          <TabsContent value="certifications">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-lg font-semibold text-text">Certificações Disponíveis</h2>

                {certifications.map((cert) => {
                  const status = statusConfig[cert.status];
                  return (
                    <Card
                      key={cert.id}
                      className={cn(
                        'border-l-4',
                        cert.color,
                        cert.status === 'locked' && 'opacity-60'
                      )}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className={cn(
                            'flex h-16 w-16 items-center justify-center rounded-2xl text-3xl',
                            cert.status === 'earned' && 'bg-status-success/10',
                            cert.status === 'in_progress' && 'bg-phase-execute/10',
                            cert.status === 'locked' && 'bg-surface-light'
                          )}>
                            {cert.badge}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg text-text">{cert.title}</h3>
                              <Badge variant={status.variant}>
                                {status.label}
                              </Badge>
                            </div>
                            <p className="text-sm text-text-secondary mb-3">{cert.description}</p>

                            <div className="flex items-center gap-3 mb-3">
                              <Badge variant={cert.level === 'Iniciante' ? 'success' : cert.level === 'Intermediário' ? 'warning' : 'error'} size="sm">
                                {cert.level}
                              </Badge>
                              <span className="flex items-center gap-1 text-xs text-aimana-teal font-medium">
                                <Zap className="h-3 w-3" />
                                +{cert.xpReward} XP
                              </span>
                              <span className="flex items-center gap-1 text-xs text-text-muted">
                                <Users className="h-3 w-3" />
                                {cert.holders} certificados
                              </span>
                              {cert.status === 'earned' && cert.earnedDate && (
                                <span className="flex items-center gap-1 text-xs text-text-muted">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(cert.earnedDate).toLocaleDateString('pt-BR')}
                                </span>
                              )}
                            </div>

                            {cert.status === 'in_progress' && 'progress' in cert && (
                              <div className="mb-3">
                                <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                                  <span>Progresso</span>
                                  <span>{cert.progress}%</span>
                                </div>
                                <Progress value={cert.progress} size="sm" />
                              </div>
                            )}

                            <div className="mb-3">
                              <p className="text-xs font-medium text-text-muted mb-2">Requisitos:</p>
                              <div className="space-y-1.5">
                                {cert.requirements.map((req, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-sm">
                                    {req.done ? (
                                      <CheckCircle2 className="h-4 w-4 text-status-success flex-shrink-0" />
                                    ) : cert.status === 'locked' ? (
                                      <Lock className="h-4 w-4 text-text-muted flex-shrink-0" />
                                    ) : (
                                      <div className="h-4 w-4 rounded-full border-2 border-text-muted flex-shrink-0" />
                                    )}
                                    <span className={cn(
                                      'text-text-secondary',
                                      req.done && 'line-through text-text-muted'
                                    )}>
                                      {req.text}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              {cert.status === 'earned' && (
                                <>
                                  <Button variant="primary" size="sm">
                                    <Download className="h-4 w-4 mr-1" />
                                    Baixar Certificado
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Share2 className="h-4 w-4 mr-1" />
                                    LinkedIn
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <ExternalLink className="h-4 w-4 mr-1" />
                                    Verificar
                                  </Button>
                                </>
                              )}
                              {cert.status === 'in_progress' && (
                                <Button size="sm">
                                  Continuar Jornada
                                </Button>
                              )}
                              {cert.status === 'locked' && (
                                <Button variant="outline" size="sm" disabled>
                                  <Lock className="h-4 w-4 mr-1" />
                                  Desbloqueie os pré-requisitos
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Certificate Preview */}
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-br from-aimana-navy to-aimana-blue p-6 text-center text-white">
                    <div className="flex justify-center mb-3">
                      <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                        <Award className="h-8 w-8" />
                      </div>
                    </div>
                    <p className="text-xs text-white/60 uppercase tracking-wider mb-1">Certificado</p>
                    <p className="text-lg font-bold">AI Fundamentals</p>
                    <p className="text-xs text-white/70 mt-1">Aimana Journey Academy</p>
                    <div className="mt-3 flex items-center justify-center gap-1">
                      <Shield className="h-3 w-3 text-aimana-teal" />
                      <span className="text-xs text-aimana-teal">Verificável digitalmente</span>
                    </div>
                  </div>
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-text-muted mb-3">
                      Certificados verificáveis com blockchain e compartilháveis no LinkedIn
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-1" />
                      Visualizar certificado
                    </Button>
                  </CardContent>
                </Card>

                {/* Next Milestone */}
                <Card className="border-aimana-teal/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="h-4 w-4 text-aimana-teal" />
                      <span className="font-medium text-sm text-text">Próximo Marco</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-aimana-teal/10 mb-3">
                      <div className="text-2xl">💬</div>
                      <div>
                        <p className="font-medium text-text text-sm">Prompt Engineer</p>
                        <p className="text-xs text-text-muted">67% completo</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between text-text-muted">
                        <span>Faltam:</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full border-2 border-text-muted" />
                        <span className="text-text-secondary">Passar no exame</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full border-2 border-text-muted" />
                        <span className="text-text-secondary">3 projetos práticos</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Organization Stats */}
                <Card className="bg-gradient-header text-white">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Academy na Organização</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/80">Total certificados</span>
                        <span className="font-bold">96</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/80">Participantes ativos</span>
                        <span className="font-bold">128</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/80">Badges distribuídos</span>
                        <span className="font-bold">342</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/80">Nota média exames</span>
                        <span className="font-bold">87%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-text">Coleção de Badges</h2>
                  <Badge variant="outline">
                    {earnedBadges} de {badgeCollection.length} conquistados
                  </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {badgeCollection.map((badge, idx) => (
                    <Card
                      key={idx}
                      className={cn(
                        'text-center',
                        !badge.earned && 'opacity-50'
                      )}
                    >
                      <CardContent className="p-4">
                        <div className={cn(
                          'w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center text-3xl',
                          badge.earned ? 'bg-status-warning/10' : 'bg-surface-light'
                        )}>
                          {badge.earned ? badge.icon : (
                            <Lock className="h-6 w-6 text-text-muted" />
                          )}
                        </div>
                        <h3 className="font-semibold text-text text-sm">{badge.name}</h3>
                        <p className="text-xs text-text-muted mt-1">{badge.description}</p>
                        <div className="mt-2">
                          {badge.earned ? (
                            <Badge variant="success" size="sm">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              {badge.date}
                            </Badge>
                          ) : (
                            <Badge variant="outline" size="sm">
                              <Zap className="h-3 w-3 mr-1" />
                              +{badge.xp} XP
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {/* Badge Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Progresso de Badges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-text">🧑‍🏫 Mentor</span>
                          <span className="text-text-muted">3/5 mentorados</span>
                        </div>
                        <Progress value={60} size="sm" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-text">🧠 Expert</span>
                          <span className="text-text-muted">3/5 trilhas</span>
                        </div>
                        <Progress value={60} size="sm" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-text">💡 Inovador</span>
                          <span className="text-text-muted">1/3 ideias</span>
                        </div>
                        <Progress value={33} size="sm" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Badge XP Summary */}
                <Card className="bg-gradient-to-br from-status-warning/10 to-status-warning/5 border-status-warning/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Trophy className="h-5 w-5 text-status-warning" />
                      <span className="font-medium text-text">XP por Badges</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-text-muted">XP ganho</span>
                      <span className="font-bold text-aimana-teal">275 XP</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-muted">XP disponível</span>
                      <span className="font-bold text-text-muted">2,100 XP</span>
                    </div>
                    <p className="text-xs text-text-muted mt-3">
                      Conquiste mais badges para acumular XP e subir de nível!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Ranking Tab */}
          <TabsContent value="ranking">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="text-lg font-semibold text-text mb-4">Ranking Geral</h2>

                {/* Top 3 Podium */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {leaderboard.slice(0, 3).map((user) => (
                    <Card key={user.rank} className={cn(
                      'text-center',
                      user.rank === 1 && 'border-status-warning ring-2 ring-status-warning/20'
                    )}>
                      <CardContent className="p-4">
                        <div className={cn(
                          'w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-lg font-bold text-white',
                          user.rank === 1 && 'bg-status-warning',
                          user.rank === 2 && 'bg-gray-400',
                          user.rank === 3 && 'bg-orange-600'
                        )}>
                          {user.rank}
                        </div>
                        <p className="font-semibold text-text text-sm">{user.name}</p>
                        <p className="text-xs text-text-muted">{user.area}</p>
                        <div className="mt-2 flex items-center justify-center gap-1">
                          <Zap className="h-3 w-3 text-aimana-teal" />
                          <span className="text-sm font-bold text-aimana-teal">{user.xp.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-center gap-3 mt-1 text-xs text-text-muted">
                          <span>{user.certs} certs</span>
                          <span>{user.badges} badges</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Full Table */}
                <Card>
                  <CardContent className="p-0">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-surface-border">
                          <th className="text-left p-3 text-xs font-medium text-text-muted w-12">#</th>
                          <th className="text-left p-3 text-xs font-medium text-text-muted">Participante</th>
                          <th className="text-center p-3 text-xs font-medium text-text-muted">Certs</th>
                          <th className="text-center p-3 text-xs font-medium text-text-muted">Badges</th>
                          <th className="text-right p-3 text-xs font-medium text-text-muted">XP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboard.map((user) => (
                          <tr
                            key={user.rank}
                            className={cn(
                              'border-b border-surface-border last:border-0',
                              'isYou' in user && user.isYou && 'bg-aimana-teal/5'
                            )}
                          >
                            <td className="p-3">
                              <span className={cn(
                                'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold',
                                user.rank === 1 && 'bg-status-warning text-white',
                                user.rank === 2 && 'bg-gray-400 text-white',
                                user.rank === 3 && 'bg-orange-600 text-white',
                                user.rank > 3 && 'text-text-muted'
                              )}>
                                {user.rank}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-aimana-navy flex items-center justify-center text-white text-xs font-medium">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                  <p className={cn(
                                    'font-medium text-text text-sm',
                                    'isYou' in user && user.isYou && 'text-aimana-teal'
                                  )}>
                                    {user.name}
                                    {'isYou' in user && user.isYou && (
                                      <Badge variant="execute" size="sm" className="ml-2">Você</Badge>
                                    )}
                                  </p>
                                  <p className="text-xs text-text-muted">{user.area}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <GraduationCap className="h-4 w-4 text-text-muted" />
                                <span className="text-sm font-medium">{user.certs}</span>
                              </div>
                            </td>
                            <td className="p-3 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Trophy className="h-4 w-4 text-status-warning" />
                                <span className="text-sm font-medium">{user.badges}</span>
                              </div>
                            </td>
                            <td className="p-3 text-right">
                              <span className="font-bold text-aimana-teal">{user.xp.toLocaleString()}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                {/* Your Position */}
                <Card className="bg-gradient-header text-white">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Sua Posição</h3>
                    <div className="text-center mb-4">
                      <p className="text-4xl font-bold">#7</p>
                      <p className="text-sm text-white/70">de 128 participantes</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Para subir 1 posição</span>
                        <span className="font-bold">+150 XP</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">Para Top 5</span>
                        <span className="font-bold">+950 XP</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Wins */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">XP Rápido</CardTitle>
                    <CardDescription>Ações para subir no ranking</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-surface-light">
                      <Zap className="h-4 w-4 text-aimana-teal" />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-text">Completar exame Prompt Engineer</p>
                      </div>
                      <Badge variant="success" size="sm">+750 XP</Badge>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-surface-light">
                      <Zap className="h-4 w-4 text-aimana-teal" />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-text">Badge "Mentor" (2 mentorias)</p>
                      </div>
                      <Badge variant="success" size="sm">+150 XP</Badge>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-surface-light">
                      <Zap className="h-4 w-4 text-aimana-teal" />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-text">Conversa com Tutor (diária)</p>
                      </div>
                      <Badge variant="success" size="sm">+15 XP</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
