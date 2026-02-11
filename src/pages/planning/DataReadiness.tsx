/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Data Readiness Page
 * Avaliação de prontidão de dados para IA
 * Layout com 2 abas: Resultados da Avaliação | Coletar Informações
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
import {
  Database,
  Server,
  Cloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  RefreshCw,
  Shield,
  Layers,
  GitBranch,
  Plus,
  Upload,
  Search,
  Eye,
  Download,
  Edit2,
  Sparkles,
  Link,
  Settings,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AIInsightBanner, AIActionButton, AIModal } from '@/components/ai';

// Data sources assessment
const dataSources = [
  {
    id: 1,
    name: 'PostgreSQL - CRM',
    type: 'database',
    icon: Database,
    quality: 85,
    completeness: 92,
    freshness: 95,
    accessibility: 70,
    overallScore: 85,
    status: 'ready',
    issues: ['Falta documentação de schemas'],
    lastScan: '2025-02-05 08:00',
    records: '2.5M',
    size: '15GB',
  },
  {
    id: 2,
    name: 'SQL Server - ERP',
    type: 'database',
    icon: Server,
    quality: 72,
    completeness: 88,
    freshness: 90,
    accessibility: 45,
    overallScore: 74,
    status: 'needs_work',
    issues: ['Acesso restrito', 'Silos de dados', 'Schemas não documentados'],
    lastScan: '2025-02-04 10:30',
    records: '8.2M',
    size: '45GB',
  },
  {
    id: 3,
    name: 'Salesforce',
    type: 'api',
    icon: Cloud,
    quality: 90,
    completeness: 85,
    freshness: 98,
    accessibility: 88,
    overallScore: 90,
    status: 'ready',
    issues: [],
    lastScan: '2025-02-05 09:00',
    records: '850K',
    size: 'API',
  },
  {
    id: 4,
    name: 'Planilhas Financeiras',
    type: 'spreadsheet',
    icon: FileSpreadsheet,
    quality: 45,
    completeness: 60,
    freshness: 40,
    accessibility: 30,
    overallScore: 44,
    status: 'not_ready',
    issues: ['Dados duplicados', 'Sem versionamento', 'Formato inconsistente', 'Acesso manual'],
    lastScan: '2025-02-03 14:00',
    records: '50K',
    size: '250MB',
  },
];

// Assessment dimensions
const dimensions = [
  { id: 'quality', name: 'Qualidade', description: 'Precisão e consistência dos dados', icon: CheckCircle2 },
  { id: 'completeness', name: 'Completude', description: 'Cobertura e preenchimento', icon: Layers },
  { id: 'freshness', name: 'Atualização', description: 'Frequência de atualização', icon: RefreshCw },
  { id: 'accessibility', name: 'Acessibilidade', description: 'Facilidade de acesso e integração', icon: Link },
];

const statusConfig = {
  ready: { label: 'Pronto', color: 'text-status-success', bg: 'bg-status-success-bg', badge: 'success' as const, icon: CheckCircle2 },
  needs_work: { label: 'Precisa Ajustes', color: 'text-status-warning', bg: 'bg-status-warning-bg', badge: 'warning' as const, icon: AlertTriangle },
  not_ready: { label: 'Não Pronto', color: 'text-status-error', bg: 'bg-status-error-bg', badge: 'error' as const, icon: XCircle },
};

// Recommendations
const recommendations = [
  {
    priority: 'high',
    title: 'Migrar Planilhas Financeiras',
    description: 'Estruturar dados em banco de dados para eliminar inconsistências',
    impact: '+20 pontos no score geral',
    effort: 'Alto',
    timeline: '4-6 semanas',
  },
  {
    priority: 'medium',
    title: 'Documentar Schemas do ERP',
    description: 'Criar data catalog com documentação completa dos schemas',
    impact: '+15 pontos em acessibilidade',
    effort: 'Médio',
    timeline: '2-3 semanas',
  },
  {
    priority: 'low',
    title: 'Adicionar Documentação CRM',
    description: 'Completar documentação de schemas do PostgreSQL',
    impact: '+5 pontos em qualidade',
    effort: 'Baixo',
    timeline: '1 semana',
  },
];

