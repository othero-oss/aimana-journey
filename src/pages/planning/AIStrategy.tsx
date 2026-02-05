/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - AI Strategy Hub Page
 * Definição de visão e estratégia de IA
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
  Target,
  Users,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Calendar,
  ArrowRight,
  Bot,
  Send,
  Download,
  Eye,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock leadership inputs
const leadershipInputs = [
  {
    id: 1,
    leader: 'CEO - Roberto Silva',
    vision: 'Tornar a empresa referência em inovação com IA no setor',
    opportunities: ['Automação de processos', 'Novos produtos digitais'],
    risks: ['Resistência cultural', 'Investimento inicial'],
    status: 'completed',
  },
  {
    id: 2,
    leader: 'CFO - Maria Santos',
    vision: 'Reduzir custos operacionais em 20% com automação inteligente',
    opportunities: ['Automação financeira', 'Previsão de fluxo de caixa'],
    risks: ['Qualidade dos dados', 'Compliance'],
    status: 'completed',
  },
  {
    id: 3,
    leader: 'COO - Carlos Lima',
    vision: 'Otimizar operações e supply chain com IA preditiva',
    opportunities: ['Previsão de demanda', 'Manutenção preditiva'],
    risks: ['Integração com sistemas legados'],
    status: 'completed',
  },
  {
    id: 4,
    leader: 'CTO - Ana Costa',
    vision: 'Construir capacidades internas de IA e ML',
    opportunities: ['Plataforma de dados', 'MLOps'],
    risks: ['Escassez de talentos', 'Governança de dados'],
    status: 'pending',
  },
];

// Strategy pillars
const strategyPillars = [
  {
    id: 'efficiency',
    title: 'Eficiência Operacional',
    description: 'Automatizar processos repetitivos e reduzir custos',
    initiatives: 5,
    progress: 45,
    icon: Target,
  },
  {
    id: 'experience',
    title: 'Experiência do Cliente',
    description: 'Melhorar atendimento e personalização com IA',
    initiatives: 3,
    progress: 30,
    icon: Users,
  },
  {
    id: 'innovation',
    title: 'Inovação de Produtos',
    description: 'Criar novos produtos e serviços baseados em IA',
    initiatives: 2,
    progress: 15,
    icon: Lightbulb,
  },
];

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export function AIStrategy() {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Olá! Sou o assistente do **AI Strategy Hub**. Posso ajudá-lo a:

• Consolidar inputs da liderança
• Gerar documento de visão AI-First
• Preparar agenda para AI Leaders Workshop
• Identificar gaps de alinhamento

Os inputs de 3 de 4 líderes já foram coletados. O que gostaria de fazer?`,
    },
  ]);

  const completedInputs = leadershipInputs.filter((l) => l.status === 'completed').length;

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: 'user' as const, content: chatInput }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content: `Baseado na análise dos inputs coletados, identifiquei os seguintes pontos:

**Alinhamentos:**
✓ Todos concordam com foco em eficiência operacional
✓ Automação é prioridade unânime
✓ Preocupação comum com qualidade de dados

**Gaps a resolver:**
⚠ Divergência sobre timeline (curto vs médio prazo)
⚠ Diferentes visões sobre build vs buy

**Recomendação:**
Agendar AI Leaders Workshop para alinhar esses pontos antes de definir o roadmap.

Deseja que eu prepare a agenda sugerida?`,
        },
      ]);
    }, 1500);
  };

  return (
    <div>
      <Header
        title="AI Strategy Hub"
        subtitle="Defina a visão e estratégia de IA alinhada com a liderança"
      />

      <main className="p-6">
        {/* Progress Overview */}
        <Card className="mb-6 border-l-4 border-l-phase-plan">
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-text">Pré-trabalho AI Leaders</h2>
                <p className="text-sm text-text-secondary mt-1">
                  Colete inputs da liderança antes do workshop estratégico
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <Badge variant="plan">Fase: Coleta</Badge>
                  <span className="text-sm text-text-muted">
                    {completedInputs} de {leadershipInputs.length} líderes responderam
                  </span>
                </div>
              </div>
              <div className="w-full md:w-48">
                <Progress
                  value={(completedInputs / leadershipInputs.length) * 100}
                  showLabel
                  variant="secondary"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Leadership Inputs */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Inputs da Liderança</CardTitle>
                    <CardDescription>Visão, oportunidades e riscos por líder</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Enviar Lembrete
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {leadershipInputs.map((input) => (
                  <div
                    key={input.id}
                    className={cn(
                      'rounded-lg border p-4',
                      input.status === 'completed'
                        ? 'border-surface-border bg-white'
                        : 'border-dashed border-surface-border bg-surface-light'
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-aimana-navy flex items-center justify-center text-white text-sm font-medium">
                          {input.leader.split(' ').pop()?.charAt(0)}
                        </div>
                        <span className="font-medium text-text">{input.leader}</span>
                      </div>
                      {input.status === 'completed' ? (
                        <Badge variant="success">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Respondido
                        </Badge>
                      ) : (
                        <Badge variant="pending">Pendente</Badge>
                      )}
                    </div>

                    {input.status === 'completed' ? (
                      <>
                        <p className="text-sm text-text mb-3">
                          <strong>Visão:</strong> {input.vision}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-medium text-text-muted mb-1">Oportunidades</p>
                            <div className="flex flex-wrap gap-1">
                              {input.opportunities.map((opp, i) => (
                                <Badge key={i} variant="success" size="sm">
                                  {opp}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-text-muted mb-1">Riscos</p>
                            <div className="flex flex-wrap gap-1">
                              {input.risks.map((risk, i) => (
                                <Badge key={i} variant="warning" size="sm">
                                  {risk}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-text-muted">
                        Aguardando resposta do questionário de pré-trabalho
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Strategy Pillars */}
            <Card>
              <CardHeader>
                <CardTitle>Pilares Estratégicos (Rascunho)</CardTitle>
                <CardDescription>
                  Baseado nos inputs consolidados - a ser validado no workshop
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {strategyPillars.map((pillar) => (
                    <div key={pillar.id} className="flex items-center gap-4 p-3 rounded-lg bg-surface-light">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-phase-plan-bg">
                        <pillar.icon className="h-5 w-5 text-phase-plan" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-text">{pillar.title}</h4>
                          <span className="text-sm text-text-muted">{pillar.initiatives} iniciativas</span>
                        </div>
                        <p className="text-sm text-text-secondary mb-2">{pillar.description}</p>
                        <Progress value={pillar.progress} size="sm" variant="secondary" />
                      </div>
                    </div>
                  ))}
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
                    <CardTitle className="text-base">Strategy Copilot</CardTitle>
                    <CardDescription>Assistente de estratégia</CardDescription>
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
                      placeholder="Pergunte sobre a estratégia..."
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

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Documentos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Visão AI-First (Rascunho)
                  <Eye className="h-4 w-4 ml-auto" />
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Agenda AI Leaders Workshop
                  <Download className="h-4 w-4 ml-auto" />
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Mapa de Alinhamento
                  <Eye className="h-4 w-4 ml-auto" />
                </Button>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="bg-gradient-header text-white">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Próximos Passos</h3>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-aimana-teal" />
                    Coletar input do CTO
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border border-white/50" />
                    Agendar AI Leaders Workshop
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border border-white/50" />
                    Validar pilares estratégicos
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
