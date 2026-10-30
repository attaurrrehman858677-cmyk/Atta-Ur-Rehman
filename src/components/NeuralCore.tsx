import { Brain, Cpu, Zap, Activity, Radio, Sparkles, ShieldCheck, Volume2 } from 'lucide-react';
import { BrainState } from '../types/brain';

interface NeuralCoreProps {
  brainState: BrainState;
  onTriggerAutopilot: () => void;
  audioLevel: number;
  onTestVoice?: () => void;
}

export const NeuralCore: React.FC<NeuralCoreProps> = ({
  brainState,
  onTriggerAutopilot,
  audioLevel,
  onTestVoice,
}) => {
  const isThinking = brainState.isThinking;
  const isListening = brainState.isListening;
  const isSpeaking = brainState.isSpeaking;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-900/90 border border-indigo-500/30 p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-indigo-950/40">
      {/* Background Neural Matrix Grid */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.4) 0%, transparent 65%), linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 28px 28px, 28px 28px',
        }}
      />

      {/* Top Status Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/40 text-indigo-400">
            <Brain className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-100 to-cyan-300 bg-clip-text text-transparent">
                NeuroMind AGI
              </h1>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                Self-Operating Brain OS
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2 flex-wrap">
              <span>Zero-Human Touch • Human-like Cognitive Architecture • Continuous Voice Engine</span>
              <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                <span>Mic:</span>
                <strong>Ctrl+Space</strong>
              </kbd>
            </p>
          </div>
        </div>

        {/* Cognitive Vital Gauges */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Autonomous IQ: <strong className="text-emerald-300 font-mono">{brainState.autonomousIQ}</strong></span>
          </div>

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>Cognitive Load: <strong className="text-indigo-300 font-mono">{isThinking ? '88%' : '24%'}</strong></span>
          </div>

          {onTestVoice && (
            <button
              onClick={onTestVoice}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all"
              title="Click to hear AI voice output"
            >
              <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-bounce text-cyan-400' : 'text-cyan-400'}`} />
              <span>{isSpeaking ? 'AI Bol Raha Hai...' : 'Awaaz Suniye'}</span>
            </button>
          )}

          <button
            onClick={onTriggerAutopilot}
            disabled={isThinking}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-lg ${
              brainState.autoPilotEnabled
                ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-emerald-500/20 border border-emerald-400/40'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/20 hover:from-indigo-500 hover:to-purple-500 border border-indigo-400/40'
            }`}
          >
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{isThinking ? 'AI Soch Raha Hai...' : 'Sab AI Khud Sambhal Le'}</span>
          </button>
        </div>
      </div>

      {/* Centerpiece: Living Neural Synapse Core */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 py-8">
        {/* Left: Human-like Perception & Empathy */}
        <div className="flex-1 space-y-4 max-w-sm">
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                Dimagi Perception (Awareness)
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                Active 24/7
              </span>
            </div>
            <p className="text-sm font-medium text-slate-200">
              {brainState.currentIntent || 'AI aapki voice aur mahol ko continuously monitor kar raha hai. Bolne ki zarurat bhi nahi, system khud predict karta hai.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Zero-Touch Guarantee
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">100% Autonomous</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              No manual typing, no opening/closing separate software. Everything is synthesized, executed, and stored automatically.
            </p>
          </div>
        </div>

        {/* Center: The Bioluminescent Brain Orb */}
        <div className="relative flex items-center justify-center">
          {/* Outer Pulsing Synaptic Waves */}
          <div 
            className="absolute rounded-full border border-cyan-500/20 transition-all duration-300"
            style={{
              width: `${240 + audioLevel * 70}px`,
              height: `${240 + audioLevel * 70}px`,
              opacity: 0.4 + audioLevel * 0.4,
              boxShadow: isListening || isSpeaking ? '0 0 50px rgba(6, 182, 212, 0.4)' : 'none',
            }}
          />
          <div 
            className="absolute rounded-full border border-indigo-500/30 transition-all duration-500"
            style={{
              width: `${200 + audioLevel * 50}px`,
              height: `${200 + audioLevel * 50}px`,
            }}
          />

          {/* Central Holographic Brain Orb */}
          <div 
            onClick={onTriggerAutopilot}
            className={`relative cursor-pointer flex flex-col items-center justify-center w-48 h-48 rounded-full transition-all duration-700 select-none ${
              isThinking
                ? 'bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 shadow-2xl shadow-purple-500/50 scale-105'
                : isSpeaking
                ? 'bg-gradient-to-tr from-cyan-600 via-teal-600 to-indigo-600 shadow-2xl shadow-cyan-500/50 scale-105'
                : isListening
                ? 'bg-gradient-to-tr from-indigo-700 via-blue-600 to-cyan-500 shadow-2xl shadow-indigo-500/40 animate-brain-pulse'
                : 'bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 shadow-xl shadow-indigo-950 border border-indigo-500/40 hover:scale-105'
            }`}
          >
            {/* Inner dynamic core */}
            <div className="absolute inset-2 rounded-full border border-white/20 bg-slate-950/30 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
              <Brain className={`w-12 h-12 text-white mb-2 transition-transform duration-500 ${isThinking ? 'rotate-12 scale-110' : ''}`} />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                {isThinking ? 'Thinking...' : isSpeaking ? 'Speaking...' : isListening ? 'Listening...' : 'NeuroMind'}
              </span>
              <span className="text-[10px] text-cyan-200/80 font-mono mt-0.5">
                {isListening ? 'Voice Channel Open' : 'Ready • Zero-Touch'}
              </span>
            </div>

            {/* Simulated Live Sound Wave Rings */}
            {(isListening || isSpeaking) && (
              <div className="absolute -bottom-3 flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-400/50 shadow-md">
                <span className="w-1 h-3 bg-cyan-400 rounded-full animate-soundwave-1" />
                <span className="w-1 h-5 bg-cyan-300 rounded-full animate-soundwave-2" />
                <span className="w-1 h-7 bg-cyan-400 rounded-full animate-soundwave-3" />
                <span className="w-1 h-4 bg-cyan-300 rounded-full animate-soundwave-4" />
                <span className="w-1 h-2 bg-cyan-400 rounded-full animate-soundwave-5" />
              </div>
            )}
          </div>
        </div>

        {/* Right: Human Empathy & Autonomous State */}
        <div className="flex-1 space-y-4 max-w-sm">
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Insan Jaisa Dimag (Cognition)
              </span>
              <span className="text-[10px] text-amber-300 font-mono">Synaptic Depth 99.4%</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Natural emotional intelligence and proactive reasoning. It doesn&apos;t just follow commands; it thinks ahead, prevents mistakes, and coordinates specialized sub-AIs.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Sub-AI Auto-Evolution
              </span>
              <span className="text-[10px] text-purple-300 font-mono">Autonomous Factory</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              When encountering complex tasks, NeuroMind autonomously architects, codes, and spawns higher-intelligence specialized agents.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
