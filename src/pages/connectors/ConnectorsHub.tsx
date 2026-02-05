/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Connectors Hub Page
 * Gerenciamento de conectores MCP e fontes de dados
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
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Data source types
const sourceTypes = [
  { id: 'database', name: 'Banco de Dados', icon: Database },
  { id: 'api', name: 'API REST', icon: Cloud },
  { id: 'spreadsheet', name: 'Planilhas', icon: FileSpreadsheet },
  { id: 'email', name: 'E-mail', icon: Mail },
  { id: 'chat', name: 'Chat/Messaging', icon: MessageSquare },
  { id: 'calendar', name: 'Calendário', icon: Calendar },
  { id: 'storage', name: 'Storage', icon: FolderOpen },
];

// Mock connectors
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

export function ConnectorsHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

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

  return (
    <div>
      <Header
        title="Conectores & Dados"
        subtitle="Gerencie fontes de dados e conectores MCP"
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
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-aimana-navy/10">
                  <Shield className="h-5 w-5 text-aimana-navy" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-text">Trust Layer</p>
                  <p className="text-xs text-status-success">Ativo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Connectors List */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
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
                <Button variant="primary" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Novo Conector
                </Button>
              </div>
            </div>

            {/* Connectors Cards */}
            <div className="space-y-4">
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
                        {/* Icon */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-light">
                          <TypeIcon className="h-6 w-6 text-aimana-navy" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-text truncate">{connector.name}</h3>
                            <div className={cn('h-2 w-2 rounded-full', status.color)} />
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
                              <span>{connector.tables} tabelas/objetos</span>
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
                                  <Badge key={agent} variant="outline" size="sm">
                                    {agent}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Badge variant={connector.status === 'connected' ? 'success' : connector.status === 'error' ? 'error' : 'warning'}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {status.label}
                          </Badge>
                          <Button variant="ghost" size="icon-sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Trust Layer Card */}
            <Card className="border-l-4 border-l-aimana-navy">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-aimana-navy" />
                  <CardTitle className="text-base">Trust Layer</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text-secondary mb-4">
                  Políticas de governança aplicadas automaticamente aos dados.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-status-success" />
                    <span>Classificação de sensibilidade</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-status-success" />
                    <span>Mascaramento de PII</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-status-success" />
                    <span>Logs de auditoria</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-status-success" />
                    <span>Controle de acesso por agente</span>
                  </li>
                </ul>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Configurar Políticas
                </Button>
              </CardContent>
            </Card>

            {/* Agent Permissions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Permissões por Agente</CardTitle>
                <CardDescription>Quais agentes podem acessar cada fonte</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { agent: 'MaturityDiagnosticAgent', sources: 2, write: false },
                    { agent: 'OpportunityMiningAgent', sources: 3, write: false },
                    { agent: 'ValueAndROIAgent', sources: 2, write: true },
                    { agent: 'ExecutiveReportAgent', sources: 4, write: false },
                  ].map((item) => (
                    <div key={item.agent} className="flex items-center justify-between py-2 border-b border-surface-border last:border-0">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 text-aimana-teal" />
                        <span className="text-sm text-text">{item.agent}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" size="sm">
                          {item.sources} fontes
                        </Badge>
                        {item.write ? (
                          <Badge variant="warning" size="sm">R/W</Badge>
                        ) : (
                          <Badge variant="outline" size="sm">Read</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-3">
                  Ver Matriz Completa
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            {/* Add New Connector */}
            <Card className="bg-gradient-header text-white">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Adicionar Conector</h3>
                <p className="text-sm text-white/70 mb-4">
                  O MCPConfigAgent pode ajudar a configurar novos conectores.
                </p>
                <Button variant="primary" size="sm" className="w-full">
                  <Plus className="h-4 w-4 mr-1" />
                  Novo Conector
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
