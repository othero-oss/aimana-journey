import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  X,
  Sparkles,
  Send,
  Bot,
  User,
  Loader2,
  Maximize2,
  Minimize2,
  Copy,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  agentName?: string;
  agentDescription?: string;
  initialMessage?: string;
  suggestedPrompts?: string[];
  context?: Record<string, unknown>;
  onSendMessage?: (message: string) => Promise<string>;
  className?: string;
}

export function AIModal({
  title,
  description,
  isOpen,
  onClose,
  agentName = 'Assistente IA',
  agentDescription,
  initialMessage,
  suggestedPrompts = [],
  context,
  onSendMessage,
  className
}: AIModalProps) {
  const [messages, setMessages] = React.useState<Message[]>(() =>
    initialMessage ? [{ role: 'assistant', content: initialMessage }] : []
  );
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  React.useEffect(() => {
    if (isOpen && initialMessage && messages.length === 0) {
      setMessages([{ role: 'assistant', content: initialMessage }]);
    }
  }, [isOpen, initialMessage]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      if (onSendMessage) {
        const response = await onSendMessage(userMessage);
        setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
      } else {
        // Mock response for demo
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `Analisando sua solicitação sobre "${userMessage}"...\n\nAqui está minha análise baseada no contexto atual. Esta é uma resposta de demonstração.`
          }
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Desculpe, ocorreu um erro. Tente novamente.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = async (content: string, index: number) => {
    await navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative bg-navy-900 border border-navy-700 rounded-2xl shadow-2xl',
          'flex flex-col overflow-hidden',
          'transition-all duration-300',
          isExpanded
            ? 'w-[90vw] h-[90vh]'
            : 'w-full max-w-2xl h-[600px]',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-navy-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-teal-500/20 to-purple-500/20 rounded-xl">
              <Sparkles className="h-5 w-5 text-teal-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              {description && (
                <p className="text-sm text-slate-400">{description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-slate-400 hover:text-white hover:bg-navy-800 rounded-lg transition-colors"
            >
              {isExpanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-navy-800 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Agent Info */}
        {agentDescription && (
          <div className="px-6 py-3 bg-navy-800/50 border-b border-navy-700">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-teal-400" />
              <span className="text-sm font-medium text-teal-400">{agentName}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{agentDescription}</p>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && suggestedPrompts.length > 0 && (
            <div className="text-center py-8">
              <Sparkles className="h-12 w-12 text-teal-400/30 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">Como posso ajudar?</p>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedPrompt(prompt)}
                    className="px-3 py-2 text-sm text-slate-300 bg-navy-800 hover:bg-navy-700 rounded-lg border border-navy-600 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex gap-3',
                message.role === 'user' ? 'flex-row-reverse' : ''
              )}
            >
              <div
                className={cn(
                  'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                  message.role === 'user'
                    ? 'bg-blue-500/20'
                    : 'bg-teal-500/20'
                )}
              >
                {message.role === 'user' ? (
                  <User className="h-4 w-4 text-blue-400" />
                ) : (
                  <Bot className="h-4 w-4 text-teal-400" />
                )}
              </div>
              <div
                className={cn(
                  'flex-1 max-w-[80%] px-4 py-3 rounded-2xl',
                  message.role === 'user'
                    ? 'bg-blue-500/20 text-white'
                    : 'bg-navy-800 text-slate-200'
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                {message.role === 'assistant' && (
                  <button
                    onClick={() => handleCopy(message.content, index)}
                    className="mt-2 text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="h-3 w-3" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        Copiar
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-teal-500/20">
                <Bot className="h-4 w-4 text-teal-400" />
              </div>
              <div className="bg-navy-800 px-4 py-3 rounded-2xl">
                <Loader2 className="h-4 w-4 text-teal-400 animate-spin" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-navy-700">
          <div className="flex items-center gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-navy-800 border-navy-600 focus:border-teal-500"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-teal-500 hover:bg-teal-400 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple confirmation/action modal with AI context
interface AIConfirmModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  variant?: 'default' | 'warning' | 'success';
}

export function AIConfirmModal({
  title,
  description,
  isOpen,
  onClose,
  onConfirm,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  isLoading = false,
  variant = 'default'
}: AIConfirmModalProps) {
  if (!isOpen) return null;

  const variantStyles = {
    default: 'from-teal-500 to-purple-500',
    warning: 'from-amber-500 to-orange-500',
    success: 'from-emerald-500 to-teal-500'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-navy-900 border border-navy-700 rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={cn('p-2 rounded-xl bg-gradient-to-br', variantStyles[variant], 'bg-opacity-20')}>
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>
        <p className="text-slate-400 mb-6">{description}</p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className={cn('bg-gradient-to-r text-white', variantStyles[variant])}
          >
            {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
