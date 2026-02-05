/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - AI Champions Program Page
 * Programa de formação de multiplicadores de IA
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
  Trophy,
  Users,
  BookOpen,
  Video,
  Clock,
  CheckCircle2,
  Play,
  Bot,
  Send,
  Award,
  Target,
  Star,
  MessageSquare,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Program phases
const phases = [
  {
    id: 1,
    title: 'Fundamentos',
    description: 'Conhecimentos essenciais sobre IA',
    modules: 4,
    completedModules: 4,
    status: 'completed',
  },
  {
    id: 2,
    title: 'Aplicação Prática',
    description: 'Prompt engineering e ferramentas',
    modules: 4,
    completedModules: 2,
    status: 'in_progress',
  },
  {
    id: 3,
    title: 'Multiplicação',
    description: 'Técnicas de facilitação e treinamento',
    modules: 3,
    completedModules: 0,
    status: 'locked',
  },
  {
    id: 4,
    title: 'Certificação',
    description: 'Projeto final e avaliação',
    modules: 2,
    completedModules: 0,
    status: 'locked',
  },
];

// Champions leaderboard
const champions = [
  { name: 'Maria Silva', area: 'Comercial', points: 1250, badges: 5, people_trained: 15 },
  { name: 'João Santos', area: 'Operações', points: 1180, badges: 4, people_trained: 12 },
  { name: 'Ana Costa', area: 'Produto', points: 1050, badges: 4, people_trained: 10 },
  { name: 'Carlos Lima', area: 'Tech', points: 980, badges: 3, people_trained: 8 },
  { name: 'Paula Nunes', area: 'RH', points: 920, badges: 3, people_trained: 18 },
];

