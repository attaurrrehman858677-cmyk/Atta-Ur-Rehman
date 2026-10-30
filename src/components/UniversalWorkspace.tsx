import React, { useState } from 'react';
import { 
  Layers, 
  Code, 
  Search, 
  Mail, 
  Calendar, 
  Copy, 
  Check, 
  Play, 
  FileText, 
  Zap, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { ExecutedAction, SubAIAgent } from '../types/brain';

interface UniversalWorkspaceProps {
  actions: ExecutedAction[];
  activeAgents: SubAIAgent[];
  onTriggerQuickTask: (category: string, prompt: string) => Promise<void>;
  isProcessing: boolean;
}

export const UniversalWorkspace: React.FC<UniversalWorkspaceProps> = ({
  actions,
  activeAgents,
  onTriggerQuickTask,
  isProcessing,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'code' | 'research' | 'workflow' | 'document'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredActions = activeTab === 'all' 
    ? actions 
    : actions.filter((act) => act.category === activeTab);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="rounded-3xl bg-slate-900/80 border border-slate-800/80 p-6 backdrop-blur-xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Universal Autonomous Workspace</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Zero-App Switcher
                </span>
              </div>
              <p className="text-xs text-slate-400">
                &ldquo;Na koi app kholni band karni paray, na kuch likhna paray&rdquo; — All external apps unified and auto-executed here
              </p>
            </div>
          </div>
        </div>

        {/* Tab Filter */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs">
          {[
            { id: 'all', label: 'All Tasks', icon: Layers },
            { id: 'code', label: 'Code & Apps', icon: Code },
            { id: 'research', label: 'Research', icon: Search },
            { id: 'workflow', label: 'Workflows', icon: Zap },
            { id: 'document', label: 'Comms & Docs', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all font-medium ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1-Click Zero-Typing Quick Autonomous Missions */}
      <div className="mt-6">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">
          Autonomous Zero-Typing Fast Actions (Click or Speak to Execute):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              category: 'code',
              title: 'Auto-Build Complete App Module',
              desc: 'AI writes full TypeScript/React widget without typing a line.',
              prompt: 'Generate and compile a complete full-stack autonomous dashboard widget with real-time stats and controls.',
              icon: Code,
              color: 'text-blue-400 border-blue-500/30 hover:bg-blue-950/20',
            },
            {
              category: 'research',
              title: 'Deep Market & Tech Intelligence',
              desc: 'Autonomous web synthesis on latest 2026 AI and tech breakthroughs.',
              prompt: 'Synthesize global breakthroughs in autonomous AI operating systems, multi-agent frameworks, and robotics in 2026.',
              icon: Search,
              color: 'text-purple-400 border-purple-500/30 hover:bg-purple-950/20',
            },
            {
              category: 'document',
              title: 'Auto-Draft & Schedule Comms',
              desc: 'Creates email, client proposal, and bilingual message automatically.',
              prompt: 'Auto-draft a high-level executive project status email and WhatsApp update for clients in Roman Urdu and English.',
              icon: Mail,
              color: 'text-emerald-400 border-emerald-500/30 hover:bg-emerald-950/20',
            },
            {
              category: 'workflow',
              title: 'Organize Life & Schedule',
              desc: 'Clears schedule, prioritizes tasks, and automates next 24 hours.',
              prompt: 'Autonomously organize my 24-hour daily life schedule, habits, health routines, and priority tasks with zero manual input.',
              icon: Calendar,
              color: 'text-amber-400 border-amber-500/30 hover:bg-amber-950/20',
            },
          ].map((quick, idx) => {
            const Icon = quick.icon;
            return (
              <button
                key={idx}
                onClick={() => onTriggerQuickTask(quick.category, quick.prompt)}
                disabled={isProcessing}
                className={`p-3.5 rounded-2xl bg-slate-950/50 border text-left transition-all group ${quick.color}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] font-mono uppercase opacity-75">Auto-Run</span>
                </div>
                <div className="text-xs font-bold text-slate-200 group-hover:text-white mb-1">
                  {quick.title}
                </div>
                <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                  {quick.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Executed Results Stream */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Live Completed Results ({filteredActions.length})
          </span>
          <span className="text-[11px] text-slate-500">
            Automatically cached & verified by sub-AIs
          </span>
        </div>

        {filteredActions.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-950/40 border border-slate-800/80 text-center text-slate-400">
            <p className="text-xs">No tasks in this category yet. Speak a command or trigger a quick mission!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredActions.map((action) => (
              <div
                key={action.id}
                className="rounded-2xl bg-slate-950/70 border border-slate-800/90 p-5 hover:border-slate-700 transition-all shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] uppercase font-bold font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {action.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-100">{action.title}</h3>
                  </div>

                  <div className="flex items-center gap-3">
                    {action.executedByAgent && (
                      <span className="text-[10px] font-semibold text-cyan-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        by {action.executedByAgent}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-500 font-mono">{action.timestamp}</span>
                    <button
                      onClick={() => handleCopy(action.id, action.data || action.summary)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                      title="Copy result"
                    >
                      {copiedId === action.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mb-3">{action.summary}</p>

                {/* Structured Output Box (Code, Research report, etc.) */}
                {action.data && (
                  <div className="rounded-xl bg-black/60 border border-slate-900 p-3.5 font-mono text-xs text-slate-300 overflow-x-auto max-h-56">
                    <pre className="whitespace-pre-wrap">{action.data}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
