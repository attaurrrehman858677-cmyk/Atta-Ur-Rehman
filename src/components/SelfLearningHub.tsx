import React, { useState } from 'react';
import { 
  Sparkles, 
  GitBranch, 
  BookOpen, 
  Cpu, 
  TrendingUp, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap,
  Code2,
  Database,
  Layers,
  Activity,
  Play
} from 'lucide-react';
import { 
  SelfLearningMetrics, 
  AlgorithmPatch, 
  KnowledgeItem, 
  EvolvedModelCapability, 
  SelfLearningCycleResult 
} from '../types/brain';

interface SelfLearningHubProps {
  metrics: SelfLearningMetrics;
  patches: AlgorithmPatch[];
  knowledge: KnowledgeItem[];
  models: EvolvedModelCapability[];
  onTriggerSelfLearn: () => Promise<void>;
  isLearning: boolean;
  lastResult?: SelfLearningCycleResult | null;
  autoLoopEnabled: boolean;
  onToggleAutoLoop: () => void;
}

export const SelfLearningHub: React.FC<SelfLearningHubProps> = ({
  metrics,
  patches,
  knowledge,
  models,
  onTriggerSelfLearn,
  isLearning,
  lastResult,
  autoLoopEnabled,
  onToggleAutoLoop,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'patches' | 'knowledge' | 'models' | 'audit'>('patches');
  const [selectedPatch, setSelectedPatch] = useState<AlgorithmPatch | null>(patches[0] || null);
  const [searchKnowledge, setSearchKnowledge] = useState('');

  const filteredKnowledge = knowledge.filter(
    (k) =>
      k.topic.toLowerCase().includes(searchKnowledge.toLowerCase()) ||
      k.summary.toLowerCase().includes(searchKnowledge.toLowerCase()) ||
      k.category.toLowerCase().includes(searchKnowledge.toLowerCase())
  );

  return (
    <div className="rounded-3xl bg-slate-900/80 border border-slate-800/80 p-6 backdrop-blur-xl relative overflow-hidden space-y-6">
      {/* Background glow */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-400">
              <RefreshCw className={`w-5 h-5 ${isLearning ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Autonomous Self-Learning & Evolution Core</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Self-Optimizing Architecture
                </span>
              </div>
              <p className="text-xs text-slate-400">
                AI analyzes its own performance, identifies bottlenecks, refactors its algorithms, researches knowledge, and integrates superior models autonomously
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggleAutoLoop}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              autoLoopEnabled
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Auto-Learning Loop: Continuously audits and improves algorithms in the background"
          >
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Background Auto-Learn {autoLoopEnabled ? 'ACTIVE' : 'OFF'}</span>
            </span>
          </button>

          <button
            onClick={onTriggerSelfLearn}
            disabled={isLearning}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-slate-950 font-semibold shadow-lg shadow-emerald-500/20 transition-all border border-emerald-400/40"
          >
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
            <span>{isLearning ? 'Self-Learning Chalu Hai...' : 'Run Self-Improvement Cycle'}</span>
          </button>
        </div>
      </div>

      {/* Meta-Learning Telemetry Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
          <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1 mb-1">
            <RefreshCw className="w-3 h-3 text-cyan-400" />
            <span>Learning Cycles</span>
          </div>
          <div className="text-lg font-bold font-mono text-cyan-300">{metrics.learningCyclesRun}</div>
          <span className="text-[10px] text-emerald-400 font-medium">+1 this session</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
          <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1 mb-1">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span>Heuristic Efficiency</span>
          </div>
          <div className="text-lg font-bold font-mono text-emerald-300">{metrics.heuristicEfficiency}%</div>
          <span className="text-[10px] text-slate-400 font-medium">Optimal decision trees</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
          <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1 mb-1">
            <ShieldCheck className="w-3 h-3 text-purple-400" />
            <span>Self-Correction</span>
          </div>
          <div className="text-lg font-bold font-mono text-purple-300">{metrics.selfCorrectionAccuracy}%</div>
          <span className="text-[10px] text-slate-400 font-medium">Zero-hallucination guard</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
          <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1 mb-1">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>Latency Reduced</span>
          </div>
          <div className="text-lg font-bold font-mono text-amber-300">-{metrics.latencyOptimizationPercent}%</div>
          <span className="text-[10px] text-slate-400 font-medium">Via speculative code</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
          <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1 mb-1">
            <Database className="w-3 h-3 text-indigo-400" />
            <span>Knowledge Nodes</span>
          </div>
          <div className="text-lg font-bold font-mono text-indigo-300">{knowledge.length * 48}</div>
          <span className="text-[10px] text-slate-400 font-medium">Research-grounded</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
          <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1 mb-1">
            <Activity className="w-3 h-3 text-pink-400" />
            <span>IQ Growth</span>
          </div>
          <div className="text-lg font-bold font-mono text-pink-300">+{metrics.iqGrowthTotal} pts</div>
          <span className="text-[10px] text-emerald-400 font-medium">Self-evolved</span>
        </div>
      </div>

      {/* Latest Self-Audit Flash Banner */}
      {lastResult && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-950 to-cyan-950/40 border border-emerald-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Latest Meta-Cognitive Self-Audit Results
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
              +{lastResult.iqGain} IQ Gained
            </span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed mb-3">
            {lastResult.auditSummary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-800/80 text-xs">
            <div>
              <span className="text-[11px] font-semibold text-amber-300 flex items-center gap-1 mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Bottlenecks Identified & Resolved:
              </span>
              <ul className="space-y-1 text-slate-400 text-[11px]">
                {lastResult.weaknessesIdentified.map((w, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-cyan-300 flex items-center gap-1 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Voice Briefing:
              </span>
              <p className="text-slate-300 italic text-[11px]">
                &ldquo;{lastResult.voiceSummary}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'patches', label: 'Algorithmic Code Patches', icon: Code2, count: patches.length },
          { id: 'knowledge', label: 'Researched Knowledge Base', icon: BookOpen, count: knowledge.length },
          { id: 'models', label: 'Integrated Sub-Models & Architectures', icon: Cpu, count: models.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Algorithmic Code Patches */}
      {activeSubTab === 'patches' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="space-y-2 lg:col-span-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Deployed Algorithm Patches ({patches.length})
            </span>
            {patches.map((patch) => {
              const isSelected = selectedPatch?.id === patch.id;
              return (
                <div
                  key={patch.id}
                  onClick={() => setSelectedPatch(patch)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-950 border-emerald-500/50 shadow-lg shadow-emerald-950/20'
                      : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800/40">
                      {patch.version}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{patch.appliedAt}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100 mt-1">{patch.targetComponent}</h4>
                  <p className="text-[11px] text-emerald-300 font-medium mt-1">{patch.improvementDelta}</p>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-2 rounded-2xl bg-slate-950/80 border border-slate-800/90 p-5 flex flex-col justify-between">
            {selectedPatch ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-emerald-400">
                      Component Refactored: {selectedPatch.targetComponent}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-0.5">
                      Patch {selectedPatch.version} Details
                    </h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold">
                    Permanent Optimization
                  </span>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    Bottleneck Identified:
                  </h5>
                  <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    {selectedPatch.issueIdentified}
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Heuristic Optimization Applied:
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    {selectedPatch.optimizationApplied}
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                    Synthesized Algorithmic Code Diff:
                  </h5>
                  <div className="rounded-xl bg-black/80 border border-slate-800 p-3.5 font-mono text-xs text-emerald-300 overflow-x-auto max-h-48">
                    <pre className="whitespace-pre-wrap">{selectedPatch.codeDiff}</pre>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs">
                  <span className="text-slate-300">Measured Real-World Delta:</span>
                  <span className="text-emerald-400 font-bold font-mono">{selectedPatch.improvementDelta}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs">
                Select a patch to view code diff and algorithmic telemetry.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Researched Knowledge Base */}
      {activeSubTab === 'knowledge' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <input
              type="text"
              placeholder="Search autonomous knowledge graph..."
              value={searchKnowledge}
              onChange={(e) => setSearchKnowledge(e.target.value)}
              className="max-w-md w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <span className="text-xs text-slate-400 hidden sm:inline">
              Self-researched from scientific literature & cognitive AI benchmarks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredKnowledge.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {item.category.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      {item.confidenceScore}% confidence
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100 mb-2 leading-snug">{item.topic}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{item.summary}</p>

                  <div className="space-y-1.5 mb-3 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Synthesized Insights:
                    </span>
                    {item.insights.map((insight, idx) => (
                      <div key={idx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                        <span className="text-emerald-400">•</span>
                        <span>{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="truncate max-w-[160px]" title={item.sourceResearch}>
                    Ref: {item.sourceResearch}
                  </span>
                  <span>{item.synthesizedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Integrated AI Sub-Models & Architectures */}
      {activeSubTab === 'models' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Autonomous Model Registry: NeuroMind develops and federates specialized micro-models for zero-latency execution.
            </span>
            <span className="text-emerald-400 font-semibold">{models.length} Models Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {models.map((mod) => (
              <div
                key={mod.id}
                className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-cyan-300 px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/50">
                      {mod.version}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1">{mod.name}</h3>
                  <span className="text-[11px] font-mono text-purple-400 block mb-2">{mod.architecture}</span>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{mod.integratedPurpose}</p>
                </div>

                <div className="pt-3 border-t border-slate-900 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">Benchmarked Gain:</span>
                    <span className="text-emerald-400 font-bold font-mono text-[11px]">
                      {mod.benchmarkedGain}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[10px]">Status:</span>
                    <span className="text-emerald-400 flex items-center gap-1 text-[10px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{mod.deploymentStatus.replace('_', ' ').toUpperCase()}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
