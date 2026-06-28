"use client";

import React from 'react';
import { ShieldAlert, DollarSign, Server, Users, AlertOctagon, Sparkles } from 'lucide-react';
import { IncidentScenario } from '@/lib/mock-incidents';

interface MetricsPanelProps {
  incident: IncidentScenario;
}

export default function MetricsPanel({ incident }: MetricsPanelProps) {
  const getSeverityColor = (score: number) => {
    if (score >= 90) return 'text-rose-500 border-rose-500/30 bg-rose-500/10';
    if (score >= 75) return 'text-amber-400 border-amber-400/30 bg-amber-400/10';
    return 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 my-6">
      {/* Card 1: Severity Gauge */}
      <div className={`cyber-card p-4 rounded-xl border ${getSeverityColor(incident.severityScore)}`}>
        <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-1">
          <span>Incident Severity</span>
          <ShieldAlert className="w-4 h-4" />
        </div>
        <div className="text-2xl font-black tracking-tight flex items-baseline gap-1">
          <span>{incident.severityScore}</span>
          <span className="text-xs font-normal text-gray-500">/100</span>
        </div>
        <div className="mt-2 text-[10px] font-bold uppercase tracking-wider">
          Level: {incident.severity}
        </div>
      </div>

      {/* Card 2: Financial Damage */}
      <div className="cyber-card p-4 rounded-xl border border-[#222222] bg-[#0F0F0F]">
        <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-1">
          <span>Financial Damage</span>
          <DollarSign className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-lg font-black text-gray-100 truncate">
          {incident.metrics.financialImpact}
        </div>
        <div className="mt-2 text-[10px] text-gray-500 font-mono">
          Direct + Indirect Projection
        </div>
      </div>

      {/* Card 3: Systems Affected */}
      <div className="cyber-card p-4 rounded-xl border border-[#222222] bg-[#0F0F0F]">
        <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-1">
          <span>Systems Affected</span>
          <Server className="w-4 h-4 text-purple-400" />
        </div>
        <div className="text-2xl font-black text-purple-300">
          {incident.metrics.systemsAffected}
        </div>
        <div className="mt-2 text-[10px] text-gray-500 font-mono">
          Core Endpoints & SANs
        </div>
      </div>

      {/* Card 4: People Affected */}
      <div className="cyber-card p-4 rounded-xl border border-[#222222] bg-[#0F0F0F]">
        <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-1">
          <span>Blast Radius</span>
          <Users className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="text-xs font-bold text-gray-200 mt-1 line-clamp-2">
          {incident.metrics.peopleAffected}
        </div>
        <div className="mt-2 text-[10px] text-gray-500 font-mono">
          Users & Stakeholders
        </div>
      </div>

      {/* Card 5: Recovery Difficulty */}
      <div className="cyber-card p-4 rounded-xl border border-[#222222] bg-[#0F0F0F]">
        <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-1">
          <span>Recovery Difficulty</span>
          <AlertOctagon className="w-4 h-4 text-amber-400" />
        </div>
        <div className="text-sm font-bold text-amber-300 mt-1">
          {incident.metrics.recoveryDifficulty}
        </div>
        <div className="mt-2 text-[10px] text-gray-500 font-mono">
          Resource Intensity
        </div>
      </div>

      {/* Card 6: Prediction Confidence */}
      <div className="cyber-card p-4 rounded-xl border border-[#222222] bg-[#0F0F0F]">
        <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-1">
          <span>AI Confidence</span>
          <Sparkles className="w-4 h-4 text-[#00E5FF]" />
        </div>
        <div className="text-2xl font-black text-[#00E5FF]">
          {incident.metrics.predictionConfidence}%
        </div>
        <div className="mt-2 text-[10px] text-gray-500 font-mono">
          Model Consensus Score
        </div>
      </div>
    </div>
  );
}