// Upcoming activities
const activities = [
  { title: 'Workshop: Facilitando Treinamentos de IA', date: '18 Fev, 14h', type: 'workshop' },
  { title: 'Mentoria em Grupo - Turma 3', date: '22 Fev, 10h', type: 'mentoring' },
  { title: 'Projeto Final - Apresentações', date: '28 Fev, 9h', type: 'certification' },
];

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export function AIChampions() {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Olá, futuro **AI Champion**! 🏆

O programa AI Champions forma multiplicadores que disseminam conhecimento de IA na organização.

**Seu status:**
📊 Fase 2: Aplicação Prática
✅ 6 de 13 módulos completos
🎯 Próximo: "Chain-of-Thought Prompting"

**Missão dos Champions:**
• Treinar colegas da sua área
• Identificar oportunidades de IA
• Ser ponto focal para dúvidas

Como posso ajudá-lo hoje?`,
    },
  ]);

  const totalModules = phases.reduce((acc, p) => acc + p.modules, 0);
  const completedModules = phases.reduce((acc, p) => acc + p.completedModules, 0);
  const progress = Math.round((completedModules / totalModules) * 100);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: 'user', content: chatInput }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Para treinar sua equipe, recomendo este roteiro:

**Workshop de 2 horas - "IA no Dia a Dia"**

1. **Abertura (15min)**
   - Por que IA importa para nossa área
   - Demo de ferramentas

2. **Hands-on (60min)**
   - Exercícios práticos de prompt
   - Casos de uso da área

3. **Discussão (30min)**
   - Oportunidades identificadas
   - Próximos passos

4. **Encerramento (15min)**
   - Recursos para continuar aprendendo
   - Canal de dúvidas

Posso gerar os slides e materiais de apoio?`,
        },
      ]);
    }, 1500);
  };

  return (
    <div>
      <Header
        title="AI Champions"
        subtitle="Programa de formação de multiplicadores"
      />

      <main className="p-6">
        {/* Progress Banner */}
        <Card className="mb-6 border-l-4 border-l-phase-execute">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-5 w-5 text-phase-execute" />
                  <h2 className="text-lg font-semibold text-text">Jornada de AI Champion</h2>
                </div>
                <p className="text-sm text-text-secondary">
                  Complete o programa e torne-se um multiplicador certificado
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="execute">Multiplicadores</Badge>
                  <span className="text-sm text-text-muted">
                    {completedModules} de {totalModules} módulos
                  </span>
                </div>
              </div>
              <div className="w-full md:w-48">
                <Progress value={progress} showLabel variant="secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Program Phases */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-semibold text-text">Fases do Programa</h2>

            <div className="space-y-4">
              {phases.map((phase, idx) => (
                <Card
                  key={phase.id}
                  variant="interactive"
                  className={cn(
                    phase.status === 'locked' && 'opacity-60'
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold',
                        phase.status === 'completed' && 'bg-status-success text-white',
                        phase.status === 'in_progress' && 'bg-phase-execute text-white',
                        phase.status === 'locked' && 'bg-surface-light text-text-muted'
                      )}>
                        {phase.status === 'completed' ? (
                          <CheckCircle2 className="h-6 w-6" />
                        ) : (
                          idx + 1
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-text">{phase.title}</h3>
                          {phase.status === 'in_progress' && (
                            <Badge variant="execute" size="sm">Em andamento</Badge>
                          )}
                          {phase.status === 'completed' && (
                            <Badge variant="success" size="sm">Completo</Badge>
                          )}
                          {phase.status === 'locked' && (
                            <Badge variant="pending" size="sm">Bloqueado</Badge>
                          )}
                        </div>
                        <p className="text-sm text-text-secondary">{phase.description}</p>

                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                            <span>{phase.completedModules} de {phase.modules} módulos</span>
                            <span>{Math.round((phase.completedModules / phase.modules) * 100)}%</span>
                          </div>
                          <Progress
                            value={(phase.completedModules / phase.modules) * 100}
                            size="sm"
                            variant={phase.status === 'completed' ? 'success' : 'default'}
                          />
                        </div>
                      </div>

                      {phase.status === 'in_progress' && (
                        <Button size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Continuar
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Champions Leaderboard */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-status-warning" />
                  <CardTitle className="text-base">Ranking de Champions</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-surface-border">
                        <th className="text-left p-2 text-xs font-medium text-text-muted">#</th>
                        <th className="text-left p-2 text-xs font-medium text-text-muted">Champion</th>
                        <th className="text-left p-2 text-xs font-medium text-text-muted">Área</th>
                        <th className="text-center p-2 text-xs font-medium text-text-muted">Pontos</th>
                        <th className="text-center p-2 text-xs font-medium text-text-muted">Badges</th>
                        <th className="text-center p-2 text-xs font-medium text-text-muted">Treinados</th>
                      </tr>
                    </thead>
                    <tbody>
                      {champions.map((champion, idx) => (
                        <tr key={idx} className="border-b border-surface-border last:border-0">
                          <td className="p-2">
                            <span className={cn(
                              'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold',
                              idx === 0 && 'bg-status-warning text-white',
                              idx === 1 && 'bg-gray-400 text-white',
                              idx === 2 && 'bg-orange-600 text-white',
                              idx > 2 && 'text-text-muted'
                            )}>
                              {idx + 1}
                            </span>
                          </td>
                          <td className="p-2">
                            <span className="font-medium text-text">{champion.name}</span>
                          </td>
                          <td className="p-2">
                            <span className="text-sm text-text-muted">{champion.area}</span>
                          </td>
                          <td className="p-2 text-center">
                            <span className="font-medium text-aimana-teal">{champion.points}</span>
                          </td>
                          <td className="p-2 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Award className="h-4 w-4 text-status-warning" />
                              <span className="text-sm">{champion.badges}</span>
                            </div>
                          </td>
                          <td className="p-2 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Users className="h-4 w-4 text-text-muted" />
                              <span className="text-sm">{champion.people_trained}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mentor Champion Chat */}
            <Card>
              <CardHeader className="border-b border-surface-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-phase-execute">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Mentor Champion</CardTitle>
                    <CardDescription>Coaching para multiplicadores</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-56 overflow-y-auto p-4 space-y-3 scrollbar-thin">
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
                <div className="border-t border-surface-border p-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Pergunte ao mentor..."
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

            {/* Upcoming Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Próximas Atividades</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {activities.map((activity, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-surface-light">
                    <Badge variant="outline" size="sm" className="mb-1">
                      {activity.type}
                    </Badge>
                    <p className="font-medium text-text text-sm">{activity.title}</p>
                    <p className="text-xs text-text-muted mt-1">{activity.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Your Impact */}
            <Card className="bg-gradient-header text-white">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Seu Impacto</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-xs text-white/70">Pessoas treinadas</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-xs text-white/70">Workshops realizados</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold">980</p>
                    <p className="text-xs text-white/70">Pontos XP</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-xs text-white/70">Badges</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
