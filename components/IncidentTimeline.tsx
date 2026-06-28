"use client";

import React from 'react';
import { Clock, AlertTriangle, CheckCircle2, Info, ShieldAlert } from 'lucide-react';

interface TimelineEvent {
  time: string;
  event: string;
  status: 'critical' | 'warning' | 'info' | 'resolved';
  source: string;
}

interface IncidentTimelineProps {
  timeline: TimelineEvent[];
}

export default function IncidentTimeline({ timeline }: IncidentTimelineProps) {
  const getEventIcon = (status: string) => {
    switch (status) {
      case 'critical': return <ShieldAlert className="w-4 h-4 text-rose-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'resolved': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      default: return <Info className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getEventBadge = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'warning': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'resolved': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      default: return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    }
  };

  return (
    <div className="cyber-card p-6 rounded-xl border border-[#222222] bg-[#0A0A0A]">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#1E1E1E]">
        <h3 className="font-bold text-base text-gray-100 flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#00E5FF]" />
          Chronological Reconstruction Map
        </h3>
        <span className="text-xs font-mono text-gray-400">{timeline.length} VERIFIED TIME-NODES</span>
      </div>

      <div className="relative pl-6 border-l-2 border-[#222222] space-y-6">
        {timeline.map((item, index) => (
          <div key={index} className="relative group">
            {/* Timeline dot */}
            <div className="absolute -left-[31px] top-0.5 p-1 rounded-full bg-[#141414] border border-[#333] group-hover:border-[#00E5FF] transition-colors">
              {getEventIcon(item.status)}
            </div>

            <div className="cyber-card p-4 rounded-xl border border-[#1E1E1E] bg-[#111111] hover:border-gray-700 transition-all">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-0.5 rounded border border-[#00E5FF]/20">
                  {item.time}
                </span>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${getEventBadge(item.status)}`}>
                  {item.status}
                </span>
              </div>

              <p className="text-sm text-gray-200 font-medium mb-2 leading-relaxed">
                {item.event}
              </p>

              <div className="text-[11px] font-mono text-gray-500 flex items-center gap-1">
                <span>Telemetry Source:</span>
                <span className="text-gray-300 font-semibold">{item.source}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
