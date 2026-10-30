import React, { useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Radio, Sparkles, Send, Globe, HelpCircle } from 'lucide-react';

interface VoiceControllerProps {
  isListening: boolean;
  isSpeaking: boolean;
  continuousMode: boolean;
  speechMuted: boolean;
  transcriptLive: string;
  audioLevel: number;
  micPermissionDenied?: boolean;
  onToggleListening: () => void;
  onToggleContinuous: () => void;
  onToggleMute: () => void;
  onSendTextQuery: (text: string) => void;
  onTestVoice?: () => void;
  onRestartMic?: () => void;
  language: 'auto' | 'ur-PK' | 'en-US';
  onChangeLanguage: (lang: 'auto' | 'ur-PK' | 'en-US') => void;
}

export const VoiceController: React.FC<VoiceControllerProps> = ({
  isListening,
  isSpeaking,
  continuousMode,
  speechMuted,
  transcriptLive,
  audioLevel,
  micPermissionDenied,
  onToggleListening,
  onToggleContinuous,
  onToggleMute,
  onSendTextQuery,
  onTestVoice,
  onRestartMic,
  language,
  onChangeLanguage,
}) => {
  const [manualText, setManualText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualText.trim()) return;
    onSendTextQuery(manualText.trim());
    setManualText('');
  };

  const quickVocalPhrases = [
    'Sab AI khud sambhal le, mujhe kuch na karna paray',
    'Ek specialized coder AI agent spawn karo jo apps banaye',
    'Mera poora din ka schedule aur tasks automate karo',
    'Synthesize the latest 2026 tech breakthroughs autonomously',
  ];

  return (
    <div className="sticky bottom-4 z-40 max-w-4xl mx-auto px-4">
      <div className="relative rounded-3xl bg-slate-950/90 border border-indigo-500/40 p-4 backdrop-blur-2xl shadow-2xl shadow-indigo-950/80">
        {/* Mic Permission Alert Banner if blocked */}
        {micPermissionDenied && (
          <div className="mb-3 p-3 rounded-2xl bg-rose-950/90 border border-rose-500/50 flex items-center justify-between gap-3 text-xs text-rose-200">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-rose-500/20 text-rose-400 font-bold">⚠️</span>
              <span><strong>Microphone Band Hai!</strong> Browser ne mic access block kiya hai. Browser address bar mein lock/mic icon par click karke Allow karein.</span>
            </div>
            {onRestartMic && (
              <button
                type="button"
                onClick={onRestartMic}
                className="px-3 py-1.5 rounded-xl bg-rose-500 text-white font-bold text-xs hover:bg-rose-400 transition-colors whitespace-nowrap"
              >
                🎙️ Mic Re-Open Karein
              </button>
            )}
          </div>
        )}

        {/* Live Audio / Voice Feedback Ribbon */}
        {(transcriptLive || isListening || isSpeaking) && (
          <div className="mb-3 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-cyan-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span className="font-semibold">
                {isSpeaking ? '🔊 AI Bol Raha Hai...' : isListening ? '🟢 Mic Khula Hai (Sun Raha Hoon)...' : 'Voice Stream'}
              </span>
            </div>
            <div className="flex-1 truncate text-slate-200 font-medium italic">
              {transcriptLive ? `“${transcriptLive}”` : isSpeaking ? 'Delivering speech response...' : 'Boliye, NeuroMind aapki aawaz sun raha hai...'}
            </div>
          </div>
        )}

        {/* Main Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Mic Activation Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleListening}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md group ${
                isListening
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-black shadow-emerald-500/30 ring-2 ring-emerald-400'
                  : 'bg-gradient-to-r from-amber-500/30 via-indigo-600/40 to-cyan-600/30 hover:from-amber-500/40 hover:to-cyan-600/40 text-amber-200 border border-amber-400/50 animate-pulse'
              }`}
              title="Toggle Voice Listening (or press Ctrl + Space from anywhere)"
            >
              {isListening ? (
                <>
                  <Mic className="w-4 h-4 text-slate-950 animate-bounce" />
                  <span>🟢 Mic Khula Hai (Active)</span>
                </>
              ) : (
                <>
                  <MicOff className="w-4 h-4 text-amber-300" />
                  <span>🎙️ Mic Kholiye (Voice Start)</span>
                </>
              )}
              <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/40 text-cyan-200 border border-cyan-500/30">
                Ctrl+Space
              </kbd>
            </button>

            {/* Continuous Mode Toggle */}
            <button
              onClick={onToggleContinuous}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                continuousMode
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="Continuous Hands-Free Mode: Auto-restarts mic so you never have to click or repeat"
            >
              <span className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                <span>Hands-Free {continuousMode ? 'ON' : 'OFF'}</span>
              </span>
            </button>

            {/* Audio Speech Mute / Unmute with prominent state indicator */}
            <button
              onClick={onToggleMute}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                speechMuted
                  ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/50 animate-pulse'
                  : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
              }`}
              title={speechMuted ? 'Awaaz band hai. Click karke Awaaz ON karein!' : 'Awaaz khuli hai 100%. Click karke mute kar sakte hain.'}
            >
              {speechMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-rose-400" />
                  <span>Awaaz OFF (Click to ON)</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>🔊 Awaaz 100% Khuli Hai</span>
                </>
              )}
            </button>

            {/* Direct Voice Test Button */}
            {onTestVoice && (
              <button
                type="button"
                onClick={onTestVoice}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500/30 to-blue-600/30 hover:from-cyan-500/40 hover:to-blue-600/40 text-cyan-200 border border-cyan-400/50 text-xs font-extrabold transition-all shadow-md active:scale-95"
                title="Awaaz Suniye: Click karein aur AI foran bol kar sunayega"
              >
                <Volume2 className={`w-3.5 h-3.5 text-cyan-300 ${isSpeaking ? 'animate-bounce' : 'animate-pulse'}`} />
                <span>{isSpeaking ? 'AI Bol Raha Hai...' : '🔊 Bol Kar Sunayein'}</span>
              </button>
            )}
          </div>

          {/* Center: Language selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            {(['auto', 'ur-PK', 'en-US'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => onChangeLanguage(lang)}
                className={`px-2 py-1 rounded-lg font-medium text-[11px] transition-all ${
                  language === lang
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'auto' ? 'Auto (Urdu/Eng)' : lang === 'ur-PK' ? 'اردو' : 'English'}
              </button>
            ))}
          </div>

          {/* Right: Fallback text box if user prefers typing */}
          <form onSubmit={handleSubmit} className="flex-1 sm:flex-initial flex items-center gap-1.5 min-w-[240px]">
            <input
              type="text"
              value={manualText}
              onChange={(e) => setManualText(e.target.value)}
              placeholder="Aap bol sakte hain ya likh bhi sakte hain..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={!manualText.trim()}
              className="p-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Quick Voice Triggers */}
        <div className="mt-3 pt-2.5 border-t border-slate-900/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1 whitespace-nowrap">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            Quick Voice Commands:
          </span>
          {quickVocalPhrases.map((phrase, idx) => (
            <button
              key={idx}
              onClick={() => onSendTextQuery(phrase)}
              className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-[11px] text-slate-300 hover:text-cyan-300 border border-slate-800/80 transition-colors whitespace-nowrap"
            >
              &ldquo;{phrase}&rdquo;
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
