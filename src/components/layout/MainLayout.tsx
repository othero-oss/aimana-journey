/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Main Layout Component
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-navy-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="ml-[280px]">
        <Outlet />
      </div>
    </div>
  );
}
