/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - AI Coders Program Page
 * Programa de capacitação técnica para desenvolvedores
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
  Code,
  BookOpen,
  Video,
  Clock,
  CheckCircle2,
  Play,
  Bot,
  Send,
  Terminal,
  GitBranch,
  Database,
  Cpu,
  Zap,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Learning tracks
const learningTracks = [
  {
    id: 'fundamentals',
    title: 'Fundamentos de LLMs',
    description: 'Como funcionam os modelos de linguagem',
    modules: [
      { name: 'Arquitetura de Transformers', completed: true },
      { name: 'Tokenização e Embeddings', completed: true },
      { name: 'Fine-tuning vs Prompting', completed: false },
      { name: 'Avaliação de Modelos', completed: false },
    ],
    icon: Cpu,
  },
  {
    id: 'prompting',
    title: 'Prompt Engineering Avançado',
    description: 'Técnicas avançadas de prompting',
    modules: [
      { name: 'Chain-of-Thought', completed: true },
      { name: 'Few-shot Learning', completed: true },
      { name: 'Self-consistency', completed: true },
      { name: 'Constitutional AI', completed: false },
    ],
    icon: Terminal,
  },
  {
    id: 'agents',
    title: 'Construindo Agentes',
    description: 'Agentes autônomos com LangChain',
    modules: [
      { name: 'Arquitetura de Agentes', completed: false },
      { name: 'Tools e Functions', completed: false },
      { name: 'Memória e Contexto', completed: false },
      { name: 'ReAct Pattern', completed: false },
      { name: 'Multi-agent Systems', completed: false },
    ],
    icon: Bot,
  },
  {
    id: 'rag',
    title: 'RAG: Retrieval Augmented Generation',
    description: 'Sistemas com conhecimento próprio',
    modules: [
      { name: 'Vector Databases', completed: false },
      { name: 'Chunking Strategies', completed: false },
      { name: 'Hybrid Search', completed: false },
      { name: 'Evaluation & Metrics', completed: false },
    ],
    icon: Database,
  },
  {
    id: 'production',
    title: 'IA em Produção',
    description: 'Deploy e operação de sistemas de IA',
    modules: [
      { name: 'LLMOps Fundamentals', completed: false },
      { name: 'Observability & Tracing', completed: false },
      { name: 'Cost Optimization', completed: false },
      { name: 'Security & Guardrails', completed: false },
    ],
    icon: GitBranch,
  },
];

