/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - ROI Tracker Page
 * Acompanhamento de retorno sobre investimento em IA
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
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  BarChart3,
  Bot,
  Send,
  Calendar,
  Target,
  Zap,
  Clock,
  ArrowUp,
  ArrowDown,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ROI by initiative
const roiData = [
  {
    id: 1,
    name: 'Customer Support Agent',
    investment: 150000,
    savings: 480000,
    roi: 220,
    roiTarget: 200,
    paybackMonths: 4,
    status: 'exceeded',
    monthlyData: [20000, 35000, 45000, 55000, 60000, 65000],
  },
  {
    id: 2,
    name: 'Sales Assistant',
    investment: 200000,
    savings: 280000,
    roi: 40,
    roiTarget: 100,
    paybackMonths: 9,
    status: 'on_track',
    monthlyData: [15000, 25000, 35000, 45000, 50000, 55000],
  },
  {
    id: 3,
    name: 'Data Insights Agent',
    investment: 180000,
    savings: 320000,
    roi: 78,
    roiTarget: 150,
    paybackMonths: 7,
    status: 'on_track',
    monthlyData: [25000, 40000, 50000, 60000, 70000, 75000],
  },
  {
    id: 4,
    name: 'Document Analyzer',
    investment: 80000,
    savings: 45000,
    roi: -44,
    roiTarget: 80,
    paybackMonths: 0,
    status: 'at_risk',
    monthlyData: [5000, 8000, 10000, 10000, 8000, 4000],
  },
];

// Cost breakdown
const costBreakdown = [
  { category: 'LLM APIs', value: 45000, percentage: 35 },
  { category: 'Infraestrutura', value: 30000, percentage: 23 },
  { category: 'Desenvolvimento', value: 35000, percentage: 27 },
  { category: 'Operações', value: 20000, percentage: 15 },
];

// Savings breakdown
const savingsBreakdown = [
  { category: 'Redução de Headcount', value: 600000, percentage: 48 },
  { category: 'Eficiência Operacional', value: 380000, percentage: 30 },
  { category: 'Redução de Erros', value: 150000, percentage: 12 },
  { category: 'Aumento de Receita', value: 125000, percentage: 10 },
];

