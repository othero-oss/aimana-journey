/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Agent Prototype Studio Page
 * Ambiente visual para prototipação de agentes
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
  Bot,
  Play,
  Pause,
  RotateCcw,
  Save,
  Download,
  Settings,
  Plus,
  ArrowRight,
  Zap,
  Database,
  FileText,
  Search,
  MessageSquare,
  Send,
  GraduationCap,
  BarChart3,
  Shield,
  Code,
  Activity,
  Users,
  Brain,
  Eye,
  Network,
  Lightbulb,
  Target,
  Wrench,
  FileSearch,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Pre-built agents from the platform ecosystem
const prebuiltAgents = [
  // Educational
  {
    id: 'lifow',
    name: 'LIFOW',
    description: 'Assistente educacional 24/7',
    category: 'Educacional',
    categoryColor: 'bg-purple-500',
    icon: GraduationCap,
    status: 'available',
  },
  // Autonomous
  {
    id: 'diagnostico',
    name: 'Agente Diagnóstico',
    description: 'Maturidade via conversa',
    category: 'Autônomo',
    categoryColor: 'bg-orange-500',
    icon: Activity,
    status: 'available',
  },
  {
    id: 'oportunidades',
    name: 'Agente Oportunidades',
    description: 'Mapeia onde IA gera valor',
    category: 'Autônomo',
    categoryColor: 'bg-orange-500',
    icon: Lightbulb,
    status: 'available',
  },
  {
    id: 'data-scanner',
    name: 'Data Scanner',
    description: 'Escaneia e avalia dados',
    category: 'Autônomo',
    categoryColor: 'bg-orange-500',
    icon: FileSearch,
    status: 'available',
  },
  {
    id: 'orquestrador',
    name: 'Orquestrador',
    description: 'Coordena todos os agentes',
    category: 'Autônomo',
    categoryColor: 'bg-orange-500',
    icon: Network,
    status: 'coming_soon',
  },
  // Generative
  {
    id: 'governance-bot',
    name: 'Governance Bot',
    description: 'Gera políticas automáticas',
    category: 'Gerativo',
    categoryColor: 'bg-green-500',
    icon: Shield,
    status: 'available',
  },
  {
    id: 'builder-ia',
    name: 'Builder IA',
    description: 'Constrói agentes assistido',
    category: 'Gerativo',
    categoryColor: 'bg-green-500',
    icon: Wrench,
    status: 'available',
  },
  {
    id: 'report-bot',
    name: 'Report Bot',
    description: 'Relatórios automáticos',
    category: 'Gerativo',
    categoryColor: 'bg-green-500',
    icon: FileText,
    status: 'available',
  },
  // Analytics
  {
    id: 'stack-advisor',
    name: 'Stack Advisor',
    description: 'Recomenda ferramentas',
    category: 'Analítico',
    categoryColor: 'bg-blue-500',
    icon: Database,
    status: 'available',
  },
  {
    id: 'roi-engine',
    name: 'ROI Engine',
    description: 'Calcula retorno real',
    category: 'Analítico',
    categoryColor: 'bg-blue-500',
    icon: BarChart3,
    status: 'available',
  },
  // Monitoring
  {
    id: 'health-monitor',
    name: 'Health Monitor',
    description: 'Saúde dos agentes',
    category: 'Monitoramento',
    categoryColor: 'bg-cyan-500',
    icon: Activity,
    status: 'available',
  },
  {
    id: 'command-center',
    name: 'Command Center',
    description: 'Monitora tudo',
    category: 'Monitoramento',
    categoryColor: 'bg-cyan-500',
    icon: Eye,
    status: 'coming_soon',
  },
  {
    id: 'adoption-sensor',
    name: 'Adoption Sensor',
    description: 'Mede adoção real',
    category: 'Monitoramento',
    categoryColor: 'bg-cyan-500',
    icon: Users,
    status: 'available',
  },
  {
    id: 'trust-agent',
    name: 'Trust Agent',
    description: 'Segurança e compliance',
    category: 'Monitoramento',
    categoryColor: 'bg-cyan-500',
    icon: Shield,
    status: 'available',
  },
  // Coaching
  {
    id: 'mentor-champion',
    name: 'Mentor Champion',
    description: 'Acompanha multiplicadores',
    category: 'Coaching',
    categoryColor: 'bg-pink-500',
    icon: Users,
    status: 'available',
  },
  // Technical
  {
    id: 'pair-programmer',
    name: 'Pair Programmer',
    description: 'Auxilia devs',
    category: 'Técnico',
    categoryColor: 'bg-gray-700',
    icon: Code,
    status: 'available',
  },
];

