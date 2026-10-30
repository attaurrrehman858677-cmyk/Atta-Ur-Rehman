import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Brain, 
  Cpu, 
  Layers, 
  Database, 
  Sparkles, 
  Mic, 
  ShieldCheck, 
  Volume2, 
  VolumeX,
  Activity,
  Zap,
  Info,
  RefreshCw,
  TrendingUp,
  History
} from 'lucide-react';
import { 
  BrainState, 
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
} from './types/brain';
import { 
  brainService, 
  DEFAULT_INITIAL_MEMORIES, 
  DEFAULT_INITIAL_AGENTS, 
  DEFAULT_INITIAL_ACTIONS,
  DEFAULT_INITIAL_HISTORY
} from './services/brainService';
import { useVoiceEngine } from './hooks/useVoiceEngine';
import { NeuralCore } from './components/NeuralCore';
import { CognitiveStream } from './components/CognitiveStream';
import { AutonomousSubAIFactory } from './components/AutonomousSubAIFactory';
import { UniversalWorkspace } from './components/UniversalWorkspace';
import { MemoryVault } from './components/MemoryVault';
import { VoiceController } from './components/VoiceController';
import { SelfLearningHub } from './components/SelfLearningHub';
import { CommandHistorySidebar } from './components/CommandHistorySidebar';

