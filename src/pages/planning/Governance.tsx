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

// Ferramentas de Produtividade
const productivityTools = [
  {
    category: 'Produtividade',
    icon: Zap,
    tools: [
      { name: 'ChatGPT', description: 'Assistente geral para texto, análise e brainstorming', status: 'approved', useCases: ['Redação', 'Brainstorming', 'Análise de texto'], audience: 'Todos' },
      { name: 'Claude', description: 'Raciocínio avançado, análise de documentos e código', status: 'approved', useCases: ['Análise longa', 'Código', 'Documentação'], audience: 'Todos' },
      { name: 'GitHub Copilot', description: 'Assistente de código integrado ao IDE', status: 'approved', useCases: ['Autocompletar código', 'Refatoração', 'Testes'], audience: 'Coders' },
      { name: 'Gemini', description: 'IA multimodal do Google integrada ao Workspace', status: 'testing', useCases: ['Planilhas', 'Apresentações', 'Email'], audience: 'Champions' },
    ],
  },
  {
    category: 'Comunicação',
    icon: Globe,
    tools: [
      { name: 'Grammarly', description: 'Correção e melhoria de textos em inglês', status: 'approved', useCases: ['E-mails', 'Documentos', 'Apresentações'], audience: 'Todos' },
      { name: 'Jasper', description: 'Geração de conteúdo para marketing e comunicação', status: 'testing', useCases: ['Blog posts', 'Social media', 'Campanhas'], audience: 'Champions' },
      { name: 'Otter.ai', description: 'Transcrição e resumo de reuniões', status: 'restricted', useCases: ['Reuniões internas', 'Notas', 'Atas'], audience: 'Champions' },
    ],
  },
  {
    category: 'Análise de Dados',
    icon: BarChart3,
    tools: [
      { name: 'Julius AI', description: 'Análise de dados com linguagem natural', status: 'testing', useCases: ['Análise exploratória', 'Visualização', 'Relatórios'], audience: 'Champions' },
      { name: 'Databricks AI', description: 'Plataforma de dados com IA integrada', status: 'approved', useCases: ['Big Data', 'ML pipelines', 'ETL inteligente'], audience: 'Coders' },
      { name: 'Power BI Copilot', description: 'IA integrada ao Power BI para insights', status: 'testing', useCases: ['Dashboards', 'Narrativas', 'DAX'], audience: 'Todos' },
    ],
  },
  {
    category: 'Criação de Conteúdo',
    icon: Edit3,
    tools: [
      { name: 'Canva AI', description: 'Design assistido por IA para apresentações e materiais', status: 'approved', useCases: ['Apresentações', 'Social media', 'Infográficos'], audience: 'Todos' },
      { name: 'Midjourney', description: 'Geração de imagens por IA', status: 'restricted', useCases: ['Conceitos visuais', 'Protótipos', 'Marketing'], audience: 'Champions' },
      { name: 'Descript', description: 'Edição de áudio e vídeo com IA', status: 'testing', useCases: ['Podcasts', 'Vídeos', 'Treinamentos'], audience: 'Champions' },
    ],
  },
  {
    category: 'Automação No-Code',
    icon: Layers,
    tools: [
      { name: 'Zapier AI', description: 'Automações inteligentes entre aplicações', status: 'approved', useCases: ['Workflows', 'Integrações', 'Notificações'], audience: 'Champions' },
      { name: 'Make (Integromat)', description: 'Automação visual de processos complexos', status: 'testing', useCases: ['Processos', 'APIs', 'Data sync'], audience: 'Champions' },
      { name: 'Microsoft Power Automate', description: 'Automação dentro do ecossistema Microsoft', status: 'approved', useCases: ['Office 365', 'Aprovações', 'Formulários'], audience: 'Todos' },
    ],
  },
];

// Wizard steps para Aplicar Governança
const wizardSteps = [
  { id: 1, title: 'Contexto Regulatório', description: 'Defina o ambiente regulatório da sua organização' },
  { id: 2, title: 'Classificação de Dados', description: 'Categorize os dados utilizados por IA' },
  { id: 3, title: 'Políticas de Uso', description: 'Estabeleça regras de uso de ferramentas de IA' },
  { id: 4, title: 'Matriz RACI', description: 'Defina responsabilidades de governança' },
];