// Group agents by category
const agentsByCategory = prebuiltAgents.reduce((acc, agent) => {
  if (!acc[agent.category]) {
    acc[agent.category] = [];
  }
  acc[agent.category].push(agent);
  return acc;
}, {} as Record<string, typeof prebuiltAgents>);

// Current agent configuration
const currentAgent = {
  name: 'Customer Support Agent',
  description: 'Agente para atendimento ao cliente com acesso à base de conhecimento',
  model: 'claude-3-5-sonnet',
  temperature: 0.3,
  systemPrompt: `Você é um assistente de suporte ao cliente da empresa XYZ.

Suas responsabilidades:
1. Responder dúvidas sobre produtos
2. Ajudar com problemas técnicos
3. Encaminhar casos complexos para humanos

Sempre seja educado e profissional.`,
  tools: [
    { id: 'search_kb', name: 'Buscar Base de Conhecimento', icon: Search, enabled: true },
    { id: 'get_order', name: 'Consultar Pedido', icon: Database, enabled: true },
    { id: 'create_ticket', name: 'Criar Ticket', icon: FileText, enabled: false },
  ],
};

// Test conversation
const testConversation = [
  { role: 'user', content: 'Olá, gostaria de saber o status do meu pedido #12345' },
  { role: 'assistant', content: 'Olá! Vou verificar o status do seu pedido #12345.', thinking: 'Usando ferramenta: Consultar Pedido' },
  { role: 'tool', content: 'Pedido #12345: Em trânsito, previsão de entrega: 08/02/2025' },
  { role: 'assistant', content: 'Encontrei seu pedido! O pedido #12345 está em trânsito e a previsão de entrega é para 08/02/2025. Posso ajudar com mais alguma coisa?' },
];

