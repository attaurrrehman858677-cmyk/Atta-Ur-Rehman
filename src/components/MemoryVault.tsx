import React, { useState } from 'react';
import { Database, Plus, Trash2, ShieldCheck, Bookmark, Check } from 'lucide-react';
import { UserMemory } from '../types/brain';

interface MemoryVaultProps {
  memories: UserMemory[];
  onAddMemory: (key: string, value: string, importance: 'critical' | 'high' | 'normal') => void;
  onDeleteMemory: (id: string) => void;
  onClearAll: () => void;
}

export const MemoryVault: React.FC<MemoryVaultProps> = ({
  memories,
  onAddMemory,
  onDeleteMemory,
  onClearAll,
}) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newImportance, setNewImportance] = useState<'critical' | 'high' | 'normal'>('high');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey.trim() || !newValue.trim()) return;
    onAddMemory(newKey.trim(), newValue.trim(), newImportance);
    setNewKey('');
    setNewValue('');
    setShowAdd(false);
  };

  return (
    <div className="rounded-3xl bg-slate-900/80 border border-slate-800/80 p-6 backdrop-blur-xl relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">Long-Term Memory Vault</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {memories.length} Permanent Records
              </span>
            </div>
            <p className="text-xs text-slate-400">
              &ldquo;Mujhe baar baar na bolna paray&rdquo; — Permanent memory so the AI never asks you to repeat yourself
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Nayi Baat Save Karein</span>
          </button>
          {memories.length > 4 && (
            <button
              onClick={onClearAll}
              className="p-1.5 rounded-xl hover:bg-red-950/30 text-slate-500 hover:text-red-400 transition-colors text-xs"
              title="Reset to default memories"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {showAdd && (
        <form onSubmit={handleCreate} className="mt-4 p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Habit or Rule Name (e.g. Preferred Wake-up Routine)"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              placeholder="Details / Behavior the AI must always remember"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="sm:col-span-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Importance:</span>
              {(['critical', 'high', 'normal'] as const).map((imp) => (
                <button
                  type="button"
                  key={imp}
                  onClick={() => setNewImportance(imp)}
                  className={`px-2 py-0.5 rounded-lg uppercase text-[10px] font-mono ${
                    newImportance === imp
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  {imp}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
              >
                Save to Brain
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Memories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
        {memories.map((mem) => (
          <div
            key={mem.id}
            className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start justify-between gap-3 group hover:border-emerald-500/30 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Bookmark className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-200">{mem.key}</span>
                  <span
                    className={`text-[9px] uppercase font-mono px-1.5 py-0.2 rounded ${
                      mem.importance === 'critical'
                        ? 'bg-rose-500/20 text-rose-300'
                        : mem.importance === 'high'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {mem.importance}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{mem.value}</p>
              </div>
            </div>

            <button
              onClick={() => onDeleteMemory(mem.id)}
              className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-950/40 text-slate-500 hover:text-red-400 transition-all text-xs"
              title="Delete memory"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
