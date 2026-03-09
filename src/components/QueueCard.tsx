import type { Track } from '../data/mockData';

interface QueueCardProps {
  tracks: Track[];
  onPlay: (track: Track) => void;
}

export function QueueCard({ tracks, onPlay }: QueueCardProps) {
  return (
    <div
      className="bg-surface border border-border shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex flex-col"
      style={{ borderRadius: 'var(--radius-card)' }}
    >
      {/* Card label bar */}
      <div className="card-title-bar flex items-center justify-between px-3 py-2 border-b border-border flex-shrink-0">
        <span className="text-[10px] font-mono uppercase tracking-widest text-textSecondary">Up Next</span>
        <span className="text-[10px] font-mono text-textSecondary">{tracks.length} tracks</span>
      </div>

      {/* Queue rows */}
      <div className="flex flex-col">
        {tracks.map((track, i) => (
          <button
            key={track.id}
            onClick={() => onPlay(track)}
            className={`flex items-center gap-3 w-full px-3 py-2 active:opacity-70 transition-opacity text-left ${
              i < tracks.length - 1 ? 'border-b border-border/50' : ''
            }`}
          >
            <span className="text-[10px] font-mono text-textSecondary w-4 flex-shrink-0 tabular-nums">
              {i + 1}
            </span>
            <img
              src={track.coverUrl}
              alt={track.title}
              className="w-9 h-9 object-cover flex-shrink-0"
              style={{ borderRadius: 'var(--radius-card)' }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-textPrimary font-body truncate">{track.title}</p>
              <p className="text-xs text-textSecondary truncate">{track.artist}</p>
            </div>
            <span className="text-[10px] font-mono text-textSecondary ml-2 flex-shrink-0 tabular-nums">
              {track.duration}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
