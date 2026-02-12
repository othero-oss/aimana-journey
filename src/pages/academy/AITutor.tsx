/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - AI Tutor Page
 * Tutor IA para aprendizado personalizado com gamificação
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
  Bot,
  Send,
  Sparkles,
  BookOpen,
  Target,
  Clock,
  Lightbulb,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  GraduationCap,
  Zap,
  Calendar,
  Trophy,
  Flame,
  Star,
  Brain,
  History,
  Bookmark,
  TrendingUp,
  Award,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Suggested topics by category
const topicCategories = [
  {
    name: 'Fundamentos',
    color: 'bg-phase-plan',
    topics: [
      'O que são LLMs e como funcionam?',
      'Diferença entre ML, DL e IA Generativa',
      'O que é um Transformer?',
    ],
  },
  {
    name: 'Prático',
    color: 'bg-aimana-teal',
    topics: [
      'Melhores práticas de prompting',
      'Como criar prompts para análise de dados',
      'Templates de prompts para minha área',
    ],
  },
  {
    name: 'Estratégia',
    color: 'bg-phase-execute',
    topics: [
      'Casos de uso no meu setor',
      'Como medir ROI de projetos de IA',
      'Governança de IA na prática',
    ],
  },
  {
    name: 'Técnico',
    color: 'bg-phase-manage',
    topics: [
      'Como funciona o RAG?',
      'Construindo agentes autônomos',
      'Fine-tuning vs Prompting',
    ],
  },
];

// Learning goals with XP
const learningGoals = [
  { goal: 'Entender fundamentos de IA', progress: 80, xp: 400, totalXp: 500 },
  { goal: 'Aplicar prompt engineering', progress: 45, xp: 225, totalXp: 500 },
  { goal: 'Identificar oportunidades de IA', progress: 60, xp: 300, totalXp: 500 },
  { goal: 'Governança e ética em IA', progress: 20, xp: 100, totalXp: 500 },
];

// Conversation history
const conversationHistory = [
  { id: 1, title: 'O que é RAG?', date: '10 Fev', messages: 8, xpEarned: 25 },
  { id: 2, title: 'Prompt engineering para relatórios', date: '9 Fev', messages: 12, xpEarned: 40 },
  { id: 3, title: 'Casos de uso em operações', date: '8 Fev', messages: 6, xpEarned: 20 },
  { id: 4, title: 'Governança de IA', date: '7 Fev', messages: 10, xpEarned: 30 },
  { id: 5, title: 'Automatizando processos', date: '6 Fev', messages: 15, xpEarned: 50 },
];

// Saved resources
const savedResources = [
  { title: 'Guia de Prompt Engineering', type: 'Artigo', saved: '10 Fev' },
  { title: 'RAG: Passo a Passo', type: 'Tutorial', saved: '9 Fev' },
  { title: 'Framework de Governança', type: 'Template', saved: '7 Fev' },
];

// Daily learning streaks
const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const streakData = [true, true, true, true, true, false, false]; // This week

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  xpEarned?: number;
};

