/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Governance & Stack Page
 * Governança de IA e definição de stack tecnológico
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
  Shield,
  Server,
  Cloud,
  Lock,
  FileCheck,
  Users,
  AlertTriangle,
  CheckCircle2,
  Bot,
  Send,
  Settings,
  Database,
  Cpu,
  Network,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Governance checklist items
const governanceItems = [
  {
    id: 1,
    category: 'Políticas',
    items: [
      { name: 'Política de uso de IA', status: 'completed' },
      { name: 'Diretrizes éticas', status: 'completed' },
      { name: 'Política de dados para IA', status: 'in_progress' },
      { name: 'Processo de aprovação de modelos', status: 'pending' },
    ],
  },
  {
    id: 2,
    category: 'Segurança',
    items: [
      { name: 'Classificação de dados', status: 'completed' },
      { name: 'Controle de acesso a modelos', status: 'in_progress' },
      { name: 'Auditoria de uso', status: 'pending' },
      { name: 'Proteção de PII', status: 'in_progress' },
    ],
  },
  {
    id: 3,
    category: 'Compliance',
    items: [
      { name: 'LGPD para IA', status: 'in_progress' },
      { name: 'Regulamentações setoriais', status: 'pending' },
      { name: 'Documentação de modelos', status: 'pending' },
      { name: 'Explainability requirements', status: 'pending' },
    ],
  },
];

// Tech stack recommendations
const stackRecommendations = [
  {
    id: 'foundation',
    name: 'Foundation Models',
    icon: Cpu,
    options: [
      { name: 'Claude (Anthropic)', recommended: true, notes: 'Melhor raciocínio' },
      { name: 'GPT-4 (OpenAI)', recommended: false, notes: 'Versátil' },
      { name: 'Llama 3 (Meta)', recommended: false, notes: 'Open source' },
    ],
  },
  {
    id: 'orchestration',
    name: 'Orchestration',
    icon: Network,
    options: [
      { name: 'LangChain', recommended: true, notes: 'Ecossistema rico' },
      { name: 'LlamaIndex', recommended: false, notes: 'Bom para RAG' },
      { name: 'Custom', recommended: false, notes: 'Flexível' },
    ],
  },
  {
    id: 'vector',
    name: 'Vector Store',
    icon: Database,
    options: [
      { name: 'Pinecone', recommended: true, notes: 'Managed, escalável' },
      { name: 'Weaviate', recommended: false, notes: 'Open source' },
      { name: 'pgvector', recommended: false, notes: 'Se já usa PostgreSQL' },
    ],
  },
  {
    id: 'infra',
    name: 'Infraestrutura',
    icon: Cloud,
    options: [
      { name: 'AWS Bedrock', recommended: true, notes: 'Se já usa AWS' },
      { name: 'Azure OpenAI', recommended: false, notes: 'Se já usa Azure' },
      { name: 'GCP Vertex AI', recommended: false, notes: 'Se já usa GCP' },
    ],
  },
];

