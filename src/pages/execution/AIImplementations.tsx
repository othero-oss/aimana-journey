/**
 * ===============================================================================
 * AIMANA JOURNEY - Implementacoes IA (Unified AI Implementations)
 * Gerencie o ciclo de vida completo de TODAS as implementacoes de IA:
 * Agentes, Assistentes, Modelos ML, Automacoes
 *
 * Tabs:
 * - Visao Geral: Dashboard com stats, filtros e grid de cards
 * - Pipeline: Kanban de estagios do ciclo de vida
 * - Producao: Implementacoes ativas com metricas em tempo real
 * - Repositorio: Templates reutilizaveis
 * ===============================================================================
 */

import { useState, useMemo } from 'react';
import { Header } from '@/components/layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AIActionButton, AIModal } from '@/components/ai';
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
  Bot,
  Brain,
  Cpu,
  Workflow,
  Settings,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Play,
  Pause,
  RefreshCw,
  Shield,
  Server,
  Eye,
  Search,
  Filter,
  GitBranch,
  Package,
  Copy,
  Archive,
  Layers,
  LayoutDashboard,
  ArrowUpDown,
  FileText,
  BarChart3,
  Users,
  Building2,
  DollarSign,
  Gauge,
  CircleDot,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// =============================================================================
// TYPES
// =============================================================================

type ImplementationType = 'Agente' | 'Assistente' | 'Modelo ML' | 'Automacao';
type ImplementationStatus = 'Ativo' | 'Desenvolvimento' | 'Pausado' | 'Homologacao';
type AreaType = 'Comercial' | 'RH' | 'TI' | 'Financeiro' | 'Operacoes' | 'Juridico' | 'Atendimento';
type PipelineStage = 'ideacao' | 'design' | 'desenvolvimento' | 'testes' | 'homologacao' | 'producao';
type SortOption = 'name' | 'status' | 'date' | 'impact';

interface Implementation {
  id: string;
  name: string;
  description: string;
  type: ImplementationType;
  status: ImplementationStatus;
  area: AreaType;
  owner: string;
  progress: number;
  metric: { label: string; value: string };
  createdAt: string;
  impact: number; // 1-100
}

interface PipelineItem {
  id: string;
  name: string;
  type: ImplementationType;
  owner: string;
  stage: PipelineStage;
  progress: number;
  daysInStage: number;
  description: string;
}

interface ProductionItem {
  id: string;
  name: string;
  type: ImplementationType;
  version: string;
  status: 'running' | 'paused' | 'error';
  uptime: string;
  requests24h: number;
  avgLatency: string;
  errorRate: number;
  costPerDay: number;
  lastDeployed: string;
  trend: 'up' | 'down' | 'stable';
  area: AreaType;
}

interface TemplateItem {
  id: string;
  name: string;
  description: string;
  type: ImplementationType;
  category: string;
  version: string;
  timesDeployed: number;
  lastUpdated: string;
}

// =============================================================================
// CONSTANTS & CONFIG
// =============================================================================

const typeConfig: Record<ImplementationType, { icon: React.ElementType; color: string; bgColor: string; badge: 'execute' | 'plan' | 'manage' | 'info' }> = {
  Agente: { icon: Bot, color: 'text-aimana-teal', bgColor: 'bg-aimana-teal/10', badge: 'execute' },
  Assistente: { icon: Brain, color: 'text-aimana-blue', bgColor: 'bg-aimana-blue/10', badge: 'plan' },
  'Modelo ML': { icon: Cpu, color: 'text-purple-500', bgColor: 'bg-purple-500/10', badge: 'manage' },
  Automacao: { icon: Workflow, color: 'text-amber-500', bgColor: 'bg-amber-500/10', badge: 'info' },
};

const statusConfig: Record<string, { label: string; badge: 'success' | 'warning' | 'pending' | 'info' }> = {
  Ativo: { label: 'Ativo', badge: 'success' },
  Desenvolvimento: { label: 'Desenvolvimento', badge: 'info' },
  Pausado: { label: 'Pausado', badge: 'warning' },
  Homologacao: { label: 'Homologacao', badge: 'pending' },
  running: { label: 'Ativo', badge: 'success' },
  paused: { label: 'Pausado', badge: 'warning' },
  error: { label: 'Erro', badge: 'error' as 'warning' },
};

const pipelineStages: { id: PipelineStage; label: string; color: string }[] = [
  { id: 'ideacao', label: 'Ideacao', color: 'bg-purple-500' },
  { id: 'design', label: 'Design', color: 'bg-blue-500' },
  { id: 'desenvolvimento', label: 'Desenvolvimento', color: 'bg-teal-500' },
  { id: 'testes', label: 'Testes', color: 'bg-amber-500' },
  { id: 'homologacao', label: 'Homologacao', color: 'bg-emerald-500' },
  { id: 'producao', label: 'Producao', color: 'bg-green-600' },
];

const typeFilters: (ImplementationType | 'Todos')[] = ['Todos', 'Agente', 'Assistente', 'Modelo ML', 'Automacao'];
const statusFilters: (ImplementationStatus | 'Todos')[] = ['Todos', 'Ativo', 'Desenvolvimento', 'Pausado'];
const areaFilters: (AreaType | 'Todos')[] = ['Todos', 'Comercial', 'RH', 'TI', 'Financeiro', 'Operacoes', 'Juridico', 'Atendimento'];

