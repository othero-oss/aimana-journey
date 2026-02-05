/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Main Application
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout';
import {
  Dashboard,
  PlanningOverview,
  MaturityDiagnostic,
  Opportunities,
  AIStrategy,
  DataReadiness,
  Governance,
  ExecutionOverview,
  AISandbox,
  AgentStudio,
  AgentFactory,
  ManagementOverview,
  Portfolio,
  HealthCheck,
  ROITracker,
  ExecutiveReports,
  IdeasHub,
  ImplementationHub,
  ConnectorsHub,
  // Academy
  AcademyOverview,
  AcademyTracks,
  AILeaders,
  AIChampions,
  AICoders,
  AITutor,
  Certifications,
} from './pages';

// Placeholder component for pages not yet implemented
function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex h-[calc(100vh-64px)] items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text">{title}</h2>
        <p className="mt-2 text-text-secondary">Em desenvolvimento...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Planning Zone */}
          <Route path="/planning" element={<PlanningOverview />} />
          <Route path="/planning/strategy" element={<AIStrategy />} />
          <Route path="/planning/maturity" element={<MaturityDiagnostic />} />
          <Route path="/planning/opportunities" element={<Opportunities />} />
          <Route path="/planning/ideas" element={<IdeasHub />} />
          <Route path="/planning/data-readiness" element={<DataReadiness />} />
          <Route path="/planning/governance" element={<Governance />} />

          {/* Execution Zone */}
          <Route path="/execution" element={<ExecutionOverview />} />
          <Route path="/execution/agent-studio" element={<AgentStudio />} />
          <Route path="/execution/sandbox" element={<AISandbox />} />
          <Route path="/execution/agent-factory" element={<AgentFactory />} />
          <Route path="/execution/implementation" element={<ImplementationHub />} />

          {/* Management Zone */}
          <Route path="/management" element={<ManagementOverview />} />
          <Route path="/management/portfolio" element={<Portfolio />} />
          <Route path="/management/health" element={<HealthCheck />} />
          <Route path="/management/roi" element={<ROITracker />} />
          <Route path="/management/reports" element={<ExecutiveReports />} />

          {/* Academy Zone */}
          <Route path="/academy" element={<AcademyOverview />} />
          <Route path="/academy/tracks" element={<AcademyTracks />} />
          <Route path="/academy/leaders" element={<AILeaders />} />
          <Route path="/academy/champions" element={<AIChampions />} />
          <Route path="/academy/coders" element={<AICoders />} />
          <Route path="/academy/tutor" element={<AITutor />} />
          <Route path="/academy/certifications" element={<Certifications />} />

          {/* Connectors */}
          <Route path="/connectors" element={<ConnectorsHub />} />

          {/* Settings */}
          <Route path="/settings" element={<ComingSoon title="Configurações" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
