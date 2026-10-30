import React, { useState } from 'react';
import { Cpu, Sparkles, Plus, Code, Search, Zap, Shield, Bot, Check, ArrowUpRight } from 'lucide-react';
import { SubAIAgent } from '../types/brain';

interface AutonomousSubAIFactoryProps {
  agents: SubAIAgent[];
  onEvolveAgent: (goal: string) => Promise<void>;
  isEvolving: boolean;
}

export const AutonomousSubAIFactory: React.FC<AutonomousSubAIFactoryProps> = ({
  agents,
  onEvolveAgent,
  isEvolving,
}) => {
  const [customGoal, setCustomGoal] = useState('');
  const [showEvolutionModal, setShowEvolutionModal] = useState(false);

  const getAgentIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-5 h-5" />;
      case 'Search':
        return <Search className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Shield':
        return <Shield className="w-5 h-5" />;
      default:
        return <Bot className="w-5 h-5" />;
    }
  };

  const handleQuickEvolve = async (goal: string) => {
    await onEvolveAgent(goal);
    setShowEvolutionModal(false);
    setCustomGoal('');
  };

  return (
    <div className="rounded-3xl bg-slate-900/80 border border-slate-800/80 p-6 backdrop-blur-xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Self-Evolving Sub-AI Factory</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {agents.length} Active Autonomous Agents
                </span>
              </div>
              <p className="text-xs text-slate-400">
                &ldquo;AI mazeed achay AI bhi khud bana sakay&rdquo; — Central brain autonomously architects superior specialized sub-AIs
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowEvolutionModal(true)}
          disabled={isEvolving}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-600/20 transition-all border border-purple-400/40"
        >
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
          <span>{isEvolving ? 'Naya AI Ban Raha Hai...' : 'Khud Naya Smart AI Banao'}</span>
        </button>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="group relative rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-purple-500/40 p-4 transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/20 flex flex-col justify-between"
          >
            <div>
              {/* Agent Top Row */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${agent.color} text-white shadow-md`}>
                  {getAgentIcon(agent.icon)}
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2 py-0.5 rounded-full font-mono">
                    IQ {agent.intelligenceScore}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {agent.tasksCompleted} tasks done
                  </div>
                </div>
              </div>

              {/* Agent Details */}
              <h3 className="text-sm font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
                {agent.name}
              </h3>
              <p className="text-[11px] font-semibold text-purple-400 mb-2">{agent.role}</p>
              <p className="text-xs text-slate-400 line-clamp-2 mb-3">{agent.description}</p>

              {/* Capabilities Pills */}
              <div className="flex flex-wrap gap-1 mb-3">
                {agent.capabilities.slice(0, 3).map((cap, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Status / Evolutionary Advantage */}
            <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Autonomous</span>
              </span>
              <span className="text-slate-400 text-[10px] truncate max-w-[120px]" title={agent.lastAction}>
                {agent.lastAction || 'Active in background'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Autonomous Evolution Modal */}
      {showEvolutionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-950 border border-purple-500/40 p-6 shadow-2xl shadow-purple-950/50">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Self-Spawn Superior Sub-AI</h3>
                  <p className="text-xs text-slate-400">NeuroMind will architect, train, and deploy a custom agent</p>
                </div>
              </div>
              <button
                onClick={() => setShowEvolutionModal(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 text-xs"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Select Pre-Configured Autonomous AI Archetype:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { title: 'Autonomous Full-Stack Engineer', goal: 'Autonomous Full-Stack Web & API Architect with zero-bug compilation' },
                    { title: 'Global Deep Research Intelligence', goal: 'Deep multi-agent scientific and business intelligence researcher' },
                    { title: 'Zero-App Workflow Automator', goal: 'Cross-platform app bypass orchestrator with background cron pipelines' },
                    { title: 'Urdu & Multilingual Content Synthesizer', goal: 'High-speed bilingual creative writer and cultural reasoning AI' },
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickEvolve(preset.goal)}
                      disabled={isEvolving}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-left transition-all hover:bg-purple-950/20 group"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-200 group-hover:text-purple-300">
                        <span>{preset.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{preset.goal}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Or Describe What You Want AI to Specialize In:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customGoal}
                    onChange={(e) => setCustomGoal(e.target.value)}
                    placeholder="e.g. Medical diagnosis & health agent, or crypto arbitrage executor..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={() => handleQuickEvolve(customGoal || 'Autonomous Universal Domain Specialist')}
                    disabled={isEvolving}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Spawn</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
