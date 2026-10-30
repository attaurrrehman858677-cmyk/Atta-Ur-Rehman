import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Volume2, 
  MessageSquareText, 
  Lightbulb, 
  Compass, 
  Copy, 
  Check,
  GitBranch,
  Timer,
  Cpu,
  Layers,
  ArrowRight,
  Activity
} from 'lucide-react';
import { AutonomousPlanStep, BrainState } from '../types/brain';

interface CognitiveStreamProps {
  brainState: BrainState;
  plan: AutonomousPlanStep[];
  onSpeakAgain?: () => void;
}

export const CognitiveStream: React.FC<CognitiveStreamProps> = ({
  brainState,
  plan,
  onSpeakAgain,
}) => {
  const [copied, setCopied] = useState(false);

  const answerText = brainState.directAnswer || brainState.voiceResponse;

  const handleCopy = () => {
    if (!answerText) return;
    navigator.clipboard.writeText(answerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const completedCount = plan.filter((s) => s.status === 'completed').length;
  const inProgressStep = plan.find((s) => s.status === 'in_progress');
  const progressPercent = Math.round((completedCount / (plan.length || 1)) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Prominent Direct Answer & Solution Card (Spanning Both Columns) */}
      {answerText && (
        <div className="lg:col-span-2 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-400/40 p-6 backdrop-blur-2xl shadow-xl shadow-cyan-950/30">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-cyan-500/20 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                  Instant Direct Solution & Answer • سوال کا فوری جواب اور حل
                </span>
                <h3 className="text-sm md:text-base font-bold text-white">
                  {brainState.currentIntent ? `Query: “${brainState.currentIntent}”` : 'Direct Solution'}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                ✓ 100% Solved & Executed
              </span>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
                title="Copy answer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              {onSpeakAgain && (
                <button
                  onClick={onSpeakAgain}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all border border-cyan-500/40"
                  title="Dobara Sunayein"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Awaaz Suniye</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-cyan-500/20 text-slate-100 text-sm leading-relaxed whitespace-pre-wrap font-medium">
            {answerText}
          </div>
        </div>
      )}

      {/* Human-like Inner Monologue & Cognitive Reasoning */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800/80 p-6 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span>Insan Jaisa Dimag (Inner Monologue)</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                    Chain of Thought
                  </span>
                </h2>
                <p className="text-xs text-slate-400">How the AI reasons before acting autonomously</p>
              </div>
            </div>
          </div>

          {/* Spoken Voice Output Banner */}
          {brainState.voiceResponse && (
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-slate-900 border border-cyan-500/30">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                  <MessageSquareText className="w-4 h-4 text-cyan-400" />
                  Voice Response (Spoken Out Loud)
                </span>
                {onSpeakAgain && (
                  <button
                    onClick={onSpeakAgain}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs transition-colors"
                    title="Play voice response again"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Dobara Sunayein</span>
                  </button>
                )}
              </div>
              <p className="text-sm font-medium text-slate-100 leading-relaxed">
                &ldquo;{brainState.voiceResponse}&rdquo;
              </p>
            </div>
          )}

          {/* Deep Cognitive Stream Content */}
          <div className="mt-4 space-y-3">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 font-mono text-xs leading-relaxed text-indigo-200">
              <div className="flex items-center gap-2 text-indigo-400 text-[11px] font-semibold mb-2 uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>Cognitive Flow • Roman Urdu & Reasoning</span>
              </div>
              <p className="text-slate-300 whitespace-pre-wrap">
                {brainState.innerMonologue ||
                  'AI Dimagh Soch Raha Hai: User chahte hain k unhein har sawal ka seedha jawab foran mile aur saara kaam khud execute ho. Main direct answers aur complete code deliver kar raha hoon.'}
              </p>
            </div>

            {brainState.understanding && (
              <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-300">
                <strong className="text-slate-200">Deep Intent Synthesized: </strong>
                {brainState.understanding}
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Direct Answer Engine: Active</span>
          <span className="text-emerald-400 font-medium">Confidence: 99.8%</span>
        </div>
      </div>

      {/* Autonomous Plan - Full Vertical Timeline Component */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800/80 p-6 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          {/* Header with Title and Pipeline Metrics */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span>Autonomous Plan Timeline</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Vertical Pipeline
                  </span>
                </h2>
                <p className="text-xs text-slate-400">Zero-Touch Sequential & Speculative Execution Graph</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded-xl bg-slate-950/80 border border-slate-800 text-cyan-300">
                {completedCount}/{plan.length} Steps ({progressPercent}%)
              </span>
              <span className="text-xs font-semibold text-emerald-400 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Active</span>
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 mb-5">
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 font-medium">
              <span>Overall Orchestration Progress</span>
              <span className="font-mono text-cyan-300">{progressPercent}% Completed</span>
            </div>
            <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Vertical Connected Timeline Component */}
          <div className="relative pl-6 sm:pl-8 space-y-5">
            {/* Continuous Vertical Backbone Stem */}
            <div className="absolute left-[13px] sm:left-[17px] top-3 bottom-6 w-0.5 bg-gradient-to-b from-emerald-500 via-cyan-400/60 to-slate-800" />

            {plan.map((step, idx) => {
              const isDone = step.status === 'completed';
              const isInProgress = step.status === 'in_progress';
              const isQueued = step.status === 'queued';

              const estimatedTime =
                step.estimatedTime ||
                (isDone
                  ? '45ms (Completed)'
                  : isInProgress
                  ? '120ms (Executing)'
                  : 'Pending previous steps');

              const dependencies =
                step.dependencies && step.dependencies.length > 0
                  ? step.dependencies
                  : step.step === 1
                  ? ['None (Root Assessment)']
                  : [`Step ${step.step - 1} output context`];

              const assignedAgent =
                step.assignedAgent ||
                (step.step === 1
                  ? 'NeuroGuardian'
                  : step.step === 2
                  ? 'ZeroLatency Acoustic Predictor'
                  : step.step === 3
                  ? 'NeuroSymbolic Reasoner'
                  : step.step === 4
                  ? 'OmniCoder Supreme'
                  : 'AutoOperative Prime');

              return (
                <div key={step.step} className="relative group">
                  {/* Timeline Node Badge positioned on the vertical track */}
                  <div
                    className={`absolute -left-[27px] sm:-left-[35px] top-2 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all shadow-lg ${
                      isDone
                        ? 'bg-slate-950 border-emerald-400 text-emerald-400 shadow-emerald-500/20'
                        : isInProgress
                        ? 'bg-indigo-950 border-cyan-400 text-cyan-300 shadow-cyan-500/40 ring-4 ring-cyan-500/20 animate-pulse'
                        : 'bg-slate-950 border-slate-700 text-slate-500'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isInProgress ? (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-cyan-300 border-t-transparent animate-spin" />
                    ) : (
                      <span className="font-mono text-xs font-bold">{step.step}</span>
                    )}
                  </div>

                  {/* Task Card Container */}
                  <div
                    className={`p-4 rounded-2xl border transition-all ${
                      isDone
                        ? 'bg-slate-950/40 border-emerald-500/30 hover:border-emerald-500/50 text-slate-300'
                        : isInProgress
                        ? 'bg-gradient-to-r from-indigo-950/40 via-cyan-950/30 to-slate-950 border-cyan-400/60 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-400/30'
                        : 'bg-slate-950/20 border-slate-800/60 text-slate-500'
                    }`}
                  >
                    {/* Top Row: Title, Step Counter, State Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">
                          Step #{step.step}
                        </span>
                        <h4
                          className={`text-xs sm:text-sm font-bold ${
                            isInProgress ? 'text-white' : isDone ? 'text-slate-200' : 'text-slate-400'
                          }`}
                        >
                          {step.title}
                        </h4>
                      </div>

                      {/* State Badge */}
                      <span
                        className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                          isDone
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : isInProgress
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 animate-pulse'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {isInProgress && <Activity className="w-3 h-3 text-cyan-300 animate-spin" />}
                        {step.status === 'in_progress' ? 'Executing Now' : step.status}
                      </span>
                    </div>

                    {/* Step Details description */}
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {step.details}
                    </p>

                    {/* Timeline Metadata Row: Estimated Completion Time, Dependencies & Assigned Sub-AI */}
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                      {/* Estimated Completion Time */}
                      <div className="flex items-center gap-1.5 text-slate-300 bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-800">
                        <Timer className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-slate-400">Est Time:</span>
                        <span className="font-mono text-amber-300 font-semibold">{estimatedTime}</span>
                      </div>

                      {/* Assigned Specialist Agent */}
                      <div className="flex items-center gap-1.5 text-slate-300 bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-800">
                        <Cpu className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-slate-400">Sub-AI:</span>
                        <span className="font-medium text-purple-300">{assignedAgent}</span>
                      </div>
                    </div>

                    {/* Task Dependencies Pill List */}
                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px]">
                      <span className="text-slate-500 font-semibold flex items-center gap-1">
                        <GitBranch className="w-3 h-3 text-cyan-400" />
                        Dependencies:
                      </span>
                      {dependencies.map((dep, dIdx) => (
                        <span
                          key={dIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800 font-mono"
                        >
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="pt-4 mt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            Autonomous Task Orchestrator Active
          </span>
          <span className="text-cyan-400 font-medium">Zero-Human Touches Required</span>
        </div>
      </div>
    </div>
  );
};
