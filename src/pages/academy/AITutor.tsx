/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - AI Tutor Page
 * Tutor IA para aprendizado personalizado
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
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Suggested topics
const suggestedTopics = [
  { title: 'O que são LLMs?', category: 'Fundamentos' },
  { title: 'Como funciona o RAG?', category: 'Técnico' },
  { title: 'Melhores práticas de prompting', category: 'Prático' },
  { title: 'Governança de IA', category: 'Estratégia' },
  { title: 'Casos de uso no meu setor', category: 'Negócios' },
  { title: 'Como criar agentes autônomos?', category: 'Avançado' },
];

// Learning goals
const learningGoals = [
  { goal: 'Entender fundamentos de IA', progress: 80 },
  { goal: 'Aplicar prompt engineering', progress: 45 },
  { goal: 'Identificar oportunidades de IA', progress: 60 },
];

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

export function AITutor() {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Olá! Sou seu **Tutor IA** personalizado. 🎓

Estou aqui para ajudá-lo a aprender sobre Inteligência Artificial de forma adaptada ao seu perfil, ritmo e objetivos.

**Sobre você:**
• Perfil: Gestor de Operações
• Nível atual: Intermediário
• Objetivo: Identificar oportunidades de automação

**Como posso ajudar:**
• 📚 Explicar conceitos de forma simples
• 🎯 Criar planos de estudo personalizados
• 💡 Sugerir aplicações práticas para sua área
• ❓ Responder qualquer dúvida sobre IA

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

    // Simulate tutor response
    setTimeout(() => {
      const tutorResponse: ChatMessage = {
        role: 'assistant',
        content: `Ótima pergunta! Vou explicar de forma simples:

## O que é RAG (Retrieval Augmented Generation)?

RAG é uma técnica que **combina busca + geração** para criar respostas mais precisas e atualizadas.

### Como funciona:

1. **Retrieval (Busca)** 🔍
   - Sua pergunta é convertida em um vetor
   - O sistema busca documentos relevantes na base de conhecimento

2. **Augmented (Enriquecimento)** 📄
   - Os documentos encontrados são adicionados ao contexto
   - O modelo recebe informações específicas e atualizadas

3. **Generation (Geração)** ✨
   - O modelo gera a resposta usando o contexto enriquecido
   - Resultado: resposta baseada em dados reais

### Exemplo prático na sua área:

Imagine um chatbot de suporte que:
- Acessa manuais de procedimentos
- Consulta histórico de tickets
- Responde com informações específicas da empresa

### Benefícios:
✅ Respostas mais precisas
✅ Informações atualizadas
✅ Menos "alucinações"
✅ Conhecimento específico do negócio

Quer que eu aprofunde algum ponto ou mostre como implementar?`,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, tutorResponse]);
    }, 2000);
  };

  const handleTopicClick = (topic: string) => {
    setChatInput(topic);
  };

  return (
    <div>
      <Header
        title="Tutor IA"
        subtitle="Aprendizado personalizado com inteligência artificial"
      />

      <main className="p-6">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-220px)] flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b border-surface-border flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-aimana-teal to-aimana-mint">
                      <Bot className="h-6 w-6 text-aimana-navy" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Tutor IA</CardTitle>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                        <CardDescription>Online - Pronto para ajudar</CardDescription>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Nova conversa
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Chat Messages */}
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
                          <span className="text-xs font-medium text-aimana-teal">Tutor IA</span>
                          <span className="text-xs text-text-muted">{msg.timestamp}</span>
                        </div>
                      )}
                      <div className="text-sm whitespace-pre-wrap prose prose-sm max-w-none">
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
                          <span className="text-xs text-text-muted">Esta resposta foi útil?</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Chat Input */}
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
                  O tutor adapta as explicações ao seu nível e contexto
                </p>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Suggested Topics */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-status-warning" />
                  <CardTitle className="text-base">Sugestões</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedTopics.map((topic, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTopicClick(topic.title)}
                    className="w-full text-left p-2 rounded-lg hover:bg-surface-light transition-colors"
                  >
                    <p className="text-sm font-medium text-text">{topic.title}</p>
                    <Badge variant="outline" size="sm" className="mt-1">
                      {topic.category}
                    </Badge>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Learning Goals */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-aimana-teal" />
                  <CardTitle className="text-base">Seus Objetivos</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {learningGoals.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-text">{item.goal}</span>
                      <span className="text-text-muted">{item.progress}%</span>
                    </div>
                    <div className="h-2 bg-surface-light rounded-full overflow-hidden">
                      <div
                        className="h-full bg-aimana-teal rounded-full transition-all"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gradient-header text-white">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Sua Jornada</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-sm">Conversas</span>
                    </div>
                    <span className="font-bold">47</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Tempo de estudo</span>
                    </div>
                    <span className="font-bold">12h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      <span className="text-sm">Streak</span>
                    </div>
                    <span className="font-bold">5 dias 🔥</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Study */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4 text-phase-plan" />
                  <span className="font-medium text-text">Agendar estudo</span>
                </div>
                <p className="text-sm text-text-muted mb-3">
                  Receba lembretes personalizados
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Configurar lembretes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
