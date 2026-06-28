import { MOCK_INCIDENTS, IncidentScenario } from './mock-incidents';

export interface AgentProgressState {
  id: string;
  name: string;
  avatar: string;
  role: string;
  status: 'Initializing' | 'Analyzing' | 'Cross Referencing' | 'Reasoning' | 'Generating Report' | 'Complete';
  confidence: number;
  tokensProcessed: number;
  itemsFoundLabel: string;
  itemsFoundCount: number;
  estimatedTimeRemaining: string;
  logs: Array<{ timestamp: string; message: string; type?: 'info' | 'success' | 'warning' | 'error' }>;
  output?: any;
}

const randomDelay = (min = 1200, max = 3800) => 
  new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * (max - min + 1)) + min));

const getTimestamp = () => {
  const now = new Date();
  return now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
};

export async function runEvidenceAgent(
  incidentId: string, 
  onUpdate?: (state: Partial<AgentProgressState>) => void
): Promise<any> {
  const incident = MOCK_INCIDENTS[incidentId] || MOCK_INCIDENTS['ransomware-attack'];
  
  if (onUpdate) onUpdate({ status: 'Initializing', confidence: 45, tokensProcessed: 120, itemsFoundCount: 0, estimatedTimeRemaining: '3.2s' });
  await randomDelay(800, 1200);

  if (onUpdate) onUpdate({ 
    status: 'Analyzing', 
    confidence: 68, 
    tokensProcessed: 1420, 
    itemsFoundCount: incident.evidenceFiles.length,
    estimatedTimeRemaining: '2.1s',
    logs: [
      { timestamp: getTimestamp(), message: 'Ingesting uploaded artifacts & system dumps...', type: 'info' },
      { timestamp: getTimestamp(), message: `Parsing binary files: ${incident.evidenceFiles.map(f => f.name).join(', ')}`, type: 'info' }
    ]
  });
  await randomDelay(1000, 1500);

  if (onUpdate) onUpdate({ 
    status: 'Cross Referencing', 
    confidence: 85, 
    tokensProcessed: 3890, 
    itemsFoundCount: incident.evidenceFiles.length * 4,
    estimatedTimeRemaining: '1.0s',
    logs: [
      { timestamp: getTimestamp(), message: 'Extracted 14 critical forensic artifacts & IOC hashes.', type: 'success' },
      { timestamp: getTimestamp(), message: 'Cross-referencing global threat intelligence vector databases...', type: 'info' }
    ]
  });
  await randomDelay(800, 1400);

  if (onUpdate) onUpdate({ 
    status: 'Complete', 
    confidence: 94, 
    tokensProcessed: 5120, 
    itemsFoundCount: incident.evidenceFiles.length * 7,
    estimatedTimeRemaining: '0.0s',
    logs: [
      { timestamp: getTimestamp(), message: 'Evidence correlation graph generated successfully.', type: 'success' }
    ]
  });

  return {
    files: incident.evidenceFiles,
    severityScore: incident.severityScore,
    summary: `Analyzed ${incident.evidenceFiles.length} key evidence sources. Identified primary breach vector and corroborating telemetry.`
  };
}

export async function runTimelineAgent(
  incidentId: string, 
  onUpdate?: (state: Partial<AgentProgressState>) => void
): Promise<any> {
  const incident = MOCK_INCIDENTS[incidentId] || MOCK_INCIDENTS['ransomware-attack'];

  if (onUpdate) onUpdate({ status: 'Initializing', confidence: 40, tokensProcessed: 250, itemsFoundCount: 0, estimatedTimeRemaining: '3.5s' });
  await randomDelay(900, 1300);

  if (onUpdate) onUpdate({ 
    status: 'Analyzing', 
    confidence: 72, 
    tokensProcessed: 2100, 
    itemsFoundCount: 3,
    estimatedTimeRemaining: '2.2s',
    logs: [
      { timestamp: getTimestamp(), message: 'Mapping chronological log timestamps across SAN & AD event logs...', type: 'info' },
      { timestamp: getTimestamp(), message: 'Reconstructing pre-incident lateral movement markers.', type: 'warning' }
    ]
  });
  await randomDelay(1100, 1600);

  if (onUpdate) onUpdate({ 
    status: 'Reasoning', 
    confidence: 88, 
    tokensProcessed: 4450, 
    itemsFoundCount: incident.timeline.length,
    estimatedTimeRemaining: '0.8s',
    logs: [
      { timestamp: getTimestamp(), message: `Aligned ${incident.timeline.length} sequential event nodes from T-72h to T-00h.`, type: 'success' },
      { timestamp: getTimestamp(), message: 'Validating causally linked timestamp deltas.', type: 'info' }
    ]
  });
  await randomDelay(900, 1300);

  if (onUpdate) onUpdate({ 
    status: 'Complete', 
    confidence: 92, 
    tokensProcessed: 5980, 
    itemsFoundCount: incident.timeline.length,
    estimatedTimeRemaining: '0.0s',
    logs: [
      { timestamp: getTimestamp(), message: 'Chronological incident graph verified and locked.', type: 'success' }
    ]
  });

  return incident.timeline;
}

