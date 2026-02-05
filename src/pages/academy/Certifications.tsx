/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Certifications Page
 * Certificações e credenciais em IA
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
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Available certifications
const certifications = [
  {
    id: 1,
    title: 'AI Fundamentals',
    description: 'Fundamentos de Inteligência Artificial para negócios',
    level: 'Iniciante',
    requirements: ['Completar trilha IA para Líderes', 'Passar no exame (80%)'],
    status: 'earned',
    earnedDate: '2025-01-15',
    expiresDate: '2027-01-15',
    badge: '🎓',
  },
  {
    id: 2,
    title: 'Prompt Engineer',
    description: 'Especialista em comunicação efetiva com LLMs',
    level: 'Intermediário',
    requirements: ['Completar trilha Prompt Engineering', 'Passar no exame (75%)', '5 projetos práticos'],
    status: 'in_progress',
    progress: 67,
    badge: '💬',
  },
  {
    id: 3,
    title: 'AI Champion',
    description: 'Multiplicador certificado de conhecimento em IA',
    level: 'Intermediário',
    requirements: ['Completar programa AI Champions', 'Treinar 10+ pessoas', 'Projeto de impacto'],
    status: 'in_progress',
    progress: 45,
    badge: '🏆',
  },
  {
    id: 4,
    title: 'AI Solutions Architect',
    description: 'Arquiteto de soluções de IA em produção',
    level: 'Avançado',
    requirements: ['Completar programa AI Coders', '3 projetos em produção', 'Exame técnico'],
    status: 'locked',
    badge: '🏗️',
  },
  {
    id: 5,
    title: 'AI Strategy Leader',
    description: 'Líder estratégico de transformação com IA',
    level: 'Avançado',
    requirements: ['Completar AI Leaders', 'Liderar iniciativa de IA', 'Case study apresentado'],
    status: 'locked',
    badge: '👑',
  },
];

// Earned badges
const badges = [
  { name: 'Primeira Trilha', icon: '🎯', date: '2025-01-10', description: 'Completou primeira trilha' },
  { name: 'Maratonista', icon: '🏃', date: '2025-01-20', description: '7 dias seguidos de estudo' },
  { name: 'Questionador', icon: '❓', date: '2025-01-25', description: '50 perguntas ao Tutor IA' },
  { name: 'Compartilhador', icon: '🔗', date: '2025-02-01', description: 'Compartilhou conhecimento' },
];

const statusConfig = {
  earned: { label: 'Conquistado', color: 'bg-status-success', textColor: 'text-status-success' },
  in_progress: { label: 'Em progresso', color: 'bg-phase-execute', textColor: 'text-phase-execute' },
  locked: { label: 'Bloqueado', color: 'bg-text-muted', textColor: 'text-text-muted' },
};

