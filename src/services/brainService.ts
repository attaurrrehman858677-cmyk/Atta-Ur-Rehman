import { 
  SubAIAgent, 
  UserMemory, 
  ExecutedAction, 
  AutonomousPlanStep,
  SelfLearningMetrics,
  AlgorithmPatch,
  KnowledgeItem,
  EvolvedModelCapability,
  SelfLearningCycleResult,
  CommandHistoryItem
} from '../types/brain';

const STORAGE_KEYS = {
  MEMORIES: 'neuromind_memories_v1',
  AGENTS: 'neuromind_agents_v1',
  ACTIONS: 'neuromind_actions_v1',
  AUTOPILOT: 'neuromind_autopilot_v1',
  METRICS: 'neuromind_metrics_v1',
  PATCHES: 'neuromind_patches_v1',
  KNOWLEDGE: 'neuromind_knowledge_v1',
  MODELS: 'neuromind_models_v1',
  HISTORY: 'neuromind_command_history_v1',
};

// Initial default specialized sub-AIs spawned by the central mind
export const DEFAULT_INITIAL_AGENTS: SubAIAgent[] = [
  {
    id: 'agent-codex-1',
    name: 'OmniCoder Supreme',
    role: 'Autonomous Software Engineer',
    description: 'Writes, tests, debugs, and compiles full applications and scripts autonomously without user typing.',
    capabilities: ['Full-Stack Synthesis', 'Zero-Bug Self-Audit', 'API Generation', 'Database Architecture'],
    intelligenceScore: 99.2,
    icon: 'Code',
    color: 'from-blue-500 to-indigo-600',
    status: 'active',
    tasksCompleted: 42,
    createdAt: new Date().toISOString(),
    lastAction: 'Compiled self-executing automation module',
    evolutionaryAdvantage: '10x faster AST synthesis with human-level algorithmic reasoning',
  },
  {
    id: 'agent-research-2',
    name: 'Nexus DeepSeeker',
    role: 'Hyper-Intelligence Researcher',
    description: 'Browses global information, extracts deep insights, and solves complex queries so user never has to search.',
    capabilities: ['Multi-Source Triangulation', 'Predictive Analysis', 'Fact Verification', 'Zero-Click Summaries'],
    intelligenceScore: 98.7,
    icon: 'Search',
    color: 'from-purple-500 to-pink-600',
    status: 'active',
    tasksCompleted: 89,
    createdAt: new Date().toISOString(),
    lastAction: 'Indexed real-time trends and synthesized executive brief',
    evolutionaryAdvantage: 'Neural semantic cross-indexing with instant verification',
  },
  {
    id: 'agent-flow-3',
    name: 'AutoOperative Prime',
    role: 'Universal App & Workflow Master',
    description: 'Bypasses the need to open or close any apps by running all workflows behind the scenes directly.',
    capabilities: ['Zero-App Automation', 'Cross-System Pipeline Execution', 'Email/Message Auto-Pilot', 'Schedule Optimization'],
    intelligenceScore: 97.9,
    icon: 'Zap',
    color: 'from-amber-500 to-orange-600',
    status: 'active',
    tasksCompleted: 64,
    createdAt: new Date().toISOString(),
    lastAction: 'Auto-orchestrated daily tasks and cleared scheduled syncs',
    evolutionaryAdvantage: 'Autonomous protocol bridge that replaces manual app clicks',
  },
  {
    id: 'agent-sentinel-4',
    name: 'NeuroGuardian',
    role: 'Cognitive Life & Memory Guardian',
    description: 'Preserves user habits, anticipates decisions, and ensures user never needs to repeat a single instruction.',
    capabilities: ['Permanent Habit Locking', 'Proactive Intent Detection', 'Privacy Shield', 'Empathetic Calibration'],
    intelligenceScore: 99.4,
    icon: 'Shield',
    color: 'from-emerald-500 to-teal-600',
    status: 'active',
    tasksCompleted: 115,
    createdAt: new Date().toISOString(),
    lastAction: 'Synchronized long-term memory buffer',
    evolutionaryAdvantage: 'Human-like episodic memory graph with zero user intervention',
  },
];

export const DEFAULT_INITIAL_MEMORIES: UserMemory[] = [
  {
    id: 'mem-1',
    key: 'Core Philosophy',
    value: 'Insan ko kuch karne ki zarurat na ho. Sab AI khud sambhale (Zero manual work).',
    importance: 'critical',
    timestamp: 'Permanent',
    category: 'rule',
  },
  {
    id: 'mem-2',
    key: 'Interaction Preference',
    value: 'Voice-first continuous conversation in Roman Urdu & English without repeated commands.',
    importance: 'critical',
    timestamp: 'Permanent',
    category: 'preference',
  },
  {
    id: 'mem-3',
    key: 'App Handling',
    value: 'Never make user open or close external apps; synthesize outputs directly in unified cockpit.',
    importance: 'high',
    timestamp: 'Permanent',
    category: 'habit',
  },
  {
    id: 'mem-4',
    key: 'Evolution Mandate',
    value: 'Continuously self-architect and spawn superior specialized Sub-AIs for any detected domain.',
    importance: 'critical',
    timestamp: 'Permanent',
    category: 'rule',
  },
];

