/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - ROI Tracker Page
 * Acompanhamento de retorno sobre investimento em IA
 * Layout full-width com IA contextual via botões e modais
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
  Progress,
} from '@/components/ui';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  BarChart3,
  Calendar,
  Target,
  Zap,
  Clock,
  ArrowUp,
  ArrowDown,
  Download,
  Filter,
  Eye,
  Calculator,
  LineChart,
  Layers,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AIInsightBanner, AIActionButton, AIModal } from '@/components/ai';

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
    projectedROI: 280,
    costBreakdown: { llm: 45, infra: 25, dev: 20, ops: 10 },
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
    projectedROI: 120,
    costBreakdown: { llm: 50, infra: 20, dev: 20, ops: 10 },
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
    projectedROI: 180,
    costBreakdown: { llm: 40, infra: 30, dev: 20, ops: 10 },
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
    projectedROI: 25,
    costBreakdown: { llm: 55, infra: 20, dev: 15, ops: 10 },
  },
  {
    id: 5,
    name: 'Report Generator',
    investment: 120000,
    savings: 195000,
    roi: 63,
    roiTarget: 100,
    paybackMonths: 8,
    status: 'on_track',
    monthlyData: [18000, 28000, 32000, 38000, 42000, 37000],
    projectedROI: 140,
    costBreakdown: { llm: 35, infra: 25, dev: 25, ops: 15 },
  },
];

// Cost breakdown global
const costBreakdown = [
  { category: 'LLM APIs', value: 325000, percentage: 45, trend: 'up' },
  { category: 'Infraestrutura', value: 175000, percentage: 24, trend: 'stable' },
  { category: 'Desenvolvimento', value: 145000, percentage: 20, trend: 'down' },
  { category: 'Operações', value: 85000, percentage: 11, trend: 'stable' },
];

// Savings breakdown
const savingsBreakdown = [
  { category: 'Redução de Headcount', value: 600000, percentage: 48 },
  { category: 'Eficiência Operacional', value: 380000, percentage: 30 },
  { category: 'Redução de Erros', value: 150000, percentage: 12 },
  { category: 'Aumento de Receita', value: 125000, percentage: 10 },
];

const statusConfig = {
  exceeded: { label: 'Acima da Meta', color: 'text-status-success', badge: 'success' as const, icon: CheckCircle2 },
  on_track: { label: 'No Caminho', color: 'text-aimana-teal', badge: 'execute' as const, icon: TrendingUp },
  at_risk: { label: 'Em Risco', color: 'text-status-error', badge: 'error' as const, icon: AlertTriangle },
};

// AI Insights
const aiInsights = [
  {
    id: '1',
    type: 'warning' as const,
    title: 'ROI Negativo Detectado',
    description: 'Document Analyzer com ROI de -44%. Cenários de otimização disponíveis podem recuperar investimento.',
    action: {
      label: 'Ver Cenários',
      onClick: () => {},
    },
  },
  {
    id: '2',
    type: 'positive' as const,
    title: 'Customer Support Excedeu Meta',
    description: 'ROI de 220% (meta: 200%). Modelo pode ser replicado para outras áreas.',
  },
  {
    id: '3',
    type: 'suggestion' as const,
    title: 'Otimização de Custos LLM',
    description: 'Redução potencial de 18% nos custos LLM usando modelos menores para tarefas simples.',
  },
];

