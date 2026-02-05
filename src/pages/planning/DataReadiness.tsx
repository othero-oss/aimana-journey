/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Data Readiness Page
 * Avaliação de prontidão de dados para IA
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
  Database,
  Server,
  Cloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Bot,
  Send,
  ArrowRight,
  RefreshCw,
  Shield,
  Layers,
  GitBranch,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data sources assessment
const dataSources = [
  {
    id: 1,
    name: 'PostgreSQL - CRM',
    type: 'database',
    icon: Database,
    quality: 85,
    completeness: 92,
    freshness: 95,
    accessibility: 70,
    overallScore: 85,
    status: 'ready',
    issues: ['Falta documentação de schemas'],
  },
  {
    id: 2,
    name: 'SQL Server - ERP',
    type: 'database',
    icon: Server,
    quality: 72,
    completeness: 88,
    freshness: 90,
    accessibility: 45,
    overallScore: 74,
    status: 'needs_work',
    issues: ['Acesso restrito', 'Silos de dados', 'Schemas não documentados'],
  },
  {
    id: 3,
    name: 'Salesforce',
    type: 'api',
    icon: Cloud,
    quality: 90,
    completeness: 85,
    freshness: 98,
    accessibility: 88,
    overallScore: 90,
    status: 'ready',
    issues: [],
  },
  {
    id: 4,
    name: 'Planilhas Financeiras',
    type: 'spreadsheet',
    icon: FileSpreadsheet,
    quality: 45,
    completeness: 60,
    freshness: 40,
    accessibility: 30,
    overallScore: 44,
    status: 'not_ready',
    issues: ['Dados duplicados', 'Sem versionamento', 'Formato inconsistente', 'Acesso manual'],
  },
];

// Assessment dimensions
const dimensions = [
  { id: 'quality', name: 'Qualidade', description: 'Precisão e consistência dos dados' },
  { id: 'completeness', name: 'Completude', description: 'Cobertura e preenchimento' },
  { id: 'freshness', name: 'Atualização', description: 'Frequência de atualização' },
  { id: 'accessibility', name: 'Acessibilidade', description: 'Facilidade de acesso e integração' },
];

