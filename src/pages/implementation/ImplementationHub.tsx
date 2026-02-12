/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Implementation Hub Page
 * Kanban para gerenciamento de implementações de IA
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState, useRef, useEffect } from 'react';
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
  Plus,
  MoreHorizontal,
  User,
  Clock,
  ArrowRight,
  Sparkles,
  Users,
  Code2,
  Building2,
  Zap,
  Filter,
  LayoutGrid,
  List,
  X,
  Send,
  Bot,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type InitiativeFormData = {
  nome: string;
  area: string;
  descricao: string;
  objetivo: string;
  responsavel: string;
  prioridade: string;
};

const EMPTY_FORM: InitiativeFormData = {
  nome: '',
  area: '',
  descricao: '',
  objetivo: '',
  responsavel: '',
  prioridade: '',
};

const AREAS = [
  'Comercial',
  'Financeiro',
  'RH',
  'TI',
  'Operações',
  'Marketing',
  'Jurídico',
  'Outro',
];

const PRIORIDADES = [
  { value: 'low', label: 'Baixa' },
  { value: 'medium', label: 'Média' },
  { value: 'high', label: 'Alta' },
  { value: 'critical', label: 'Crítica' },
];

// ─── AI Navigator Logic ──────────────────────────────────────────────────────

const AI_QUESTIONS = [
  'Qual é a ideia de IA que você quer implementar? Descreva brevemente o que pretende automatizar ou melhorar.',
  'Qual é o objetivo principal desta iniciativa? (Ex: reduzir custos, aumentar velocidade, melhorar qualidade)',
  'Essa solução precisa se integrar com sistemas existentes? Se sim, quais? (Ex: ERP, CRM, e-mail, planilhas)',
  'O processo envolve uma única etapa ou múltiplas etapas encadeadas (automação multi-step)?',
  'Essa solução pode ser criada por um profissional de negócios (sem código) ou precisa de desenvolvedores?',
  'Quantos usuários serão atendidos por essa solução? (Ex: 1 pessoa, time de 5, departamento inteiro, toda a empresa)',
];