export function AgentStudio() {
  const [isRunning, setIsRunning] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [showConfig, setShowConfig] = useState(true);
  const [activeTab, setActiveTab] = useState<'prebuilt' | 'custom'>('prebuilt');
  const [selectedAgent, setSelectedAgent] = useState<typeof prebuiltAgents[0] | null>(null);

  return (
    <div>
      <Header
        title="Agent Prototype Studio"
        subtitle="Prototipe e teste agentes de IA visualmente"
      />

      <main className="p-6">
        {/* Toolbar */}
        <Card className="mb-6">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Novo Agente
                </Button>
                <div className="h-6 w-px bg-surface-border mx-2" />
                <Button variant="outline" size="sm">
                  <Save className="h-4 w-4 mr-1" />
                  Salvar
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Exportar
                </Button>
              </div>
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
                <Button variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Configuration Panel */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex rounded-lg border border-surface-border overflow-hidden">
              <button
                className={cn(
                  'flex-1 px-4 py-2 text-sm font-medium transition-colors',
                  activeTab === 'prebuilt' ? 'bg-aimana-teal text-white' : 'bg-white text-text-muted hover:bg-surface-light'
                )}
                onClick={() => setActiveTab('prebuilt')}
              >
                <Bot className="h-4 w-4 inline mr-1" />
                Pré-construídos
              </button>
              <button
                className={cn(
                  'flex-1 px-4 py-2 text-sm font-medium transition-colors',
                  activeTab === 'custom' ? 'bg-aimana-teal text-white' : 'bg-white text-text-muted hover:bg-surface-light'
                )}
                onClick={() => setActiveTab('custom')}
              >
                <Settings className="h-4 w-4 inline mr-1" />
                Customizar
              </button>
            </div>

            {activeTab === 'prebuilt' ? (
              /* Pre-built Agents */
              <Card className="max-h-[600px] overflow-y-auto">
                <CardHeader>
                  <CardTitle className="text-base">Ecossistema de Agentes</CardTitle>
                  <CardDescription>Agentes prontos para uso</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(agentsByCategory).map(([category, agents]) => (
                    <div key={category}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={cn('w-2 h-2 rounded-full', agents[0].categoryColor)} />
                        <span className="text-xs font-medium text-text-muted uppercase tracking-wide">
                          {category}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {agents.map((agent) => (
                          <div
                            key={agent.id}
                            className={cn(
                              'p-3 rounded-lg border cursor-pointer transition-all',
                              selectedAgent?.id === agent.id
                                ? 'border-aimana-teal bg-aimana-teal/5'
                                : 'border-surface-border hover:border-aimana-teal/50',
                              agent.status === 'coming_soon' && 'opacity-60'
                            )}
                            onClick={() => agent.status === 'available' && setSelectedAgent(agent)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={cn(
                                'flex h-8 w-8 items-center justify-center rounded-lg',
                                agent.categoryColor
                              )}>
                                <agent.icon className="h-4 w-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-text text-sm truncate">
                                    {agent.name}
                                  </span>
                                  {agent.status === 'coming_soon' && (
                                    <Badge variant="pending" size="sm">Em breve</Badge>
                                  )}
                                </div>
                                <p className="text-xs text-text-muted truncate">{agent.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              /* Custom Agent Config */
              <>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Configuração</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setShowConfig(!showConfig)}>
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  {showConfig && (
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-xs font-medium text-text-muted mb-1 block">Nome</label>
                        <Input defaultValue={currentAgent.name} inputSize="sm" />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-text-muted mb-1 block">Modelo</label>
                        <select className="w-full px-3 py-2 text-sm rounded-lg border border-surface-border bg-white">
                          <option>claude-3-5-sonnet</option>
                          <option>claude-3-opus</option>
                          <option>gpt-4-turbo</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-text-muted mb-1 block">
                          Temperature: {currentAgent.temperature}
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          defaultValue={currentAgent.temperature}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-text-muted mb-1 block">System Prompt</label>
                        <textarea
                          className="w-full px-3 py-2 text-sm rounded-lg border border-surface-border bg-white min-h-[100px] resize-none"
                          defaultValue={currentAgent.systemPrompt}
                        />
                      </div>
                    </CardContent>
                  )}
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Ferramentas</CardTitle>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {currentAgent.tools.map((tool) => (
                      <div
                        key={tool.id}
                        className={cn(
                          'flex items-center gap-3 p-2 rounded-lg',
                          tool.enabled ? 'bg-aimana-teal/10' : 'bg-surface-light'
                        )}
                      >
                        <tool.icon className={cn('h-4 w-4', tool.enabled ? 'text-aimana-teal' : 'text-text-muted')} />
                        <span className={cn('flex-1 text-sm', tool.enabled ? 'text-text' : 'text-text-muted')}>
                          {tool.name}
                        </span>
                        <input type="checkbox" defaultChecked={tool.enabled} className="rounded" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Test Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selected Agent Info */}
            {selectedAgent && activeTab === 'prebuilt' && (
              <Card className="border-aimana-teal/50 bg-aimana-teal/5">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-xl',
                      selectedAgent.categoryColor
                    )}>
                      <selectedAgent.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-text">{selectedAgent.name}</h3>
                        <Badge className={selectedAgent.categoryColor}>{selectedAgent.category}</Badge>
                      </div>
                      <p className="text-sm text-text-secondary mb-3">{selectedAgent.description}</p>
                      <div className="flex gap-2">
                        <Button size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Testar Agente
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Customizar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Visual Flow */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Fluxo do Agente</CardTitle>
                <CardDescription>Visualização do processamento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-4 py-6">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-xl bg-surface-light flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-text-muted" />
                    </div>
                    <span className="text-xs text-text-muted mt-2">Input</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-surface-border" />
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      'w-16 h-16 rounded-xl flex items-center justify-center',
                      isRunning ? 'bg-aimana-teal/20 animate-pulse' : 'bg-surface-light'
                    )}>
                      <Bot className={cn('h-6 w-6', isRunning ? 'text-aimana-teal' : 'text-text-muted')} />
                    </div>
                    <span className="text-xs text-text-muted mt-2">Agente</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-surface-border" />
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      'w-16 h-16 rounded-xl flex items-center justify-center',
                      isRunning ? 'bg-phase-execute-bg' : 'bg-surface-light'
                    )}>
                      <Zap className={cn('h-6 w-6', isRunning ? 'text-phase-execute' : 'text-text-muted')} />
                    </div>
                    <span className="text-xs text-text-muted mt-2">Tools</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-surface-border" />
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-xl bg-surface-light flex items-center justify-center">
                      <FileText className="h-6 w-6 text-text-muted" />
                    </div>
                    <span className="text-xs text-text-muted mt-2">Output</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Test Chat */}
            <Card className="flex flex-col h-[400px]">
              <CardHeader className="border-b border-surface-border">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Área de Teste</CardTitle>
                    <CardDescription>Teste o comportamento do agente</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Limpar
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0 flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
                  {testConversation.map((msg, i) => (
                    <div key={i}>
                      {msg.role === 'user' && (
                        <div className="flex justify-end">
                          <div className="bg-aimana-navy text-white rounded-lg px-3 py-2 text-sm max-w-[80%]">
                            {msg.content}
                          </div>
                        </div>
                      )}
                      {msg.role === 'assistant' && (
                        <div className="space-y-1">
                          {'thinking' in msg && msg.thinking && (
                            <div className="flex items-center gap-2 text-xs text-text-muted">
                              <Zap className="h-3 w-3" />
                              {msg.thinking}
                            </div>
                          )}
                          <div className="flex items-start gap-2">
                            <div className="w-6 h-6 rounded-full bg-aimana-teal flex items-center justify-center flex-shrink-0">
                              <Bot className="h-3 w-3 text-aimana-navy" />
                            </div>
                            <div className="bg-surface-light text-text rounded-lg px-3 py-2 text-sm max-w-[80%]">
                              {msg.content}
                            </div>
                          </div>
                        </div>
                      )}
                      {msg.role === 'tool' && (
                        <div className="flex items-center gap-2 mx-8 my-2">
                          <div className="flex-1 border-t border-dashed border-surface-border" />
                          <div className="flex items-center gap-1 text-xs text-text-muted bg-surface-light px-2 py-1 rounded">
                            <Database className="h-3 w-3" />
                            {msg.content}
                          </div>
                          <div className="flex-1 border-t border-dashed border-surface-border" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="border-t border-surface-border p-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Digite uma mensagem para testar..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      inputSize="sm"
                    />
                    <Button size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Metrics */}
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-2xl font-bold text-text">1.2s</p>
                  <p className="text-xs text-text-muted">Latência média</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-2xl font-bold text-status-success">95%</p>
                  <p className="text-xs text-text-muted">Taxa de sucesso</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-2xl font-bold text-text">$0.02</p>
                  <p className="text-xs text-text-muted">Custo/interação</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <p className="text-2xl font-bold text-text">2.1</p>
                  <p className="text-xs text-text-muted">Tools/interação</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