const industrySectors = [
  'Financeiro / Bancário',
  'Saúde / Healthcare',
  'Varejo / E-commerce',
  'Tecnologia / SaaS',
  'Indústria / Manufatura',
  'Educação',
  'Governo / Setor Público',
  'Telecomunicações',
  'Energia / Utilities',
  'Jurídico',
  'Outro',
];

const existingRegulations = [
  { id: 'lgpd', name: 'LGPD (Lei Geral de Proteção de Dados)', checked: false },
  { id: 'gdpr', name: 'GDPR (General Data Protection Regulation)', checked: false },
  { id: 'marco-civil', name: 'Marco Civil da Internet', checked: false },
  { id: 'ia-act', name: 'EU AI Act', checked: false },
  { id: 'sox', name: 'SOX (Sarbanes-Oxley)', checked: false },
  { id: 'hipaa', name: 'HIPAA (Health Insurance Portability)', checked: false },
  { id: 'pci', name: 'PCI DSS (Payment Card Industry)', checked: false },
  { id: 'bacen', name: 'Regulamentações BACEN', checked: false },
  { id: 'iso27001', name: 'ISO 27001', checked: false },
  { id: 'nist', name: 'NIST AI Framework', checked: false },
];

const dataCategories = [
  { id: 1, name: 'Dados Pessoais de Clientes', sensitivity: '' },
  { id: 2, name: 'Dados Financeiros', sensitivity: '' },
  { id: 3, name: 'Dados de Colaboradores', sensitivity: '' },
  { id: 4, name: 'Dados de Propriedade Intelectual', sensitivity: '' },
  { id: 5, name: 'Dados de Marketing/Analytics', sensitivity: '' },
  { id: 6, name: 'Dados Operacionais', sensitivity: '' },
  { id: 7, name: 'Dados de Saúde', sensitivity: '' },
  { id: 8, name: 'Comunicações Internas', sensitivity: '' },
];

const sensitivityLevels = [
  { value: 'publico', label: 'Público', color: 'bg-status-success text-white' },
  { value: 'interno', label: 'Interno', color: 'bg-aimana-teal text-white' },
  { value: 'confidencial', label: 'Confidencial', color: 'bg-status-warning text-white' },
  { value: 'restrito', label: 'Restrito', color: 'bg-status-error text-white' },
];

const raciRoles = ['CEO', 'CTO', 'DPO', 'TI', 'Legal'];
const raciActivities = ['Aprovação de Modelo', 'Deploy de Agente', 'Uso de Dados', 'Treinamento'];
const raciOptions = ['R', 'A', 'C', 'I', '-'];

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
// SEÇÃO: FERRAMENTAS DE PRODUTIVIDADE (Stack tab)
// ============================================================================

const toolStatusConfig = {
  approved: { label: 'Aprovado', color: 'bg-status-success text-white' },
  testing: { label: 'Em Teste', color: 'bg-status-warning text-white' },
  restricted: { label: 'Restrito', color: 'bg-status-error text-white' },
};

const audienceConfig = {
  Todos: { label: 'Todos', color: 'bg-aimana-navy text-white' },
  Champions: { label: 'Champions', color: 'bg-phase-plan text-white' },
  Coders: { label: 'Coders', color: 'bg-aimana-teal text-white' },
};

