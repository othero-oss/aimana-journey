/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Executive Reports Page
 * Relatórios executivos e dashboards para liderança
 * Layout full-width com workflow de geração eficiente
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
  Share2,
  Eye,
  Plus,
  Settings,
  Sparkles,
  Mail,
  Users,
  Play,
  Pause,
  Edit2,
  Trash2,
  Copy,
  Send,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Presentation,
  File,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AIInsightBanner, AIActionButton, AIModal } from '@/components/ai';

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
    views: 15,
    scheduled: false,
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
    views: 12,
    scheduled: true,
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
    views: 18,
    scheduled: true,
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
    views: 5,
    scheduled: true,
  },
  {
    id: 5,
    name: 'Maturity Progress',
    description: 'Evolução do diagnóstico de maturidade',
    type: 'report',
    frequency: 'Mensal',
    lastGenerated: '2025-02-01 11:00',
    icon: TrendingUp,
    audience: 'CEO, CDO',
    views: 8,
    scheduled: false,
  },
  {
    id: 6,
    name: 'Health Dashboard',
    description: 'Status de saúde de todos os agentes',
    type: 'dashboard',
    frequency: 'Tempo real',
    lastGenerated: '2025-02-05 09:30',
    icon: BarChart3,
    audience: 'CTO, Ops',
    views: 22,
    scheduled: false,
  },
];

// Scheduled reports
const scheduledReports = [
  {
    id: 1,
    name: 'ROI Mensal',
    nextRun: '2025-03-01 09:00',
    recipients: ['cfo@empresa.com', 'ceo@empresa.com', '+3 outros'],
    format: 'PDF',
    active: true,
  },
  {
    id: 2,
    name: 'Agent Performance',
    nextRun: '2025-02-10 10:00',
    recipients: ['cto@empresa.com', 'tech-leads@empresa.com'],
    format: 'PDF + Excel',
    active: true,
  },
  {
    id: 3,
    name: 'Portfolio Summary',
    nextRun: '2025-02-06 08:00',
    recipients: ['board@empresa.com'],
    format: 'PPT',
    active: true,
  },
  {
    id: 4,
    name: 'Governance Status',
    nextRun: '2025-04-01 14:00',
    recipients: ['legal@empresa.com', 'compliance@empresa.com'],
    format: 'PDF',
    active: false,
  },
];

// AI Insights
const aiInsights = [
  {
    id: '1',
    type: 'positive' as const,
    title: 'ROI Acima da Meta',
    description: 'Customer Support Agent atingiu 220% de ROI. Incluir case de sucesso no próximo relatório executivo.',
  },
  {
    id: '2',
    type: 'warning' as const,
    title: 'Projeto em Risco',
    description: 'Document Analyzer precisa ser reportado com plano de ação. Sugestão de slides disponível.',
    action: {
      label: 'Gerar Slides',
      onClick: () => {},
    },
  },
  {
    id: '3',
    type: 'suggestion' as const,
    title: 'Oportunidade de Expansão',
    description: 'Dados indicam potencial de +R$150k/ano com expansão do Sales Assistant. Incluir proposta?',
  },
];

// Report templates
const reportTemplates = [
  { name: 'Resumo Executivo', description: 'Visão geral para C-Level', icon: FileText },
  { name: 'Análise de ROI', description: 'Detalhamento financeiro', icon: TrendingUp },
  { name: 'Performance Técnica', description: 'Métricas de agentes', icon: BarChart3 },
  { name: 'Roadmap & Próximos Passos', description: 'Planejamento estratégico', icon: Calendar },
];