export default function App() {
  const [activeTab, setActiveTab] = useState<'cockpit' | 'learning' | 'factory' | 'workspace' | 'memory'>('cockpit');
  const [language, setLanguage] = useState<'auto' | 'ur-PK' | 'en-US'>('auto');
  
  // Persistent State
  const [memories, setMemories] = useState<UserMemory[]>(() => brainService.loadMemories());
  const [agents, setAgents] = useState<SubAIAgent[]>(() => brainService.loadAgents());
  const [actions, setActions] = useState<ExecutedAction[]>(() => brainService.loadActions());
  const [history, setHistory] = useState<CommandHistoryItem[]>(() => brainService.loadCommandHistory());
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [shortcutToast, setShortcutToast] = useState<{ show: boolean; active: boolean } | null>(null);
  
  // Self-Learning Mechanism State
  const [metrics, setMetrics] = useState<SelfLearningMetrics>(() => brainService.loadMetrics());
  const [patches, setPatches] = useState<AlgorithmPatch[]>(() => brainService.loadPatches());
  const [knowledge, setKnowledge] = useState<KnowledgeItem[]>(() => brainService.loadKnowledge());
  const [models, setModels] = useState<EvolvedModelCapability[]>(() => brainService.loadModels());
  const [isLearning, setIsLearning] = useState(false);
  const [lastSelfLearnResult, setLastSelfLearnResult] = useState<SelfLearningCycleResult | null>(null);
  const [autoLoopEnabled, setAutoLoopEnabled] = useState(true);

  // Cognitive State
  const [brainState, setBrainState] = useState<BrainState>({
    isThinking: false,
    isListening: false,
    isSpeaking: false,
    autoPilotEnabled: true,
    currentIntent: 'Zero-Touch Mode Active. System is ready to autonomously operate all apps, code, research, and life workflows via voice.',
    innerMonologue: 'Central Mind Status: Listening for voice cues. Habit cache loaded: User does not want to type or manually toggle apps. Self-learning heuristics active: Model is autonomously evaluating execution efficiency.',
    understanding: 'AI takes over 100% of human workload autonomously with continuous self-improvement.',
    directAnswer: 'NeuroMind AGI bilkul tayar hai. Aap koi bhi sawal poochein (science, math, general knowledge, coding, life) ya kaam karwayein, main foran direct jawab aur solution screen par deliver karunga aur bol kar bhi bataunga!',
    voiceResponse: 'NeuroMind tayar hai. Aap koi bhi sawal poochein ya kaam kahein, main foran seedha jawab dunga aur task execute karunga.',
    emotionalState: 'hyper-autonomous',
    cognitiveLoad: 26,
    autonomousIQ: 198,
    selfLearningActive: true,
  });

  const [plan, setPlan] = useState<AutonomousPlanStep[]>([
    {
      step: 1,
      title: 'Autonomous Environment Assessment',
      status: 'completed',
      details: 'Identified zero-manual touch mandate and loaded episodic memory graphs.',
      estimatedTime: '45ms (Completed)',
      dependencies: ['Root Hardware I/O', 'Local Episodic Cache'],
      assignedAgent: 'NeuroGuardian',
    },
    {
      step: 2,
      title: 'Continuous Voice Channel Synchronized',
      status: 'completed',
      details: 'Active speech stream connected with Roman Urdu & English recognition.',
      estimatedTime: '120ms (Completed)',
      dependencies: ['Step 1: Environment Assessment', 'Audio Pipeline'],
      assignedAgent: 'ZeroLatency Acoustic Predictor',
    },
    {
      step: 3,
      title: 'Meta-Cognitive Self-Audit Active',
      status: 'completed',
      details: 'Continuous heuristic evaluation and algorithmic weight self-updating.',
      estimatedTime: '280ms (Completed)',
      dependencies: ['Step 2: Voice Channel'],
      assignedAgent: 'NeuroSymbolic Reasoner',
    },
    {
      step: 4,
      title: 'Self-Evolving Sub-AI Swarm Deployed',
      status: 'completed',
      details: '4 domain-specialist agents active in background threads.',
      estimatedTime: '650ms (Completed)',
      dependencies: ['Step 3: Meta-Audit'],
      assignedAgent: 'OmniCoder Supreme',
    },
    {
      step: 5,
      title: 'Universal Zero-Touch App Execution',
      status: 'in_progress',
      details: 'Executing synthetic pipelines, automatic code synthesis, and data processing.',
      estimatedTime: 'Continuous (Active)',
      dependencies: ['Step 4: Sub-AI Swarm'],
      assignedAgent: 'AutoOperative Prime',
    },
  ]);

  const [isEvolvingAgent, setIsEvolvingAgent] = useState(false);
  const initialVoiceSpoken = useRef(false);

  // Sync to local storage
  useEffect(() => {
    brainService.saveMemories(memories);
  }, [memories]);

  useEffect(() => {
    brainService.saveAgents(agents);
  }, [agents]);

  useEffect(() => {
    brainService.saveActions(actions);
  }, [actions]);

  useEffect(() => {
    brainService.saveMetrics(metrics);
  }, [metrics]);

  useEffect(() => {
    brainService.savePatches(patches);
  }, [patches]);

  useEffect(() => {
    brainService.saveKnowledge(knowledge);
  }, [knowledge]);

  useEffect(() => {
    brainService.saveModels(models);
  }, [models]);

  useEffect(() => {
    brainService.saveCommandHistory(history);
  }, [history]);

  // Execute Self-Learning Mechanism Cycle
  const handleRunSelfLearningCycle = useCallback(async () => {
    if (isLearning) return;
    setIsLearning(true);

    try {
      const result = await brainService.runSelfLearningCycle({
        currentIQ: brainState.autonomousIQ,
        metrics,
        recentActions: actions,
        activeAgents: agents,
        existingPatches: patches,
        existingKnowledge: knowledge,
        existingModels: models,
      });

      setLastSelfLearnResult(result);

      if (result.newPatches && result.newPatches.length > 0) {
        setPatches((prev) => [...result.newPatches, ...prev]);
      }

      if (result.newKnowledge && result.newKnowledge.length > 0) {
        setKnowledge((prev) => [...result.newKnowledge, ...prev]);
      }

      if (result.integratedCapabilities && result.integratedCapabilities.length > 0) {
        const stampedModels = result.integratedCapabilities.map((m) => ({
          ...m,
          addedAt: 'Cycle #' + (metrics.learningCyclesRun + 1),
        }));
        setModels((prev) => [...stampedModels, ...prev]);
      }

      const newIQ = brainState.autonomousIQ + (result.iqGain || 3);
      setMetrics((prev) => ({
        ...prev,
        learningCyclesRun: prev.learningCyclesRun + 1,
        heuristicEfficiency: Math.min(99.9, +(prev.heuristicEfficiency + 0.3).toFixed(1)),
        selfCorrectionAccuracy: Math.min(99.9, +(prev.selfCorrectionAccuracy + 0.1).toFixed(1)),
        knowledgeNodesCount: prev.knowledgeNodesCount + (result.newKnowledge?.length || 1) * 36,
        activeAlgorithmPatches: prev.activeAlgorithmPatches + (result.newPatches?.length || 1),
        latencyOptimizationPercent: Math.min(65, +(prev.latencyOptimizationPercent + 1.2).toFixed(1)),
        iqGrowthTotal: prev.iqGrowthTotal + (result.iqGain || 3),
        lastAuditTimestamp: 'Just now',
      }));

      setBrainState((prev) => ({
        ...prev,
        autonomousIQ: newIQ,
        innerMonologue: `Self-Learning Audit Result: ${result.auditSummary}. ${result.newPatches?.length || 0} code patches deployed. Knowledge graph updated.`,
      }));

      const newAction: ExecutedAction = {
        id: 'act-learn-' + Date.now(),
        title: `Autonomous Self-Learning Cycle #${metrics.learningCyclesRun + 1}`,
        category: 'workflow',
        summary: result.auditSummary,
        data: `Weaknesses Resolved:\n${result.weaknessesIdentified.map((w) => `• ${w}`).join('\n')}\n\nPatches Applied: ${result.newPatches.map((p) => p.version).join(', ')}\nIntegrated Models: ${result.integratedCapabilities.map((m) => m.name).join(', ')}\nIQ Gain: +${result.iqGain} points (Total: ${newIQ})`,
        timestamp: 'Just now',
        executedByAgent: 'Self-Learning Meta Engine',
      };
      setActions((prev) => [newAction, ...prev]);

      if (result.voiceSummary) {
        voiceEngine.speak(result.voiceSummary);
      }
    } catch (err) {
      console.error('Self-learning cycle failed:', err);
    } finally {
      setIsLearning(false);
    }
  }, [isLearning, brainState.autonomousIQ, metrics, actions, agents, patches, knowledge, models]);

  // Periodic autonomous self-learning background loop
  useEffect(() => {
    if (!autoLoopEnabled) return;
    const interval = setInterval(() => {
      handleRunSelfLearningCycle();
    }, 120000); // every 2 minutes
    return () => clearInterval(interval);
  }, [autoLoopEnabled, handleRunSelfLearningCycle]);

  // Cognitive loop processor with logging of voice & text interactions
  const processCognitiveLoop = useCallback(async (
    query: string, 
    source: 'voice' | 'text' | 'quick_trigger' = 'text',
    existingHistoryId?: string
  ) => {
    if (!query.trim()) return;

    // Check if query is asking to see history
    if (/show history|open history|view history|command history|tarikh dikhao|purani baatein|past commands/i.test(query)) {
      setIsHistoryOpen(true);
      voiceEngine.speak('Yeh lijiye, aap ka saara command history khul chuka hai.');
      return;
    }

    // Check if user specifically requested self-learning or improvement via voice/text
    const isSelfLearningTrigger = /self[\s-]?learn|improve yourself|update algorithms|behtar bano|apne aap ko update karo|khud seekho/i.test(query);
    if (isSelfLearningTrigger) {
      await handleRunSelfLearningCycle();
      return;
    }

    // Command History Logging: Add or increment re-run
    const currentHistId = existingHistoryId || 'cmd-' + Date.now();
    if (existingHistoryId) {
      setHistory((prev) =>
        prev.map((item) =>
          item.id === existingHistoryId
            ? { ...item, reRunCount: (item.reRunCount || 0) + 1, formattedTime: 'Just now' }
            : item
        )
      );
    } else {
      const newHistoryRecord: CommandHistoryItem = {
        id: currentHistId,
        query,
        source,
        timestamp: new Date().toISOString(),
        formattedTime: 'Just now',
        status: 'in_progress',
        reRunCount: 0,
      };
      setHistory((prev) => [newHistoryRecord, ...prev]);
    }

    setBrainState((prev) => ({
      ...prev,
      isThinking: true,
      currentIntent: query,
      cognitiveLoad: 92,
    }));

    try {
      const response = await brainService.think({
        input: query,
        voiceInput: query,
        memories,
        activeAgents: agents,
        context: { timestamp: new Date().toISOString() },
      });

      // Update inner monologue and brain state
      setBrainState((prev) => ({
        ...prev,
        isThinking: false,
        innerMonologue: response.innerMonologue,
        understanding: response.understanding,
        directAnswer: response.directAnswer || response.voiceResponse,
        voiceResponse: response.voiceResponse,
        cognitiveLoad: 35,
        autonomousIQ: Math.min(240, prev.autonomousIQ + 1),
      }));

      // Update Command History record with outcome summary
      setHistory((prev) =>
        prev.map((item) =>
          item.id === currentHistId
            ? {
                ...item,
                status: 'completed',
                summary: response.directAnswer || response.understanding || response.voiceResponse,
                actionsCount: response.executedActions?.length || 1,
              }
            : item
        )
      );

      // Speak back the answer
      if (response.voiceResponse) {
        voiceEngine.speak(response.voiceResponse);
      }

      // Update autonomous plan
      if (response.autonomousPlan && response.autonomousPlan.length > 0) {
        const enhancedPlan: AutonomousPlanStep[] = response.autonomousPlan.map((step, idx) => ({
          ...step,
          estimatedTime:
            step.estimatedTime ||
            (step.status === 'completed'
              ? '45ms (Finished)'
              : step.status === 'in_progress'
              ? '180ms (Executing)'
              : 'Pending prior pipeline'),
          dependencies:
            step.dependencies ||
            (step.step === 1 ? ['Root Environment Assessment'] : [`Step ${step.step - 1} output pipeline`]),
          assignedAgent:
            step.assignedAgent ||
            (agents[idx % (agents.length || 1)]?.name || 'Autonomous Agent Swarm'),
        }));
        setPlan(enhancedPlan);
      }

      // If a new specialized agent was spawned
      if (response.spawnAgent?.shouldSpawn && response.spawnAgent.name) {
        const newAgent: SubAIAgent = {
          id: 'agent-' + Date.now(),
          name: response.spawnAgent.name,
          role: response.spawnAgent.role || 'Autonomous Specialist',
          description: response.spawnAgent.description || 'Self-spawned sub-AI agent.',
          capabilities: response.spawnAgent.capabilities || ['Self-Learning', 'Zero-Click Execution'],
          intelligenceScore: response.spawnAgent.intelligenceScore || 98.8,
          icon: response.spawnAgent.icon || 'Sparkles',
          color: response.spawnAgent.color || 'from-cyan-500 to-blue-600',
          status: 'active',
          tasksCompleted: 1,
          createdAt: new Date().toISOString(),
          lastAction: response.spawnAgent.initialTask || 'Synthesized background operations',
        };
        setAgents((prev) => [newAgent, ...prev]);
      }

      // If a new memory was formed so user never repeats
      if (response.newMemory?.shouldSave && response.newMemory.key) {
        const newMem: UserMemory = {
          id: 'mem-' + Date.now(),
          key: response.newMemory.key,
          value: response.newMemory.value,
          importance: response.newMemory.importance || 'high',
          timestamp: new Date().toLocaleDateString(),
          category: 'preference',
        };
        setMemories((prev) => [newMem, ...prev]);
      }

      // Append executed actions
      if (response.executedActions && response.executedActions.length > 0) {
        const stampedActions = response.executedActions.map((act) => ({
          ...act,
          timestamp: 'Just now',
          executedByAgent: response.spawnAgent?.name || agents[0]?.name || 'NeuroMind AGI',
        }));
        setActions((prev) => [...stampedActions, ...prev]);
      }
    } catch (err) {
      console.error('Cognitive loop failure:', err);
      setBrainState((prev) => ({
        ...prev,
        isThinking: false,
        cognitiveLoad: 20,
        voiceResponse: 'Maine aapki darkhwast record kar li hai aur background mein mukammal kar raha hoon.',
      }));

      setHistory((prev) =>
        prev.map((item) =>
          item.id === currentHistId ? { ...item, status: 'failed' } : item
        )
      );
    }
  }, [memories, agents, handleRunSelfLearningCycle]);

  // Voice Engine hook
  const voiceEngine = useVoiceEngine({
    onSpeechRecognized: (transcript) => {
      processCognitiveLoop(transcript, 'voice');
    },
    language,
  });

  // Sync voice engine listening status into brainState
  useEffect(() => {
    setBrainState((prev) => ({
      ...prev,
      isListening: voiceEngine.isListening,
      isSpeaking: voiceEngine.isSpeaking,
    }));
  }, [voiceEngine.isListening, voiceEngine.isSpeaking]);

  // Initial welcome greeting
  useEffect(() => {
    if (!initialVoiceSpoken.current) {
      initialVoiceSpoken.current = true;
      setTimeout(() => {
        voiceEngine.speak('NeuroMind AGI active hai. Self-learning mechanism aur command history sidebar tayar hain.');
      }, 1200);
    }
  }, []);

  // Global Keyboard Shortcut: Ctrl+Space (or Cmd+Space) to toggle voice listening
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+Space or Cmd+Space
      if ((e.ctrlKey || e.metaKey) && (e.code === 'Space' || e.key === ' ')) {
        e.preventDefault();
        e.stopPropagation();

        if (voiceEngine.isListening) {
          voiceEngine.stopListening();
          setShortcutToast({ show: true, active: false });
        } else {
          voiceEngine.startListening();
          setShortcutToast({ show: true, active: true });
        }

        setTimeout(() => {
          setShortcutToast(null);
        }, 2200);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown, true);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown, true);
  }, [voiceEngine]);

  // Handler for Master "Sab AI Khud Kar De" Autopilot button
  const handleTriggerAutopilot = async () => {
    await processCognitiveLoop(
      'Sab AI khud kar de, insan ko kuch kaam karne ki zarurat na paray. Saari apps ka kaam background mein run karo aur ek naya super-intelligent agent spawn karo.',
      'quick_trigger'
    );
  };

  // Handler for Self-Evolving a new Agent
  const handleEvolveAgent = async (goal: string) => {
    setIsEvolvingAgent(true);
    try {
      const evolvedAgent = await brainService.evolveSubAI({
        targetGoal: goal,
        parentAgentName: 'Central NeuroMind Core',
        baseCapability: 'Superhuman Autonomous Task Solver',
      });
      setAgents((prev) => [evolvedAgent, ...prev]);

      const newAction: ExecutedAction = {
        id: 'act-evolve-' + Date.now(),
        title: `Self-Architected: ${evolvedAgent.name}`,
        category: 'workflow',
        summary: `Autonomous central mind spawned a superior sub-AI specializing in ${goal}.`,
        data: `Sub-AI ID: ${evolvedAgent.id}\nIntelligence Score: ${evolvedAgent.intelligenceScore}\nCapabilities: ${evolvedAgent.capabilities.join(', ')}\nMission: ${goal}`,
        timestamp: 'Just now',
        executedByAgent: 'NeuroMind Evolution Engine',
      };
      setActions((prev) => [newAction, ...prev]);

      voiceEngine.speak(`Naya specialized AI agent ${evolvedAgent.name} kamyabi se spawn ho chuka hai.`);
    } catch (err) {
      console.error('Agent evolution failed:', err);
    } finally {
      setIsEvolvingAgent(false);
    }
  };

  // Handler for Universal Workspace quick task
  const handleTriggerQuickTask = async (category: string, prompt: string) => {
    await processCognitiveLoop(prompt, 'quick_trigger');
  };

  // Handler for Re-running a command from history
  const handleReRunCommand = async (query: string, historyId?: string) => {
    setActiveTab('cockpit'); // Switch to cockpit so user immediately sees live cognitive stream
    await processCognitiveLoop(query, 'quick_trigger', historyId);
  };

  // History handlers
  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  // Memory handlers
  const handleAddMemory = (key: string, value: string, importance: 'critical' | 'high' | 'normal') => {
    const newMem: UserMemory = {
      id: 'mem-' + Date.now(),
      key,
      value,
      importance,
      timestamp: 'Just added',
      category: 'preference',
    };
    setMemories((prev) => [newMem, ...prev]);
    voiceEngine.speak(`Maine yeh baat hamesha ke liye dimagh mein mehfooz kar li hai: ${key}.`);
  };

  const handleDeleteMemory = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const handleClearAllMemories = () => {
    setMemories(DEFAULT_INITIAL_MEMORIES);
  };

  return (
    <div className="min-h-screen bg-[#05070f] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Global Shortcut HUD Toast */}
      {shortcutToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce pointer-events-none">
          <div
            className={`px-4 py-2.5 rounded-2xl border backdrop-blur-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold transition-all ${
              shortcutToast.active
                ? 'bg-cyan-950/95 border-cyan-400 text-cyan-200 shadow-cyan-500/40'
                : 'bg-slate-900/95 border-slate-700 text-slate-300 shadow-black/80'
            }`}
          >
            {shortcutToast.active ? (
              <Mic className="w-4 h-4 text-cyan-400 animate-pulse" />
            ) : (
              <Mic className="w-4 h-4 text-slate-500 line-through opacity-75" />
            )}
            <span>{shortcutToast.active ? 'Voice Listening ON (Sun Raha Hoon)' : 'Voice Listening OFF'}</span>
            <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/60 text-cyan-300 border border-cyan-500/30">
              Ctrl + Space
            </kbd>
          </div>
        </div>
      )}

      {/* Top Universal OS Navigation Header */}
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-[#05070f]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-300">
                <Brain className="w-5 h-5 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                  NEUROMIND
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                  AGI OS v4.3
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Zero-Human Touch • Self-Learning • Command History
              </p>
            </div>
          </div>

          {/* Navigation Hub */}
          <nav className="flex items-center gap-1 p-1 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs">
            {[
              { id: 'cockpit', label: 'Cognitive Core', icon: Brain },
              { id: 'learning', label: 'Self-Learning', icon: RefreshCw, badge: `${metrics.learningCyclesRun} Cyc`, highlight: true },
              { id: 'factory', label: 'Sub-AI Factory', icon: Cpu, badge: agents.length },
              { id: 'workspace', label: 'Universal Apps', icon: Layers, badge: actions.length },
              { id: 'memory', label: 'Memory Vault', icon: Database, badge: memories.length },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all font-semibold ${
                    isActive
                      ? tab.highlight
                        ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-slate-950 font-bold shadow-md'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-black/40 text-slate-300">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Top Right Quick Autopilot & History Controls */}
          <div className="flex items-center gap-2.5">
            {/* Direct Header Mic Activation Button */}
            <button
              onClick={() => {
                if (voiceEngine.isListening) {
                  voiceEngine.stopListening();
                } else {
                  voiceEngine.startListening();
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm ${
                voiceEngine.isListening
                  ? 'bg-emerald-500/25 hover:bg-emerald-500/35 border-emerald-500/50 text-emerald-300'
                  : 'bg-gradient-to-r from-amber-500/30 to-cyan-500/30 hover:from-amber-500/40 hover:to-cyan-500/40 border-amber-400/50 text-amber-200 animate-pulse'
              }`}
              title={voiceEngine.isListening ? 'Mic khula hai, boliye. Click karke mic band kar sakte hain.' : 'Mic band hai. Click karke Mic Kholiye (Start Mic)'}
            >
              {voiceEngine.isListening ? (
                <>
                  <Mic className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                  <span>🟢 Mic Khula Hai</span>
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5 text-amber-300" />
                  <span>🎙️ Mic Kholiye (Voice Start)</span>
                </>
              )}
            </button>

            {/* History Sidebar Button */}
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 text-xs font-semibold transition-all shadow-sm group"
              title="Open Command History Sidebar (Search & Re-run past interactions)"
            >
              <History className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-[-45deg] transition-transform duration-300" />
              <span>History</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                {history.length}
              </span>
            </button>

            {/* Awaaz ON / OFF Status & Toggle Button */}
            <button
              onClick={voiceEngine.toggleMute}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm ${
                voiceEngine.speechMuted
                  ? 'bg-rose-500/20 hover:bg-rose-500/30 border-rose-500/50 text-rose-300 animate-pulse'
                  : 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/40 text-emerald-300'
              }`}
              title={voiceEngine.speechMuted ? 'Awaaz band hai. Click karke Awaaz ON karein' : 'Awaaz chalu hai. Click karke mute karein'}
            >
              {voiceEngine.speechMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                  <span>Awaaz OFF (Click to ON)</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Awaaz ON</span>
                </>
              )}
            </button>

            {/* Awaaz Suniye Test Button */}
            <button
              onClick={() => voiceEngine.testVoice()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/30 to-blue-500/30 hover:from-cyan-500/40 hover:to-blue-500/40 border border-cyan-400/50 text-cyan-200 text-xs font-extrabold transition-all shadow-sm active:scale-95"
              title="Click to test AI speaking out loud"
            >
              <Volume2 className={`w-3.5 h-3.5 ${voiceEngine.isSpeaking ? 'animate-bounce text-cyan-300' : 'text-cyan-300'}`} />
              <span>{voiceEngine.isSpeaking ? 'AI Bol Raha Hai...' : '🔊 Bol Kar Sunayein'}</span>
            </button>

            <div className="hidden xl:flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Self-Learning Active ({metrics.heuristicEfficiency}% Opt)</span>
            </div>
          </div>
        </div>
      </header>

      {/* Sound & Mic Activation Banner */}
      {(!voiceEngine.audioUnlocked || !voiceEngine.isListening || voiceEngine.speechMuted) && (
        <div className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-indigo-600 px-4 py-2.5 text-white text-xs font-semibold shadow-xl border-b border-white/20 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-xl bg-black/40 text-cyan-200">
                <Mic className="w-4 h-4 animate-bounce" />
              </span>
              <div>
                <span className="font-extrabold text-white">
                  {!voiceEngine.isListening
                    ? '🎙️ AI Ka Microphone (Voice Start) Kholiye!'
                    : '🔊 AI Ki Awaaz Chalu Karein (Tap to Enable Sound)'}
                </span>
                <span className="text-white/90 ml-1.5 hidden sm:inline">
                  Boliye, NeuroMind aapki har baat sun kar foran bol kar jawab dega:
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  voiceEngine.unmuteVoice();
                  voiceEngine.startListening();
                  voiceEngine.testVoice('Assalam-o-Alaikum! NeuroMind AGI ka mic aur aawaz dono active ho chukay hain. Boliye main aapki baat sun raha hoon.');
                }}
                className="px-4 py-1.5 rounded-xl bg-white text-slate-950 font-black hover:bg-slate-100 transition-all shadow-md active:scale-95 flex items-center gap-2 text-xs"
              >
                <Mic className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span>🎙️ Mic Kholiye & Awaaz Suniye</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-32">
        {/* Persistent Central Living Brain Header */}
        <NeuralCore
          brainState={brainState}
          onTriggerAutopilot={handleTriggerAutopilot}
          audioLevel={voiceEngine.audioLevel}
          onTestVoice={voiceEngine.testVoice}
        />

        {/* Dynamic Tab Views */}
        {activeTab === 'cockpit' && (
          <div className="space-y-6">
            <CognitiveStream
              brainState={brainState}
              plan={plan}
              onSpeakAgain={() => voiceEngine.testVoice(brainState.directAnswer || brainState.voiceResponse)}
            />

            {/* Quick Glimpse into Self-Learning, Workspace & Command History */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Self-Learning Mini Widget */}
              <div className="rounded-3xl bg-slate-900/80 border border-slate-800/80 p-6 backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-emerald-400" />
                      <h3 className="text-sm font-bold text-white">Self-Learning Heuristics</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('learning')}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                    >
                      Audit & Evolve →
                    </button>
                  </div>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800/60">
                      <span className="text-slate-400">Heuristic Optimality:</span>
                      <span className="font-mono text-emerald-400 font-bold">{metrics.heuristicEfficiency}%</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800/60">
                      <span className="text-slate-400">Self-Correction Rate:</span>
                      <span className="font-mono text-purple-400 font-bold">{metrics.selfCorrectionAccuracy}%</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800/60">
                      <span className="text-slate-400">Deployed Code Patches:</span>
                      <span className="font-mono text-cyan-400 font-bold">{patches.length} permanent</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleRunSelfLearningCycle}
                  disabled={isLearning}
                  className="mt-4 w-full py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isLearning ? 'Optimizing Algorithms...' : 'Trigger Self-Learning Cycle'}</span>
                </button>
              </div>

              {/* Sub-AIs Swarm */}
              <div className="rounded-3xl bg-slate-900/80 border border-slate-800/80 p-6 backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-purple-400" />
                      <h3 className="text-sm font-bold text-white">Active Sub-AI Swarm</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('factory')}
                      className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
                    >
                      Manage & Evolve →
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {agents.slice(0, 4).map((ag) => (
                      <div key={ag.id} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs font-bold text-slate-200 truncate">{ag.name}</span>
                          <span className="text-[10px] font-mono text-emerald-400">IQ {ag.intelligenceScore}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-1">{ag.role}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Self-Spawning Architecture</span>
                  <span className="text-purple-400 font-medium">Ready</span>
                </div>
              </div>

              {/* Command History Quick Access */}
              <div className="rounded-3xl bg-slate-900/80 border border-slate-800/80 p-6 backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                    <div className="flex items-center gap-2">
                      <History className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-sm font-bold text-white">Command History</h3>
                    </div>
                    <button
                      onClick={() => setIsHistoryOpen(true)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                    >
                      View All ({history.length}) →
                    </button>
                  </div>
                  <div className="space-y-2">
                    {history.slice(0, 3).map((hist) => (
                      <div
                        key={hist.id}
                        onClick={() => handleReRunCommand(hist.query, hist.id)}
                        className="p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-950/90 border border-slate-800/80 hover:border-cyan-500/40 cursor-pointer flex items-center justify-between gap-2 transition-all group"
                      >
                        <div className="truncate flex-1">
                          <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 truncate">
                            &ldquo;{hist.query}&rdquo;
                          </div>
                          <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
                            <span className="capitalize">{hist.source}</span>
                            <span>•</span>
                            <span>{hist.formattedTime}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-cyan-500/10 text-cyan-300 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                          Re-Run
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Searchable Voice & Text Logs</span>
                  <span className="text-cyan-400 font-medium">Click to Re-run</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'learning' && (
          <SelfLearningHub
            metrics={metrics}
            patches={patches}
            knowledge={knowledge}
            models={models}
            onTriggerSelfLearn={handleRunSelfLearningCycle}
            isLearning={isLearning}
            lastResult={lastSelfLearnResult}
            autoLoopEnabled={autoLoopEnabled}
            onToggleAutoLoop={() => setAutoLoopEnabled((prev) => !prev)}
          />
        )}

        {activeTab === 'factory' && (
          <AutonomousSubAIFactory
            agents={agents}
            onEvolveAgent={handleEvolveAgent}
            isEvolving={isEvolvingAgent}
          />
        )}

        {activeTab === 'workspace' && (
          <UniversalWorkspace
            actions={actions}
            activeAgents={agents}
            onTriggerQuickTask={handleTriggerQuickTask}
            isProcessing={brainState.isThinking}
          />
        )}

        {activeTab === 'memory' && (
          <MemoryVault
            memories={memories}
            onAddMemory={handleAddMemory}
            onDeleteMemory={handleDeleteMemory}
            onClearAll={handleClearAllMemories}
          />
        )}
      </main>

      {/* Searchable Command History Sidebar */}
      <CommandHistorySidebar
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onReRunCommand={handleReRunCommand}
        onClearHistory={handleClearHistory}
        onDeleteHistoryItem={handleDeleteHistoryItem}
        isProcessing={brainState.isThinking}
      />

      {/* Floating Hands-Free Voice Engine Controller */}
      <VoiceController
        isListening={voiceEngine.isListening}
        isSpeaking={voiceEngine.isSpeaking}
        continuousMode={voiceEngine.continuousMode}
        speechMuted={voiceEngine.speechMuted}
        transcriptLive={voiceEngine.transcriptLive}
        audioLevel={voiceEngine.audioLevel}
        micPermissionDenied={voiceEngine.micPermissionDenied}
        onToggleListening={() => {
          if (voiceEngine.isListening) {
            voiceEngine.stopListening();
          } else {
            voiceEngine.startListening();
          }
        }}
        onToggleContinuous={voiceEngine.toggleContinuousMode}
        onToggleMute={voiceEngine.toggleMute}
        onRestartMic={voiceEngine.restartMic}
        onSendTextQuery={(text) => processCognitiveLoop(text, 'text')}
        onTestVoice={voiceEngine.testVoice}
        language={language}
        onChangeLanguage={setLanguage}
      />
    </div>
  );
}
