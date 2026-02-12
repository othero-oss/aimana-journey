/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Academy Tracks Page (Gamified)
 * Trilhas de aprendizado com gamificação, XP, streaks e recompensas
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
} from '@/components/ui';
import {
  GraduationCap,
  BookOpen,
  Clock,
  Users,
  CheckCircle2,
  Play,
  Bot,
  Send,
  Award,
  TrendingUp,
  Star,
  Search,
  Flame,
  Zap,
  Trophy,
  Target,
  Sparkles,
  X,
  Lock,
  Gift,
  Shield,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Category color mapping for left borders ────────────────────────────
const categoryColors: Record<string, string> = {
  Leadership: 'border-l-[#3B6B8C]',
  Technical: 'border-l-[#4ECDC4]',
  Business: 'border-l-[#50D9B3]',
  Governance: 'border-l-[#0A1628]',
};

const categoryBgColors: Record<string, string> = {
  Leadership: 'bg-[#3B6B8C]/10 text-[#3B6B8C]',
  Technical: 'bg-[#4ECDC4]/10 text-[#4ECDC4]',
  Business: 'bg-[#50D9B3]/10 text-[#50D9B3]',
  Governance: 'bg-[#0A1628]/10 text-[#0A1628]',
};

// ─── Difficulty configuration ────────────────────────────────────────────
const difficultyConfig: Record<string, { stars: number; label: string; color: string }> = {
  Iniciante: { stars: 1, label: 'Iniciante', color: 'text-status-success' },
  Intermediário: { stars: 2, label: 'Intermediário', color: 'text-status-warning' },
  Avançado: { stars: 3, label: 'Avançado', color: 'text-status-error' },
};

// ─── All available tracks (enhanced with gamification data) ──────────────
const tracks = [
  {
    id: 1,
    title: 'IA para Líderes',
    description: 'Fundamentos de IA para tomada de decisão executiva',
    category: 'Leadership',
    audience: 'C-Level, Diretores',
    duration: '4 horas',
    modules: 6,
    completedModules: 4,
    enrolled: 12,
    rating: 4.8,
    level: 'Iniciante',
    featured: true,
    xpReward: 200,
    isPopular: true,
    isNew: false,
    rewards: {
      badge: 'Líder em IA',
      certProgress: 15,
    },
  },
  {
    id: 2,
    title: 'Prompt Engineering',
    description: 'Técnicas avançadas de comunicação com LLMs',
    category: 'Technical',
    audience: 'Analistas, Desenvolvedores',
    duration: '8 horas',
    modules: 10,
    completedModules: 2,
    enrolled: 28,
    rating: 4.9,
    level: 'Intermediário',
    featured: true,
    xpReward: 400,
    isPopular: true,
    isNew: false,
    rewards: {
      badge: 'Prompt Master',
      certProgress: 20,
    },
  },
  {
    id: 3,
    title: 'Construindo Agentes com LangChain',
    description: 'Do conceito à produção com agentes autônomos',
    category: 'Technical',
    audience: 'Desenvolvedores',
    duration: '12 horas',
    modules: 15,
    completedModules: 0,
    enrolled: 8,
    rating: 4.7,
    level: 'Avançado',
    featured: false,
    xpReward: 600,
    isPopular: false,
    isNew: true,
    rewards: {
      badge: 'Agent Builder',
      certProgress: 25,
    },
  },
  {
    id: 4,
    title: 'Ética e Governança em IA',
    description: 'Princípios éticos e frameworks de governança',
    category: 'Governance',
    audience: 'Todos',
    duration: '3 horas',
    modules: 5,
    completedModules: 5,
    enrolled: 45,
    rating: 4.6,
    level: 'Iniciante',
    featured: false,
    xpReward: 150,
    isPopular: true,
    isNew: false,
    rewards: {
      badge: 'Guardião da Ética',
      certProgress: 10,
    },
  },
  {
    id: 5,
    title: 'RAG: Retrieval Augmented Generation',
    description: 'Construa sistemas de IA com conhecimento próprio',
    category: 'Technical',
    audience: 'Desenvolvedores',
    duration: '10 horas',
    modules: 12,
    completedModules: 0,
    enrolled: 15,
    rating: 4.8,
    level: 'Avançado',
    featured: true,
    xpReward: 500,
    isPopular: false,
    isNew: true,
    rewards: {
      badge: 'RAG Specialist',
      certProgress: 25,
    },
  },
  {
    id: 6,
    title: 'Identificando Oportunidades de IA',
    description: 'Como mapear e priorizar casos de uso de IA',
    category: 'Business',
    audience: 'Gestores, Analistas',
    duration: '4 horas',
    modules: 6,
    completedModules: 3,
    enrolled: 32,
    rating: 4.5,
    level: 'Iniciante',
    featured: false,
    xpReward: 200,
    isPopular: false,
    isNew: false,
    rewards: {
      badge: 'Explorador de IA',
      certProgress: 15,
    },
  },
  {
    id: 7,
    title: 'Análise de Dados com IA',
    description: 'Use IA para extrair insights de dados',
    category: 'Business',
    audience: 'Analistas',
    duration: '6 horas',
    modules: 8,
    completedModules: 1,
    enrolled: 22,
    rating: 4.7,
    level: 'Intermediário',
    featured: false,
    xpReward: 350,
    isPopular: false,
    isNew: false,
    rewards: {
      badge: 'Data Wizard',
      certProgress: 20,
    },
  },
  {
    id: 8,
    title: 'Automação de Processos com IA',
    description: 'Automatize tarefas repetitivas com agentes',
    category: 'Business',
    audience: 'Gestores, Analistas',
    duration: '5 horas',
    modules: 7,
    completedModules: 0,
    enrolled: 18,
    rating: 4.6,
    level: 'Intermediário',
    featured: false,
    xpReward: 300,
    isPopular: false,
    isNew: true,
    rewards: {
      badge: 'Automator',
      certProgress: 15,
    },
  },
];

// ─── Filter options ──────────────────────────────────────────────────────
const categories = ['Todos', 'Leadership', 'Technical', 'Business', 'Governance'];
const levels = ['Todos', 'Iniciante', 'Intermediário', 'Avançado'];

const categoryLabels: Record<string, string> = {
  Todos: 'Todos',
  Leadership: 'Liderança',
  Technical: 'Técnico',
  Business: 'Negócios',
  Governance: 'Governança',
};

// ─── User stats (simulated) ──────────────────────────────────────────────
const userStats = {
  totalXp: 850,
  level: 5,
  levelLabel: 'Explorador',
  nextLevelXp: 1200,
  streak: 7,
  completedTracks: 1,
  startedTracks: 4,
  studyHours: 12,
};

type ChatMessage = { role: 'user' | 'assistant'; content: string };

// ─── Difficulty stars component ──────────────────────────────────────────
function DifficultyStars({ level }: { level: string }) {
  const config = difficultyConfig[level];
  if (!config) return null;

  return (
    <div className="flex items-center gap-0.5" title={config.label}>
      {Array.from({ length: 3 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-3 w-3',
            i < config.stars ? config.color + ' fill-current' : 'text-surface-border'
          )}
        />
      ))}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────
export function AcademyTracks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedLevel, setSelectedLevel] = useState('Todos');
  const [showTutorModal, setShowTutorModal] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Olá! Sou o **LIFOW** (Learning Is For Our Workforce), seu assistente educacional.

