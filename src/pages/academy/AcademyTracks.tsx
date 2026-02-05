/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Academy Tracks Page
 * Trilhas de aprendizado disponíveis
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
  Video,
  FileText,
  Clock,
  Users,
  CheckCircle2,
  Play,
  Bot,
  Send,
  Award,
  TrendingUp,
  Star,
  Filter,
  Search,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// All available tracks
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
  },
];

const categories = ['Todos', 'Leadership', 'Technical', 'Business', 'Governance'];
const levels = ['Todos', 'Iniciante', 'Intermediário', 'Avançado'];

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export function AcademyTracks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedLevel, setSelectedLevel] = useState('Todos');
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
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  return (
    <div>
      <Header
        title="Trilhas de Aprendizado"
        subtitle="Explore todas as trilhas disponíveis"
      />

      <main className="p-6">
        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <Input
                  placeholder="Buscar trilhas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 text-sm rounded-lg border border-surface-border bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-3 py-2 text-sm rounded-lg border border-surface-border bg-white"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Tracks Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-text-muted">{filteredTracks.length} trilhas encontradas</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredTracks.map((track) => (
                <Card
                  key={track.id}
                  variant="interactive"
                  className={cn(track.featured && 'border-aimana-teal/50')}
                >
                  <CardContent className="p-4">
                    {track.featured && (
                      <Badge variant="execute" size="sm" className="mb-2">
                        <Star className="h-3 w-3 mr-1" />
                        Destaque
                      </Badge>
                    )}

                    <h3 className="font-semibold text-text mb-1">{track.title}</h3>
                    <p className="text-sm text-text-secondary mb-3">{track.description}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant={track.level === 'Iniciante' ? 'success' : track.level === 'Intermediário' ? 'warning' : 'error'} size="sm">
                        {track.level}
                      </Badge>
                      <Badge variant="outline" size="sm">{track.category}</Badge>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {track.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {track.modules} módulos
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-status-warning" />
                        {track.rating}
                      </span>
                    </div>

                    {track.completedModules > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                          <span>Progresso</span>
                          <span>{Math.round((track.completedModules / track.modules) * 100)}%</span>
                        </div>
                        <Progress
                          value={(track.completedModules / track.modules) * 100}
                          size="sm"
                          variant={track.completedModules === track.modules ? 'success' : 'default'}
                        />
                      </div>
                    )}

                    <Button
                      className="w-full"
                      variant={track.completedModules > 0 ? 'primary' : 'outline'}
                      size="sm"
                    >
                      {track.completedModules === 0 ? (
                        <>
                          <Play className="h-4 w-4 mr-1" />
                          Começar
                        </>
                      ) : track.completedModules === track.modules ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Completo
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-1" />
                          Continuar
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* LIFOW Chat */}
            <Card>
              <CardHeader className="border-b border-surface-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-aimana-teal">
                    <Bot className="h-5 w-5 text-aimana-navy" />
                  </div>
                  <div>
                    <CardTitle className="text-base">LIFOW</CardTitle>
                    <CardDescription>Assistente educacional 24/7</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-64 overflow-y-auto p-4 space-y-3 scrollbar-thin">
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
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-surface-border p-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Pergunte ao LIFOW..."
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

            {/* Your Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Seu Progresso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text">Trilhas iniciadas</span>
                    <span className="font-medium text-text">4</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text">Trilhas completas</span>
                    <span className="font-medium text-status-success">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text">Horas de estudo</span>
                    <span className="font-medium text-text">12h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text">Pontos XP</span>
                    <span className="font-medium text-aimana-teal">850</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended */}
            <Card className="bg-gradient-header text-white">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Recomendado para Você</h3>
                <p className="text-sm text-white/80 mb-3">
                  Baseado no seu perfil e progresso atual
                </p>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-medium">Prompt Engineering</p>
                  <p className="text-xs text-white/70">Continue de onde parou</p>
                  <Button size="sm" className="mt-2 bg-white text-aimana-navy hover:bg-white/90">
                    <Play className="h-4 w-4 mr-1" />
                    Continuar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