function classifyInitiative(answers: string[]): string {
  const allAnswers = answers.join(' ').toLowerCase();

  // Heuristic classification based on answer content
  let score = 0;

  // Integration complexity
  if (allAnswers.includes('erp') || allAnswers.includes('crm') || allAnswers.includes('api') || allAnswers.includes('banco de dados')) score += 2;
  if (allAnswers.includes('planilha') || allAnswers.includes('email') || allAnswers.includes('e-mail')) score += 1;

  // Multi-step
  if (allAnswers.includes('múltiplas') || allAnswers.includes('multi') || allAnswers.includes('várias etapas') || allAnswers.includes('encadeadas')) score += 2;

  // Developer needed
  if (allAnswers.includes('desenvolvedor') || allAnswers.includes('dev') || allAnswers.includes('programador') || allAnswers.includes('código customizado')) score += 3;
  if (allAnswers.includes('sem código') || allAnswers.includes('no-code') || allAnswers.includes('negócio')) score -= 1;

  // Scale
  if (allAnswers.includes('empresa inteira') || allAnswers.includes('toda empresa') || allAnswers.includes('centenas') || allAnswers.includes('milhares')) score += 3;
  if (allAnswers.includes('departamento')) score += 2;
  if (allAnswers.includes('time') || allAnswers.includes('equipe')) score += 1;

  // ML / AI specific
  if (allAnswers.includes('modelo') || allAnswers.includes('machine learning') || allAnswers.includes('ml') || allAnswers.includes('treinamento')) score += 3;
  if (allAnswers.includes('governança') || allAnswers.includes('infraestrutura')) score += 3;

  let level: number;
  if (score <= 1) level = 1;
  else if (score <= 4) level = 2;
  else if (score <= 7) level = 3;
  else level = 4;

  const classifications: Record<number, { name: string; track: string; tools: string; professionals: string; nextSteps: string }> = {
    1: {
      name: 'Nivel 1 -- Uso Basico (Sem Codigo)',
      track: 'Self-Service (Track 0) ou Ready-made (Track 1)',
      tools: 'ChatGPT, GPTs customizados, Microsoft Copilot, Gemini',
      professionals: 'O proprio usuario de negocio, com apoio do AI Champion',
      nextSteps: '1. Criar um GPT customizado ou configurar um copilot\n2. Testar com dados reais do dia-a-dia\n3. Documentar prompts e fluxos que funcionam\n4. Compartilhar com o time',
    },
    2: {
      name: 'Nivel 2 -- Solucoes Low-Code / No-Code',
      track: 'Champion-built (Track 2)',
      tools: 'n8n, Make (Integromat), Flowise, Power Automate, Zapier',
      professionals: 'AI Champion ou Citizen Developer, com suporte tecnico pontual',
      nextSteps: '1. Mapear o fluxo de trabalho atual\n2. Criar o workflow no-code com integracao\n3. Fazer PoC com um subconjunto de dados\n4. Validar com usuarios e iterar',
    },
    3: {
      name: 'Nivel 3 -- Desenvolvimento Customizado',
      track: 'Coder-built (Track 3)',
      tools: 'LangChain, CrewAI, Semantic Kernel, Python, APIs de LLMs',
      professionals: 'Desenvolvedor de software com experiencia em IA/LLMs',
      nextSteps: '1. Definir requisitos tecnicos detalhados\n2. Escolher stack e arquitetura\n3. Desenvolver MVP com testes automatizados\n4. Deploy em ambiente controlado para homologacao',
    },
    4: {
      name: 'Nivel 4 -- IA em Escala (Enterprise)',
      track: 'Aimana Services (Track 4)',
      tools: 'MLOps pipelines, Kubernetes, modelos customizados, infra dedicada',
      professionals: 'Time de ML Engineering, Data Scientists, DevOps/MLOps',
      nextSteps: '1. Assessment completo de infraestrutura e dados\n2. Definir governanca de IA e compliance\n3. Desenvolver pipeline de ML com monitoramento\n4. Planejar escala e observabilidade em producao',
    },
  };

  const c = classifications[level];

  return `Baseado nas suas respostas, aqui esta a classificacao da iniciativa:

**${c.name}**

**Track Recomendado:** ${c.track}

**Ferramentas sugeridas:** ${c.tools}

**Profissionais indicados:** ${c.professionals}

**Proximos passos:**
${c.nextSteps}

Voce pode ajustar os campos do formulario ao lado com base nessa classificacao. Quando estiver pronto, clique em "Criar Iniciativa" para adicionar ao kanban.`;
}

// Implementation tracks
const tracks = [
  { id: 0, name: 'Self-Service', icon: User, color: 'bg-gray-500' },
  { id: 1, name: 'Ready-made', icon: Sparkles, color: 'bg-aimana-teal' },
  { id: 2, name: 'Champion-built', icon: Users, color: 'bg-aimana-blue' },
  { id: 3, name: 'Coder-built', icon: Code2, color: 'bg-purple-500' },
  { id: 4, name: 'Aimana Services', icon: Building2, color: 'bg-aimana-navy' },
];

// Kanban columns
const columns = [
  { id: 'backlog', name: 'Backlog', color: 'bg-gray-200' },
  { id: 'discovery', name: 'Em Descoberta', color: 'bg-blue-200' },
  { id: 'poc', name: 'Em PoC', color: 'bg-yellow-200' },
  { id: 'building', name: 'Em Construção', color: 'bg-orange-200' },
  { id: 'homolog', name: 'Homologação', color: 'bg-purple-200' },
  { id: 'production', name: 'Em Produção', color: 'bg-green-200' },
];

