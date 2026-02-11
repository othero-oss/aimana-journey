/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Governance & Stack Page
 * Governança de IA e definição de stack tecnológico
 *
 * REESTRUTURADO: Interface baseada em abas
 * - Aba 1: Políticas & Compliance - checklist de governança, riscos, auditoria
 * - Aba 2: Stack Tecnológico - recomendações, comparações, integrações
 * - Aba 3: Templates & Documentos - biblioteca de templates, gerador IA
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState } from 'react';
import { Header } from '@/components/layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AIInsightBanner, AIActionButton, AIModal } from '@/components/ai';
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
  Shield,
  Cloud,
  Lock,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  Settings,
  Database,
  Cpu,
  Network,
  FileText,
  Download,
  Sparkles,
  Eye,
  Plus,
  Search,
  Filter,
  Clock,
  Users,
  Activity,
  CheckSquare,
  XCircle,
  BarChart3,
  ArrowRight,
  ExternalLink,
  Copy,
  Edit3,
  Zap,
  Globe,
  Server,
  Box,
  Layers,
  RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// DADOS MOCK
// ============================================================================

// Governance checklist items expandido
const governanceItems = [
  {
    id: 1,
    category: 'Políticas',
    icon: FileCheck,
    color: 'text-phase-plan',
    items: [
      { name: 'Política de uso de IA', status: 'completed', priority: 'high', lastUpdated: '2024-01-10', owner: 'Legal' },
      { name: 'Diretrizes éticas', status: 'completed', priority: 'high', lastUpdated: '2024-01-05', owner: 'RH' },
      { name: 'Política de dados para IA', status: 'in_progress', priority: 'critical', lastUpdated: '2024-01-20', owner: 'DPO' },
      { name: 'Processo de aprovação de modelos', status: 'pending', priority: 'medium', lastUpdated: null, owner: 'TI' },
      { name: 'Política de viés e fairness', status: 'pending', priority: 'high', lastUpdated: null, owner: 'Legal' },
    ],
  },
  {
    id: 2,
    category: 'Segurança',
    icon: Shield,
    color: 'text-phase-execute',
    items: [
      { name: 'Classificação de dados', status: 'completed', priority: 'critical', lastUpdated: '2024-01-08', owner: 'Segurança' },
      { name: 'Controle de acesso a modelos', status: 'in_progress', priority: 'high', lastUpdated: '2024-01-18', owner: 'TI' },
      { name: 'Auditoria de uso', status: 'pending', priority: 'critical', lastUpdated: null, owner: 'Segurança' },
      { name: 'Proteção de PII', status: 'in_progress', priority: 'critical', lastUpdated: '2024-01-15', owner: 'DPO' },
      { name: 'Testes de segurança (red team)', status: 'pending', priority: 'high', lastUpdated: null, owner: 'Segurança' },
    ],
  },
  {
    id: 3,
    category: 'Compliance',
    icon: Lock,
    color: 'text-phase-manage',
    items: [
      { name: 'LGPD para IA', status: 'in_progress', priority: 'critical', lastUpdated: '2024-01-12', owner: 'DPO' },
      { name: 'Regulamentações setoriais', status: 'pending', priority: 'high', lastUpdated: null, owner: 'Legal' },
      { name: 'Documentação de modelos', status: 'pending', priority: 'medium', lastUpdated: null, owner: 'Data Science' },
      { name: 'Explainability requirements', status: 'pending', priority: 'medium', lastUpdated: null, owner: 'Data Science' },
      { name: 'Consentimento para IA', status: 'in_progress', priority: 'high', lastUpdated: '2024-01-19', owner: 'Legal' },
    ],
  },
];

