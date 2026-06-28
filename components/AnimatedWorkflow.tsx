"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Cpu, Zap, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';

interface AnimatedWorkflowProps {
  activeAgentId?: string;
  stage?: string;
}

export default function AnimatedWorkflow({ activeAgentId, stage }: AnimatedWorkflowProps) {
  const workflowNodes = [
    { id: 'upload', title: 'Incident Artifacts', icon: <Upload className="w-4 h-4 text-cyan-400" />, type: 'input' },
    { id: 'evidence', title: 'Evidence Agent', icon: <FileText className="w-4 h-4 text-emerald-400" />, type: 'agent' },
    { id: 'timeline', title: 'Timeline Agent', icon: <Cpu className="w-4 h-4 text-blue-400" />, type: 'agent' },
    { id: 'rootCause', title: 'Root Cause Agent', icon: <AlertTriangle className="w-4 h-4 text-amber-400" />, type: 'agent' },
    { id: 'impact', title: 'Impact Agent', icon: <Zap className="w-4 h-4 text-rose-400" />, type: 'agent' },
    { id: 'recovery', title: 'Recovery Agent', icon: <CheckCircle2 className="w-4 h-4 text-purple-400" />, type: 'agent' },
    { id: 'prediction', title: 'Prediction Agent', icon: <Cpu className="w-4 h-4 text-pink-400" />, type: 'agent' },
    { id: 'synthesizer', title: 'Master Synthesizer', icon: <Zap className="w-4 h-4 text-[#00E5FF]" />, type: 'synthesizer' },
    { id: 'report', title: 'Incident Forensics', icon: <FileText className="w-4 h-4 text-emerald-400" />, type: 'output' }
  ];

  return (
    <div className="cyber-card p-6 rounded-xl border border-[#222222] bg-[#080808] relative overflow-hidden my-6">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1E1E1E]">
        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
          ASI:ONE Orchestration Workflow Topology
        </h4>
        <span className="text-[11px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-2.5 py-0.5 rounded-full border border-[#00E5FF]/20">
          PARALLEL STREAM ACTIVE
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 py-4 overflow-x-auto">
        {workflowNodes.map((node, index) => {
          const isSynthesizer = node.id === 'synthesizer';
          const isReport = node.id === 'report';
          const isActive = stage === 'processing' || stage === 'synthesizing' || stage === 'completed';

          return (
            <React.Fragment key={node.id}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0.8 }}
                animate={{ 
                  scale: isSynthesizer && stage === 'synthesizing' ? [1, 1.1, 1] : 1, 
                  opacity: 1 
                }}
                transition={{ repeat: isSynthesizer && stage === 'synthesizing' ? Infinity : 0, duration: 1.5 }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-mono transition-all duration-300 ${
                  isSynthesizer
                    ? 'bg-[#00E5FF]/10 border-[#00E5FF] text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.3)] font-bold'
                    : isReport
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 font-bold'
                    : 'bg-[#121212] border-[#262626] text-gray-300 hover:border-gray-600'
                }`}
              >
                <div className="p-1 rounded bg-[#1A1A1A] border border-[#2A2A2A]">
                  {node.icon}
                </div>
                <span className="whitespace-nowrap">{node.title}</span>
              </motion.div>

              {index < workflowNodes.length - 1 && (
                <div className="text-gray-600 shrink-0 hidden md:block">
                  <ArrowRight className="w-3.5 h-3.5 text-[#00E5FF]/60 animate-pulse" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
