/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Relatórios (Operacionais + Negócio + Sprint)
 * Página dedicada a todos os relatórios da plataforma
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState } from 'react';
import { Header } from '@/components/layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AIActionButton, AIModal } from '@/components/ai';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
  Progress,
} from '@/components/ui';
import {
  FileText,
  Download,
  Eye,
  Calendar,
  BarChart3,
  TrendingUp,
  DollarSign,
  Activity,
  Users,
  Shield,
  Cpu,
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Target,
  Zap,
  BookOpen,
  PieChart,
  LineChart,
  ArrowUpRight,
  Server,
  GitBranch,
  ListChecks,
  Timer,
  Send,
  Bot,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// DADOS MOCK
// ============================================================================

const heroStats = [
  { label: 'Relatórios Gerados', value: '47', icon: FileText, color: 'text-aimana-teal' },
  { label: 'Este Mês', value: '12', icon: Calendar, color: 'text-aimana-blue' },
  { label: 'Agendados', value: '8', icon: Clock, color: 'text-status-warning' },
  { label: 'Pendentes de Revisão', value: '3', icon: Eye, color: 'text-status-info' },
];

const operationalReports = [
  {
    id: 'agent-status',
    title: 'Status dos Agentes',
    description: 'Performance, uptime, erros e métricas de todos os agentes em produção',
    frequency: 'Semanal',
    format: 'PDF',
    lastGenerated: '07/02/2025',
    icon: Cpu,
    color: 'bg-aimana-teal/10',
    iconColor: 'text-aimana-teal',
  },
  {
    id: 'incidents',
    title: 'Incidentes da Semana',
    description: 'Timeline de incidentes, root cause analysis e resoluções aplicadas',
    frequency: 'Semanal',
    format: 'PDF',
    lastGenerated: '07/02/2025',
    icon: AlertTriangle,
    color: 'bg-status-warning-bg',
    iconColor: 'text-status-warning',
  },
  {
    id: 'cost-ops',
    title: 'Custos Operacionais',
    description: 'Breakdown de custos por agente, por área, por modelo de IA utilizado',
    frequency: 'Mensal',
    format: 'Excel',
    lastGenerated: '31/01/2025',
    icon: DollarSign,
    color: 'bg-phase-plan-bg',
    iconColor: 'text-phase-plan',
  },
  {
    id: 'sla-uptime',
    title: 'SLA & Uptime',
    description: 'Compliance com SLAs definidos, uptime por agente, janelas de manutenção',
    frequency: 'Mensal',
    format: 'PDF',
    lastGenerated: '31/01/2025',
    icon: Activity,
    color: 'bg-status-success-bg',
    iconColor: 'text-status-success',
  },
  {
    id: 'api-tokens',
    title: 'Uso de APIs & Tokens',
    description: 'Consumo de tokens por modelo, por agente, projeção de custos futuros',
    frequency: 'Semanal',
    format: 'Excel',
    lastGenerated: '07/02/2025',
    icon: Zap,
    color: 'bg-phase-execute-bg',
    iconColor: 'text-phase-execute',
  },
  {
    id: 'security',
    title: 'Monitoramento de Segurança',
    description: 'Compliance, audit logs, anomalias detectadas, acessos suspeitos',
    frequency: 'Mensal',
    format: 'PDF',
    lastGenerated: '31/01/2025',
    icon: Shield,
    color: 'bg-aimana-blue/10',
    iconColor: 'text-aimana-blue',
  },
];

const businessReports = [
  {
    id: 'roi',
    title: 'ROI Consolidado',
    description: 'Retorno sobre investimento por área e por implementação de IA',
    frequency: 'Trimestral',
    format: 'PPT',
    lastGenerated: '15/01/2025',
    icon: TrendingUp,
    color: 'bg-status-success-bg',
    iconColor: 'text-status-success',
  },
  {
    id: 'hours-saved',
    title: 'Horas Economizadas',
    description: 'Impacto em produtividade por departamento, processos automatizados',
    frequency: 'Mensal',
    format: 'PDF',
    lastGenerated: '31/01/2025',
    icon: Timer,
    color: 'bg-aimana-teal/10',
    iconColor: 'text-aimana-teal',
  },
  {
    id: 'evolution',
    title: 'Evolução das Implementações',
    description: 'Progresso do programa de IA, novas implementações, pipeline, roadmap',
    frequency: 'Mensal',
    format: 'PDF',
    lastGenerated: '31/01/2025',
    icon: Layers,
    color: 'bg-phase-execute-bg',
    iconColor: 'text-phase-execute',
  },
  {
    id: 'maturity',
    title: 'Maturidade Digital',
    description: 'Score de maturidade, evolução por dimensão, comparação com mercado',
    frequency: 'Trimestral',
    format: 'PPT',
    lastGenerated: '15/01/2025',
    icon: Target,
    color: 'bg-phase-plan-bg',
    iconColor: 'text-phase-plan',
  },
  {
    id: 'executive',
    title: 'Relatório Executivo C-Level',
    description: 'Resumo para diretoria com KPIs principais, destaques e próximos passos',
    frequency: 'Mensal',
    format: 'PPT',
    lastGenerated: '31/01/2025',
    icon: BarChart3,
    color: 'bg-aimana-navy/10',
    iconColor: 'text-aimana-navy',
  },
  {
    id: 'adoption',
    title: 'Adoção & Engajamento',
    description: 'Taxa de adoção por área, NPS interno, feedback dos colaboradores',
    frequency: 'Mensal',
    format: 'PDF',
    lastGenerated: '31/01/2025',
    icon: Users,
    color: 'bg-aimana-blue/10',
    iconColor: 'text-aimana-blue',
  },
  {
    id: 'benchmark',
    title: 'Benchmark de Mercado',
    description: 'Comparação com empresas do mesmo setor e porte, tendências do mercado',
    frequency: 'Trimestral',
    format: 'PPT',
    lastGenerated: '15/01/2025',
    icon: LineChart,
    color: 'bg-status-warning-bg',
    iconColor: 'text-status-warning',
  },
];

const sprintReports = [
  {
    id: 'sprint-review',
    title: 'Sprint Review',
    description: 'O que foi entregue na sprint, demos, métricas de velocity e burndown',
    frequency: 'Quinzenal',
    format: 'PDF',
    lastGenerated: '07/02/2025',
    icon: CheckCircle2,
    color: 'bg-status-success-bg',
    iconColor: 'text-status-success',
  },
  {
    id: 'sprint-retro',
    title: 'Sprint Retrospective',
    description: 'Pontos positivos, melhorias identificadas, ações para próxima sprint',
    frequency: 'Quinzenal',
    format: 'PDF',
    lastGenerated: '07/02/2025',
    icon: ListChecks,
    color: 'bg-aimana-teal/10',
    iconColor: 'text-aimana-teal',
  },
  {
    id: 'backlog-health',
    title: 'Backlog Health',
    description: 'Status do backlog, velocity média, burndown chart, itens bloqueados',
    frequency: 'Semanal',
    format: 'Excel',
    lastGenerated: '07/02/2025',
    icon: GitBranch,
    color: 'bg-phase-execute-bg',
    iconColor: 'text-phase-execute',
  },
  {
    id: 'roadmap-progress',
    title: 'Progresso do Roadmap',
    description: 'Progresso vs. roadmap planejado, marcos alcançados, riscos identificados',
    frequency: 'Mensal',
    format: 'PPT',
    lastGenerated: '31/01/2025',
    icon: Target,
    color: 'bg-phase-plan-bg',
    iconColor: 'text-phase-plan',
  },
];

const recentReports = [
  { title: 'Status dos Agentes - Semana 06', date: '07/02/2025', format: 'PDF', status: 'ready' },
  { title: 'Incidentes - Semana 06', date: '07/02/2025', format: 'PDF', status: 'ready' },
  { title: 'Sprint Review - Sprint 12', date: '07/02/2025', format: 'PDF', status: 'ready' },
  { title: 'Custos Operacionais - Janeiro', date: '31/01/2025', format: 'Excel', status: 'ready' },
  { title: 'ROI Consolidado - Q4 2024', date: '15/01/2025', format: 'PPT', status: 'review' },
];

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function ReportCard({ report }: { report: typeof operationalReports[0] }) {
  const Icon = report.icon;
  return (
    <Card variant="interactive" className="h-full">
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0', report.color)}>
            <Icon className={cn('h-5 w-5', report.iconColor)} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text text-sm">{report.title}</h3>
            <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">{report.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {report.frequency}
          </span>
          <Badge variant="outline" size="sm">{report.format}</Badge>
          <span className="ml-auto">Último: {report.lastGenerated}</span>
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-surface-border">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <Button size="sm" className="flex-1">
            <Download className="h-4 w-4 mr-1" />
            Gerar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export function Reports() {
  const [activeTab, setActiveTab] = useState('operacionais');
  const [showAIModal, setShowAIModal] = useState(false);

  return (
    <div>
      <Header
        title="Relatórios"
        subtitle="Relatórios operacionais e de negócio para tomada de decisão"
      />

      <main className="p-6 space-y-6">
        {/* Hero Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {heroStats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-light">
                    <stat.icon className={cn('h-5 w-5', stat.color)} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text">{stat.value}</p>
                    <p className="text-xs text-text-secondary">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="operacionais" icon={<Activity className="h-4 w-4" />}>
                Operacionais
              </TabsTrigger>
              <TabsTrigger value="negocio" icon={<TrendingUp className="h-4 w-4" />}>
                Negócio
              </TabsTrigger>
              <TabsTrigger value="sprint" icon={<GitBranch className="h-4 w-4" />}>
                Sprint
              </TabsTrigger>
            </TabsList>

            <AIActionButton
              label="Gerar com IA"
              icon={<Sparkles className="h-4 w-4" />}
              onClick={() => setShowAIModal(true)}
            />
          </div>

          {/* ================================================================ */}
          {/* TAB 1: OPERACIONAIS */}
          {/* ================================================================ */}
          <TabsContent value="operacionais">
            <div className="grid gap-6 lg:grid-cols-3 mt-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Report Grid */}
                <div className="grid gap-4 md:grid-cols-2">
                  {operationalReports.map((report) => (
                    <ReportCard key={report.id} report={report} />
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Exportação Rápida */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Exportação Rápida</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Métricas de Hoje (CSV)
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Logs de Incidentes (JSON)
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Dashboard Completo (PDF)
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Custos por Agente (Excel)
                    </Button>
                  </CardContent>
                </Card>

                {/* Agendar Envio */}
                <Card className="bg-gradient-header text-white">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Agendar Envio
                    </h3>
                    <p className="text-sm text-white/80 mb-4">
                      Configure relatórios automáticos para serem enviados por email periodicamente.
                    </p>
                    <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                      Configurar Agendamento
                    </Button>
                  </CardContent>
                </Card>

                {/* Relatórios Recentes */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Recentes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {recentReports.map((report, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-surface-light">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <FileText className="h-4 w-4 text-text-muted flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-text truncate">{report.title}</p>
                            <p className="text-xs text-text-muted">{report.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {report.status === 'review' && (
                            <Badge variant="warning" size="sm">Revisão</Badge>
                          )}
                          <Button variant="ghost" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ================================================================ */}
          {/* TAB 2: NEGÓCIO */}
          {/* ================================================================ */}
          <TabsContent value="negocio">
            <div className="grid gap-6 lg:grid-cols-3 mt-6">
              <div className="lg:col-span-2 space-y-6">
                {/* KPIs Resumo */}
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="border-l-4 border-l-status-success">
                    <CardContent className="p-4">
                      <p className="text-sm text-text-muted">ROI Médio</p>
                      <p className="text-3xl font-bold text-status-success">3.2x</p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-status-success">
                        <ArrowUpRight className="h-3 w-3" />
                        <span>+0.4x vs. trimestre anterior</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-aimana-teal">
                    <CardContent className="p-4">
                      <p className="text-sm text-text-muted">Horas Economizadas</p>
                      <p className="text-3xl font-bold text-aimana-teal">1.240</p>
                      <p className="text-xs text-text-muted mt-1">Este trimestre</p>
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-aimana-blue">
                    <CardContent className="p-4">
                      <p className="text-sm text-text-muted">Score Maturidade</p>
                      <p className="text-3xl font-bold text-aimana-blue">3.4/5</p>
                      <Progress value={68} size="sm" className="mt-2" />
                    </CardContent>
                  </Card>
                </div>

                {/* Report Grid */}
                <div className="grid gap-4 md:grid-cols-2">
                  {businessReports.map((report) => (
                    <ReportCard key={report.id} report={report} />
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* ROI por Área */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">ROI por Área</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { area: 'Comercial', roi: '4.1x', progress: 82 },
                      { area: 'Customer Success', roi: '3.8x', progress: 76 },
                      { area: 'RH', roi: '2.9x', progress: 58 },
                      { area: 'Financeiro', roi: '2.5x', progress: 50 },
                      { area: 'TI', roi: '3.2x', progress: 64 },
                    ].map((item) => (
                      <div key={item.area}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-text-muted">{item.area}</span>
                          <span className="font-medium text-text">{item.roi}</span>
                        </div>
                        <Progress value={item.progress} size="sm" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Adoção por Departamento */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Adoção por Departamento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { dept: 'TI', adoption: 92, color: 'text-status-success' },
                      { dept: 'Comercial', adoption: 78, color: 'text-aimana-teal' },
                      { dept: 'Customer Success', adoption: 71, color: 'text-aimana-blue' },
                      { dept: 'RH', adoption: 54, color: 'text-status-warning' },
                      { dept: 'Financeiro', adoption: 43, color: 'text-status-warning' },
                    ].map((item) => (
                      <div key={item.dept} className="flex items-center justify-between">
                        <span className="text-sm text-text-muted">{item.dept}</span>
                        <span className={cn('text-sm font-medium', item.color)}>{item.adoption}%</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Próximos Marcos */}
                <Card className="border-aimana-teal/30 bg-gradient-to-br from-aimana-teal/5 to-transparent">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-text mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4 text-aimana-teal" />
                      Próximos Marcos
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-status-warning" />
                        <span className="text-text-secondary">Score maturidade 4.0 (Mar/2025)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-aimana-teal" />
                        <span className="text-text-secondary">10 agentes em produção (Abr/2025)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-aimana-blue" />
                        <span className="text-text-secondary">ROI 4x consolidado (Jun/2025)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ================================================================ */}
          {/* TAB 3: SPRINT */}
          {/* ================================================================ */}
          <TabsContent value="sprint">
            <div className="grid gap-6 lg:grid-cols-3 mt-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Sprint Atual Banner */}
                <Card className="border-l-4 border-l-phase-execute">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-text">Sprint 13 - Em andamento</h3>
                        <p className="text-sm text-text-muted mt-1">24/01/2025 a 07/02/2025 • 10 dias restantes</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-text">67%</p>
                        <p className="text-xs text-text-muted">Progresso</p>
                      </div>
                    </div>
                    <Progress value={67} size="sm" className="mt-3" />
                    <div className="grid grid-cols-4 gap-4 mt-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-status-success">8</p>
                        <p className="text-xs text-text-muted">Concluídos</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-status-info">4</p>
                        <p className="text-xs text-text-muted">Em Progresso</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-text-muted">3</p>
                        <p className="text-xs text-text-muted">Pendentes</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-status-error">1</p>
                        <p className="text-xs text-text-muted">Bloqueado</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sprint Reports */}
                <div className="grid gap-4 md:grid-cols-2">
                  {sprintReports.map((report) => (
                    <ReportCard key={report.id} report={report} />
                  ))}
                </div>

                {/* Velocity Chart (simulado) */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Velocity (Últimas 6 Sprints)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end gap-3 h-32">
                      {[
                        { sprint: 'S8', points: 18, max: 30 },
                        { sprint: 'S9', points: 22, max: 30 },
                        { sprint: 'S10', points: 25, max: 30 },
                        { sprint: 'S11', points: 21, max: 30 },
                        { sprint: 'S12', points: 28, max: 30 },
                        { sprint: 'S13', points: 15, max: 30 },
                      ].map((item) => (
                        <div key={item.sprint} className="flex-1 flex flex-col items-center">
                          <div className="w-full flex flex-col items-center">
                            <span className="text-xs font-medium text-text mb-1">{item.points}</span>
                            <div
                              className={cn(
                                'w-full rounded-t-lg transition-all',
                                item.sprint === 'S13' ? 'bg-aimana-teal/60' : 'bg-aimana-teal'
                              )}
                              style={{ height: `${(item.points / item.max) * 100}px` }}
                            />
                          </div>
                          <span className="text-xs text-text-muted mt-1">{item.sprint}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-border text-xs text-text-muted">
                      <span>Velocity média: <strong className="text-text">23 pts</strong></span>
                      <span>Sprint atual: <strong className="text-aimana-teal">15/28 pts</strong></span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Sprint Metrics */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Métricas da Sprint</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-muted">Story Points Planejados</span>
                      <span className="text-sm font-medium text-text">28</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-muted">Story Points Entregues</span>
                      <span className="text-sm font-medium text-status-success">15</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-muted">Bugs Encontrados</span>
                      <span className="text-sm font-medium text-status-warning">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-muted">Bugs Resolvidos</span>
                      <span className="text-sm font-medium text-status-success">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-muted">Satisfação do Time</span>
                      <span className="text-sm font-medium text-aimana-teal">4.2/5</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Roadmap Quick View */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Roadmap Q1 2025</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { milestone: 'MVP Agent Studio', status: 'done', date: 'Jan' },
                      { milestone: 'Integração SAP', status: 'progress', date: 'Fev' },
                      { milestone: 'Governança v2', status: 'progress', date: 'Fev' },
                      { milestone: 'Academy Gamificação', status: 'done', date: 'Jan' },
                      { milestone: 'Relatórios Avançados', status: 'planned', date: 'Mar' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={cn(
                          'h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0',
                          item.status === 'done' ? 'bg-status-success' :
                          item.status === 'progress' ? 'bg-status-warning' : 'bg-surface-light'
                        )}>
                          {item.status === 'done' ? (
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          ) : item.status === 'progress' ? (
                            <Clock className="h-3 w-3 text-white" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-text-muted" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            'text-sm',
                            item.status === 'done' ? 'text-text-muted line-through' : 'text-text'
                          )}>{item.milestone}</p>
                        </div>
                        <span className="text-xs text-text-muted">{item.date}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* AI Report Generator Modal */}
      <AIModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        title="Gerador de Relatórios IA"
        description="Crie relatórios personalizados com ajuda da IA"
        agentName="Report Generator"
        agentDescription="Especialista em análise de dados e geração de relatórios"
        initialMessage={`Olá! Posso gerar relatórios personalizados para você.

**Tipos disponíveis:**
- Operacionais (agentes, incidentes, custos, SLA)
- Negócio (ROI, horas economizadas, maturidade, adoção)
- Sprint (review, retro, backlog, roadmap)

**O que posso fazer:**
- Gerar relatórios sob demanda
- Cruzar dados de múltiplas fontes
- Criar análises comparativas entre períodos
- Projetar tendências e previsões

Qual relatório você precisa?`}
        suggestedPrompts={[
          'Relatório executivo desta semana',
          'Análise de ROI por área',
          'Comparar últimas 3 sprints',
          'Projeção de custos para próximo trimestre',
        ]}
      />
    </div>
  );
}