export function ExecutiveReports() {
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<typeof reports[0] | null>(null);
  const [insightsDismissed, setInsightsDismissed] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleGenerateReport = (report?: typeof reports[0]) => {
    setSelectedReport(report || null);
    setShowGenerateModal(true);
  };

  const handleScheduleReport = (report?: typeof reports[0]) => {
    setSelectedReport(report || null);
    setShowScheduleModal(true);
  };

  const handleAIMessage = async (message: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return `Gerando **${selectedReport?.name || 'Relatório Personalizado'}**...

**Estrutura sugerida:**

1. **Sumário Executivo**
   - ROI Global: 84%
   - Investimento total: R$730k
   - Economia gerada: R$1.320k

2. **Destaques do Período**
   - Customer Support: ROI de 220%
   - 2 novos projetos em pipeline

3. **Riscos e Mitigações**
   - Document Analyzer: plano de recuperação em andamento

4. **Próximos Passos**
   - Aprovação para Scale do Sales Assistant
   - Budget Q2 para novos projetos

**Formato:** PDF + PPT
**Tempo estimado:** 30 segundos

Deseja ajustar alguma seção antes de gerar?`;
  };

  const visibleInsights = aiInsights.filter((i) => !insightsDismissed.includes(i.id));

  return (
    <div>
      <Header
        title="Relatórios Executivos"
        subtitle="Dashboards e relatórios para a liderança"
      />

      <main className="p-6 space-y-6">
        {/* AI Insights Banner */}
        {visibleInsights.length > 0 && (
          <AIInsightBanner
            insights={visibleInsights}
            onDismiss={(id) => setInsightsDismissed((prev) => [...prev, id])}
          />
        )}

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card
            className="cursor-pointer hover:shadow-md hover:border-aimana-teal transition-all"
            variant="interactive"
            onClick={() => handleGenerateReport()}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-purple-500/20 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-aimana-teal" />
              </div>
              <div>
                <p className="font-semibold text-text">Gerar com IA</p>
                <p className="text-xs text-text-muted">Relatório personalizado</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-all"
            variant="interactive"
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-phase-plan-bg flex items-center justify-center">
                <PieChart className="h-6 w-6 text-phase-plan" />
              </div>
              <div>
                <p className="font-semibold text-text">Dashboard Live</p>
                <p className="text-xs text-text-muted">Dados em tempo real</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-all"
            variant="interactive"
            onClick={() => handleScheduleReport()}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-phase-execute-bg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-phase-execute" />
              </div>
              <div>
                <p className="font-semibold text-text">Agendar Envio</p>
                <p className="text-xs text-text-muted">Automação de relatórios</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-all"
            variant="interactive"
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-phase-manage-bg flex items-center justify-center">
                <Plus className="h-6 w-6 text-phase-manage" />
              </div>
              <div>
                <p className="font-semibold text-text">Novo Template</p>
                <p className="text-xs text-text-muted">Criar modelo customizado</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Reports List - 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text">Relatórios Disponíveis</h2>
              <div className="flex items-center gap-2">
                <AIActionButton
                  label="Sugestões IA"
                  action="suggest"
                  onClick={() => handleGenerateReport()}
                  variant="outline"
                  size="sm"
                />
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {reports.map((report) => (
                <Card key={report.id} variant="interactive">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={cn(
                        "h-10 w-10 rounded-lg flex items-center justify-center",
                        report.type === 'dashboard' ? 'bg-phase-execute-bg' : 'bg-phase-plan-bg'
                      )}>
                        <report.icon className={cn(
                          "h-5 w-5",
                          report.type === 'dashboard' ? 'text-phase-execute' : 'text-phase-plan'
                        )} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-text">{report.name}</h3>
                          {report.scheduled && (
                            <Badge variant="success" size="sm">
                              <Clock className="h-2.5 w-2.5 mr-0.5" />
                              Agendado
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-text-secondary line-clamp-1">{report.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <Badge variant={report.type === 'dashboard' ? 'execute' : 'plan'} size="sm">
                        {report.type === 'dashboard' ? 'Dashboard' : 'Relatório'}
                      </Badge>
                      <Badge variant="outline" size="sm">{report.frequency}</Badge>
                      <span className="text-xs text-text-muted ml-auto">{report.views} views</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-text-muted mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {report.lastGenerated}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {report.audience}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        Ver
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleGenerateReport(report)}
                      >
                        <Sparkles className="h-3 w-3 mr-1" />
                        Gerar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Templates */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-4 w-4 text-aimana-teal" />
                    Templates Rápidos
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Criar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 md:grid-cols-2">
                  {reportTemplates.map((template, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="justify-start h-auto py-3"
                      onClick={() => handleGenerateReport()}
                    >
                      <template.icon className="h-4 w-4 mr-2 text-text-muted" />
                      <div className="text-left">
                        <p className="font-medium">{template.name}</p>
                        <p className="text-xs text-text-muted">{template.description}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Scheduled Reports */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-phase-execute" />
                    Envios Agendados
                  </CardTitle>
                  <Badge variant="execute">{scheduledReports.filter(r => r.active).length} ativos</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {scheduledReports.map((report) => (
                  <div
                    key={report.id}
                    className={cn(
                      "p-3 rounded-lg",
                      report.active ? 'bg-surface-light' : 'bg-surface-light/50 opacity-60'
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-text text-sm">{report.name}</span>
                      <div className="flex items-center gap-1">
                        {report.active ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-status-success" />
                        ) : (
                          <Pause className="h-3.5 w-3.5 text-text-muted" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
                      <Clock className="h-3 w-3" />
                      <span>{report.nextRun}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-text-muted">
                        <Mail className="h-3 w-3" />
                        <span>{report.recipients.length > 2 ? `${report.recipients.slice(0, 2).join(', ')}...` : report.recipients.join(', ')}</span>
                      </div>
                      <Badge variant="outline" size="sm">{report.format}</Badge>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full" onClick={() => handleScheduleReport()}>
                  <Plus className="h-4 w-4 mr-1" />
                  Novo Agendamento
                </Button>
              </CardContent>
            </Card>

            {/* Export Formats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Download className="h-4 w-4 text-text-muted" />
                  Formatos de Exportação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <File className="h-4 w-4 mr-2 text-red-500" />
                  PDF - Relatório Completo
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Presentation className="h-4 w-4 mr-2 text-orange-500" />
                  PowerPoint - Apresentação
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <FileSpreadsheet className="h-4 w-4 mr-2 text-green-500" />
                  Excel - Dados Detalhados
                </Button>
              </CardContent>
            </Card>

            {/* Quick Generate */}
            <Card className="bg-gradient-header text-white">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Geração Inteligente
                </h3>
                <p className="text-sm text-white/80 mb-4">
                  IA gera relatórios completos com insights automaticamente.
                </p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-white/30 text-white hover:bg-white/10 justify-start"
                    onClick={() => handleGenerateReport()}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Resumo para Board
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-white/30 text-white hover:bg-white/10 justify-start"
                    onClick={() => handleGenerateReport()}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Análise Financeira
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-white/30 text-white hover:bg-white/10 justify-start"
                    onClick={() => handleGenerateReport()}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Performance Mensal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* AI Generate Report Modal */}
      <AIModal
        title={selectedReport ? `Gerar: ${selectedReport.name}` : 'Gerar Relatório'}
        description="Assistente de geração de relatórios executivos"
        isOpen={showGenerateModal}
        onClose={() => {
          setShowGenerateModal(false);
          setSelectedReport(null);
        }}
        agentName="ReportsAgent"
        agentDescription="Especialista em relatórios executivos e apresentações"
        initialMessage={selectedReport
          ? `Preparando **${selectedReport.name}**...

**Dados disponíveis:**
- Período: Último mês
- Audiência: ${selectedReport.audience}
- Formato sugerido: PDF + PPT

**Seções incluídas:**
1. Sumário Executivo
2. Métricas Principais
3. Destaques e Alertas
4. Próximos Passos

Deseja customizar alguma seção ou adicionar dados específicos?`
          : `Olá! Posso ajudá-lo a gerar relatórios executivos.

**Opções disponíveis:**
• Resumo Executivo para Board
• Análise de ROI Detalhada
• Performance de Agentes
• Relatório de Governança
• Relatório Customizado

**Formatos de exportação:**
📄 PDF | 📊 PowerPoint | 📈 Excel

Qual relatório deseja gerar?`
        }
        suggestedPrompts={selectedReport ? [
          'Gerar agora',
          'Adicionar comparativo',
          'Incluir projeções',
          'Customizar seções',
        ] : [
          'Resumo para o Board',
          'Análise de ROI completa',
          'Performance dos agentes',
          'Relatório customizado',
        ]}
        onSendMessage={handleAIMessage}
      />

      {/* Schedule Report Modal */}
      <AIModal
        title="Agendar Relatório"
        description="Configure envios automáticos de relatórios"
        isOpen={showScheduleModal}
        onClose={() => {
          setShowScheduleModal(false);
          setSelectedReport(null);
        }}
        agentName="ReportsAgent"
        agentDescription="Especialista em automação de relatórios"
        initialMessage={`Vamos configurar o envio automático de relatórios.

**Opções de frequência:**
• Diário (08:00)
• Semanal (Segunda-feira)
• Mensal (Dia 1)
• Trimestral

**Formatos disponíveis:**
• PDF - Relatório completo
• PPT - Apresentação executiva
• Excel - Dados para análise

**Canais de entrega:**
• Email
• Slack
• Teams

Qual relatório deseja agendar?`}
        suggestedPrompts={[
          'Agendar ROI Mensal',
          'Configurar envio semanal',
          'Adicionar destinatários',
          'Ver agendamentos ativos',
        ]}
        onSendMessage={handleAIMessage}
      />
    </div>
  );
}