const templateCategories = ['Todos', 'Atendimento', 'Vendas', 'Analise', 'Documentos', 'Operacoes', 'Seguranca'];

// =============================================================================
// MOCK DATA
// =============================================================================

const allImplementations: Implementation[] = [
  {
    id: 'impl-1',
    name: 'Customer Support Agent',
    description: 'Agente autonomo de atendimento ao cliente com suporte multicanal',
    type: 'Agente',
    status: 'Ativo',
    area: 'Atendimento',
    owner: 'Ana Ferreira',
    progress: 100,
    metric: { label: 'req/dia', value: '1.247' },
    createdAt: '2024-08-15',
    impact: 95,
  },
  {
    id: 'impl-2',
    name: 'Sales Assistant',
    description: 'Assistente de vendas para qualificacao de leads e propostas',
    type: 'Agente',
    status: 'Ativo',
    area: 'Comercial',
    owner: 'Carlos Lima',
    progress: 100,
    metric: { label: 'req/dia', value: '523' },
    createdAt: '2024-09-20',
    impact: 88,
  },
  {
    id: 'impl-3',
    name: 'HR Assistant',
    description: 'Assistente para processos de RH, onboarding e duvidas dos colaboradores',
    type: 'Assistente',
    status: 'Desenvolvimento',
    area: 'RH',
    owner: 'Maria Santos',
    progress: 72,
    metric: { label: 'horas salvas', value: '24/sem' },
    createdAt: '2025-01-10',
    impact: 65,
  },
  {
    id: 'impl-4',
    name: 'Meeting Summarizer',
    description: 'Resumo automatico de reunioes, atas e action items',
    type: 'Assistente',
    status: 'Desenvolvimento',
    area: 'TI',
    owner: 'Pedro Costa',
    progress: 35,
    metric: { label: 'horas salvas', value: '8/sem' },
    createdAt: '2025-01-25',
    impact: 52,
  },
  {
    id: 'impl-5',
    name: 'Email Classifier',
    description: 'Classificacao e roteamento inteligente de emails corporativos',
    type: 'Assistente',
    status: 'Homologacao',
    area: 'TI',
    owner: 'Lucas Almeida',
    progress: 90,
    metric: { label: 'emails/dia', value: '340' },
    createdAt: '2024-11-05',
    impact: 71,
  },
  {
    id: 'impl-6',
    name: 'Fraud Detection',
    description: 'Modelo de deteccao de anomalias e padroes suspeitos em transacoes',
    type: 'Modelo ML',
    status: 'Ativo',
    area: 'Financeiro',
    owner: 'Julia Mendes',
    progress: 100,
    metric: { label: 'precisao', value: '97.3%' },
    createdAt: '2024-06-12',
    impact: 98,
  },
  {
    id: 'impl-7',
    name: 'Lead Scorer',
    description: 'Pontuacao e priorizacao automatica de leads usando ML',
    type: 'Modelo ML',
    status: 'Ativo',
    area: 'Comercial',
    owner: 'Rafael Souza',
    progress: 100,
    metric: { label: 'leads/dia', value: '156' },
    createdAt: '2024-07-18',
    impact: 85,
  },
  {
    id: 'impl-8',
    name: 'Churn Predictor',
    description: 'Predicao de churn de clientes com alertas proativos',
    type: 'Modelo ML',
    status: 'Desenvolvimento',
    area: 'Comercial',
    owner: 'Fernanda Rocha',
    progress: 58,
    metric: { label: 'acuracia', value: '89%' },
    createdAt: '2025-01-03',
    impact: 79,
  },
  {
    id: 'impl-9',
    name: 'Contract Reviewer',
    description: 'Revisao automatica de clausulas contratuais e compliance',
    type: 'Automacao',
    status: 'Ativo',
    area: 'Juridico',
    owner: 'Beatriz Rocha',
    progress: 100,
    metric: { label: 'contratos/dia', value: '18' },
    createdAt: '2024-10-01',
    impact: 82,
  },
  {
    id: 'impl-10',
    name: 'Invoice Processor',
    description: 'Processamento automatico de notas fiscais e faturas',
    type: 'Automacao',
    status: 'Ativo',
    area: 'Financeiro',
    owner: 'Marcos Oliveira',
    progress: 100,
    metric: { label: 'faturas/dia', value: '85' },
    createdAt: '2024-09-05',
    impact: 90,
  },
  {
    id: 'impl-11',
    name: 'Data Insights Agent',
    description: 'Agente de analise de dados e geracao de relatorios',
    type: 'Agente',
    status: 'Ativo',
    area: 'TI',
    owner: 'Thiago Mendes',
    progress: 100,
    metric: { label: 'req/dia', value: '892' },
    createdAt: '2024-07-22',
    impact: 91,
  },
  {
    id: 'impl-12',
    name: 'Onboarding Automation',
    description: 'Fluxo automatizado de onboarding de novos colaboradores',
    type: 'Automacao',
    status: 'Pausado',
    area: 'RH',
    owner: 'Camila Duarte',
    progress: 65,
    metric: { label: 'horas salvas', value: '12/sem' },
    createdAt: '2024-12-10',
    impact: 60,
  },
  {
    id: 'impl-13',
    name: 'Demand Forecaster',
    description: 'Previsao de demanda para planejamento de estoque e producao',
    type: 'Modelo ML',
    status: 'Desenvolvimento',
    area: 'Operacoes',
    owner: 'Diego Martins',
    progress: 42,
    metric: { label: 'acuracia', value: '82%' },
    createdAt: '2025-01-15',
    impact: 73,
  },
  {
    id: 'impl-14',
    name: 'Ticket Router Agent',
    description: 'Roteamento inteligente de tickets de suporte para equipe correta',
    type: 'Agente',
    status: 'Homologacao',
    area: 'Atendimento',
    owner: 'Larissa Pinto',
    progress: 92,
    metric: { label: 'tickets/dia', value: '210' },
    createdAt: '2024-11-20',
    impact: 76,
  },
];

