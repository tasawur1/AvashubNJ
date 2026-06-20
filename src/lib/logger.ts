import { createAdminClient } from './supabase-server';

interface LogEntry {
  route: string;
  method?: string;
  duration_ms?: number;
  status_code?: number;
  success: boolean;
  error_message?: string;
  metadata?: Record<string, unknown>;
}

// Fire-and-forget — never await this. Writes to request_logs without blocking the response.
export function logRequest(entry: LogEntry): void {
  createAdminClient()
    .from('request_logs')
    .insert({
      route: entry.route,
      method: entry.method ?? 'POST',
      duration_ms: entry.duration_ms ?? null,
      status_code: entry.status_code ?? null,
      success: entry.success,
      error_message: entry.error_message ?? null,
      metadata: entry.metadata ?? {},
    })
    .then(({ error }) => {
      if (error) console.warn('[LOGGER] Failed to write log:', error.message);
    });
}
