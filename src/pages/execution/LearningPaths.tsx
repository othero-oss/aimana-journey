/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Learning Paths Page
 * Trilhas de aprendizado e capacitação em IA
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
  GraduationCap,
  BookOpen,
  Video,
  FileText,
  Clock,
  Users,
  CheckCircle2,
  Play,
  Bot,
  Send,
  Award,
  TrendingUp,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Learning paths
const learningPaths = [
  {
    id: 1,
    title: 'IA para Líderes',
    description: 'Fundamentos de IA para tomada de decisão executiva',
    audience: 'C-Level, Diretores',
    duration: '4 horas',
    modules: 6,
    completedModules: 4,
    enrolled: 12,
    rating: 4.8,
    level: 'Iniciante',
    contents: [
      { type: 'video', name: 'O que é IA e por que importa', duration: '15min', completed: true },
      { type: 'article', name: 'Casos de uso estratégicos', duration: '10min', completed: true },
      { type: 'video', name: 'Como avaliar oportunidades de IA', duration: '20min', completed: true },
      { type: 'quiz', name: 'Avaliação de conhecimento', duration: '10min', completed: true },
      { type: 'video', name: 'Governança e ética em IA', duration: '25min', completed: false },
      { type: 'project', name: 'Plano de ação para sua área', duration: '60min', completed: false },
    ],
  },
  {
    id: 2,
    title: 'Prompt Engineering',
    description: 'Técnicas avançadas de comunicação com LLMs',
    audience: 'Analistas, Desenvolvedores',
    duration: '8 horas',
    modules: 10,
    completedModules: 2,
    enrolled: 28,
    rating: 4.9,
    level: 'Intermediário',
    contents: [
      { type: 'video', name: 'Anatomia de um prompt', duration: '20min', completed: true },
      { type: 'lab', name: 'Playground: Primeiros prompts', duration: '30min', completed: true },
      { type: 'video', name: 'Técnicas de few-shot learning', duration: '25min', completed: false },
      { type: 'lab', name: 'Exercícios práticos', duration: '45min', completed: false },
      { type: 'video', name: 'Chain-of-thought prompting', duration: '20min', completed: false },
    ],
  },
  {
    id: 3,
    title: 'Construindo Agentes com LangChain',
    description: 'Do conceito à produção com agentes autônomos',
    audience: 'Desenvolvedores',
    duration: '12 horas',
    modules: 15,
    completedModules: 0,
    enrolled: 8,
    rating: 4.7,
    level: 'Avançado',
    contents: [
      { type: 'video', name: 'Arquitetura de agentes', duration: '30min', completed: false },
      { type: 'article', name: 'Ferramentas e plugins', duration: '15min', completed: false },
      { type: 'lab', name: 'Seu primeiro agente', duration: '60min', completed: false },
    ],
  },
];

// Team progress
const teamProgress = [
  { name: 'Equipe Comercial', enrolled: 15, completed: 8, avgProgress: 72 },
  { name: 'Equipe Produto', enrolled: 12, completed: 5, avgProgress: 58 },
  { name: 'Equipe Tech', enrolled: 20, completed: 12, avgProgress: 85 },
  { name: 'Liderança', enrolled: 8, completed: 6, avgProgress: 90 },
];

