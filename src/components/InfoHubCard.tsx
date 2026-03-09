import type { Track } from '../data/mockData';
import { ScrewHead } from './ScrewHead';
import { CassetteWindow } from './CassetteWindow';

interface InfoHubCardProps {
  currentTrack: Track;
  isPlaying: boolean;
  pitch: number;
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