// Riscos identificados
const riskItems = [
  {
    id: 1,
    title: 'Sem auditoria de uso',
    description: 'Não há rastreamento de chamadas a modelos de IA',
    severity: 'critical',
    category: 'Segurança',
    recommendation: 'Implementar logging centralizado de todas as chamadas',
  },
  {
    id: 2,
    title: 'Compliance LGPD incompleto',
    description: 'Política de dados para IA ainda em desenvolvimento',
    severity: 'high',
    category: 'Compliance',
    recommendation: 'Priorizar finalização com DPO',
  },
  {
    id: 3,
    title: 'Sem controle de viés',
    description: 'Modelos não são testados para fairness',
    severity: 'medium',
    category: 'Ética',
    recommendation: 'Implementar testes de viés antes de deploy',
  },
];

// Audit log
const auditLog = [
  { id: 1, action: 'Política atualizada', item: 'Política de uso de IA', user: 'Maria Silva', timestamp: '2024-01-20 14:30', type: 'update' },
  { id: 2, action: 'Status alterado', item: 'Proteção de PII', user: 'Carlos Santos', timestamp: '2024-01-20 10:15', type: 'status' },
  { id: 3, action: 'Documento aprovado', item: 'Diretrizes éticas', user: 'Ana Costa', timestamp: '2024-01-19 16:45', type: 'approval' },
  { id: 4, action: 'Novo controle criado', item: 'Consentimento para IA', user: 'Pedro Lima', timestamp: '2024-01-18 09:00', type: 'create' },
];

// Tech stack recommendations expandido
const stackRecommendations = [
  {
    id: 'foundation',
    name: 'Foundation Models',
    icon: Cpu,
    description: 'Modelos de linguagem base',
    current: null,
    options: [
      { name: 'Claude (Anthropic)', recommended: true, notes: 'Melhor raciocínio, mais seguro', pricing: '$15/1M tokens', features: ['200K context', 'Tool use', 'Vision'] },
      { name: 'GPT-4 (OpenAI)', recommended: false, notes: 'Versátil, ecossistema maduro', pricing: '$30/1M tokens', features: ['128K context', 'Tool use', 'Vision'] },
      { name: 'Gemini (Google)', recommended: false, notes: 'Multimodal nativo', pricing: '$7/1M tokens', features: ['1M context', 'Multimodal', 'Grounding'] },
      { name: 'Llama 3 (Meta)', recommended: false, notes: 'Open source, self-hosted', pricing: 'Self-hosted', features: ['8K-128K context', 'Customizável', 'Privacidade'] },
    ],
  },
  {
    id: 'orchestration',
    name: 'Orchestration',
    icon: Network,
    description: 'Framework de orquestração de agentes',
    current: null,
    options: [
      { name: 'LangChain', recommended: true, notes: 'Ecossistema rico, comunidade ativa', pricing: 'Open source', features: ['Chains', 'Agents', 'RAG'] },
      { name: 'LlamaIndex', recommended: false, notes: 'Especializado em RAG', pricing: 'Open source', features: ['Indexing', 'Query engines', 'Data connectors'] },
      { name: 'Semantic Kernel', recommended: false, notes: 'Microsoft ecosystem', pricing: 'Open source', features: ['Planners', 'Plugins', 'Memory'] },
      { name: 'Custom', recommended: false, notes: 'Máxima flexibilidade', pricing: 'Desenvolvimento', features: ['Controle total', 'Sem dependências', 'Performance'] },
    ],
  },
  {
    id: 'vector',
    name: 'Vector Store',
    icon: Database,
    description: 'Banco de dados vetorial para RAG',
    current: 'pgvector',
    options: [
      { name: 'Pinecone', recommended: true, notes: 'Managed, escalável, baixa latência', pricing: 'Starter free', features: ['Serverless', 'Metadata filtering', 'Namespaces'] },
      { name: 'Weaviate', recommended: false, notes: 'Open source, híbrido', pricing: 'Open source', features: ['Hybrid search', 'GraphQL', 'Modules'] },
      { name: 'Qdrant', recommended: false, notes: 'Performance, Rust-based', pricing: 'Open source', features: ['High performance', 'Filtering', 'Quantization'] },
      { name: 'pgvector', recommended: false, notes: 'Se já usa PostgreSQL', pricing: 'Extension', features: ['Familiar SQL', 'Transações', 'Integração existente'] },
    ],
  },
  {
    id: 'infra',
    name: 'Infraestrutura Cloud',
    icon: Cloud,
    description: 'Plataforma de hospedagem',
    current: 'AWS',
    options: [
      { name: 'AWS Bedrock', recommended: true, notes: 'Se já usa AWS, múltiplos modelos', pricing: 'Pay per use', features: ['Claude', 'Llama', 'Titan', 'Guardrails'] },
      { name: 'Azure OpenAI', recommended: false, notes: 'Se já usa Azure, compliance enterprise', pricing: 'Pay per use', features: ['GPT-4', 'DALL-E', 'Enterprise compliance'] },
      { name: 'GCP Vertex AI', recommended: false, notes: 'Se já usa GCP, MLOps integrado', pricing: 'Pay per use', features: ['Gemini', 'PaLM', 'Model Garden'] },
      { name: 'Multi-cloud', recommended: false, notes: 'Flexibilidade máxima', pricing: 'Variável', features: ['Vendor agnostic', 'Redundância', 'Best of breed'] },
    ],
  },
  {
    id: 'observability',
    name: 'Observabilidade',
    icon: Activity,
    description: 'Monitoramento e debugging de IA',
    current: null,
    options: [
      { name: 'LangSmith', recommended: true, notes: 'Integrado com LangChain', pricing: 'Free tier', features: ['Tracing', 'Evaluation', 'Playground'] },
      { name: 'Weights & Biases', recommended: false, notes: 'MLOps completo', pricing: 'Free tier', features: ['Experiment tracking', 'Prompts', 'Datasets'] },
      { name: 'Datadog LLM', recommended: false, notes: 'Se já usa Datadog', pricing: 'Add-on', features: ['Unified observability', 'APM integration', 'Cost tracking'] },
      { name: 'OpenLLMetry', recommended: false, notes: 'Open source, OpenTelemetry', pricing: 'Open source', features: ['Vendor agnostic', 'OTel native', 'Self-hosted'] },
    ],
  },
];