const contentTypeIcons = {
  video: Video,
  article: FileText,
  quiz: Award,
  lab: BookOpen,
  project: GraduationCap,
};

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export function LearningPaths() {
  const [chatInput, setChatInput] = useState('');
  const [selectedPath, setSelectedPath] = useState(learningPaths[0]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Olá! Sou o **LearningAgent**. Posso ajudá-lo a:

• Recomendar trilhas por perfil
• Criar planos de estudo personalizados
• Acompanhar progresso de equipes
• Sugerir conteúdos complementares

Baseado no seu perfil, recomendo continuar a trilha **IA para Líderes** - você está 67% completo!

Qual seu objetivo de aprendizado?`,
    },
  ]);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: 'user' as const, content: chatInput }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content: `Entendi! Para seu objetivo, recomendo este plano de 4 semanas:

**Semana 1-2:**
• Complete IA para Líderes (2h restantes)
• Inicie Prompt Engineering

**Semana 3-4:**
• Finalize Prompt Engineering
• Prática no AI Sandbox

**Recursos adicionais:**
• Workshop ao vivo: "Casos práticos de IA"
• Mentoria 1:1 disponível

Deseja que eu agende lembretes semanais?`,
        },
      ]);
    }, 1500);
  };

  return (
    <div>
      <Header
        title="Trilhas de Aprendizado"
        subtitle="Capacitação em IA para toda a organização"
      />

      <main className="p-6">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-phase-execute-bg">
                  <GraduationCap className="h-5 w-5 text-phase-execute" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">55</p>
                  <p className="text-xs text-text-muted">Pessoas capacitando</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-status-success-bg">
                  <CheckCircle2 className="h-5 w-5 text-status-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">31</p>
                  <p className="text-xs text-text-muted">Trilhas completas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-status-warning-bg">
                  <Clock className="h-5 w-5 text-status-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">156h</p>
                  <p className="text-xs text-text-muted">Horas de aprendizado</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-aimana-teal/10">
                  <TrendingUp className="h-5 w-5 text-aimana-teal" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">76%</p>
                  <p className="text-xs text-text-muted">Progresso médio</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Learning Paths */}
          <div className="lg:col-span-2 space-y-6">
            {/* Path List */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-text">Trilhas Disponíveis</h2>
              {learningPaths.map((path) => (
                <Card
                  key={path.id}
                  variant="interactive"
                  className={cn(
                    'cursor-pointer',
                    selectedPath.id === path.id && 'ring-2 ring-aimana-teal'
                  )}
                  onClick={() => setSelectedPath(path)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-phase-execute-bg">
                        <GraduationCap className="h-6 w-6 text-phase-execute" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-text">{path.title}</h3>
                          <Badge variant={path.level === 'Iniciante' ? 'success' : path.level === 'Intermediário' ? 'warning' : 'error'}>
                            {path.level}
                          </Badge>
                        </div>
                        <p className="text-sm text-text-secondary mb-2">{path.description}</p>
                        <div className="flex items-center gap-4 text-xs text-text-muted mb-2">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {path.audience}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {path.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-status-warning" />
                            {path.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress
                            value={(path.completedModules / path.modules) * 100}
                            size="sm"
                            className="flex-1"
                            variant={path.completedModules === path.modules ? 'success' : 'default'}
                          />
                          <span className="text-xs text-text-muted">
                            {path.completedModules}/{path.modules} módulos
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selected Path Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedPath.title}</CardTitle>
                    <CardDescription>{selectedPath.enrolled} pessoas inscritas</CardDescription>
                  </div>
                  <Button>
                    <Play className="h-4 w-4 mr-1" />
                    Continuar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedPath.contents.map((content, idx) => {
                    const Icon = contentTypeIcons[content.type as keyof typeof contentTypeIcons];
                    return (
                      <div
                        key={idx}
                        className={cn(
                          'flex items-center gap-3 p-3 rounded-lg',
                          content.completed ? 'bg-status-success-bg' : 'bg-surface-light'
                        )}
                      >
                        <div className={cn(
                          'flex h-8 w-8 items-center justify-center rounded-lg',
                          content.completed ? 'bg-status-success/20' : 'bg-surface-border'
                        )}>
                          {content.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-status-success" />
                          ) : (
                            <Icon className="h-4 w-4 text-text-muted" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={cn('text-sm', content.completed ? 'text-text-secondary' : 'text-text font-medium')}>
                            {content.name}
                          </p>
                        </div>
                        <span className="text-xs text-text-muted">{content.duration}</span>
                        {!content.completed && (
                          <Button variant="ghost" size="sm">
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Chat */}
            <Card>
              <CardHeader className="border-b border-surface-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-aimana-teal">
                    <Bot className="h-5 w-5 text-aimana-navy" />
                  </div>
                  <div>
                    <CardTitle className="text-base">LearningAgent</CardTitle>
                    <CardDescription>Mentor de aprendizado</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-64 overflow-y-auto p-4 space-y-3 scrollbar-thin">
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
                      placeholder="Pergunte sobre trilhas..."
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

            {/* Team Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Progresso por Equipe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamProgress.map((team, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-text">{team.name}</span>
                      <span className="text-xs text-text-muted">{team.avgProgress}%</span>
                    </div>
                    <Progress value={team.avgProgress} size="sm" variant={team.avgProgress >= 80 ? 'success' : team.avgProgress >= 50 ? 'warning' : 'error'} />
                    <p className="text-xs text-text-muted mt-1">{team.completed} de {team.enrolled} completaram</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-gradient-header text-white">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Conquistas</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 rounded bg-white/10">
                    <Award className="h-6 w-6 mx-auto mb-1 text-aimana-teal" />
                    <p className="text-xs">Primeira Trilha</p>
                  </div>
                  <div className="text-center p-2 rounded bg-white/10">
                    <Star className="h-6 w-6 mx-auto mb-1 text-aimana-teal" />
                    <p className="text-xs">10 Horas</p>
                  </div>
                  <div className="text-center p-2 rounded bg-white/10 opacity-50">
                    <GraduationCap className="h-6 w-6 mx-auto mb-1" />
                    <p className="text-xs">Expert</p>
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
