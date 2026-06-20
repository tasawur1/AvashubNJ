"use client";

import { Fragment, useState } from "react";

type LogEntry = {
  id: string;
  created_at: string;
  route: string;
  method: string;
  duration_ms: number | null;
  status_code: number | null;
  success: boolean;
  error_message: string | null;
  metadata: Record<string, unknown> | null;
};

type Stats = {
  total: number;
  errors: number;
  avgDuration: number;
  maxDuration: number;
};

type UptimeMonitor = {
  id: number;
  name: string;
  url: string;
  status: "up" | "down" | "degraded" | "unknown";
  uptimeRatio: string | null;
  lastResponseMs: number | null;
};

const RANGES = [
  { label: "1 Hour",   value: "1h"  },
  { label: "24 Hours", value: "24h" },
  { label: "7 Days",   value: "7d"  },
  { label: "30 Days",  value: "30d" },
  { label: "All Time", value: "all" },
];

function relativeTime(iso: string): string {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60)           return `${s}s ago`;
  if (s < 3_600)        return `${Math.floor(s / 60)}m ago`;
  if (s < 86_400)       return `${Math.floor(s / 3_600)}h ago`;
  return `${Math.floor(s / 86_400)}d ago`;
}

function DurationBadge({ ms }: { ms: number | null }) {
  if (ms === null) return <span className="text-brand-navy/25">—</span>;
  const cls =
    ms < 500   ? "text-green-600" :
    ms < 2_000 ? "text-yellow-600" :
    ms < 5_000 ? "text-orange-500" :
                 "text-red-600";
  return <span className={`font-mono text-xs font-semibold ${cls}`}>{ms}ms</span>;
}