// Templates de documentos
const documentTemplates = [
  {
    id: 1,
    name: 'Política de Uso de IA',
    description: 'Template completo para política corporativa de uso de IA',
    category: 'Política',
    pages: 12,
    lastUpdated: '2024-01',
    downloads: 234,
    status: 'available',
  },
  {
    id: 2,
    name: 'Framework de Governança de IA',
    description: 'Estrutura completa de governança incluindo papéis e responsabilidades',
    category: 'Governança',
    pages: 25,
    lastUpdated: '2024-01',
    downloads: 189,
    status: 'available',
  },
  {
    id: 3,
    name: 'Checklist LGPD para IA',
    description: 'Lista de verificação de conformidade LGPD para projetos de IA',
    category: 'Compliance',
    pages: 8,
    lastUpdated: '2024-01',
    downloads: 312,
    status: 'available',
  },
  {
    id: 4,
    name: 'Model Card Template',
    description: 'Template para documentação de modelos de IA',
    category: 'Documentação',
    pages: 5,
    lastUpdated: '2023-12',
    downloads: 145,
    status: 'available',
  },
  {
    id: 5,
    name: 'Avaliação de Risco de IA',
    description: 'Framework para avaliação de riscos em projetos de IA',
    category: 'Risco',
    pages: 15,
    lastUpdated: '2024-01',
    downloads: 178,
    status: 'available',
  },
  {
    id: 6,
    name: 'Guia de Ética em IA',
    description: 'Diretrizes éticas para desenvolvimento e uso de IA',
    category: 'Ética',
    pages: 18,
    lastUpdated: '2023-12',
    downloads: 201,
    status: 'available',
  },
];