export async function runRootCauseAgent(
  incidentId: string, 
  onUpdate?: (state: Partial<AgentProgressState>) => void
): Promise<any> {
  const incident = MOCK_INCIDENTS[incidentId] || MOCK_INCIDENTS['ransomware-attack'];

  if (onUpdate) onUpdate({ status: 'Initializing', confidence: 35, tokensProcessed: 180, itemsFoundCount: 0, estimatedTimeRemaining: '3.8s' });
  await randomDelay(1000, 1400);

  if (onUpdate) onUpdate({ 
    status: 'Cross Referencing', 
    confidence: 69, 
    tokensProcessed: 3100, 
    itemsFoundCount: 2,
    estimatedTimeRemaining: '2.4s',
    logs: [
      { timestamp: getTimestamp(), message: 'Executing Five-Whys causal chain decomposition...', type: 'info' },
      { timestamp: getTimestamp(), message: 'Checking configuration drift vs architectural baseline policy.', type: 'warning' }
    ]
  });
  await randomDelay(1200, 1800);

  if (onUpdate) onUpdate({ 
    status: 'Reasoning', 
    confidence: 91, 
    tokensProcessed: 6200, 
    itemsFoundCount: incident.rootCauses.length,
    estimatedTimeRemaining: '0.9s',
    logs: [
      { timestamp: getTimestamp(), message: `Isolated ${incident.rootCauses.length} primary structural root vulnerabilities.`, type: 'success' },
      { timestamp: getTimestamp(), message: 'Calculating system failure contribution weights.', type: 'info' }
    ]
  });
  await randomDelay(900, 1400);

  if (onUpdate) onUpdate({ 
    status: 'Complete', 
    confidence: 95, 
    tokensProcessed: 7400, 
    itemsFoundCount: incident.rootCauses.length,
    estimatedTimeRemaining: '0.0s',
    logs: [
      { timestamp: getTimestamp(), message: 'Root cause structural breakdown finalized.', type: 'success' }
    ]
  });

  return incident.rootCauses;
}

export async function runImpactAgent(
  incidentId: string, 
  onUpdate?: (state: Partial<AgentProgressState>) => void
): Promise<any> {
  const incident = MOCK_INCIDENTS[incidentId] || MOCK_INCIDENTS['ransomware-attack'];

  if (onUpdate) onUpdate({ status: 'Initializing', confidence: 50, tokensProcessed: 300, itemsFoundCount: 0, estimatedTimeRemaining: '3.0s' });
  await randomDelay(900, 1300);

  if (onUpdate) onUpdate({ 
    status: 'Analyzing', 
    confidence: 76, 
    tokensProcessed: 2800, 
    itemsFoundCount: 4,
    estimatedTimeRemaining: '1.8s',
    logs: [
      { timestamp: getTimestamp(), message: 'Calculating financial loss projection & downtime velocity...', type: 'info' },
      { timestamp: getTimestamp(), message: `Blast Radius Assessment: ${incident.metrics.systemsAffected} systems, ${incident.metrics.peopleAffected}.`, type: 'warning' }
    ]
  });
  await randomDelay(1100, 1500);

  if (onUpdate) onUpdate({ 
    status: 'Generating Report', 
    confidence: 89, 
    tokensProcessed: 5400, 
    itemsFoundCount: 8,
    estimatedTimeRemaining: '0.7s',
    logs: [
      { timestamp: getTimestamp(), message: 'Synthesizing reputational, legal, and operational damage matrices.', type: 'info' },
      { timestamp: getTimestamp(), message: 'Evaluating Regulatory Fine Exposure under GDPR / SEC frameworks.', type: 'warning' }
    ]
  });
  await randomDelay(800, 1200);

  if (onUpdate) onUpdate({ 
    status: 'Complete', 
    confidence: 93, 
    tokensProcessed: 6800, 
    itemsFoundCount: 12,
    estimatedTimeRemaining: '0.0s',
    logs: [
      { timestamp: getTimestamp(), message: 'Multi-vector impact assessment compiled.', type: 'success' }
    ]
  });

  return {
    metrics: incident.metrics,
    impactAnalysis: incident.impactAnalysis,
    hiddenRisks: incident.hiddenRisks
  };
}

