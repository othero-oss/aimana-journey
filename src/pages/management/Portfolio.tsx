/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Portfolio Dashboard Page
 * Visão consolidada de todas as iniciativas de IA
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
  LayoutGrid,
  List,
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Target,
  Bot,
  Send,
  ArrowRight,
  MoreVertical,
  Calendar,
  Users,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Portfolio initiatives
const initiatives = [
  {
    id: 1,
    name: 'Automação de Atendimento',
    description: 'Agente de suporte ao cliente com IA',
    phase: 'Gerir',
    status: 'active',
    progress: 100,
    roi: 320,
    investment: 150000,
    savings: 480000,
    timeline: 'Q1 2025',
    owner: 'Maria Santos',
    priority: 'high',
    health: 'green',
  },
  {
    id: 2,
    name: 'Análise Preditiva de Vendas',
    description: 'Previsão de demanda e oportunidades',
    phase: 'Executar',
    status: 'active',
    progress: 65,
    roi: 180,
    investment: 200000,
    savings: 360000,
    timeline: 'Q2 2025',
    owner: 'Carlos Lima',
    priority: 'high',
    health: 'yellow',
  },
  {
    id: 3,
    name: 'Extração de Documentos',
    description: 'OCR e processamento automático',
    phase: 'Executar',
    status: 'paused',
    progress: 40,
    roi: 95,
    investment: 80000,
    savings: 76000,
    timeline: 'Q2 2025',
    owner: 'Ana Costa',
    priority: 'medium',
    health: 'red',
  },
  {
    id: 4,
    name: 'Assistente de RH',
    description: 'Onboarding e FAQ para colaboradores',
    phase: 'Planejar',
    status: 'planning',
    progress: 20,
    roi: 150,
    investment: 60000,
    savings: 90000,
    timeline: 'Q3 2025',
    owner: 'Roberto Silva',
    priority: 'medium',
    health: 'green',
  },
  {
    id: 5,
    name: 'Otimização de Supply Chain',
    description: 'Previsão de estoque e logística',
    phase: 'Planejar',
    status: 'planning',
    progress: 10,
    roi: 250,
    investment: 300000,
    savings: 750000,
    timeline: 'Q4 2025',
    owner: 'Carlos Lima',
    priority: 'high',
    health: 'green',
  },
];

const phaseConfig = {
  Planejar: { color: 'bg-phase-plan', badge: 'plan' as const },
  Executar: { color: 'bg-phase-execute', badge: 'execute' as const },
  Gerir: { color: 'bg-phase-manage', badge: 'manage' as const },
};

const healthConfig = {
  green: { color: 'text-status-success', bg: 'bg-status-success', label: 'No prazo' },
  yellow: { color: 'text-status-warning', bg: 'bg-status-warning', label: 'Atenção' },
  red: { color: 'text-status-error', bg: 'bg-status-error', label: 'Em risco' },
};

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export function Portfolio() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Olá! Sou o **PortfolioAgent**. Visão geral do portfólio:

**Status:**
• 5 iniciativas ativas
• ROI médio projetado: 199%
• 1 projeto em risco (Extração de Documentos)

**Destaques:**
✅ Automação de Atendimento: ROI de 320%
⚠️ Análise Preditiva: atraso de 2 semanas

Posso ajudar a priorizar ou realocar recursos?`,
    },
  ]);

  const totalInvestment = initiatives.reduce((acc, i) => acc + i.investment, 0);
  const totalSavings = initiatives.reduce((acc, i) => acc + i.savings, 0);
  const avgROI = Math.round(initiatives.reduce((acc, i) => acc + i.roi, 0) / initiatives.length);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: 'user' as const, content: chatInput }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content: `Análise de risco do projeto **Extração de Documentos**:

**Problemas identificados:**
1. Taxa de erro acima de 1% em produção
2. Falta de dados de treinamento para documentos não estruturados
3. Dependência de API externa com latência alta

**Recomendações:**
1. **Pausar deploy** até resolver problemas técnicos
2. **Investir em dados**: coletar mais exemplos de documentos
3. **Avaliar alternativas** para API de OCR

**Impacto se pausarmos:**
- Timeline: +4 semanas
- Budget: +R$15.000 para melhorias

