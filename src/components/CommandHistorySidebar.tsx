import React, { useState, useEffect, useMemo } from 'react';
import { 
  History, 
  Search, 
  X, 
  Play, 
  RotateCcw, 
  Mic, 
  Keyboard, 
  Zap, 
  Trash2, 
  Copy, 
  Check, 
  Sparkles,
  ArrowRight,
  Filter,
  Clock
} from 'lucide-react';
import { CommandHistoryItem } from '../types/brain';

interface CommandHistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: CommandHistoryItem[];
  onReRunCommand: (query: string, historyId?: string) => void;
  onClearHistory: () => void;
  onDeleteHistoryItem: (id: string) => void;
  isProcessing: boolean;
}

export const CommandHistorySidebar: React.FC<CommandHistorySidebarProps> = ({
  isOpen,
  onClose,
  history,
  onReRunCommand,
  onClearHistory,
  onDeleteHistoryItem,
  isProcessing,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'voice' | 'text' | 'quick_trigger'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered and searched history
  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchesSearch =
        item.query.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.summary && item.summary.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSource = sourceFilter === 'all' || item.source === sourceFilter;

      return matchesSearch && matchesSource;
    });
  }, [history, searchQuery, sourceFilter]);

  const handleCopy = (id: string, text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReRun = (item: CommandHistoryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onReRunCommand(item.query, item.id);
  };

  const getSourceIcon = (source: CommandHistoryItem['source']) => {
    switch (source) {
      case 'voice':
        return <Mic className="w-3.5 h-3.5 text-cyan-400" />;
      case 'quick_trigger':
        return <Zap className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Keyboard className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  const getSourceBadge = (source: CommandHistoryItem['source']) => {
    switch (source) {
      case 'voice':
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            <Mic className="w-3 h-3" />
            <span>Voice</span>
          </span>
        );
      case 'quick_trigger':
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
            <Zap className="w-3 h-3" />
            <span>Quick Trigger</span>
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
            <Keyboard className="w-3 h-3" />
            <span>Text</span>
          </span>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop blur */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Sidebar Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-slate-950/95 border-l border-slate-800 shadow-2xl backdrop-blur-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-slate-800/80 bg-slate-900/60">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-white">Command History</h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {history.length} logged
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Voice & text interactions • Click any command to re-run autonomously
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {history.length > 0 && (
                  <button
                    onClick={onClearHistory}
                    className="p-1.5 rounded-lg hover:bg-red-950/30 text-slate-400 hover:text-red-400 transition-colors"
                    title="Clear history"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="Close sidebar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative mb-3">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search past voice or text commands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Source Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
              {[
                { id: 'all', label: 'All', count: history.length },
                { id: 'voice', label: 'Voice', count: history.filter((h) => h.source === 'voice').length },
                { id: 'text', label: 'Text', count: history.filter((h) => h.source === 'text').length },
                { id: 'quick_trigger', label: 'Quick Actions', count: history.filter((h) => h.source === 'quick_trigger').length },
              ].map((filter) => {
                const isActive = sourceFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSourceFilter(filter.id as any)}
                    className={`px-2.5 py-1 rounded-lg font-medium text-[11px] whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                        : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                    }`}
                  >
                    <span>{filter.label}</span>
                    <span className="ml-1 opacity-60">({filter.count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* List of Past Commands */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredHistory.length === 0 ? (
              <div className="py-12 text-center text-slate-500 space-y-2">
                <History className="w-8 h-8 mx-auto opacity-30 text-slate-400" />
                <p className="text-xs">No matching commands found.</p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-cyan-400 hover:underline"
                  >
                    Clear search filter
                  </button>
                )}
              </div>
            ) : (
              filteredHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={(e) => handleReRun(item, e)}
                  className="group relative p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/50 transition-all cursor-pointer shadow-sm hover:shadow-lg hover:shadow-cyan-950/20"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      {getSourceBadge(item.source)}
                      {item.reRunCount > 0 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                          Re-run {item.reRunCount}x
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.formattedTime}
                      </span>
                      <button
                        onClick={(e) => handleCopy(item.id, item.query, e)}
                        className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                        title="Copy query"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteHistoryItem(item.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-950/40 text-slate-500 hover:text-red-400 transition-all"
                        title="Delete this record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Query Text */}
                  <h4 className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors mb-2 leading-relaxed">
                    &ldquo;{item.query}&rdquo;
                  </h4>

                  {/* Summary / Result preview */}
                  {item.summary && (
                    <p className="text-[11px] text-slate-400 line-clamp-2 mb-3 bg-slate-950/40 p-2 rounded-xl border border-slate-800/60">
                      {item.summary}
                    </p>
                  )}

                  {/* Action Bar / Re-run Trigger */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-500">
                      Click to re-run autonomous flow
                    </span>
                    <button
                      onClick={(e) => handleReRun(item, e)}
                      disabled={isProcessing}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-bold transition-all group-hover:bg-cyan-500 group-hover:text-slate-950"
                    >
                      <RotateCcw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                      <span>Re-Run</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800/80 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
            <span className="text-[11px]">Clicking any item re-executes AI reasoning</span>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
