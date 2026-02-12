/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Connectors Hub Page
 * Gerenciamento de conectores MCP e fontes de dados
 *
 * REESTRUTURADO:
 * - Trust Agent claramente identificado como agente de segurança
 * - Seção de configuração de segurança pelo time de segurança
 * - Matriz agente x fonte de dados
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState } from 'react';
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
  Database,
  Cloud,
  FileSpreadsheet,
  Mail,
  MessageSquare,
  Calendar,
  FolderOpen,
  Plus,
  Settings,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  RefreshCw,
  Shield,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Bot,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Activity,
  FileText,
  AlertTriangle,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Users,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// DADOS MOCK
// ============================================================================

const sourceTypes = [
  { id: 'database', name: 'Banco de Dados', icon: Database },
  { id: 'api', name: 'API REST', icon: Cloud },
  { id: 'spreadsheet', name: 'Planilhas', icon: FileSpreadsheet },
  { id: 'email', name: 'E-mail', icon: Mail },
  { id: 'chat', name: 'Chat/Messaging', icon: MessageSquare },
  { id: 'calendar', name: 'Calendário', icon: Calendar },
  { id: 'storage', name: 'Storage', icon: FolderOpen },
];

const connectors = [
  {
    id: 1,
    name: 'PostgreSQL - Produção',
    type: 'database',
    status: 'connected',
    lastSync: '2024-01-15 14:30',
    sensitivity: 'confidential',
    tables: 45,
    agents: ['MaturityDiagnosticAgent', 'ValueAndROIAgent'],
  },
  {
    id: 2,
    name: 'Salesforce CRM',
    type: 'api',
    status: 'connected',
    lastSync: '2024-01-15 14:25',
    sensitivity: 'internal',
    tables: 28,
    agents: ['OpportunityMiningAgent'],
  },
  {
    id: 3,
    name: 'Google Sheets - Reports',
    type: 'spreadsheet',
    status: 'connected',
    lastSync: '2024-01-15 10:00',
    sensitivity: 'internal',
    tables: 12,
    agents: ['ExecutiveReportAgent'],
  },
  {
    id: 4,
    name: 'Microsoft 365 - Email',
    type: 'email',
    status: 'error',
    lastSync: '2024-01-14 18:00',
    sensitivity: 'confidential',
    error: 'Token expirado. Reconecte para renovar.',
    agents: [],
  },
  {
    id: 5,
    name: 'Slack Workspace',
    type: 'chat',
    status: 'configuring',
    sensitivity: 'internal',
    agents: [],
  },
  {
    id: 6,
    name: 'AWS S3 - Documents',
    type: 'storage',
    status: 'connected',
    lastSync: '2024-01-15 12:00',
    sensitivity: 'restricted',
    tables: 156,
    agents: ['DataReadinessAgent'],
  },
];

// Trust Agent security policies
const securityPolicies = [
  {
    id: 1,
    name: 'Mascaramento de PII',
    description: 'Dados pessoais (CPF, email, telefone) são automaticamente mascarados antes de enviar para LLMs',
    status: 'active',
    scope: 'Todos os conectores',
    lastUpdated: '2024-01-15',
  },
  {
    id: 2,
    name: 'Bloqueio de Dados Restritos',
    description: 'Fontes classificadas como "Restrito" não podem ser acessadas por LLMs externos',
    status: 'active',
    scope: 'Fontes restritas',
    lastUpdated: '2024-01-10',
  },
  {
    id: 3,
    name: 'Audit Log Obrigatório',
    description: 'Toda chamada de agente a uma fonte de dados gera log de auditoria',
    status: 'active',
    scope: 'Todos os agentes',
    lastUpdated: '2024-01-08',
  },
  {
    id: 4,
    name: 'Rate Limiting por Agente',
    description: 'Limita o número de chamadas por minuto que cada agente pode fazer',
    status: 'active',
    scope: 'Todos os agentes',
    lastUpdated: '2024-01-12',
  },
  {
    id: 5,
    name: 'Validação de Output',
    description: 'Respostas de LLMs são validadas antes de serem exibidas ao usuário',
    status: 'warning',
    scope: 'Agentes públicos',
    lastUpdated: '2024-01-05',
  },
];

