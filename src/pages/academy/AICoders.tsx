/**
 * ===============================================================================
 * AIMANA JOURNEY - AI Coders Program Page
 * Programa de capacitacao tecnica para desenvolvedores com gamificacao
 * ===============================================================================
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
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui';
import {
  Code,
  BookOpen,
  Clock,
  CheckCircle2,
  Play,
  Send,
  Terminal,
  GitBranch,
  Database,
  Cpu,
  Zap,
  Star,
  Trophy,
  Target,
  Flame,
  Award,
  Users,
  ExternalLink,
  ChevronRight,
  Lock,
  X,
  MessageSquare,
  Box,
  BarChart3,
  Layers,
  ArrowRight,
  Shield,
  Eye,
  Timer,
  ThumbsUp,
  Crown,
  Bot,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// Types
// ============================================================================

type ChatMessage = { role: 'user' | 'assistant'; content: string };

type DifficultyTier = 'Easy' | 'Medium' | 'Hard' | 'Expert';

interface LearningModule {
  name: string;
  completed: boolean;
}

interface LearningTrack {
  id: string;
  title: string;
  description: string;
  modules: LearningModule[];
  icon: React.ElementType;
  prerequisites: string[];
  xpReward: number;
}

interface CodeChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyTier;
  points: number;
  completed: boolean;
  timeLimit?: string;
  participants: number;
  tags: string[];
  isWeekly?: boolean;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  level: string;
  challenges: number;
  streak: number;
  badges: string[];
}

// ============================================================================
// Data
// ============================================================================

const DIFFICULTY_CONFIG: Record<DifficultyTier, { xp: number; variant: 'success' | 'warning' | 'error' | 'pending' }> = {
  Easy: { xp: 50, variant: 'success' },
  Medium: { xp: 100, variant: 'warning' },
  Hard: { xp: 200, variant: 'error' },
  Expert: { xp: 500, variant: 'pending' },
};

const LEVEL_THRESHOLDS = [
  { name: 'Junior AI Engineer', minXp: 0, icon: Code },
  { name: 'Mid AI Engineer', minXp: 1000, icon: Terminal },
  { name: 'Senior AI Engineer', minXp: 3000, icon: Zap },
  { name: 'Staff AI Engineer', minXp: 7000, icon: Crown },
];

const learningTracks: LearningTrack[] = [
  {
    id: 'fundamentals',
    title: 'Fundamentos de LLMs',
    description: 'Como funcionam os modelos de linguagem',
    modules: [
      { name: 'Arquitetura de Transformers', completed: true },
      { name: 'Tokenizacao e Embeddings', completed: true },
      { name: 'Fine-tuning vs Prompting', completed: false },
      { name: 'Avaliacao de Modelos', completed: false },
    ],
    icon: Cpu,
    prerequisites: [],
    xpReward: 200,
  },
  {
    id: 'prompting',
    title: 'Prompt Engineering Avancado',
    description: 'Tecnicas avancadas de prompting',
    modules: [
      { name: 'Chain-of-Thought', completed: true },
      { name: 'Few-shot Learning', completed: true },
      { name: 'Self-consistency', completed: true },
      { name: 'Constitutional AI', completed: false },
    ],
    icon: Terminal,
    prerequisites: ['fundamentals'],
    xpReward: 300,
  },
  {
    id: 'agents',
    title: 'Construindo Agentes',
    description: 'Agentes autonomos com LangChain',
    modules: [
      { name: 'Arquitetura de Agentes', completed: false },
      { name: 'Tools e Functions', completed: false },
      { name: 'Memoria e Contexto', completed: false },
      { name: 'ReAct Pattern', completed: false },
      { name: 'Multi-agent Systems', completed: false },
    ],
    icon: Bot,
    prerequisites: ['prompting'],
    xpReward: 500,
  },
  {
    id: 'rag',
    title: 'RAG: Retrieval Augmented Generation',
    description: 'Sistemas com conhecimento proprio',
    modules: [
      { name: 'Vector Databases', completed: false },
      { name: 'Chunking Strategies', completed: false },
      { name: 'Hybrid Search', completed: false },
      { name: 'Evaluation & Metrics', completed: false },
    ],
    icon: Database,
    prerequisites: ['fundamentals'],
    xpReward: 400,
  },
  {
    id: 'production',
    title: 'IA em Producao',
    description: 'Deploy e operacao de sistemas de IA',
    modules: [
      { name: 'LLMOps Fundamentals', completed: false },
      { name: 'Observability & Tracing', completed: false },
      { name: 'Cost Optimization', completed: false },
      { name: 'Security & Guardrails', completed: false },
    ],
    icon: GitBranch,
    prerequisites: ['rag'],
    xpReward: 500,
  },
];

const challenges: CodeChallenge[] = [
  {
    id: 'ch-1',
    title: 'Build a RAG Chatbot',
    description: 'Crie um chatbot com retrieval-augmented generation usando LangChain e um vector store.',
    difficulty: 'Medium',
    points: 100,
    completed: false,
    timeLimit: '3 dias',
    participants: 42,
    tags: ['RAG', 'LangChain', 'Vector DB'],
  },
  {
    id: 'ch-2',
    title: 'Implement Chain-of-Thought',
    description: 'Implemente um sistema de raciocinio passo a passo com validacao automatica.',
    difficulty: 'Easy',
    points: 50,
    completed: true,
    participants: 87,
    tags: ['Prompting', 'CoT'],
  },
  {
    id: 'ch-3',
    title: 'Multi-Agent Debate System',
    description: 'Construa um sistema onde multiplos agentes debatem e chegam a um consenso.',
    difficulty: 'Hard',
    points: 200,
    completed: false,
    timeLimit: '5 dias',
    participants: 18,
    tags: ['Agents', 'Multi-Agent', 'LangGraph'],
  },
  {
    id: 'ch-4',
    title: 'Custom Evaluation Framework',
    description: 'Desenvolva um framework de avaliacao de LLMs com metricas customizadas.',
    difficulty: 'Medium',
    points: 100,
    completed: false,
    participants: 31,
    tags: ['Evaluation', 'Metrics'],
  },
  {
    id: 'ch-5',
    title: 'Production-Grade Guardrails',
    description: 'Implemente guardrails de seguranca para um sistema de IA em producao com rate limiting e content filtering.',
    difficulty: 'Expert',
    points: 500,
    completed: false,
    timeLimit: '7 dias',
    participants: 7,
    tags: ['Security', 'Production', 'Guardrails'],
    isWeekly: true,
  },
  {
    id: 'ch-6',
    title: 'Streaming Response Handler',
    description: 'Crie um handler de respostas em streaming com tratamento de erros e retry logic.',
    difficulty: 'Easy',
    points: 50,
    completed: true,
    participants: 64,
    tags: ['Streaming', 'API'],
  },
];

const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Larissa Mendes', avatar: 'LM', xp: 8450, level: 'Staff AI Engineer', challenges: 28, streak: 45, badges: ['LangChain', 'RAG', 'Agents', 'Production'] },
  { rank: 2, name: 'Felipe Rocha', avatar: 'FR', xp: 7200, level: 'Staff AI Engineer', challenges: 24, streak: 32, badges: ['RAG', 'Agents', 'Evaluation'] },
  { rank: 3, name: 'Camila Vieira', avatar: 'CV', xp: 5800, level: 'Senior AI Engineer', challenges: 19, streak: 28, badges: ['LangChain', 'Prompting', 'Agents'] },
  { rank: 4, name: 'Diego Santos', avatar: 'DS', xp: 4350, level: 'Senior AI Engineer', challenges: 16, streak: 15, badges: ['RAG', 'LangChain'] },
  { rank: 5, name: 'Juliana Alves', avatar: 'JA', xp: 3900, level: 'Senior AI Engineer', challenges: 14, streak: 21, badges: ['Prompting', 'Evaluation'] },
  { rank: 6, name: 'Bruno Costa', avatar: 'BC', xp: 3100, level: 'Senior AI Engineer', challenges: 12, streak: 8, badges: ['LangChain', 'RAG'] },
  { rank: 7, name: 'Ana Oliveira', avatar: 'AO', xp: 2400, level: 'Mid AI Engineer', challenges: 10, streak: 14, badges: ['Prompting'] },
  { rank: 8, name: 'Rafael Lima', avatar: 'RL', xp: 2100, level: 'Mid AI Engineer', challenges: 9, streak: 6, badges: ['RAG'] },
  { rank: 9, name: 'Thiago Pereira', avatar: 'TP', xp: 1800, level: 'Mid AI Engineer', challenges: 7, streak: 11, badges: ['Agents'] },
  { rank: 10, name: 'Marina Souza', avatar: 'MS', xp: 1500, level: 'Mid AI Engineer', challenges: 6, streak: 4, badges: ['Prompting'] },
];

const playgroundEnvironments = [
  {
    id: 'python-langchain',
    title: 'Python + LangChain',
    description: 'Ambiente completo com Python 3.11, LangChain, OpenAI SDK e ferramentas de debugging.',
    icon: Terminal,
    tags: ['Python', 'LangChain', 'OpenAI'],
    status: 'available' as const,
  },
  {
    id: 'rag-pipeline',
    title: 'RAG Pipeline',
    description: 'Sandbox pre-configurado com ChromaDB, embeddings e uma base de dados de exemplo.',
    icon: Database,
    tags: ['ChromaDB', 'Embeddings', 'Search'],
    status: 'available' as const,
  },
  {
    id: 'agent-builder',
    title: 'Agent Builder',
    description: 'Construa agentes com LangGraph, tools customizadas e observability integrado.',
    icon: Bot,
    tags: ['LangGraph', 'Tools', 'Tracing'],
    status: 'coming_soon' as const,
  },
];

const techBadges = [
  { name: 'LangChain', earned: true, icon: Layers },
  { name: 'RAG', earned: true, icon: Database },
  { name: 'Prompting', earned: true, icon: Terminal },
  { name: 'Agents', earned: false, icon: Bot },
  { name: 'Evaluation', earned: false, icon: BarChart3 },
  { name: 'Production', earned: false, icon: Shield },
  { name: 'LangGraph', earned: false, icon: GitBranch },
  { name: 'Streaming', earned: true, icon: Zap },
];

const resources = [
  { title: 'Documentacao LangChain', icon: BookOpen, url: '#', description: 'Guia completo da framework' },
  { title: 'Repositorio de Exemplos', icon: GitBranch, url: '#', description: 'Codigo-fonte dos desafios' },
  { title: 'API Reference', icon: Database, url: '#', description: 'Referencia da API Aimana' },
  { title: 'LangSmith Tracing', icon: Eye, url: '#', description: 'Observability para LLMs' },
  { title: 'Community Discord', icon: MessageSquare, url: '#', description: 'Comunidade de devs' },
  { title: 'AI Security Guide', icon: Shield, url: '#', description: 'Boas praticas de seguranca' },
];

// ============================================================================
// Helper Functions
// ============================================================================

function getCurrentLevel(xp: number) {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i].minXp) return LEVEL_THRESHOLDS[i];
  }
  return LEVEL_THRESHOLDS[0];
}

function getNextLevel(xp: number) {
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp < LEVEL_THRESHOLDS[i].minXp) return LEVEL_THRESHOLDS[i];
  }
  return null;
}

function getLevelProgress(xp: number): number {
  const current = getCurrentLevel(xp);
  const next = getNextLevel(xp);
  if (!next) return 100;
  const range = next.minXp - current.minXp;
  const progress = xp - current.minXp;
  return Math.round((progress / range) * 100);
}

// ============================================================================
// Skill Tree Node Component
// ============================================================================

function SkillTreeNode({
  track,
  isUnlocked,
  onClick,
  isSelected,
}: {
  track: LearningTrack;
  isUnlocked: boolean;
  onClick: () => void;
  isSelected: boolean;
}) {
  const completedCount = track.modules.filter((m) => m.completed).length;
  const isComplete = completedCount === track.modules.length;
  const progressPct = (completedCount / track.modules.length) * 100;

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 w-full',
        'hover:shadow-lg hover:-translate-y-0.5',
        isComplete
          ? 'border-status-success bg-status-success-bg shadow-md'
          : isSelected
            ? 'border-aimana-teal bg-aimana-teal/5 shadow-md'
            : isUnlocked
              ? 'border-surface-border bg-surface hover:border-aimana-blue'
              : 'border-surface-border bg-surface-light opacity-60 cursor-not-allowed'
      )}
      disabled={!isUnlocked}
    >
      {!isUnlocked && (
        <div className="absolute -top-2 -right-2 bg-surface rounded-full p-1 border border-surface-border">
          <Lock className="h-3 w-3 text-text-muted" />
        </div>
      )}
      {isComplete && (
        <div className="absolute -top-2 -right-2 bg-status-success rounded-full p-1">
          <CheckCircle2 className="h-3 w-3 text-white" />
        </div>
      )}

      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-xl mb-2',
          isComplete
            ? 'bg-status-success text-white'
            : isUnlocked
              ? 'bg-phase-manage-bg text-phase-manage'
              : 'bg-surface-light text-text-muted'
        )}
      >
        <track.icon className="h-6 w-6" />
      </div>

      <h4 className={cn(
        'text-sm font-semibold text-center leading-tight',
        isUnlocked ? 'text-text' : 'text-text-muted'
      )}>
        {track.title}
      </h4>

      <div className="w-full mt-2">
        <Progress
          value={progressPct}
          size="sm"
          variant={isComplete ? 'success' : 'default'}
        />
        <p className="text-xs text-text-muted mt-1 text-center">
          {completedCount}/{track.modules.length}
        </p>
      </div>

      <Badge variant="outline" size="sm" className="mt-1">
        +{track.xpReward} XP
      </Badge>
    </button>
  );
}

// ============================================================================
// Streak Heatmap Component
// ============================================================================

function StreakHeatmap({ weeks = 12 }: { weeks?: number }) {
  // Generate mock contribution data
  const days = weeks * 7;
  const contributions: number[] = [];
  for (let i = 0; i < days; i++) {
    const rand = Math.random();
    if (rand < 0.3) contributions.push(0);
    else if (rand < 0.55) contributions.push(1);
    else if (rand < 0.75) contributions.push(2);
    else if (rand < 0.9) contributions.push(3);
    else contributions.push(4);
  }

  const intensityColors = [
    'bg-surface-light',
    'bg-aimana-teal/20',
    'bg-aimana-teal/40',
    'bg-aimana-teal/70',
    'bg-aimana-teal',
  ];

  return (
    <div className="space-y-2">
      <div className="flex gap-[3px]">
        {Array.from({ length: weeks }).map((_, weekIdx) => (
          <div key={weekIdx} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }).map((_, dayIdx) => {
              const index = weekIdx * 7 + dayIdx;
              const level = contributions[index] || 0;
              return (
                <div
                  key={dayIdx}
                  className={cn(
                    'h-3 w-3 rounded-sm',
                    intensityColors[level]
                  )}
                  title={`${level} atividades`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 justify-end">
        <span className="text-xs text-text-muted">Menos</span>
        {intensityColors.map((color, i) => (
          <div key={i} className={cn('h-3 w-3 rounded-sm', color)} />
        ))}
        <span className="text-xs text-text-muted">Mais</span>
      </div>
    </div>
  );
}

// ============================================================================
// Pair Programmer Modal Component
// ============================================================================

function PairProgrammerModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Ola, dev! Sou o Pair Programmer, seu assistente tecnico para IA.

Seu progresso:
- 7 de 21 modulos completos (33%)
- Trilha atual: Prompt Engineering Avancado

Proximo desafio sugerido:
"Build a RAG Chatbot" (100 pontos)

Posso ajudar com:
- Explicar conceitos tecnicos
- Revisar codigo
- Sugerir abordagens
- Debugar problemas

O que esta desenvolvendo?`,
    },
  ]);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: 'user', content: chatInput }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Para implementar RAG, aqui esta um exemplo basico:

\`\`\`python
from langchain.vectorstores import Pinecone
from langchain.embeddings import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA

# 1. Setup embeddings e vector store
embeddings = OpenAIEmbeddings()
vectorstore = Pinecone.from_existing_index(
    "my-index", embeddings
)

# 2. Create retriever
retriever = vectorstore.as_retriever(
    search_kwargs={"k": 3}
)

# 3. Setup QA chain
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(model="gpt-4"),
    retriever=retriever,
    return_source_documents=True
)

# 4. Query
result = qa_chain("pergunta aqui")
\`\`\`

Dicas importantes:
1. Teste diferentes chunk sizes
2. Use hybrid search quando possivel
3. Monitore latencia e custos

Quer que eu detalhe alguma parte?`,
        },
      ]);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 animate-in fade-in-50 duration-200">
        <Card className="border-2 border-phase-manage shadow-2xl">
          <CardHeader className="border-b border-surface-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-phase-manage">
                  <Terminal className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base">Pair Programmer</CardTitle>
                  <CardDescription>Assistente tecnico de IA</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon-sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm',
                    msg.role === 'user'
                      ? 'bg-aimana-navy text-white ml-8'
                      : 'bg-surface-light text-text mr-4'
                  )}
                >
                  <p className="whitespace-pre-wrap font-mono text-xs">{msg.content}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-surface-border p-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Pergunte sobre codigo..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                  inputSize="sm"
                />
                <Button size="sm" onClick={handleChatSend}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function AICoders() {
  const [activeTab, setActiveTab] = useState('trilhas');
  const [selectedTrack, setSelectedTrack] = useState<LearningTrack | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Profile stats (mock)
  const userXp = 1250;
  const userStreak = 7;
  const userChallengesCompleted = 5;
  const userRank = 12;

  const currentLevel = getCurrentLevel(userXp);
  const nextLevel = getNextLevel(userXp);
  const levelProgress = getLevelProgress(userXp);

  const totalModules = learningTracks.reduce((acc, t) => acc + t.modules.length, 0);
  const completedModules = learningTracks.reduce(
    (acc, t) => acc + t.modules.filter((m) => m.completed).length,
    0
  );

  // Determine which tracks are unlocked based on prerequisites
  function isTrackUnlocked(track: LearningTrack): boolean {
    if (track.prerequisites.length === 0) return true;
    return track.prerequisites.every((preId) => {
      const prTrack = learningTracks.find((t) => t.id === preId);
      if (!prTrack) return false;
      // At least 50% complete to unlock next
      const completed = prTrack.modules.filter((m) => m.completed).length;
      return completed >= Math.ceil(prTrack.modules.length * 0.5);
    });
  }

  return (
    <div>
      <Header
        title="AI Coders"
        subtitle="Capacitacao tecnica em desenvolvimento de IA"
      />

      <main className="p-6 max-w-7xl mx-auto">
        {/* ================================================================ */}
        {/* Developer Profile Hero                                           */}
        {/* ================================================================ */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-header p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              {/* Left: Level Info */}
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <currentLevel.icon className="h-8 w-8 text-aimana-teal" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Nivel Atual</p>
                  <h2 className="text-xl font-bold text-white">{currentLevel.name}</h2>
                  {nextLevel && (
                    <div className="mt-1">
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-1.5 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-aimana-teal rounded-full transition-all duration-500"
                            style={{ width: `${levelProgress}%` }}
                          />
                        </div>
                        <span className="text-xs text-white/60">
                          {userXp}/{nextLevel.minXp} XP
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Stats Grid */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="flex flex-col items-center gap-1 rounded-xl bg-white/10 backdrop-blur-sm px-4 py-3 border border-white/10">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="text-lg font-bold text-white">{userXp.toLocaleString()}</span>
                  <span className="text-xs text-white/60">XP Total</span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-xl bg-white/10 backdrop-blur-sm px-4 py-3 border border-white/10">
                  <Flame className="h-5 w-5 text-orange-400" />
                  <span className="text-lg font-bold text-white">{userStreak} dias</span>
                  <span className="text-xs text-white/60">Streak</span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-xl bg-white/10 backdrop-blur-sm px-4 py-3 border border-white/10">
                  <Target className="h-5 w-5 text-aimana-teal" />
                  <span className="text-lg font-bold text-white">{userChallengesCompleted}</span>
                  <span className="text-xs text-white/60">Desafios</span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-xl bg-white/10 backdrop-blur-sm px-4 py-3 border border-white/10">
                  <Trophy className="h-5 w-5 text-amber-400" />
                  <span className="text-lg font-bold text-white">#{userRank}</span>
                  <span className="text-xs text-white/60">Ranking</span>
                </div>
              </div>
            </div>

            {/* Tech Stack Badges */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white/50 mb-2 uppercase tracking-wider font-medium">Badges Conquistadas</p>
              <div className="flex flex-wrap gap-2">
                {techBadges.map((badge) => (
                  <div
                    key={badge.name}
                    className={cn(
                      'flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all',
                      badge.earned
                        ? 'bg-aimana-teal/20 text-aimana-teal border border-aimana-teal/30'
                        : 'bg-white/5 text-white/30 border border-white/10'
                    )}
                  >
                    <badge.icon className="h-3 w-3" />
                    {badge.name}
                    {badge.earned && <CheckCircle2 className="h-3 w-3" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <CardContent className="p-4 border-t border-surface-border">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-phase-manage" />
                <span className="text-sm font-medium text-text">Progresso Geral</span>
                <Badge variant="manage">Tecnico</Badge>
                <span className="text-sm text-text-muted">
                  {completedModules} de {totalModules} modulos
                </span>
              </div>
              <div className="w-full sm:w-48">
                <Progress value={(completedModules / totalModules) * 100} showLabel />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================================================================ */}
        {/* Main Tabs                                                        */}
        {/* ================================================================ */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="trilhas" icon={<Layers className="h-4 w-4" />}>
              Trilhas
            </TabsTrigger>
            <TabsTrigger value="desafios" icon={<Zap className="h-4 w-4" />} badge={challenges.filter((c) => !c.completed).length}>
              Desafios
            </TabsTrigger>
            <TabsTrigger value="playground" icon={<Box className="h-4 w-4" />}>
              Playground
            </TabsTrigger>
            <TabsTrigger value="ranking" icon={<Trophy className="h-4 w-4" />}>
              Ranking
            </TabsTrigger>
          </TabsList>

          {/* ============================================================== */}
          {/* TAB: Trilhas (Skill Tree)                                      */}
          {/* ============================================================== */}
          <TabsContent value="trilhas">
            <div className="space-y-6">
              {/* Skill Tree Visualization */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Arvore de Habilidades</CardTitle>
                  <CardDescription>
                    Complete os pre-requisitos para desbloquear trilhas avancadas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Tree Layout - visual flow */}
                  <div className="space-y-4">
                    {/* Row 1: Fundamentals (root) */}
                    <div className="flex justify-center">
                      <div className="w-52">
                        <SkillTreeNode
                          track={learningTracks[0]}
                          isUnlocked={isTrackUnlocked(learningTracks[0])}
                          isSelected={selectedTrack?.id === learningTracks[0].id}
                          onClick={() => setSelectedTrack(learningTracks[0])}
                        />
                      </div>
                    </div>

                    {/* Connector lines */}
                    <div className="flex justify-center">
                      <div className="flex items-center gap-24">
                        <div className="w-px h-8 bg-surface-border" />
                        <div className="w-px h-8 bg-surface-border" />
                      </div>
                    </div>

                    {/* Row 2: Prompting + RAG (branch from Fundamentals) */}
                    <div className="flex justify-center gap-8">
                      <div className="w-52">
                        <SkillTreeNode
                          track={learningTracks[1]}
                          isUnlocked={isTrackUnlocked(learningTracks[1])}
                          isSelected={selectedTrack?.id === learningTracks[1].id}
                          onClick={() => setSelectedTrack(learningTracks[1])}
                        />
                      </div>
                      <div className="w-52">
                        <SkillTreeNode
                          track={learningTracks[3]}
                          isUnlocked={isTrackUnlocked(learningTracks[3])}
                          isSelected={selectedTrack?.id === learningTracks[3].id}
                          onClick={() => setSelectedTrack(learningTracks[3])}
                        />
                      </div>
                    </div>

                    {/* Connector lines */}
                    <div className="flex justify-center">
                      <div className="flex items-center gap-24">
                        <div className="w-px h-8 bg-surface-border" />
                        <div className="w-px h-8 bg-surface-border" />
                      </div>
                    </div>

                    {/* Row 3: Agents + Production (leaves) */}
                    <div className="flex justify-center gap-8">
                      <div className="w-52">
                        <SkillTreeNode
                          track={learningTracks[2]}
                          isUnlocked={isTrackUnlocked(learningTracks[2])}
                          isSelected={selectedTrack?.id === learningTracks[2].id}
                          onClick={() => setSelectedTrack(learningTracks[2])}
                        />
                      </div>
                      <div className="w-52">
                        <SkillTreeNode
                          track={learningTracks[4]}
                          isUnlocked={isTrackUnlocked(learningTracks[4])}
                          isSelected={selectedTrack?.id === learningTracks[4].id}
                          onClick={() => setSelectedTrack(learningTracks[4])}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Path Legend */}
                  <div className="mt-6 pt-4 border-t border-surface-border">
                    <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                      <span className="font-medium">Legenda:</span>
                      <div className="flex items-center gap-1.5">
                        <div className="h-3 w-3 rounded bg-status-success-bg border border-status-success" />
                        <span>Completa</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-3 w-3 rounded bg-aimana-teal/10 border border-aimana-teal" />
                        <span>Em progresso</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-3 w-3 rounded bg-surface border border-surface-border" />
                        <span>Disponivel</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Lock className="h-3 w-3" />
                        <span>Bloqueada</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Track Detail */}
              {selectedTrack && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <selectedTrack.icon className="h-5 w-5 text-phase-manage" />
                        <CardTitle className="text-base">{selectedTrack.title}</CardTitle>
                      </div>
                      <Badge variant="outline">+{selectedTrack.xpReward} XP</Badge>
                    </div>
                    <CardDescription>{selectedTrack.description}</CardDescription>
                    {selectedTrack.prerequisites.length > 0 && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-text-muted">Pre-requisitos:</span>
                        {selectedTrack.prerequisites.map((preId) => {
                          const prTrack = learningTracks.find((t) => t.id === preId);
                          return prTrack ? (
                            <Badge key={preId} variant="outline" size="sm">
                              {prTrack.title}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedTrack.modules.map((module, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            'flex items-center gap-3 p-3 rounded-lg',
                            module.completed ? 'bg-status-success-bg' : 'bg-surface-light'
                          )}
                        >
                          {module.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-status-success flex-shrink-0" />
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-text-muted flex-shrink-0" />
                          )}
                          <span
                            className={cn(
                              'flex-1',
                              module.completed ? 'text-text-secondary' : 'text-text font-medium'
                            )}
                          >
                            {module.name}
                          </span>
                          {module.completed ? (
                            <Badge variant="success" size="sm">Completo</Badge>
                          ) : (
                            <Button size="sm">
                              <Play className="h-4 w-4 mr-1" />
                              Iniciar
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* ============================================================== */}
          {/* TAB: Desafios (Challenges)                                     */}
          {/* ============================================================== */}
          <TabsContent value="desafios">
            <div className="space-y-6">
              {/* Weekly Challenge Banner */}
              {challenges
                .filter((c) => c.isWeekly && !c.completed)
                .map((weekly) => (
                  <Card key={weekly.id} className="border-2 border-yellow-500/30 bg-yellow-500/5">
                    <CardContent className="p-5">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/20">
                            <Trophy className="h-6 w-6 text-yellow-500" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="warning" size="sm">Desafio da Semana</Badge>
                              <Badge variant={DIFFICULTY_CONFIG[weekly.difficulty].variant} size="sm">
                                {weekly.difficulty}
                              </Badge>
                            </div>
                            <h3 className="text-lg font-bold text-text">{weekly.title}</h3>
                            <p className="text-sm text-text-secondary mt-1">{weekly.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1 text-sm text-text-muted">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span className="font-semibold text-yellow-500">{weekly.points} XP</span>
                              </div>
                              {weekly.timeLimit && (
                                <div className="flex items-center gap-1 text-sm text-text-muted">
                                  <Timer className="h-4 w-4" />
                                  <span>{weekly.timeLimit}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1 text-sm text-text-muted">
                                <Users className="h-4 w-4" />
                                <span>{weekly.participants} participantes</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button size="lg">
                          <Zap className="h-5 w-5 mr-2" />
                          Aceitar Desafio
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {/* Challenge Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {challenges
                  .filter((c) => !c.isWeekly)
                  .map((challenge) => (
                    <Card
                      key={challenge.id}
                      variant="interactive"
                      className={cn(
                        challenge.completed && 'border-status-success bg-status-success-bg/30'
                      )}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Badge variant={DIFFICULTY_CONFIG[challenge.difficulty].variant} size="sm">
                              {challenge.difficulty}
                            </Badge>
                            {challenge.completed && (
                              <Badge variant="success" size="sm">Completo</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-sm font-semibold">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-text">{challenge.points} XP</span>
                          </div>
                        </div>

                        <h3 className={cn(
                          'font-bold text-text mb-1',
                          challenge.completed && 'text-text-secondary'
                        )}>
                          {challenge.completed && (
                            <CheckCircle2 className="h-4 w-4 text-status-success inline mr-1.5" />
                          )}
                          {challenge.title}
                        </h3>
                        <p className="text-sm text-text-secondary mb-3">{challenge.description}</p>

                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {challenge.tags.map((tag) => (
                            <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-surface-border">
                          <div className="flex items-center gap-3 text-xs text-text-muted">
                            <div className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" />
                              <span>{challenge.participants}</span>
                            </div>
                            {challenge.timeLimit && (
                              <div className="flex items-center gap-1">
                                <Timer className="h-3.5 w-3.5" />
                                <span>{challenge.timeLimit}</span>
                              </div>
                            )}
                          </div>
                          {challenge.completed ? (
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                Ver Solucao
                              </Button>
                              <Button variant="outline" size="sm">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                Peer Review
                              </Button>
                            </div>
                          ) : (
                            <Button size="sm">
                              <Code className="h-4 w-4 mr-1" />
                              Aceitar
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              {/* XP Reward Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recompensas por Dificuldade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(Object.entries(DIFFICULTY_CONFIG) as [DifficultyTier, typeof DIFFICULTY_CONFIG[DifficultyTier]][]).map(
                      ([tier, config]) => (
                        <div
                          key={tier}
                          className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface-light"
                        >
                          <Badge variant={config.variant} size="lg">{tier}</Badge>
                          <span className="text-2xl font-bold text-text">{config.xp}</span>
                          <span className="text-xs text-text-muted">pontos XP</span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ============================================================== */}
          {/* TAB: Playground                                                */}
          {/* ============================================================== */}
          <TabsContent value="playground">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Ambientes de Desenvolvimento</CardTitle>
                  <CardDescription>
                    Sandboxes pre-configurados para praticar e experimentar com IA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    {playgroundEnvironments.map((env) => (
                      <Card
                        key={env.id}
                        variant="interactive"
                        className={cn(
                          'relative overflow-hidden',
                          env.status === 'coming_soon' && 'opacity-70'
                        )}
                      >
                        {env.status === 'coming_soon' && (
                          <div className="absolute top-3 right-3">
                            <Badge variant="pending" size="sm">Em breve</Badge>
                          </div>
                        )}
                        <CardContent className="p-5">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-phase-manage-bg mb-4">
                            <env.icon className="h-6 w-6 text-phase-manage" />
                          </div>
                          <h3 className="font-bold text-text mb-2">{env.title}</h3>
                          <p className="text-sm text-text-secondary mb-4">{env.description}</p>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {env.tags.map((tag) => (
                              <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
                            ))}
                          </div>
                          <Button
                            variant={env.status === 'available' ? 'primary' : 'outline'}
                            className="w-full"
                            disabled={env.status === 'coming_soon'}
                          >
                            {env.status === 'available' ? (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Abrir Ambiente
                              </>
                            ) : (
                              <>
                                <Clock className="h-4 w-4 mr-2" />
                                Notificar-me
                              </>
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Sandbox Features */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-aimana-teal/10 mb-3">
                      <Terminal className="h-5 w-5 text-aimana-teal" />
                    </div>
                    <h4 className="font-semibold text-text mb-1">Terminal Integrado</h4>
                    <p className="text-sm text-text-secondary">
                      Terminal completo com acesso a pip, git e ferramentas de desenvolvimento.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-aimana-blue/10 mb-3">
                      <Eye className="h-5 w-5 text-aimana-blue" />
                    </div>
                    <h4 className="font-semibold text-text mb-1">Tracing Integrado</h4>
                    <p className="text-sm text-text-secondary">
                      Visualize cada chamada de LLM, latencia e custos em tempo real.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-phase-manage-bg mb-3">
                      <Shield className="h-5 w-5 text-phase-manage" />
                    </div>
                    <h4 className="font-semibold text-text mb-1">Ambiente Isolado</h4>
                    <p className="text-sm text-text-secondary">
                      Sandbox seguro com API keys de teste e limites de uso configurados.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ============================================================== */}
          {/* TAB: Ranking                                                   */}
          {/* ============================================================== */}
          <TabsContent value="ranking">
            <div className="space-y-6">
              {/* Top 3 Podium */}
              <div className="grid gap-4 md:grid-cols-3">
                {leaderboard.slice(0, 3).map((entry, idx) => {
                  const podiumColors = [
                    'border-yellow-500/40 bg-yellow-500/5',
                    'border-slate-400/40 bg-slate-400/5',
                    'border-amber-700/40 bg-amber-700/5',
                  ];
                  const podiumIcons = [
                    <Crown key="gold" className="h-6 w-6 text-yellow-500" />,
                    <Award key="silver" className="h-6 w-6 text-slate-400" />,
                    <Award key="bronze" className="h-6 w-6 text-amber-700" />,
                  ];

                  return (
                    <Card key={entry.rank} className={cn('border-2', podiumColors[idx])}>
                      <CardContent className="p-5 text-center">
                        <div className="flex justify-center mb-3">
                          {podiumIcons[idx]}
                        </div>
                        <div className="flex justify-center mb-2">
                          <div className="h-14 w-14 rounded-full bg-aimana-navy flex items-center justify-center text-white text-lg font-bold">
                            {entry.avatar}
                          </div>
                        </div>
                        <h3 className="font-bold text-text">{entry.name}</h3>
                        <p className="text-xs text-text-muted mb-2">{entry.level}</p>
                        <div className="text-2xl font-bold text-aimana-teal mb-2">
                          {entry.xp.toLocaleString()} XP
                        </div>
                        <div className="flex items-center justify-center gap-3 text-xs text-text-muted">
                          <div className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            <span>{entry.challenges}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Flame className="h-3 w-3 text-orange-400" />
                            <span>{entry.streak}d</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-1 mt-3">
                          {entry.badges.map((badge) => (
                            <Badge key={badge} variant="outline" size="sm">{badge}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Full Leaderboard Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Leaderboard Completo</CardTitle>
                  <CardDescription>Classificacao baseada em XP acumulado</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {leaderboard.map((entry) => (
                      <div
                        key={entry.rank}
                        className={cn(
                          'flex items-center gap-4 p-3 rounded-lg transition-colors',
                          entry.rank <= 3 ? 'bg-surface-light' : 'hover:bg-surface-light'
                        )}
                      >
                        <div className={cn(
                          'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold',
                          entry.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                          entry.rank === 2 ? 'bg-slate-400/20 text-slate-400' :
                          entry.rank === 3 ? 'bg-amber-700/20 text-amber-700' :
                          'bg-surface-light text-text-muted'
                        )}>
                          {entry.rank}
                        </div>

                        <div className="h-9 w-9 rounded-full bg-aimana-navy flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                          {entry.avatar}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-text text-sm truncate">{entry.name}</p>
                          <p className="text-xs text-text-muted">{entry.level}</p>
                        </div>

                        <div className="hidden sm:flex items-center gap-1 text-xs text-text-muted">
                          <Flame className="h-3 w-3 text-orange-400" />
                          <span>{entry.streak}d</span>
                        </div>

                        <div className="hidden sm:flex items-center gap-1 text-xs text-text-muted">
                          <Target className="h-3 w-3" />
                          <span>{entry.challenges}</span>
                        </div>

                        <div className="text-right">
                          <span className="font-bold text-sm text-text">{entry.xp.toLocaleString()}</span>
                          <span className="text-xs text-text-muted ml-1">XP</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contribution Heatmap */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Atividade de Estudo</CardTitle>
                  <CardDescription>Seu historico de atividades nas ultimas 12 semanas</CardDescription>
                </CardHeader>
                <CardContent>
                  <StreakHeatmap weeks={12} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* ================================================================ */}
        {/* Resources Section                                                */}
        {/* ================================================================ */}
        <div className="mt-8 pt-6 border-t border-surface-border">
          <h3 className="text-lg font-semibold text-text mb-4">Recursos Rapidos</h3>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {resources.map((resource) => (
              <Button
                key={resource.title}
                variant="outline"
                className="h-auto flex-col items-start gap-1.5 p-4 text-left"
              >
                <div className="flex items-center gap-2 w-full">
                  <resource.icon className="h-4 w-4 text-phase-manage flex-shrink-0" />
                  <span className="text-sm font-medium truncate">{resource.title}</span>
                </div>
                <span className="text-xs text-text-muted">{resource.description}</span>
              </Button>
            ))}
          </div>
        </div>
      </main>

      {/* ================================================================== */}
      {/* Floating Pair Programmer Button                                    */}
      {/* ================================================================== */}
      <button
        onClick={() => setIsChatOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-40',
          'flex items-center gap-2 px-5 py-3 rounded-full',
          'bg-phase-manage text-white shadow-lg',
          'hover:shadow-xl hover:scale-105 transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-phase-manage focus:ring-offset-2',
          isChatOpen && 'hidden'
        )}
      >
        <Terminal className="h-5 w-5" />
        <span className="font-medium text-sm">Pair Programmer</span>
      </button>

      {/* Pair Programmer Modal */}
      <PairProgrammerModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}
