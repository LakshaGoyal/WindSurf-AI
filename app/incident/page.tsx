"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useIncident } from '@/lib/incident-context';
import ReportSection from '@/components/ReportSection';
import { ArrowLeft, RefreshCw, Terminal, ShieldAlert } from 'lucide-react';

export default function IncidentPage() {
  const router = useRouter();
  const { activeScenario } = useIncident();

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans p-6 max-w-6xl mx-auto relative overflow-x-hidden">
      {/* Top Header Bar */}
      <header className="flex items-center justify-between pb-6 border-b border-[#1E1E1E] mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="p-2 rounded-xl bg-[#121212] border border-[#262626] text-gray-400 hover:text-white hover:border-[#00E5FF] transition-all cursor-pointer flex items-center gap-2 text-xs font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Mission Control</span>
          </button>
          <div>
            <h1 className="font-black text-xl tracking-wider text-white uppercase flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#00E5FF]" />
              Interactive Incident Forensics Dossier
            </h1>
            <p className="text-xs font-mono text-gray-400">Classified Forensic Reconstructions for: <strong className="text-gray-200">{activeScenario.title}</strong></p>
          </div>
        </div>

        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-[#141414] text-gray-300 hover:text-white rounded-xl border border-[#2A2A2A] text-xs font-mono transition-all cursor-pointer"
        >
          New Analysis
        </button>
      </header>

      {/* Main Report Body */}
      <ReportSection incident={activeScenario} />
    </div>
  );
}