Posso ajudá-lo a:
• Encontrar trilhas ideais para seu perfil
• Criar planos de estudo personalizados
• Esclarecer dúvidas sobre conteúdos
• Recomendar próximos passos

Qual seu objetivo de aprendizado em IA?`,
    },
  ]);

  const filteredTracks = tracks.filter((track) => {
    const matchesSearch =
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || track.category === selectedCategory;
    const matchesLevel = selectedLevel === 'Todos' || track.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: 'user', content: chatInput }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Entendi! Para seu perfil, recomendo esta sequência:

**Trilha Sugerida (4 semanas):**

1. **Semana 1:** IA para Líderes
   - Fundamentos e visão estratégica

2. **Semana 2:** Identificando Oportunidades
   - Mapear casos de uso na sua área

3. **Semana 3-4:** Prompt Engineering
   - Aplicação prática no dia a dia

**Próximo passo:**
Começar com "IA para Líderes" - você já tem 67% completo!

Deseja que eu crie este plano de estudo?`,
        },
      ]);
    }, 1500);
  };

  const xpProgress = Math.round((userStats.totalXp / userStats.nextLevelXp) * 100);

  return (
    <div>
      <Header
        title="Trilhas de Aprendizado"
        subtitle="Explore todas as trilhas disponíveis"
      />

      <main className="p-6">
        {/* ── Streak Banner ──────────────────────────────────────── */}
        <div className="mb-4 flex items-center gap-3 rounded-lg bg-gradient-to-r from-[#0A1628] to-[#3B6B8C] px-4 py-3 text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
            <Flame className="h-5 w-5 text-orange-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">
              {userStats.streak} dias de sequência!
            </p>
            <p className="text-xs text-white/70">
              Continue estudando hoje para manter seu streak
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-2.5 w-2.5 rounded-full',
                  i < userStats.streak ? 'bg-orange-400' : 'bg-white/20'
                )}
              />
            ))}
          </div>
        </div>

        {/* ── Stats Bar ──────────────────────────────────────────── */}
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {/* XP & Level */}
          <Card className="border-l-4 border-l-[#4ECDC4]">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <Zap className="h-4 w-4 text-[#4ECDC4]" />
                <span className="text-xs font-medium text-text-muted">XP Total</span>
              </div>
              <p className="text-xl font-bold text-text">{userStats.totalXp}</p>
              <div className="mt-1.5">
                <div className="flex items-center justify-between text-[10px] text-text-muted mb-0.5">
                  <span>Nível {userStats.level} - {userStats.levelLabel}</span>
                  <span>{userStats.nextLevelXp} XP</span>
                </div>
                <Progress value={xpProgress} size="sm" variant="default" />
              </div>
            </CardContent>
          </Card>

          {/* Streak */}
          <Card className="border-l-4 border-l-orange-400">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <Flame className="h-4 w-4 text-orange-400" />
                <span className="text-xs font-medium text-text-muted">Sequência</span>
              </div>
              <p className="text-xl font-bold text-text">{userStats.streak} dias</p>
              <p className="mt-1 text-[10px] text-text-muted">Melhor: 12 dias</p>
            </CardContent>
          </Card>

          {/* Completed Tracks */}
          <Card className="border-l-4 border-l-[#50D9B3]">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <Trophy className="h-4 w-4 text-[#50D9B3]" />
                <span className="text-xs font-medium text-text-muted">Completas</span>
              </div>
              <p className="text-xl font-bold text-text">{userStats.completedTracks}/{tracks.length}</p>
              <p className="mt-1 text-[10px] text-text-muted">{userStats.startedTracks} em progresso</p>
            </CardContent>
          </Card>

          {/* Study Hours */}
          <Card className="border-l-4 border-l-[#3B6B8C]">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <Clock className="h-4 w-4 text-[#3B6B8C]" />
                <span className="text-xs font-medium text-text-muted">Horas de Estudo</span>
              </div>
              <p className="text-xl font-bold text-text">{userStats.studyHours}h</p>
              <p className="mt-1 text-[10px] text-text-muted">Esta semana: 3h</p>
            </CardContent>
          </Card>
        </div>

        {/* ── Search & Category Pills ────────────────────────────── */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Buscar trilhas por nome ou descrição..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-medium text-text-muted self-center mr-1">Categoria:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-medium transition-all',
                  selectedCategory === cat
                    ? 'bg-[#0A1628] text-white shadow-sm'
                    : 'bg-surface-light text-text-secondary hover:bg-surface-border'
                )}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>

          {/* Level pills */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-medium text-text-muted self-center mr-1">Nível:</span>
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-medium transition-all',
                  selectedLevel === level
                    ? 'bg-[#0A1628] text-white shadow-sm'
                    : 'bg-surface-light text-text-secondary hover:bg-surface-border'
                )}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* ── Results count ──────────────────────────────────────── */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-text-muted">{filteredTracks.length} trilhas encontradas</p>
          <div className="flex items-center gap-1 text-xs text-text-muted">
            <Sparkles className="h-3.5 w-3.5 text-[#4ECDC4]" />
            <span>Ganhe XP completando trilhas</span>
          </div>
        </div>

        {/* ── Tracks Grid (2 columns) ────────────────────────────── */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredTracks.map((track) => {
            const progress = Math.round((track.completedModules / track.modules) * 100);
            const isCompleted = track.completedModules === track.modules;
            const isStarted = track.completedModules > 0;

            return (
              <Card
                key={track.id}
                variant="interactive"
                className={cn(
                  'border-l-4 overflow-hidden',
                  categoryColors[track.category] || 'border-l-surface-border',
                  track.featured && 'ring-1 ring-[#4ECDC4]/30'
                )}
              >
                <CardContent className="p-4">
                  {/* Top badges row */}
                  <div className="mb-2 flex flex-wrap items-center gap-1.5">
                    {track.featured && (
                      <Badge variant="execute" size="sm">
                        <Star className="h-3 w-3 mr-1" />
                        Destaque
                      </Badge>
                    )}
                    {track.isPopular && (
                      <Badge variant="warning" size="sm">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                    {track.isNew && (
                      <Badge variant="plan" size="sm">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Novo
                      </Badge>
                    )}
                    {isCompleted && (
                      <Badge variant="success" size="sm">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Completo
                      </Badge>
                    )}
                  </div>

                  {/* Title and description */}
                  <h3 className="font-semibold text-text mb-1">{track.title}</h3>
                  <p className="text-sm text-text-secondary mb-3">{track.description}</p>

                  {/* Difficulty + Category + XP row */}
                  <div className="mb-3 flex items-center gap-3">
                    <DifficultyStars level={track.level} />
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[10px] font-medium',
                        categoryBgColors[track.category]
                      )}
                    >
                      {categoryLabels[track.category] || track.category}
                    </span>
                    <div className="ml-auto flex items-center gap-1 rounded-full bg-[#4ECDC4]/10 px-2 py-0.5">
                      <Zap className="h-3 w-3 text-[#4ECDC4]" />
                      <span className="text-[10px] font-bold text-[#4ECDC4]">{track.xpReward} XP</span>
                    </div>
                  </div>

                  {/* Meta info row */}
                  <div className="mb-3 flex items-center gap-4 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {track.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {track.modules} módulos
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {track.enrolled}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-status-warning fill-status-warning" />
                      {track.rating}
                    </span>
                  </div>

                  {/* Progress bar (if started) */}
                  {isStarted && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                        <span>Progresso</span>
                        <span className="font-medium">{progress}%</span>
                      </div>
                      <Progress
                        value={progress}
                        size="sm"
                        variant={isCompleted ? 'success' : 'default'}
                      />
                    </div>
                  )}

                  {/* Completion rewards preview */}
                  <div className="mb-3 flex items-center gap-2 rounded-lg bg-surface-light px-3 py-2">
                    <Gift className="h-3.5 w-3.5 text-text-muted flex-shrink-0" />
                    <div className="flex flex-wrap items-center gap-2 text-[10px] text-text-muted">
                      <span className="flex items-center gap-0.5">
                        <Zap className="h-2.5 w-2.5 text-[#4ECDC4]" />
                        +{track.xpReward} XP
                      </span>
                      <span className="text-surface-border">|</span>
                      <span className="flex items-center gap-0.5">
                        <Shield className="h-2.5 w-2.5 text-[#3B6B8C]" />
                        Badge: {track.rewards.badge}
                      </span>
                      <span className="text-surface-border">|</span>
                      <span className="flex items-center gap-0.5">
                        <Award className="h-2.5 w-2.5 text-[#50D9B3]" />
                        +{track.rewards.certProgress}% certificação
                      </span>
                    </div>
                  </div>

                  {/* Action button */}
                  <Button
                    className="w-full"
                    variant={isStarted ? 'primary' : 'outline'}
                    size="sm"
                  >
                    {!isStarted ? (
                      <>
                        <Play className="h-4 w-4 mr-1" />
                        Começar Trilha
                      </>
                    ) : isCompleted ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Revisar Trilha
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-1" />
                        Continuar
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredTracks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search className="h-10 w-10 text-text-muted mb-3" />
            <p className="text-sm font-medium text-text">Nenhuma trilha encontrada</p>
            <p className="text-xs text-text-muted mt-1">
              Tente ajustar os filtros ou buscar por outro termo
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-3"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Todos');
                setSelectedLevel('Todos');
              }}
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </main>

      {/* ── Floating Tutor IA Button ───────────────────────────────── */}
      {!showTutorModal && (
        <button
          onClick={() => setShowTutorModal(true)}
          className={cn(
            'fixed bottom-6 right-6 z-40',
            'flex h-14 w-14 items-center justify-center rounded-full',
            'bg-gradient-to-br from-[#4ECDC4] to-[#3B6B8C] text-white',
            'shadow-lg shadow-[#4ECDC4]/25',
            'transition-transform hover:scale-105 active:scale-95'
          )}
          title="Tutor IA"
        >
          <Bot className="h-6 w-6" />
        </button>
      )}

      {/* ── Tutor IA Modal ──────────────────────────────────────────── */}
      {showTutorModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:items-center sm:justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowTutorModal(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md rounded-xl bg-white shadow-2xl sm:mb-0 mb-0">
            {/* Modal Header */}
            <div className="flex items-center gap-3 rounded-t-xl border-b border-surface-border bg-gradient-to-r from-[#0A1628] to-[#3B6B8C] px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4ECDC4]">
                <Bot className="h-5 w-5 text-[#0A1628]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">LIFOW - Tutor IA</p>
                <p className="text-[10px] text-white/60">Assistente educacional 24/7</p>
              </div>
              <button
                onClick={() => setShowTutorModal(false)}
                className="rounded-full p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm',
                    msg.role === 'user'
                      ? 'bg-[#0A1628] text-white ml-8'
                      : 'bg-surface-light text-text mr-4'
                  )}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="border-t border-surface-border p-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Pergunte ao LIFOW..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                  inputSize="sm"
                />
                <Button size="sm" variant="primary" onClick={handleChatSend}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