// AI Insights
const aiInsights = [
  {
    id: '1',
    type: 'warning' as const,
    title: 'Planilhas Bloqueiam Progresso',
    description: 'Score de 44/100 nas planilhas financeiras impacta 30% dos casos de uso planejados.',
    action: { label: 'Ver Plano de Migração', onClick: () => {} },
  },
  {
    id: '2',
    type: 'positive' as const,
    title: '2 Fontes Prontas para IA',
    description: 'PostgreSQL CRM e Salesforce podem ser usados imediatamente para pilotos.',
  },
  {
    id: '3',
    type: 'suggestion' as const,
    title: 'Conexão Direta Disponível',
    description: 'Detectamos que o SQL Server ERP tem API REST não documentada. Pode simplificar integração.',
  },
];

// Source types for collection
const sourceTypes = [
  { id: 'database', name: 'Banco de Dados', icon: Database, description: 'PostgreSQL, MySQL, SQL Server, etc.' },
  { id: 'api', name: 'API / SaaS', icon: Cloud, description: 'REST APIs, Salesforce, HubSpot, etc.' },
  { id: 'spreadsheet', name: 'Planilhas', icon: FileSpreadsheet, description: 'Excel, Google Sheets, CSV' },
  { id: 'datalake', name: 'Data Lake', icon: Layers, description: 'S3, Azure Blob, GCS' },
];

