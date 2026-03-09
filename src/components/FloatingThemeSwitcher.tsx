import { useState } from 'react';
import { useSkin } from '../context/SkinContext';
import type { SkinId } from '../context/SkinContext';

interface SkinMeta {
  id: SkinId;
  label: string;
  font: string;
  color: string;
  /** Pill background for the toggle button */
  pillBg: string;
  /** Pill border */
  pillBorder: string;
  /** Box-shadow / glow on the pill */
  pillGlow: string;
  /** Font size override for pill label */
  pillSize: string;
}

const SKIN_META: SkinMeta[] = [
  {
    id: 'cassette',
    label: 'Cassette Futurism',
    font: "'VT323', 'Share Tech Mono', monospace",
    color: '#ff5500',
    pillBg: 'linear-gradient(135deg, rgba(200,185,155,0.22), rgba(140,128,100,0.14))',
    pillBorder: '1px solid rgba(255,85,0,0.55)',
    pillGlow: '0 0 12px rgba(255,85,0,0.35), inset 0 1px 0 rgba(255,200,120,0.2)',
    pillSize: '15px',
  },
  {
    id: 'acidgrafix',
    label: 'Acidgrafix',
    font: "'Big Shoulders Display', 'Bebas Neue', sans-serif",
    color: '#00ff41',
    pillBg: 'rgba(0,255,65,0.04)',
    pillBorder: '1px solid #00ff41',
    pillGlow: '0 0 10px rgba(0,255,65,0.45), 0 0 22px rgba(0,255,65,0.18)',
    pillSize: '16px',
  },
  {
    id: 'metalheart',
    label: 'Metalheart',
    font: "'Orbitron', sans-serif",
    color: '#4fc3f7',
    pillBg: 'linear-gradient(135deg, rgba(79,195,247,0.10), rgba(10,20,45,0.82))',
    pillBorder: '1px solid rgba(79,195,247,0.45)',
    pillGlow: '0 0 12px rgba(79,195,247,0.38), inset 0 1px 0 rgba(255,255,255,0.08)',
    pillSize: '11px',
  },
  {
    id: 'medieval',
    label: 'Future Medieval',
    font: "'UnifrakturMaguntia', cursive",
    color: '#d4a017',
    pillBg: 'radial-gradient(ellipse, rgba(212,160,23,0.10), rgba(12,8,1,0.88))',
    pillBorder: '1px solid rgba(122,92,18,0.8)',
    pillGlow: '0 0 8px rgba(212,160,23,0.32), 0 0 18px rgba(212,160,23,0.12)',
    pillSize: '13px',
  },
];

export function FloatingThemeSwitcher() {
  const { skin, setSkin } = useSkin();
  const [open, setOpen] = useState(false);
  const current = SKIN_META.find(s => s.id === skin) ?? SKIN_META[0];

  return (
    <div className="fixed top-1/2 -translate-y-1/2 z-[9999]" style={{ left: 'calc(50% + 230px)' }}>

      {/* ── Toggle pill ─────────────────────────────────────── */}
      <button
        onClick={() => setOpen(o => !o)}
        className="px-3 py-2 rounded-full tracking-wider uppercase transition-all duration-300"
        style={{
          background:           current.pillBg,
          backdropFilter:       'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border:               current.pillBorder,
          boxShadow:            current.pillGlow,
          color:                current.color,
          fontFamily:           current.font,
          fontSize:             current.pillSize,
          letterSpacing:        '0.08em',
          minWidth:             '100px',
          textAlign:            'center',
        }}
      >
        {open ? '✕  close' : current.label}
      </button>

      {/* ── Dropdown panel ──────────────────────────────────── */}
      {open && (
        <div
          className="absolute right-0 mt-3 w-56 p-4 shadow-2xl"
          style={{
            background:           'rgba(4,4,6,0.92)',
            backdropFilter:       'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border:               '1px solid rgba(255,255,255,0.08)',
            borderRadius:         '14px',
          }}
        >
          <p
            className="mb-3"
            style={{
              fontSize: '9px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)',
              fontFamily: 'Share Tech Mono, monospace',
            }}
          >
            Select Mood
          </p>

          <div className="flex flex-col gap-0.5">
            {SKIN_META.map(s => (
              <button
                key={s.id}
                onClick={() => { setSkin(s.id); setOpen(false); }}
                className="text-left px-3 py-2.5 transition-all duration-200 w-full"
                style={{
                  fontFamily:   s.font,
                  color:        s.color,
                  fontSize:     s.pillSize,
                  letterSpacing: '0.04em',
                  borderRadius: '8px',
                  background:   skin === s.id
                    ? `linear-gradient(90deg, ${s.color}18, ${s.color}08)`
                    : 'transparent',
                  borderLeft:   skin === s.id
                    ? `2px solid ${s.color}`
                    : '2px solid transparent',
                  paddingLeft:  skin === s.id ? '10px' : '12px',
                  boxShadow:    skin === s.id ? s.pillGlow : 'none',
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