const statusConfig = {
  exceeded: { label: 'Acima da Meta', color: 'text-status-success', badge: 'success' as const },
  on_track: { label: 'No Caminho', color: 'text-aimana-teal', badge: 'execute' as const },
  at_risk: { label: 'Em Risco', color: 'text-status-error', badge: 'error' as const },
};

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export function ROITracker() {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Olá! Sou o **ROIAgent**. Resumo financeiro do portfólio:

**Totais:**
• Investimento: R$610.000
• Economia gerada: R$1.125.000
• ROI Global: **84%**

**Destaques:**
✅ Customer Support: ROI de 220% (meta: 200%)
⚠️ Document Analyzer: ROI negativo (-44%)

**Projeção 12 meses:**
ROI esperado: 156% (+72pp vs atual)

Posso detalhar algum projeto?`,
    },
  ]);

  const totalInvestment = roiData.reduce((acc, r) => acc + r.investment, 0);
  const totalSavings = roiData.reduce((acc, r) => acc + r.savings, 0);
  const globalROI = Math.round(((totalSavings - totalInvestment) / totalInvestment) * 100);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: 'user' as const, content: chatInput }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content: `**Análise do Document Analyzer:**

**Por que ROI negativo?**
1. Taxa de erro alta (3.5%) gerando retrabalho
2. Latência (5.2s) limitando throughput
3. Necessidade de revisão humana em 40% dos casos

**Cenários de recuperação:**

**Cenário A - Otimização:**
- Investimento adicional: R$25.000
- ROI projetado em 6 meses: 45%

**Cenário B - Pivot:**
- Foco apenas em documentos estruturados
- ROI projetado: 80%
- Reduz escopo em 60%

**Cenário C - Descontinuar:**
- Economia imediata: R$15.000/mês
- Perda de funcionalidade para usuários

Qual cenário deseja explorar?`,
        },
      ]);
    }, 1500);
  };

  return (
    <div>
      <Header
        title="ROI Tracker"
        subtitle="Acompanhamento de retorno sobre investimento em IA"
      />

      <main className="p-6">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
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
                  <p className="text-sm text-text-muted">Economia Gerada</p>
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
                  <p className="text-sm text-text-muted">ROI Global</p>
                  <p className={cn(
                    'text-2xl font-bold',
                    globalROI >= 0 ? 'text-status-success' : 'text-status-error'
                  )}>{globalROI}%</p>
                </div>
                <div className={cn(
                  'h-10 w-10 rounded-lg flex items-center justify-center',
                  globalROI >= 0 ? 'bg-status-success-bg' : 'bg-status-error-bg'
                )}>
                  {globalROI >= 0 ? (
                    <ArrowUp className="h-5 w-5 text-status-success" />
                  ) : (
                    <ArrowDown className="h-5 w-5 text-status-error" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">Payback Médio</p>
                  <p className="text-2xl font-bold text-text">6.5 meses</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-phase-manage-bg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-phase-manage" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* ROI by Initiative */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text">ROI por Iniciativa</h2>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Exportar
              </Button>
            </div>

            <div className="space-y-4">
              {roiData.map((item) => {
                const status = statusConfig[item.status as keyof typeof statusConfig];
                const roiProgress = Math.min(100, Math.max(0, (item.roi / item.roiTarget) * 100));
                return (
                  <Card key={item.id} variant="interactive">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-text">{item.name}</h3>
                          <Badge variant={status.badge}>{status.label}</Badge>
                        </div>
                        <div className="text-right">
                          <p className={cn(
                            'text-2xl font-bold',
                            item.roi >= 0 ? 'text-status-success' : 'text-status-error'
                          )}>{item.roi}%</p>
                          <p className="text-xs text-text-muted">Meta: {item.roiTarget}%</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                          <span>Progresso vs Meta</span>
                          <span>{Math.round(roiProgress)}%</span>
                        </div>
                        <Progress
                          value={roiProgress}
                          variant={item.roi >= item.roiTarget ? 'success' : item.roi >= 0 ? 'warning' : 'error'}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-2 rounded-lg bg-surface-light">
                          <p className="text-sm font-medium text-text">R${(item.investment / 1000).toFixed(0)}k</p>
                          <p className="text-xs text-text-muted">Investido</p>
                        </div>
                        <div className="p-2 rounded-lg bg-surface-light">
                          <p className="text-sm font-medium text-status-success">R${(item.savings / 1000).toFixed(0)}k</p>
                          <p className="text-xs text-text-muted">Economia</p>
                        </div>
                        <div className="p-2 rounded-lg bg-surface-light">
                          <p className="text-sm font-medium text-text">
                            {item.paybackMonths > 0 ? `${item.paybackMonths} meses` : 'N/A'}
                          </p>
                          <p className="text-xs text-text-muted">Payback</p>
                        </div>
                      </div>

                      {/* Mini chart placeholder */}
                      <div className="mt-4 pt-4 border-t border-surface-border">
                        <div className="flex items-end justify-between h-12 gap-1">
                          {item.monthlyData.map((value, idx) => {
                            const maxValue = Math.max(...item.monthlyData);
                            const height = (value / maxValue) * 100;
                            return (
                              <div
                                key={idx}
                                className={cn(
                                  'flex-1 rounded-t',
                                  item.roi >= 0 ? 'bg-status-success/60' : 'bg-status-error/60'
                                )}
                                style={{ height: `${height}%` }}
                              />
                            );
                          })}
                        </div>
                        <p className="text-xs text-text-muted text-center mt-1">Economia mensal (últimos 6 meses)</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
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
                    <CardTitle className="text-base">ROIAgent</CardTitle>
                    <CardDescription>Análise financeira</CardDescription>
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
                      placeholder="Pergunte sobre ROI..."
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

            {/* Cost Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Custos por Categoria</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {costBreakdown.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-text">{item.category}</span>
                      <span className="text-sm font-medium text-text">R${(item.value / 1000).toFixed(0)}k</span>
                    </div>
                    <Progress value={item.percentage} size="sm" variant="warning" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Savings Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Economia por Tipo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {savingsBreakdown.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-text">{item.category}</span>
                      <span className="text-sm font-medium text-status-success">R${(item.value / 1000).toFixed(0)}k</span>
                    </div>
                    <Progress value={item.percentage} size="sm" variant="success" />
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