export function DataReadiness() {
  const [activeTab, setActiveTab] = useState('results');
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [showAddSourceModal, setShowAddSourceModal] = useState(false);
  const [selectedSource, setSelectedSource] = useState<typeof dataSources[0] | null>(null);
  const [insightsDismissed, setInsightsDismissed] = useState<string[]>([]);

  const overallScore = Math.round(
    dataSources.reduce((acc, ds) => acc + ds.overallScore, 0) / dataSources.length
  );

  const readyCount = dataSources.filter((ds) => ds.status === 'ready').length;
  const needsWorkCount = dataSources.filter((ds) => ds.status === 'needs_work').length;
  const notReadyCount = dataSources.filter((ds) => ds.status === 'not_ready').length;

  const visibleInsights = aiInsights.filter((i) => !insightsDismissed.includes(i.id));

  const tabs = [
    { id: 'results', label: 'Resultados da Avaliação', icon: <CheckCircle2 className="h-4 w-4" /> },
    { id: 'collect', label: 'Coletar Informações', icon: <Plus className="h-4 w-4" />, badge: dataSources.length.toString() },
  ];

  const handleAnalyzeSource = (source: typeof dataSources[0]) => {
    setSelectedSource(source);
    setShowAnalysisModal(true);
  };

  const handleAIMessage = async (message: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (selectedSource?.status === 'not_ready') {
      return `Analisando **${selectedSource.name}**...

**Diagnóstico:**
${selectedSource.issues.map(i => `- ${i}`).join('\n')}

**Plano de Migração Sugerido:**

**Fase 1 - Análise (1 semana):**
- Mapear estrutura atual das planilhas
- Identificar dependências e consumidores
- Definir schema do banco de destino

**Fase 2 - Migração (2-3 semanas):**
- Criar tabelas no PostgreSQL
- Desenvolver scripts de ETL
- Executar migração incremental

**Fase 3 - Validação (1 semana):**
- Comparar dados origem vs destino
- Testar integrações
- Treinar usuários

**Impacto esperado:** Score de 44 → 75`;
    }

    return `Analisando "${message}"...

**Resultado da análise:**

Para ${selectedSource?.name || 'suas fontes de dados'}:

${selectedSource ? `
**Score atual:** ${selectedSource.overallScore}/100
**Status:** ${statusConfig[selectedSource.status as keyof typeof statusConfig].label}

**Principais métricas:**
- Qualidade: ${selectedSource.quality}%
- Completude: ${selectedSource.completeness}%
- Atualização: ${selectedSource.freshness}%
- Acessibilidade: ${selectedSource.accessibility}%
` : ''}

Como posso ajudar a melhorar a prontidão dos dados?`;
  };

  return (
    <div>
      <Header
        title="Data Readiness"
        subtitle="Avalie a prontidão dos dados para iniciativas de IA"
      />

      <main className="p-6 space-y-6">
        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab: Results */}
        <TabsContent value="results" activeTab={activeTab}>
          {/* Overall Score Cards */}
          <div className="grid gap-4 md:grid-cols-5 mb-6">
            <Card className="md:col-span-1 border-l-4 border-l-aimana-teal">
              <CardContent className="p-4 text-center">
                <div className="relative mx-auto h-20 w-20 mb-2">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="12" className="text-surface-light" />
                    <circle
                      cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="12"
                      strokeDasharray={`${overallScore * 2.51} 251`} strokeLinecap="round"
                      className={cn(
                        overallScore >= 70 ? 'text-status-success' :
                        overallScore >= 50 ? 'text-status-warning' : 'text-status-error'
                      )}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-text">{overallScore}</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-text">Score Geral</p>
              </CardContent>
            </Card>

            {dimensions.map((dim) => {
              const avgScore = Math.round(
                dataSources.reduce((acc, ds) => acc + (ds[dim.id as keyof typeof ds] as number), 0) / dataSources.length
              );
              const DimIcon = dim.icon;
              return (
                <Card key={dim.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DimIcon className="h-4 w-4 text-text-muted" />
                      <span className="text-sm font-medium text-text">{dim.name}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={cn(
                        'text-2xl font-bold',
                        avgScore >= 70 ? 'text-status-success' :
                        avgScore >= 50 ? 'text-status-warning' : 'text-status-error'
                      )}>{avgScore}</span>
                      <span className="text-xs text-text-muted">/100</span>
                    </div>
                    <Progress value={avgScore} size="sm" variant={avgScore >= 70 ? 'success' : avgScore >= 50 ? 'warning' : 'error'} />
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Data Sources List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-semibold text-text">Fontes de Dados</h2>
                  <div className="flex items-center gap-2">
                    <Badge variant="success">{readyCount} prontas</Badge>
                    <Badge variant="warning">{needsWorkCount} ajustes</Badge>
                    <Badge variant="error">{notReadyCount} não prontas</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AIActionButton
                    label="Análise Completa"
                    action="analyze"
                    onClick={() => {
                      setSelectedSource(null);
                      setShowAnalysisModal(true);
                    }}
                    variant="outline"
                    size="sm"
                  />
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Reanalisar
                  </Button>
                </div>
              </div>

              {dataSources.map((source) => {
                const status = statusConfig[source.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;
                return (
                  <Card key={source.id} variant="interactive" className={cn(
                    'border-l-4',
                    source.status === 'ready' && 'border-l-status-success',
                    source.status === 'needs_work' && 'border-l-status-warning',
                    source.status === 'not_ready' && 'border-l-status-error'
                  )}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', status.bg)}>
                          <source.icon className={cn('h-6 w-6', status.color)} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-text">{source.name}</h3>
                              <Badge variant={status.badge} size="sm">
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {status.label}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <span className={cn(
                                'text-xl font-bold',
                                source.overallScore >= 70 ? 'text-status-success' :
                                source.overallScore >= 50 ? 'text-status-warning' : 'text-status-error'
                              )}>{source.overallScore}</span>
                              <span className="text-sm text-text-muted">/100</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-4 mb-3">
                            {dimensions.map((dim) => {
                              const score = source[dim.id as keyof typeof source] as number;
                              return (
                                <div key={dim.id}>
                                  <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-text-muted">{dim.name}</span>
                                    <span className="font-medium text-text">{score}</span>
                                  </div>
                                  <Progress value={score} size="sm" variant={score >= 70 ? 'success' : score >= 50 ? 'warning' : 'error'} />
                                </div>
                              );
                            })}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {source.issues.slice(0, 2).map((issue, i) => (
                                <Badge key={i} variant="outline" size="sm" className="text-status-warning">
                                  <AlertTriangle className="h-2.5 w-2.5 mr-1" />
                                  {issue}
                                </Badge>
                              ))}
                              {source.issues.length > 2 && (
                                <Badge variant="outline" size="sm">+{source.issues.length - 2}</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-text-muted">{source.records} registros • {source.size}</span>
                              <Button variant="ghost" size="sm" onClick={() => handleAnalyzeSource(source)}>
                                <Sparkles className="h-4 w-4 mr-1" />
                                Analisar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recommendations */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-status-warning" />
                    Recomendações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        'p-3 rounded-lg',
                        rec.priority === 'high' && 'bg-status-error-bg',
                        rec.priority === 'medium' && 'bg-status-warning-bg',
                        rec.priority === 'low' && 'bg-status-success-bg'
                      )}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-sm font-medium text-text">{rec.title}</h4>
                        <Badge
                          variant={rec.priority === 'high' ? 'error' : rec.priority === 'medium' ? 'warning' : 'success'}
                          size="sm"
                        >
                          {rec.priority === 'high' ? 'Alta' : rec.priority === 'medium' ? 'Média' : 'Baixa'}
                        </Badge>
                      </div>
                      <p className="text-xs text-text-secondary mb-2">{rec.description}</p>
                      <div className="flex items-center gap-3 text-xs text-text-muted">
                        <span>Impacto: {rec.impact}</span>
                        <span>•</span>
                        <span>{rec.timeline}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Architecture Preview */}
              <Card className="bg-gradient-header text-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <GitBranch className="h-5 w-5" />
                    <h3 className="font-semibold">Arquitetura Sugerida</h3>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm mb-3">
                    <div className="p-2 rounded bg-white/10 text-xs">Sources</div>
                    <ArrowRight className="h-3 w-3" />
                    <div className="p-2 rounded bg-white/10 text-xs">ETL</div>
                    <ArrowRight className="h-3 w-3" />
                    <div className="p-2 rounded bg-aimana-teal/30 text-xs">Lake</div>
                    <ArrowRight className="h-3 w-3" />
                    <div className="p-2 rounded bg-white/10 text-xs">AI</div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10">
                    <Eye className="h-4 w-4 mr-1" />
                    Ver Diagrama Completo
                  </Button>
                </CardContent>
              </Card>

              {/* Export */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Download className="h-4 w-4 text-text-muted" />
                    Exportar
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Relatório de Prontidão (PDF)
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Data Catalog (Excel)
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Tab: Collect Information */}
        <TabsContent value="collect" activeTab={activeTab}>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Add Source */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-aimana-teal" />
                    Adicionar Fonte de Dados
                  </CardTitle>
                  <CardDescription>Registre novas fontes para avaliação de prontidão</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {sourceTypes.map((type) => (
                      <Button
                        key={type.id}
                        variant="outline"
                        className="h-auto p-4 justify-start"
                        onClick={() => setShowAddSourceModal(true)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-surface-light flex items-center justify-center">
                            <type.icon className="h-5 w-5 text-aimana-navy" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium">{type.name}</p>
                            <p className="text-xs text-text-muted">{type.description}</p>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Existing Sources */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Fontes Registradas</CardTitle>
                      <CardDescription>{dataSources.length} fontes configuradas</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Verificar Conexões
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dataSources.map((source) => {
                      const status = statusConfig[source.status as keyof typeof statusConfig];
                      return (
                        <div key={source.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-light">
                          <div className="flex items-center gap-3">
                            <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', status.bg)}>
                              <source.icon className={cn('h-5 w-5', status.color)} />
                            </div>
                            <div>
                              <p className="font-medium text-text">{source.name}</p>
                              <div className="flex items-center gap-2 text-xs text-text-muted">
                                <span>{source.type}</span>
                                <span>•</span>
                                <span>Último scan: {source.lastScan}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={status.badge} size="sm">{status.label}</Badge>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Scan Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-aimana-teal" />
                    Opções de Análise
                  </CardTitle>
                  <CardDescription>Configure como a avaliação de dados é executada</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 rounded-lg bg-surface-light">
                      <div className="flex items-center gap-2 mb-2">
                        <RefreshCw className="h-4 w-4 text-aimana-teal" />
                        <span className="font-medium text-text">Scan Automático</span>
                      </div>
                      <p className="text-xs text-text-muted mb-3">Análise programada diariamente às 03:00</p>
                      <Badge variant="success" size="sm">Ativo</Badge>
                    </div>
                    <div className="p-4 rounded-lg bg-surface-light">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-aimana-teal" />
                        <span className="font-medium text-text">Detecção de PII</span>
                      </div>
                      <p className="text-xs text-text-muted mb-3">Identifica dados sensíveis automaticamente</p>
                      <Badge variant="success" size="sm">Ativo</Badge>
                    </div>
                    <div className="p-4 rounded-lg bg-surface-light">
                      <div className="flex items-center gap-2 mb-2">
                        <Layers className="h-4 w-4 text-text-muted" />
                        <span className="font-medium text-text">Profiling Avançado</span>
                      </div>
                      <p className="text-xs text-text-muted mb-3">Análise estatística detalhada</p>
                      <Badge variant="outline" size="sm">Desativado</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Add */}
              <Card className="bg-gradient-header text-white">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Importação Rápida
                  </h3>
                  <p className="text-sm text-white/80 mb-4">
                    Importe configurações de conexão existentes.
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10 justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Importar de CSV
                    </Button>
                    <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10 justify-start">
                      <GitBranch className="h-4 w-4 mr-2" />
                      Importar do dbt
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Help */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Ajuda</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-left">
                    <FileText className="h-4 w-4 mr-2 text-text-muted" />
                    <span>Como conectar um banco de dados?</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-left">
                    <FileText className="h-4 w-4 mr-2 text-text-muted" />
                    <span>Interpretar scores de qualidade</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-left">
                    <FileText className="h-4 w-4 mr-2 text-text-muted" />
                    <span>Configurar scan automático</span>
                  </Button>
                </CardContent>
              </Card>

              {/* AI Assistant */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-aimana-teal" />
                    Assistente de Dados
                  </h3>
                  <p className="text-sm text-text-muted mb-3">
                    Deixe a IA descobrir e mapear suas fontes automaticamente.
                  </p>
                  <AIActionButton
                    label="Descoberta Automática"
                    action="analyze"
                    onClick={() => {
                      setSelectedSource(null);
                      setShowAnalysisModal(true);
                    }}
                    variant="gradient"
                    size="sm"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* AI Insights Banner - No final da página */}
        {visibleInsights.length > 0 && (
          <AIInsightBanner
            insights={visibleInsights}
            onDismiss={(id) => setInsightsDismissed((prev) => [...prev, id])}
          />
        )}
      </main>

      {/* AI Analysis Modal */}
      <AIModal
        title={selectedSource ? `Análise: ${selectedSource.name}` : 'Análise de Prontidão'}
        description={selectedSource ? 'Diagnóstico detalhado da fonte de dados' : 'Análise completa de todas as fontes'}
        isOpen={showAnalysisModal}
        onClose={() => {
          setShowAnalysisModal(false);
          setSelectedSource(null);
        }}
        agentName="DataReadinessAgent"
        agentDescription="Especialista em qualidade e governança de dados"
        initialMessage={selectedSource
          ? `Analisando **${selectedSource.name}**...

**Score atual:** ${selectedSource.overallScore}/100
**Status:** ${statusConfig[selectedSource.status as keyof typeof statusConfig].label}

**Métricas detalhadas:**
- Qualidade: ${selectedSource.quality}%
- Completude: ${selectedSource.completeness}%
- Atualização: ${selectedSource.freshness}%
- Acessibilidade: ${selectedSource.accessibility}%

${selectedSource.issues.length > 0 ? `**Issues identificadas:**\n${selectedSource.issues.map(i => `- ${i}`).join('\n')}\n\n` : ''}Como posso ajudar?`
          : `**Resumo de Prontidão de Dados:**

**Score Geral:** ${overallScore}/100

**Status das fontes:**
✅ ${readyCount} prontas para IA
⚠️ ${needsWorkCount} precisam de ajustes
❌ ${notReadyCount} não prontas

**Principais barreiras:**
1. Acessibilidade das planilhas (30/100)
2. Silos de dados no ERP
3. Falta de documentação

Como posso ajudar a melhorar a prontidão?`
        }
        suggestedPrompts={selectedSource ? [
          'Criar plano de melhoria',
          'Detalhar issues encontradas',
          'Sugerir arquitetura ideal',
          'Estimar esforço de correção',
        ] : [
          'Analisar fonte específica',
          'Priorizar correções',
          'Gerar relatório executivo',
          'Plano de ação completo',
        ]}
        onSendMessage={handleAIMessage}
      />

      {/* Add Source Modal */}
      <AIModal
        title="Adicionar Fonte de Dados"
        description="Configure uma nova fonte para avaliação"
        isOpen={showAddSourceModal}
        onClose={() => setShowAddSourceModal(false)}
        agentName="DataReadinessAgent"
        agentDescription="Assistente de configuração de fontes de dados"
        initialMessage={`Vou ajudá-lo a configurar uma nova fonte de dados.

**Informações necessárias:**
1. Tipo da fonte (banco, API, planilha, etc.)
2. Credenciais de acesso
3. Escopo do scan (tabelas/endpoints específicos)

**Opções de configuração:**
• Conexão direta (recomendado)
• Importação manual de metadados
• Descoberta automática

Qual tipo de fonte deseja adicionar?`}
        suggestedPrompts={[
          'Banco de dados PostgreSQL',
          'API REST',
          'Planilhas Excel',
          'Data Lake S3',
        ]}
        onSendMessage={handleAIMessage}
      />
    </div>
  );
}