// Documentos gerados pela empresa
const companyDocuments = [
  { id: 1, name: 'Política de Uso de IA - Empresa ABC', status: 'approved', version: '2.0', date: '2024-01-10' },
  { id: 2, name: 'Diretrizes Éticas de IA', status: 'approved', version: '1.0', date: '2024-01-05' },
  { id: 3, name: 'Política de Dados para IA', status: 'draft', version: '0.3', date: '2024-01-20' },
];

const statusConfig = {
  completed: { label: 'Concluído', color: 'text-status-success', bgColor: 'bg-status-success-bg', icon: CheckCircle2 },
  in_progress: { label: 'Em andamento', color: 'text-status-warning', bgColor: 'bg-status-warning-bg', icon: Settings },
  pending: { label: 'Pendente', color: 'text-text-muted', bgColor: 'bg-surface-light', icon: Clock },
};

const priorityConfig = {
  critical: { label: 'Crítico', color: 'bg-status-error text-white' },
  high: { label: 'Alto', color: 'bg-status-warning text-white' },
  medium: { label: 'Médio', color: 'bg-aimana-teal text-white' },
  low: { label: 'Baixo', color: 'bg-surface-light text-text' },
};

const severityConfig = {
  critical: { label: 'Crítico', color: 'text-status-error', bgColor: 'bg-status-error-bg', icon: XCircle },
  high: { label: 'Alto', color: 'text-status-warning', bgColor: 'bg-status-warning-bg', icon: AlertTriangle },
  medium: { label: 'Médio', color: 'text-aimana-teal', bgColor: 'bg-aimana-teal/10', icon: AlertTriangle },
};

// ============================================================================
// COMPONENTES AUXILIARES
// ============================================================================