export function ROITracker() {
  const [statusFilter, setStatusFilter] = useState<'all' | 'exceeded' | 'on_track' | 'at_risk'>('all');
  const [showForecastModal, setShowForecastModal] = useState(false);
  const [showScenarioModal, setShowScenarioModal] = useState(false);
  const [selectedInitiative, setSelectedInitiative] = useState<typeof roiData[0] | null>(null);
  const [insightsDismissed, setInsightsDismissed] = useState<string[]>([]);

  const totalInvestment = roiData.reduce((acc, r) => acc + r.investment, 0);
  const totalSavings = roiData.reduce((acc, r) => acc + r.savings, 0);
  const globalROI = Math.round(((totalSavings - totalInvestment) / totalInvestment) * 100);
  const avgPayback = Math.round(roiData.filter(r => r.paybackMonths > 0).reduce((acc, r) => acc + r.paybackMonths, 0) / roiData.filter(r => r.paybackMonths > 0).length * 10) / 10;

  const exceededCount = roiData.filter(r => r.status === 'exceeded').length;
  const onTrackCount = roiData.filter(r => r.status === 'on_track').length;
  const atRiskCount = roiData.filter(r => r.status === 'at_risk').length;

  const filteredInitiatives = roiData.filter(
    (item) => statusFilter === 'all' || item.status === statusFilter
  );

  const handleAnalyze = (initiative: typeof roiData[0]) => {
    setSelectedInitiative(initiative);
    setShowScenarioModal(true);
  };

  const handleAIMessage = async (message: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (selectedInitiative?.status === 'at_risk') {
      return `**Análise do ${selectedInitiative.name}:**

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

Qual cenário deseja explorar?`;
    }

    return `Analisando "${message}" para ${selectedInitiative?.name || 'o portfólio'}...

**Projeção para os próximos 12 meses:**
- ROI esperado: ${selectedInitiative ? selectedInitiative.projectedROI : 156}%
- Economia adicional projetada: R$${selectedInitiative ? Math.round(selectedInitiative.savings * 0.5 / 1000) : 450}k

**Recomendações de otimização:**
1. Ajustar modelos LLM para tarefas específicas
2. Implementar cache de respostas frequentes
3. Automatizar monitoramento de custos`;
  };

  const visibleInsights = aiInsights.filter((i) => !insightsDismissed.includes(i.id));

  return (
    <div>
      <Header
        title="ROI Tracker"
        subtitle="Acompanhamento de retorno sobre investimento em IA"
      />

      <main className="p-6 space-y-6">
        {/* AI Insights Banner */}
        {visibleInsights.length > 0 && (
          <AIInsightBanner
            insights={visibleInsights}
            onDismiss={(id) => setInsightsDismissed((prev) => [...prev, id])}
          />
        )}

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">Investimento Total</p>
                  <p className="text-2xl font-bold text-text">R${(totalInvestment / 1000).toFixed(0)}k</p>
                  <p className="text-xs text-text-muted mt-1">{roiData.length} iniciativas</p>
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
                  <p className="text-xs text-status-success mt-1 flex items-center gap-1">
                    <ArrowUp className="h-3 w-3" />
                    +12% vs mês anterior
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-status-success-bg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-status-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={cn(
            globalROI >= 50 ? 'border-l-4 border-l-status-success' :
            globalROI >= 0 ? 'border-l-4 border-l-status-warning' :
            'border-l-4 border-l-status-error'
          )}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">ROI Global</p>
                  <p className={cn(
                    'text-2xl font-bold',
                    globalROI >= 0 ? 'text-status-success' : 'text-status-error'
                  )}>{globalROI}%</p>
                  <p className="text-xs text-text-muted mt-1">Meta: 100%</p>
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
                  <p className="text-2xl font-bold text-text">{avgPayback} meses</p>
                  <p className="text-xs text-text-muted mt-1">Target: 6 meses</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-phase-manage-bg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-phase-manage" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">Resultado Líquido</p>
                  <p className={cn(
                    'text-2xl font-bold',
                    totalSavings - totalInvestment >= 0 ? 'text-status-success' : 'text-status-error'
                  )}>R${((totalSavings - totalInvestment) / 1000).toFixed(0)}k</p>
                  <p className="text-xs text-text-muted mt-1">Economia - Investimento</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Layers className="h-5 w-5 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Filter Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card
            className={cn(
              "cursor-pointer transition-all hover:border-status-success",
              statusFilter === 'exceeded' && "ring-2 ring-status-success"
            )}
            onClick={() => setStatusFilter(statusFilter === 'exceeded' ? 'all' : 'exceeded')}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-status-success-bg flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-status-success" />
                  </div>
                  <div>
                    <p className="font-medium text-text">Acima da Meta</p>
                    <p className="text-xs text-text-muted">{exceededCount} iniciativas</p>
                  </div>
                </div>
                <Badge variant="success">{exceededCount}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card
            className={cn(
              "cursor-pointer transition-all hover:border-aimana-teal",
              statusFilter === 'on_track' && "ring-2 ring-aimana-teal"
            )}
            onClick={() => setStatusFilter(statusFilter === 'on_track' ? 'all' : 'on_track')}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-aimana-teal/20 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-aimana-teal" />
                  </div>
                  <div>
                    <p className="font-medium text-text">No Caminho</p>
                    <p className="text-xs text-text-muted">{onTrackCount} iniciativas</p>
                  </div>
                </div>
                <Badge variant="execute">{onTrackCount}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card
            className={cn(
              "cursor-pointer transition-all hover:border-status-error",
              statusFilter === 'at_risk' && "ring-2 ring-status-error"
            )}
            onClick={() => setStatusFilter(statusFilter === 'at_risk' ? 'all' : 'at_risk')}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-status-error-bg flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-status-error" />
                  </div>
                  <div>
                    <p className="font-medium text-text">Em Risco</p>
                    <p className="text-xs text-text-muted">{atRiskCount} iniciativas</p>
                  </div>
                </div>
                <Badge variant="error">{atRiskCount}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* ROI by Initiative - 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-text">ROI por Iniciativa</h2>
                {statusFilter !== 'all' && (
                  <Badge variant="outline" className="cursor-pointer" onClick={() => setStatusFilter('all')}>
                    {statusConfig[statusFilter].label}
                    <span className="ml-1">×</span>
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <AIActionButton
                  label="Previsão IA"
                  action="analyze"
                  onClick={() => {
                    setSelectedInitiative(null);
                    setShowForecastModal(true);
                  }}
                  variant="outline"
                  size="sm"
                />
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Exportar
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredInitiatives.map((item) => {
                const status = statusConfig[item.status as keyof typeof statusConfig];
                const roiProgress = Math.min(100, Math.max(0, (item.roi / item.roiTarget) * 100));
                const StatusIcon = status.icon;

                return (
                  <Card key={item.id} variant="interactive">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            'h-10 w-10 rounded-lg flex items-center justify-center',
                            item.status === 'exceeded' && 'bg-status-success-bg',
                            item.status === 'on_track' && 'bg-aimana-teal/20',
                            item.status === 'at_risk' && 'bg-status-error-bg'
                          )}>
                            <StatusIcon className={cn('h-5 w-5', status.color)} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-text">{item.name}</h3>
                            <Badge variant={status.badge} size="sm">{status.label}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={cn(
                            'text-2xl font-bold',
                            item.roi >= 0 ? 'text-status-success' : 'text-status-error'
                          )}>{item.roi > 0 ? '+' : ''}{item.roi}%</p>
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

                      <div className="grid grid-cols-4 gap-3 text-center mb-4">
                        <div className="p-2 rounded-lg bg-surface-light">
                          <p className="text-sm font-medium text-text">R${(item.investment / 1000).toFixed(0)}k</p>
                          <p className="text-[10px] text-text-muted">Investido</p>
                        </div>
                        <div className="p-2 rounded-lg bg-surface-light">
                          <p className="text-sm font-medium text-status-success">R${(item.savings / 1000).toFixed(0)}k</p>
                          <p className="text-[10px] text-text-muted">Economia</p>
                        </div>
                        <div className="p-2 rounded-lg bg-surface-light">
                          <p className="text-sm font-medium text-text">
                            {item.paybackMonths > 0 ? `${item.paybackMonths}m` : 'N/A'}
                          </p>
                          <p className="text-[10px] text-text-muted">Payback</p>
                        </div>
                        <div className="p-2 rounded-lg bg-surface-light">
                          <p className={cn(
                            'text-sm font-medium',
                            item.projectedROI > item.roi ? 'text-status-success' : 'text-status-warning'
                          )}>{item.projectedROI}%</p>
                          <p className="text-[10px] text-text-muted">Projetado</p>
                        </div>
                      </div>

                      {/* Mini chart */}
                      <div className="flex items-end justify-between h-10 gap-1 mb-3">
                        {item.monthlyData.map((value, idx) => {
                          const maxValue = Math.max(...item.monthlyData);
                          const height = (value / maxValue) * 100;
                          return (
                            <div
                              key={idx}
                              className={cn(
                                'flex-1 rounded-t transition-all hover:opacity-80',
                                item.roi >= 0 ? 'bg-status-success/60' : 'bg-status-error/60'
                              )}
                              style={{ height: `${height}%` }}
                            />
                          );
                        })}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-3 border-t border-surface-border">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          Detalhes
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <LineChart className="h-3 w-3 mr-1" />
                          Histórico
                        </Button>
                        <AIActionButton
                          label={item.status === 'at_risk' ? 'Cenários' : 'Analisar'}
                          action="analyze"
                          onClick={() => handleAnalyze(item)}
                          variant={item.status === 'at_risk' ? 'default' : 'outline'}
                          size="sm"
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cost Breakdown */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <PieChart className="h-4 w-4 text-status-warning" />
                    Custos por Categoria
                  </CardTitle>
                  <span className="text-sm font-bold text-text">
                    R${(costBreakdown.reduce((a, b) => a + b.value, 0) / 1000).toFixed(0)}k
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {costBreakdown.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-text">{item.category}</span>
                        {item.trend === 'up' && <ArrowUp className="h-3 w-3 text-status-error" />}
                        {item.trend === 'down' && <ArrowDown className="h-3 w-3 text-status-success" />}
                      </div>
                      <span className="text-sm font-medium text-text">R${(item.value / 1000).toFixed(0)}k</span>
                    </div>
                    <Progress value={item.percentage} size="sm" variant="warning" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Savings Breakdown */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-status-success" />
                    Economia por Tipo
                  </CardTitle>
                  <span className="text-sm font-bold text-status-success">
                    R${(totalSavings / 1000).toFixed(0)}k
                  </span>
                </div>
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

            {/* Quick Actions */}
            <Card className="bg-gradient-header text-white">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Análises Rápidas
                </h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-white/30 text-white hover:bg-white/10 justify-start"
                    onClick={() => setShowForecastModal(true)}
                  >
                    <LineChart className="h-4 w-4 mr-2" />
                    Projeção 12 Meses
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-white/30 text-white hover:bg-white/10 justify-start"
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Simular Cenário
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-white/30 text-white hover:bg-white/10 justify-start"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Relatório Executivo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* AI Forecast Modal */}
      <AIModal
        title="Previsão de ROI"
        description="Projeções e análises financeiras do portfólio"
        isOpen={showForecastModal}
        onClose={() => setShowForecastModal(false)}
        agentName="ROIAgent"
        agentDescription="Especialista em análise financeira e projeções de ROI"
        initialMessage={`**Resumo Financeiro do Portfólio:**

**Totais Atuais:**
• Investimento: R$${(totalInvestment / 1000).toFixed(0)}k
• Economia gerada: R$${(totalSavings / 1000).toFixed(0)}k
• ROI Global: **${globalROI}%**

**Projeção 12 meses:**
• ROI esperado: 156% (+${156 - globalROI}pp vs atual)
• Economia adicional: ~R$450k

**Destaques:**
✅ Customer Support: ROI de 220%
⚠️ Document Analyzer: ROI negativo (-44%)

Como posso ajudar na análise?`}
        suggestedPrompts={[
          'Projeção detalhada por iniciativa',
          'Cenários de otimização de custos',
          'Análise de tendências',
          'Recomendações de investimento',
        ]}
        onSendMessage={handleAIMessage}
      />

      {/* AI Scenario Modal */}
      <AIModal
        title={selectedInitiative ? `Análise: ${selectedInitiative.name}` : 'Análise de Cenários'}
        description={selectedInitiative?.status === 'at_risk'
          ? 'Cenários de recuperação e otimização'
          : 'Análise detalhada de ROI e projeções'
        }
        isOpen={showScenarioModal}
        onClose={() => {
          setShowScenarioModal(false);
          setSelectedInitiative(null);
        }}
        agentName="ROIAgent"
        agentDescription="Especialista em análise financeira e projeções de ROI"
        initialMessage={selectedInitiative
          ? `Analisando **${selectedInitiative.name}**...

**Status atual:** ${statusConfig[selectedInitiative.status as keyof typeof statusConfig].label}
**ROI atual:** ${selectedInitiative.roi}% (meta: ${selectedInitiative.roiTarget}%)
**Investimento:** R$${(selectedInitiative.investment / 1000).toFixed(0)}k
**Economia:** R$${(selectedInitiative.savings / 1000).toFixed(0)}k

${selectedInitiative.status === 'at_risk'
  ? '⚠️ Esta iniciativa está em risco. Posso analisar cenários de recuperação.'
  : selectedInitiative.status === 'exceeded'
  ? '✅ Esta iniciativa superou a meta! Posso identificar fatores de sucesso para replicação.'
  : '📈 Esta iniciativa está no caminho certo. Posso projetar cenários de aceleração.'}

O que você gostaria de analisar?`
          : 'Selecione uma iniciativa para análise detalhada.'
        }
        suggestedPrompts={selectedInitiative?.status === 'at_risk' ? [
          'Analisar causa do ROI negativo',
          'Cenários de recuperação',
          'Simular descontinuação',
          'Opções de pivot',
        ] : [
          'Fatores de sucesso',
          'Projeção de crescimento',
          'Oportunidades de escala',
          'Análise de custos',
        ]}
        onSendMessage={handleAIMessage}
      />
    </div>
  );
}
