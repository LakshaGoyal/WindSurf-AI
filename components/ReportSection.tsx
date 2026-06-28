"use client";

import React, { useState } from 'react';
import { IncidentScenario } from '@/lib/mock-incidents';
import IncidentTimeline from './IncidentTimeline';
import { 
  FileText, 
  Target, 
  ShieldAlert, 
  TrendingUp, 
  CheckSquare, 
  Calendar, 
  Compass, 
  Printer, 
  Download, 
  ExternalLink,
  Flame,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { generatePrintableHTML } from '@/lib/report-builder';

interface ReportSectionProps {
  incident: IncidentScenario;
}

export default function ReportSection({ incident }: ReportSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [checkedActions, setCheckedActions] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setCheckedActions(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handlePrint = () => {
    const html = generatePrintableHTML(incident);
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(html);
      win.document.close();
      win.print();
    }
  };

  const handleDownloadHTML = () => {
    const html = generatePrintableHTML(incident);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `WindCover_AI_Crisis_Report_${incident.id}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 my-8">
      {/* Export & Navigation Controls */}
      <div className="cyber-card p-4 rounded-xl border border-[#222222] bg-[#0C0C0C] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-xs text-gray-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>INTERACTIVE FORENSIC DOSSIER UNLOCKED</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#1A1A1A] text-gray-200 hover:text-white hover:bg-[#262626] rounded-lg border border-[#333] text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#00E5FF]" />
            <span>Print Executive PDF</span>
          </button>
          <button
            onClick={handleDownloadHTML}
            className="px-4 py-2 bg-[#00E5FF] text-black font-extrabold rounded-lg text-xs hover:bg-cyan-300 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.3)] cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export HTML Dossier</span>
          </button>
        </div>
      </div>

      {/* 1. Executive Summary */}
      <section className="cyber-card p-6 rounded-xl border border-[#222222] bg-[#0A0A0A] space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#1E1E1E]">
          <FileText className="w-5 h-5 text-[#00E5FF]" />
          <h3 className="font-bold text-lg text-gray-100 uppercase tracking-wide">1. Executive Summary</h3>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed font-sans bg-[#121212] p-4 rounded-xl border border-[#1F1F1F]">
          {incident.executiveSummary}
        </p>
      </section>

      {/* 2. Chronological Timeline */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <h3 className="font-bold text-lg text-gray-100 uppercase tracking-wide">2. Incident Timeline</h3>
        </div>
        <IncidentTimeline timeline={incident.timeline} />
      </section>

      {/* 3. Root Cause Decomposition */}
      <section className="cyber-card p-6 rounded-xl border border-[#222222] bg-[#0A0A0A]">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#1E1E1E]">
          <Target className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-lg text-gray-100 uppercase tracking-wide">3. Root Cause Analysis</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {incident.rootCauses.map((rc, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#121212] border border-[#222222] hover:border-amber-500/50 transition-all">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 inline-block mb-2">
                Vector: {rc.impact}
              </span>
              <h4 className="font-bold text-sm text-gray-100 mb-2">{rc.factor}</h4>
              <p className="text-xs text-gray-400 leading-relaxed">{rc.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Hidden Risks */}
      <section className="cyber-card p-6 rounded-xl border border-rose-500/30 bg-[#0F0A0A]">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-rose-500/20">
          <ShieldAlert className="w-5 h-5 text-rose-500" />
          <h3 className="font-bold text-lg text-rose-300 uppercase tracking-wide">4. Blindspots & Hidden Risks</h3>
        </div>

        <ul className="space-y-3">
          {incident.hiddenRisks.map((risk, idx) => (
            <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-rose-500/5 border border-rose-500/20 text-xs text-gray-300 font-mono">
              <Flame className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{risk}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. Impact Analysis */}
      <section className="cyber-card p-6 rounded-xl border border-[#222222] bg-[#0A0A0A]">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#1E1E1E]">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          <h3 className="font-bold text-lg text-gray-100 uppercase tracking-wide">5. Multi-Vector Impact Assessment</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#121212] border border-[#222]">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Financial Loss Projection</h4>
            <p className="text-xs text-gray-300">{incident.impactAnalysis.financial}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#121212] border border-[#222]">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">Reputational Fallout</h4>
            <p className="text-xs text-gray-300">{incident.impactAnalysis.reputational}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#121212] border border-[#222]">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Operational Disruption</h4>
            <p className="text-xs text-gray-300">{incident.impactAnalysis.operational}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#121212] border border-[#222]">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">Legal & Regulatory Exposure</h4>
            <p className="text-xs text-gray-300">{incident.impactAnalysis.legal}</p>
          </div>
        </div>
      </section>

      {/* 6 & 7. Action Plans (24-Hour & 7-Day) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="cyber-card p-6 rounded-xl border border-[#00E5FF]/30 bg-[#080E0F]">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#00E5FF]/20">
            <h3 className="font-bold text-base text-[#00E5FF] uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-5 h-5" />
              6. Immediate 24-Hour Action Plan
            </h3>
          </div>

          <div className="space-y-2">
            {incident.actionPlan24h.map((act, idx) => {
              const isDone = !!checkedActions[idx];
              return (
                <div 
                  key={idx} 
                  onClick={() => toggleCheck(idx)}
                  className={`p-3 rounded-lg border text-xs font-mono transition-all cursor-pointer flex items-start gap-3 ${
                    isDone ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 line-through' : 'bg-[#121415] border-[#222] text-gray-200 hover:border-[#00E5FF]'
                  }`}
                >
                  <CheckSquare className={`w-4 h-4 shrink-0 mt-0.5 ${isDone ? 'text-emerald-400' : 'text-gray-500'}`} />
                  <span>{act}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="cyber-card p-6 rounded-xl border border-purple-500/30 bg-[#0E080F]">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-purple-500/20">
            <h3 className="font-bold text-base text-purple-300 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              7. Medium-Term 7-Day Recovery Plan
            </h3>
          </div>

          <div className="space-y-2">
            {incident.recoveryPlan7d.map((rec, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-[#222] bg-[#141215] text-xs font-mono text-gray-300 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 8. Future Predictions */}
      <section className="cyber-card p-6 rounded-xl border border-[#222222] bg-[#0A0A0A]">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#1E1E1E]">
          <Compass className="w-5 h-5 text-pink-400" />
          <h3 className="font-bold text-lg text-gray-100 uppercase tracking-wide">8. Future Predictions & Predictive Intelligence</h3>
        </div>

        <div className="space-y-3">
          {incident.futurePredictions.map((pred, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#121212] border border-[#222] flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/30 font-bold">
                    {pred.timeframe}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">Risk: {pred.riskLevel}</span>
                </div>
                <h4 className="font-bold text-sm text-gray-100">{pred.event}</h4>
              </div>

              <div className="text-right font-mono">
                <span className="text-xs text-gray-500 block">Probability</span>
                <span className="text-lg font-black text-pink-400">{pred.probability}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