const STATUS_COLOR = {
  up:       { dot: "bg-green-500",  text: "text-green-700",  bg: "bg-green-50",  border: "border-green-200", label: "Online"   },
  down:     { dot: "bg-red-500",    text: "text-red-700",    bg: "bg-red-50",    border: "border-red-200",   label: "Down"     },
  degraded: { dot: "bg-yellow-500", text: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200",label: "Degraded" },
  unknown:  { dot: "bg-gray-400",   text: "text-gray-600",   bg: "bg-gray-50",   border: "border-gray-200",  label: "Unknown"  },
};

export function LogsViewer() {
  const [range,        setRange       ] = useState("24h");
  const [statusFilter, setStatusFilter] = useState("all");
  const [logs,         setLogs        ] = useState<LogEntry[] | null>(null);
  const [stats,        setStats       ] = useState<Stats | null>(null);
  const [loading,      setLoading     ] = useState(false);
  const [fetchError,   setFetchError  ] = useState<string | null>(null);
  const [expanded,     setExpanded    ] = useState<string | null>(null);
  const [copied,       setCopied      ] = useState(false);

  // Uptime state — only populated when user clicks "Check Status"
  const [uptime,        setUptime       ] = useState<{ monitors: UptimeMonitor[]; checkedAt: string } | null>(null);
  const [uptimeLoading, setUptimeLoading] = useState(false);
  const [uptimeError,   setUptimeError  ] = useState<string | null>(null);

  async function checkStatus() {
    setUptimeLoading(true);
    setUptimeError(null);
    try {
      const res  = await fetch("/api/admin/uptime");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `Error ${res.status}`);
      setUptime(data);
    } catch (err) {
      setUptimeError(String(err).replace(/^Error:\s*/, ""));
    } finally {
      setUptimeLoading(false);
    }
  }

  async function loadLogs() {
    setLoading(true);
    setFetchError(null);
    setLogs(null);
    setStats(null);
    try {
      const res = await fetch(`/api/admin/logs?range=${range}&status=${statusFilter}`);
      let data: { logs?: LogEntry[]; stats?: Stats; error?: string };
      try {
        data = await res.json();
      } catch {
        throw new Error("Server returned an unreadable response. Check that the app is running.");
      }
      if (!res.ok) throw new Error(data.error ?? `Server error (${res.status})`);
      setLogs(data.logs ?? []);
      setStats(data.stats ?? { total: 0, errors: 0, avgDuration: 0, maxDuration: 0 });
    } catch (err) {
      const msg = String(err);
      // "Failed to fetch" is a browser network error — make it readable
      setFetchError(
        msg.includes("Failed to fetch")
          ? "Could not reach the server. Make sure the app is deployed and try again."
          : msg.replace(/^Error:\s*/, "")
      );
    } finally {
      setLoading(false);
    }
  }

  function copyLogs() {
    if (!logs) return;
    navigator.clipboard.writeText(JSON.stringify(logs, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-5">

      {/* ── Site Status ── */}
      <div className="rounded-2xl border border-brand-purple-deep/10 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-brand-navy/30">Site Status</p>
            <p className="mt-0.5 text-xs text-brand-navy/40">Press check to fetch live status from UptimeRobot.</p>
          </div>
          <div className="flex items-center gap-2.5">
            {uptime && (
              <a
                href="https://stats.uptimerobot.com/7Wmm3BM7mP"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-brand-purple-deep/60 hover:text-brand-purple-deep underline underline-offset-2"
              >
                View Full Status →
              </a>
            )}
            <button
              onClick={checkStatus}
              disabled={uptimeLoading}
              className="flex items-center gap-2 rounded-xl border border-brand-purple-deep/20 bg-brand-lavender/40 px-3.5 py-2 text-xs font-semibold text-brand-navy/70 transition hover:bg-brand-lavender disabled:opacity-50"
            >
              {uptimeLoading ? (
                <>
                  <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
                  </svg>
                  Checking…
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Check Status
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {uptimeError && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{uptimeError}</p>
        )}

        {/* Monitor cards */}
        {uptime && uptime.monitors.length > 0 && (
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {uptime.monitors.map((m) => {
              const s = STATUS_COLOR[m.status];
              return (
                <div key={m.id} className={`flex items-start gap-3 rounded-xl border ${s.border} ${s.bg} px-3.5 py-3`}>
                  <span className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${s.dot} ring-2 ring-white`} aria-hidden />
                  <div className="min-w-0">
                    <p className={`text-xs font-extrabold ${s.text}`}>{s.label}</p>
                    <p className="truncate text-[11px] text-brand-navy/50">{m.name}</p>
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-brand-navy/40">
                      {m.uptimeRatio && <span>Uptime: <strong className="text-brand-navy/60">{m.uptimeRatio}%</strong></span>}
                      {m.lastResponseMs && <span>Response: <strong className="text-brand-navy/60">{m.lastResponseMs}ms</strong></span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Last checked */}
        {uptime && (
          <p className="mt-3 text-[11px] text-brand-navy/25">
            Last checked: {new Date(uptime.checkedAt).toLocaleTimeString()}
          </p>
        )}
      </div>

      {/* ── Controls ── */}
      <div className="flex flex-wrap items-center gap-3">

        {/* Time range */}
        <div className="flex overflow-hidden rounded-xl border border-brand-purple-deep/15 bg-white">
          {RANGES.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={
                "px-3 py-2 text-xs font-semibold transition-colors " +
                (range === r.value
                  ? "bg-brand-purple-deep text-white"
                  : "text-brand-navy/55 hover:bg-brand-lavender hover:text-brand-navy")
              }
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Status filter */}
        <div className="flex overflow-hidden rounded-xl border border-brand-purple-deep/15 bg-white">
          {[
            { label: "All",         value: "all"    },
            { label: "Errors Only", value: "errors" },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={
                "px-3 py-2 text-xs font-semibold transition-colors " +
                (statusFilter === f.value
                  ? "bg-brand-purple-deep text-white"
                  : "text-brand-navy/55 hover:bg-brand-lavender hover:text-brand-navy")
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Load */}
        <button
          onClick={loadLogs}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-brand-purple-deep px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? (
            <>
              <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
              </svg>
              Loading…
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M21 12a9 9 0 1 1-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M21 3v6h-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Load Logs
            </>
          )}
        </button>

        {/* Copy */}
        {logs && logs.length > 0 && (
          <button
            onClick={copyLogs}
            className="flex items-center gap-2 rounded-xl border border-brand-purple-deep/20 bg-white px-4 py-2 text-xs font-semibold text-brand-navy/65 transition hover:bg-brand-lavender"
          >
            {copied ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2" />
                </svg>
                Copy JSON
              </>
            )}
          </button>
        )}
      </div>

      {/* ── Stats ── */}
      {stats && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              label: "Total Requests",
              value: stats.total,
              color: "text-brand-navy",
            },
            {
              label: "Errors",
              value: stats.errors,
              color: stats.errors > 0 ? "text-red-500" : "text-green-600",
            },
            {
              label: "Avg Duration",
              value: `${stats.avgDuration}ms`,
              color:
                stats.avgDuration > 5_000 ? "text-red-500" :
                stats.avgDuration > 2_000 ? "text-orange-500" :
                "text-brand-navy",
            },
            {
              label: "Slowest Request",
              value: `${stats.maxDuration}ms`,
              color:
                stats.maxDuration > 5_000 ? "text-red-500" :
                stats.maxDuration > 2_000 ? "text-orange-500" :
                "text-brand-navy",
            },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-brand-purple-deep/10 bg-white p-4">
              <p className="text-[11px] font-extrabold uppercase tracking-widest text-brand-navy/30">
                {s.label}
              </p>
              <p className={`mt-1.5 text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Fetch error ── */}
      {fetchError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {fetchError}
        </div>
      )}

      {/* ── Empty state (before first load) ── */}
      {!logs && !loading && !fetchError && (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-purple-deep/12 bg-white py-20 text-center">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" className="mb-3 text-brand-purple-deep/25" aria-hidden>
            <path d="M3 12h4l3 8 4-16 3 8h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-sm font-semibold text-brand-navy/35">No logs loaded yet</p>
          <p className="mt-1 text-xs text-brand-navy/25">
            Select a time range and press <strong>Load Logs</strong>
          </p>
        </div>
      )}

      {/* ── No results after load ── */}
      {logs && logs.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-brand-purple-deep/10 bg-white py-14 text-center">
          {statusFilter === "errors" ? (
            <>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="mb-3 text-green-500/60" aria-hidden>
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-sm font-semibold text-brand-navy/50">No errors found</p>
              <p className="mt-1 text-xs text-brand-navy/30">Everything looks clean in this time range.</p>
            </>
          ) : (
            <p className="text-sm text-brand-navy/40">No logs found for this time range.</p>
          )}
        </div>
      )}

      {/* ── Logs table ── */}
      {logs && logs.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-brand-purple-deep/10 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-brand-purple-deep/8 bg-brand-lavender/50">
                  {["Time", "Route", "Duration", "Status", "Code", ""].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-widest text-brand-navy/35"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-purple-deep/5">
                {logs.map((log) => (
                  <Fragment key={log.id}>
                    <tr className={!log.success ? "bg-red-50/70" : "hover:bg-brand-lavender/15"}>
                      <td className="whitespace-nowrap px-4 py-3 text-xs text-brand-navy/40">
                        {relativeTime(log.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-brand-navy/75">{log.route}</span>
                      </td>
                      <td className="px-4 py-3">
                        <DurationBadge ms={log.duration_ms} />
                      </td>
                      <td className="px-4 py-3">
                        {log.success ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-semibold text-green-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
                            OK
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-[11px] font-semibold text-red-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden />
                            Error
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-brand-navy/40">
                        {log.status_code ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setExpanded(expanded === log.id ? null : log.id)}
                          className="text-xs font-semibold text-brand-purple-deep/50 hover:text-brand-purple-deep"
                        >
                          {expanded === log.id ? "Hide" : "Details"}
                        </button>
                      </td>
                    </tr>

                    {expanded === log.id && (
                      <tr className="bg-brand-lavender/20">
                        <td colSpan={6} className="px-4 py-3">
                          <div className="space-y-2 text-xs">
                            {log.error_message && (
                              <p className="rounded-lg bg-red-50 px-3 py-2 font-mono text-red-600 break-all">
                                {log.error_message}
                              </p>
                            )}
                            <pre className="overflow-x-auto rounded-lg bg-brand-navy/5 px-3 py-2 font-mono text-[11px] text-brand-navy/55 leading-relaxed">
                              {JSON.stringify(
                                {
                                  method: log.method,
                                  status_code: log.status_code,
                                  timestamp: log.created_at,
                                  metadata: log.metadata,
                                },
                                null,
                                2
                              )}
                            </pre>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-brand-purple-deep/8 px-4 py-2.5 text-xs text-brand-navy/30">
            Showing {logs.length} {logs.length === 500 ? "(capped at 500)" : "entries"}
          </div>
        </div>
      )}
    </div>
  );
}
