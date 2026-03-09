import type { Track } from '../data/mockData';

interface MainPlayerCardProps {
  currentTrack: Track;
  isPlaying: boolean;
  progress: number;
  shuffle: boolean;
  repeat: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (v: number) => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
  className?: string;
}

export function MainPlayerCard({
  currentTrack,
  isPlaying,
  progress,
  shuffle,
  repeat,
  onTogglePlay,
  onNext,
  onPrev,
  onSeek,
  onToggleShuffle,
  onToggleRepeat,
  className = '',
}: MainPlayerCardProps) {
  function parseDuration(d: string): number {
    const [m, s] = d.split(':').map(Number);
    return (m || 0) * 60 + (s || 0);
  }
  const totalSecs  = parseDuration(currentTrack.duration);
  const elapsedSec = Math.floor((progress / 100) * totalSecs);
  const elapsed = `${Math.floor(elapsedSec / 60)}:${String(elapsedSec % 60).padStart(2, '0')}`;

  return (
    <div
      className={`bg-surface border border-border shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex flex-col ${className}`}
      style={{ borderRadius: 'var(--radius-card)' }}
    >
      {/* Card label bar */}
      <div
        className="card-title-bar flex items-center justify-between px-3 py-2 border-b border-border"
        style={{ borderRadius: `var(--radius-card) var(--radius-card) 0 0` }}
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-textSecondary">Main Player</span>
        <span className="text-[10px] font-mono text-accent">▶</span>
      </div>

      {/* Cover Art + Track Info */}
      <div className="flex items-center gap-3 px-3 pt-3">
        <img
          src={currentTrack.coverUrl}
          alt={currentTrack.title}
          className="w-[72px] h-[72px] object-cover flex-shrink-0"
          style={{ borderRadius: 'var(--radius-card)' }}
        />
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-display text-textPrimary leading-tight truncate">
            {currentTrack.title}
          </h2>
          <p className="text-sm text-textSecondary font-body truncate">{currentTrack.artist}</p>
        </div>
      </div>

      {/* ── Audio Visualizer Placeholder ────────────────────────── */}
      <div
        id="visualizer-container"
        aria-label="Audio Visualizer"
        className="mx-3 mt-3 flex-1 min-h-[80px] border border-dashed border-border bg-bg/60 flex items-center justify-center"
        style={{ borderRadius: 'var(--radius-card)' }}
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-textSecondary/40 select-none">
          [ Audio Visualizer ]
        </span>
      </div>

      {/* Progress Bar */}
      <div className="px-3 mt-3">
        <input
          type="range" min={0} max={100} value={progress}
          onChange={e => onSeek(Number(e.target.value))}
          className="w-full accent-[var(--color-accent)] h-1"
        />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] font-mono text-textSecondary tabular-nums">{elapsed}</span>
          <span className="text-[10px] font-mono text-textSecondary tabular-nums">{currentTrack.duration}</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-between px-8 mt-1 pb-5">
        <button
          onClick={onToggleShuffle}
          className={`p-2 transition-colors ${shuffle ? 'text-accent' : 'text-textSecondary'}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16,3 21,3 21,8"/>
            <line x1="4" y1="20" x2="21" y2="3"/>
            <polyline points="21,16 21,21 16,21"/>
            <line x1="4" y1="4" x2="9" y2="9"/>
          </svg>
        </button>

        <button onClick={onPrev} className="text-textPrimary active:text-accent p-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="19,20 9,12 19,4"/>
            <line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>

        {/* Standard play/pause — hidden for Cassette skin via CSS (.cassette-dual-controls visible instead) */}
        <button
          onClick={onTogglePlay}
          className="play-pause-btn w-14 h-14 rounded-full bg-accent flex items-center justify-center active:opacity-80 transition-opacity"
        >
          {isPlaying
            ? <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-bg)"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            : <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-bg)"><polygon points="5,3 19,12 5,21"/></svg>
          }
        </button>

        {/* Cassette dual Play + Pause physical buttons — hidden by default, shown for cassette skin via CSS */}
        <div className="cassette-dual-controls">
          {/* Play: pressed inset when isPlaying, raised when paused */}
          <button
            onClick={() => { if (!isPlaying) onTogglePlay(); }}
            className={`cassette-deck-btn cassette-play-btn${isPlaying ? ' is-active' : ''}`}
            aria-label="Play"
          >
            <span className="deck-grip" aria-hidden="true"/>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          </button>
          {/* Pause: pressed inset when paused, raised when playing */}
          <button
            onClick={() => { if (isPlaying) onTogglePlay(); }}
            className={`cassette-deck-btn cassette-pause-btn${!isPlaying ? ' is-active' : ''}`}
            aria-label="Pause"
          >
            <span className="deck-grip" aria-hidden="true"/>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"/>
              <rect x="14" y="4" width="4" height="16"/>
            </svg>
          </button>
        </div>

        <button onClick={onNext} className="text-textPrimary active:text-accent p-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,4 15,12 5,20"/>
            <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>

        <button
          onClick={onToggleRepeat}
          className={`p-2 transition-colors ${repeat ? 'text-accent' : 'text-textSecondary'}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="17,1 21,5 17,9"/>
            <path d="M3,11V9a4,4,0,0,1,4-4h14"/>
            <polyline points="7,23 3,19 7,15"/>
            <path d="M21,13v2a4,4,0,0,1-4,4H3"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
