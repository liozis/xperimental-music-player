import type { Track } from '../data/mockData';
import { ScrewHead } from './ScrewHead';

interface InfoHubCardProps {
  currentTrack: Track;
  isPlaying: boolean;
  pitch: number;
}

/** Reel speed: faster spin when pitch > 100, slower when < 100 */
function reelDuration(baseSecs: number, pitch: number): string {
  return `${(baseSecs / (pitch / 100)).toFixed(2)}s`;
}

/** Cassette Deck Window — two rotating reels with tape path */
function CassetteWindow({ isPlaying, pitch }: { isPlaying: boolean; pitch: number }) {
  const dur1 = reelDuration(2.4, pitch);
  const dur2 = reelDuration(3.0, pitch);
  const playState = isPlaying ? 'running' : 'paused';

  return (
    <svg
      viewBox="0 0 140 64"
      className="cassette-window w-full"
      aria-label="Tape Deck"
    >
      {/* Window frame */}
      <rect x="1" y="1" width="138" height="62" rx="4"
        fill="var(--color-lcd-bg, #0e1206)"
        stroke="rgba(0,0,0,0.7)" strokeWidth="1.2"
      />
      {/* Scanline sheen */}
      <rect x="1" y="1" width="138" height="30" rx="4"
        fill="rgba(255,255,255,0.03)"
      />

      {/* ── Left reel ── */}
      <g
        transform="translate(36,32)"
        style={{
          animation: `reel-spin ${dur1} linear infinite`,
          animationPlayState: playState,
          transformBox: 'fill-box',
          transformOrigin: 'center',
        }}
      >
        {/* Outer flange */}
        <circle r="20" fill="none" stroke="rgba(184,208,0,0.35)" strokeWidth="1.5" />
        {/* Reel body */}
        <circle r="11" fill="rgba(30,30,20,0.9)" stroke="rgba(184,208,0,0.5)" strokeWidth="1.2" />
        {/* Center hub */}
        <circle r="4.5" fill="rgba(184,208,0,0.6)" />
        <circle r="2" fill="rgba(0,0,0,0.5)" />
        {/* 3 spokes at 0°, 120°, 240° */}
        <line x1="0" y1="-4.5" x2="0" y2="-11" stroke="rgba(184,208,0,0.55)" strokeWidth="2" strokeLinecap="round" />
        <line x1="7.8" y1="2.25" x2="9.5" y2="9.5" stroke="rgba(184,208,0,0.55)" strokeWidth="2" strokeLinecap="round" />
        <line x1="-7.8" y1="2.25" x2="-9.5" y2="9.5" stroke="rgba(184,208,0,0.55)" strokeWidth="2" strokeLinecap="round" />
        {/* 3 outer tape holes */}
        <circle cx="0" cy="-15" r="2.5" fill="var(--color-lcd-bg, #0e1206)" />
        <circle cx="13" cy="7.5" r="2.5" fill="var(--color-lcd-bg, #0e1206)" />
        <circle cx="-13" cy="7.5" r="2.5" fill="var(--color-lcd-bg, #0e1206)" />
      </g>

      {/* ── Right reel (slightly smaller — tape feeding over) ── */}
      <g
        transform="translate(104,32)"
        style={{
          animation: `reel-spin ${dur2} linear infinite reverse`,
          animationPlayState: playState,
          transformBox: 'fill-box',
          transformOrigin: 'center',
        }}
      >
        <circle r="18" fill="none" stroke="rgba(184,208,0,0.30)" strokeWidth="1.5" />
        <circle r="10" fill="rgba(30,30,20,0.9)" stroke="rgba(184,208,0,0.45)" strokeWidth="1.2" />
        <circle r="4" fill="rgba(184,208,0,0.55)" />
        <circle r="1.8" fill="rgba(0,0,0,0.5)" />
        <line x1="0" y1="-4" x2="0" y2="-10" stroke="rgba(184,208,0,0.5)" strokeWidth="2" strokeLinecap="round" />
        <line x1="6.9" y1="2" x2="8.7" y2="8.7" stroke="rgba(184,208,0,0.5)" strokeWidth="2" strokeLinecap="round" />
        <line x1="-6.9" y1="2" x2="-8.7" y2="8.7" stroke="rgba(184,208,0,0.5)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="0" cy="-13.5" r="2.2" fill="var(--color-lcd-bg, #0e1206)" />
        <circle cx="11.7" cy="6.75" r="2.2" fill="var(--color-lcd-bg, #0e1206)" />
        <circle cx="-11.7" cy="6.75" r="2.2" fill="var(--color-lcd-bg, #0e1206)" />
      </g>

      {/* Tape path — magnetic tape running between reels */}
      <path
        d="M 55 44 L 56 52 L 85 52 L 85 44"
        fill="none"
        stroke="rgba(184,208,0,0.4)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="56" y1="44" x2="85" y2="44" stroke="rgba(184,208,0,0.6)" strokeWidth="1" />
    </svg>
  );
}

export function InfoHubCard({ currentTrack, isPlaying, pitch }: InfoHubCardProps) {
  return (
    <div
      className="info-hub-card hardware-panel relative bg-surface border border-border shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
      style={{ borderRadius: 'var(--radius-card)' }}
    >
      {/* Corner screws */}
      <span className="absolute top-[4px] left-[4px] z-10"><ScrewHead /></span>
      <span className="absolute top-[4px] right-[4px] z-10"><ScrewHead /></span>
      <span className="absolute bottom-[4px] left-[4px] z-10"><ScrewHead /></span>
      <span className="absolute bottom-[4px] right-[4px] z-10"><ScrewHead /></span>

      {/* Card label bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <span className="text-[10px] font-mono uppercase tracking-widest text-textSecondary">Info Hub</span>
        <span className="text-[10px] font-mono text-accent tracking-wider">
          {isPlaying ? '● REC' : '○ SBY'}
        </span>
      </div>

      {/* ── Metadata row + LCD readout panel ── */}
      <div className="flex items-center gap-2 px-3 pt-2.5 pb-2">
        {/* Track identity */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-mono font-bold text-textPrimary leading-tight truncate">
            {currentTrack.title}
          </p>
          <p className="text-[11px] font-mono text-textSecondary truncate mt-0.5">
            {currentTrack.artist}
          </p>
        </div>

        {/* LCD readout panel */}
        <div
          className="lcd-display flex-shrink-0 px-2.5 py-2 flex flex-col gap-0.5 items-end"
          style={{ borderRadius: 'var(--radius-card)' }}
        >
          <span className="data-readout text-[10px] font-mono tabular-nums text-[var(--color-lcd-text,#b8d000)]">
            320 KBPS
          </span>
          <span className="data-readout text-[10px] font-mono tabular-nums text-[var(--color-lcd-text,#b8d000)]">
            44.1 KHZ
          </span>
          <span className="data-readout text-[10px] font-mono tabular-nums text-[var(--color-lcd-text,#b8d000)]">
            STEREO
          </span>
        </div>
      </div>

      {/* ── Cassette Tape Deck Window ── */}
      <div className="mx-3 mb-2 overflow-hidden" style={{ borderRadius: 'var(--radius-card)' }}>
        <CassetteWindow isPlaying={isPlaying} pitch={pitch} />
      </div>

      {/* ── Pitch readout strip ── */}
      <div className="flex items-center justify-between px-3 pb-2.5">
        <span className="text-[9px] font-mono text-textSecondary uppercase tracking-[0.18em]">
          TAPE SPD
        </span>
        <span className="data-readout text-[11px] font-mono text-accent tabular-nums font-bold">
          {pitch}%
        </span>
      </div>
    </div>
  );
}
