/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - AI Sandbox (Unified)
 * Experimente, prototipe e teste soluções de IA
 *
 * Combina o AI Sandbox (experimentação/chat) com o Agent Studio (criação/teste)
 * em 4 abas:
 *   1. Experimentar - Chat com modelos de IA e contextos
 *   2. Agent Studio - Galeria de templates de agentes
 *   3. Construir    - Builder visual de agente
 *   4. Testar       - Interface de teste com debug
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
} from '@/components/ui';
import {
  Send,
  Bot,
  Sparkles,
  Settings,
  History,
  Plus,
  ChevronDown,
  ChevronUp,
  Copy,
  RotateCcw,
  Trash2,
  FileText,
  Code,
  MessageSquare,
  Zap,
  Search,
  Play,
  Pause,
  Save,
  Download,
  Upload,
  ArrowRight,
  Database,
  GraduationCap,
  BarChart3,
  Shield,
  Activity,
  Users,
  Eye,
  Network,
  Lightbulb,
  Wrench,
  FileSearch,
  Check,
  X,
  Terminal,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Grid3X3,
  List,
  BookOpen,
  Layers,
  Globe,
  Lock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES
// ============================================================================

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface SandboxMessage extends ChatMessage {
  id: number;
  model?: string;
  timestamp: Date;
}

// ============================================================================
// DADOS MOCK - SANDBOX (Experimentar)
// ============================================================================

const models = [
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', color: 'bg-green-500' },
  { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic', color: 'bg-orange-500' },
  { id: 'gemini', name: 'Gemini Pro', provider: 'Google', color: 'bg-blue-500' },
];

const contexts = [
  { id: 'general', name: 'Geral', icon: MessageSquare, description: 'Conversação livre' },
  { id: 'analysis', name: 'Análise', icon: FileText, description: 'Análise de documentos' },
  { id: 'code', name: 'Código', icon: Code, description: 'Geração e revisão de código' },
  { id: 'strategy', name: 'Estratégia', icon: Zap, description: 'Planejamento estratégico' },
];

const mockHistory = [
  { id: 1, title: 'Análise de concorrência', date: '2024-01-15', messages: 12 },
  { id: 2, title: 'Brainstorm de features', date: '2024-01-14', messages: 8 },
  { id: 3, title: 'Revisão de código API', date: '2024-01-13', messages: 15 },
];

// ============================================================================
// DADOS MOCK - AGENT STUDIO (Templates / Construir / Testar)
// ============================================================================

const prebuiltAgents = [
  // Educacional
  {
    id: 'lifow',
    name: 'LIFOW',
    description: 'Assistente educacional 24/7 que ajuda funcionários a aprender sobre IA através de conteúdo personalizado',
    category: 'Educacional',
    categoryColor: 'bg-purple-500',
    icon: GraduationCap,
    status: 'available',
    complexity: 'medium',
    useCases: ['Treinamento', 'Onboarding', 'FAQ'],
    tools: ['RAG', 'Quiz Generation'],
  },
  // Autônomo
  {
    id: 'diagnostico',
    name: 'Agente Diagnóstico',
    description: 'Avalia maturidade de IA da empresa através de conversas estruturadas e gera relatórios detalhados',
    category: 'Autônomo',
    categoryColor: 'bg-orange-500',
    icon: Activity,
    status: 'available',
    complexity: 'high',
    useCases: ['Assessment', 'Consultoria', 'Planejamento'],
    tools: ['Survey Engine', 'Report Generator'],
  },
  {
    id: 'oportunidades',
    name: 'Agente Oportunidades',
    description: 'Mapeia onde IA pode gerar mais valor analisando processos e cargos da empresa',
    category: 'Autônomo',
    categoryColor: 'bg-orange-500',
    icon: Lightbulb,
    status: 'available',
    complexity: 'high',
    useCases: ['Discovery', 'ROI Analysis', 'Priorização'],
    tools: ['Process Mining', 'Job Analysis'],
  },
  {
    id: 'data-scanner',
    name: 'Data Scanner',
    description: 'Escaneia e avalia qualidade dos dados da empresa para projetos de IA',
    category: 'Autônomo',
    categoryColor: 'bg-orange-500',
    icon: FileSearch,
    status: 'available',
    complexity: 'high',
    useCases: ['Data Quality', 'Compliance', 'Inventário'],
    tools: ['Data Profiler', 'Schema Analyzer'],
  },
  {
    id: 'orquestrador',
    name: 'Orquestrador',
    description: 'Coordena todos os agentes da plataforma para tarefas complexas',
    category: 'Autônomo',
    categoryColor: 'bg-orange-500',
    icon: Network,
    status: 'coming_soon',
    complexity: 'expert',
    useCases: ['Workflow', 'Multi-agent', 'Automação'],
    tools: ['Agent Routing', 'Task Planning'],
  },
  // Gerativo
  {
    id: 'governance-bot',
    name: 'Governance Bot',
    description: 'Gera políticas e documentos de governança de IA automaticamente',
    category: 'Gerativo',
    categoryColor: 'bg-green-500',
    icon: Shield,
    status: 'available',
    complexity: 'medium',
    useCases: ['Compliance', 'Documentação', 'Políticas'],
    tools: ['Document Generator', 'Template Engine'],
  },
  {
    id: 'builder-ia',
    name: 'Builder IA',
    description: 'Ajuda a construir novos agentes através de conversa assistida',
    category: 'Gerativo',
    categoryColor: 'bg-green-500',
    icon: Wrench,
    status: 'available',
    complexity: 'low',
    useCases: ['Criação', 'Prototipação', 'Customização'],
    tools: ['Prompt Engineering', 'Config Generator'],
  },
  {
    id: 'report-bot',
    name: 'Report Bot',
    description: 'Gera relatórios executivos automáticos sobre o programa de IA',
    category: 'Gerativo',
    categoryColor: 'bg-green-500',
    icon: FileText,
    status: 'available',
    complexity: 'medium',
    useCases: ['Reporting', 'Dashboards', 'Insights'],
    tools: ['Data Aggregator', 'Chart Generator'],
  },
  // Analítico
  {
    id: 'stack-advisor',
    name: 'Stack Advisor',
    description: 'Recomenda ferramentas e tecnologias de IA baseado no perfil da empresa',
    category: 'Analítico',
    categoryColor: 'bg-blue-500',
    icon: Database,
    status: 'available',
    complexity: 'medium',
    useCases: ['Tech Selection', 'Benchmark', 'Migração'],
    tools: ['Vendor Database', 'Comparison Engine'],
  },
  {
    id: 'roi-engine',
    name: 'ROI Engine',
    description: 'Calcula e projeta retorno sobre investimento em iniciativas de IA',
    category: 'Analítico',
    categoryColor: 'bg-blue-500',
    icon: BarChart3,
    status: 'available',
    complexity: 'high',
    useCases: ['ROI', 'Business Case', 'Forecasting'],
    tools: ['Financial Model', 'Scenario Planner'],
  },
  // Monitoramento
  {
    id: 'health-monitor',
    name: 'Health Monitor',
    description: 'Monitora saúde e performance dos agentes em produção',
    category: 'Monitoramento',
    categoryColor: 'bg-cyan-500',
    icon: Activity,
    status: 'available',
    complexity: 'medium',
    useCases: ['Monitoring', 'Alertas', 'Diagnóstico'],
    tools: ['Metrics Collector', 'Alert Engine'],
  },
  {
    id: 'command-center',
    name: 'Command Center',
    description: 'Central de comando para monitorar toda a operação de IA',
    category: 'Monitoramento',
    categoryColor: 'bg-cyan-500',
    icon: Eye,
    status: 'coming_soon',
    complexity: 'expert',
    useCases: ['Operations', 'Dashboard', 'Control'],
    tools: ['Event Stream', 'Control Panel'],
  },
  {
    id: 'adoption-sensor',
    name: 'Adoption Sensor',
    description: 'Mede e analisa adoção real de IA pelos funcionários',
    category: 'Monitoramento',
    categoryColor: 'bg-cyan-500',
    icon: Users,
    status: 'available',
    complexity: 'medium',
    useCases: ['Adoption', 'Engagement', 'Feedback'],
    tools: ['Usage Analytics', 'Survey Engine'],
  },
  {
    id: 'trust-agent',
    name: 'Trust Agent',
    description: 'Agente de segurança que monitora compliance e protege dados',
    category: 'Monitoramento',
    categoryColor: 'bg-cyan-500',
    icon: Shield,
    status: 'available',
    complexity: 'high',
    useCases: ['Security', 'Compliance', 'Audit'],
    tools: ['PII Detector', 'Access Control'],
  },
  // Coaching
  {
    id: 'mentor-champion',
    name: 'Mentor Champion',
    description: 'Acompanha e desenvolve multiplicadores de IA na empresa',
    category: 'Coaching',
    categoryColor: 'bg-pink-500',
    icon: Users,
    status: 'available',
    complexity: 'medium',
    useCases: ['Mentoring', 'Development', 'Community'],
    tools: ['Progress Tracker', 'Resource Library'],
  },
  // Técnico
  {
    id: 'pair-programmer',
    name: 'Pair Programmer',
    description: 'Auxilia desenvolvedores com código, revisão e debugging',
    category: 'Técnico',
    categoryColor: 'bg-gray-700',
    icon: Code,
    status: 'available',
    complexity: 'high',
    useCases: ['Coding', 'Review', 'Debug'],
    tools: ['Code Analysis', 'Git Integration'],
  },
];

const categories = [...new Set(prebuiltAgents.map((a) => a.category))];

const availableTools = [
  { id: 'rag', name: 'RAG (Retrieval)', icon: Search, description: 'Busca em documentos e bases de conhecimento' },
  { id: 'database', name: 'Database Query', icon: Database, description: 'Consulta bancos de dados SQL/NoSQL' },
  { id: 'api', name: 'API Calls', icon: Globe, description: 'Chamadas a APIs externas' },
  { id: 'code', name: 'Code Execution', icon: Terminal, description: 'Executa código Python/JavaScript' },
  { id: 'file', name: 'File Operations', icon: FileText, description: 'Lê e escreve arquivos' },
  { id: 'email', name: 'Email', icon: MessageSquare, description: 'Envia e lê emails' },
];

const availableModels = [
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', recommended: true },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', recommended: false },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI', recommended: false },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', recommended: false },
  { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google', recommended: false },
];

const mockTestConversation = [
  { role: 'user' as const, content: 'Olá, gostaria de saber o status do meu pedido #12345', timestamp: '14:30:01' },
  { role: 'thinking' as const, content: 'Analisando a requisição... Identificando intent: consulta_pedido. Extraindo parâmetro: order_id=12345', timestamp: '14:30:01' },
  { role: 'tool_call' as const, tool: 'database', content: 'SELECT * FROM orders WHERE id = 12345', timestamp: '14:30:02' },
  { role: 'tool_result' as const, content: '{ "id": 12345, "status": "em_transito", "eta": "2025-02-08" }', timestamp: '14:30:02' },
  { role: 'assistant' as const, content: 'Encontrei seu pedido! O pedido #12345 está em trânsito e a previsão de entrega é para 08/02/2025. Posso ajudar com mais alguma coisa?', timestamp: '14:30:03' },
];

const complexityConfig = {
  low: { label: 'Básico', color: 'bg-status-success text-white' },
  medium: { label: 'Intermediário', color: 'bg-status-warning text-white' },
  high: { label: 'Avançado', color: 'bg-orange-500 text-white' },
  expert: { label: 'Expert', color: 'bg-status-error text-white' },
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/** Agent template card for the gallery */
function AgentTemplateCard({
  agent,
  onSelect,
  onUseTemplate,
}: {
  agent: (typeof prebuiltAgents)[0];
  onSelect: () => void;
  onUseTemplate: () => void;
}) {
  const complexity = complexityConfig[agent.complexity as keyof typeof complexityConfig];

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all hover:shadow-md',
        agent.status === 'coming_soon' && 'opacity-60'
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0',
              agent.categoryColor
            )}
          >
            <agent.icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-text truncate">{agent.name}</h3>
              {agent.status === 'coming_soon' && (
                <Badge variant="pending" size="sm">
                  Em breve
                </Badge>
              )}
            </div>
            <p className="text-sm text-text-secondary line-clamp-2 mb-3">{agent.description}</p>

            <div className="flex flex-wrap gap-1 mb-3">
              {agent.useCases.map((useCase, i) => (
                <Badge key={i} variant="outline" size="sm">
                  {useCase}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className={complexity.color} size="sm">
                  {complexity.label}
                </Badge>
                <span className="text-xs text-text-muted">{agent.tools.length} ferramentas</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSelect}
                  disabled={agent.status === 'coming_soon'}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Ver
                </Button>
                <Button
                  size="sm"
                  onClick={onUseTemplate}
                  disabled={agent.status === 'coming_soon'}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Usar Template
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/** Agent builder form for the Construir tab */
function AgentBuilderForm({
  agent,
  onUpdate,
}: {
  agent: {
    name: string;
    description: string;
    model: string;
    temperature: number;
    systemPrompt: string;
    tools: string[];
  };
  onUpdate: (agent: any) => void;
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-text mb-1.5 block">Nome do Agente</label>
            <Input
              value={agent.name}
              onChange={(e) => onUpdate({ ...agent, name: e.target.value })}
              placeholder="Ex: Customer Support Agent"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text mb-1.5 block">Descrição</label>
            <textarea
              className="w-full px-3 py-2 text-sm rounded-lg border border-surface-border bg-white min-h-[80px] resize-none focus:border-[#4ECDC4] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/20"
              value={agent.description}
              onChange={(e) => onUpdate({ ...agent, description: e.target.value })}
              placeholder="Descreva o que este agente faz..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Model Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Modelo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            {availableModels.map((model) => (
              <div
                key={model.id}
                className={cn(
                  'flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all',
                  agent.model === model.id
                    ? 'border-[#4ECDC4] bg-[#4ECDC4]/5'
                    : 'border-surface-border hover:border-[#4ECDC4]/50'
                )}
                onClick={() => onUpdate({ ...agent, model: model.id })}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                      agent.model === model.id ? 'border-[#4ECDC4]' : 'border-surface-border'
                    )}
                  >
                    {agent.model === model.id && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#4ECDC4]" />
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-text">{model.name}</span>
                    <span className="text-xs text-text-muted ml-2">{model.provider}</span>
                  </div>
                </div>
                {model.recommended && (
                  <Badge variant="success" size="sm">
                    Recomendado
                  </Badge>
                )}
              </div>
            ))}
          </div>

          <div>
            <label className="text-sm font-medium text-text mb-1.5 block">
              Temperature: {agent.temperature}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={agent.temperature}
              onChange={(e) => onUpdate({ ...agent, temperature: parseFloat(e.target.value) })}
              className="w-full accent-[#4ECDC4]"
            />
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>Preciso</span>
              <span>Criativo</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Prompt */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">System Prompt</CardTitle>
            <AIActionButton
              label="Gerar com IA"
              icon={<Sparkles className="h-4 w-4" />}
              onClick={() => {}}
              size="sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <textarea
            className="w-full px-3 py-2 text-sm rounded-lg border border-surface-border bg-white min-h-[200px] resize-none font-mono focus:border-[#4ECDC4] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/20"
            value={agent.systemPrompt}
            onChange={(e) => onUpdate({ ...agent, systemPrompt: e.target.value })}
            placeholder="Defina o comportamento e personalidade do agente..."
          />
        </CardContent>
      </Card>

      {/* Tools */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Ferramentas</CardTitle>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Custom Tool
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-2">
            {availableTools.map((tool) => {
              const isEnabled = agent.tools.includes(tool.id);
              return (
                <div
                  key={tool.id}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all',
                    isEnabled
                      ? 'border-[#4ECDC4] bg-[#4ECDC4]/5'
                      : 'border-surface-border hover:border-[#4ECDC4]/50'
                  )}
                  onClick={() => {
                    const newTools = isEnabled
                      ? agent.tools.filter((t) => t !== tool.id)
                      : [...agent.tools, tool.id];
                    onUpdate({ ...agent, tools: newTools });
                  }}
                >
                  <div
                    className={cn(
                      'p-2 rounded-lg',
                      isEnabled ? 'bg-[#4ECDC4]/20' : 'bg-surface-light'
                    )}
                  >
                    <tool.icon
                      className={cn('h-4 w-4', isEnabled ? 'text-[#4ECDC4]' : 'text-text-muted')}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text">{tool.name}</p>
                    <p className="text-xs text-text-muted truncate">{tool.description}</p>
                  </div>
                  <div
                    className={cn(
                      'w-5 h-5 rounded border-2 flex items-center justify-center',
                      isEnabled ? 'bg-[#4ECDC4] border-[#4ECDC4]' : 'border-surface-border'
                    )}
                  >
                    {isEnabled && <Check className="h-3 w-3 text-white" />}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card>
        <CardHeader>
          <button
            className="flex items-center justify-between w-full"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <CardTitle className="text-base">Configurações Avançadas</CardTitle>
            {showAdvanced ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </CardHeader>
        {showAdvanced && (
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-text mb-1.5 block">Max Tokens</label>
                <Input type="number" defaultValue={4096} />
              </div>
              <div>
                <label className="text-sm font-medium text-text mb-1.5 block">Timeout (s)</label>
                <Input type="number" defaultValue={30} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-text mb-1.5 block">Rate Limit</label>
              <Input type="number" defaultValue={100} placeholder="Requests/minuto" />
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

/** Test chat interface with debug mode */
function TestChat({
  conversation,
  onSendMessage,
  isRunning,
  metrics,
}: {
  conversation: typeof mockTestConversation;
  onSendMessage: (message: string) => void;
  isRunning: boolean;
  metrics: { latency: string; tokens: number; cost: string };
}) {
  const [input, setInput] = useState('');
  const [showDebug, setShowDebug] = useState(true);

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'p-2 rounded-lg',
              isRunning ? 'bg-[#4ECDC4]/20' : 'bg-surface-light'
            )}
          >
            <Bot
              className={cn('h-5 w-5', isRunning ? 'text-[#4ECDC4]' : 'text-text-muted')}
            />
          </div>
          <div>
            <h3 className="font-medium text-text">Área de Teste</h3>
            <p className="text-xs text-text-muted">
              {isRunning ? 'Agente ativo' : 'Agente pausado'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDebug(!showDebug)}
            className={showDebug ? 'bg-surface-light' : ''}
          >
            <Terminal className="h-4 w-4 mr-1" />
            Debug
          </Button>
          <Button variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-1" />
            Limpar
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.map((msg, i) => (
          <div key={i}>
            {msg.role === 'user' && (
              <div className="flex justify-end">
                <div className="bg-[#0A1628] text-white rounded-lg px-4 py-2 text-sm max-w-[80%]">
                  {msg.content}
                  <span className="text-xs text-white/60 ml-2">{msg.timestamp}</span>
                </div>
              </div>
            )}

            {msg.role === 'thinking' && showDebug && (
              <div className="flex items-start gap-2 mx-4 text-xs text-text-muted bg-yellow-50 p-2 rounded border border-yellow-200">
                <Sparkles className="h-3 w-3 text-yellow-600 mt-0.5" />
                <span>{msg.content}</span>
              </div>
            )}

            {msg.role === 'tool_call' && showDebug && (
              <div className="flex items-center gap-2 mx-4 my-2">
                <div className="flex-1 border-t border-dashed border-surface-border" />
                <div className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200">
                  <Zap className="h-3 w-3" />
                  <span className="font-mono">{msg.content}</span>
                </div>
                <div className="flex-1 border-t border-dashed border-surface-border" />
              </div>
            )}

            {msg.role === 'tool_result' && showDebug && (
              <div className="mx-4 text-xs font-mono bg-surface-light p-2 rounded border border-surface-border">
                <span className="text-status-success">Result:</span> {msg.content}
              </div>
            )}

            {msg.role === 'assistant' && (
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-[#4ECDC4] flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-[#0A1628]" />
                </div>
                <div className="bg-surface-light text-text rounded-lg px-4 py-2 text-sm max-w-[80%]">
                  {msg.content}
                  <span className="text-xs text-text-muted ml-2">{msg.timestamp}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Metrics bar */}
      <div className="flex items-center gap-4 px-4 py-2 bg-surface-light border-t border-b border-surface-border text-xs">
        <div className="flex items-center gap-1 text-text-muted">
          <Clock className="h-3 w-3" />
          <span>
            Latência: <strong className="text-text">{metrics.latency}</strong>
          </span>
        </div>
        <div className="flex items-center gap-1 text-text-muted">
          <Activity className="h-3 w-3" />
          <span>
            Tokens: <strong className="text-text">{metrics.tokens}</strong>
          </span>
        </div>
        <div className="flex items-center gap-1 text-text-muted">
          <DollarSign className="h-3 w-3" />
          <span>
            Custo: <strong className="text-text">{metrics.cost}</strong>
          </span>
        </div>
      </div>

      {/* Input */}
      <div className="p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Digite uma mensagem para testar..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={!isRunning}
          />
          <Button onClick={handleSend} disabled={!isRunning}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function AISandbox() {
  // ---------------------------------------------------------------------------
  // Tab navigation
  // ---------------------------------------------------------------------------
  const [activeTab, setActiveTab] = useState('experimentar');

  // AI Modal
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiModalContext, setAIModalContext] = useState({ title: '', context: '' });

  // ---------------------------------------------------------------------------
  // Experimentar tab state
  // ---------------------------------------------------------------------------
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [selectedContext, setSelectedContext] = useState(contexts[0]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [messages, setMessages] = useState<SandboxMessage[]>([
    {
      id: 1,
      role: 'assistant',
      content: `Olá! Sou seu assistente no AI Sandbox. Estou usando o modelo **${models[0].name}** no contexto **Geral**.

Posso ajudar com:
- Análise de documentos e dados
- Geração e revisão de código
- Brainstorming e ideação
- Perguntas sobre IA e estratégia

Como posso ajudar você hoje?`,
      model: models[0].id,
      timestamp: new Date(),
    },
  ]);

  // ---------------------------------------------------------------------------
  // Agent Studio tab state
  // ---------------------------------------------------------------------------
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // ---------------------------------------------------------------------------
  // Construir tab state
  // ---------------------------------------------------------------------------
  const [currentAgent, setCurrentAgent] = useState({
    name: '',
    description: '',
    model: 'claude-3-5-sonnet',
    temperature: 0.3,
    systemPrompt: '',
    tools: ['rag', 'database'],
  });

  // ---------------------------------------------------------------------------
  // Testar tab state
  // ---------------------------------------------------------------------------
  const [isRunning, setIsRunning] = useState(false);
  const [testConversation, setTestConversation] = useState(mockTestConversation);
  const [testMetrics] = useState({ latency: '1.2s', tokens: 847, cost: '$0.02' });

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  /** Send a message in the Experimentar chat */
  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: SandboxMessage = {
      id: messages.length + 1,
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      const responses: Record<string, string> = {
        'gpt-4': `Analisando sua solicitação com GPT-4...

Baseado no contexto **${selectedContext.name}**, aqui está minha análise:

Esta é uma simulação de resposta do modelo GPT-4. Em um ambiente real, a resposta seria gerada pela API da OpenAI.

**Pontos-chave:**
1. O sandbox está configurado corretamente
2. As políticas de governança estão sendo aplicadas
3. Os dados sensíveis são mascarados automaticamente

Posso elaborar mais sobre algum ponto específico?`,
        'claude-3': `Olá! Aqui é o Claude 3 respondendo.

No contexto de **${selectedContext.name}**, posso oferecer uma perspectiva única:

Esta é uma demonstração do AI Sandbox da Aimana. O ambiente real se conectaria à API da Anthropic para gerar respostas.

**Observações:**
- Múltiplos modelos disponíveis para comparação
- Histórico de conversas preservado
- Integração com políticas de governança

Como posso ajudar mais?`,
        gemini: `Resposta do Gemini Pro:

Considerando o contexto **${selectedContext.name}**:

Esta é uma simulação do modelo Gemini do Google. A versão de produção utilizaria a API do Google AI.

**Capacidades demonstradas:**
- Troca dinâmica entre modelos
- Contextos especializados
- Ambiente seguro e governado

Há algo específico que gostaria de explorar?`,
      };

      const assistantMessage: SandboxMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: responses[selectedModel.id] || responses['gpt-4'],
        model: selectedModel.id,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  /** Clear the Experimentar chat */
  const clearChat = () => {
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content: `Chat reiniciado. Usando **${selectedModel.name}** no contexto **${selectedContext.name}**.

Como posso ajudar?`,
        model: selectedModel.id,
        timestamp: new Date(),
      },
    ]);
  };

  /** Filter agents for the Agent Studio gallery */
  const filteredAgents = prebuiltAgents.filter((agent) => {
    if (selectedCategory !== 'all' && agent.category !== selectedCategory) return false;
    if (
      searchTerm &&
      !agent.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !agent.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  /** Use a template from the gallery and jump to Construir */
  const handleUseTemplate = (agent: (typeof prebuiltAgents)[0]) => {
    setCurrentAgent({
      name: agent.name + ' (Copy)',
      description: agent.description,
      model: 'claude-3-5-sonnet',
      temperature: 0.3,
      systemPrompt: `Você é o ${agent.name}.\n\n${agent.description}\n\nSuas responsabilidades incluem:\n- ...\n- ...\n\nSempre seja educado e profissional.`,
      tools: agent.tools
        .map((t) => t.toLowerCase().replace(' ', '_'))
        .filter((t) => availableTools.some((at) => at.id === t)),
    });
    setActiveTab('construir');
  };

  /** Open the AI modal */
  const openAIModal = (title: string, context: string) => {
    setAIModalContext({ title, context });
    setShowAIModal(true);
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="flex h-screen flex-col">
      <Header title="AI Sandbox" subtitle="Experimente, prototipe e teste soluções de IA" />

      <main className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
          {/* ---------------------------------------------------------------- */}
          {/* Tab bar */}
          {/* ---------------------------------------------------------------- */}
          <div className="flex items-center justify-between border-b border-surface-border bg-white px-6 py-3">
            <TabsList>
              <TabsTrigger value="experimentar">
                <MessageSquare className="h-4 w-4 mr-2" />
                Experimentar
              </TabsTrigger>
              <TabsTrigger value="agent-studio">
                <Layers className="h-4 w-4 mr-2" />
                Agent Studio
              </TabsTrigger>
              <TabsTrigger value="construir">
                <Wrench className="h-4 w-4 mr-2" />
                Construir
              </TabsTrigger>
              <TabsTrigger value="testar">
                <Play className="h-4 w-4 mr-2" />
                Testar
              </TabsTrigger>
            </TabsList>

            {/* Contextual actions per tab */}
            {activeTab === 'construir' && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Save className="h-4 w-4 mr-1" />
                  Salvar Rascunho
                </Button>
                <Button size="sm" onClick={() => setActiveTab('testar')}>
                  <Play className="h-4 w-4 mr-1" />
                  Testar Agente
                </Button>
              </div>
            )}

            {activeTab === 'testar' && (
              <div className="flex items-center gap-2">
                <Badge variant={isRunning ? 'success' : 'pending'}>
                  {isRunning ? 'Executando' : 'Parado'}
                </Badge>
                {isRunning ? (
                  <Button variant="outline" size="sm" onClick={() => setIsRunning(false)}>
                    <Pause className="h-4 w-4 mr-1" />
                    Pausar
                  </Button>
                ) : (
                  <Button size="sm" onClick={() => setIsRunning(true)}>
                    <Play className="h-4 w-4 mr-1" />
                    Executar
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* ================================================================ */}
          {/* TAB 1 - EXPERIMENTAR                                            */}
          {/* ================================================================ */}
          <TabsContent value="experimentar" className="flex-1 overflow-hidden">
            <div className="flex h-full">
              {/* History sidebar */}
              <aside className="hidden w-64 border-r border-surface-border bg-white p-4 lg:block overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-text">Histórico</h3>
                  <Button variant="ghost" size="icon-sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {mockHistory.map((item) => (
                    <button
                      key={item.id}
                      className="w-full rounded-lg p-3 text-left hover:bg-surface-hover transition-colors"
                    >
                      <p className="text-sm font-medium text-text truncate">{item.title}</p>
                      <p className="text-xs text-text-muted mt-1">
                        {item.date} &bull; {item.messages} mensagens
                      </p>
                    </button>
                  ))}
                </div>
              </aside>

              {/* Chat area */}
              <div className="flex flex-1 flex-col">
                {/* Model & context bar */}
                <div className="border-b border-surface-border bg-white p-4">
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Model Selector */}
                    <div className="relative">
                      <button
                        onClick={() => setShowModelSelector(!showModelSelector)}
                        className="flex items-center gap-2 rounded-lg border border-surface-border px-3 py-2 hover:bg-surface-hover"
                      >
                        <div className={cn('h-2 w-2 rounded-full', selectedModel.color)} />
                        <span className="text-sm font-medium text-text">{selectedModel.name}</span>
                        <ChevronDown className="h-4 w-4 text-text-muted" />
                      </button>

                      {showModelSelector && (
                        <div className="absolute left-0 top-full z-50 mt-1 w-48 rounded-lg border border-surface-border bg-white py-1 shadow-lg">
                          {models.map((model) => (
                            <button
                              key={model.id}
                              onClick={() => {
                                setSelectedModel(model);
                                setShowModelSelector(false);
                              }}
                              className={cn(
                                'flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-surface-hover',
                                selectedModel.id === model.id && 'bg-surface-light'
                              )}
                            >
                              <div className={cn('h-2 w-2 rounded-full', model.color)} />
                              <div>
                                <p className="text-sm font-medium text-text">{model.name}</p>
                                <p className="text-xs text-text-muted">{model.provider}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Context Selector */}
                    <div className="flex gap-2">
                      {contexts.map((context) => (
                        <button
                          key={context.id}
                          onClick={() => setSelectedContext(context)}
                          className={cn(
                            'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                            selectedContext.id === context.id
                              ? 'bg-[#4ECDC4]/10 text-[#4ECDC4] border border-[#4ECDC4]/30'
                              : 'text-text-secondary hover:bg-surface-hover'
                          )}
                        >
                          <context.icon className="h-4 w-4" />
                          <span className="hidden sm:inline">{context.name}</span>
                        </button>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="ml-auto flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={clearChat}>
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Limpar
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        'flex',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[80%] rounded-2xl px-4 py-3',
                          message.role === 'user'
                            ? 'bg-[#0A1628] text-white'
                            : 'bg-surface-light text-text'
                        )}
                      >
                        {message.role === 'assistant' && message.model && (
                          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-surface-border">
                            <Bot className="h-4 w-4 text-[#4ECDC4]" />
                            <span className="text-xs font-medium text-text-secondary">
                              {models.find((m) => m.id === message.model)?.name}
                            </span>
                          </div>
                        )}
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <div className="flex items-center justify-end gap-2 mt-2">
                          <span className="text-xs opacity-60">
                            {message.timestamp.toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          {message.role === 'assistant' && (
                            <button className="opacity-60 hover:opacity-100">
                              <Copy className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-surface-light rounded-2xl px-4 py-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Bot className="h-4 w-4 text-[#4ECDC4]" />
                          <span className="text-xs font-medium text-text-secondary">
                            {selectedModel.name}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <span className="h-2 w-2 rounded-full bg-text-muted animate-pulse" />
                          <span className="h-2 w-2 rounded-full bg-text-muted animate-pulse [animation-delay:150ms]" />
                          <span className="h-2 w-2 rounded-full bg-text-muted animate-pulse [animation-delay:300ms]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="border-t border-surface-border bg-white p-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                          }
                        }}
                        placeholder="Digite sua mensagem... (Shift+Enter para nova linha)"
                        className="w-full resize-none rounded-lg border border-surface-border bg-white px-4 py-3 pr-12 text-sm placeholder:text-text-muted focus:border-[#4ECDC4] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/20"
                        rows={1}
                        style={{ minHeight: '48px', maxHeight: '200px' }}
                      />
                    </div>
                    <Button
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isLoading}
                      className="h-12 w-12"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-text-muted">
                    <span>
                      Modelo: <strong>{selectedModel.name}</strong> &bull; Contexto:{' '}
                      <strong>{selectedContext.name}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-status-success" />
                      Governança ativa
                    </span>
                  </div>
                </div>
              </div>

              {/* Right sidebar - governance info */}
              <aside className="hidden w-72 border-l border-surface-border bg-white p-4 xl:block overflow-y-auto">
                <h3 className="font-semibold text-text mb-4">Informações do Contexto</h3>

                <Card className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4ECDC4]/10">
                        <selectedContext.icon className="h-5 w-5 text-[#4ECDC4]" />
                      </div>
                      <div>
                        <p className="font-medium text-text">{selectedContext.name}</p>
                        <p className="text-xs text-text-secondary">
                          {selectedContext.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <h4 className="text-sm font-medium text-text mb-2">Políticas Aplicadas</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-text-secondary">
                    <span className="h-1.5 w-1.5 rounded-full bg-status-success" />
                    Dados sensíveis mascarados
                  </li>
                  <li className="flex items-center gap-2 text-text-secondary">
                    <span className="h-1.5 w-1.5 rounded-full bg-status-success" />
                    Logs de auditoria ativos
                  </li>
                  <li className="flex items-center gap-2 text-text-secondary">
                    <span className="h-1.5 w-1.5 rounded-full bg-status-success" />
                    Limite de tokens: 4096
                  </li>
                </ul>

                <h4 className="text-sm font-medium text-text mt-6 mb-2">Sugestões</h4>
                <div className="space-y-2">
                  {[
                    'Analise este documento',
                    'Gere um resumo executivo',
                    'Compare com benchmarks',
                  ].map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => setInputValue(suggestion)}
                      className="w-full rounded-lg border border-surface-border p-2 text-left text-sm text-text-secondary hover:bg-surface-hover hover:text-text"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </aside>
            </div>
          </TabsContent>

          {/* ================================================================ */}
          {/* TAB 2 - AGENT STUDIO                                            */}
          {/* ================================================================ */}
          <TabsContent value="agent-studio" className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Search & category filter pills */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Buscar agentes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm border border-surface-border rounded-lg bg-white w-72 focus:border-[#4ECDC4] focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/20"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                    selectedCategory === 'all'
                      ? 'bg-[#0A1628] text-white'
                      : 'bg-surface-light text-text-secondary hover:bg-surface-hover'
                  )}
                >
                  Todos
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                      selectedCategory === cat
                        ? 'bg-[#0A1628] text-white'
                        : 'bg-surface-light text-text-secondary hover:bg-surface-hover'
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-[#0A1628]">{prebuiltAgents.length}</div>
                  <div className="text-sm text-text-muted">Agentes Disponíveis</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-status-success">
                    {prebuiltAgents.filter((a) => a.status === 'available').length}
                  </div>
                  <div className="text-sm text-text-muted">Prontos para Uso</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-status-warning">{categories.length}</div>
                  <div className="text-sm text-text-muted">Categorias</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-[#4ECDC4]">
                    {prebuiltAgents.filter((a) => a.status === 'coming_soon').length}
                  </div>
                  <div className="text-sm text-text-muted">Em Breve</div>
                </CardContent>
              </Card>
            </div>

            {/* Agent grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredAgents.map((agent) => (
                <AgentTemplateCard
                  key={agent.id}
                  agent={agent}
                  onSelect={() => openAIModal(agent.name, 'agent-details')}
                  onUseTemplate={() => handleUseTemplate(agent)}
                />
              ))}
            </div>

            {filteredAgents.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bot className="h-12 w-12 text-text-muted mx-auto mb-4" />
                  <h3 className="font-medium text-text mb-2">Nenhum agente encontrado</h3>
                  <p className="text-sm text-text-secondary">
                    Tente ajustar os filtros ou criar um novo agente
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* ================================================================ */}
          {/* TAB 3 - CONSTRUIR                                               */}
          {/* ================================================================ */}
          <TabsContent value="construir" className="flex-1 overflow-y-auto p-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Editor area - 2 columns */}
              <div className="lg:col-span-2">
                <AgentBuilderForm agent={currentAgent} onUpdate={setCurrentAgent} />
              </div>

              {/* Sidebar - Preview, quick actions, tips */}
              <div className="space-y-6">
                {/* Quick actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Ações Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <AIActionButton
                      label="Gerar Agente com IA"
                      icon={<Sparkles className="h-4 w-4" />}
                      onClick={() => openAIModal('Builder IA', 'generate-agent')}
                      className="w-full"
                    />
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Importar Config
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar Config
                    </Button>
                  </CardContent>
                </Card>

                {/* Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 rounded-lg bg-surface-light">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-[#4ECDC4]/20">
                          <Bot className="h-5 w-5 text-[#4ECDC4]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-text">
                            {currentAgent.name || 'Novo Agente'}
                          </h4>
                          <p className="text-xs text-text-muted">{currentAgent.model}</p>
                        </div>
                      </div>
                      <p className="text-sm text-text-secondary mb-3">
                        {currentAgent.description || 'Sem descrição'}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {currentAgent.tools.map((toolId) => {
                          const tool = availableTools.find((t) => t.id === toolId);
                          return tool ? (
                            <Badge key={toolId} variant="outline" size="sm">
                              {tool.name}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card className="border-[#4ECDC4]/30 bg-gradient-to-br from-[#4ECDC4]/10 to-[#50D9B3]/10">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-[#4ECDC4] mt-0.5" />
                      <div>
                        <h4 className="font-medium text-text mb-1">Dica</h4>
                        <p className="text-sm text-text-secondary">
                          Comece com um system prompt claro e específico. Defina o papel do agente e
                          suas limitações. Use a IA para gerar um prompt inicial e depois refine
                          manualmente.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ================================================================ */}
          {/* TAB 4 - TESTAR                                                  */}
          {/* ================================================================ */}
          <TabsContent value="testar" className="flex-1 overflow-y-auto p-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Chat area - 2 columns */}
              <div className="lg:col-span-2">
                <Card className="h-[600px] flex flex-col">
                  <TestChat
                    conversation={testConversation}
                    onSendMessage={(msg) => {
                      setTestConversation([
                        ...testConversation,
                        {
                          role: 'user' as const,
                          content: msg,
                          timestamp: new Date().toLocaleTimeString(),
                        },
                      ]);
                    }}
                    isRunning={isRunning}
                    metrics={testMetrics}
                  />
                </Card>
              </div>

              {/* Sidebar - Agent info & session metrics */}
              <div className="space-y-6">
                {/* Agent info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Agente em Teste</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-[#4ECDC4]/20">
                        <Bot className="h-5 w-5 text-[#4ECDC4]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-text">
                          {currentAgent.name || 'Novo Agente'}
                        </h4>
                        <p className="text-xs text-text-muted">{currentAgent.model}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Temperature</span>
                        <span className="text-text">{currentAgent.temperature}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Ferramentas</span>
                        <span className="text-text">{currentAgent.tools.length}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-4"
                      onClick={() => setActiveTab('construir')}
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Editar Configuração
                    </Button>
                  </CardContent>
                </Card>

                {/* Session metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Métricas da Sessão</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-surface-light rounded-lg">
                        <div className="text-2xl font-bold text-text">5</div>
                        <div className="text-xs text-text-muted">Mensagens</div>
                      </div>
                      <div className="text-center p-3 bg-surface-light rounded-lg">
                        <div className="text-2xl font-bold text-status-success">100%</div>
                        <div className="text-xs text-text-muted">Taxa Sucesso</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Latência média</span>
                        <span className="text-text font-medium">1.2s</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Tokens totais</span>
                        <span className="text-text font-medium">2,341</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Custo estimado</span>
                        <span className="text-text font-medium">$0.08</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Tool calls</span>
                        <span className="text-text font-medium">3</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Promote / export actions */}
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <Button className="w-full">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Promover para Produção
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar Logs
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* AI Modal (shared across tabs) */}
      <AIModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        title={aiModalContext.title}
        initialPrompt={
          aiModalContext.context === 'generate-agent'
            ? 'Descreva o agente que você quer criar. Qual é o propósito dele? Que tarefas ele deve realizar?'
            : 'Como posso ajudar?'
        }
      />
    </div>
  );
}
