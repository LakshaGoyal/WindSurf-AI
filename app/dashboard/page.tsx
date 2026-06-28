"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useIncident } from '@/lib/incident-context';
import MetricsPanel from '@/components/MetricsPanel';
import AnimatedWorkflow from '@/components/AnimatedWorkflow';
import AgentCard from '@/components/AgentCard';
import TerminalLogs from '@/components/TerminalLogs';
import MasterSynthesizerModal from '@/components/MasterSynthesizerModal';
import { Terminal, ShieldAlert, ArrowLeft, RefreshCw, FileText, Play } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { state, activeScenario, runFullAnalysis, reset } = useIncident();

  useEffect(() => {
    // If user lands directly on dashboard without starting analysis, auto-trigger
    if (state.stage === 'idle') {
      runFullAnalysis();
    }
  }, [state.stage]);

  const handleViewReport = () => {
    router.push('/incident');
  };

  const handleRestart = () => {
    reset();
    runFullAnalysis();
  };

  const isSynthesizerActive = state.stage === 'synthesizing' || (state.stage === 'completed' && state.reportData !== null);

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans p-6 relative overflow-x-hidden">
      {/* Navigation Header */}
      <header className="flex items-center justify-between pb-6 border-b border-[#1E1E1E] mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/')}
            className="p-2 rounded-xl bg-[#121212] border border-[#262626] text-gray-400 hover:text-white hover:border-[#00E5FF] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-wider text-white">MISSION CONTROL</span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#00E5FF]/10 text-[#00E5FF] rounded border border-[#00E5FF]/30 font-bold animate-pulse">
                {state.stage.toUpperCase()}
              </span>
            </div>
            <p className="text-xs font-mono text-gray-400">Target: <strong className="text-gray-200">{activeScenario.title}</strong></p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRestart}
            className="px-4 py-2 bg-[#141414] text-gray-300 hover:text-white rounded-xl border border-[#2A2A2A] hover:border-gray-500 text-xs font-mono transition-all flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Re-Run Telemetry</span>
          </button>

          {state.stage === 'completed' && (
            <button
              onClick={handleViewReport}
              className="px-5 py-2 bg-[#00E5FF] text-black font-extrabold text-xs rounded-xl hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center gap-2 uppercase tracking-wider cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Open Forensic Report</span>
            </button>
          )}
        </div>
      </header>

      {/* Top Incident Metrics Panel */}
      <MetricsPanel incident={activeScenario} />

      {/* Workflow Topology Bar */}
      <AnimatedWorkflow activeAgentId="" stage={state.stage} />

      {/* Main Grid: Agent Cards & Live Console */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
        {/* Left Column: 6 Autonomous Agent Cards (2-col grid inside 2-col lg span) */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(state.agentStates).map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

        {/* Right Column: Live Terminal Telemetry Console */}
        <div className="lg:col-span-1 space-y-4">
          <TerminalLogs logs={state.globalLogs} maxHeight="580px" />
        </div>
      </div>

      {/* Master Synthesizer Overlay Sequence Modal */}
      <MasterSynthesizerModal
        isOpen={state.stage === 'synthesizing' || state.stage === 'completed'}
        synthesizerState={state.synthesizerState}
        onViewReport={handleViewReport}
      />
    </div>
  );
}