// Mock initiatives data
const initialInitiatives = [
  {
    id: 1,
    title: 'Triagem de E-mails',
    area: 'Comercial',
    track: 1,
    owner: 'Maria Silva',
    techOwner: 'João Dev',
    status: 'production',
    priority: 'high',
    daysInColumn: 5,
  },
  {
    id: 2,
    title: 'Relatórios Financeiros',
    area: 'Financeiro',
    track: 2,
    owner: 'Carlos Lima',
    techOwner: 'Ana Champion',
    status: 'homolog',
    priority: 'high',
    daysInColumn: 3,
  },
  {
    id: 3,
    title: 'Chatbot CS',
    area: 'Customer Success',
    track: 3,
    owner: 'Pedro Costa',
    techOwner: 'Lucas Coder',
    status: 'building',
    priority: 'medium',
    daysInColumn: 12,
  },
  {
    id: 4,
    title: 'Análise de Contratos',
    area: 'Jurídico',
    track: 3,
    owner: 'Fernanda Alves',
    techOwner: null,
    status: 'poc',
    priority: 'medium',
    daysInColumn: 8,
  },
  {
    id: 5,
    title: 'Previsão de Demanda',
    area: 'Operações',
    track: 4,
    owner: 'Roberto Souza',
    techOwner: 'Aimana Team',
    status: 'discovery',
    priority: 'high',
    daysInColumn: 5,
  },
  {
    id: 6,
    title: 'Copilot de Vendas',
    area: 'Comercial',
    track: 2,
    owner: 'Juliana Santos',
    techOwner: null,
    status: 'backlog',
    priority: 'low',
    daysInColumn: 15,
  },
  {
    id: 7,
    title: 'Onboarding Automático',
    area: 'RH',
    track: 1,
    owner: 'Mariana Oliveira',
    techOwner: null,
    status: 'backlog',
    priority: 'medium',
    daysInColumn: 7,
  },
  {
    id: 8,
    title: 'Resumo de Reuniões',
    area: 'Geral',
    track: 0,
    owner: 'Todos',
    techOwner: null,
    status: 'production',
    priority: 'low',
    daysInColumn: 30,
  },
];

const priorityConfig = {
  high: { label: 'Alta', color: 'bg-status-error', textColor: 'text-status-error' },
  medium: { label: 'Média', color: 'bg-status-warning', textColor: 'text-status-warning' },
  low: { label: 'Baixa', color: 'bg-gray-400', textColor: 'text-text-muted' },
};

