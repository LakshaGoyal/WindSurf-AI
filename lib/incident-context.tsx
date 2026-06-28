"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { MOCK_INCIDENTS, IncidentScenario } from './mock-incidents';
import { 
  AgentProgressState, 
  runEvidenceAgent, 
  runTimelineAgent, 
  runRootCauseAgent, 
  runImpactAgent, 
  runRecoveryAgent, 
  runPredictionAgent, 
  runMasterSynthesizer 
} from './mock-agents';

export type AnalysisStage = 'idle' | 'processing' | 'synthesizing' | 'completed';

export interface IncidentState {
  activeIncidentId: string;
  customInput?: { text?: string; fileName?: string };
  stage: AnalysisStage;
  agentStates: Record<string, AgentProgressState>;
  globalLogs: Array<{ id: string; timestamp: string; agentName: string; message: string; type?: 'info' | 'success' | 'warning' | 'error' }>;
  reportData: any | null;
  synthesizerState: AgentProgressState;
}

const initialAgentStates: Record<string, AgentProgressState> = {
  evidence: {
    id: 'evidence',
    name: 'Evidence Agent',
    avatar: '🔍',
    role: 'Forensic Artifact Parsing & Threat Intel Correlation',
    status: 'Initializing',
    confidence: 0,
    tokensProcessed: 0,
    itemsFoundLabel: 'Artifacts',
    itemsFoundCount: 0,
    estimatedTimeRemaining: 'Calculating...',
    logs: []
  },
  timeline: {
    id: 'timeline',
    name: 'Timeline Agent',
    avatar: '⏱️',
    role: 'Chronological Event Reconstruction & Log Mapping',
    status: 'Initializing',
    confidence: 0,
    tokensProcessed: 0,
    itemsFoundLabel: 'Event Nodes',
    itemsFoundCount: 0,
    estimatedTimeRemaining: 'Calculating...',
    logs: []
  },
  rootCause: {
    id: 'rootCause',
    name: 'Root Cause Agent',
    avatar: '🎯',
    role: 'Five-Whys Vulnerability & Architectural Causal Analysis',
    status: 'Initializing',
    confidence: 0,
    tokensProcessed: 0,
    itemsFoundLabel: 'Vulnerabilities',
    itemsFoundCount: 0,
    estimatedTimeRemaining: 'Calculating...',
    logs: []
  },
  impact: {
    id: 'impact',
    name: 'Impact Agent',
    avatar: '💥',
    role: 'Financial Blast Radius & Stakeholder Damage Assessment',
    status: 'Initializing',
    confidence: 0,
    tokensProcessed: 0,
    itemsFoundLabel: 'Blast Vectors',
    itemsFoundCount: 0,
    estimatedTimeRemaining: 'Calculating...',
    logs: []
  },
  recovery: {
    id: 'recovery',
    name: 'Recovery Agent',
    avatar: '🛡️',
    role: '24h Containment & 7-Day Hardening Playbook Generation',
    status: 'Initializing',
    confidence: 0,
    tokensProcessed: 0,
    itemsFoundLabel: 'Action Items',
    itemsFoundCount: 0,
    estimatedTimeRemaining: 'Calculating...',
    logs: []
  },
  prediction: {
    id: 'prediction',
    name: 'Future Prediction Agent',
    avatar: '🔮',
    role: 'Monte Carlo Simulation & Predictive Escalation Modeling',
    status: 'Initializing',
    confidence: 0,
    tokensProcessed: 0,
    itemsFoundLabel: 'Forecast Scenarios',
    itemsFoundCount: 0,
    estimatedTimeRemaining: 'Calculating...',
    logs: []
  }
};

const initialSynthesizerState: AgentProgressState = {
  id: 'synthesizer',
  name: 'Master Synthesizer Agent',
  avatar: '⚡',
  role: 'Multi-Agent Fusion & Executive Summary Generation',
  status: 'Initializing',
  confidence: 0,
  tokensProcessed: 0,
  itemsFoundLabel: 'Report Sections',
  itemsFoundCount: 0,
  estimatedTimeRemaining: 'Pending...',
  logs: []
};

type Action =
  | { type: 'SET_INCIDENT'; payload: string }
  | { type: 'SET_CUSTOM_INPUT'; payload: { text?: string; fileName?: string } }
  | { type: 'START_ANALYSIS' }
  | { type: 'UPDATE_AGENT'; payload: { id: string; state: Partial<AgentProgressState> } }
  | { type: 'ADD_GLOBAL_LOG'; payload: { agentName: string; message: string; type?: 'info' | 'success' | 'warning' | 'error' } }
  | { type: 'START_SYNTHESIZING' }
  | { type: 'UPDATE_SYNTHESIZER'; payload: Partial<AgentProgressState> }
  | { type: 'COMPLETE_ANALYSIS'; payload: any }
  | { type: 'RESET' };

const initialState: IncidentState = {
  activeIncidentId: 'ransomware-attack',
  stage: 'idle',
  agentStates: initialAgentStates,
  globalLogs: [],
  reportData: null,
  synthesizerState: initialSynthesizerState
};

