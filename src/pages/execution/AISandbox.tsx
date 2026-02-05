/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - AI Sandbox Page
 * Ambiente seguro para experimentação com IA
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
  Send,
  Bot,
  Sparkles,
  Settings,
  History,
  Plus,
  ChevronDown,
  Copy,
  RotateCcw,
  Trash2,
  FileText,
  Code,
  MessageSquare,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Available AI models
const models = [
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', color: 'bg-green-500' },
  { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic', color: 'bg-orange-500' },
  { id: 'gemini', name: 'Gemini Pro', provider: 'Google', color: 'bg-blue-500' },
];

// Context presets
const contexts = [
  { id: 'general', name: 'Geral', icon: MessageSquare, description: 'Conversação livre' },
  { id: 'analysis', name: 'Análise', icon: FileText, description: 'Análise de documentos' },
  { id: 'code', name: 'Código', icon: Code, description: 'Geração e revisão de código' },
  { id: 'strategy', name: 'Estratégia', icon: Zap, description: 'Planejamento estratégico' },
];

// Mock conversation history
const mockHistory = [
  { id: 1, title: 'Análise de concorrência', date: '2024-01-15', messages: 12 },
  { id: 2, title: 'Brainstorm de features', date: '2024-01-14', messages: 8 },
  { id: 3, title: 'Revisão de código API', date: '2024-01-13', messages: 15 },
];

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  timestamp: Date;
}

