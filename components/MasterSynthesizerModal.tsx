"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import { AgentProgressState } from '@/lib/mock-agents';

interface MasterSynthesizerModalProps {
  isOpen: boolean;
  synthesizerState: AgentProgressState;
  onViewReport: () => void;
}

export default function MasterSynthesizerModal({ isOpen, synthesizerState, onViewReport }: MasterSynthesizerModalProps) {
  if (!isOpen) return null;

  const isComplete = synthesizerState.status === 'Complete';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="cyber-card max-w-lg w-full p-8 rounded-2xl border-2 border-[#00E5FF] bg-[#0A0A0A] text-center shadow-[0_0_50px_rgba(0,229,255,0.3)] relative overflow-hidden"
        >
          {/* Background Scanner Ray */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent animate-scan-beam" />

          {/* Core Visualizer Spinning Ring */}
          <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
            <div className={`absolute inset-0 rounded-full border-4 border-t-[#00E5FF] border-r-transparent border-b-purple-500 border-l-transparent ${isComplete ? '' : 'animate-spin'}`} />
            <div className="w-20 h-20 rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-3xl shadow-inner">
              {isComplete ? '🛡️' : '⚡'}
            </div>
          </div>

          <span className="text-[11px] font-mono uppercase tracking-widest text-[#00E5FF] px-3 py-1 bg-[#00E5FF]/10 rounded-full border border-[#00E5FF]/30 inline-block mb-3">
            {isComplete ? 'MASTER SYNTHESIS COMPLETE' : 'MASTER SYNTHESIZER ACTIVATED'}
          </span>

          <h3 className="text-2xl font-black text-gray-100 mb-2">
            {isComplete ? 'Interactive Incident Forensics Ready' : 'Synthesizing Multi-Agent Knowledge Graph'}
          </h3>

          <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
            {isComplete
              ? 'All 6 autonomous investigation streams have successfully converged. Executive report unlocked.'
              : 'Fusing timeline correlation vectors, root cause evidence graph, and predictive financial models...'}
          </p>

          {/* Status Telemetry */}
          <div className="bg-[#141414] border border-[#222] p-3 rounded-xl mb-6 font-mono text-xs text-left space-y-2">
            <div className="flex justify-between text-gray-400">
              <span>Model Consensus Confidence:</span>
              <span className="text-[#00E5FF] font-bold">{synthesizerState.confidence}%</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Total Tokens Processed:</span>
              <span className="text-purple-400 font-bold">{synthesizerState.tokensProcessed.toLocaleString()}</span>
            </div>
            {synthesizerState.logs.length > 0 && (
              <div className="pt-2 border-t border-[#222] text-[10px] text-emerald-400 truncate">
                &gt; {synthesizerState.logs[synthesizerState.logs.length - 1].message}
              </div>
            )}
          </div>

          {/* Unlock Button */}
          {isComplete && (
            <button
              onClick={onViewReport}
              className="w-full py-4 bg-[#00E5FF] text-black font-black text-sm rounded-xl hover:bg-cyan-300 transition-all shadow-[0_0_25px_rgba(0,229,255,0.5)] flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
            >
              <span>View Interactive Crisis Report</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