const statusConfig = {
  completed: { label: 'Concluído', color: 'text-status-success', icon: CheckCircle2 },
  in_progress: { label: 'Em andamento', color: 'text-status-warning', icon: Settings },
  pending: { label: 'Pendente', color: 'text-text-muted', icon: AlertTriangle },
};

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export function Governance() {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Olá! Sou o **GovernanceAgent**. Analisei o perfil da empresa e recomendo:

**Stack Recomendada:**
• Foundation: Claude (Anthropic) - melhor para casos enterprise
• Orchestration: LangChain - ecossistema maduro
• Vector: Pinecone - managed e escalável
• Infra: AWS Bedrock - alinhado com stack atual

**Governança:**
⚠️ 3 de 12 controles completos
📋 Priorize: Política de dados para IA

Posso detalhar alguma recomendação?`,
    },
  ]);

  const totalItems = governanceItems.flatMap((g) => g.items).length;
  const completedItems = governanceItems.flatMap((g) => g.items).filter((i) => i.status === 'completed').length;
  const governanceScore = Math.round((completedItems / totalItems) * 100);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: 'user' as const, content: chatInput }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content: `Para implementar a **Política de dados para IA**, sugiro:

**Estrutura do documento:**
1. Classificação de dados por sensibilidade
2. Regras de uso em treinamento vs inferência
3. Retenção e exclusão de dados
4. Consentimento e transparência

**Próximos passos:**
1. Mapear fluxos de dados atuais
2. Definir matriz RACI
3. Alinhar com time jurídico (LGPD)
4. Criar processo de aprovação

Posso gerar um template inicial?`,
        },
      ]);
    }, 1500);
  };

  return (
    <div>
      <Header
        title="Governança & Stack"
        subtitle="Defina controles de governança e escolha o stack tecnológico"
      />

      <main className="p-6">
        {/* Governance Score */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card className="md:col-span-1">
            <CardContent className="p-4 text-center">
              <div className="relative mx-auto h-24 w-24 mb-2">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-surface-light"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeDasharray={`${governanceScore * 2.51} 251`}
                    strokeLinecap="round"
                    className={cn(
                      governanceScore >= 70 ? 'text-status-success' :
                      governanceScore >= 50 ? 'text-status-warning' : 'text-status-error'
                    )}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-text">{governanceScore}%</span>
                </div>
              </div>
              <p className="text-sm font-medium text-text">Governança</p>
              <p className="text-xs text-text-muted">{completedItems} de {totalItems} controles</p>
            </CardContent>
          </Card>

          {governanceItems.map((category) => {
            const completed = category.items.filter((i) => i.status === 'completed').length;
            const inProgress = category.items.filter((i) => i.status === 'in_progress').length;
            return (
              <Card key={category.id}>
                <CardContent className="p-4">
                  <h3 className="text-sm font-medium text-text mb-3">{category.category}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Progress value={(completed / category.items.length) * 100} size="sm" className="flex-1" />
                    <span className="text-xs text-text-muted">{completed}/{category.items.length}</span>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="success" size="sm">{completed} ok</Badge>
                    {inProgress > 0 && <Badge variant="warning" size="sm">{inProgress} em progresso</Badge>}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Governance Checklist */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Checklist de Governança</CardTitle>
                    <CardDescription>Controles necessários para uso seguro de IA</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <FileCheck className="h-4 w-4 mr-1" />
                    Exportar Relatório
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {governanceItems.map((category) => (
                    <div key={category.id}>
                      <div className="flex items-center gap-2 mb-3">
                        {category.category === 'Políticas' && <FileCheck className="h-4 w-4 text-phase-plan" />}
                        {category.category === 'Segurança' && <Shield className="h-4 w-4 text-phase-execute" />}
                        {category.category === 'Compliance' && <Lock className="h-4 w-4 text-phase-manage" />}
                        <h4 className="font-medium text-text">{category.category}</h4>
                      </div>
                      <div className="grid gap-2 md:grid-cols-2">
                        {category.items.map((item, idx) => {
                          const status = statusConfig[item.status as keyof typeof statusConfig];
                          return (
                            <div
                              key={idx}
                              className={cn(
                                'flex items-center gap-2 p-2 rounded-lg',
                                item.status === 'completed' && 'bg-status-success-bg',
                                item.status === 'in_progress' && 'bg-status-warning-bg',
                                item.status === 'pending' && 'bg-surface-light'
                              )}
                            >
                              <status.icon className={cn('h-4 w-4', status.color)} />
                              <span className="text-sm text-text flex-1">{item.name}</span>
                              <Badge
                                variant={item.status === 'completed' ? 'success' : item.status === 'in_progress' ? 'warning' : 'pending'}
                                size="sm"
                              >
                                {status.label}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tech Stack */}
            <Card>
              <CardHeader>
                <CardTitle>Stack Tecnológico Recomendado</CardTitle>
                <CardDescription>Baseado no perfil e maturidade da empresa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {stackRecommendations.map((stack) => (
                    <div key={stack.id} className="rounded-lg border border-surface-border p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <stack.icon className="h-5 w-5 text-aimana-navy" />
                        <h4 className="font-medium text-text">{stack.name}</h4>
                      </div>
                      <div className="space-y-2">
                        {stack.options.map((option, idx) => (
                          <div
                            key={idx}
                            className={cn(
                              'flex items-center justify-between p-2 rounded',
                              option.recommended ? 'bg-aimana-teal/10 border border-aimana-teal/30' : 'bg-surface-light'
                            )}
                          >
                            <div className="flex items-center gap-2">
                              {option.recommended && <CheckCircle2 className="h-4 w-4 text-aimana-teal" />}
                              <span className={cn('text-sm', option.recommended ? 'font-medium text-text' : 'text-text-secondary')}>
                                {option.name}
                              </span>
                            </div>
                            <span className="text-xs text-text-muted">{option.notes}</span>
                          </div>
                        ))}
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
                    <CardTitle className="text-base">GovernanceAgent</CardTitle>
                    <CardDescription>Orientação de governança</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-72 overflow-y-auto p-4 space-y-3 scrollbar-thin">
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
                      placeholder="Pergunte sobre governança..."
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

            {/* Risks */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Riscos Identificados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-2 rounded-lg bg-status-error-bg">
                  <AlertTriangle className="h-5 w-5 text-status-error mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-text">Sem auditoria de uso</p>
                    <p className="text-xs text-text-secondary">Não há rastreamento de chamadas a modelos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 rounded-lg bg-status-warning-bg">
                  <AlertTriangle className="h-5 w-5 text-status-warning mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-text">Compliance LGPD</p>
                    <p className="text-xs text-text-secondary">Política de dados para IA incompleta</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-gradient-header text-white">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Templates Úteis</h3>
                <div className="space-y-2 text-sm">
                  <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10 justify-start">
                    <FileCheck className="h-4 w-4 mr-2" />
                    Política de Uso de IA
                  </Button>
                  <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10 justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Framework de Governança
                  </Button>
                  <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10 justify-start">
                    <Lock className="h-4 w-4 mr-2" />
                    Checklist LGPD para IA
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
