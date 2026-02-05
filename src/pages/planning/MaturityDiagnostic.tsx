/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Maturity Diagnostic Page
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
  Progress,
  Button,
  Input,
} from '@/components/ui';
import {
  Target,
  Users,
  Database,
  Shield,
  Cpu,
  GraduationCap,
  Send,
  Bot,
  RefreshCw,
} from 'lucide-react';

// Mock data for maturity dimensions
const dimensions = [
  {
    id: 'strategy',
    name: 'Estratégia & Visão',
    score: 55,
    maxScore: 100,
    icon: Target,
    description: 'Alinhamento estratégico e visão de IA',
  },
  {
    id: 'data',
    name: 'Dados & Infraestrutura',
    score: 35,
    maxScore: 100,
    icon: Database,
    description: 'Qualidade e acessibilidade dos dados',
  },
  {
    id: 'talent',
    name: 'Talentos & Skills',
    score: 40,
    maxScore: 100,
    icon: GraduationCap,
    description: 'Capacitação e cultura de IA',
  },
  {
    id: 'governance',
    name: 'Governança & Ética',
    score: 30,
    maxScore: 100,
    icon: Shield,
    description: 'Políticas e controles de IA',
  },
  {
    id: 'technology',
    name: 'Tecnologia & Ferramentas',
    score: 50,
    maxScore: 100,
    icon: Cpu,
    description: 'Stack tecnológico e ferramentas',
  },
  {
    id: 'adoption',
    name: 'Adoção & Escala',
    score: 25,
    maxScore: 100,
    icon: Users,
    description: 'Uso e escala de soluções de IA',
  },
];

const overallScore = Math.round(
  dimensions.reduce((acc, d) => acc + d.score, 0) / dimensions.length
);

const getScoreColor = (score: number) => {
  if (score >= 70) return 'text-status-success';
  if (score >= 40) return 'text-status-warning';
  return 'text-status-error';
};

const getScoreLabel = (score: number) => {
  if (score >= 70) return 'Avançado';
  if (score >= 40) return 'Em Desenvolvimento';
  return 'Inicial';
};

type ChatMessage = { role: 'user' | 'assistant'; content: string };

// Mock chat messages
const initialMessages: ChatMessage[] = [
  {
    role: 'assistant',
    content: `Olá! Sou o **MaturityDiagnosticAgent** e vou ajudá-lo a avaliar o nível de maturidade de IA da sua empresa.

Já temos um diagnóstico inicial baseado nas respostas coletadas. O score atual é **${overallScore}/100**.

Posso ajudar com:
- Detalhar os resultados por dimensão
- Explicar as recomendações
- Iniciar uma nova avaliação
- Comparar com benchmarks do mercado

O que gostaria de explorar?`,
  },
];

export function MaturityDiagnostic() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: 'user' as const, content: inputValue }]);
    setInputValue('');
    setIsLoading(true);

    // Simulate agent response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content: `Ótima pergunta! Analisando os dados do diagnóstico...

A dimensão **Dados & Infraestrutura** está com score 35/100, o que indica oportunidades de melhoria em:

1. **Qualidade dos dados**: Dados fragmentados em silos
2. **Acessibilidade**: Falta de catálogo centralizado
3. **Governança de dados**: Políticas inconsistentes

**Recomendações:**
- Implementar um Data Catalog
- Definir data owners por domínio
- Criar pipelines de qualidade de dados

Quer que eu detalhe algum desses pontos?`,
        },
      ]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div>
      <Header
        title="Diagnóstico de Maturidade"
        subtitle="Avalie o nível de maturidade de IA da sua empresa"
      />

      <main className="p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Score Overview */}
          <div className="space-y-6">
            {/* Overall Score Card */}
            <Card className="text-center">
              <CardContent>
                <div className="mb-4">
                  <Badge variant="plan">MaturityDiagnosticAgent</Badge>
                </div>
                <div className="relative mx-auto h-40 w-40">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                      className="text-surface-light"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                      strokeDasharray={`${overallScore * 2.83} 283`}
                      strokeLinecap="round"
                      className="text-aimana-teal"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
                      {overallScore}
                    </span>
                    <span className="text-sm text-text-muted">de 100</span>
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-text">
                  Maturidade Geral
                </h3>
                <Badge variant={overallScore >= 40 ? 'warning' : 'error'} className="mt-2">
                  {getScoreLabel(overallScore)}
                </Badge>
              </CardContent>
            </Card>

            {/* Dimensions List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Por Dimensão</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dimensions.map((dim) => (
                  <div key={dim.id}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <dim.icon className="h-4 w-4 text-text-muted" />
                        <span className="text-sm font-medium text-text">{dim.name}</span>
                      </div>
                      <span className={`text-sm font-semibold ${getScoreColor(dim.score)}`}>
                        {dim.score}
                      </span>
                    </div>
                    <Progress value={dim.score} size="sm" variant="secondary" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <RefreshCw className="h-4 w-4 mr-2" />
                Nova Avaliação
              </Button>
              <Button variant="secondary" className="flex-1">
                Exportar PDF
              </Button>
            </div>
          </div>

          {/* Right Column - Agent Chat */}
          <div className="lg:col-span-2">
            <Card className="flex h-[calc(100vh-220px)] flex-col">
              <CardHeader className="border-b border-surface-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-aimana-teal">
                    <Bot className="h-5 w-5 text-aimana-navy" />
                  </div>
                  <div>
                    <CardTitle className="text-base">MaturityDiagnosticAgent</CardTitle>
                    <CardDescription>
                      Seu assistente para diagnóstico de maturidade
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              {/* Chat Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.role === 'user'
                          ? 'bg-aimana-navy text-white'
                          : 'bg-surface-light text-text'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-surface-light rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 rounded-full bg-text-muted animate-pulse" />
                        <span className="h-2 w-2 rounded-full bg-text-muted animate-pulse delay-100" />
                        <span className="h-2 w-2 rounded-full bg-text-muted animate-pulse delay-200" />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>

              {/* Chat Input */}
              <div className="border-t border-surface-border p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Pergunte sobre o diagnóstico..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1"
                  />
                  <Button onClick={handleSend} disabled={!inputValue.trim() || isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-2 text-xs text-text-muted">
                  Perguntas sugeridas: "Detalhe a dimensão de Dados" • "Quais as recomendações prioritárias?" • "Compare com o mercado"
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