// Agent-Source permission matrix
const agentPermissions = [
  {
    agent: 'MaturityDiagnosticAgent',
    permissions: [
      { source: 'PostgreSQL - Produção', access: 'read', approved: true },
      { source: 'Salesforce CRM', access: 'none', approved: false },
      { source: 'Google Sheets', access: 'read', approved: true },
    ],
  },
  {
    agent: 'OpportunityMiningAgent',
    permissions: [
      { source: 'PostgreSQL - Produção', access: 'read', approved: true },
      { source: 'Salesforce CRM', access: 'read', approved: true },
      { source: 'Google Sheets', access: 'read', approved: true },
    ],
  },
  {
    agent: 'ValueAndROIAgent',
    permissions: [
      { source: 'PostgreSQL - Produção', access: 'read/write', approved: true },
      { source: 'Salesforce CRM', access: 'read', approved: true },
      { source: 'Google Sheets', access: 'read/write', approved: true },
    ],
  },
  {
    agent: 'ExecutiveReportAgent',
    permissions: [
      { source: 'PostgreSQL - Produção', access: 'read', approved: true },
      { source: 'Salesforce CRM', access: 'read', approved: true },
      { source: 'Google Sheets', access: 'read/write', approved: true },
    ],
  },
];

// Audit log entries
const auditEntries = [
  { id: 1, agent: 'ValueAndROIAgent', action: 'Leitura', source: 'PostgreSQL', timestamp: '14:30:15', status: 'allowed', details: '12 registros acessados' },
  { id: 2, agent: 'OpportunityMiningAgent', action: 'Leitura', source: 'Salesforce CRM', timestamp: '14:28:42', status: 'allowed', details: '5 oportunidades consultadas' },
  { id: 3, agent: 'DataReadinessAgent', action: 'Leitura', source: 'AWS S3', timestamp: '14:25:10', status: 'blocked', details: 'Tentou acessar pasta restrita /financeiro' },
  { id: 4, agent: 'ExecutiveReportAgent', action: 'Escrita', source: 'Google Sheets', timestamp: '14:20:30', status: 'allowed', details: 'Relatório atualizado' },
  { id: 5, agent: 'MaturityDiagnosticAgent', action: 'Leitura', source: 'PostgreSQL', timestamp: '14:15:05', status: 'allowed', details: '3 tabelas consultadas' },
];

const statusConfig = {
  connected: { label: 'Conectado', color: 'bg-status-success', icon: CheckCircle2 },
  error: { label: 'Erro', color: 'bg-status-error', icon: AlertCircle },
  configuring: { label: 'Configurando', color: 'bg-status-warning', icon: Clock },
  disconnected: { label: 'Desconectado', color: 'bg-gray-400', icon: AlertCircle },
};