const pipelineItems: PipelineItem[] = [
  { id: 'p1', name: 'HR Assistant', type: 'Assistente', owner: 'Maria Santos', stage: 'testes', progress: 85, daysInStage: 3, description: 'Assistente para processos de RH' },
  { id: 'p2', name: 'Churn Predictor', type: 'Modelo ML', owner: 'Fernanda Rocha', stage: 'desenvolvimento', progress: 58, daysInStage: 12, description: 'Predicao de churn de clientes' },
  { id: 'p3', name: 'Meeting Summarizer', type: 'Assistente', owner: 'Pedro Costa', stage: 'ideacao', progress: 15, daysInStage: 5, description: 'Resumo automatico de reunioes' },
  { id: 'p4', name: 'Demand Forecaster', type: 'Modelo ML', owner: 'Diego Martins', stage: 'desenvolvimento', progress: 42, daysInStage: 8, description: 'Previsao de demanda' },
  { id: 'p5', name: 'Email Classifier', type: 'Assistente', owner: 'Lucas Almeida', stage: 'homologacao', progress: 90, daysInStage: 2, description: 'Classificacao inteligente de emails' },
  { id: 'p6', name: 'Ticket Router Agent', type: 'Agente', owner: 'Larissa Pinto', stage: 'homologacao', progress: 92, daysInStage: 4, description: 'Roteamento inteligente de tickets' },
  { id: 'p7', name: 'Sentiment Analyzer', type: 'Modelo ML', owner: 'Thiago Mendes', stage: 'design', progress: 28, daysInStage: 6, description: 'Analise de sentimento em feedbacks' },
  { id: 'p8', name: 'Compliance Checker', type: 'Automacao', owner: 'Beatriz Rocha', stage: 'testes', progress: 78, daysInStage: 5, description: 'Verificacao automatica de conformidade' },
  { id: 'p9', name: 'Knowledge Agent', type: 'Agente', owner: 'Carlos Lima', stage: 'design', progress: 32, daysInStage: 3, description: 'Agente de base de conhecimento' },
  { id: 'p10', name: 'Invoice Reconciler', type: 'Automacao', owner: 'Marcos Oliveira', stage: 'ideacao', progress: 8, daysInStage: 1, description: 'Conciliacao automatica de faturas' },
  { id: 'p11', name: 'Customer Support Agent v3', type: 'Agente', owner: 'Ana Ferreira', stage: 'producao', progress: 100, daysInStage: 0, description: 'Nova versao do agente de suporte' },
  { id: 'p12', name: 'Onboarding Automation v2', type: 'Automacao', owner: 'Camila Duarte', stage: 'testes', progress: 70, daysInStage: 7, description: 'Atualizacao do fluxo de onboarding' },
];

const productionItems: ProductionItem[] = [
  {
    id: 'prod-1', name: 'Customer Support Agent', type: 'Agente', version: 'v2.3.1',
    status: 'running', uptime: '99.8%', requests24h: 1247, avgLatency: '1.1s',
    errorRate: 0.2, costPerDay: 45.30, lastDeployed: '2025-02-01', trend: 'up', area: 'Atendimento',
  },
  {
    id: 'prod-2', name: 'Sales Assistant', type: 'Agente', version: 'v1.8.0',
    status: 'running', uptime: '99.5%', requests24h: 523, avgLatency: '2.3s',
    errorRate: 0.5, costPerDay: 28.50, lastDeployed: '2025-01-28', trend: 'up', area: 'Comercial',
  },
  {
    id: 'prod-3', name: 'Fraud Detection', type: 'Modelo ML', version: 'v4.1.0',
    status: 'running', uptime: '99.9%', requests24h: 3420, avgLatency: '0.3s',
    errorRate: 0.05, costPerDay: 72.00, lastDeployed: '2025-01-20', trend: 'up', area: 'Financeiro',
  },
  {
    id: 'prod-4', name: 'Lead Scorer', type: 'Modelo ML', version: 'v2.0.1',
    status: 'running', uptime: '99.7%', requests24h: 156, avgLatency: '0.8s',
    errorRate: 0.3, costPerDay: 15.20, lastDeployed: '2025-01-15', trend: 'stable', area: 'Comercial',
  },
  {
    id: 'prod-5', name: 'Contract Reviewer', type: 'Automacao', version: 'v1.5.2',
    status: 'running', uptime: '99.4%', requests24h: 18, avgLatency: '8.2s',
    errorRate: 0.8, costPerDay: 22.40, lastDeployed: '2025-01-10', trend: 'up', area: 'Juridico',
  },
  {
    id: 'prod-6', name: 'Invoice Processor', type: 'Automacao', version: 'v1.3.0',
    status: 'running', uptime: '99.6%', requests24h: 85, avgLatency: '3.5s',
    errorRate: 0.4, costPerDay: 18.90, lastDeployed: '2025-01-08', trend: 'stable', area: 'Financeiro',
  },
  {
    id: 'prod-7', name: 'Data Insights Agent', type: 'Agente', version: 'v3.0.0',
    status: 'running', uptime: '99.9%', requests24h: 892, avgLatency: '1.8s',
    errorRate: 0.1, costPerDay: 62.80, lastDeployed: '2025-02-03', trend: 'up', area: 'TI',
  },
  {
    id: 'prod-8', name: 'Onboarding Automation', type: 'Automacao', version: 'v1.0.3',
    status: 'paused', uptime: '98.2%', requests24h: 0, avgLatency: '5.0s',
    errorRate: 2.1, costPerDay: 0, lastDeployed: '2024-12-10', trend: 'down', area: 'RH',
  },
];

