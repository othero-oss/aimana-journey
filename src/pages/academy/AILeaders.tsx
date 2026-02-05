/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - AI Leaders Program Page
 * Programa de capacitação para liderança executiva
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
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Program modules
const modules = [
  {
    id: 1,
    title: 'Fundamentos de IA para Executivos',
    description: 'O que é IA, ML, LLMs e por que importam para o negócio',
    duration: '45 min',
    type: 'video',
    completed: true,
    locked: false,
  },
  {
    id: 2,
    title: 'Casos de Uso Estratégicos',
    description: 'Exemplos de sucesso e lições aprendidas em diferentes setores',
    duration: '30 min',
    type: 'article',
    completed: true,
    locked: false,
  },
  {
    id: 3,
    title: 'Avaliando Oportunidades de IA',
    description: 'Framework para identificar e priorizar iniciativas',
    duration: '60 min',
    type: 'workshop',
    completed: true,
    locked: false,
  },
  {
    id: 4,
    title: 'Governança e Ética em IA',
    description: 'Princípios, riscos e frameworks de governança',
    duration: '45 min',
    type: 'video',
    completed: true,
    locked: false,
  },
  {
    id: 5,
    title: 'Construindo a Cultura AI-First',
    description: 'Mudança cultural, comunicação e gestão de resistências',
    duration: '60 min',
    type: 'workshop',
    completed: false,
    locked: false,
  },
  {
    id: 6,
    title: 'AI Leaders Workshop',
    description: 'Sessão ao vivo para aplicar os conceitos na sua empresa',
    duration: '120 min',
    type: 'live',
    completed: false,
    locked: true,
  },
];

// Upcoming sessions
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

// Participants
const participants = [
  { name: 'Roberto Silva', role: 'CEO', progress: 100 },
  { name: 'Maria Santos', role: 'CFO', progress: 100 },
  { name: 'Carlos Lima', role: 'COO', progress: 83 },
  { name: 'Ana Costa', role: 'CTO', progress: 67 },
];

const typeIcons = {
  video: Video,
  article: BookOpen,
  workshop: Presentation,
  live: Calendar,
};

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export function AILeaders() {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Bem-vindo ao programa **AI Leaders**!

Este programa foi desenhado para capacitar a liderança executiva em IA:

✅ 4 de 6 módulos completos
📊 Progresso: 67%
⏰ Próximo: "Construindo a Cultura AI-First"

**Destaques do programa:**
• Conteúdo executivo focado em estratégia
• Workshops práticos com sua equipe
• Sessões ao vivo com especialistas

Como posso ajudá-lo?`,
    },
  ]);

  const completedModules = modules.filter((m) => m.completed).length;
  const progress = Math.round((completedModules / modules.length) * 100);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: 'user', content: chatInput }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Ótima pergunta sobre cultura AI-First!

**Principais pontos do módulo:**

1. **Visão Compartilhada**
   - Comunicar o "porquê" antes do "como"
   - Envolver colaboradores desde o início

2. **Quick Wins**
   - Começar com projetos de alto impacto e baixo risco
   - Celebrar e comunicar sucessos

3. **Capacitação Contínua**
   - Investir em upskilling
   - Criar programa de AI Champions

4. **Gestão de Mudanças**
   - Endereçar medos sobre automação
   - Focar em augmentação, não substituição

Deseja agendar uma sessão de mentoria para discutir a implementação?`,
        },
      ]);
    }, 1500);
  };

  return (
    <div>
      <Header
        title="AI Leaders"
        subtitle="Programa de capacitação para liderança executiva"
      />

      <main className="p-6">
        {/* Progress Banner */}
        <Card className="mb-6 border-l-4 border-l-phase-plan">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-text">Seu Progresso no Programa</h2>
                <p className="text-sm text-text-secondary mt-1">
                  {completedModules} de {modules.length} módulos completos
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="plan">Liderança</Badge>
                  <span className="text-sm text-text-muted">
                    Estimativa: mais 2h para completar
                  </span>
                </div>
              </div>
              <div className="w-full md:w-48">
                <Progress value={progress} showLabel />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Modules */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-text">Módulos do Programa</h2>

            {modules.map((module, idx) => {
              const Icon = typeIcons[module.type as keyof typeof typeIcons];
              return (
                <Card
                  key={module.id}
                  variant="interactive"
                  className={cn(
                    module.locked && 'opacity-60'
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-lg',
                        module.completed ? 'bg-status-success-bg' : module.locked ? 'bg-surface-light' : 'bg-phase-plan-bg'
                      )}>
                        {module.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-status-success" />
                        ) : (
                          <Icon className={cn('h-5 w-5', module.locked ? 'text-text-muted' : 'text-phase-plan')} />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-text-muted">Módulo {idx + 1}</span>
                          <Badge variant="outline" size="sm">{module.type}</Badge>
                          {module.locked && <Badge variant="pending" size="sm">Bloqueado</Badge>}
                        </div>
                        <h3 className={cn(
                          'font-semibold',
                          module.completed ? 'text-text-secondary' : 'text-text'
                        )}>
                          {module.title}
                        </h3>
                        <p className="text-sm text-text-secondary mt-1">{module.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="h-3 w-3 text-text-muted" />
                          <span className="text-xs text-text-muted">{module.duration}</span>
                        </div>
                      </div>

                      <div>
                        {module.completed ? (
                          <Button variant="outline" size="sm">
                            Revisar
                          </Button>
                        ) : module.locked ? (
                          <Button variant="outline" size="sm" disabled>
                            Bloqueado
                          </Button>
                        ) : (
                          <Button size="sm">
                            <Play className="h-4 w-4 mr-1" />
                            Iniciar
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Chat */}
            <Card>
              <CardHeader className="border-b border-surface-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-phase-plan">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Mentor IA</CardTitle>
                    <CardDescription>Suporte ao programa</CardDescription>
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
                      placeholder="Pergunte sobre o programa..."
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

            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Próximas Sessões</CardTitle>
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

            {/* Participants */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Participantes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {participants.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-aimana-navy flex items-center justify-center text-white text-xs font-medium">
                      {p.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text">{p.name}</p>
                      <p className="text-xs text-text-muted">{p.role}</p>
                    </div>
                    <div className="text-right">
                      {p.progress === 100 ? (
                        <CheckCircle2 className="h-5 w-5 text-status-success" />
                      ) : (
                        <span className="text-xs text-text-muted">{p.progress}%</span>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
