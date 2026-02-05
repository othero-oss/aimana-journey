/**
 * ═══════════════════════════════════════════════════════════════════════════
 * AIMANA JOURNEY - Type Definitions
 * ═══════════════════════════════════════════════════════════════════════════
 */

// Chat message type for agent conversations
export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

// Generic status types
export type Status = 'pending' | 'in_progress' | 'completed' | 'error';

// Health status
export type HealthStatus = 'healthy' | 'warning' | 'critical';

// Phase types
export type Phase = 'Planejar' | 'Executar' | 'Gerir';
