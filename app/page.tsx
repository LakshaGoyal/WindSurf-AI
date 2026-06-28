"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useIncident } from '@/lib/incident-context';
import { MOCK_INCIDENTS } from '@/lib/mock-incidents';
import UploadZone from '@/components/UploadZone';
import AnimatedWorkflow from '@/components/AnimatedWorkflow';
import { 
  ShieldAlert, 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  FileText, 
  Zap, 
  Lock, 
  HelpCircle, 
  ChevronDown, 
  Activity,
  Layers,
  Flame,
  CheckCircle2
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { selectScenario, runFullAnalysis } = useIncident();
  const [typedText, setTypedText] = useState('');
  const fullText = "AI-Powered Crisis Intelligence & Recovery Platform";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 60);
    return () => clearInterval(timer);
  }, []);

  const handleStartAnalysis = () => {
    router.push('/dashboard');
  };

  const handleQuickDemo = (scenarioId: string) => {
    selectScenario(scenarioId);
    runFullAnalysis();
    router.push('/dashboard');
  };

  const faqs = [
    { q: "How does WindCover AI deliver crisis intelligence and recovery?", a: "WindCover AI launches six specialized autonomous agents in parallel. Each agent analyzes raw telemetry, cross-references historical incident patterns, builds causal dependency graphs, and passes verified findings to the Master Synthesizer Agent." },
    { q: "What types of evidence and files can be uploaded?", a: "WindCover AI accepts firewall logs, code diffs, legal court filings, financial balance sheets, email chains, screenshots, and raw incident notes." },
    { q: "How fast is the crisis intelligence analysis generated?", a: "Autonomous agent execution completes in under 15 seconds, delivering a multi-page interactive crisis recovery report complete with 24-hour action items and predictive risk forecasts." },
    { q: "Is WindCover AI suitable for executive and legal reporting?", a: "Yes. Every report features an Executive Summary view and supports one-click PDF and clean HTML export formatted for C-suite and legal counsel review." }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 selection:bg-[#00E5FF] selection:text-black font-sans relative overflow-x-hidden">
      {/* Top Header Bar */}
      <header className="border-b border-[#1A1A1A] bg-[#080808]/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#121212] border border-[#00E5FF]/40 text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.3)]">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-lg tracking-wider text-white">WINDCOVER<span className="text-[#00E5FF]">.AI</span></span>
            <span className="text-[10px] font-mono text-gray-500 block -mt-1 uppercase">Mission Control OS</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-gray-400">
          <a href="#how-it-works" className="hover:text-[#00E5FF] transition-colors">How It Works</a>
          <a href="#agents" className="hover:text-[#00E5FF] transition-colors">Agent System</a>
          <a href="#demo" className="hover:text-[#00E5FF] transition-colors">Live Scenarios</a>
          <a href="#faq" className="hover:text-[#00E5FF] transition-colors">FAQ</a>
        </nav>

        <button 
          onClick={handleStartAnalysis}
          className="px-5 py-2.5 bg-[#00E5FF] text-black font-bold text-xs rounded-xl hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center gap-2 cursor-pointer uppercase tracking-wider"
        >
          <Zap className="w-4 h-4 fill-black" />
          <span>Launch Platform</span>
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] font-mono text-xs mb-6 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>ASI:ONE Autonomous Agent Architecture Prototype</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-4">
          WINDCOVER <span className="text-[#00E5FF] text-glow-accent">AI</span>
        </h1>

        <div className="h-12 flex items-center justify-center mb-6">
          <p className="text-lg md:text-2xl font-mono text-cyan-300 border-r-2 border-[#00E5FF] pr-1 animate-pulse">
            {typedText}
          </p>
        </div>

        <p className="text-base text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload any crisis—ransomware hacks, funding collapses, data breaches, or contract deadlocks. Six autonomous AI investigators reconstruct what happened, analyze root causes, and build recovery intelligence playbooks in real-time.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={handleStartAnalysis}
            className="px-8 py-4 bg-[#00E5FF] text-black font-black text-sm rounded-xl hover:bg-cyan-300 transition-all shadow-[0_0_25px_rgba(0,229,255,0.5)] flex items-center gap-3 uppercase tracking-wider cursor-pointer"
          >
            <span>Analyze Crisis Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#demo"
            className="px-8 py-4 bg-[#141414] text-gray-200 hover:text-white font-bold text-sm rounded-xl border border-[#262626] hover:border-gray-500 transition-all flex items-center gap-2 uppercase tracking-wider"
          >
            <span>View Sample Scenarios</span>
          </a>
        </div>

        {/* Live Interactive Upload Locker Box */}
        <div id="upload" className="text-left">
          <UploadZone onStartAnalysis={handleStartAnalysis} />
        </div>
      </section>

      {/* Section 2: How It Works */}
      <section id="how-it-works" className="py-20 px-6 border-t border-[#1A1A1A] bg-[#080808]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest block mb-2">Automated Crisis Intelligence Pipeline</span>
            <h2 className="text-3xl font-black text-gray-100">How WindCover AI Solves Crises</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: "01", title: "Upload Artifacts", desc: "Upload logs, code, PDFs, or paste text descriptions." },
              { step: "02", title: "Evidence Parsing", desc: "System correlates telemetry & extracts key crisis indicators." },
              { step: "03", title: "6 Parallel Agents", desc: "Specialist agents investigate timeline, root cause, impact & predictions." },
              { step: "04", title: "Master Synthesizer", desc: "Fuses multi-agent knowledge streams into single consensus graph." },
              { step: "05", title: "Interactive Report", desc: "Generates 8-section executive report with printable PDF exports." }
            ].map((st, i) => (
              <div key={i} className="cyber-card p-5 rounded-xl border border-[#222] bg-[#0F0F0F] relative">
                <span className="text-2xl font-black text-[#00E5FF]/40 font-mono block mb-2">{st.step}</span>
                <h4 className="font-bold text-sm text-gray-100 mb-1">{st.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Agent System Workflow */}
      <section id="agents" className="py-20 px-6 border-t border-[#1A1A1A] bg-[#050505]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest block mb-2">Multi-Agent Orchestration Engine</span>
            <h2 className="text-3xl font-black text-gray-100">The Six Autonomous Specialists</h2>
          </div>

          <AnimatedWorkflow stage="processing" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              { name: "Evidence Agent", role: "Artifact Ingestion & Threat Intel Correlation", icon: "🔍" },
              { name: "Timeline Agent", role: "Chronological Sequence Rebuilding", icon: "⏱️" },
              { name: "Root Cause Agent", role: "Five-Whys Architectural Vulnerability Isolation", icon: "🎯" },
              { name: "Impact Agent", role: "Financial Blast Radius & Stakeholder Damage", icon: "💥" },
              { name: "Recovery Agent", role: "24h Lockdown & 7-Day Hardening Playbooks", icon: "🛡️" },
              { name: "Prediction Agent", role: "Monte Carlo Downstream Fallout Forecasting", icon: "🔮" }
            ].map((ag, i) => (
              <div key={i} className="cyber-card p-4 rounded-xl border border-[#222] bg-[#0D0D0D] flex items-center gap-3">
                <span className="text-2xl p-2 rounded-lg bg-[#161616] border border-[#262626]">{ag.icon}</span>
                <div>
                  <h4 className="font-bold text-sm text-gray-100">{ag.name}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{ag.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Clickable Demo Incidents */}
      <section id="demo" className="py-20 px-6 border-t border-[#1A1A1A] bg-[#080808]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest block mb-2">Interactive Crisis Sandbox</span>
            <h2 className="text-3xl font-black text-gray-100">Click to Simulate Real Crisis Intelligence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(MOCK_INCIDENTS).map((inc) => (
              <div
                key={inc.id}
                onClick={() => handleQuickDemo(inc.id)}
                className="cyber-card p-5 rounded-xl border border-[#222] bg-[#0F0F0F] hover:border-[#00E5FF] cursor-pointer transition-all group relative"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#1A1A1A] text-gray-400 border border-[#2A2A2A]">
                    {inc.category}
                  </span>
                  <span className="text-xs font-bold text-rose-400 font-mono">{inc.severity}</span>
                </div>
                <h3 className="font-bold text-base text-gray-100 group-hover:text-[#00E5FF] transition-colors mb-2">
                  {inc.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-3 mb-4">{inc.description}</p>

                <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-[#1F1F1F]">
                  <span className="text-gray-500">Impact: <strong className="text-gray-300">{inc.metrics.financialImpact}</strong></span>
                  <span className="text-[#00E5FF] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Simulate <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Features Grid */}
      <section className="py-20 px-6 border-t border-[#1A1A1A] bg-[#050505]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest block mb-2">Mission Control Capabilities</span>
            <h2 className="text-3xl font-black text-gray-100">Engineered for Crisis Command Rooms</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Real-time Telemetry Stream", desc: "Watch live agent reasoning logs stream character by character with timestamp precision.", icon: <Activity className="w-5 h-5 text-[#00E5FF]" /> },
              { title: "Executive PDF & HTML Export", desc: "One-click generation of institutional-grade recovery reports ready for board presentation.", icon: <FileText className="w-5 h-5 text-emerald-400" /> },
              { title: "Severity & Blast Radius Gauge", desc: "Instant calculation of affected endpoints, financial exposure, and recovery difficulty score.", icon: <ShieldAlert className="w-5 h-5 text-rose-500" /> }
            ].map((ft, i) => (
              <div key={i} className="cyber-card p-6 rounded-xl border border-[#222] bg-[#0B0B0B]">
                <div className="p-3 rounded-xl bg-[#141414] border border-[#262626] w-fit mb-4">{ft.icon}</div>
                <h4 className="font-bold text-base text-gray-100 mb-2">{ft.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{ft.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: FAQ */}
      <section id="faq" className="py-20 px-6 border-t border-[#1A1A1A] bg-[#080808]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest block mb-2">Frequently Asked Questions</span>
            <h2 className="text-3xl font-black text-gray-100">Intel & Architecture FAQ</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="cyber-card rounded-xl border border-[#222] bg-[#0F0F0F] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 text-left font-bold text-sm text-gray-200 flex items-center justify-between gap-4"
                >
                  <span>{f.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#00E5FF] transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="p-4 pt-0 text-xs text-gray-400 border-t border-[#1F1F1F] leading-relaxed">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1A1A1A] bg-[#040404] py-12 px-6 text-center text-xs font-mono text-gray-500">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-sm tracking-wider text-gray-200">WINDCOVER<span className="text-[#00E5FF]">.AI</span></span>
            <span>— Recovery Intelligence Platform for Any Crisis</span>
          </div>
          <div>Built with ASI:ONE Autonomous Agent Orchestration Prototype Architecture</div>
        </div>
      </footer>
    </div>
  );
}