const templateItems: TemplateItem[] = [
  { id: 't1', name: 'Customer Support Agent', description: 'Agente completo de atendimento ao cliente com suporte multicanal, escalonamento e base de conhecimento', type: 'Agente', category: 'Atendimento', version: 'v2.3.1', timesDeployed: 12, lastUpdated: '2025-02-01' },
  { id: 't2', name: 'Sales Assistant', description: 'Qualificacao de leads, geracao de propostas e follow-up automatico', type: 'Agente', category: 'Vendas', version: 'v1.8.0', timesDeployed: 8, lastUpdated: '2025-01-28' },
  { id: 't3', name: 'Meeting Summarizer', description: 'Resumo inteligente de reunioes com extracao de action items e decisoes', type: 'Assistente', category: 'Operacoes', version: 'v1.0.0', timesDeployed: 3, lastUpdated: '2025-01-25' },
  { id: 't4', name: 'Email Classifier', description: 'Classificacao automatica de emails por prioridade, tema e destinatario', type: 'Assistente', category: 'Operacoes', version: 'v1.2.0', timesDeployed: 6, lastUpdated: '2025-01-15' },
  { id: 't5', name: 'Fraud Detection Model', description: 'Modelo de ML para deteccao de fraudes em transacoes financeiras em tempo real', type: 'Modelo ML', category: 'Seguranca', version: 'v4.1.0', timesDeployed: 7, lastUpdated: '2025-01-20' },
  { id: 't6', name: 'Lead Scorer Model', description: 'Modelo preditivo de pontuacao de leads baseado em comportamento e perfil', type: 'Modelo ML', category: 'Vendas', version: 'v2.0.1', timesDeployed: 9, lastUpdated: '2025-01-18' },
  { id: 't7', name: 'Contract Reviewer', description: 'Automacao de revisao de clausulas, riscos e conformidade em contratos', type: 'Automacao', category: 'Documentos', version: 'v1.5.2', timesDeployed: 5, lastUpdated: '2025-01-10' },
  { id: 't8', name: 'Invoice Processor', description: 'Processamento automatico de notas fiscais com extracao de dados e validacao', type: 'Automacao', category: 'Documentos', version: 'v1.3.0', timesDeployed: 6, lastUpdated: '2025-01-08' },
  { id: 't9', name: 'Data Insights Agent', description: 'Agente de analise de dados, geracao de relatorios e dashboards interativos', type: 'Agente', category: 'Analise', version: 'v3.0.0', timesDeployed: 15, lastUpdated: '2025-02-03' },
  { id: 't10', name: 'Ticket Router', description: 'Classificacao e roteamento inteligente de tickets de suporte para equipe correta', type: 'Agente', category: 'Atendimento', version: 'v1.5.3', timesDeployed: 10, lastUpdated: '2025-01-22' },
  { id: 't11', name: 'Churn Predictor', description: 'Modelo de predicao de churn com alertas proativos e recomendacoes de retencao', type: 'Modelo ML', category: 'Analise', version: 'v1.0.0', timesDeployed: 2, lastUpdated: '2025-01-03' },
  { id: 't12', name: 'Onboarding Flow', description: 'Automacao completa do processo de onboarding de novos colaboradores', type: 'Automacao', category: 'Operacoes', version: 'v1.0.3', timesDeployed: 4, lastUpdated: '2024-12-10' },
];

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

function TypeIcon({ type, size = 'md' }: { type: ImplementationType; size?: 'sm' | 'md' | 'lg' }) {
  const config = typeConfig[type];
  const Icon = config.icon;
  const sizeMap = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' };
  return <Icon className={cn(sizeMap[size], config.color)} />;
}

function TypeBadge({ type }: { type: ImplementationType }) {
  const config = typeConfig[type];
  return <Badge variant={config.badge} size="sm">{type}</Badge>;
}