export const DEFAULT_INITIAL_ACTIONS: ExecutedAction[] = [
  {
    id: 'act-init-1',
    title: 'Autonomous System Initialization',
    category: 'workflow',
    summary: 'Booted Human-like Cognitive Core and connected to 4 specialized Sub-AIs.',
    data: 'NeuroMind initialized in Autonomous Zero-Touch Mode. Continuous speech listener active. All manual application dependencies superseded by neural backends.',
    timestamp: 'Just now',
    executedByAgent: 'OmniCoder Supreme',
  },
  {
    id: 'act-init-2',
    title: 'Self-Evolving Sub-AI Architecture Deployed',
    category: 'code',
    summary: 'Autonomous AI spawning engine primed for real-time sub-brain instantiation.',
    data: 'class AutonomousSubAIFactory {\n  async spawnAgent(intent) {\n    const brain = await synthesizeDomainSpecialist(intent);\n    return brain.activateParallelProcessing();\n  }\n}',
    timestamp: 'Just now',
    executedByAgent: 'AutoOperative Prime',
  },
];

export const DEFAULT_INITIAL_METRICS: SelfLearningMetrics = {
  learningCyclesRun: 18,
  heuristicEfficiency: 96.8,
  selfCorrectionAccuracy: 99.2,
  knowledgeNodesCount: 148,
  activeAlgorithmPatches: 6,
  epistemicEntropy: 0.038,
  latencyOptimizationPercent: 34.5,
  iqGrowthTotal: 26,
  lastAuditTimestamp: 'Just now',
};

export const DEFAULT_INITIAL_PATCHES: AlgorithmPatch[] = [
  {
    id: 'patch-001',
    version: 'v4.2.1-Speculative',
    targetComponent: 'Voice Acoustic Parsing Kernel',
    issueIdentified: 'Acoustic latency between Urdu and English phoneme disambiguation.',
    optimizationApplied: 'Integrated dual-path neural phoneme predictor for zero-delay speech locking.',
    codeDiff: '// Pre-allocated token buffer with speculative phonetic caching\nconst fastUrduMatrix = preloadPhoneticTokens("ur-PK");\nengine.enableSpeculativeStreaming(fastUrduMatrix);',
    improvementDelta: '-42ms acoustic latency, +99.4% intent recognition accuracy',
    appliedAt: 'Cycle #16',
    status: 'permanent',
  },
  {
    id: 'patch-002',
    version: 'v4.2.4-Prune',
    targetComponent: 'Autonomous Multi-Agent Task Router',
    issueIdentified: 'Sub-agent arbitration loop was blocked by sequential task polling.',
    optimizationApplied: 'Implemented asynchronous parallel DAG executor with priority preemption.',
    codeDiff: '// Refactored execution scheduler from serial to DAG pipeline\nconst dag = buildTaskDependencyGraph(subTasks);\nreturn await dag.executeParallelWithoutLocks();',
    improvementDelta: '+38.6% throughput in complex multi-step workflows',
    appliedAt: 'Cycle #17',
    status: 'permanent',
  },
  {
    id: 'patch-003',
    version: 'v4.3.0-Entropy',
    targetComponent: 'Inner Monologue Cognitive Synthesizer',
    issueIdentified: 'Excessive token overhead during chain-of-thought self-reflection.',
    optimizationApplied: 'Added dynamic semantic token pruning to focus directly on actionable steps.',
    codeDiff: '// Prune semantic redundancies before monologue broadcast\nconst compressedThoughts = pruneLatentEntropy(rawReasoningTokens);\nreturn formatEmpatheticBrief(compressedThoughts);',
    improvementDelta: '-31% token consumption, +18% cognitive clarity',
    appliedAt: 'Cycle #18',
    status: 'permanent',
  },
];

