/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Ideas Hub Page
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
  Plus,
  Lightbulb,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Filter,
  Search,
  MessageSquare,
  ThumbsUp,
  User,
} from 'lucide-react';

// Mock data
const ideas = [
  {
    id: 1,
    title: 'Automação de onboarding de clientes',
    description: 'Criar um agente para guiar novos clientes pelo processo de onboarding, respondendo dúvidas e coletando informações necessárias.',
    area: 'Customer Success',
    author: 'Maria Silva',
    date: '2024-01-15',
    status: 'approved',
    votes: 12,
    comments: 5,
    impact: 'high',
    complexity: 'medium',
  },
  {
    id: 2,
    title: 'Análise automática de feedbacks',
    description: 'Usar IA para categorizar e extrair insights de feedbacks de clientes recebidos por diversos canais.',
    area: 'Produto',
    author: 'João Santos',
    date: '2024-01-14',
    status: 'in_review',
    votes: 8,
    comments: 3,
    impact: 'medium',
    complexity: 'low',
  },
  {
    id: 3,
    title: 'Gerador de propostas comerciais',
    description: 'Agente que gera rascunhos de propostas comerciais baseado no perfil do cliente e histórico de negociações.',
    area: 'Comercial',
    author: 'Ana Costa',
    date: '2024-01-13',
    status: 'in_review',
    votes: 15,
    comments: 8,
    impact: 'high',
    complexity: 'high',
  },
  {
    id: 4,
    title: 'Bot de FAQ interno',
    description: 'Assistente para responder dúvidas frequentes dos colaboradores sobre políticas, benefícios e processos internos.',
    area: 'RH',
    author: 'Carlos Lima',
    date: '2024-01-12',
    status: 'submitted',
    votes: 6,
    comments: 2,
    impact: 'medium',
    complexity: 'low',
  },
  {
    id: 5,
    title: 'Previsão de churn',
    description: 'Modelo de ML para identificar clientes com risco de cancelamento e sugerir ações de retenção.',
    area: 'Customer Success',
    author: 'Pedro Oliveira',
    date: '2024-01-10',
    status: 'rejected',
    votes: 4,
    comments: 6,
    impact: 'high',
    complexity: 'high',
    rejectionReason: 'Requer dados que ainda não estão disponíveis. Resubmeter após projeto de Data Readiness.',
  },
];

const statusConfig = {
  submitted: { label: 'Submetida', variant: 'pending' as const, icon: Clock },
  in_review: { label: 'Em Análise', variant: 'info' as const, icon: MessageSquare },
  approved: { label: 'Aprovada', variant: 'success' as const, icon: CheckCircle2 },
  rejected: { label: 'Arquivada', variant: 'error' as const, icon: XCircle },
};

const impactConfig = {
  high: { label: 'Alto', color: 'text-status-success' },
  medium: { label: 'Médio', color: 'text-status-warning' },
  low: { label: 'Baixo', color: 'text-text-muted' },
};

export function IdeasHub() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIdeas = ideas.filter((idea) => {
    if (filter !== 'all' && idea.status !== filter) return false;
    if (searchQuery && !idea.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: ideas.length,
    submitted: ideas.filter((i) => i.status === 'submitted').length,
    inReview: ideas.filter((i) => i.status === 'in_review').length,
    approved: ideas.filter((i) => i.status === 'approved').length,
  };

  return (
    <div>
      <Header
        title="Hub de Ideias"
        subtitle="Submeta e acompanhe ideias de aplicação de IA"
      />

      <main className="p-6">
        {/* Stats & Actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex gap-4">
            <Card className="px-4 py-3">
              <div className="flex items-center gap-3">
                <Lightbulb className="h-5 w-5 text-aimana-teal" />
                <div>
                  <p className="text-2xl font-bold text-text">{stats.total}</p>
                  <p className="text-xs text-text-muted">Total de Ideias</p>
                </div>
              </div>
            </Card>
            <Card className="px-4 py-3">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-status-warning" />
                <div>
                  <p className="text-2xl font-bold text-text">{stats.inReview}</p>
                  <p className="text-xs text-text-muted">Em Análise</p>
                </div>
              </div>
            </Card>
            <Card className="px-4 py-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-status-success" />
                <div>
                  <p className="text-2xl font-bold text-text">{stats.approved}</p>
                  <p className="text-xs text-text-muted">Aprovadas</p>
                </div>
              </div>
            </Card>
          </div>

          <Button variant="primary">
            <Plus className="h-4 w-4 mr-2" />
            Submeter Nova Ideia
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-2">
                {['all', 'submitted', 'in_review', 'approved', 'rejected'].map((status) => (
                  <Button
                    key={status}
                    variant={filter === status ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setFilter(status)}
                  >
                    {status === 'all' ? 'Todas' : statusConfig[status as keyof typeof statusConfig]?.label}
                  </Button>
                ))}
              </div>
              <div className="w-full md:w-64">
                <Input
                  placeholder="Buscar ideias..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftElement={<Search className="h-4 w-4" />}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ideas List */}
        <div className="space-y-4">
          {filteredIdeas.map((idea) => {
            const status = statusConfig[idea.status as keyof typeof statusConfig];
            const impact = impactConfig[idea.impact as keyof typeof impactConfig];

            return (
              <Card key={idea.id} variant="interactive">
                <CardContent>
                  <div className="flex gap-4">
                    {/* Votes */}
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <button className="rounded p-1 hover:bg-surface-hover">
                        <ThumbsUp className="h-5 w-5 text-text-muted hover:text-aimana-teal" />
                      </button>
                      <span className="text-sm font-semibold text-text">{idea.votes}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-text">{idea.title}</h3>
                          <p className="mt-1 text-sm text-text-secondary line-clamp-2">
                            {idea.description}
                          </p>
                        </div>
                        <Badge variant={status.variant}>
                          <status.icon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                      </div>

                      {idea.status === 'rejected' && idea.rejectionReason && (
                        <div className="mt-3 rounded-lg bg-status-error-bg p-3">
                          <p className="text-sm text-status-error">
                            <strong>Motivo:</strong> {idea.rejectionReason}
                          </p>
                        </div>
                      )}

                      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                        <Badge variant="outline">{idea.area}</Badge>
                        <span className="flex items-center gap-1 text-text-muted">
                          <User className="h-3 w-3" />
                          {idea.author}
                        </span>
                        <span className="text-text-muted">{idea.date}</span>
                        <span className="flex items-center gap-1 text-text-muted">
                          <MessageSquare className="h-3 w-3" />
                          {idea.comments} comentários
                        </span>
                        <span className={`font-medium ${impact.color}`}>
                          Impacto: {impact.label}
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center">
                      <ArrowRight className="h-5 w-5 text-text-muted" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredIdeas.length === 0 && (
          <Card className="py-12 text-center">
            <Lightbulb className="mx-auto h-12 w-12 text-text-muted" />
            <h3 className="mt-4 text-lg font-medium text-text">Nenhuma ideia encontrada</h3>
            <p className="mt-1 text-text-secondary">
              Tente ajustar os filtros ou submeta uma nova ideia.
            </p>
            <Button variant="primary" className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Submeter Ideia
            </Button>
          </Card>
        )}
      </main>
    </div>
  );
}
