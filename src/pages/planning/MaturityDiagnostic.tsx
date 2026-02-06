/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Maturity Diagnostic Page
 * Reestruturado: Abas separando Resultados de Aplicação do Diagnóstico
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
  Tabs,
  TabsContent,
} from '@/components/ui';
import { AIInsightBanner, AIActionButton } from '@/components/ai';
import {
  Target,
  Users,
  Database,
  Shield,
  Cpu,
  GraduationCap,
  Send,
  Bot,
  Download,
  TrendingUp,
  TrendingDown,
  BarChart3,
  CheckCircle2,
  Circle,
  ChevronRight,
  FileText,
  Calendar,
  Building2,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  Lightbulb,
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
    benchmark: 62,
    trend: 'up' as const,
    trendValue: 8,
    recommendations: [
      'Definir roadmap de IA alinhado aos objetivos de negócio',
      'Estabelecer KPIs claros para iniciativas de IA',
      'Comunicar visão de IA para toda organização',
    ],
  },
  {
    id: 'data',
    name: 'Dados & Infraestrutura',
    score: 35,
    maxScore: 100,
    icon: Database,
    description: 'Qualidade e acessibilidade dos dados',
    benchmark: 58,
    trend: 'down' as const,
    trendValue: 3,
    recommendations: [
      'Implementar Data Catalog centralizado',
      'Definir data owners por domínio',
      'Criar pipelines de qualidade de dados',
    ],
  },
  {
    id: 'talent',
    name: 'Talentos & Skills',
    score: 40,
    maxScore: 100,
    icon: GraduationCap,
    description: 'Capacitação e cultura de IA',
    benchmark: 55,
    trend: 'up' as const,
    trendValue: 12,
    recommendations: [
      'Desenvolver programa de capacitação em IA',
      'Identificar e formar AI Champions',
      'Criar trilhas de aprendizado por perfil',
    ],
  },
  {
    id: 'governance',
    name: 'Governança & Ética',
    score: 30,
    maxScore: 100,
    icon: Shield,
    description: 'Políticas e controles de IA',
    benchmark: 48,
    trend: 'neutral' as const,
    trendValue: 0,
    recommendations: [
      'Definir políticas de uso responsável de IA',
      'Implementar framework de governança',
      'Estabelecer comitê de ética em IA',
    ],
  },
  {
    id: 'technology',
    name: 'Tecnologia & Ferramentas',
    score: 50,
    maxScore: 100,
    icon: Cpu,
    description: 'Stack tecnológico e ferramentas',
    benchmark: 60,
    trend: 'up' as const,
    trendValue: 5,
    recommendations: [
      'Avaliar e selecionar plataforma de MLOps',
      'Padronizar stack de desenvolvimento',
      'Implementar ambiente sandbox',
    ],
  },
  {
    id: 'adoption',
    name: 'Adoção & Escala',
    score: 25,
    maxScore: 100,
    icon: Users,
    description: 'Uso e escala de soluções de IA',
    benchmark: 45,
    trend: 'up' as const,
    trendValue: 15,
    recommendations: [
      'Criar programa de change management',
      'Desenvolver casos de uso piloto',
      'Medir e comunicar resultados de IA',
    ],
  },
];

const overallScore = Math.round(
  dimensions.reduce((acc, d) => acc + d.score, 0) / dimensions.length
);

const getScoreColor = (score: number) => {
  if (score >= 70) return 'text-emerald-400';
  if (score >= 40) return 'text-amber-400';
  return 'text-red-400';
};

const getScoreColorBg = (score: number) => {
  if (score >= 70) return 'bg-emerald-500';
  if (score >= 40) return 'bg-amber-500';
  return 'bg-red-500';
};

const getScoreLabel = (score: number) => {
  if (score >= 70) return 'Avançado';
  if (score >= 40) return 'Em Desenvolvimento';
  return 'Inicial';
};