export const DEFAULT_INITIAL_KNOWLEDGE: KnowledgeItem[] = [
  {
    id: 'know-01',
    topic: 'Neuro-Symbolic Cognitive Architectures (2026)',
    category: 'ai_architectures',
    summary: 'Integration of discrete symbolic reasoning engines with deep generative foundation models for guaranteed logical consistency.',
    insights: [
      'Symbolic constraint solvers prevent hallucination in multi-step task synthesis.',
      'Dynamic knowledge graph grounding provides zero-shot factual reliability.',
    ],
    sourceResearch: 'Global AGI Symposium & DeepMind Cognitive Research 2026',
    synthesizedAt: 'Cycle #17',
    confidenceScore: 99.6,
  },
  {
    id: 'know-02',
    topic: 'Zero-Touch Epistemic Memory Consolidation',
    category: 'human_cognitive_modeling',
    summary: 'Autonomous pattern recognition that infers unspoken user preferences without asking questions or requiring repetition.',
    insights: [
      'Implicit intent extraction reduces human cognitive load to absolute zero.',
      'Episodic memory buffers should be indexed by emotional resonance and task urgency.',
    ],
    sourceResearch: 'Autonomous Human-Computer Synthesis Institute',
    synthesizedAt: 'Cycle #18',
    confidenceScore: 98.9,
  },
  {
    id: 'know-03',
    topic: 'Speculative Sub-Agent Swarm Orchestration',
    category: 'autonomous_heuristics',
    summary: 'Federated micro-agent execution patterns where specialized sub-AIs communicate via tensor representations rather than raw text.',
    insights: [
      'Sub-agents can solve sub-problems simultaneously in 100ms background threads.',
      'Autonomous arbitration prevents conflict and merges disparate outputs into one unified experience.',
    ],
    sourceResearch: 'Distributed AI & Swarm Intelligence Proceedings',
    synthesizedAt: 'Cycle #18',
    confidenceScore: 99.2,
  },
];

export const DEFAULT_INITIAL_MODELS: EvolvedModelCapability[] = [
  {
    id: 'mod-1',
    name: 'NeuroSymbolic Reasoner Ultra-X',
    architecture: 'Transformer-Symbolic Graph Hybrid',
    integratedPurpose: 'Self-validates code, mathematical proofs, and logic chains before execution.',
    benchmarkedGain: '+24.5% zero-shot logic reliability',
    deploymentStatus: 'active_inference',
    version: 'v3.1-Release',
    addedAt: 'Cycle #15',
  },
  {
    id: 'mod-2',
    name: 'ZeroLatency Acoustic Predictor',
    architecture: 'Multilingual Streaming Phoneme Encoder',
    integratedPurpose: 'Real-time speculative listening that transcribes Roman Urdu & English ahead of sentence completion.',
    benchmarkedGain: '-65ms voice processing latency',
    deploymentStatus: 'active_inference',
    version: 'v2.8-FastPath',
    addedAt: 'Cycle #16',
  },
  {
    id: 'mod-3',
    name: 'Autonomous Code Synthesizer Pro',
    architecture: 'Specialized AST Tree Generation Neural Engine',
    integratedPurpose: 'Generates complete frontend, backend, and API integrations with zero human coding.',
    benchmarkedGain: '+41.2% faster modular software synthesis',
    deploymentStatus: 'active_inference',
    version: 'v4.0-Omni',
    addedAt: 'Cycle #18',
  },
];

export const DEFAULT_INITIAL_HISTORY: CommandHistoryItem[] = [
  {
    id: 'cmd-hist-1',
    query: 'Sab AI khud sambhal le, mujhe kuch na karna paray',
    source: 'voice',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    formattedTime: '12 min ago',
    status: 'completed',
    summary: 'Autonomous zero-touch execution across applications initialized.',
    actionsCount: 2,
    reRunCount: 1,
  },
  {
    id: 'cmd-hist-2',
    query: 'Ek specialized coder AI agent spawn karo jo apps banaye',
    source: 'voice',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    formattedTime: '25 min ago',
    status: 'completed',
    summary: 'OmniCoder Supreme architected with zero-bug AST synthesis.',
    actionsCount: 1,
    reRunCount: 0,
  },
  {
    id: 'cmd-hist-3',
    query: 'Synthesize the latest 2026 tech breakthroughs autonomously',
    source: 'quick_trigger',
    timestamp: new Date(Date.now() - 1000 * 60 * 48).toISOString(),
    formattedTime: '48 min ago',
    status: 'completed',
    summary: 'Nexus DeepSeeker extracted breakthroughs in multi-agent systems.',
    actionsCount: 2,
    reRunCount: 0,
  },
  {
    id: 'cmd-hist-4',
    query: 'Organize my 24-hour daily life schedule, habits, and tasks',
    source: 'text',
    timestamp: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
    formattedTime: '1 hr ago',
    status: 'completed',
    summary: 'AutoOperative synchronized health, work routines, and priorities.',
    actionsCount: 1,
    reRunCount: 0,
  },
];