function ProductivityToolsSection() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text">Ferramentas de Produtividade</h2>
          <p className="text-sm text-text-secondary">Ferramentas de IA aprovadas e em avaliação para uso na organização</p>
        </div>
      </div>

      {/* Champions note */}
      <Card className="bg-gradient-to-r from-phase-plan/10 to-aimana-teal/10 border-phase-plan/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-phase-plan/20">
              <Users className="h-5 w-5 text-phase-plan" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text">Sobre Champions</h4>
              <p className="text-sm text-text-secondary mt-1">
                Areas com Champions formados podem desenvolver testes, automacoes e solucoes no-code.
                Champions atuam como multiplicadores de IA em suas equipes e tem acesso a ferramentas em fase de teste.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tools by category */}
      <div className="space-y-4">
        {productivityTools.map((category) => (
          <Card key={category.category} className="overflow-hidden">
            <CardHeader
              className="pb-3 cursor-pointer hover:bg-surface-light/50 transition-colors"
              onClick={() => setExpandedCategory(expandedCategory === category.category ? null : category.category)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-aimana-navy/10">
                    <category.icon className="h-5 w-5 text-aimana-navy" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{category.category}</CardTitle>
                    <CardDescription className="text-xs">{category.tools.length} ferramentas</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {category.tools.filter(t => t.status === 'approved').length > 0 && (
                    <Badge variant="success" size="sm">
                      {category.tools.filter(t => t.status === 'approved').length} aprovadas
                    </Badge>
                  )}
                  <ArrowRight className={cn(
                    'h-4 w-4 text-text-muted transition-transform',
                    expandedCategory === category.category && 'rotate-90'
                  )} />
                </div>
              </div>
            </CardHeader>
            {(expandedCategory === category.category) && (
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {category.tools.map((tool, idx) => {
                    const statusCfg = toolStatusConfig[tool.status as keyof typeof toolStatusConfig];
                    const audienceCfg = audienceConfig[tool.audience as keyof typeof audienceConfig];
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-lg border border-surface-border hover:border-aimana-teal/30 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-text">{tool.name}</span>
                            <Badge className={cn('text-xs', statusCfg.color)}>{statusCfg.label}</Badge>
                            <Badge className={cn('text-xs', audienceCfg.color)}>{audienceCfg.label}</Badge>
                          </div>
                        </div>
                        <p className="text-xs text-text-secondary mb-3">{tool.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {tool.useCases.map((useCase, i) => (
                            <Badge key={i} variant="secondary" size="sm" className="text-xs">
                              {useCase}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// SEÇÃO: APLICAR GOVERNANÇA (Wizard)
// ============================================================================

function GovernanceWizard({ openAIModal }: { openAIModal: (title: string, context: string) => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  // Step 1 state
  const [industrySector, setIndustrySector] = useState('');
  const [regulations, setRegulations] = useState(existingRegulations.map(r => ({ ...r })));
  const [privacyLevel, setPrivacyLevel] = useState('');

  // Step 2 state
  const [dataClassification, setDataClassification] = useState(dataCategories.map(d => ({ ...d })));

  // Step 3 state
  const [aiUsageRules, setAiUsageRules] = useState('');
  const [allowedTools, setAllowedTools] = useState('');
  const [prohibitedActions, setProhibitedActions] = useState('');

  // Step 4 state
  const [raciMatrix, setRaciMatrix] = useState<Record<string, Record<string, string>>>(
    raciActivities.reduce((acc, activity) => {
      acc[activity] = raciRoles.reduce((roleAcc, role) => {
        roleAcc[role] = '-';
        return roleAcc;
      }, {} as Record<string, string>);
      return acc;
    }, {} as Record<string, Record<string, string>>)
  );

  const handleRegulationToggle = (id: string) => {
    setRegulations(prev => prev.map(r => r.id === id ? { ...r, checked: !r.checked } : r));
  };

  const handleDataSensitivity = (id: number, sensitivity: string) => {
    setDataClassification(prev => prev.map(d => d.id === id ? { ...d, sensitivity } : d));
  };

  const handleRaciChange = (activity: string, role: string, value: string) => {
    setRaciMatrix(prev => ({
      ...prev,
      [activity]: {
        ...prev[activity],
        [role]: value,
      },
    }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-5 w-5 text-aimana-teal" />
            <span className="text-sm font-medium text-aimana-teal">GovernanceCopilot</span>
          </div>
          <h2 className="text-lg font-semibold text-text">Aplicar Governanca de IA</h2>
          <p className="text-sm text-text-secondary">Preencha as informacoes para gerar sua politica de governanca personalizada</p>
        </div>
      </div>

      {/* Stepper */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {wizardSteps.map((step, idx) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors cursor-pointer',
                      currentStep === step.id
                        ? 'bg-aimana-teal text-white'
                        : currentStep > step.id
                        ? 'bg-status-success text-white'
                        : 'bg-surface-light text-text-muted'
                    )}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="hidden md:block">
                    <p className={cn('text-sm font-medium', currentStep === step.id ? 'text-text' : 'text-text-muted')}>
                      {step.title}
                    </p>
                    <p className="text-xs text-text-muted">{step.description}</p>
                  </div>
                </div>
                {idx < wizardSteps.length - 1 && (
                  <div className={cn(
                    'flex-1 h-px mx-4',
                    currentStep > step.id ? 'bg-status-success' : 'bg-surface-border'
                  )} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      {/* Step 1: Contexto Regulatório */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Contexto Regulatorio</CardTitle>
            <CardDescription>Defina o setor e as regulamentacoes aplicaveis a sua organizacao</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Industry Sector */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">Setor de Atuacao</label>
              <select
                value={industrySector}
                onChange={(e) => setIndustrySector(e.target.value)}
                className="w-full md:w-96 text-sm border border-surface-border rounded-md px-3 py-2 bg-white"
              >
                <option value="">Selecione o setor...</option>
                {industrySectors.map((sector) => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>

            {/* Existing Regulations */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">Regulamentacoes Aplicaveis</label>
              <p className="text-xs text-text-muted mb-3">Selecione todas as regulamentacoes que se aplicam a sua organizacao</p>
              <div className="grid gap-2 md:grid-cols-2">
                {regulations.map((regulation) => (
                  <label
                    key={regulation.id}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors',
                      regulation.checked
                        ? 'bg-aimana-teal/10 border-aimana-teal/30'
                        : 'bg-white border-surface-border hover:border-aimana-teal/20'
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={regulation.checked}
                      onChange={() => handleRegulationToggle(regulation.id)}
                      className="rounded border-surface-border text-aimana-teal focus:ring-aimana-teal"
                    />
                    <span className="text-sm text-text">{regulation.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Privacy Level */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">Nivel de Privacidade de Dados</label>
              <div className="flex gap-3">
                {['Basico', 'Intermediario', 'Avancado', 'Maximo'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setPrivacyLevel(level)}
                    className={cn(
                      'px-4 py-2 rounded-lg border text-sm font-medium transition-colors',
                      privacyLevel === level
                        ? 'bg-aimana-teal text-white border-aimana-teal'
                        : 'bg-white border-surface-border text-text-secondary hover:border-aimana-teal/30'
                    )}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Classificação de Dados */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Classificacao de Dados</CardTitle>
            <CardDescription>Categorize os tipos de dados que sua organizacao utiliza com IA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dataClassification.map((data) => (
                <div
                  key={data.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-surface-border"
                >
                  <div className="flex items-center gap-3">
                    <Database className="h-4 w-4 text-text-muted" />
                    <span className="text-sm font-medium text-text">{data.name}</span>
                  </div>
                  <div className="flex gap-2">
                    {sensitivityLevels.map((level) => (
                      <button
                        key={level.value}
                        onClick={() => handleDataSensitivity(data.id, level.value)}
                        className={cn(
                          'px-3 py-1 rounded-md text-xs font-medium transition-colors',
                          data.sensitivity === level.value
                            ? level.color
                            : 'bg-surface-light text-text-muted hover:bg-surface-border'
                        )}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Políticas de Uso */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Politicas de Uso</CardTitle>
            <CardDescription>Estabeleca as regras para uso de ferramentas de IA na organizacao</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text mb-2">Regras Gerais de Uso de IA</label>
              <textarea
                value={aiUsageRules}
                onChange={(e) => setAiUsageRules(e.target.value)}
                placeholder="Ex: Todos os colaboradores podem usar ferramentas de IA aprovadas para tarefas do dia a dia. Dados confidenciais nao devem ser inseridos em ferramentas externas..."
                className="w-full h-32 text-sm border border-surface-border rounded-md px-3 py-2 bg-white resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">Ferramentas Permitidas</label>
              <textarea
                value={allowedTools}
                onChange={(e) => setAllowedTools(e.target.value)}
                placeholder="Ex: ChatGPT (via plano Enterprise), Claude (via API corporativa), GitHub Copilot, Canva AI..."
                className="w-full h-24 text-sm border border-surface-border rounded-md px-3 py-2 bg-white resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">Acoes Proibidas</label>
              <textarea
                value={prohibitedActions}
                onChange={(e) => setProhibitedActions(e.target.value)}
                placeholder="Ex: Inserir dados pessoais de clientes em ferramentas publicas, usar IA para decisoes automaticas sem revisao humana, compartilhar outputs de IA sem validacao..."
                className="w-full h-24 text-sm border border-surface-border rounded-md px-3 py-2 bg-white resize-none"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Matriz RACI */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Matriz RACI</CardTitle>
            <CardDescription>
              Defina responsabilidades: <strong>R</strong>esponsavel, <strong>A</strong>provador,
              <strong> C</strong>onsultado, <strong>I</strong>nformado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-border">
                    <th className="text-left text-sm font-medium text-text p-3">Atividade</th>
                    {raciRoles.map((role) => (
                      <th key={role} className="text-center text-sm font-medium text-text p-3">{role}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {raciActivities.map((activity) => (
                    <tr key={activity} className="border-b border-surface-border/50">
                      <td className="text-sm text-text p-3 font-medium">{activity}</td>
                      {raciRoles.map((role) => (
                        <td key={role} className="text-center p-3">
                          <select
                            value={raciMatrix[activity]?.[role] || '-'}
                            onChange={(e) => handleRaciChange(activity, role, e.target.value)}
                            className={cn(
                              'w-14 text-center text-sm border border-surface-border rounded-md px-1 py-1 bg-white font-semibold',
                              raciMatrix[activity]?.[role] === 'R' && 'text-status-error',
                              raciMatrix[activity]?.[role] === 'A' && 'text-status-warning',
                              raciMatrix[activity]?.[role] === 'C' && 'text-aimana-teal',
                              raciMatrix[activity]?.[role] === 'I' && 'text-aimana-navy',
                            )}
                          >
                            {raciOptions.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-surface-border text-xs text-text-muted">
              <span><strong className="text-status-error">R</strong> = Responsavel</span>
              <span><strong className="text-status-warning">A</strong> = Aprovador</span>
              <span><strong className="text-aimana-teal">C</strong> = Consultado</span>
              <span><strong className="text-aimana-navy">I</strong> = Informado</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation & Generate */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Voltar
        </Button>

        <div className="flex items-center gap-3">
          {currentStep < 4 ? (
            <Button onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}>
              Proximo
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-aimana-teal hover:bg-aimana-teal/90"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Gerando Politica...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Gerar Politica de Governanca
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Generated Result */}
      {isGenerated && (
        <Card className="bg-gradient-to-r from-aimana-teal/10 to-phase-plan/10 border-aimana-teal/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-aimana-teal/20">
                  <CheckCircle2 className="h-6 w-6 text-aimana-teal" />
                </div>
                <div>
                  <CardTitle>Politica de Governanca Gerada</CardTitle>
                  <CardDescription>Revisao e aprovacao pendente</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  Visualizar
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Exportar PDF
                </Button>
                <Button variant="outline" size="sm">
                  <Edit3 className="h-4 w-4 mr-1" />
                  Editar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 bg-white rounded-lg border border-surface-border">
                <div className="text-xs text-text-muted mb-1">Setor</div>
                <div className="text-sm font-medium text-text">{industrySector || 'Nao definido'}</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-surface-border">
                <div className="text-xs text-text-muted mb-1">Regulamentacoes</div>
                <div className="text-sm font-medium text-text">{regulations.filter(r => r.checked).length} selecionadas</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-surface-border">
                <div className="text-xs text-text-muted mb-1">Dados Classificados</div>
                <div className="text-sm font-medium text-text">{dataClassification.filter(d => d.sensitivity).length}/{dataClassification.length}</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-surface-border">
                <div className="text-xs text-text-muted mb-1">Nivel de Privacidade</div>
                <div className="text-sm font-medium text-text">{privacyLevel || 'Nao definido'}</div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-white rounded-lg border border-surface-border">
              <p className="text-sm text-text-secondary">
                A politica de governanca foi gerada com base nas informacoes fornecidas. O documento inclui:
                contexto regulatorio, classificacao de dados, politicas de uso de IA, e matriz RACI de responsabilidades.
                Recomendamos revisao pelo DPO e pelo departamento juridico antes da aprovacao final.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
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
            <TabsTrigger value="apply">
              <CheckSquare className="h-4 w-4 mr-2" />
              Aplicar Governanca
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
            {/* Ferramentas de Produtividade */}
            <ProductivityToolsSection />

            {/* Divider */}
            <div className="border-t border-surface-border pt-2" />

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

          {/* ================================================================ */}
          {/* ABA 4: APLICAR GOVERNANÇA */}
          {/* ================================================================ */}
          <TabsContent value="apply" className="space-y-6">
            <GovernanceWizard openAIModal={openAIModal} />
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