// Diagnostic questions by dimension
const diagnosticQuestions = [
  {
    dimension: 'strategy',
    dimensionName: 'Estratégia & Visão',
    questions: [
      { id: 'q1', text: 'A empresa possui uma visão documentada de IA?', options: ['Não', 'Em elaboração', 'Sim, parcial', 'Sim, completa'] },
      { id: 'q2', text: 'Existe um roadmap de IA alinhado ao plano estratégico?', options: ['Não', 'Em elaboração', 'Sim, parcial', 'Sim, completo'] },
      { id: 'q3', text: 'A liderança está engajada com as iniciativas de IA?', options: ['Não', 'Pouco', 'Moderadamente', 'Muito'] },
    ],
  },
  {
    dimension: 'data',
    dimensionName: 'Dados & Infraestrutura',
    questions: [
      { id: 'q4', text: 'Os dados estão catalogados e documentados?', options: ['Não', 'Parcialmente', 'Maioria', 'Completamente'] },
      { id: 'q5', text: 'Existe governança de dados estabelecida?', options: ['Não', 'Iniciando', 'Parcial', 'Completa'] },
      { id: 'q6', text: 'A qualidade dos dados é monitorada?', options: ['Não', 'Ad-hoc', 'Parcialmente', 'Continuamente'] },
    ],
  },
  {
    dimension: 'talent',
    dimensionName: 'Talentos & Skills',
    questions: [
      { id: 'q7', text: 'A empresa possui profissionais com skills de IA?', options: ['Não', 'Poucos', 'Time dedicado', 'Múltiplos times'] },
      { id: 'q8', text: 'Existe programa de capacitação em IA?', options: ['Não', 'Planejando', 'Piloto', 'Implementado'] },
      { id: 'q9', text: 'A cultura de experimentação é incentivada?', options: ['Não', 'Pouco', 'Moderadamente', 'Muito'] },
    ],
  },
  {
    dimension: 'governance',
    dimensionName: 'Governança & Ética',
    questions: [
      { id: 'q10', text: 'Existem políticas de uso responsável de IA?', options: ['Não', 'Em elaboração', 'Parciais', 'Completas'] },
      { id: 'q11', text: 'Há comitê ou fórum de governança de IA?', options: ['Não', 'Planejando', 'Informal', 'Formal'] },
      { id: 'q12', text: 'Os riscos de IA são avaliados sistematicamente?', options: ['Não', 'Ad-hoc', 'Parcialmente', 'Sempre'] },
    ],
  },
  {
    dimension: 'technology',
    dimensionName: 'Tecnologia & Ferramentas',
    questions: [
      { id: 'q13', text: 'A empresa possui infraestrutura para IA?', options: ['Não', 'Básica', 'Intermediária', 'Avançada'] },
      { id: 'q14', text: 'Existem ferramentas de MLOps implementadas?', options: ['Não', 'Iniciando', 'Parciais', 'Completas'] },
      { id: 'q15', text: 'Há ambiente sandbox para experimentação?', options: ['Não', 'Planejando', 'Limitado', 'Completo'] },
    ],
  },
  {
    dimension: 'adoption',
    dimensionName: 'Adoção & Escala',
    questions: [
      { id: 'q16', text: 'Quantos casos de uso de IA estão em produção?', options: ['Nenhum', '1-2', '3-5', '6+'] },
      { id: 'q17', text: 'Qual o nível de adoção de ferramentas de IA?', options: ['Baixo', 'Moderado', 'Alto', 'Muito alto'] },
      { id: 'q18', text: 'Os resultados de IA são medidos e comunicados?', options: ['Não', 'Às vezes', 'Frequentemente', 'Sempre'] },
    ],
  },
];

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export function MaturityDiagnostic() {
  const [activeTab, setActiveTab] = useState('results');
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentDimensionIndex, setCurrentDimensionIndex] = useState(0);
  const [diagnosticMode, setDiagnosticMode] = useState<'form' | 'agent'>('form');
  const [agentMessages, setAgentMessages] = useState<ChatMessage[]>([]);
  const [agentInput, setAgentInput] = useState('');
  const [isAgentLoading, setIsAgentLoading] = useState(false);

  const tabs = [
    { id: 'results', label: 'Resultados', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'apply', label: 'Aplicar Diagnóstico', icon: <FileText className="h-4 w-4" /> },
  ];

  const insights = [
    {
      id: '1',
      type: 'warning' as const,
      title: 'Dados & Infraestrutura abaixo do benchmark',
      description: 'Score de 35 está 23 pontos abaixo da média do mercado (58). Priorize ações nesta dimensão.',
      action: { label: 'Ver recomendações', onClick: () => setSelectedDimension('data') },
    },
    {
      id: '2',
      type: 'positive' as const,
      title: 'Adoção em crescimento acelerado',
      description: 'Aumento de 15 pontos na dimensão Adoção & Escala desde o último diagnóstico.',
    },
    {
      id: '3',
      type: 'suggestion' as const,
      title: 'Governança precisa de atenção',
      description: 'Score de 30 pode gerar riscos. Considere priorizar políticas de uso responsável.',
      action: { label: 'Plano de ação', onClick: () => setSelectedDimension('governance') },
    },
  ];

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const currentDimension = diagnosticQuestions[currentDimensionIndex];
  const currentQuestions = currentDimension?.questions || [];
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = diagnosticQuestions.reduce((acc, d) => acc + d.questions.length, 0);
  const progress = (answeredCount / totalQuestions) * 100;

  const handleAgentSend = () => {
    if (!agentInput.trim()) return;

    setAgentMessages((prev) => [...prev, { role: 'user', content: agentInput }]);
    setAgentInput('');
    setIsAgentLoading(true);

    setTimeout(() => {
      setAgentMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Entendi! Vou registrar sua resposta sobre "${agentInput.slice(0, 50)}..."\n\nBaseado no que você me disse, parece que sua empresa está em um estágio inicial nesta dimensão. Vou considerar isso na avaliação.\n\nPróxima pergunta: Como você descreveria o nível de documentação dos dados na sua organização?`,
        },
      ]);
      setIsAgentLoading(false);
    }, 1500);
  };

  const selectedDimensionData = dimensions.find((d) => d.id === selectedDimension);

  return (
    <div className="min-h-screen bg-navy-900">
      <Header
        title="Diagnóstico de Maturidade"
        subtitle="Avalie o nível de maturidade de IA da sua empresa"
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

        {/* Results Tab */}
        <TabsContent value="results" activeTab={activeTab}>
          <div className="space-y-6">
            {/* AI Insights Banner */}
            <AIInsightBanner insights={insights} onDismiss={() => {}} />

            {/* Top Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Score Geral</p>
                      <p className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                        {overallScore}
                        <span className="text-lg text-slate-500">/100</span>
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl ${getScoreColorBg(overallScore)}/20`}>
                      <BarChart3 className={`h-6 w-6 ${getScoreColor(overallScore)}`} />
                    </div>
                  </div>
                  <Badge className="mt-2" variant={overallScore >= 40 ? 'warning' : 'error'}>
                    {getScoreLabel(overallScore)}
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Benchmark Mercado</p>
                      <p className="text-3xl font-bold text-slate-200">54</p>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-500/20">
                      <Building2 className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">
                    {overallScore >= 54 ? (
                      <span className="text-emerald-400">+{overallScore - 54} acima</span>
                    ) : (
                      <span className="text-red-400">{overallScore - 54} abaixo</span>
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Último Diagnóstico</p>
                      <p className="text-3xl font-bold text-slate-200">15/01</p>
                    </div>
                    <div className="p-3 rounded-xl bg-purple-500/20">
                      <Calendar className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">21 dias atrás</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Evolução</p>
                      <p className="text-3xl font-bold text-emerald-400">+8</p>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-500/20">
                      <TrendingUp className="h-6 w-6 text-emerald-400" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">vs. último diagnóstico</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Dimensions Grid */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">Dimensões de Maturidade</h2>
                  <AIActionButton
                    label="Gerar Análise Completa"
                    action="analyze"
                    onClick={() => {}}
                    variant="outline"
                    size="sm"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {dimensions.map((dim) => (
                    <Card
                      key={dim.id}
                      className={`cursor-pointer transition-all hover:border-teal-500/50 ${
                        selectedDimension === dim.id ? 'border-teal-500 ring-1 ring-teal-500/30' : ''
                      }`}
                      onClick={() => setSelectedDimension(dim.id)}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${getScoreColorBg(dim.score)}/20`}>
                              <dim.icon className={`h-5 w-5 ${getScoreColor(dim.score)}`} />
                            </div>
                            <div>
                              <h3 className="font-medium text-white">{dim.name}</h3>
                              <p className="text-xs text-slate-400">{dim.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`text-2xl font-bold ${getScoreColor(dim.score)}`}>
                              {dim.score}
                            </span>
                            <div className="flex items-center gap-1 mt-1">
                              {dim.trend === 'up' && (
                                <TrendingUp className="h-3 w-3 text-emerald-400" />
                              )}
                              {dim.trend === 'down' && (
                                <TrendingDown className="h-3 w-3 text-red-400" />
                              )}
                              <span className={`text-xs ${
                                dim.trend === 'up' ? 'text-emerald-400' :
                                dim.trend === 'down' ? 'text-red-400' : 'text-slate-400'
                              }`}>
                                {dim.trend === 'up' ? '+' : dim.trend === 'down' ? '-' : ''}{dim.trendValue}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Score</span>
                            <span>Benchmark: {dim.benchmark}</span>
                          </div>
                          <div className="relative">
                            <Progress value={dim.score} size="sm" />
                            <div
                              className="absolute top-0 w-0.5 h-full bg-blue-400"
                              style={{ left: `${dim.benchmark}%` }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Dimension Detail / Recommendations */}
              <div className="space-y-4">
                {selectedDimensionData ? (
                  <>
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${getScoreColorBg(selectedDimensionData.score)}/20`}>
                            <selectedDimensionData.icon className={`h-5 w-5 ${getScoreColor(selectedDimensionData.score)}`} />
                          </div>
                          <div>
                            <CardTitle className="text-base">{selectedDimensionData.name}</CardTitle>
                            <CardDescription>{selectedDimensionData.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-navy-800 rounded-lg">
                            <p className="text-xs text-slate-400">Score Atual</p>
                            <p className={`text-2xl font-bold ${getScoreColor(selectedDimensionData.score)}`}>
                              {selectedDimensionData.score}
                            </p>
                          </div>
                          <div className="p-3 bg-navy-800 rounded-lg">
                            <p className="text-xs text-slate-400">Benchmark</p>
                            <p className="text-2xl font-bold text-blue-400">
                              {selectedDimensionData.benchmark}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-white mb-2">Gap Analysis</p>
                          <div className="p-3 bg-navy-800 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-slate-400">Distância do benchmark</span>
                              <span className={`text-sm font-medium ${
                                selectedDimensionData.score >= selectedDimensionData.benchmark
                                  ? 'text-emerald-400'
                                  : 'text-red-400'
                              }`}>
                                {selectedDimensionData.score >= selectedDimensionData.benchmark ? '+' : ''}
                                {selectedDimensionData.score - selectedDimensionData.benchmark} pts
                              </span>
                            </div>
                            <Progress
                              value={(selectedDimensionData.score / selectedDimensionData.benchmark) * 100}
                              size="sm"
                              variant={selectedDimensionData.score >= selectedDimensionData.benchmark ? 'success' : 'secondary'}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-amber-400" />
                          <CardTitle className="text-base">Recomendações</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {selectedDimensionData.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center">
                                <span className="text-xs text-teal-400">{index + 1}</span>
                              </div>
                              <span className="text-sm text-slate-300">{rec}</span>
                            </li>
                          ))}
                        </ul>
                        <Button variant="outline" className="w-full mt-4" size="sm">
                          <Sparkles className="h-4 w-4 mr-2" />
                          Gerar Plano de Ação
                        </Button>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <Card className="h-full flex items-center justify-center">
                    <CardContent className="text-center py-12">
                      <BarChart3 className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">
                        Selecione uma dimensão para ver detalhes e recomendações
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Export Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar PDF
                  </Button>
                  <Button variant="secondary" className="flex-1">
                    Histórico
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Apply Diagnostic Tab */}
        <TabsContent value="apply" activeTab={activeTab}>
          <div className="space-y-6">
            {/* Progress Header */}
            <Card>
              <CardContent className="py-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-500/20 rounded-lg">
                      <FileText className="h-5 w-5 text-teal-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Progresso do Diagnóstico</h3>
                      <p className="text-sm text-slate-400">
                        {answeredCount} de {totalQuestions} perguntas respondidas
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-teal-400">{Math.round(progress)}%</span>
                  </div>
                </div>
                <Progress value={progress} size="md" />
              </CardContent>
            </Card>

            {/* Mode Selection */}
            <div className="flex gap-4">
              <button
                onClick={() => setDiagnosticMode('form')}
                className={`flex-1 p-4 rounded-xl border transition-all ${
                  diagnosticMode === 'form'
                    ? 'border-teal-500 bg-teal-500/10'
                    : 'border-navy-700 bg-navy-800/50 hover:border-navy-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${diagnosticMode === 'form' ? 'bg-teal-500/20' : 'bg-navy-700'}`}>
                    <FileText className={`h-5 w-5 ${diagnosticMode === 'form' ? 'text-teal-400' : 'text-slate-400'}`} />
                  </div>
                  <div className="text-left">
                    <h4 className={`font-medium ${diagnosticMode === 'form' ? 'text-teal-400' : 'text-white'}`}>
                      Formulário Estruturado
                    </h4>
                    <p className="text-sm text-slate-400">Responda perguntas objetivas por dimensão</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setDiagnosticMode('agent')}
                className={`flex-1 p-4 rounded-xl border transition-all ${
                  diagnosticMode === 'agent'
                    ? 'border-teal-500 bg-teal-500/10'
                    : 'border-navy-700 bg-navy-800/50 hover:border-navy-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${diagnosticMode === 'agent' ? 'bg-teal-500/20' : 'bg-navy-700'}`}>
                    <Bot className={`h-5 w-5 ${diagnosticMode === 'agent' ? 'text-teal-400' : 'text-slate-400'}`} />
                  </div>
                  <div className="text-left">
                    <h4 className={`font-medium ${diagnosticMode === 'agent' ? 'text-teal-400' : 'text-white'}`}>
                      Conversa com Agente
                    </h4>
                    <p className="text-sm text-slate-400">Diagnóstico conversacional guiado por IA</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Form Mode */}
            {diagnosticMode === 'form' && (
              <div className="grid gap-6 lg:grid-cols-4">
                {/* Dimension Navigation */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Dimensões</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {diagnosticQuestions.map((dim, index) => {
                        const dimAnswers = dim.questions.filter((q) => answers[q.id] !== undefined).length;
                        const isComplete = dimAnswers === dim.questions.length;
                        const isCurrent = index === currentDimensionIndex;

                        return (
                          <button
                            key={dim.dimension}
                            onClick={() => setCurrentDimensionIndex(index)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                              isCurrent
                                ? 'bg-teal-500/20 border border-teal-500/30'
                                : 'bg-navy-800 hover:bg-navy-700'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {isComplete ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                              ) : dimAnswers > 0 ? (
                                <Circle className="h-4 w-4 text-amber-400" />
                              ) : (
                                <Circle className="h-4 w-4 text-slate-500" />
                              )}
                              <span className={`text-sm ${isCurrent ? 'text-teal-400' : 'text-slate-300'}`}>
                                {dim.dimensionName.split(' ')[0]}
                              </span>
                            </div>
                            <span className="text-xs text-slate-500">
                              {dimAnswers}/{dim.questions.length}
                            </span>
                          </button>
                        );
                      })}
                    </CardContent>
                  </Card>
                </div>

                {/* Questions */}
                <div className="lg:col-span-3">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{currentDimension?.dimensionName}</CardTitle>
                          <CardDescription>
                            Responda as perguntas sobre esta dimensão
                          </CardDescription>
                        </div>
                        <Badge variant="outline">
                          Dimensão {currentDimensionIndex + 1} de {diagnosticQuestions.length}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {currentQuestions.map((question, qIndex) => (
                        <div key={question.id} className="space-y-3">
                          <p className="font-medium text-white">
                            {qIndex + 1}. {question.text}
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {question.options.map((option, optIndex) => (
                              <button
                                key={optIndex}
                                onClick={() => handleAnswerChange(question.id, optIndex)}
                                className={`p-3 rounded-lg border text-sm transition-all ${
                                  answers[question.id] === optIndex
                                    ? 'border-teal-500 bg-teal-500/20 text-teal-400'
                                    : 'border-navy-700 bg-navy-800 text-slate-300 hover:border-navy-600'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}

                      <div className="flex justify-between pt-4 border-t border-navy-700">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentDimensionIndex(Math.max(0, currentDimensionIndex - 1))}
                          disabled={currentDimensionIndex === 0}
                        >
                          Anterior
                        </Button>
                        {currentDimensionIndex < diagnosticQuestions.length - 1 ? (
                          <Button
                            onClick={() => setCurrentDimensionIndex(currentDimensionIndex + 1)}
                          >
                            Próxima Dimensão
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        ) : (
                          <Button
                            className="bg-gradient-to-r from-teal-500 to-emerald-500"
                            onClick={() => setActiveTab('results')}
                          >
                            <Sparkles className="h-4 w-4 mr-2" />
                            Gerar Resultados
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Agent Mode */}
            {diagnosticMode === 'agent' && (
              <Card className="h-[calc(100vh-400px)] flex flex-col">
                <CardHeader className="border-b border-navy-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-teal-500/20 to-purple-500/20 rounded-xl">
                      <Bot className="h-5 w-5 text-teal-400" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Agente de Diagnóstico</CardTitle>
                      <CardDescription>
                        Converse naturalmente sobre a maturidade de IA da sua empresa
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {agentMessages.length === 0 && (
                    <div className="text-center py-8">
                      <Bot className="h-12 w-12 text-teal-400/30 mx-auto mb-4" />
                      <p className="text-slate-400 mb-4">
                        Olá! Vou guiá-lo através do diagnóstico de maturidade de IA.
                        Vamos conversar sobre como sua empresa utiliza IA hoje.
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {[
                          'Vamos começar o diagnóstico',
                          'O que será avaliado?',
                          'Quanto tempo leva?',
                        ].map((prompt) => (
                          <button
                            key={prompt}
                            onClick={() => setAgentInput(prompt)}
                            className="px-3 py-2 text-sm text-slate-300 bg-navy-800 hover:bg-navy-700 rounded-lg border border-navy-600"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {agentMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          msg.role === 'user'
                            ? 'bg-blue-500/20 text-white'
                            : 'bg-navy-800 text-slate-200'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}

                  {isAgentLoading && (
                    <div className="flex justify-start">
                      <div className="bg-navy-800 rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                          <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse delay-100" />
                          <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse delay-200" />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>

                <div className="border-t border-navy-700 p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Descreva a situação da sua empresa..."
                      value={agentInput}
                      onChange={(e) => setAgentInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAgentSend()}
                      className="flex-1"
                    />
                    <Button onClick={handleAgentSend} disabled={!agentInput.trim() || isAgentLoading}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </TabsContent>
      </main>
    </div>
  );
}