export function Certifications() {
  const earnedCount = certifications.filter((c) => c.status === 'earned').length;
  const inProgressCount = certifications.filter((c) => c.status === 'in_progress').length;

  return (
    <div>
      <Header
        title="Certificações"
        subtitle="Conquiste credenciais e demonstre sua expertise em IA"
      />

      <main className="p-6">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-1">🎓</div>
              <p className="text-2xl font-bold text-text">{earnedCount}</p>
              <p className="text-sm text-text-muted">Certificações</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-1">🏅</div>
              <p className="text-2xl font-bold text-text">{badges.length}</p>
              <p className="text-sm text-text-muted">Badges</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-1">📚</div>
              <p className="text-2xl font-bold text-text">{inProgressCount}</p>
              <p className="text-sm text-text-muted">Em progresso</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-1">⭐</div>
              <p className="text-2xl font-bold text-aimana-teal">1,850</p>
              <p className="text-sm text-text-muted">Pontos XP</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Certifications List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-text">Certificações Disponíveis</h2>

            {certifications.map((cert) => {
              const status = statusConfig[cert.status as keyof typeof statusConfig];
              return (
                <Card
                  key={cert.id}
                  className={cn(
                    cert.status === 'locked' && 'opacity-60'
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        'flex h-14 w-14 items-center justify-center rounded-xl text-2xl',
                        cert.status === 'earned' && 'bg-status-success-bg',
                        cert.status === 'in_progress' && 'bg-phase-execute-bg',
                        cert.status === 'locked' && 'bg-surface-light'
                      )}>
                        {cert.badge}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-text">{cert.title}</h3>
                          <Badge
                            variant={cert.status === 'earned' ? 'success' : cert.status === 'in_progress' ? 'execute' : 'pending'}
                          >
                            {status.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-text-secondary mb-2">{cert.description}</p>

                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" size="sm">{cert.level}</Badge>
                          {cert.status === 'earned' && cert.earnedDate && (
                            <span className="text-xs text-text-muted">
                              Conquistado em {new Date(cert.earnedDate).toLocaleDateString('pt-BR')}
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
                          <p className="text-xs font-medium text-text-muted mb-1">Requisitos:</p>
                          <ul className="space-y-1">
                            {cert.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-xs text-text-secondary">
                                {cert.status === 'earned' ? (
                                  <CheckCircle2 className="h-3 w-3 text-status-success" />
                                ) : cert.status === 'locked' ? (
                                  <Lock className="h-3 w-3 text-text-muted" />
                                ) : (
                                  <div className="h-3 w-3 rounded-full border border-text-muted" />
                                )}
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex gap-2">
                          {cert.status === 'earned' && (
                            <>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Baixar
                              </Button>
                              <Button variant="outline" size="sm">
                                <Share2 className="h-4 w-4 mr-1" />
                                Compartilhar
                              </Button>
                            </>
                          )}
                          {cert.status === 'in_progress' && (
                            <Button size="sm">
                              Continuar
                            </Button>
                          )}
                          {cert.status === 'locked' && (
                            <Button variant="outline" size="sm" disabled>
                              <Lock className="h-4 w-4 mr-1" />
                              Bloqueado
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
          <div className="space-y-6">
            {/* Badges Collection */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-status-warning" />
                  <CardTitle className="text-base">Suas Badges</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {badges.map((badge, idx) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-lg bg-surface-light flex items-center justify-center text-2xl cursor-pointer hover:bg-surface-border transition-colors"
                      title={badge.name}
                    >
                      {badge.icon}
                    </div>
                  ))}
                  {/* Empty slots */}
                  {Array.from({ length: 4 - (badges.length % 4) }).map((_, idx) => (
                    <div
                      key={`empty-${idx}`}
                      className="aspect-square rounded-lg bg-surface-light flex items-center justify-center border-2 border-dashed border-surface-border"
                    >
                      <Lock className="h-4 w-4 text-text-muted" />
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {badges.slice(0, 3).map((badge, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <span className="text-lg">{badge.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-text">{badge.name}</p>
                        <p className="text-xs text-text-muted">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Next Badge */}
            <Card className="border-aimana-teal/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-4 w-4 text-aimana-teal" />
                  <span className="font-medium text-text">Próxima Badge</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-aimana-teal/10">
                  <div className="text-2xl">🧠</div>
                  <div>
                    <p className="font-medium text-text">Expert</p>
                    <p className="text-xs text-text-muted">Complete 5 trilhas</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                    <span>3 de 5 trilhas</span>
                    <span>60%</span>
                  </div>
                  <Progress value={60} size="sm" variant="secondary" />
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card className="bg-gradient-header text-white">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Top Certificados</h3>
                <div className="space-y-2">
                  {[
                    { name: 'Maria Silva', certs: 4, rank: 1 },
                    { name: 'João Santos', certs: 3, rank: 2 },
                    { name: 'Ana Costa', certs: 3, rank: 3 },
                  ].map((user) => (
                    <div key={user.rank} className="flex items-center gap-3">
                      <span className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold',
                        user.rank === 1 && 'bg-status-warning',
                        user.rank === 2 && 'bg-gray-400',
                        user.rank === 3 && 'bg-orange-600'
                      )}>
                        {user.rank}
                      </span>
                      <span className="flex-1 text-sm">{user.name}</span>
                      <div className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        <span className="text-xs">{user.certs}</span>
                      </div>
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