export function AITutor() {
  const [chatInput, setChatInput] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Olá! Sou o **LIFOW** (Learning Is For Our Workforce), seu tutor de IA personalizado.

Estou aqui para ajudá-lo a aprender sobre Inteligência Artificial de forma adaptada ao seu perfil, ritmo e objetivos.

**Sobre você:**
- Perfil: Gestor de Operações
- Nível atual: Intermediário (1.025 XP)
- Objetivo: Identificar oportunidades de automação

**Como posso ajudar:**
- Explicar conceitos de forma simples
- Criar planos de estudo personalizados
- Sugerir aplicações práticas para sua área
- Responder qualquer dúvida sobre IA

A cada conversa produtiva, você ganha **XP** e mantém seu streak!

O que gostaria de aprender hoje?`,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const handleSend = () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: chatInput,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput('');

    setTimeout(() => {
      const tutorResponse: ChatMessage = {
        role: 'assistant',
        content: `Ótima pergunta! Vou explicar de forma simples:

## O que é RAG (Retrieval Augmented Generation)?

RAG é uma técnica que **combina busca + geração** para criar respostas mais precisas e atualizadas.

### Como funciona:

1. **Retrieval (Busca)** - Sua pergunta é convertida em um vetor e o sistema busca documentos relevantes na base de conhecimento

2. **Augmented (Enriquecimento)** - Os documentos encontrados são adicionados ao contexto do modelo

3. **Generation (Geração)** - O modelo gera a resposta usando o contexto enriquecido

### Exemplo prático na sua área:

Imagine um chatbot de suporte que acessa manuais de procedimentos, consulta histórico de tickets e responde com informações específicas da empresa.

### Benefícios:
- Respostas mais precisas
- Informações atualizadas
- Menos "alucinações"
- Conhecimento específico do negócio

Quer que eu aprofunde algum ponto ou mostre como implementar?`,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        xpEarned: 15,
      };
      setChatMessages((prev) => [...prev, tutorResponse]);
    }, 2000);
  };

  const handleTopicClick = (topic: string) => {
    setChatInput(topic);
  };

  const totalXpGoals = learningGoals.reduce((acc, g) => acc + g.xp, 0);
  const currentStreak = 5;

  return (
    <div>
      <Header
        title="Tutor IA - LIFOW"
        subtitle="Aprendizado personalizado com inteligência artificial"
      />

      <main className="p-6">
        {/* Stats Bar */}
        <div className="grid gap-3 md:grid-cols-5 mb-6">
          <Card>
            <CardContent className="p-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-aimana-teal/10">
                <Zap className="h-5 w-5 text-aimana-teal" />
              </div>
              <div>
                <p className="text-lg font-bold text-text">1,025</p>
                <p className="text-xs text-text-muted">XP Total</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-status-warning/10">
                <Flame className="h-5 w-5 text-status-warning" />
              </div>
              <div>
                <p className="text-lg font-bold text-text">{currentStreak} dias</p>
                <p className="text-xs text-text-muted">Streak</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-phase-plan/10">
                <MessageSquare className="h-5 w-5 text-phase-plan" />
              </div>
              <div>
                <p className="text-lg font-bold text-text">47</p>
                <p className="text-xs text-text-muted">Conversas</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-phase-execute/10">
                <Clock className="h-5 w-5 text-phase-execute" />
              </div>
              <div>
                <p className="text-lg font-bold text-text">12h</p>
                <p className="text-xs text-text-muted">Tempo de estudo</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-phase-manage/10">
                <Brain className="h-5 w-5 text-phase-manage" />
              </div>
              <div>
                <p className="text-lg font-bold text-text">Nível 3</p>
                <p className="text-xs text-text-muted">Intermediário</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Streak Week */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Flame className="h-5 w-5 text-status-warning" />
                <span className="font-medium text-text">Semana de Estudos</span>
                <Badge variant="warning">
                  {currentStreak} dias seguidos!
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                {weekDays.map((day, idx) => (
                  <div key={day} className="text-center">
                    <p className="text-[10px] text-text-muted mb-1">{day}</p>
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm',
                      streakData[idx]
                        ? 'bg-status-warning text-white'
                        : idx >= new Date().getDay()
                        ? 'bg-surface-light text-text-muted border-2 border-dashed border-surface-border'
                        : 'bg-surface-light text-text-muted'
                    )}>
                      {streakData[idx] ? <Flame className="h-4 w-4" /> : '-'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="chat">
              <Bot className="h-4 w-4 mr-2" />
              Conversar
            </TabsTrigger>
            <TabsTrigger value="goals">
              <Target className="h-4 w-4 mr-2" />
              Objetivos
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="h-4 w-4 mr-2" />
              Histórico
            </TabsTrigger>
            <TabsTrigger value="saved">
              <Bookmark className="h-4 w-4 mr-2" />
              Salvos
            </TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat">
            <div className="grid gap-6 lg:grid-cols-4">
              {/* Main Chat Area */}
              <div className="lg:col-span-3">
                <Card className="h-[calc(100vh-420px)] min-h-[400px] flex flex-col">
                  <CardHeader className="border-b border-surface-border flex-shrink-0 py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-aimana-teal to-aimana-mint">
                          <Bot className="h-5 w-5 text-aimana-navy" />
                        </div>
                        <div>
                          <CardTitle className="text-base">LIFOW - Tutor IA</CardTitle>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                            <CardDescription className="text-xs">Online - Pronto para ajudar</CardDescription>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Zap className="h-3 w-3 mr-1 text-aimana-teal" />
                          +15 XP por conversa
                        </Badge>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Nova conversa
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={cn(
                          'flex',
                          msg.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        <div
                          className={cn(
                            'max-w-[80%] rounded-2xl px-4 py-3',
                            msg.role === 'user'
                              ? 'bg-aimana-navy text-white rounded-br-md'
                              : 'bg-surface-light text-text rounded-bl-md'
                          )}
                        >
                          {msg.role === 'assistant' && (
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-surface-border">
                              <Bot className="h-4 w-4 text-aimana-teal" />
                              <span className="text-xs font-medium text-aimana-teal">LIFOW</span>
                              <span className="text-xs text-text-muted">{msg.timestamp}</span>
                              {msg.xpEarned && (
                                <Badge variant="success" size="sm" className="ml-auto">
                                  +{msg.xpEarned} XP
                                </Badge>
                              )}
                            </div>
                          )}
                          <div className="text-sm whitespace-pre-wrap">
                            {msg.content}
                          </div>
                          {msg.role === 'assistant' && (
                            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-surface-border">
                              <Button variant="ghost" size="sm" className="h-7 px-2">
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 px-2">
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 px-2">
                                <Bookmark className="h-3 w-3" />
                              </Button>
                              <span className="text-xs text-text-muted ml-auto">Esta resposta foi útil?</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>

                  <div className="border-t border-surface-border p-4 flex-shrink-0">
                    <div className="flex gap-3">
                      <Input
                        placeholder="Digite sua pergunta sobre IA..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        className="flex-1"
                      />
                      <Button onClick={handleSend} disabled={!chatInput.trim()}>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar
                      </Button>
                    </div>
                    <p className="text-xs text-text-muted mt-2">
                      <Sparkles className="h-3 w-3 inline mr-1" />
                      O tutor adapta as explicações ao seu nível e contexto. Cada conversa vale XP!
                    </p>
                  </div>
                </Card>
              </div>

              {/* Sidebar - Suggested Topics */}
              <div className="space-y-4">
                <Card>
                  <CardHeader className="py-3">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-status-warning" />
                      <CardTitle className="text-sm">Sugestões para Você</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {topicCategories.map((cat) => (
                      <div key={cat.name}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className={cn('w-2 h-2 rounded-full', cat.color)} />
                          <span className="text-xs font-medium text-text-muted uppercase">{cat.name}</span>
                        </div>
                        <div className="space-y-1">
                          {cat.topics.map((topic, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleTopicClick(topic)}
                              className="w-full text-left px-2 py-1.5 rounded-md text-xs text-text hover:bg-surface-light transition-colors"
                            >
                              {topic}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-aimana-teal/10 to-aimana-mint/10 border-aimana-teal/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-aimana-teal" />
                      <span className="font-medium text-sm text-text">Meta Diária</span>
                    </div>
                    <p className="text-xs text-text-muted mb-3">
                      Estude 15 minutos por dia para manter seu streak
                    </p>
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-text-muted">Hoje: 8 min</span>
                        <span className="text-aimana-teal font-medium">15 min</span>
                      </div>
                      <Progress value={53} size="sm" variant="secondary" />
                    </div>
                    <p className="text-[10px] text-text-muted">
                      Mais 7 minutos para completar a meta de hoje!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-text">Seus Objetivos de Aprendizado</h2>
                  <Button variant="outline" size="sm">
                    <Target className="h-4 w-4 mr-1" />
                    Novo objetivo
                  </Button>
                </div>

                {learningGoals.map((item, idx) => (
                  <Card key={idx} variant="interactive">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          'flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold',
                          item.progress >= 80 ? 'bg-status-success text-white' :
                          item.progress >= 50 ? 'bg-aimana-teal text-white' :
                          'bg-surface-light text-text-muted'
                        )}>
                          {item.progress >= 80 ? (
                            <Star className="h-6 w-6" />
                          ) : (
                            <span>{idx + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-text">{item.goal}</h3>
                            <Badge variant={item.progress >= 80 ? 'success' : item.progress >= 50 ? 'execute' : 'pending'} size="sm">
                              {item.progress}%
                            </Badge>
                          </div>
                          <div className="mb-2">
                            <Progress value={item.progress} size="sm" variant={item.progress >= 80 ? 'success' : 'default'} />
                          </div>
                          <div className="flex items-center gap-4 text-xs text-text-muted">
                            <span className="flex items-center gap-1">
                              <Zap className="h-3 w-3 text-aimana-teal" />
                              {item.xp} / {item.totalXp} XP
                            </span>
                            <span>
                              {item.progress >= 80 ? 'Quase lá!' : item.progress >= 50 ? 'Bom progresso' : 'Continue estudando'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* XP Progress to Next Level */}
                <Card className="border-aimana-teal/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="h-5 w-5 text-aimana-teal" />
                      <span className="font-semibold text-text">Progresso para Nível 4</span>
                    </div>
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-text-muted">1,025 XP</span>
                        <span className="font-medium text-aimana-teal">1,500 XP</span>
                      </div>
                      <Progress value={68} variant="secondary" />
                    </div>
                    <p className="text-xs text-text-muted">
                      Faltam 475 XP para alcançar o nível Avançado
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Goals Sidebar */}
              <div className="space-y-4">
                <Card className="bg-gradient-header text-white">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Resumo dos Objetivos</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/80">Objetivos ativos</span>
                        <span className="font-bold">{learningGoals.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/80">XP acumulado</span>
                        <span className="font-bold">{totalXpGoals}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/80">Progresso médio</span>
                        <span className="font-bold">
                          {Math.round(learningGoals.reduce((acc, g) => acc + g.progress, 0) / learningGoals.length)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="h-4 w-4 text-status-warning" />
                      <span className="font-medium text-sm text-text">Recompensas</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-light">
                        <span className="text-lg">🎯</span>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-text">Completar 1 objetivo</p>
                          <p className="text-[10px] text-text-muted">+200 XP bonus</p>
                        </div>
                        <Badge variant="outline" size="sm">80%</Badge>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-light">
                        <span className="text-lg">🏆</span>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-text">Completar todos</p>
                          <p className="text-[10px] text-text-muted">Badge "Dedicado"</p>
                        </div>
                        <Badge variant="outline" size="sm">51%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="text-lg font-semibold text-text mb-4">Histórico de Conversas</h2>
                <div className="space-y-3">
                  {conversationHistory.map((conv) => (
                    <Card key={conv.id} variant="interactive" className="cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-aimana-teal/10">
                            <MessageSquare className="h-5 w-5 text-aimana-teal" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-text">{conv.title}</h3>
                            <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                              <span>{conv.date}</span>
                              <span>{conv.messages} mensagens</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="success" size="sm">
                              +{conv.xpEarned} XP
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-text mb-3">Estatísticas</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Total de conversas</span>
                        <span className="font-medium text-text">47</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Perguntas feitas</span>
                        <span className="font-medium text-text">124</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">XP ganho com tutor</span>
                        <span className="font-medium text-aimana-teal">650 XP</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Tópico favorito</span>
                        <Badge variant="outline" size="sm">RAG</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-text mb-3">Tópicos Explorados</h3>
                    <div className="flex flex-wrap gap-2">
                      {['RAG', 'Prompt Engineering', 'Governança', 'Agentes', 'LLMs', 'Automação'].map((topic) => (
                        <Badge key={topic} variant="outline" size="sm">{topic}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Saved Tab */}
          <TabsContent value="saved">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="text-lg font-semibold text-text mb-4">Recursos Salvos</h2>
                <div className="space-y-3">
                  {savedResources.map((resource, idx) => (
                    <Card key={idx} variant="interactive">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-phase-plan/10">
                            <BookOpen className="h-5 w-5 text-phase-plan" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-text">{resource.title}</h3>
                            <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                              <Badge variant="outline" size="sm">{resource.type}</Badge>
                              <span>Salvo em {resource.saved}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <BookOpen className="h-4 w-4 mr-1" />
                            Abrir
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Empty state hint */}
                <Card className="mt-4 border-dashed border-2">
                  <CardContent className="p-6 text-center">
                    <Bookmark className="h-8 w-8 text-text-muted mx-auto mb-2" />
                    <p className="text-sm text-text-muted">
                      Salve respostas úteis do tutor clicando no ícone de bookmark durante as conversas
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="bg-gradient-to-br from-aimana-teal/10 to-aimana-mint/10 border-aimana-teal/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <GraduationCap className="h-5 w-5 text-aimana-teal" />
                      <span className="font-medium text-text">Dica do LIFOW</span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      Salve os recursos mais importantes para revisá-los antes de exames de certificação.
                      A repetição espaçada é uma das melhores técnicas de aprendizado!
                    </p>
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      <Sparkles className="h-4 w-4 mr-1" />
                      Criar plano de revisão
                    </Button>
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
