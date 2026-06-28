"use client";

import React, { useState } from 'react';
import { useIncident } from '@/lib/incident-context';
import { MOCK_INCIDENTS } from '@/lib/mock-incidents';
import { Upload, FileText, ShieldAlert, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface UploadZoneProps {
  onStartAnalysis?: () => void;
}

export default function UploadZone({ onStartAnalysis }: UploadZoneProps) {
  const { selectScenario, runFullAnalysis, activeScenario } = useIncident();
  const [customText, setCustomText] = useState('');
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'presets' | 'upload' | 'text'>('presets');

  const handlePresetSelect = (id: string) => {
    selectScenario(id);
  };

  const handleLaunch = () => {
    if (activeTab === 'text' && customText.trim()) {
      runFullAnalysis({ text: customText });
    } else if (activeTab === 'upload' && selectedFileName) {
      runFullAnalysis({ fileName: selectedFileName, text: 'Custom uploaded evidence file.' });
    } else {
      runFullAnalysis();
    }
    if (onStartAnalysis) onStartAnalysis();
  };

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="cyber-card p-6 rounded-xl border border-[#222222] bg-[#0B0B0B] shadow-2xl">
      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-[#222222] pb-3">
        <button
          onClick={() => setActiveTab('presets')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'presets'
              ? 'bg-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]'
              : 'text-gray-400 hover:text-gray-200 bg-[#141414]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Pre-Loaded Incidents (Fast Test)
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'upload'
              ? 'bg-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]'
              : 'text-gray-400 hover:text-gray-200 bg-[#141414]'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          Upload Files / Logs / Screenshots
        </button>
        <button
          onClick={() => setActiveTab('text')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
            activeTab === 'text'
              ? 'bg-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]'
              : 'text-gray-400 hover:text-gray-200 bg-[#141414]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Paste Plain Text / Email
        </button>
      </div>

      {/* Preset Scenarios Grid */}
      {activeTab === 'presets' && (
        <div className="space-y-4">
          <p className="text-xs text-gray-400">Select an enterprise disaster scenario to launch multi-agent reconstruction telemetry:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.values(MOCK_INCIDENTS).map((incident) => {
              const isSelected = activeScenario.id === incident.id;
              return (
                <div
                  key={incident.id}
                  onClick={() => handlePresetSelect(incident.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 relative ${
                    isSelected
                      ? 'border-[#00E5FF] bg-[#00E5FF]/5 shadow-[0_0_20px_rgba(0,229,255,0.15)]'
                      : 'border-[#222222] bg-[#121212] hover:border-gray-600 hover:bg-[#161616]'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-3 right-3 text-[#00E5FF]">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  )}
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#1A1A1A] text-gray-400 border border-[#2A2A2A] inline-block mb-2">
                    {incident.category}
                  </span>
                  <h4 className="font-bold text-sm text-gray-100 mb-1">{incident.title}</h4>
                  <p className="text-xs text-gray-400 line-clamp-2">{incident.description}</p>
                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-rose-400 font-bold">Severity: {incident.severity}</span>
                    <span className="text-gray-500">{incident.evidenceFiles.length} Artifacts</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* File Upload Zone */}
      {activeTab === 'upload' && (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-[#333333] hover:border-[#00E5FF] rounded-xl p-8 text-center bg-[#121212] transition-colors cursor-pointer relative">
            <input 
              type="file" 
              onChange={handleSimulatedFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            />
            <Upload className="w-10 h-10 text-[#00E5FF] mx-auto mb-3 animate-bounce" />
            <h4 className="text-sm font-bold text-gray-200">Drag & Drop Evidence Files Here</h4>
            <p className="text-xs text-gray-400 mt-1">Supports PDF, PNG, JPG, CSV, JSON, LOG, TXT (Up to 100MB)</p>
            {selectedFileName && (
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                <FileText className="w-4 h-4" />
                Uploaded: {selectedFileName}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Text Area Zone */}
      {activeTab === 'text' && (
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-gray-300">Paste Incident Description, Email Chain, or Chat Logs:</label>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="e.g. At 03:00 AM we noticed our database latency spike to 4000ms. Shortly after, customer support received 500 emails reporting missing orders..."
            className="w-full h-32 p-3 bg-[#121212] border border-[#262626] rounded-xl text-xs text-gray-200 focus:outline-none focus:border-[#00E5FF] font-mono"
          />
        </div>
      )}

      {/* Action CTA Button */}
      <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#222222]">
        <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
          <ShieldAlert className="w-4 h-4 text-[#00E5FF]" />
          <span>Target Scenario: <strong className="text-gray-200">{activeScenario.title}</strong></span>
        </div>

        <button
          onClick={handleLaunch}
          className="px-6 py-3 bg-[#00E5FF] text-black font-extrabold text-sm rounded-xl hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center gap-2 cursor-pointer uppercase tracking-wider"
        >
          <span>Initiate AI Forensics</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