export async function runRecoveryAgent(
  incidentId: string, 
  onUpdate?: (state: Partial<AgentProgressState>) => void
): Promise<any> {
  const incident = MOCK_INCIDENTS[incidentId] || MOCK_INCIDENTS['ransomware-attack'];

  if (onUpdate) onUpdate({ status: 'Initializing', confidence: 42, tokensProcessed: 210, itemsFoundCount: 0, estimatedTimeRemaining: '3.6s' });
  await randomDelay(1000, 1400);

  if (onUpdate) onUpdate({ 
    status: 'Reasoning', 
    confidence: 79, 
    tokensProcessed: 3400, 
    itemsFoundCount: 5,
    estimatedTimeRemaining: '2.0s',
    logs: [
      { timestamp: getTimestamp(), message: 'Formulating immediate 24-Hour containment and lockdown procedures...', type: 'info' },
      { timestamp: getTimestamp(), message: 'Mapping 7-Day operational remediation and hardening milestones.', type: 'info' }
    ]
  });
  await randomDelay(1200, 1700);

  if (onUpdate) onUpdate({ 
    status: 'Generating Report', 
    confidence: 91, 
    tokensProcessed: 6100, 
    itemsFoundCount: 10,
    estimatedTimeRemaining: '0.8s',
    logs: [
      { timestamp: getTimestamp(), message: 'Prioritizing action items by criticality and resource bandwidth.', type: 'success' }
    ]
  });
  await randomDelay(900, 1300);

  if (onUpdate) onUpdate({ 
    status: 'Complete', 
    confidence: 96, 
    tokensProcessed: 7200, 
    itemsFoundCount: 12,
    estimatedTimeRemaining: '0.0s',
    logs: [
      { timestamp: getTimestamp(), message: 'Recovery playbook generated and validated.', type: 'success' }
    ]
  });

  return {
    actionPlan24h: incident.actionPlan24h,
    recoveryPlan7d: incident.recoveryPlan7d
  };
}

export async function runPredictionAgent(
  incidentId: string, 
  onUpdate?: (state: Partial<AgentProgressState>) => void
): Promise<any> {
  const incident = MOCK_INCIDENTS[incidentId] || MOCK_INCIDENTS['ransomware-attack'];

  if (onUpdate) onUpdate({ status: 'Initializing', confidence: 38, tokensProcessed: 190, itemsFoundCount: 0, estimatedTimeRemaining: '3.9s' });
  await randomDelay(1100, 1500);

  if (onUpdate) onUpdate({ 
    status: 'Analyzing', 
    confidence: 74, 
    tokensProcessed: 2900, 
    itemsFoundCount: 2,
    estimatedTimeRemaining: '2.1s',
    logs: [
      { timestamp: getTimestamp(), message: 'Running Monte Carlo simulations on downstream fallout scenarios...', type: 'info' },
      { timestamp: getTimestamp(), message: 'Calculating threat actor escalation probabilities over 14-day window.', type: 'warning' }
    ]
  });
  await randomDelay(1200, 1800);

  if (onUpdate) onUpdate({ 
    status: 'Reasoning', 
    confidence: 87, 
    tokensProcessed: 5800, 
    itemsFoundCount: incident.futurePredictions.length,
    estimatedTimeRemaining: '0.9s',
    logs: [
      { timestamp: getTimestamp(), message: `Forecasted ${incident.futurePredictions.length} high-probability secondary risk events.`, type: 'success' }
    ]
  });
  await randomDelay(900, 1300);

  if (onUpdate) onUpdate({ 
    status: 'Complete', 
    confidence: 91, 
    tokensProcessed: 6900, 
    itemsFoundCount: incident.futurePredictions.length,
    estimatedTimeRemaining: '0.0s',
    logs: [
      { timestamp: getTimestamp(), message: 'Predictive intelligence modeling complete.', type: 'success' }
    ]
  });

  return incident.futurePredictions;
}

export async function runMasterSynthesizer(
  incidentId: string,
  allAgentOutputs: Record<string, any>,
  onUpdate?: (state: Partial<AgentProgressState>) => void
): Promise<any> {
  const incident = MOCK_INCIDENTS[incidentId] || MOCK_INCIDENTS['ransomware-attack'];

  if (onUpdate) onUpdate({ status: 'Initializing', confidence: 60, tokensProcessed: 1000, itemsFoundCount: 6, estimatedTimeRemaining: '4.0s' });
  await randomDelay(1000, 1300);

  if (onUpdate) onUpdate({ 
    status: 'Analyzing', 
    confidence: 82, 
    tokensProcessed: 12400, 
    itemsFoundCount: 18,
    estimatedTimeRemaining: '2.5s',
    logs: [
      { timestamp: getTimestamp(), message: 'Ingesting outputs from all 6 autonomous specialist agents...', type: 'info' },
      { timestamp: getTimestamp(), message: 'Fusing timeline, root cause, and impact matrices into master knowledge graph.', type: 'info' }
    ]
  });
  await randomDelay(1200, 1600);

  if (onUpdate) onUpdate({ 
    status: 'Reasoning', 
    confidence: 96, 
    tokensProcessed: 24800, 
    itemsFoundCount: 42,
    estimatedTimeRemaining: '1.0s',
    logs: [
      { timestamp: getTimestamp(), message: 'Drafting Executive Summary briefing note...', type: 'info' },
      { timestamp: getTimestamp(), message: 'Verifying internal consistency across 8 report modules.', type: 'success' }
    ]
  });
  await randomDelay(1000, 1400);

  if (onUpdate) onUpdate({ 
    status: 'Complete', 
    confidence: 99, 
    tokensProcessed: 32600, 
    itemsFoundCount: 54,
    estimatedTimeRemaining: '0.0s',
    logs: [
      { timestamp: getTimestamp(), message: 'Master Incident Investigation Report unlocked.', type: 'success' }
    ]
  });

  return {
    incident,
    synthesizedAt: new Date().toISOString(),
    overallConfidence: 96,
    totalTokensProcessed: 32600
  };
}
