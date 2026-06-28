"use client";

import React, { useEffect, useRef } from 'react';
import { Terminal, ShieldAlert, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

interface TerminalLogItem {
  id: string;
  timestamp: string;
  agentName: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

interface TerminalLogsProps {
  logs: TerminalLogItem[];
  title?: string;
  maxHeight?: string;
}

export default function TerminalLogs({ logs, title = "SYSTEM TELEMETRY CONSOLE", maxHeight = "280px" }: TerminalLogsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline shrink-0 mr-1.5" />;
      case 'warning': return <AlertTriangle className="w-3.5 h-3.5 text-amber-400 inline shrink-0 mr-1.5" />;
      case 'error': return <ShieldAlert className="w-3.5 h-3.5 text-rose-500 inline shrink-0 mr-1.5" />;
      default: return <Info className="w-3.5 h-3.5 text-cyan-400 inline shrink-0 mr-1.5" />;
    }
  };

  return (
    <div className="cyber-card p-4 rounded-xl border border-[#222222] bg-[#0A0A0A] font-mono text-xs shadow-2xl relative overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#222222]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#00E5FF] animate-pulse" />
          <span className="text-gray-300 font-bold tracking-wider uppercase text-[11px]">{title}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-emerald-400 font-semibold uppercase">LIVE FEED</span>
        </div>
      </div>

      {/* Console Stream */}
      <div 
        ref={scrollRef}
        className="space-y-2 overflow-y-auto pr-1 text-gray-300 select-text"
        style={{ maxHeight }}
      >
        {logs.length === 0 ? (
          <div className="text-gray-600 italic py-4 text-center">
            &gt; Waiting for mission control kernel dispatch...
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2 leading-relaxed hover:bg-[#111111] p-1 rounded transition-colors">
              <span className="text-gray-500 shrink-0 select-none">[{log.timestamp}]</span>
              <span className="text-[#00E5FF] font-semibold shrink-0">[{log.agentName}]:</span>
              <div className="flex items-center text-gray-200">
                {getTypeIcon(log.type)}
                <span>{log.message}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
