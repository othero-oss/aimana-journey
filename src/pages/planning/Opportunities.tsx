/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Opportunities Page
 * Reestruturado: Abas separando Mapa de Oportunidades de Agente de Descoberta
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
  TabsContent,
} from '@/components/ui';
import { AIInsightBanner, AIActionButton } from '@/components/ai';
import {
  Lightbulb,
  TrendingUp,
  Clock,
  Users,
  Zap,
  Filter,
  Plus,
  Bot,
  Send,
  BarChart3,
  Target,
  Search,
  Grid3X3,
  List,
  Download,
  ArrowRight,
  Sparkles,
  Upload,
  FileText,
  Building2,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Brain,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock opportunities data with AI exposure score
const opportunities = [
  {
    id: 1,
    title: 'Automação de Triagem de E-mails',
    description: 'Usar IA para classificar e rotear e-mails automaticamente para as equipes corretas',
    area: 'Comercial',
    position: 'Assistente Comercial',
    impact: 'high',
    effort: 'low',
    score: 92,
    aiExposure: 78,
    hoursPerMonth: 120,
    tasks: [
      { name: 'Leitura de e-mails', classification: 'Automação', aiReady: true },
      { name: 'Classificação', classification: 'Automação', aiReady: true },
      { name: 'Encaminhamento', classification: 'Automação', aiReady: true },
    ],
    status: 'prioritized',
    track: 'Ready-made',
  },
  {
    id: 2,
    title: 'Geração de Relatórios Financeiros',
    description: 'Automatizar a criação de relatórios mensais com análise de variações',
    area: 'Financeiro',
    position: 'Analista Financeiro',
    impact: 'high',
    effort: 'medium',
    score: 85,
    aiExposure: 65,
    hoursPerMonth: 80,
    tasks: [
      { name: 'Coleta de dados', classification: 'Automação', aiReady: true },
      { name: 'Análise de variações', classification: 'Aumento', aiReady: true },
      { name: 'Formatação', classification: 'Automação', aiReady: true },
      { name: 'Distribuição', classification: 'Automação', aiReady: true },
    ],
    status: 'prioritized',
    track: 'Champion-built',
  },
  {
    id: 3,
    title: 'Chatbot de Atendimento ao Cliente',
    description: 'Implementar assistente virtual para dúvidas frequentes de clientes',
    area: 'Customer Success',
    position: 'Analista de Suporte',
    impact: 'high',
    effort: 'high',
    score: 78,
    aiExposure: 72,
    hoursPerMonth: 200,
    tasks: [
      { name: 'Responder FAQs', classification: 'Automação', aiReady: true },
      { name: 'Escalar tickets', classification: 'Aumento', aiReady: true },
      { name: 'Coletar feedback', classification: 'Automação', aiReady: true },
    ],
    status: 'analyzing',
    track: 'Coder-built',
  },
  {
    id: 4,
    title: 'Análise de Contratos',
    description: 'Extrair cláusulas e riscos automaticamente de contratos',
    area: 'Jurídico',
    position: 'Analista Jurídico',
    impact: 'medium',
    effort: 'medium',
    score: 72,
    aiExposure: 58,
    hoursPerMonth: 40,
    tasks: [
      { name: 'Leitura de PDFs', classification: 'Automação', aiReady: true },
      { name: 'Extração de cláusulas', classification: 'Aumento', aiReady: true },
      { name: 'Identificação de riscos', classification: 'Aumento', aiReady: false },
      { name: 'Parecer final', classification: 'Humano', aiReady: false },
    ],
    status: 'backlog',
    track: 'Coder-built',
  },
  {
    id: 5,
    title: 'Previsão de Demanda',
    description: 'Usar ML para prever demanda de produtos e otimizar estoque',
    area: 'Operações',
    position: 'Analista de Supply Chain',
    impact: 'high',
    effort: 'high',
    score: 68,
    aiExposure: 45,
    hoursPerMonth: 60,
    tasks: [
      { name: 'Análise histórica', classification: 'Aumento', aiReady: true },
      { name: 'Modelagem preditiva', classification: 'Automação', aiReady: true },
      { name: 'Recomendações', classification: 'Aumento', aiReady: true },
      { name: 'Decisão de compra', classification: 'Humano', aiReady: false },
    ],
    status: 'backlog',
    track: 'Aimana Services',
  },
];

const impactConfig = {
  high: { label: 'Alto', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  medium: { label: 'Médio', color: 'text-amber-400', bg: 'bg-amber-500/20' },
  low: { label: 'Baixo', color: 'text-slate-400', bg: 'bg-slate-500/20' },
};

const effortConfig = {
  high: { label: 'Alto', color: 'text-red-400' },
  medium: { label: 'Médio', color: 'text-amber-400' },
  low: { label: 'Baixo', color: 'text-emerald-400' },
};

const statusConfig = {
  prioritized: { label: 'Priorizado', variant: 'success' as const },
  analyzing: { label: 'Em Análise', variant: 'info' as const },
  backlog: { label: 'Backlog', variant: 'pending' as const },
};

const trackConfig: Record<string, { color: string; bg: string }> = {
  'Self-Service': { color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  'Ready-made': { color: 'text-blue-400', bg: 'bg-blue-500/20' },
  'Champion-built': { color: 'text-purple-400', bg: 'bg-purple-500/20' },
  'Coder-built': { color: 'text-orange-400', bg: 'bg-orange-500/20' },
  'Aimana Services': { color: 'text-teal-400', bg: 'bg-teal-500/20' },
};

const classificationConfig = {
  'Automação': { color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  'Aumento': { color: 'text-blue-400', bg: 'bg-blue-500/20' },
  'Humano': { color: 'text-slate-400', bg: 'bg-slate-500/20' },
  'Descarte': { color: 'text-red-400', bg: 'bg-red-500/20' },
};

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export function Opportunities() {
  const [activeTab, setActiveTab] = useState('map');
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedOpp, setSelectedOpp] = useState<typeof opportunities[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Discovery Agent state
  const [discoveryMessages, setDiscoveryMessages] = useState<ChatMessage[]>([]);
  const [discoveryInput, setDiscoveryInput] = useState('');
  const [isDiscoveryLoading, setIsDiscoveryLoading] = useState(false);
  const [discoveryMode, setDiscoveryMode] = useState<'chat' | 'upload'>('chat');

  const tabs = [
    { id: 'map', label: 'Mapa de Oportunidades', icon: <Grid3X3 className="h-4 w-4" /> },
    { id: 'discovery', label: 'Agente de Descoberta', icon: <Search className="h-4 w-4" /> },
  ];

  const stats = {
    total: opportunities.length,
    prioritized: opportunities.filter((o) => o.status === 'prioritized').length,
    totalHours: opportunities.reduce((acc, o) => acc + o.hoursPerMonth, 0),
    avgAIExposure: Math.round(opportunities.reduce((acc, o) => acc + o.aiExposure, 0) / opportunities.length),
  };

  const insights = [
    {
      id: '1',
      type: 'positive' as const,
      title: '2 oportunidades com alto ROI identificadas',
      description: 'Automação de E-mails e Relatórios Financeiros podem economizar 200h/mês combinadas.',
      action: { label: 'Priorizar', onClick: () => setFilter('prioritized') },
    },
    {
      id: '2',
      type: 'suggestion' as const,
      title: 'Área Comercial com maior potencial',
      description: 'Score médio de exposição à IA de 78%. Considere expandir análise nesta área.',
    },
  ];

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesFilter = filter === 'all' || opp.status === filter;
    const matchesSearch = searchTerm === '' ||
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.area.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Quadrant calculation for matrix
  const getQuadrant = (impact: string, effort: string) => {
    if (impact === 'high' && effort === 'low') return 'quick-wins';
    if (impact === 'high' && (effort === 'medium' || effort === 'high')) return 'strategic';
    if (impact === 'medium' && effort === 'low') return 'quick-wins';
    if (impact === 'low') return 'low-priority';
    return 'evaluate';
  };

  const handleDiscoverySend = () => {
    if (!discoveryInput.trim()) return;

    setDiscoveryMessages((prev) => [...prev, { role: 'user', content: discoveryInput }]);
    setDiscoveryInput('');
    setIsDiscoveryLoading(true);

    setTimeout(() => {
      setDiscoveryMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Analisando as informações fornecidas sobre "${discoveryInput.slice(0, 30)}..."

**Análise de Cargos e Tarefas Identificadas:**

Com base nos dados, identifiquei as seguintes tarefas e classificações:

| Tarefa | Classificação | Tecnologia |
|--------|--------------|------------|
| Processamento de dados | Automação | RPA, Python |
| Análise de relatórios | Aumento | GPT, BI Tools |
| Tomada de decisão | Humano | - |
| Comunicação com stakeholders | Aumento | Copilots |

**Indicadores de Potencial de IA:**
- % Tarefas automatizáveis: 35%
- % Tarefas aumentáveis: 45%
- Índice de Transformabilidade: 72/100

**Oportunidades Priorizadas:**
1. **Automação de relatórios** - Impacto Alto, Esforço Baixo
2. **Copiloto para análise** - Impacto Alto, Esforço Médio

Deseja que eu detalhe alguma oportunidade ou continue a análise com mais cargos?`,
        },
      ]);
      setIsDiscoveryLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-navy-900">
      <Header
        title="Mapeamento de Oportunidades"
        subtitle="Identifique e priorize onde IA pode gerar valor"
      />

      <main className="p-6">
        {/* Tabs */}
        <div className="mb-6">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            variant="default"
          />
        </div>

        {/* Map Tab */}
        <TabsContent value="map" activeTab={activeTab}>
          <div className="space-y-6">
            {/* AI Insights Banner */}
            <AIInsightBanner insights={insights} onDismiss={() => {}} />

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Oportunidades</p>
                      <p className="text-3xl font-bold text-white">{stats.total}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-teal-500/20">
                      <Lightbulb className="h-6 w-6 text-teal-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Priorizadas</p>
                      <p className="text-3xl font-bold text-emerald-400">{stats.prioritized}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-500/20">
                      <Target className="h-6 w-6 text-emerald-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Horas/mês Potenciais</p>
                      <p className="text-3xl font-bold text-blue-400">{stats.totalHours}h</p>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-500/20">
                      <Clock className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Exposição IA Média</p>
                      <p className="text-3xl font-bold text-purple-400">{stats.avgAIExposure}%</p>
                    </div>
                    <div className="p-3 rounded-xl bg-purple-500/20">
                      <Brain className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left: Matrix + Filters */}
              <div className="space-y-4">
                {/* Impact x Effort Matrix */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Matriz Impacto x Esforço</CardTitle>
                    <CardDescription>Clique em um quadrante para filtrar</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-square border border-navy-700 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                        <button
                          className="border-r border-b border-navy-700 bg-emerald-500/10 hover:bg-emerald-500/20 flex flex-col items-center justify-center text-xs transition-colors p-2"
                          onClick={() => setFilter('prioritized')}
                        >
                          <Zap className="h-5 w-5 text-emerald-400 mb-1" />
                          <span className="text-emerald-400 font-medium">Quick Wins</span>
                          <span className="text-slate-500 text-[10px]">Alto impacto, baixo esforço</span>
                        </button>
                        <button
                          className="border-b border-navy-700 bg-blue-500/10 hover:bg-blue-500/20 flex flex-col items-center justify-center text-xs transition-colors p-2"
                          onClick={() => setFilter('analyzing')}
                        >
                          <Target className="h-5 w-5 text-blue-400 mb-1" />
                          <span className="text-blue-400 font-medium">Estratégicos</span>
                          <span className="text-slate-500 text-[10px]">Alto impacto, alto esforço</span>
                        </button>
                        <button
                          className="border-r border-navy-700 bg-slate-500/10 hover:bg-slate-500/20 flex flex-col items-center justify-center text-xs transition-colors p-2"
                          onClick={() => {}}
                        >
                          <span className="text-slate-400 font-medium">Baixa Prioridade</span>
                          <span className="text-slate-500 text-[10px]">Baixo impacto</span>
                        </button>
                        <button
                          className="bg-amber-500/10 hover:bg-amber-500/20 flex flex-col items-center justify-center text-xs transition-colors p-2"
                          onClick={() => setFilter('backlog')}
                        >
                          <AlertTriangle className="h-5 w-5 text-amber-400 mb-1" />
                          <span className="text-amber-400 font-medium">Avaliar</span>
                          <span className="text-slate-500 text-[10px]">Médio impacto, alto esforço</span>
                        </button>
                      </div>
                      {/* Opportunity dots */}
                      {opportunities.map((opp) => {
                        const x = opp.effort === 'low' ? 25 : opp.effort === 'medium' ? 50 : 75;
                        const y = opp.impact === 'high' ? 25 : opp.impact === 'medium' ? 50 : 75;
                        return (
                          <div
                            key={opp.id}
                            className="absolute w-3 h-3 rounded-full bg-teal-400 border-2 border-navy-900 cursor-pointer hover:scale-150 transition-transform z-10"
                            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                            title={opp.title}
                            onClick={() => setSelectedOpp(opp)}
                          />
                        );
                      })}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-slate-500">
                      <span>← Menor Esforço</span>
                      <span>Maior Esforço →</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Filters */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Filtros</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {['all', 'prioritized', 'analyzing', 'backlog'].map((status) => (
                        <Button
                          key={status}
                          variant={filter === status ? 'primary' : 'outline'}
                          size="sm"
                          onClick={() => setFilter(status)}
                        >
                          {status === 'all' ? 'Todas' : statusConfig[status as keyof typeof statusConfig]?.label}
                        </Button>
                      ))}
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Buscar por título ou área..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                  <AIActionButton
                    label="Sugerir Priorização"
                    action="suggest"
                    onClick={() => {}}
                    size="sm"
                    variant="outline"
                  />
                </div>
              </div>

              {/* Right: Opportunities List */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">
                    {filteredOpportunities.length} Oportunidades
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('list')}
                      className={cn(
                        'p-2 rounded-lg transition-colors',
                        viewMode === 'list' ? 'bg-navy-700 text-teal-400' : 'text-slate-400 hover:text-white'
                      )}
                    >
                      <List className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={cn(
                        'p-2 rounded-lg transition-colors',
                        viewMode === 'grid' ? 'bg-navy-700 text-teal-400' : 'text-slate-400 hover:text-white'
                      )}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Nova
                    </Button>
                  </div>
                </div>

                <div className={cn(
                  'space-y-4',
                  viewMode === 'grid' && 'grid grid-cols-2 gap-4 space-y-0'
                )}>
                  {filteredOpportunities.map((opp) => (
                    <Card
                      key={opp.id}
                      className={cn(
                        'cursor-pointer transition-all hover:border-teal-500/50',
                        selectedOpp?.id === opp.id && 'border-teal-500 ring-1 ring-teal-500/30'
                      )}
                      onClick={() => setSelectedOpp(opp)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-white">{opp.title}</h3>
                              <Badge variant={statusConfig[opp.status as keyof typeof statusConfig].variant}>
                                {statusConfig[opp.status as keyof typeof statusConfig].label}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-400 line-clamp-2">{opp.description}</p>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-2xl font-bold text-teal-400">{opp.score}</div>
                            <div className="text-xs text-slate-500">Score</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-sm mb-3">
                          <Badge variant="outline">{opp.area}</Badge>
                          <span className="flex items-center gap-1 text-slate-400">
                            <Briefcase className="h-3 w-3" />
                            {opp.position}
                          </span>
                        </div>

                        <div className="grid grid-cols-4 gap-2 text-xs">
                          <div className="p-2 bg-navy-800 rounded-lg text-center">
                            <p className={impactConfig[opp.impact as keyof typeof impactConfig].color}>
                              {impactConfig[opp.impact as keyof typeof impactConfig].label}
                            </p>
                            <p className="text-slate-500">Impacto</p>
                          </div>
                          <div className="p-2 bg-navy-800 rounded-lg text-center">
                            <p className={effortConfig[opp.effort as keyof typeof effortConfig].color}>
                              {effortConfig[opp.effort as keyof typeof effortConfig].label}
                            </p>
                            <p className="text-slate-500">Esforço</p>
                          </div>
                          <div className="p-2 bg-navy-800 rounded-lg text-center">
                            <p className="text-blue-400">{opp.hoursPerMonth}h</p>
                            <p className="text-slate-500">Horas/mês</p>
                          </div>
                          <div className="p-2 bg-navy-800 rounded-lg text-center">
                            <p className="text-purple-400">{opp.aiExposure}%</p>
                            <p className="text-slate-500">IA Exp.</p>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-navy-700">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-slate-500">Tarefas ({opp.tasks.length})</p>
                            <Badge variant="outline" size="sm" className={cn(trackConfig[opp.track]?.color)}>
                              {opp.track}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {opp.tasks.slice(0, 3).map((task, i) => (
                              <span
                                key={i}
                                className={cn(
                                  'inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs',
                                  classificationConfig[task.classification as keyof typeof classificationConfig]?.bg,
                                  classificationConfig[task.classification as keyof typeof classificationConfig]?.color
                                )}
                              >
                                {task.aiReady && <CheckCircle2 className="h-3 w-3" />}
                                {task.name}
                              </span>
                            ))}
                            {opp.tasks.length > 3 && (
                              <span className="text-xs text-slate-500">+{opp.tasks.length - 3}</span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Discovery Agent Tab */}
        <TabsContent value="discovery" activeTab={activeTab}>
          <div className="space-y-6">
            {/* Introduction */}
            <Card>
              <CardContent className="py-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-teal-500/20 to-purple-500/20 rounded-xl">
                    <Search className="h-6 w-6 text-teal-400" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-white mb-1">Agente de Descoberta de Oportunidades</h2>
                    <p className="text-slate-400">
                      Forneça informações sobre cargos, funções e processos da sua empresa.
                      O agente irá analisar e identificar oportunidades de aplicação de IA.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mode Selection */}
            <div className="grid gap-4 md:grid-cols-2">
              <button
                onClick={() => setDiscoveryMode('chat')}
                className={cn(
                  'p-4 rounded-xl border transition-all text-left',
                  discoveryMode === 'chat'
                    ? 'border-teal-500 bg-teal-500/10'
                    : 'border-navy-700 bg-navy-800/50 hover:border-navy-600'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'p-2 rounded-lg',
                    discoveryMode === 'chat' ? 'bg-teal-500/20' : 'bg-navy-700'
                  )}>
                    <Bot className={cn(
                      'h-5 w-5',
                      discoveryMode === 'chat' ? 'text-teal-400' : 'text-slate-400'
                    )} />
                  </div>
                  <div>
                    <h4 className={cn(
                      'font-medium',
                      discoveryMode === 'chat' ? 'text-teal-400' : 'text-white'
                    )}>
                      Conversa com Agente
                    </h4>
                    <p className="text-sm text-slate-400">
                      Descreva cargos e processos em linguagem natural
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setDiscoveryMode('upload')}
                className={cn(
                  'p-4 rounded-xl border transition-all text-left',
                  discoveryMode === 'upload'
                    ? 'border-teal-500 bg-teal-500/10'
                    : 'border-navy-700 bg-navy-800/50 hover:border-navy-600'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'p-2 rounded-lg',
                    discoveryMode === 'upload' ? 'bg-teal-500/20' : 'bg-navy-700'
                  )}>
                    <Upload className={cn(
                      'h-5 w-5',
                      discoveryMode === 'upload' ? 'text-teal-400' : 'text-slate-400'
                    )} />
                  </div>
                  <div>
                    <h4 className={cn(
                      'font-medium',
                      discoveryMode === 'upload' ? 'text-teal-400' : 'text-white'
                    )}>
                      Upload de Documentos
                    </h4>
                    <p className="text-sm text-slate-400">
                      Envie organograma, job descriptions, processos
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Chat Mode */}
            {discoveryMode === 'chat' && (
              <Card className="h-[calc(100vh-450px)] flex flex-col">
                <CardHeader className="border-b border-navy-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-teal-500/20 to-purple-500/20 rounded-xl">
                      <Bot className="h-5 w-5 text-teal-400" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Opportunity Discovery Agent</CardTitle>
                      <CardDescription>
                        Especialista em mapeamento de oportunidades de IA
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {discoveryMessages.length === 0 && (
                    <div className="text-center py-8">
                      <Search className="h-12 w-12 text-teal-400/30 mx-auto mb-4" />
                      <p className="text-slate-400 mb-4">
                        Descreva os cargos, funções ou processos que deseja analisar.
                        Posso identificar tarefas automatizáveis e oportunidades de uso de IA.
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {[
                          'Analisar área Comercial',
                          'Mapear tarefas do RH',
                          'Avaliar processos do Financeiro',
                        ].map((prompt) => (
                          <button
                            key={prompt}
                            onClick={() => setDiscoveryInput(prompt)}
                            className="px-3 py-2 text-sm text-slate-300 bg-navy-800 hover:bg-navy-700 rounded-lg border border-navy-600"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {discoveryMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex',
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[85%] rounded-2xl px-4 py-3',
                          msg.role === 'user'
                            ? 'bg-blue-500/20 text-white'
                            : 'bg-navy-800 text-slate-200'
                        )}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}

                  {isDiscoveryLoading && (
                    <div className="flex justify-start">
                      <div className="bg-navy-800 rounded-2xl px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-teal-400 animate-pulse" />
                          <span className="text-sm text-slate-400">Analisando cargos e tarefas...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>

                <div className="border-t border-navy-700 p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Descreva cargos, áreas ou processos para análise..."
                      value={discoveryInput}
                      onChange={(e) => setDiscoveryInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleDiscoverySend()}
                      className="flex-1"
                    />
                    <Button onClick={handleDiscoverySend} disabled={!discoveryInput.trim() || isDiscoveryLoading}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Exemplo: "Analise o cargo de Analista Financeiro com foco em tarefas de fechamento mensal"
                  </p>
                </div>
              </Card>
            )}

            {/* Upload Mode */}
            {discoveryMode === 'upload' && (
              <Card>
                <CardContent className="py-8">
                  <div className="border-2 border-dashed border-navy-600 rounded-xl p-8 text-center hover:border-teal-500/50 transition-colors">
                    <Upload className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">
                      Arraste arquivos ou clique para upload
                    </h3>
                    <p className="text-sm text-slate-400 mb-4">
                      Aceita: PDF, Excel, Word, CSV (organogramas, job descriptions, processos)
                    </p>
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Selecionar Arquivos
                    </Button>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="p-4 bg-navy-800 rounded-lg">
                      <Building2 className="h-8 w-8 text-blue-400 mb-2" />
                      <h4 className="font-medium text-white">Organograma</h4>
                      <p className="text-sm text-slate-400">Estrutura organizacional</p>
                    </div>
                    <div className="p-4 bg-navy-800 rounded-lg">
                      <Briefcase className="h-8 w-8 text-purple-400 mb-2" />
                      <h4 className="font-medium text-white">Job Descriptions</h4>
                      <p className="text-sm text-slate-400">Descrições de cargos</p>
                    </div>
                    <div className="p-4 bg-navy-800 rounded-lg">
                      <Activity className="h-8 w-8 text-teal-400 mb-2" />
                      <h4 className="font-medium text-white">Processos</h4>
                      <p className="text-sm text-slate-400">Fluxos e workflows</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </main>
    </div>
  );
}