function StatusBadgeDisplay({ status }: { status: string }) {
  const config = statusConfig[status];
  if (!config) return <Badge variant="default" size="sm">{status}</Badge>;
  return <Badge variant={config.badge} size="sm">{config.label}</Badge>;
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function AIImplementations() {
  const [activeTab, setActiveTab] = useState('visao-geral');

  // ----- Visao Geral state -----
  const [filterType, setFilterType] = useState<ImplementationType | 'Todos'>('Todos');
  const [filterStatus, setFilterStatus] = useState<ImplementationStatus | 'Todos'>('Todos');
  const [filterArea, setFilterArea] = useState<AreaType | 'Todos'>('Todos');
  const [sortBy, setSortBy] = useState<SortOption>('impact');
  const [searchQuery, setSearchQuery] = useState('');

  // ----- Producao state -----
  const [diagModalOpen, setDiagModalOpen] = useState(false);
  const [diagItem, setDiagItem] = useState<ProductionItem | null>(null);

  // ----- Repositorio state -----
  const [repoSearch, setRepoSearch] = useState('');
  const [repoCategory, setRepoCategory] = useState('Todos');
  const [repoDetailModalOpen, setRepoDetailModalOpen] = useState(false);
  const [repoDetailItem, setRepoDetailItem] = useState<TemplateItem | null>(null);

  // =========================================================================
  // COMPUTED VALUES
  // =========================================================================

  // Overview stats
  const totalImplementations = allImplementations.length;
  const activeCount = allImplementations.filter((i) => i.status === 'Ativo').length;
  const devCount = allImplementations.filter((i) => i.status === 'Desenvolvimento').length;
  const prodCount = productionItems.filter((i) => i.status === 'running').length;
  const avgSuccessRate = 91; // mock

  // Filtered implementations for Visao Geral
  const filteredImplementations = useMemo(() => {
    let items = [...allImplementations];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
      );
    }
    if (filterType !== 'Todos') {
      items = items.filter((i) => i.type === filterType);
    }
    if (filterStatus !== 'Todos') {
      items = items.filter((i) => i.status === filterStatus);
    }
    if (filterArea !== 'Todos') {
      items = items.filter((i) => i.area === filterArea);
    }

    items.sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'status': return a.status.localeCompare(b.status);
        case 'date': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'impact': return b.impact - a.impact;
        default: return 0;
      }
    });

    return items;
  }, [searchQuery, filterType, filterStatus, filterArea, sortBy]);

  // Pipeline stats per stage
  const getItemsForStage = (stageId: PipelineStage) =>
    pipelineItems.filter((i) => i.stage === stageId);

  // Production computed
  const totalRequests = productionItems.reduce((acc, i) => acc + i.requests24h, 0);
  const totalCost = productionItems.reduce((acc, i) => acc + i.costPerDay, 0);
  const runningCount = productionItems.filter((i) => i.status === 'running').length;

  // Filtered templates
  const filteredTemplates = useMemo(() => {
    return templateItems.filter((t) => {
      const matchesSearch =
        repoSearch === '' ||
        t.name.toLowerCase().includes(repoSearch.toLowerCase()) ||
        t.description.toLowerCase().includes(repoSearch.toLowerCase());
      const matchesCategory = repoCategory === 'Todos' || t.category === repoCategory;
      return matchesSearch && matchesCategory;
    });
  }, [repoSearch, repoCategory]);

  // =========================================================================
  // HANDLERS
  // =========================================================================

  const handleDiagnose = (item: ProductionItem) => {
    setDiagItem(item);
    setDiagModalOpen(true);
  };

  const handleViewTemplateDetails = (item: TemplateItem) => {
    setRepoDetailItem(item);
    setRepoDetailModalOpen(true);
  };

  // =========================================================================
  // RENDER
  // =========================================================================

  return (
    <div>
      <Header
        title="Implementacoes IA"
        subtitle="Gerencie o ciclo de vida completo das suas implementacoes de IA"
      />

      <main className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="visao-geral" icon={<LayoutDashboard className="h-4 w-4" />}>
              Visao Geral
            </TabsTrigger>
            <TabsTrigger value="pipeline" icon={<GitBranch className="h-4 w-4" />} badge={pipelineItems.length}>
              Pipeline
            </TabsTrigger>
            <TabsTrigger value="producao" icon={<Server className="h-4 w-4" />} badge={runningCount}>
              Producao
            </TabsTrigger>
            <TabsTrigger value="repositorio" icon={<Package className="h-4 w-4" />} badge={templateItems.length}>
              Repositorio
            </TabsTrigger>
          </TabsList>

          {/* ================================================================ */}
          {/* TAB 1: VISAO GERAL                                               */}
          {/* ================================================================ */}
          <TabsContent value="visao-geral">
            {/* Stats Row */}
            <div className="grid gap-4 md:grid-cols-5 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Total</p>
                      <p className="text-2xl font-bold text-text">{totalImplementations}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-aimana-teal/10 flex items-center justify-center">
                      <Layers className="h-5 w-5 text-aimana-teal" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Ativas</p>
                      <p className="text-2xl font-bold text-status-success">{activeCount}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-status-success-bg flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-status-success" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Em Desenvolvimento</p>
                      <p className="text-2xl font-bold text-text">{devCount}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-phase-execute-bg flex items-center justify-center">
                      <Cpu className="h-5 w-5 text-phase-execute" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Em Producao</p>
                      <p className="text-2xl font-bold text-text">{prodCount}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-aimana-blue/10 flex items-center justify-center">
                      <Server className="h-5 w-5 text-aimana-blue" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Taxa de Sucesso</p>
                      <p className="text-2xl font-bold text-status-success">{avgSuccessRate}%</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-status-success-bg flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-status-success" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filter Bar */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col gap-4">
                  {/* Search + Sort */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                      <Input
                        placeholder="Buscar implementacoes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="h-4 w-4 text-text-muted" />
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="h-10 rounded-lg border border-surface-border bg-white px-3 text-sm text-text focus:border-aimana-teal focus:outline-none focus:ring-2 focus:ring-aimana-teal/20"
                      >
                        <option value="impact">Maior Impacto</option>
                        <option value="name">Nome (A-Z)</option>
                        <option value="status">Status</option>
                        <option value="date">Mais Recente</option>
                      </select>
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex flex-col lg:flex-row gap-3">
                    {/* Type Filter */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">Tipo:</span>
                      {typeFilters.map((t) => (
                        <Button
                          key={t}
                          variant={filterType === t ? 'primary' : 'outline'}
                          size="sm"
                          onClick={() => setFilterType(t)}
                        >
                          {t}
                        </Button>
                      ))}
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">Status:</span>
                      {statusFilters.map((s) => (
                        <Button
                          key={s}
                          variant={filterStatus === s ? 'primary' : 'outline'}
                          size="sm"
                          onClick={() => setFilterStatus(s)}
                        >
                          {s}
                        </Button>
                      ))}
                    </div>

                    {/* Area Filter */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">Area:</span>
                      <select
                        value={filterArea}
                        onChange={(e) => setFilterArea(e.target.value as AreaType | 'Todos')}
                        className="h-8 rounded-lg border border-surface-border bg-white px-3 text-xs text-text focus:border-aimana-teal focus:outline-none focus:ring-2 focus:ring-aimana-teal/20"
                      >
                        {areaFilters.map((a) => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-text-secondary">
                {filteredImplementations.length} implementacao{filteredImplementations.length !== 1 ? 'es' : ''} encontrada{filteredImplementations.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Implementation Cards Grid */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredImplementations.map((impl) => {
                const tConfig = typeConfig[impl.type];
                return (
                  <Card key={impl.id} variant="interactive">
                    <CardContent className="p-4">
                      {/* Header */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0', tConfig.bgColor)}>
                          <TypeIcon type={impl.type} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-text truncate">{impl.name}</h3>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <TypeBadge type={impl.type} />
                            <StatusBadgeDisplay status={impl.status} />
                          </div>
                        </div>
                        <Button variant="ghost" size="icon-sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-text-secondary mb-3 line-clamp-2">{impl.description}</p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          <span>{impl.area}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{impl.owner}</span>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                          <span>Progresso</span>
                          <span>{impl.progress}%</span>
                        </div>
                        <Progress
                          value={impl.progress}
                          size="sm"
                          variant={impl.progress === 100 ? 'success' : 'default'}
                        />
                      </div>

                      {/* Key Metric + Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-surface-border">
                        <div className="flex items-center gap-1.5">
                          <Gauge className="h-3.5 w-3.5 text-aimana-teal" />
                          <span className="text-sm font-semibold text-text">{impl.metric.value}</span>
                          <span className="text-xs text-text-muted">{impl.metric.label}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon-sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon-sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {filteredImplementations.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-text-muted">
                  <Search className="h-10 w-10 mb-3 opacity-50" />
                  <p className="text-sm">Nenhuma implementacao encontrada para os filtros selecionados.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* ================================================================ */}
          {/* TAB 2: PIPELINE                                                  */}
          {/* ================================================================ */}
          <TabsContent value="pipeline">
            {/* Pipeline Stats */}
            <div className="grid gap-4 md:grid-cols-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">No Pipeline</p>
                      <p className="text-2xl font-bold text-text">{pipelineItems.length}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-phase-execute-bg flex items-center justify-center">
                      <GitBranch className="h-5 w-5 text-phase-execute" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Tempo Medio ate Producao</p>
                      <p className="text-2xl font-bold text-text">28 dias</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-status-warning-bg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-status-warning" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Prontos para Producao</p>
                      <p className="text-2xl font-bold text-status-success">
                        {pipelineItems.filter((i) => i.stage === 'homologacao' || i.stage === 'producao').length}
                      </p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-status-success-bg flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-status-success" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Tipos no Pipeline</p>
                      <div className="flex items-center gap-2 mt-1">
                        {(['Agente', 'Assistente', 'Modelo ML', 'Automacao'] as ImplementationType[]).map((t) => {
                          const count = pipelineItems.filter((i) => i.type === t).length;
                          if (count === 0) return null;
                          return (
                            <div key={t} className="flex items-center gap-1">
                              <TypeIcon type={t} size="sm" />
                              <span className="text-sm font-semibold text-text">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-aimana-teal/10 flex items-center justify-center">
                      <Layers className="h-5 w-5 text-aimana-teal" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Kanban Board */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-6">
              {pipelineStages.map((stage) => {
                const stageItems = getItemsForStage(stage.id);
                return (
                  <div key={stage.id} className="space-y-3">
                    {/* Stage Header */}
                    <div className="flex items-center gap-2 pb-2 border-b border-surface-border">
                      <div className={cn('h-2.5 w-2.5 rounded-full', stage.color)} />
                      <span className="text-sm font-semibold text-text">{stage.label}</span>
                      <Badge variant="outline" size="sm">{stageItems.length}</Badge>
                    </div>

                    {/* Stage Cards */}
                    <div className="space-y-3 min-h-[200px]">
                      {stageItems.map((item) => {
                        const tConfig = typeConfig[item.type];
                        return (
                          <Card key={item.id} variant="interactive" className="cursor-grab active:cursor-grabbing">
                            <CardContent className="p-3">
                              <div className="flex items-start gap-2 mb-2">
                                <div className={cn('flex h-6 w-6 items-center justify-center rounded-md flex-shrink-0 mt-0.5', tConfig.bgColor)}>
                                  <TypeIcon type={item.type} size="sm" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-semibold text-text truncate">{item.name}</h4>
                                  <TypeBadge type={item.type} />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs text-text-muted">
                                  <span>{item.owner}</span>
                                  <span>{item.progress}%</span>
                                </div>
                                <Progress value={item.progress} size="sm" />
                                <div className="flex items-center gap-1 text-xs text-text-muted">
                                  <Clock className="h-3 w-3" />
                                  <span>{item.daysInStage}d neste estagio</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}

                      {stageItems.length === 0 && (
                        <div className="flex items-center justify-center h-24 border border-dashed border-surface-border rounded-lg">
                          <p className="text-xs text-text-muted">Nenhum item</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* ================================================================ */}
          {/* TAB 3: PRODUCAO                                                  */}
          {/* ================================================================ */}
          <TabsContent value="producao">
            {/* Production Stats */}
            <div className="grid gap-4 md:grid-cols-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Implementacoes Ativas</p>
                      <p className="text-2xl font-bold text-text">{runningCount}/{productionItems.length}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-status-success-bg flex items-center justify-center">
                      <Activity className="h-5 w-5 text-status-success" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Requisicoes (24h)</p>
                      <p className="text-2xl font-bold text-text">{totalRequests.toLocaleString()}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-phase-execute-bg flex items-center justify-center">
                      <Zap className="h-5 w-5 text-phase-execute" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Uptime Medio</p>
                      <p className="text-2xl font-bold text-status-success">99.5%</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-status-success-bg flex items-center justify-center">
                      <Shield className="h-5 w-5 text-status-success" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Custo Diario Total</p>
                      <p className="text-2xl font-bold text-text">R$ {totalCost.toFixed(2)}</p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-status-warning-bg flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-status-warning" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* List Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text">Implementacoes em Producao</h2>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-1" />
                Atualizar
              </Button>
            </div>

            {/* Production Cards */}
            <div className="space-y-4 mb-6">
              {productionItems.map((item) => {
                const status = statusConfig[item.status];
                const tConfig = typeConfig[item.type];
                return (
                  <Card key={item.id} variant="interactive">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={cn(
                          'flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0',
                          item.status === 'running' ? tConfig.bgColor : 'bg-surface-light'
                        )}>
                          <TypeIcon
                            type={item.type}
                            size="lg"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          {/* Title Row */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold text-text">{item.name}</h3>
                              <TypeBadge type={item.type} />
                              <StatusBadgeDisplay status={item.status} />
                              <Badge variant="outline" size="sm">{item.version}</Badge>
                            </div>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Metrics Grid */}
                          <div className="grid grid-cols-6 gap-4 text-center mb-3">
                            <div>
                              <p className="text-sm font-medium text-status-success">{item.uptime}</p>
                              <p className="text-xs text-text-muted">Uptime</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-text">{item.requests24h.toLocaleString()}</p>
                              <p className="text-xs text-text-muted">Req/24h</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-text">{item.avgLatency}</p>
                              <p className="text-xs text-text-muted">Latencia</p>
                            </div>
                            <div>
                              <p className={cn(
                                'text-sm font-medium',
                                item.errorRate < 0.5 ? 'text-status-success' : item.errorRate < 1 ? 'text-status-warning' : 'text-status-error'
                              )}>{item.errorRate}%</p>
                              <p className="text-xs text-text-muted">Erros</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-text">R$ {item.costPerDay.toFixed(2)}</p>
                              <p className="text-xs text-text-muted">Custo/dia</p>
                            </div>
                            <div>
                              <div className="flex items-center justify-center gap-1">
                                {item.trend === 'up' ? (
                                  <TrendingUp className="h-4 w-4 text-status-success" />
                                ) : item.trend === 'down' ? (
                                  <TrendingDown className="h-4 w-4 text-status-error" />
                                ) : (
                                  <Activity className="h-4 w-4 text-text-muted" />
                                )}
                              </div>
                              <p className="text-xs text-text-muted">Tendencia</p>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 pt-3 border-t border-surface-border">
                            {item.status === 'running' ? (
                              <Button variant="outline" size="sm">
                                <Pause className="h-4 w-4 mr-1" />
                                Pausar
                              </Button>
                            ) : (
                              <Button variant="primary" size="sm">
                                <Play className="h-4 w-4 mr-1" />
                                Iniciar
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Logs
                            </Button>
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4 mr-1" />
                              Config
                            </Button>
                            <AIActionButton
                              label="Diagnosticar"
                              action="diagnose"
                              onClick={() => handleDiagnose(item)}
                              variant="outline"
                              size="sm"
                            />
                            <div className="flex-1" />
                            <div className="flex items-center gap-1 text-xs text-text-muted">
                              <Clock className="h-3 w-3" />
                              Deploy: {item.lastDeployed}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Alerts Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Alertas Ativos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-2 rounded-lg bg-status-error-bg">
                  <AlertTriangle className="h-5 w-5 text-status-error mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-text">Onboarding Automation com taxa de erro elevada</p>
                    <p className="text-xs text-text-secondary">Taxa de erro: 2.1% - Implementacao pausada automaticamente</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 rounded-lg bg-status-warning-bg">
                  <AlertTriangle className="h-5 w-5 text-status-warning mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-text">Contract Reviewer com latencia acima do esperado</p>
                    <p className="text-xs text-text-secondary">Latencia media: 8.2s (limite: 5s)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 rounded-lg bg-status-success-bg">
                  <CheckCircle2 className="h-5 w-5 text-status-success mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-text">Fraud Detection com performance excepcional</p>
                    <p className="text-xs text-text-secondary">Uptime 99.9%, taxa de erro 0.05% - Melhor performance do mes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================================================================ */}
          {/* TAB 4: REPOSITORIO                                               */}
          {/* ================================================================ */}
          <TabsContent value="repositorio">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <Input
                  placeholder="Buscar templates de implementacoes..."
                  value={repoSearch}
                  onChange={(e) => setRepoSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="h-4 w-4 text-text-muted" />
                {templateCategories.map((cat) => (
                  <Button
                    key={cat}
                    variant={repoCategory === cat ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setRepoCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            {/* Info Banner */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-aimana-teal/10 border border-aimana-teal/20 mb-6">
              <Archive className="h-5 w-5 text-aimana-teal flex-shrink-0" />
              <p className="text-sm text-text-secondary">
                Implementacoes aprovadas no pipeline sao adicionadas automaticamente ao repositorio como templates reutilizaveis.
                Templates incluem agentes, assistentes, modelos ML e automacoes.
              </p>
            </div>

            {/* Template Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTemplates.map((template) => {
                const tConfig = typeConfig[template.type];
                return (
                  <Card key={template.id} variant="interactive">
                    <CardContent className="p-4">
                      {/* Header */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0', tConfig.bgColor)}>
                          <TypeIcon type={template.type} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-text truncate">{template.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <TypeBadge type={template.type} />
                            <Badge variant="outline" size="sm">{template.version}</Badge>
                            <Badge variant="default" size="sm">{template.category}</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-text-secondary mb-4 line-clamp-2">{template.description}</p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-text-muted mb-4">
                        <div className="flex items-center gap-1">
                          <Layers className="h-3 w-3" />
                          <span>{template.timesDeployed}x implantado</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{template.lastUpdated}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-3 border-t border-surface-border">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Copy className="h-4 w-4 mr-1" />
                          Clonar
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewTemplateDetails(template)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Detalhes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {filteredTemplates.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-text-muted">
                  <Search className="h-10 w-10 mb-3 opacity-50" />
                  <p className="text-sm">Nenhum template encontrado para os filtros selecionados.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* ================================================================== */}
      {/* AI MODALS                                                          */}
      {/* ================================================================== */}

      {/* Diagnose Modal for Production Items */}
      <AIModal
        title={`Diagnosticar: ${diagItem?.name || ''}`}
        description="Analise de saude e performance da implementacao"
        isOpen={diagModalOpen}
        onClose={() => {
          setDiagModalOpen(false);
          setDiagItem(null);
        }}
        agentName="DiagnosticAgent"
        agentDescription="Analiso metricas, logs e performance das implementacoes em producao"
        initialMessage={
          diagItem
            ? `Diagnostico de **${diagItem.name}** (${diagItem.type} - ${diagItem.version}):\n\n` +
              `**Status:** ${statusConfig[diagItem.status]?.label || diagItem.status}\n` +
              `**Area:** ${diagItem.area}\n` +
              `**Uptime:** ${diagItem.uptime}\n` +
              `**Requisicoes (24h):** ${diagItem.requests24h.toLocaleString()}\n` +
              `**Latencia Media:** ${diagItem.avgLatency}\n` +
              `**Taxa de Erro:** ${diagItem.errorRate}%\n` +
              `**Custo/dia:** R$ ${diagItem.costPerDay.toFixed(2)}\n\n` +
              (diagItem.errorRate >= 1
                ? `**Alerta:** Taxa de erro elevada detectada. Recomendo investigar logs recentes e verificar integracao.\n\nPosso analisar padroes de erro, sugerir otimizacoes ou preparar um plano de correcao.`
                : `**Saude:** Implementacao operando dentro dos parametros normais.\n\nPosso analisar tendencias, sugerir otimizacoes de custo ou revisar configuracoes.`)
            : undefined
        }
        suggestedPrompts={[
          'Analise os padroes de erro recentes',
          'Sugira otimizacoes de performance',
          'Compare com a baseline do mes anterior',
          'Prepare um relatorio de saude completo',
        ]}
      />

      {/* Template Detail Modal */}
      <AIModal
        title={`Detalhes: ${repoDetailItem?.name || ''}`}
        description="Informacoes completas do template"
        isOpen={repoDetailModalOpen}
        onClose={() => {
          setRepoDetailModalOpen(false);
          setRepoDetailItem(null);
        }}
        agentName="RepositoryAgent"
        agentDescription="Forneco informacoes detalhadas sobre templates de implementacoes"
        initialMessage={
          repoDetailItem
            ? `**${repoDetailItem.name}** (${repoDetailItem.version})\n\n` +
              `**Tipo:** ${repoDetailItem.type}\n` +
              `**Categoria:** ${repoDetailItem.category}\n` +
              `**Descricao:** ${repoDetailItem.description}\n` +
              `**Vezes implantado:** ${repoDetailItem.timesDeployed}\n` +
              `**Ultima atualizacao:** ${repoDetailItem.lastUpdated}\n\n` +
              `Posso ajudar a clonar este template, personalizar configuracoes ou comparar com outros templates do mesmo tipo.`
            : undefined
        }
        suggestedPrompts={[
          'Quais configuracoes posso personalizar?',
          'Compare com outros templates da mesma categoria',
          'Quais sao os pre-requisitos para implantacao?',
          'Sugira melhorias para este template',
        ]}
      />
    </div>
  );
}
