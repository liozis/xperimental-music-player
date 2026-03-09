/** Reel duration in seconds at the given pitch percentage */
function reelDuration(baseSecs: number, pitch: number): string {
  return `${(baseSecs / (pitch / 100)).toFixed(2)}s`;
}

interface CassetteWindowProps {
  isPlaying: boolean;
  pitch: number;
  /** CSS class forwarded to the <svg> root */
  className?: string;
}

/**
 * CSS-animated cassette tape deck window.
 * Two reels counter-rotate; speed tracks the pitch value.
 */
export function CassetteWindow({ isPlaying, pitch, className = '' }: CassetteWindowProps) {
  const dur1      = reelDuration(2.4, pitch);
  const dur2      = reelDuration(3.0, pitch);
  const playState = isPlaying ? 'running' : 'paused';

  return (
    <svg
      viewBox="0 0 140 64"
      className={`cassette-window w-full ${className}`}
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
        } as React.CSSProperties}
      >
        <circle r="20" fill="none" stroke="rgba(184,208,0,0.35)" strokeWidth="1.5" />
        <circle r="11" fill="rgba(30,30,20,0.9)" stroke="rgba(184,208,0,0.5)" strokeWidth="1.2" />
        <circle r="4.5" fill="rgba(184,208,0,0.6)" />
        <circle r="2" fill="rgba(0,0,0,0.5)" />
        <line x1="0" y1="-4.5" x2="0" y2="-11" stroke="rgba(184,208,0,0.55)" strokeWidth="2" strokeLinecap="round" />
        <line x1="7.8" y1="2.25" x2="9.5" y2="9.5" stroke="rgba(184,208,0,0.55)" strokeWidth="2" strokeLinecap="round" />
        <line x1="-7.8" y1="2.25" x2="-9.5" y2="9.5" stroke="rgba(184,208,0,0.55)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="0" cy="-15" r="2.5" fill="var(--color-lcd-bg, #0e1206)" />
        <circle cx="13" cy="7.5" r="2.5" fill="var(--color-lcd-bg, #0e1206)" />
        <circle cx="-13" cy="7.5" r="2.5" fill="var(--color-lcd-bg, #0e1206)" />
      </g>

      {/* ── Right reel (slightly smaller) ── */}
      <g
        transform="translate(104,32)"
        style={{
          animation: `reel-spin ${dur2} linear infinite reverse`,
          animationPlayState: playState,
          transformBox: 'fill-box',
          transformOrigin: 'center',
        } as React.CSSProperties}
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

      {/* Tape path between reels */}
      <path
        d="M 55 44 L 56 52 L 85 52 L 85 44"
        fill="none" stroke="rgba(184,208,0,0.4)" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
      <line x1="56" y1="44" x2="85" y2="44" stroke="rgba(184,208,0,0.6)" strokeWidth="1" />
    </svg>
  );
}
