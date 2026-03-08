import { useState } from 'react';
import { useSkin } from '../context/SkinContext';
import type { SkinId } from '../context/SkinContext';

const SKIN_META: { id: SkinId; label: string; font: string; color: string }[] = [
  { id: 'cassette',   label: 'Cassette Futurism', font: "'Electrolize', monospace",         color: '#ff6a00' },
  { id: 'acidgrafix', label: 'Acidgrafix',         font: "'Bebas Neue', sans-serif",         color: '#00ff41' },
  { id: 'metalheart', label: 'Metalheart',         font: "'Orbitron', sans-serif",           color: '#4fc3f7' },
  { id: 'medieval',   label: 'Future Medieval',    font: "'UnifrakturMaguntia', cursive",    color: '#cc1100' },
];

export function FloatingThemeSwitcher() {
  const { skin, setSkin } = useSkin();
  const [open, setOpen] = useState(false);
  const current = SKIN_META.find(s => s.id === skin) ?? SKIN_META[0];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[9999]">
      {/* Toggle pill */}
      <button
        onClick={() => setOpen(o => !o)}
        className="px-3 py-2 rounded-full text-xs tracking-wider uppercase transition-all"
        style={{
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: current.color,
          fontFamily: current.font,
        }}
      >
        {open ? '✕' : current.label}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute right-0 mt-3 w-52 rounded-2xl p-4 shadow-2xl"
          style={{
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">
            Mood
          </p>
          <div className="flex flex-col gap-1">
            {SKIN_META.map(s => (
              <button
                key={s.id}
                onClick={() => { setSkin(s.id); setOpen(false); }}
                className="text-left px-3 py-2 rounded-lg transition-colors"
                style={{
                  fontFamily: s.font,
                  color: s.color,
                  fontSize: '14px',
                  background: skin === s.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