const statusConfig = {
  ready: { label: 'Pronto', color: 'bg-status-success', badge: 'success' as const },
  needs_work: { label: 'Precisa Ajustes', color: 'bg-status-warning', badge: 'warning' as const },
  not_ready: { label: 'Não Pronto', color: 'bg-status-error', badge: 'error' as const },
};

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export function DataReadiness() {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Olá! Sou o **DataReadinessAgent**. Analisei suas fontes de dados e identifiquei:

**Score Geral: 73/100**

✅ 2 fontes prontas para IA
⚠️ 1 fonte precisa de ajustes
❌ 1 fonte não está pronta

A principal barreira é a **acessibilidade** das planilhas financeiras. Recomendo:
1. Migrar para um banco de dados estruturado
2. Implementar pipelines de ETL
3. Documentar schemas

Posso detalhar algum ponto?`,
    },
  ]);

  const overallScore = Math.round(
    dataSources.reduce((acc, ds) => acc + ds.overallScore, 0) / dataSources.length
  );

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: 'user' as const, content: chatInput }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content: `Analisando a questão...

Para melhorar a **acessibilidade** dos dados do ERP, sugiro:

**Curto prazo (1-2 semanas):**
- Criar views específicas para casos de uso de IA
- Documentar os schemas mais críticos
- Configurar usuário de leitura para agentes

**Médio prazo (1-2 meses):**
- Implementar camada de API para acesso
- Configurar CDC (Change Data Capture)
- Criar data catalog

Isso elevaria o score de acessibilidade de 45 para ~80.

Deseja que eu crie um plano de ação detalhado?`,
        },
      ]);
    }, 1500);
  };

  return (
    <div>
      <Header
        title="Data Readiness"
        subtitle="Avalie a prontidão dos dados para iniciativas de IA"
      />

      <main className="p-6">
        {/* Overall Score */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card className="md:col-span-1">
            <CardContent className="p-4 text-center">
              <div className="relative mx-auto h-24 w-24 mb-2">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-surface-light"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeDasharray={`${overallScore * 2.51} 251`}
                    strokeLinecap="round"
                    className={cn(
                      overallScore >= 70 ? 'text-status-success' :
                      overallScore >= 50 ? 'text-status-warning' : 'text-status-error'
                    )}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-text">{overallScore}</span>
                </div>
              </div>
              <p className="text-sm font-medium text-text">Score Geral</p>
              <p className="text-xs text-text-muted">Prontidão de Dados</p>
            </CardContent>
          </Card>

          {dimensions.map((dim) => {
            const avgScore = Math.round(
              dataSources.reduce((acc, ds) => acc + (ds[dim.id as keyof typeof ds] as number), 0) / dataSources.length
            );
            return (
              <Card key={dim.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text">{dim.name}</span>
                    <span className={cn(
                      'text-lg font-bold',
                      avgScore >= 70 ? 'text-status-success' :
                      avgScore >= 50 ? 'text-status-warning' : 'text-status-error'
                    )}>{avgScore}</span>
                  </div>
                  <Progress value={avgScore} size="sm" variant={avgScore >= 70 ? 'success' : avgScore >= 50 ? 'warning' : 'error'} />
                  <p className="text-xs text-text-muted mt-2">{dim.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Data Sources */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text">Fontes de Dados</h2>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-1" />
                Reanalisar
              </Button>
            </div>

            {dataSources.map((source) => {
              const status = statusConfig[source.status as keyof typeof statusConfig];
              return (
                <Card key={source.id} variant="interactive">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-light">
                        <source.icon className="h-6 w-6 text-aimana-navy" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-text">{source.name}</h3>
                            <Badge variant={status.badge}>{status.label}</Badge>
                          </div>
                          <div className="text-right">
                            <span className={cn(
                              'text-xl font-bold',
                              source.overallScore >= 70 ? 'text-status-success' :
                              source.overallScore >= 50 ? 'text-status-warning' : 'text-status-error'
                            )}>{source.overallScore}</span>
                            <span className="text-sm text-text-muted">/100</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mb-3">
                          {dimensions.map((dim) => {
                            const score = source[dim.id as keyof typeof source] as number;
                            return (
                              <div key={dim.id}>
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="text-text-muted">{dim.name}</span>
                                  <span className="font-medium text-text">{score}</span>
                                </div>
                                <Progress value={score} size="sm" variant={score >= 70 ? 'success' : score >= 50 ? 'warning' : 'error'} />
                              </div>
                            );
                          })}
                        </div>

                        {source.issues.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {source.issues.map((issue, i) => (
                              <Badge key={i} variant="outline" size="sm" className="text-status-warning">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                {issue}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Chat */}
            <Card>
              <CardHeader className="border-b border-surface-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-aimana-teal">
                    <Bot className="h-5 w-5 text-aimana-navy" />
                  </div>
                  <div>
                    <CardTitle className="text-base">DataReadinessAgent</CardTitle>
                    <CardDescription>Análise de dados</CardDescription>
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
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-surface-border p-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Pergunte sobre os dados..."
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

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recomendações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-2 rounded-lg bg-status-error-bg">
                  <XCircle className="h-5 w-5 text-status-error mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-text">Migrar Planilhas</p>
                    <p className="text-xs text-text-secondary">Estruturar dados financeiros em banco de dados</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 rounded-lg bg-status-warning-bg">
                  <AlertTriangle className="h-5 w-5 text-status-warning mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-text">Documentar ERP</p>
                    <p className="text-xs text-text-secondary">Criar documentação de schemas e acessos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 rounded-lg bg-status-success-bg">
                  <CheckCircle2 className="h-5 w-5 text-status-success mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-text">Manter CRM e Salesforce</p>
                    <p className="text-xs text-text-secondary">Fontes prontas para uso imediato</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Architecture Preview */}
            <Card className="bg-gradient-header text-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <GitBranch className="h-5 w-5" />
                  <h3 className="font-semibold">Arquitetura Sugerida</h3>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <div className="p-2 rounded bg-white/10">Sources</div>
                  <ArrowRight className="h-4 w-4" />
                  <div className="p-2 rounded bg-white/10">ETL</div>
                  <ArrowRight className="h-4 w-4" />
                  <div className="p-2 rounded bg-aimana-teal/30">Data Lake</div>
                  <ArrowRight className="h-4 w-4" />
                  <div className="p-2 rounded bg-white/10">AI</div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3 border-white/30 text-white hover:bg-white/10">
                  Ver Diagrama Completo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
