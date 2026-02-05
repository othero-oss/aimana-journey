/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Executive Reports Page
 * Relatórios executivos e dashboards para liderança
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
  FileText,
  Download,
  Calendar,
  Clock,
  TrendingUp,
  PieChart,
  BarChart3,
  Bot,
  Send,
  Share2,
  Eye,
  Plus,
  Settings,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Available reports
const reports = [
  {
    id: 1,
    name: 'AI Portfolio Overview',
    description: 'Visão geral de todas as iniciativas de IA',
    type: 'dashboard',
    frequency: 'Tempo real',
    lastGenerated: '2025-02-05 08:00',
    icon: PieChart,
    audience: 'C-Level',
  },
  {
    id: 2,
    name: 'ROI Mensal',
    description: 'Análise de retorno sobre investimento',
    type: 'report',
    frequency: 'Mensal',
    lastGenerated: '2025-02-01 09:00',
    icon: TrendingUp,
    audience: 'CFO, Board',
  },
  {
    id: 3,
    name: 'Agent Performance',
    description: 'Métricas de desempenho dos agentes',
    type: 'report',
    frequency: 'Semanal',
    lastGenerated: '2025-02-03 10:00',
    icon: BarChart3,
    audience: 'CTO, Tech Leads',
  },
  {
    id: 4,
    name: 'Governance & Compliance',
    description: 'Status de governança e conformidade',
    type: 'report',
    frequency: 'Trimestral',
    lastGenerated: '2025-01-15 14:00',
    icon: FileText,
    audience: 'Legal, Compliance',
  },
];

// Scheduled reports
const scheduledReports = [
  { name: 'ROI Mensal', nextRun: '2025-03-01 09:00', recipients: 5 },
  { name: 'Agent Performance', nextRun: '2025-02-10 10:00', recipients: 8 },
  { name: 'Portfolio Summary', nextRun: '2025-02-06 08:00', recipients: 12 },
];

// Report insights
const insights = [
  {
    title: 'ROI acima da meta',
    description: 'Customer Support Agent atingiu 220% de ROI, superando a meta de 200%',
    type: 'positive',
  },
  {
    title: 'Projeto em risco',
    description: 'Document Analyzer com ROI negativo precisa de ação imediata',
    type: 'negative',
  },
  {
    title: 'Oportunidade identificada',
    description: 'Expansão do Sales Assistant pode gerar +R$150k/ano',
    type: 'opportunity',
  },
];

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export function ExecutiveReports() {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Olá! Sou o **ReportsAgent**. Posso ajudá-lo a:

• Gerar relatórios sob demanda
• Configurar envios automáticos
• Criar dashboards personalizados
• Extrair insights de dados

**Relatórios mais acessados:**
1. AI Portfolio Overview (15 visualizações/semana)
2. ROI Mensal (12 visualizações/semana)

Qual relatório deseja gerar?`,
    },
  ]);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { role: 'user' as const, content: chatInput }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content: `Gerando **Relatório Executivo para o Board**...

**Estrutura sugerida:**

1. **Sumário Executivo**
   - ROI Global: 84%
   - Investimento total: R$610k
   - Economia gerada: R$1.125k

2. **Destaques**
   - Customer Support: sucesso comprovado
   - Pipeline: 2 projetos em execução

3. **Riscos e Mitigações**
   - Document Analyzer: plano de recuperação

4. **Próximos Passos**
   - Aprovação para Scale do Sales Assistant
   - Budget Q2 para novos projetos

O relatório está sendo gerado em PDF.
Tempo estimado: 30 segundos.

Deseja adicionar alguma seção customizada?`,
        },
      ]);
    }, 1500);
  };

  return (
    <div>
      <Header
        title="Relatórios Executivos"
        subtitle="Dashboards e relatórios para a liderança"
      />

      <main className="p-6">
        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" variant="interactive">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-aimana-teal/10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-aimana-teal" />
              </div>
              <div>
                <p className="font-medium text-text">Gerar com IA</p>
                <p className="text-xs text-text-muted">Relatório personalizado</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow" variant="interactive">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-phase-plan-bg flex items-center justify-center">
                <PieChart className="h-5 w-5 text-phase-plan" />
              </div>
              <div>
                <p className="font-medium text-text">Dashboard</p>
                <p className="text-xs text-text-muted">Tempo real</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow" variant="interactive">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-phase-execute-bg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-phase-execute" />
              </div>
              <div>
                <p className="font-medium text-text">Agendar</p>
                <p className="text-xs text-text-muted">Envio automático</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow" variant="interactive">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-phase-manage-bg flex items-center justify-center">
                <Plus className="h-5 w-5 text-phase-manage" />
              </div>
              <div>
                <p className="font-medium text-text">Novo Template</p>
                <p className="text-xs text-text-muted">Criar modelo</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Reports List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text">Relatórios Disponíveis</h2>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-1" />
                Configurar
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {reports.map((report) => (
                <Card key={report.id} variant="interactive">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="h-10 w-10 rounded-lg bg-surface-light flex items-center justify-center">
                        <report.icon className="h-5 w-5 text-aimana-navy" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-text">{report.name}</h3>
                        <p className="text-sm text-text-secondary">{report.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant={report.type === 'dashboard' ? 'execute' : 'plan'} size="sm">
                        {report.type === 'dashboard' ? 'Dashboard' : 'Relatório'}
                      </Badge>
                      <Badge variant="outline" size="sm">{report.frequency}</Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs text-text-muted mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Último: {report.lastGenerated}
                      </span>
                      <span>{report.audience}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        Visualizar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-aimana-teal" />
                  <CardTitle className="text-base">Insights Gerados por IA</CardTitle>
                </div>
                <CardDescription>Análise automática dos dados do portfólio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {insights.map((insight, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'p-3 rounded-lg',
                      insight.type === 'positive' && 'bg-status-success-bg',
                      insight.type === 'negative' && 'bg-status-error-bg',
                      insight.type === 'opportunity' && 'bg-aimana-teal/10'
                    )}
                  >
                    <p className="font-medium text-text text-sm">{insight.title}</p>
                    <p className="text-xs text-text-secondary mt-1">{insight.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
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
                    <CardTitle className="text-base">ReportsAgent</CardTitle>
                    <CardDescription>Geração de relatórios</CardDescription>
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
                      placeholder="Peça um relatório..."
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

            {/* Scheduled Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Envios Agendados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {scheduledReports.map((report, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-surface-light">
                    <div>
                      <p className="text-sm font-medium text-text">{report.name}</p>
                      <p className="text-xs text-text-muted">{report.nextRun}</p>
                    </div>
                    <Badge variant="outline" size="sm">{report.recipients} dest.</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Generate */}
            <Card className="bg-gradient-header text-white">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Geração Rápida</h3>
                <p className="text-sm text-white/80 mb-4">
                  Descreva o relatório que precisa e a IA gerará automaticamente.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10 justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Resumo para Board
                  </Button>
                  <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10 justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Análise de ROI
                  </Button>
                  <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10 justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Performance Semanal
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