// Code challenges
const challenges = [
  { title: 'Build a RAG Chatbot', difficulty: 'Medium', points: 100, completed: false },
  { title: 'Implement Chain-of-Thought', difficulty: 'Easy', points: 50, completed: true },
  { title: 'Multi-Agent Debate System', difficulty: 'Hard', points: 200, completed: false },
  { title: 'Custom Evaluation Framework', difficulty: 'Medium', points: 100, completed: false },
];

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export function AICoders() {
  const [selectedTrack, setSelectedTrack] = useState(learningTracks[0]);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Olá, dev! Sou o **Pair Programmer**, seu assistente técnico para IA.

**Seu progresso:**
📊 7 de 21 módulos completos (33%)
🎯 Trilha atual: Prompt Engineering Avançado

**Próximo desafio sugerido:**
🏆 "Build a RAG Chatbot" (100 pontos)

Posso ajudar com:
• Explicar conceitos técnicos
• Revisar código
• Sugerir abordagens
• Debugar problemas

O que está desenvolvendo?`,
    },
  ]);

  const totalModules = learningTracks.reduce((acc, t) => acc + t.modules.length, 0);
  const completedModules = learningTracks.reduce(
    (acc, t) => acc + t.modules.filter((m) => m.completed).length,
    0
  );

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: 'user', content: chatInput }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Para implementar RAG, aqui está um exemplo básico:

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

**Dicas importantes:**
1. Teste diferentes chunk sizes
2. Use hybrid search quando possível
3. Monitore latência e custos

Quer que eu detalhe alguma parte?`,
        },
      ]);
    }, 1500);
  };

  return (
    <div>
      <Header
        title="AI Coders"
        subtitle="Capacitação técnica em desenvolvimento de IA"
      />

      <main className="p-6">
        {/* Progress Banner */}
        <Card className="mb-6 border-l-4 border-l-phase-manage">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Code className="h-5 w-5 text-phase-manage" />
                  <h2 className="text-lg font-semibold text-text">Programa AI Coders</h2>
                </div>
                <p className="text-sm text-text-secondary">
                  Do prompt engineering ao deploy em produção
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="manage">Técnico</Badge>
                  <span className="text-sm text-text-muted">
                    {completedModules} de {totalModules} módulos
                  </span>
                </div>
              </div>
              <div className="w-full md:w-48">
                <Progress value={(completedModules / totalModules) * 100} showLabel />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Learning Tracks */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-semibold text-text">Trilhas de Aprendizado</h2>

            <div className="grid gap-4 md:grid-cols-2">
              {learningTracks.map((track) => {
                const completedCount = track.modules.filter((m) => m.completed).length;
                const isSelected = selectedTrack.id === track.id;
                return (
                  <Card
                    key={track.id}
                    variant="interactive"
                    className={cn(
                      'cursor-pointer',
                      isSelected && 'ring-2 ring-phase-manage'
                    )}
                    onClick={() => setSelectedTrack(track)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-lg',
                          completedCount === track.modules.length
                            ? 'bg-status-success-bg'
                            : 'bg-phase-manage-bg'
                        )}>
                          {completedCount === track.modules.length ? (
                            <CheckCircle2 className="h-5 w-5 text-status-success" />
                          ) : (
                            <track.icon className="h-5 w-5 text-phase-manage" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-text">{track.title}</h3>
                          <p className="text-sm text-text-secondary">{track.description}</p>
                          <div className="mt-2">
                            <Progress
                              value={(completedCount / track.modules.length) * 100}
                              size="sm"
                              variant={completedCount === track.modules.length ? 'success' : 'default'}
                            />
                            <p className="text-xs text-text-muted mt-1">
                              {completedCount}/{track.modules.length} módulos
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Selected Track Modules */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <selectedTrack.icon className="h-5 w-5 text-phase-manage" />
                  <CardTitle className="text-base">{selectedTrack.title}</CardTitle>
                </div>
                <CardDescription>{selectedTrack.description}</CardDescription>
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
                        <CheckCircle2 className="h-5 w-5 text-status-success" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-text-muted" />
                      )}
                      <span className={cn(
                        'flex-1',
                        module.completed ? 'text-text-secondary' : 'text-text font-medium'
                      )}>
                        {module.name}
                      </span>
                      {!module.completed && (
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

            {/* Code Challenges */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-status-warning" />
                  <CardTitle className="text-base">Desafios de Código</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {challenges.map((challenge, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-lg border',
                        challenge.completed ? 'border-status-success bg-status-success-bg' : 'border-surface-border'
                      )}
                    >
                      {challenge.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-status-success" />
                      ) : (
                        <Code className="h-5 w-5 text-text-muted" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-text">{challenge.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={challenge.difficulty === 'Easy' ? 'success' : challenge.difficulty === 'Medium' ? 'warning' : 'error'}
                            size="sm"
                          >
                            {challenge.difficulty}
                          </Badge>
                          <span className="text-xs text-text-muted">
                            <Star className="h-3 w-3 inline mr-1" />
                            {challenge.points} pontos
                          </span>
                        </div>
                      </div>
                      {!challenge.completed && (
                        <Button variant="outline" size="sm">
                          Aceitar
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pair Programmer Chat */}
            <Card>
              <CardHeader className="border-b border-surface-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-phase-manage">
                    <Terminal className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Pair Programmer</CardTitle>
                    <CardDescription>Assistente técnico</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-72 overflow-y-auto p-4 space-y-3 scrollbar-thin">
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
                      placeholder="Pergunte sobre código..."
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

            {/* Your Stats */}
            <Card className="bg-gradient-header text-white">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Suas Estatísticas</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Pontos XP</span>
                    <span className="font-bold">1,250</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Desafios completos</span>
                    <span className="font-bold">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Streak de estudo</span>
                    <span className="font-bold">7 dias 🔥</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Ranking</span>
                    <span className="font-bold">#12</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recursos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Documentação LangChain
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <GitBranch className="h-4 w-4 mr-2" />
                  Repositório de Exemplos
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Database className="h-4 w-4 mr-2" />
                  API Reference
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