export function ImplementationHub() {
  const [initiatives, setInitiatives] = useState(initialInitiatives);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [filterTrack, setFilterTrack] = useState<number | null>(null);

  // ── Modal state ──────────────────────────────────────────────────────────
  const [showNewInitiativeModal, setShowNewInitiativeModal] = useState(false);
  const [formData, setFormData] = useState<InitiativeFormData>(EMPTY_FORM);

  // ── AI Navigator state ───────────────────────────────────────────────────
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [aiQuestionIndex, setAiQuestionIndex] = useState(0);
  const [aiAnswers, setAiAnswers] = useState<string[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [aiClassified, setAiClassified] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiTyping]);

  // ── Modal handlers ───────────────────────────────────────────────────────

  function openModal() {
    setFormData(EMPTY_FORM);
    setChatMessages([
      {
        role: 'assistant',
        content:
          'Ola! Sou o AI Navigator e vou te ajudar a classificar essa iniciativa de IA. Vou fazer algumas perguntas para entender melhor o que voce precisa e recomendar o melhor caminho de implementacao.\n\nVamos comecar: Qual e a ideia de IA que voce quer implementar? Descreva brevemente o que pretende automatizar ou melhorar.',
      },
    ]);
    setChatInput('');
    setAiQuestionIndex(0);
    setAiAnswers([]);
    setIsAiTyping(false);
    setAiClassified(false);
    setShowNewInitiativeModal(true);
  }

  function closeModal() {
    setShowNewInitiativeModal(false);
  }

  function handleFormChange(field: keyof InitiativeFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSendChat() {
    const message = chatInput.trim();
    if (!message || isAiTyping || aiClassified) return;

    // Add user message
    setChatMessages((prev) => [...prev, { role: 'user', content: message }]);
    setChatInput('');

    // Store answer
    const newAnswers = [...aiAnswers, message];
    setAiAnswers(newAnswers);

    // Simulate AI response
    setIsAiTyping(true);
    const nextIndex = aiQuestionIndex + 1;

    setTimeout(() => {
      if (nextIndex < AI_QUESTIONS.length) {
        // Ask next question
        setChatMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `Entendido! ${AI_QUESTIONS[nextIndex]}` },
        ]);
        setAiQuestionIndex(nextIndex);
      } else {
        // All questions answered - provide classification
        const classification = classifyInitiative(newAnswers);
        setChatMessages((prev) => [
          ...prev,
          { role: 'assistant', content: classification },
        ]);
        setAiClassified(true);
      }
      setIsAiTyping(false);
    }, 1200);
  }

  function handleChatKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendChat();
    }
  }

  function handleCreateInitiative() {
    if (!formData.nome.trim()) return;

    const prioridadeMap: Record<string, string> = {
      low: 'low',
      medium: 'medium',
      high: 'high',
      critical: 'high',
    };

    const newInitiative = {
      id: Math.max(...initiatives.map((i) => i.id), 0) + 1,
      title: formData.nome,
      area: formData.area || 'Geral',
      track: 0,
      owner: formData.responsavel || 'Não definido',
      techOwner: null,
      status: 'backlog',
      priority: prioridadeMap[formData.prioridade] || 'medium',
      daysInColumn: 0,
    };

    setInitiatives((prev) => [...prev, newInitiative]);
    closeModal();
  }

  const filteredInitiatives = filterTrack !== null
    ? initiatives.filter((i) => i.track === filterTrack)
    : initiatives;

  const getInitiativesByColumn = (columnId: string) =>
    filteredInitiatives.filter((i) => i.status === columnId);

  const stats = {
    total: initiatives.length,
    inProgress: initiatives.filter((i) => !['backlog', 'production'].includes(i.status)).length,
    production: initiatives.filter((i) => i.status === 'production').length,
  };

  return (
    <div>
      <Header
        title="Hub de Implementações"
        subtitle="Gerencie o ciclo de vida das iniciativas de IA"
      />

      <main className="p-6">
        {/* Top Bar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          {/* Stats */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-text-muted">Total:</span>
              <span className="font-semibold text-text">{stats.total}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-text-muted">Em Andamento:</span>
              <span className="font-semibold text-aimana-blue">{stats.inProgress}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-text-muted">Em Produção:</span>
              <span className="font-semibold text-status-success">{stats.production}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Track Filter */}
            <div className="flex items-center gap-1 mr-2">
              <Button
                variant={filterTrack === null ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setFilterTrack(null)}
              >
                Todos
              </Button>
              {tracks.map((track) => (
                <Button
                  key={track.id}
                  variant={filterTrack === track.id ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterTrack(track.id)}
                  title={track.name}
                >
                  <track.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex border border-surface-border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('kanban')}
                className={cn(
                  'p-2',
                  viewMode === 'kanban' ? 'bg-aimana-navy text-white' : 'text-text-muted hover:bg-surface-hover'
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2',
                  viewMode === 'list' ? 'bg-aimana-navy text-white' : 'text-text-muted hover:bg-surface-hover'
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <Button variant="primary" size="sm" onClick={openModal}>
              <Plus className="h-4 w-4 mr-1" />
              Nova Iniciativa
            </Button>
          </div>
        </div>

        {/* Track Legend */}
        <Card className="mb-6">
          <CardContent className="py-3">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-medium text-text">Implementation Tracks:</span>
              {tracks.map((track) => (
                <div key={track.id} className="flex items-center gap-2 text-sm">
                  <div className={cn('h-3 w-3 rounded-full', track.color)} />
                  <span className="text-text-secondary">
                    {track.id}: {track.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Kanban Board */}
        {viewMode === 'kanban' ? (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {columns.map((column) => {
              const columnInitiatives = getInitiativesByColumn(column.id);
              return (
                <div
                  key={column.id}
                  className="flex-shrink-0 w-72"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={cn('h-3 w-3 rounded-full', column.color)} />
                      <h3 className="font-semibold text-text text-sm">{column.name}</h3>
                      <Badge variant="outline" size="sm">
                        {columnInitiatives.length}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="icon-sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Column Cards */}
                  <div className="space-y-3 min-h-[400px] rounded-lg bg-surface-light p-2">
                    {columnInitiatives.map((initiative) => {
                      const track = tracks[initiative.track];
                      const priority = priorityConfig[initiative.priority as keyof typeof priorityConfig];
                      return (
                        <Card
                          key={initiative.id}
                          variant="interactive"
                          padding="sm"
                          className="cursor-grab active:cursor-grabbing"
                        >
                          <CardContent className="p-3">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className={cn('h-2 w-2 rounded-full', track.color)} />
                                <span className="text-xs text-text-muted">Track {track.id}</span>
                              </div>
                              <div className={cn('h-2 w-2 rounded-full', priority.color)} title={`Prioridade ${priority.label}`} />
                            </div>

                            {/* Title */}
                            <h4 className="font-medium text-text text-sm mb-1">
                              {initiative.title}
                            </h4>

                            {/* Area */}
                            <Badge variant="outline" size="sm" className="mb-2">
                              {initiative.area}
                            </Badge>

                            {/* Footer */}
                            <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-surface-border mt-2">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span className="truncate max-w-[80px]">{initiative.owner}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{initiative.daysInColumn}d</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}

                    {columnInitiatives.length === 0 && (
                      <div className="flex items-center justify-center h-24 text-sm text-text-muted">
                        Nenhuma iniciativa
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-border text-left">
                    <th className="p-4 text-xs font-medium text-text-muted">Iniciativa</th>
                    <th className="p-4 text-xs font-medium text-text-muted">Área</th>
                    <th className="p-4 text-xs font-medium text-text-muted">Track</th>
                    <th className="p-4 text-xs font-medium text-text-muted">Status</th>
                    <th className="p-4 text-xs font-medium text-text-muted">Owner</th>
                    <th className="p-4 text-xs font-medium text-text-muted">Prioridade</th>
                    <th className="p-4 text-xs font-medium text-text-muted">Dias</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border">
                  {filteredInitiatives.map((initiative) => {
                    const track = tracks[initiative.track];
                    const column = columns.find((c) => c.id === initiative.status);
                    const priority = priorityConfig[initiative.priority as keyof typeof priorityConfig];
                    return (
                      <tr key={initiative.id} className="hover:bg-surface-hover">
                        <td className="p-4">
                          <span className="font-medium text-text">{initiative.title}</span>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" size="sm">{initiative.area}</Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className={cn('h-2 w-2 rounded-full', track.color)} />
                            <span className="text-sm text-text-secondary">{track.name}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className={cn('h-2 w-2 rounded-full', column?.color)} />
                            <span className="text-sm text-text">{column?.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-text-secondary">{initiative.owner}</td>
                        <td className="p-4">
                          <span className={cn('text-sm font-medium', priority.textColor)}>
                            {priority.label}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-text-muted">{initiative.daysInColumn}d</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            Nova Iniciativa Modal
            ═══════════════════════════════════════════════════════════════════ */}
        {showNewInitiativeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeModal}
            />

            {/* Modal */}
            <div className="relative w-full max-w-5xl mx-4 max-h-[90vh] overflow-hidden rounded-xl border border-surface-border bg-white shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border bg-surface-light">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-aimana-teal/10">
                    <Sparkles className="h-5 w-5 text-aimana-teal" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-text">Nova Iniciativa de IA</h2>
                    <p className="text-sm text-text-muted">Preencha os dados e use o AI Navigator para classificar</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-surface-hover hover:text-text transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body - Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-5 overflow-hidden" style={{ maxHeight: 'calc(90vh - 140px)' }}>
                {/* ── Left Side: Form (3 cols) ──────────────────────────── */}
                <div className="lg:col-span-3 overflow-y-auto p-6 border-r border-surface-border">
                  <div className="space-y-5">
                    {/* Nome da Iniciativa */}
                    <div>
                      <label className="block text-sm font-medium text-text mb-1.5">
                        Nome da Iniciativa <span className="text-status-error">*</span>
                      </label>
                      <Input
                        placeholder="Ex: Triagem Automatica de E-mails"
                        value={formData.nome}
                        onChange={(e) => handleFormChange('nome', e.target.value)}
                      />
                    </div>

                    {/* Area / Departamento */}
                    <div>
                      <label className="block text-sm font-medium text-text mb-1.5">
                        Area / Departamento
                      </label>
                      <select
                        className="flex w-full rounded-lg border border-surface-border bg-white px-3 h-10 text-sm text-text transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aimana-teal/20 focus-visible:border-aimana-teal"
                        value={formData.area}
                        onChange={(e) => handleFormChange('area', e.target.value)}
                      >
                        <option value="">Selecione uma area...</option>
                        {AREAS.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Descricao do problema */}
                    <div>
                      <label className="block text-sm font-medium text-text mb-1.5">
                        Descricao do Problema
                      </label>
                      <textarea
                        className="flex w-full rounded-lg border border-surface-border bg-white px-3 py-2 text-sm text-text transition-all duration-200 placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aimana-teal/20 focus-visible:border-aimana-teal resize-none"
                        rows={3}
                        placeholder="Descreva o problema atual que essa iniciativa pretende resolver..."
                        value={formData.descricao}
                        onChange={(e) => handleFormChange('descricao', e.target.value)}
                      />
                    </div>

                    {/* Objetivo com IA */}
                    <div>
                      <label className="block text-sm font-medium text-text mb-1.5">
                        Objetivo com IA
                      </label>
                      <textarea
                        className="flex w-full rounded-lg border border-surface-border bg-white px-3 py-2 text-sm text-text transition-all duration-200 placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aimana-teal/20 focus-visible:border-aimana-teal resize-none"
                        rows={3}
                        placeholder="O que voce espera alcançar utilizando IA nesse processo?"
                        value={formData.objetivo}
                        onChange={(e) => handleFormChange('objetivo', e.target.value)}
                      />
                    </div>

                    {/* Responsavel */}
                    <div>
                      <label className="block text-sm font-medium text-text mb-1.5">
                        Responsavel
                      </label>
                      <Input
                        placeholder="Nome do responsavel pela iniciativa"
                        value={formData.responsavel}
                        onChange={(e) => handleFormChange('responsavel', e.target.value)}
                        leftElement={<User className="h-4 w-4" />}
                      />
                    </div>

                    {/* Prioridade */}
                    <div>
                      <label className="block text-sm font-medium text-text mb-1.5">
                        Prioridade
                      </label>
                      <select
                        className="flex w-full rounded-lg border border-surface-border bg-white px-3 h-10 text-sm text-text transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aimana-teal/20 focus-visible:border-aimana-teal"
                        value={formData.prioridade}
                        onChange={(e) => handleFormChange('prioridade', e.target.value)}
                      >
                        <option value="">Selecione a prioridade...</option>
                        {PRIORIDADES.map((p) => (
                          <option key={p.value} value={p.value}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* ── Right Side: AI Navigator (2 cols) ─────────────────── */}
                <div className="lg:col-span-2 flex flex-col overflow-hidden bg-gradient-to-b from-aimana-navy/5 to-white">
                  {/* AI Header */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-border bg-aimana-navy/5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-aimana-teal">
                      <Bot className="h-4 w-4 text-aimana-navy" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-text">AI Navigator</span>
                      <span className="ml-2 text-xs text-text-muted">
                        {aiClassified
                          ? 'Classificacao concluida'
                          : `Pergunta ${Math.min(aiQuestionIndex + 1, AI_QUESTIONS.length)} de ${AI_QUESTIONS.length}`}
                      </span>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ maxHeight: 'calc(90vh - 280px)' }}>
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'flex',
                          msg.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        <div
                          className={cn(
                            'max-w-[90%] rounded-xl px-3 py-2 text-sm whitespace-pre-line',
                            msg.role === 'user'
                              ? 'bg-aimana-teal text-aimana-navy rounded-br-sm'
                              : 'bg-white border border-surface-border text-text rounded-bl-sm shadow-sm'
                          )}
                        >
                          {msg.role === 'assistant' && (
                            <div className="flex items-center gap-1.5 mb-1">
                              <Bot className="h-3 w-3 text-aimana-teal" />
                              <span className="text-xs font-medium text-aimana-teal">AI Navigator</span>
                            </div>
                          )}
                          {msg.content}
                        </div>
                      </div>
                    ))}

                    {/* Typing indicator */}
                    {isAiTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-surface-border rounded-xl rounded-bl-sm px-3 py-2 shadow-sm">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Bot className="h-3 w-3 text-aimana-teal" />
                            <span className="text-xs font-medium text-aimana-teal">AI Navigator</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-aimana-teal/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="h-2 w-2 rounded-full bg-aimana-teal/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="h-2 w-2 rounded-full bg-aimana-teal/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={chatEndRef} />
                  </div>

                  {/* Chat Input */}
                  <div className="px-4 py-3 border-t border-surface-border bg-white">
                    {!aiClassified ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="flex-1 rounded-lg border border-surface-border bg-white px-3 h-9 text-sm text-text placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aimana-teal/20 focus-visible:border-aimana-teal"
                          placeholder="Digite sua resposta..."
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyDown={handleChatKeyDown}
                          disabled={isAiTyping}
                        />
                        <Button
                          variant="primary"
                          size="icon-sm"
                          onClick={handleSendChat}
                          disabled={isAiTyping || !chatInput.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Badge variant="success" size="lg" dot>
                          Classificacao concluida
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-surface-border bg-surface-light">
                <Button variant="ghost" size="sm" onClick={closeModal}>
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleCreateInitiative}
                  disabled={!formData.nome.trim()}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Criar Iniciativa
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