function GovernanceScoreCard() {
  const totalItems = governanceItems.flatMap((g) => g.items).length;
  const completedItems = governanceItems.flatMap((g) => g.items).filter((i) => i.status === 'completed').length;
  const inProgressItems = governanceItems.flatMap((g) => g.items).filter((i) => i.status === 'in_progress').length;
  const governanceScore = Math.round((completedItems / totalItems) * 100);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-6">
          {/* Score circular */}
          <div className="relative h-28 w-28 flex-shrink-0">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-surface-light"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={`${governanceScore * 2.51} 251`}
                strokeLinecap="round"
                className={cn(
                  governanceScore >= 70 ? 'text-status-success' :
                  governanceScore >= 50 ? 'text-status-warning' : 'text-status-error'
                )}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-text">{governanceScore}%</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text mb-1">Score de Governança</h3>
            <p className="text-sm text-text-secondary mb-4">{completedItems} de {totalItems} controles implementados</p>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-status-success">{completedItems}</div>
                <div className="text-xs text-text-muted">Concluídos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-status-warning">{inProgressItems}</div>
                <div className="text-xs text-text-muted">Em Progresso</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-text-muted">{totalItems - completedItems - inProgressItems}</div>
                <div className="text-xs text-text-muted">Pendentes</div>
              </div>
            </div>
          </div>

          {/* Category breakdown */}
          <div className="flex-1 space-y-3">
            {governanceItems.map((category) => {
              const completed = category.items.filter((i) => i.status === 'completed').length;
              const percentage = Math.round((completed / category.items.length) * 100);
              return (
                <div key={category.id} className="flex items-center gap-3">
                  <category.icon className={cn('h-4 w-4', category.color)} />
                  <span className="text-sm text-text w-24">{category.category}</span>
                  <Progress value={percentage} size="sm" className="flex-1" />
                  <span className="text-xs text-text-muted w-12">{completed}/{category.items.length}</span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StackComparisonCard({ stack }: { stack: typeof stackRecommendations[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-aimana-navy/10">
              <stack.icon className="h-5 w-5 text-aimana-navy" />
            </div>
            <div>
              <CardTitle className="text-base">{stack.name}</CardTitle>
              <CardDescription className="text-xs">{stack.description}</CardDescription>
            </div>
          </div>
          {stack.current && (
            <Badge variant="secondary" size="sm">
              Atual: {stack.current}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {stack.options.slice(0, expanded ? undefined : 2).map((option, idx) => (
            <div
              key={idx}
              className={cn(
                'p-3 rounded-lg border transition-all',
                option.recommended
                  ? 'bg-aimana-teal/10 border-aimana-teal/30'
                  : 'bg-surface-light border-transparent hover:border-surface-border'
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {option.recommended && <CheckCircle2 className="h-4 w-4 text-aimana-teal" />}
                  <span className={cn('text-sm font-medium', option.recommended ? 'text-text' : 'text-text-secondary')}>
                    {option.name}
                  </span>
                  {option.recommended && (
                    <Badge variant="primary" size="sm">Recomendado</Badge>
                  )}
                </div>
                <span className="text-xs text-text-muted">{option.pricing}</span>
              </div>
              <p className="text-xs text-text-secondary mb-2">{option.notes}</p>
              <div className="flex flex-wrap gap-1">
                {option.features.map((feature, i) => (
                  <Badge key={i} variant="secondary" size="sm" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
        {stack.options.length > 2 && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-3"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Ver menos' : `Ver mais ${stack.options.length - 2} opções`}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export function Governance() {
  const [activeTab, setActiveTab] = useState('policies');
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiModalContext, setAIModalContext] = useState<{ title: string; context: string }>({ title: '', context: '' });
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Cálculos de governança
  const totalItems = governanceItems.flatMap((g) => g.items).length;
  const completedItems = governanceItems.flatMap((g) => g.items).filter((i) => i.status === 'completed').length;
  const criticalPending = governanceItems.flatMap((g) => g.items).filter((i) => i.priority === 'critical' && i.status !== 'completed').length;

  // Filtragem de itens
  const filteredItems = governanceItems.map(category => ({
    ...category,
    items: category.items.filter(item => {
      if (filterCategory !== 'all' && category.category !== filterCategory) return false;
      if (filterStatus !== 'all' && item.status !== filterStatus) return false;
      return true;
    })
  })).filter(category => category.items.length > 0);

  const openAIModal = (title: string, context: string) => {
    setAIModalContext({ title, context });
    setShowAIModal(true);
  };

  return (
    <div>
      <Header
        title="Governança & Stack"
        subtitle="Defina controles de governança e escolha o stack tecnológico para IA"
      />

      <main className="p-6">
        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="policies">
              <Shield className="h-4 w-4 mr-2" />
              Políticas & Compliance
            </TabsTrigger>
            <TabsTrigger value="stack">
              <Server className="h-4 w-4 mr-2" />
              Stack Tecnológico
            </TabsTrigger>
            <TabsTrigger value="templates">
              <FileText className="h-4 w-4 mr-2" />
              Templates & Documentos
            </TabsTrigger>
          </TabsList>

          {/* ================================================================ */}
          {/* ABA 1: POLÍTICAS & COMPLIANCE */}
          {/* ================================================================ */}
          <TabsContent value="policies" className="space-y-6">
            {/* Score Card */}
            <GovernanceScoreCard />

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Checklist de Governança - 2 colunas */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Checklist de Governança</CardTitle>
                        <CardDescription>Controles necessários para uso seguro e responsável de IA</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <AIActionButton
                          label="Priorizar"
                          icon={<Sparkles className="h-4 w-4" />}
                          onClick={() => openAIModal('Priorização de Controles', 'prioritize-controls')}
                          size="sm"
                        />
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Exportar
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Filtros */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-text-muted" />
                        <select
                          value={filterCategory}
                          onChange={(e) => setFilterCategory(e.target.value)}
                          className="text-sm border border-surface-border rounded-md px-2 py-1 bg-white"
                        >
                          <option value="all">Todas as categorias</option>
                          {governanceItems.map(cat => (
                            <option key={cat.id} value={cat.category}>{cat.category}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="text-sm border border-surface-border rounded-md px-2 py-1 bg-white"
                        >
                          <option value="all">Todos os status</option>
                          <option value="completed">Concluídos</option>
                          <option value="in_progress">Em andamento</option>
                          <option value="pending">Pendentes</option>
                        </select>
                      </div>
                    </div>

                    {/* Lista de controles */}
                    <div className="space-y-6">
                      {filteredItems.map((category) => (
                        <div key={category.id}>
                          <div className="flex items-center gap-2 mb-3">
                            <category.icon className={cn('h-4 w-4', category.color)} />
                            <h4 className="font-medium text-text">{category.category}</h4>
                            <Badge variant="secondary" size="sm">
                              {category.items.filter(i => i.status === 'completed').length}/{category.items.length}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            {category.items.map((item, idx) => {
                              const status = statusConfig[item.status as keyof typeof statusConfig];
                              const priority = priorityConfig[item.priority as keyof typeof priorityConfig];
                              return (
                                <div
                                  key={idx}
                                  className={cn(
                                    'flex items-center gap-3 p-3 rounded-lg border',
                                    status.bgColor,
                                    'border-transparent hover:border-surface-border transition-colors'
                                  )}
                                >
                                  <status.icon className={cn('h-5 w-5', status.color)} />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-text">{item.name}</span>
                                      <Badge className={cn('text-xs', priority.color)}>
                                        {priority.label}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                                      <span className="flex items-center gap-1">
                                        <Users className="h-3 w-3" />
                                        {item.owner}
                                      </span>
                                      {item.lastUpdated && (
                                        <span className="flex items-center gap-1">
                                          <Clock className="h-3 w-3" />
                                          {item.lastUpdated}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <Badge variant={item.status === 'completed' ? 'success' : item.status === 'in_progress' ? 'warning' : 'pending'}>
                                    {status.label}
                                  </Badge>
                                  <Button variant="ghost" size="sm">
                                    <Edit3 className="h-4 w-4" />
                                  </Button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - Riscos e Auditoria */}
              <div className="space-y-6">
                {/* Riscos */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Riscos Identificados</CardTitle>
                      <Badge variant="error">{riskItems.length}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {riskItems.map((risk) => {
                      const severity = severityConfig[risk.severity as keyof typeof severityConfig];
                      return (
                        <div key={risk.id} className={cn('p-3 rounded-lg', severity.bgColor)}>
                          <div className="flex items-start gap-2">
                            <severity.icon className={cn('h-4 w-4 mt-0.5', severity.color)} />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-text">{risk.title}</p>
                              <p className="text-xs text-text-secondary mt-0.5">{risk.description}</p>
                              <div className="flex items-center justify-between mt-2">
                                <Badge variant="secondary" size="sm">{risk.category}</Badge>
                                <Button variant="ghost" size="sm" className="h-6 text-xs">
                                  Ver ação
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <AIActionButton
                      label="Analisar Riscos"
                      icon={<Sparkles className="h-4 w-4" />}
                      onClick={() => openAIModal('Análise de Riscos', 'risk-analysis')}
                      variant="outline"
                      className="w-full"
                    />
                  </CardContent>
                </Card>

                {/* Log de Auditoria */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Histórico de Alterações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {auditLog.slice(0, 4).map((log) => (
                        <div key={log.id} className="flex items-start gap-3 text-sm">
                          <div className={cn(
                            'p-1.5 rounded-full',
                            log.type === 'approval' ? 'bg-status-success-bg' :
                            log.type === 'create' ? 'bg-aimana-teal/10' :
                            'bg-surface-light'
                          )}>
                            {log.type === 'update' && <Edit3 className="h-3 w-3 text-text-muted" />}
                            {log.type === 'status' && <RefreshCw className="h-3 w-3 text-status-warning" />}
                            {log.type === 'approval' && <CheckCircle2 className="h-3 w-3 text-status-success" />}
                            {log.type === 'create' && <Plus className="h-3 w-3 text-aimana-teal" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-text truncate">{log.action}</p>
                            <p className="text-xs text-text-muted truncate">{log.item}</p>
                          </div>
                          <span className="text-xs text-text-muted whitespace-nowrap">{log.timestamp.split(' ')[0]}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="w-full mt-3">
                      Ver histórico completo
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ================================================================ */}
          {/* ABA 2: STACK TECNOLÓGICO */}
          {/* ================================================================ */}
          <TabsContent value="stack" className="space-y-6">
            {/* Header com ações */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-text">Stack Tecnológico Recomendado</h2>
                <p className="text-sm text-text-secondary">Baseado no perfil e maturidade da empresa</p>
              </div>
              <div className="flex items-center gap-2">
                <AIActionButton
                  label="Gerar Recomendação Personalizada"
                  icon={<Sparkles className="h-4 w-4" />}
                  onClick={() => openAIModal('Recomendação de Stack', 'stack-recommendation')}
                />
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Comparar Custos
                </Button>
              </div>
            </div>

            {/* Stack atual vs recomendado */}
            <Card className="bg-gradient-to-r from-aimana-navy to-aimana-navy/90 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Stack Atual vs Recomendado</h3>
                    <p className="text-white/70 text-sm mb-4">
                      Comparação entre sua infraestrutura atual e nossas recomendações
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Box className="h-5 w-5 text-white/70" />
                        <span className="text-sm">Atual: pgvector + AWS</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-aimana-teal" />
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-aimana-teal" />
                        <span className="text-sm">Recomendado: Pinecone + AWS Bedrock + LangChain</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <Layers className="h-4 w-4 mr-2" />
                    Ver Diagrama
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Grid de recomendações */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stackRecommendations.map((stack) => (
                <StackComparisonCard key={stack.id} stack={stack} />
              ))}
            </div>

            {/* Integrations status */}
            <Card>
              <CardHeader>
                <CardTitle>Status de Integrações</CardTitle>
                <CardDescription>Conexões com serviços e APIs de IA</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  {[
                    { name: 'AWS Bedrock', status: 'connected', icon: Cloud },
                    { name: 'OpenAI API', status: 'not_configured', icon: Globe },
                    { name: 'Pinecone', status: 'not_configured', icon: Database },
                    { name: 'LangSmith', status: 'not_configured', icon: Activity },
                  ].map((integration, idx) => (
                    <div key={idx} className="p-4 rounded-lg border border-surface-border">
                      <div className="flex items-center gap-3 mb-3">
                        <integration.icon className="h-5 w-5 text-aimana-navy" />
                        <span className="font-medium text-text">{integration.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={integration.status === 'connected' ? 'success' : 'secondary'}
                          size="sm"
                        >
                          {integration.status === 'connected' ? 'Conectado' : 'Não configurado'}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          {integration.status === 'connected' ? 'Configurar' : 'Conectar'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================================================================ */}
          {/* ABA 3: TEMPLATES & DOCUMENTOS */}
          {/* ================================================================ */}
          <TabsContent value="templates" className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-text">Templates & Documentos</h2>
                <p className="text-sm text-text-secondary">Biblioteca de templates e documentos gerados</p>
              </div>
              <div className="flex items-center gap-2">
                <AIActionButton
                  label="Gerar Documento com IA"
                  icon={<Sparkles className="h-4 w-4" />}
                  onClick={() => openAIModal('Gerador de Documentos', 'document-generator')}
                />
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Documentos da empresa */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Seus Documentos</CardTitle>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {companyDocuments.map((doc) => (
                      <div key={doc.id} className="p-3 rounded-lg border border-surface-border hover:border-aimana-teal/30 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-text truncate">{doc.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant={doc.status === 'approved' ? 'success' : 'warning'}
                                size="sm"
                              >
                                {doc.status === 'approved' ? 'Aprovado' : 'Rascunho'}
                              </Badge>
                              <span className="text-xs text-text-muted">v{doc.version}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit3 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Biblioteca de Templates */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Biblioteca de Templates</CardTitle>
                        <CardDescription>Templates prontos para uso e personalização</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                          <input
                            type="text"
                            placeholder="Buscar templates..."
                            className="pl-9 pr-4 py-2 text-sm border border-surface-border rounded-md bg-white w-64"
                          />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {documentTemplates.map((template) => (
                        <div
                          key={template.id}
                          className="p-4 rounded-lg border border-surface-border hover:border-aimana-teal/30 hover:shadow-sm transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-surface-light">
                              <FileText className="h-5 w-5 text-aimana-navy" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-text">{template.name}</h4>
                              <p className="text-xs text-text-secondary mt-1 line-clamp-2">{template.description}</p>
                              <div className="flex items-center gap-3 mt-3">
                                <Badge variant="secondary" size="sm">{template.category}</Badge>
                                <span className="text-xs text-text-muted">{template.pages} páginas</span>
                                <span className="text-xs text-text-muted flex items-center gap-1">
                                  <Download className="h-3 w-3" />
                                  {template.downloads}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-surface-border">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye className="h-4 w-4 mr-1" />
                              Visualizar
                            </Button>
                            <Button size="sm" className="flex-1">
                              <Copy className="h-4 w-4 mr-1" />
                              Usar Template
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Generate */}
            <Card className="bg-gradient-to-r from-aimana-teal/10 to-phase-plan/10 border-aimana-teal/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-aimana-teal/20">
                      <Sparkles className="h-6 w-6 text-aimana-teal" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text">Geração Rápida com IA</h3>
                      <p className="text-sm text-text-secondary">
                        Crie documentos personalizados baseados no perfil da sua empresa
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => openAIModal('Política de IA', 'generate-policy')}>
                      Gerar Política
                    </Button>
                    <Button variant="outline" onClick={() => openAIModal('Framework de Governança', 'generate-framework')}>
                      Gerar Framework
                    </Button>
                    <Button onClick={() => openAIModal('Documento Personalizado', 'generate-custom')}>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Documento Personalizado
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI Insight Banner - No final da página */}
        <AIInsightBanner
          title="Análise de Governança"
          insights={[
            `${completedItems} de ${totalItems} controles implementados (${Math.round((completedItems/totalItems)*100)}%)`,
            `${criticalPending} controles críticos pendentes precisam de atenção`,
            `${riskItems.filter(r => r.severity === 'critical').length} riscos críticos identificados`,
          ]}
          onAnalyze={() => openAIModal('Análise Completa de Governança', 'governance-full')}
          className="mt-6"
        />
      </main>

      {/* AI Modal */}
      <AIModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        title={aiModalContext.title}
        initialPrompt={
          aiModalContext.context === 'governance-full'
            ? 'Analise o estado atual da governança de IA da empresa e forneça recomendações priorizadas para melhorar o score.'
            : aiModalContext.context === 'prioritize-controls'
            ? 'Com base nos controles pendentes, sugira uma ordem de priorização considerando riscos e dependências.'
            : aiModalContext.context === 'risk-analysis'
            ? 'Analise os riscos identificados e sugira planos de mitigação detalhados para cada um.'
            : aiModalContext.context === 'stack-recommendation'
            ? 'Analise o perfil da empresa e recomende um stack tecnológico de IA otimizado.'
            : aiModalContext.context === 'document-generator'
            ? 'Ajude-me a criar um documento de governança de IA personalizado para a empresa.'
            : 'Como posso ajudar com a governança de IA?'
        }
      />
    </div>
  );
}