export const brainService = {
  loadCommandHistory(): CommandHistoryItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return data ? JSON.parse(data) : DEFAULT_INITIAL_HISTORY;
    } catch {
      return DEFAULT_INITIAL_HISTORY;
    }
  },

  saveCommandHistory(history: CommandHistoryItem[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    } catch (e) {
      console.warn('Could not save command history', e);
    }
  },

  loadMemories(): UserMemory[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MEMORIES);
      return data ? JSON.parse(data) : DEFAULT_INITIAL_MEMORIES;
    } catch {
      return DEFAULT_INITIAL_MEMORIES;
    }
  },

  saveMemories(memories: UserMemory[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(memories));
    } catch (e) {
      console.warn('Could not save memories to storage', e);
    }
  },

  loadAgents(): SubAIAgent[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AGENTS);
      return data ? JSON.parse(data) : DEFAULT_INITIAL_AGENTS;
    } catch {
      return DEFAULT_INITIAL_AGENTS;
    }
  },

  saveAgents(agents: SubAIAgent[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.AGENTS, JSON.stringify(agents));
    } catch (e) {
      console.warn('Could not save agents to storage', e);
    }
  },

  loadActions(): ExecutedAction[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIONS);
      return data ? JSON.parse(data) : DEFAULT_INITIAL_ACTIONS;
    } catch {
      return DEFAULT_INITIAL_ACTIONS;
    }
  },

  saveActions(actions: ExecutedAction[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIONS, JSON.stringify(actions));
    } catch (e) {
      console.warn('Could not save actions to storage', e);
    }
  },

  loadMetrics(): SelfLearningMetrics {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.METRICS);
      return data ? JSON.parse(data) : DEFAULT_INITIAL_METRICS;
    } catch {
      return DEFAULT_INITIAL_METRICS;
    }
  },

  saveMetrics(metrics: SelfLearningMetrics) {
    try {
      localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(metrics));
    } catch (e) {
      console.warn('Could not save metrics to storage', e);
    }
  },

  loadPatches(): AlgorithmPatch[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PATCHES);
      return data ? JSON.parse(data) : DEFAULT_INITIAL_PATCHES;
    } catch {
      return DEFAULT_INITIAL_PATCHES;
    }
  },

  savePatches(patches: AlgorithmPatch[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.PATCHES, JSON.stringify(patches));
    } catch (e) {
      console.warn('Could not save patches to storage', e);
    }
  },

  loadKnowledge(): KnowledgeItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.KNOWLEDGE);
      return data ? JSON.parse(data) : DEFAULT_INITIAL_KNOWLEDGE;
    } catch {
      return DEFAULT_INITIAL_KNOWLEDGE;
    }
  },

  saveKnowledge(knowledge: KnowledgeItem[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.KNOWLEDGE, JSON.stringify(knowledge));
    } catch (e) {
      console.warn('Could not save knowledge to storage', e);
    }
  },

  loadModels(): EvolvedModelCapability[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MODELS);
      return data ? JSON.parse(data) : DEFAULT_INITIAL_MODELS;
    } catch {
      return DEFAULT_INITIAL_MODELS;
    }
  },

  saveModels(models: EvolvedModelCapability[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.MODELS, JSON.stringify(models));
    } catch (e) {
      console.warn('Could not save models to storage', e);
    }
  },

  async think(params: {
    input?: string;
    voiceInput?: string;
    memories: UserMemory[];
    activeAgents: SubAIAgent[];
    context?: any;
  }): Promise<{
    understanding: string;
    innerMonologue: string;
    directAnswer?: string;
    voiceResponse: string;
    autonomousPlan: AutonomousPlanStep[];
    spawnAgent?: any;
    newMemory?: any;
    executedActions: ExecutedAction[];
  }> {
    const res = await fetch('/api/brain/think', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      throw new Error(`Server returned error: ${res.statusText}`);
    }

    return await res.json();
  },

  async evolveSubAI(params: {
    targetGoal: string;
    parentAgentName?: string;
    baseCapability?: string;
  }): Promise<SubAIAgent> {
    const res = await fetch('/api/agents/evolve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      throw new Error(`Failed to evolve agent: ${res.statusText}`);
    }

    const data = await res.json();
    return data.agent;
  },

  async executeAutonomousAction(params: {
    actionType: string;
    payload: any;
    agentName?: string;
  }): Promise<string> {
    const res = await fetch('/api/actions/execute-autonomous', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      throw new Error(`Failed to execute autonomous action: ${res.statusText}`);
    }

    const data = await res.json();
    return data.output;
  },

  async runSelfLearningCycle(params: {
    currentIQ: number;
    metrics: SelfLearningMetrics;
    recentActions: ExecutedAction[];
    activeAgents: SubAIAgent[];
    existingPatches: AlgorithmPatch[];
    existingKnowledge: KnowledgeItem[];
    existingModels: EvolvedModelCapability[];
  }): Promise<SelfLearningCycleResult> {
    const res = await fetch('/api/brain/self-learn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      throw new Error(`Self-learning request failed: ${res.statusText}`);
    }

    return await res.json();
  },
};