Deseja que eu agende uma reunião com o time técnico?`,
        },
      ]);
    }, 1500);
  };

  return (
    <div>
      <Header
        title="Portfolio Dashboard"
        subtitle="Visão consolidada de todas as iniciativas de IA"
      />

      <main className="p-6">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">Iniciativas Ativas</p>
                  <p className="text-2xl font-bold text-text">{initiatives.length}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-aimana-teal/10 flex items-center justify-center">
                  <Target className="h-5 w-5 text-aimana-teal" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">Investimento Total</p>
                  <p className="text-2xl font-bold text-text">R${(totalInvestment / 1000).toFixed(0)}k</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-status-warning-bg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-status-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">Economia Projetada</p>
                  <p className="text-2xl font-bold text-status-success">R${(totalSavings / 1000).toFixed(0)}k</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-status-success-bg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-status-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">ROI Médio</p>
                  <p className="text-2xl font-bold text-text">{avgROI}%</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-phase-manage-bg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-phase-manage" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Initiatives List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text">Iniciativas</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filtrar
                </Button>
                <div className="flex rounded-lg border border-surface-border overflow-hidden">
                  <button
                    className={cn(
                      'p-2',
                      viewMode === 'grid' ? 'bg-surface-light' : 'bg-white'
                    )}
                    onClick={() => setViewMode('grid')}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    className={cn(
                      'p-2',
                      viewMode === 'list' ? 'bg-surface-light' : 'bg-white'
                    )}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid gap-4 md:grid-cols-2">
                {initiatives.map((initiative) => {
                  const phase = phaseConfig[initiative.phase as keyof typeof phaseConfig];
                  const health = healthConfig[initiative.health as keyof typeof healthConfig];
                  return (
                    <Card key={initiative.id} variant="interactive">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <Badge variant={phase.badge}>{initiative.phase}</Badge>
                          <div className={cn('w-2 h-2 rounded-full', health.bg)} title={health.label} />
                        </div>
                        <h3 className="font-semibold text-text mb-1">{initiative.name}</h3>
                        <p className="text-sm text-text-secondary mb-3">{initiative.description}</p>

                        <div className="flex items-center gap-2 mb-3">
                          <Progress value={initiative.progress} size="sm" className="flex-1" />
                          <span className="text-xs text-text-muted">{initiative.progress}%</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-1 text-text-muted">
                            <DollarSign className="h-3 w-3" />
                            ROI: <span className="text-status-success font-medium">{initiative.roi}%</span>
                          </div>
                          <div className="flex items-center gap-1 text-text-muted">
                            <Calendar className="h-3 w-3" />
                            {initiative.timeline}
                          </div>
                          <div className="flex items-center gap-1 text-text-muted">
                            <Users className="h-3 w-3" />
                            {initiative.owner}
                          </div>
                          <div className="flex items-center gap-1">
                            {initiative.health === 'red' ? (
                              <AlertTriangle className="h-3 w-3 text-status-error" />
                            ) : (
                              <CheckCircle2 className="h-3 w-3 text-status-success" />
                            )}
                            <span className={health.color}>{health.label}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-surface-border">
                        <th className="text-left p-3 text-sm font-medium text-text-muted">Iniciativa</th>
                        <th className="text-left p-3 text-sm font-medium text-text-muted">Fase</th>
                        <th className="text-left p-3 text-sm font-medium text-text-muted">Progresso</th>
                        <th className="text-left p-3 text-sm font-medium text-text-muted">ROI</th>
                        <th className="text-left p-3 text-sm font-medium text-text-muted">Saúde</th>
                        <th className="text-left p-3 text-sm font-medium text-text-muted"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {initiatives.map((initiative) => {
                        const phase = phaseConfig[initiative.phase as keyof typeof phaseConfig];
                        const health = healthConfig[initiative.health as keyof typeof healthConfig];
                        return (
                          <tr key={initiative.id} className="border-b border-surface-border last:border-0 hover:bg-surface-light">
                            <td className="p-3">
                              <div>
                                <p className="font-medium text-text">{initiative.name}</p>
                                <p className="text-xs text-text-muted">{initiative.owner}</p>
                              </div>
                            </td>
                            <td className="p-3">
                              <Badge variant={phase.badge} size="sm">{initiative.phase}</Badge>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <Progress value={initiative.progress} size="sm" className="w-20" />
                                <span className="text-xs text-text-muted">{initiative.progress}%</span>
                              </div>
                            </td>
                            <td className="p-3">
                              <span className="text-status-success font-medium">{initiative.roi}%</span>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-1">
                                <div className={cn('w-2 h-2 rounded-full', health.bg)} />
                                <span className={cn('text-xs', health.color)}>{health.label}</span>
                              </div>
                            </td>
                            <td className="p-3">
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            )}
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
                    <CardTitle className="text-base">PortfolioAgent</CardTitle>
                    <CardDescription>Análise de portfólio</CardDescription>
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
                      placeholder="Pergunte sobre o portfólio..."
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

            {/* By Phase */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Por Fase</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(phaseConfig).map(([phase, config]) => {
                  const count = initiatives.filter((i) => i.phase === phase).length;
                  return (
                    <div key={phase} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn('w-3 h-3 rounded', config.color)} />
                        <span className="text-sm text-text">{phase}</span>
                      </div>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* At Risk */}
            <Card className="border-status-error/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-status-error" />
                  <CardTitle className="text-base">Em Risco</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {initiatives.filter((i) => i.health === 'red').map((initiative) => (
                  <div key={initiative.id} className="flex items-center justify-between p-2 rounded-lg bg-status-error-bg">
                    <div>
                      <p className="text-sm font-medium text-text">{initiative.name}</p>
                      <p className="text-xs text-text-muted">{initiative.status === 'paused' ? 'Pausado' : 'Atrasado'}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
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
