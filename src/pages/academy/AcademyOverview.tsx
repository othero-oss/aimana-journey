/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Academy Overview Page
 * Centro de aprendizado e capacitação em IA
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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

// Learning programs
const programs = [
  {
    id: 'leaders',
    title: 'AI Leaders',
    subtitle: 'Liderança estratégica em IA',
    description: 'Capacitação para C-Level e diretores sobre estratégia e governança de IA',
    icon: Users,
    color: 'bg-phase-plan',
    href: '/academy/leaders',
    modules: 6,
    duration: '8 horas',
    enrolled: 12,
    completed: 8,
  },
  {
    id: 'champions',
    title: 'AI Champions',
    subtitle: 'Multiplicadores de IA',
    description: 'Forme embaixadores de IA que disseminam conhecimento na organização',
    icon: Trophy,
    color: 'bg-phase-execute',
    href: '/academy/champions',
    modules: 10,
    duration: '16 horas',
    enrolled: 28,
    completed: 15,
  },
  {
    id: 'coders',
    title: 'AI Coders',
    subtitle: 'Desenvolvimento com IA',
    description: 'Capacitação técnica para desenvolvedores construírem soluções de IA',
    icon: Code,
    color: 'bg-phase-manage',
    href: '/academy/coders',
    modules: 15,
    duration: '40 horas',
    enrolled: 20,
    completed: 5,
  },
];

// Quick stats
const stats = [
  { label: 'Pessoas Capacitando', value: 60, icon: Users, trend: '+12' },
  { label: 'Trilhas Completas', value: 28, icon: Award, trend: '+5' },
  { label: 'Horas de Aprendizado', value: 480, icon: Clock, trend: '+86' },
  { label: 'Certificações', value: 15, icon: GraduationCap, trend: '+3' },
];

// Featured content
const featuredContent = [
  {
    title: 'Workshop: IA Generativa na Prática',
    type: 'Ao Vivo',
    date: '12 Fev, 14h',
    instructor: 'Dra. Ana Costa',
  },
  {
    title: 'Prompt Engineering Avançado',
    type: 'Novo Curso',
    date: 'Disponível agora',
    instructor: 'Carlos Lima',
  },
  {
    title: 'LangChain: Do Zero ao Deploy',
    type: 'Série',
    date: '5 episódios',
    instructor: 'Tech Team',
  },
];

export function AcademyOverview() {
  const totalEnrolled = programs.reduce((acc, p) => acc + p.enrolled, 0);
  const totalCompleted = programs.reduce((acc, p) => acc + p.completed, 0);

  return (
    <div>
      <Header
        title="Academy"
        subtitle="Centro de aprendizado e capacitação em IA"
      />

      <main className="p-6">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          {stats.map((stat, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-muted">{stat.label}</p>
                    <p className="text-2xl font-bold text-text">{stat.value}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="h-10 w-10 rounded-lg bg-aimana-teal/10 flex items-center justify-center mb-1">
                      <stat.icon className="h-5 w-5 text-aimana-teal" />
                    </div>
                    <span className="text-xs text-status-success">{stat.trend}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Hero Banner */}
        <Card className="mb-6 bg-gradient-header text-white overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="max-w-xl">
                <Badge className="bg-white/20 text-white mb-3">Tutor IA</Badge>
                <h2 className="text-2xl font-bold mb-2">Aprendizado Personalizado com IA</h2>
                <p className="text-white/80 mb-4">
                  Nosso tutor inteligente cria trilhas personalizadas baseadas no seu perfil,
                  objetivos e ritmo de aprendizado.
                </p>
                <Link to="/academy/tutor">
                  <Button className="bg-white text-aimana-navy hover:bg-white/90">
                    <Bot className="h-4 w-4 mr-2" />
                    Falar com Tutor IA
                  </Button>
                </Link>
              </div>
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-aimana-teal/20" />
                  <div className="relative z-10 w-24 h-24 rounded-full bg-aimana-teal flex items-center justify-center">
                    <Bot className="h-12 w-12 text-aimana-navy" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Programs */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text">Programas de Capacitação</h2>
              <Link to="/academy/tracks">
                <Button variant="outline" size="sm">
                  Ver Todas as Trilhas
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>

            {programs.map((program) => (
              <Link key={program.id} to={program.href}>
                <Card variant="interactive" className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        'flex h-14 w-14 items-center justify-center rounded-xl',
                        program.color
                      )}>
                        <program.icon className="h-7 w-7 text-white" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div>
                            <h3 className="font-semibold text-text">{program.title}</h3>
                            <p className="text-sm text-text-muted">{program.subtitle}</p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-text-muted" />
                        </div>

                        <p className="text-sm text-text-secondary mb-3">{program.description}</p>

                        <div className="flex items-center gap-4 text-xs text-text-muted mb-2">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {program.modules} módulos
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {program.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {program.enrolled} inscritos
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <Progress
                            value={(program.completed / program.enrolled) * 100}
                            size="sm"
                            className="flex-1"
                          />
                          <span className="text-xs text-text-muted">
                            {program.completed} completaram
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

            {/* Progress Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Progresso Geral da Organização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-surface-light">
                    <p className="text-3xl font-bold text-text">{totalEnrolled}</p>
                    <p className="text-sm text-text-muted">Inscritos</p>
                  </div>
                  <div className="p-4 rounded-lg bg-surface-light">
                    <p className="text-3xl font-bold text-status-success">{totalCompleted}</p>
                    <p className="text-sm text-text-muted">Completaram</p>
                  </div>
                  <div className="p-4 rounded-lg bg-surface-light">
                    <p className="text-3xl font-bold text-aimana-teal">
                      {Math.round((totalCompleted / totalEnrolled) * 100)}%
                    </p>
                    <p className="text-sm text-text-muted">Taxa de Conclusão</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Content */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-status-warning" />
                  <CardTitle className="text-base">Destaques</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {featuredContent.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-surface-border hover:border-aimana-teal cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="outline" size="sm">{item.type}</Badge>
                      <span className="text-xs text-text-muted">{item.date}</span>
                    </div>
                    <p className="font-medium text-text text-sm">{item.title}</p>
                    <p className="text-xs text-text-muted">{item.instructor}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/academy/tracks" className="block">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Explorar Trilhas
                  </Button>
                </Link>
                <Link to="/academy/tutor" className="block">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Bot className="h-4 w-4 mr-2" />
                    Falar com Tutor
                  </Button>
                </Link>
                <Link to="/academy/certifications" className="block">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Award className="h-4 w-4 mr-2" />
                    Ver Certificações
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Leaderboard Preview */}
            <Card className="border-aimana-teal/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-aimana-teal" />
                  <CardTitle className="text-base">Top Learners</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { name: 'Maria Silva', points: 1250, rank: 1 },
                    { name: 'João Santos', points: 1180, rank: 2 },
                    { name: 'Ana Costa', points: 1050, rank: 3 },
                  ].map((user) => (
                    <div key={user.rank} className="flex items-center gap-3">
                      <span className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold',
                        user.rank === 1 && 'bg-status-warning text-white',
                        user.rank === 2 && 'bg-gray-400 text-white',
                        user.rank === 3 && 'bg-orange-600 text-white'
                      )}>
                        {user.rank}
                      </span>
                      <span className="flex-1 text-sm text-text">{user.name}</span>
                      <span className="text-xs text-text-muted">{user.points} pts</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