function incidentReducer(state: IncidentState, action: Action): IncidentState {
  switch (action.type) {
    case 'SET_INCIDENT':
      return { ...state, activeIncidentId: action.payload };
    case 'SET_CUSTOM_INPUT':
      return { ...state, customInput: action.payload };
    case 'START_ANALYSIS':
      return { 
        ...state, 
        stage: 'processing', 
        reportData: null,
        agentStates: JSON.parse(JSON.stringify(initialAgentStates)),
        synthesizerState: JSON.parse(JSON.stringify(initialSynthesizerState)),
        globalLogs: [{
          id: Math.random().toString(),
          timestamp: new Date().toTimeString().split(' ')[0],
          agentName: 'System Orchestrator',
          message: `ASI:ONE Multi-Agent Kernel launched for incident: ${state.activeIncidentId}`,
          type: 'info'
        }]
      };
    case 'UPDATE_AGENT':
      const currentAgent = state.agentStates[action.payload.id];
      const updatedAgent = { ...currentAgent, ...action.payload.state };
      return {
        ...state,
        agentStates: {
          ...state.agentStates,
          [action.payload.id]: updatedAgent
        }
      };
    case 'ADD_GLOBAL_LOG':
      return {
        ...state,
        globalLogs: [
          ...state.globalLogs,
          {
            id: Math.random().toString(),
            timestamp: new Date().toTimeString().split(' ')[0],
            agentName: action.payload.agentName,
            message: action.payload.message,
            type: action.payload.type
          }
        ]
      };
    case 'START_SYNTHESIZING':
      return { ...state, stage: 'synthesizing' };
    case 'UPDATE_SYNTHESIZER':
      return {
        ...state,
        synthesizerState: { ...state.synthesizerState, ...action.payload }
      };
    case 'COMPLETE_ANALYSIS':
      return {
        ...state,
        stage: 'completed',
        reportData: action.payload
      };
    case 'RESET':
      return {
        ...initialState,
        activeIncidentId: state.activeIncidentId
      };
    default:
      return state;
  }
}

interface IncidentContextType {
  state: IncidentState;
  dispatch: React.Dispatch<Action>;
  selectScenario: (id: string) => void;
  runFullAnalysis: (customInput?: { text?: string; fileName?: string }) => Promise<void>;
  reset: () => void;
  activeScenario: IncidentScenario;
}

const IncidentContext = createContext<IncidentContextType | undefined>(undefined);

export function IncidentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(incidentReducer, initialState);

  const activeScenario = MOCK_INCIDENTS[state.activeIncidentId] || MOCK_INCIDENTS['ransomware-attack'];

  const selectScenario = (id: string) => {
    dispatch({ type: 'SET_INCIDENT', payload: id });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  const runFullAnalysis = async (customInput?: { text?: string; fileName?: string }) => {
    if (customInput) {
      dispatch({ type: 'SET_CUSTOM_INPUT', payload: customInput });
    }
    dispatch({ type: 'START_ANALYSIS' });

    const updateAgentHelper = (id: string, name: string) => (update: Partial<AgentProgressState>) => {
      dispatch({ type: 'UPDATE_AGENT', payload: { id, state: update } });
      if (update.logs && update.logs.length > 0) {
        const lastLog = update.logs[update.logs.length - 1];
        dispatch({ 
          type: 'ADD_GLOBAL_LOG', 
          payload: { agentName: name, message: lastLog.message, type: lastLog.type } 
        });
      }
    };

    const agentPromises = [
      runEvidenceAgent(state.activeIncidentId, updateAgentHelper('evidence', 'Evidence Agent')),
      runTimelineAgent(state.activeIncidentId, updateAgentHelper('timeline', 'Timeline Agent')),
      runRootCauseAgent(state.activeIncidentId, updateAgentHelper('rootCause', 'Root Cause Agent')),
      runImpactAgent(state.activeIncidentId, updateAgentHelper('impact', 'Impact Agent')),
      runRecoveryAgent(state.activeIncidentId, updateAgentHelper('recovery', 'Recovery Agent')),
      runPredictionAgent(state.activeIncidentId, updateAgentHelper('prediction', 'Future Prediction Agent'))
    ];

    const results = await Promise.all(agentPromises);

    const allOutputs = {
      evidence: results[0],
      timeline: results[1],
      rootCause: results[2],
      impact: results[3],
      recovery: results[4],
      prediction: results[5]
    };

    dispatch({ type: 'START_SYNTHESIZING' });
    dispatch({ 
      type: 'ADD_GLOBAL_LOG', 
      payload: { agentName: 'System Orchestrator', message: 'All 6 Autonomous Specialist Agents complete. Activating Master Synthesizer Agent...', type: 'warning' } 
    });

    const masterOutput = await runMasterSynthesizer(
      state.activeIncidentId, 
      allOutputs, 
      (update) => {
        dispatch({ type: 'UPDATE_SYNTHESIZER', payload: update });
        if (update.logs && update.logs.length > 0) {
          const lastLog = update.logs[update.logs.length - 1];
          dispatch({ 
            type: 'ADD_GLOBAL_LOG', 
            payload: { agentName: 'Master Synthesizer', message: lastLog.message, type: lastLog.type } 
          });
        }
      }
    );

    dispatch({ type: 'COMPLETE_ANALYSIS', payload: masterOutput });
  };

  return (
    <IncidentContext.Provider value={{ state, dispatch, selectScenario, runFullAnalysis, reset, activeScenario }}>
      {children}
    </IncidentContext.Provider>
  );
}

export function useIncident() {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error('useIncident must be used within an IncidentProvider');
  }
  return context;
}