export function AISandbox() {
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [selectedContext, setSelectedContext] = useState(contexts[0]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: `Olá! Sou seu assistente no AI Sandbox. Estou usando o modelo **${models[0].name}** no contexto **Geral**.

Posso ajudar com:
- Análise de documentos e dados
- Geração e revisão de código
- Brainstorming e ideação
- Perguntas sobre IA e estratégia

Como posso ajudar você hoje?`,
      model: models[0].id,
      timestamp: new Date(),
    },
  ]);

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        'gpt-4': `Analisando sua solicitação com GPT-4...

Baseado no contexto **${selectedContext.name}**, aqui está minha análise:

Esta é uma simulação de resposta do modelo GPT-4. Em um ambiente real, a resposta seria gerada pela API da OpenAI.

**Pontos-chave:**
1. O sandbox está configurado corretamente
2. As políticas de governança estão sendo aplicadas
3. Os dados sensíveis são mascarados automaticamente

Posso elaborar mais sobre algum ponto específico?`,
        'claude-3': `Olá! Aqui é o Claude 3 respondendo.

No contexto de **${selectedContext.name}**, posso oferecer uma perspectiva única:

Esta é uma demonstração do AI Sandbox da Aimana. O ambiente real se conectaria à API da Anthropic para gerar respostas.

**Observações:**
- Múltiplos modelos disponíveis para comparação
- Histórico de conversas preservado
- Integração com políticas de governança

Como posso ajudar mais?`,
        'gemini': `Resposta do Gemini Pro:

Considerando o contexto **${selectedContext.name}**:

Esta é uma simulação do modelo Gemini do Google. A versão de produção utilizaria a API do Google AI.

**Capacidades demonstradas:**
- Troca dinâmica entre modelos
- Contextos especializados
- Ambiente seguro e governado

Há algo específico que gostaria de explorar?`,
      };

      const assistantMessage: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: responses[selectedModel.id] || responses['gpt-4'],
        model: selectedModel.id,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content: `Chat reiniciado. Usando **${selectedModel.name}** no contexto **${selectedContext.name}**.

Como posso ajudar?`,
        model: selectedModel.id,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="flex h-screen flex-col">
      <Header
        title="AI Sandbox"
        subtitle="Ambiente seguro para experimentação com IA"
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - History */}
        <aside className="hidden w-64 border-r border-surface-border bg-white p-4 lg:block">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text">Histórico</h3>
            <Button variant="ghost" size="icon-sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {mockHistory.map((item) => (
              <button
                key={item.id}
                className="w-full rounded-lg p-3 text-left hover:bg-surface-hover transition-colors"
              >
                <p className="text-sm font-medium text-text truncate">{item.title}</p>
                <p className="text-xs text-text-muted mt-1">
                  {item.date} • {item.messages} mensagens
                </p>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex flex-1 flex-col">
          {/* Top Bar - Model & Context Selection */}
          <div className="border-b border-surface-border bg-white p-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Model Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowModelSelector(!showModelSelector)}
                  className="flex items-center gap-2 rounded-lg border border-surface-border px-3 py-2 hover:bg-surface-hover"
                >
                  <div className={cn('h-2 w-2 rounded-full', selectedModel.color)} />
                  <span className="text-sm font-medium text-text">{selectedModel.name}</span>
                  <ChevronDown className="h-4 w-4 text-text-muted" />
                </button>

                {showModelSelector && (
                  <div className="absolute left-0 top-full z-dropdown mt-1 w-48 rounded-lg border border-surface-border bg-white py-1 shadow-dropdown">
                    {models.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model);
                          setShowModelSelector(false);
                        }}
                        className={cn(
                          'flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-surface-hover',
                          selectedModel.id === model.id && 'bg-surface-light'
                        )}
                      >
                        <div className={cn('h-2 w-2 rounded-full', model.color)} />
                        <div>
                          <p className="text-sm font-medium text-text">{model.name}</p>
                          <p className="text-xs text-text-muted">{model.provider}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Context Selector */}
              <div className="flex gap-2">
                {contexts.map((context) => (
                  <button
                    key={context.id}
                    onClick={() => setSelectedContext(context)}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                      selectedContext.id === context.id
                        ? 'bg-aimana-teal/10 text-aimana-teal border border-aimana-teal/30'
                        : 'text-text-secondary hover:bg-surface-hover'
                    )}
                  >
                    <context.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{context.name}</span>
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="ml-auto flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={clearChat}>
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Limpar
                </Button>
                <Button variant="ghost" size="icon-sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-3',
                    message.role === 'user'
                      ? 'bg-aimana-navy text-white'
                      : 'bg-surface-light text-text'
                  )}
                >
                  {message.role === 'assistant' && message.model && (
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-surface-border">
                      <Bot className="h-4 w-4 text-aimana-teal" />
                      <span className="text-xs font-medium text-text-secondary">
                        {models.find((m) => m.id === message.model)?.name}
                      </span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <div className="flex items-center justify-end gap-2 mt-2">
                    <span className="text-xs opacity-60">
                      {message.timestamp.toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    {message.role === 'assistant' && (
                      <button className="opacity-60 hover:opacity-100">
                        <Copy className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-surface-light rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="h-4 w-4 text-aimana-teal" />
                    <span className="text-xs font-medium text-text-secondary">
                      {selectedModel.name}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-text-muted animate-pulse" />
                    <span className="h-2 w-2 rounded-full bg-text-muted animate-pulse [animation-delay:150ms]" />
                    <span className="h-2 w-2 rounded-full bg-text-muted animate-pulse [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-surface-border bg-white p-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Digite sua mensagem... (Shift+Enter para nova linha)"
                  className="w-full resize-none rounded-lg border border-surface-border bg-white px-4 py-3 pr-12 text-sm placeholder:text-text-muted focus:border-aimana-teal focus:outline-none focus:ring-2 focus:ring-aimana-teal/20"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '200px' }}
                />
              </div>
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="h-12 w-12"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-text-muted">
              <span>
                Modelo: <strong>{selectedModel.name}</strong> • Contexto:{' '}
                <strong>{selectedContext.name}</strong>
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-status-success" />
                Governança ativa
              </span>
            </div>
          </div>
        </main>

        {/* Right Sidebar - Context Info */}
        <aside className="hidden w-72 border-l border-surface-border bg-white p-4 xl:block">
          <h3 className="font-semibold text-text mb-4">Informações do Contexto</h3>

          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-aimana-teal/10">
                  <selectedContext.icon className="h-5 w-5 text-aimana-teal" />
                </div>
                <div>
                  <p className="font-medium text-text">{selectedContext.name}</p>
                  <p className="text-xs text-text-secondary">{selectedContext.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h4 className="text-sm font-medium text-text mb-2">Políticas Aplicadas</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 text-text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-status-success" />
              Dados sensíveis mascarados
            </li>
            <li className="flex items-center gap-2 text-text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-status-success" />
              Logs de auditoria ativos
            </li>
            <li className="flex items-center gap-2 text-text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-status-success" />
              Limite de tokens: 4096
            </li>
          </ul>

          <h4 className="text-sm font-medium text-text mt-6 mb-2">Sugestões</h4>
          <div className="space-y-2">
            {[
              'Analise este documento',
              'Gere um resumo executivo',
              'Compare com benchmarks',
            ].map((suggestion, i) => (
              <button
                key={i}
                onClick={() => setInputValue(suggestion)}
                className="w-full rounded-lg border border-surface-border p-2 text-left text-sm text-text-secondary hover:bg-surface-hover hover:text-text"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