const sensitivityConfig = {
  public: { label: 'Público', color: 'text-status-success', icon: Unlock },
  internal: { label: 'Interno', color: 'text-aimana-blue', icon: Eye },
  confidential: { label: 'Confidencial', color: 'text-status-warning', icon: EyeOff },
  restricted: { label: 'Restrito', color: 'text-status-error', icon: Lock },
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export function ConnectorsHub() {
  const [activeTab, setActiveTab] = useState('connectors');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiModalContext, setAIModalContext] = useState({ title: '', context: '' });

  const filteredConnectors = connectors.filter((c) => {
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedType && c.type !== selectedType) return false;
    return true;
  });

  const stats = {
    total: connectors.length,
    connected: connectors.filter((c) => c.status === 'connected').length,
    errors: connectors.filter((c) => c.status === 'error').length,
  };

  const openAIModal = (title: string, context: string) => {
    setAIModalContext({ title, context });
    setShowAIModal(true);
  };

  return (
    <div>
      <Header
        title="Conectores & Dados"
        subtitle="Gerencie fontes de dados, conectores MCP e políticas de segurança"
      />

      <main className="p-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-aimana-teal/10">
                  <Database className="h-5 w-5 text-aimana-teal" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">{stats.total}</p>
                  <p className="text-xs text-text-muted">Conectores</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-status-success-bg">
                  <CheckCircle2 className="h-5 w-5 text-status-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">{stats.connected}</p>
                  <p className="text-xs text-text-muted">Conectados</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-status-error-bg">
                  <AlertCircle className="h-5 w-5 text-status-error" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">{stats.errors}</p>
                  <p className="text-xs text-text-muted">Com Erro</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-aimana-navy">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-aimana-navy/10">
                  <ShieldCheck className="h-5 w-5 text-aimana-navy" />
                </div>
                <div>
                  <p className="text-sm font-bold text-text">Trust Agent</p>
                  <p className="text-xs text-status-success flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-status-success animate-pulse" />
                    Ativo e monitorando
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="connectors">
              <Database className="h-4 w-4 mr-2" />
              Conectores
            </TabsTrigger>
            <TabsTrigger value="trust-agent">
              <Shield className="h-4 w-4 mr-2" />
              Trust Agent
            </TabsTrigger>
            <TabsTrigger value="permissions">
              <Users className="h-4 w-4 mr-2" />
              Permissões
            </TabsTrigger>
            <TabsTrigger value="audit">
              <FileText className="h-4 w-4 mr-2" />
              Auditoria
            </TabsTrigger>
          </TabsList>

          {/* ================================================================ */}
          {/* ABA 1: CONECTORES */}
          {/* ================================================================ */}
          <TabsContent value="connectors" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-2 overflow-x-auto">
                <Button
                  variant={selectedType === null ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedType(null)}
                >
                  Todos
                </Button>
                {sourceTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedType(type.id)}
                  >
                    <type.icon className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">{type.name}</span>
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftElement={<Search className="h-4 w-4" />}
                  inputSize="sm"
                  className="w-48"
                />
                <AIActionButton
                  label="Configurar com IA"
                  icon={<Sparkles className="h-4 w-4" />}
                  onClick={() => openAIModal('MCPConfigAgent', 'configure-connector')}
                  size="sm"
                />
                <Button variant="primary" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Novo Conector
                </Button>
              </div>
            </div>

            {/* Connectors Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              {filteredConnectors.map((connector) => {
                const type = sourceTypes.find((t) => t.id === connector.type);
                const status = statusConfig[connector.status as keyof typeof statusConfig];
                const sensitivity = sensitivityConfig[connector.sensitivity as keyof typeof sensitivityConfig];
                const StatusIcon = status.icon;
                const SensitivityIcon = sensitivity.icon;
                const TypeIcon = type?.icon || Database;

                return (
                  <Card key={connector.id} variant="interactive">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-light">
                          <TypeIcon className="h-6 w-6 text-aimana-navy" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-text truncate">{connector.name}</h3>
                            <Badge variant={connector.status === 'connected' ? 'success' : connector.status === 'error' ? 'error' : 'warning'} size="sm">
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {status.label}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary mb-2">
                            <span className="flex items-center gap-1">
                              <SensitivityIcon className={cn('h-3 w-3', sensitivity.color)} />
                              {sensitivity.label}
                            </span>
                            {connector.lastSync && (
                              <span className="flex items-center gap-1">
                                <RefreshCw className="h-3 w-3" />
                                {connector.lastSync}
                              </span>
                            )}
                            {connector.tables && (
                              <span>{connector.tables} objetos</span>
                            )}
                          </div>

                          {connector.error && (
                            <div className="rounded-lg bg-status-error-bg p-2 text-sm text-status-error mb-2">
                              {connector.error}
                            </div>
                          )}

                          {connector.agents && connector.agents.length > 0 && (
                            <div className="flex items-center gap-2">
                              <Bot className="h-3 w-3 text-text-muted" />
                              <div className="flex flex-wrap gap-1">
                                {connector.agents.map((agent) => (
                                  <Badge key={agent} variant="outline" size="sm" className="text-xs">
                                    {agent}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <Button variant="ghost" size="icon-sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* Add New Card */}
              <Card className="border-2 border-dashed border-surface-border hover:border-aimana-teal/50 transition-colors cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[160px]">
                  <div className="h-12 w-12 rounded-full bg-aimana-teal/10 flex items-center justify-center mb-3">
                    <Plus className="h-6 w-6 text-aimana-teal" />
                  </div>
                  <p className="font-medium text-text">Adicionar Conector</p>
                  <p className="text-xs text-text-muted mt-1">MCPConfigAgent ajuda na configuração</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ================================================================ */}
          {/* ABA 2: TRUST AGENT */}
          {/* ================================================================ */}
          <TabsContent value="trust-agent" className="space-y-6">
            {/* Trust Agent Hero */}
            <Card className="bg-gradient-to-r from-aimana-navy to-aimana-navy/90 text-white overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 flex-shrink-0">
                    <ShieldCheck className="h-8 w-8 text-aimana-teal" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold">Trust Agent</h2>
                      <Badge className="bg-status-success/20 text-status-success border-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-status-success mr-1 animate-pulse" />
                        Ativo
                      </Badge>
                    </div>
                    <p className="text-white/80 mb-4 max-w-2xl">
                      O Trust Agent é um <strong>agente de IA dedicado à segurança</strong> que monitora e controla
                      automaticamente todas as interações entre os agentes da plataforma e as fontes de dados conectadas.
                      Ele garante que nenhum dado sensível vaze para LLMs não autorizados e aplica as políticas de governança
                      definidas pelo time de segurança da empresa.
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-aimana-teal" />
                        <span>1.247 verificações hoje</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldAlert className="h-4 w-4 text-status-warning" />
                        <span>3 bloqueios</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-aimana-teal" />
                        <span>&lt;50ms latência média</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Como funciona */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-aimana-teal/10 flex items-center justify-center">
                      <Eye className="h-5 w-5 text-aimana-teal" />
                    </div>
                    <h3 className="font-semibold text-text">Interceptação</h3>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Toda chamada de um agente a uma fonte de dados passa pelo Trust Agent, que valida
                    permissões e classifica os dados antes de permitir o acesso.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-status-warning/10 flex items-center justify-center">
                      <ShieldAlert className="h-5 w-5 text-status-warning" />
                    </div>
                    <h3 className="font-semibold text-text">Proteção</h3>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Mascara dados sensíveis (PII, financeiros), bloqueia acessos não autorizados
                    e impede que dados restritos cheguem a LLMs externos.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-phase-plan/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-phase-plan" />
                    </div>
                    <h3 className="font-semibold text-text">Auditoria</h3>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Registra cada interação em log detalhado para compliance e auditoria.
                    Relatórios de segurança gerados automaticamente.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Políticas de Segurança */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Políticas de Segurança</CardTitle>
                    <CardDescription>Configuradas pelo time de segurança da empresa</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <AIActionButton
                      label="Sugerir Políticas"
                      icon={<Sparkles className="h-4 w-4" />}
                      onClick={() => openAIModal('Trust Agent - Sugestão', 'suggest-policies')}
                      size="sm"
                    />
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Nova Política
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {securityPolicies.map((policy) => (
                    <div
                      key={policy.id}
                      className="flex items-start gap-4 p-4 rounded-lg border border-surface-border hover:border-aimana-teal/30 transition-colors"
                    >
                      <div className={cn(
                        'h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0',
                        policy.status === 'active' ? 'bg-status-success-bg' : 'bg-status-warning-bg'
                      )}>
                        {policy.status === 'active' ? (
                          <ShieldCheck className="h-4 w-4 text-status-success" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-status-warning" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-text">{policy.name}</h4>
                          <Badge variant={policy.status === 'active' ? 'success' : 'warning'} size="sm">
                            {policy.status === 'active' ? 'Ativa' : 'Atenção'}
                          </Badge>
                        </div>
                        <p className="text-sm text-text-secondary">{policy.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-text-muted">
                          <span>Escopo: {policy.scope}</span>
                          <span>Atualizada: {policy.lastUpdated}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        {policy.status === 'active' ? (
                          <ToggleRight className="h-6 w-6 text-status-success" />
                        ) : (
                          <ToggleLeft className="h-6 w-6 text-text-muted" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Nota sobre configuração */}
                <div className="mt-6 p-4 rounded-lg bg-aimana-navy/5 border border-aimana-navy/10">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-aimana-navy mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-text">Configuração pelo Time de Segurança</p>
                      <p className="text-sm text-text-secondary mt-1">
                        As políticas do Trust Agent devem ser configuradas e aprovadas pelo time de segurança
                        da informação da empresa. O Trust Agent executa essas políticas automaticamente em todas
                        as interações dos agentes com as fontes de dados.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ================================================================ */}
          {/* ABA 3: PERMISSÕES */}
          {/* ================================================================ */}
          <TabsContent value="permissions" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-text">Matriz Agente × Fonte de Dados</h2>
                <p className="text-sm text-text-secondary">Defina quais agentes podem acessar quais fontes e com qual tipo de permissão</p>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-1" />
                Editar Permissões
              </Button>
            </div>

            {/* Matrix Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-surface-border bg-surface-light">
                        <th className="text-left p-4 text-sm font-medium text-text-muted">Agente</th>
                        {['PostgreSQL', 'Salesforce CRM', 'Google Sheets'].map((source) => (
                          <th key={source} className="text-center p-4 text-sm font-medium text-text-muted">
                            {source}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {agentPermissions.map((agent, idx) => (
                        <tr key={idx} className="border-b border-surface-border last:border-0 hover:bg-surface-light/50">
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Bot className="h-4 w-4 text-aimana-teal" />
                              <span className="text-sm font-medium text-text">{agent.agent}</span>
                            </div>
                          </td>
                          {agent.permissions.map((perm, pidx) => (
                            <td key={pidx} className="p-4 text-center">
                              {perm.access === 'none' ? (
                                <Badge variant="secondary" size="sm" className="text-xs">
                                  Sem acesso
                                </Badge>
                              ) : (
                                <Badge
                                  variant={perm.access === 'read/write' ? 'warning' : 'success'}
                                  size="sm"
                                  className="text-xs"
                                >
                                  {perm.access === 'read/write' ? 'Leitura/Escrita' : 'Leitura'}
                                </Badge>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Sensitivity Overview */}
            <div className="grid gap-4 md:grid-cols-4">
              {Object.entries(sensitivityConfig).map(([key, config]) => {
                const SensIcon = config.icon;
                const count = connectors.filter((c) => c.sensitivity === key).length;
                return (
                  <Card key={key}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <SensIcon className={cn('h-5 w-5', config.color)} />
                        <div>
                          <p className="text-sm font-medium text-text">{config.label}</p>
                          <p className="text-xs text-text-muted">{count} fonte{count !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* ================================================================ */}
          {/* ABA 4: AUDITORIA */}
          {/* ================================================================ */}
          <TabsContent value="audit" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-text">Log de Auditoria</h2>
                <p className="text-sm text-text-secondary">Registro de todas as interações entre agentes e fontes de dados</p>
              </div>
              <div className="flex items-center gap-2">
                <AIActionButton
                  label="Análise de Segurança"
                  icon={<Sparkles className="h-4 w-4" />}
                  onClick={() => openAIModal('Análise de Segurança', 'security-analysis')}
                  size="sm"
                />
                <Button variant="outline" size="sm">
                  Exportar Log
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Verificações Hoje</p>
                      <p className="text-2xl font-bold text-text">1.247</p>
                    </div>
                    <Activity className="h-8 w-8 text-aimana-teal/30" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Acessos Permitidos</p>
                      <p className="text-2xl font-bold text-status-success">1.244</p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-status-success/30" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-muted">Acessos Bloqueados</p>
                      <p className="text-2xl font-bold text-status-error">3</p>
                    </div>
                    <ShieldAlert className="h-8 w-8 text-status-error/30" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Audit Log Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-surface-border bg-surface-light">
                        <th className="text-left p-4 text-xs font-medium text-text-muted">HORÁRIO</th>
                        <th className="text-left p-4 text-xs font-medium text-text-muted">AGENTE</th>
                        <th className="text-left p-4 text-xs font-medium text-text-muted">AÇÃO</th>
                        <th className="text-left p-4 text-xs font-medium text-text-muted">FONTE</th>
                        <th className="text-left p-4 text-xs font-medium text-text-muted">STATUS</th>
                        <th className="text-left p-4 text-xs font-medium text-text-muted">DETALHES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditEntries.map((entry) => (
                        <tr key={entry.id} className="border-b border-surface-border last:border-0 hover:bg-surface-light/50">
                          <td className="p-4 text-sm text-text-muted font-mono">{entry.timestamp}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Bot className="h-3 w-3 text-aimana-teal" />
                              <span className="text-sm text-text">{entry.agent}</span>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-text">{entry.action}</td>
                          <td className="p-4 text-sm text-text">{entry.source}</td>
                          <td className="p-4">
                            <Badge
                              variant={entry.status === 'allowed' ? 'success' : 'error'}
                              size="sm"
                            >
                              {entry.status === 'allowed' ? 'Permitido' : 'Bloqueado'}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-text-secondary">{entry.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* AI Modal */}
      <AIModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        title={aiModalContext.title}
        initialPrompt={
          aiModalContext.context === 'configure-connector'
            ? 'Ajude-me a configurar um novo conector MCP. Qual tipo de fonte de dados você deseja conectar?'
            : aiModalContext.context === 'suggest-policies'
            ? 'Analise as fontes de dados conectadas e sugira políticas de segurança adicionais baseadas nas melhores práticas.'
            : 'Analise o log de auditoria e identifique padrões de acesso incomuns ou potenciais riscos de segurança.'
        }
      />
    </div>
  );
}
