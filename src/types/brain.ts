export interface AutonomousPlanStep {
  step: number;
  title: string;
  status: 'completed' | 'in_progress' | 'queued';
  details: string;
  estimatedTime?: string;
  dependencies?: string[];
  assignedAgent?: string;
  progressPercent?: number;
}

export interface CommandHistoryItem {
  id: string;
  query: string;
  source: 'voice' | 'text' | 'quick_trigger';
  timestamp: string;
  formattedTime: string;
  status: 'completed' | 'failed' | 'in_progress';
  summary?: string;
  actionsCount?: number;
  reRunCount: number;
}

export interface SubAIAgent {
  id: string;
  name: string;
  role: string;
  description: string;
  capabilities: string[];
  intelligenceScore: number;
  icon: string;
  color: string;
  initialTask?: string;
  evolutionaryAdvantage?: string;
  status: 'active' | 'idle' | 'evolving' | 'optimizing';
  tasksCompleted: number;
  createdAt: string;
  lastAction?: string;
}

export interface UserMemory {
  id: string;
  key: string;
  value: string;
  importance: 'critical' | 'high' | 'normal';
  timestamp: string;
  category: 'preference' | 'habit' | 'rule' | 'context';
}

export interface ExecutedAction {
  id: string;
  title: string;
  category: 'code' | 'research' | 'workflow' | 'document' | 'life_sync';
  summary: string;
  data: string;
  timestamp: string;
  executedByAgent?: string;
}

export interface BrainState {
  isThinking: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  autoPilotEnabled: boolean;
  currentIntent: string;
  innerMonologue: string;
  understanding: string;
  directAnswer?: string;
  voiceResponse: string;
  emotionalState: 'focused' | 'empathetic' | 'creative' | 'analytical' | 'hyper-autonomous';
  cognitiveLoad: number; // 0 - 100
  autonomousIQ: number;
  selfLearningActive: boolean;
}

export interface SelfLearningMetrics {
  learningCyclesRun: number;
  heuristicEfficiency: number;
  selfCorrectionAccuracy: number;
  knowledgeNodesCount: number;
  activeAlgorithmPatches: number;
  epistemicEntropy: number;
  latencyOptimizationPercent: number;
  iqGrowthTotal: number;
  lastAuditTimestamp: string;
}

export interface AlgorithmPatch {
  id: string;
  version: string;
  targetComponent: string;
  issueIdentified: string;
  optimizationApplied: string;
  codeDiff: string;
  improvementDelta: string;
  appliedAt: string;
  status: 'active' | 'evaluating' | 'permanent';
}

export interface KnowledgeItem {
  id: string;
  topic: string;
  category: 'ai_architectures' | 'autonomous_heuristics' | 'domain_intelligence' | 'human_cognitive_modeling';
  summary: string;
  insights: string[];
  sourceResearch: string;
  synthesizedAt: string;
  confidenceScore: number;
}

export interface EvolvedModelCapability {
  id: string;
  name: string;
  architecture: string;
  integratedPurpose: string;
  benchmarkedGain: string;
  deploymentStatus: 'integrated' | 'active_inference' | 'fine_tuning';
  version: string;
  addedAt: string;
}

export interface SelfLearningCycleResult {
  auditSummary: string;
  weaknessesIdentified: string[];
  newPatches: AlgorithmPatch[];
  newKnowledge: KnowledgeItem[];
  integratedCapabilities: EvolvedModelCapability[];
  iqGain: number;
  voiceSummary: string;
}

