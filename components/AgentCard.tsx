"use client";

import React, { useState } from 'react';
import { AgentProgressState } from '@/lib/mock-agents';
import { Activity, Cpu, CheckCircle2, ChevronDown, ChevronUp, Layers, Flame } from 'lucide-react';

interface AgentCardProps {
  agent: AgentProgressState;
  isActive?: boolean;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Generating Report':
      case 'Reasoning':
        return 'bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30';
      case 'Cross Referencing':
      case 'Analyzing':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  };

  const isComplete = agent.status === 'Complete';

  return (
    <div className={`cyber-card p-5 rounded-xl border transition-all duration-300 ${isComplete ? 'border-emerald-500/30 bg-[#0A0D0B]' : 'border-[#222222] bg-[#0F0F0F]'}`}>
      {/* Top Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl p-2.5 rounded-xl bg-[#161616] border border-[#262626] shadow-inner relative">
            {agent.avatar}
            {!isComplete && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-ping" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-base text-gray-100 flex items-center gap-2">
              {agent.name}
              {isComplete && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">{agent.role}</p>
          </div>
        </div>

        <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-full border uppercase tracking-wider ${getStatusColor(agent.status)}`}>
          {agent.status}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-[#141414] rounded-lg border border-[#222222] mb-4 text-xs font-mono">
        <div>
          <span className="text-gray-500 block text-[10px] uppercase">Confidence</span>
          <span className="text-[#00E5FF] font-bold text-sm flex items-center gap-1">
            <Flame className="w-3 h-3 text-[#00E5FF]" />
            {agent.confidence}%
          </span>
        </div>
        <div>
          <span className="text-gray-500 block text-[10px] uppercase">Tokens</span>
          <span className="text-gray-200 font-bold text-sm flex items-center gap-1">
            <Cpu className="w-3 h-3 text-purple-400" />
            {agent.tokensProcessed.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-gray-500 block text-[10px] uppercase">{agent.itemsFoundLabel}</span>
          <span className="text-emerald-400 font-bold text-sm flex items-center gap-1">
            <Layers className="w-3 h-3 text-emerald-400" />
            {agent.itemsFoundCount}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5 mb-3">
        <div className="flex justify-between text-[11px] text-gray-400 font-mono">
          <span className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-cyan-400 animate-spin" />
            Telemetry Status
          </span>
          <span>{agent.estimatedTimeRemaining}</span>
        </div>
        <div className="h-1.5 w-full bg-[#1A1A1A] rounded-full overflow-hidden border border-[#2A2A2A]">
          <div 
            className={`h-full transition-all duration-500 rounded-full ${isComplete ? 'bg-emerald-400 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-gradient-to-r from-cyan-500 to-[#00E5FF] shadow-[0_0_8px_rgba(0,229,255,0.6)]'}`}
            style={{ width: `${agent.confidence}%` }}
          />
        </div>
      </div>

      {/* Latest Log Snippet */}
      {agent.logs.length > 0 && (
        <div className="mt-3 pt-3 border-t border-[#222222] font-mono text-[11px]">
          <div 
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between text-gray-400 hover:text-gray-200 cursor-pointer select-none"
          >
            <span className="truncate pr-2 text-cyan-300">
              &gt; {agent.logs[agent.logs.length - 1].message}
            </span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 shrink-0" />}
          </div>

          {expanded && (
            <div className="mt-2 space-y-1 max-h-32 overflow-y-auto pr-1 text-gray-400 bg-[#080808] p-2 rounded border border-[#1E1E1E]">
              {agent.logs.map((log, idx) => (
                <div key={idx} className="text-[10px] leading-tight">
                  <span className="text-gray-600">[{log.timestamp}]</span> {log.message}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
