import type { Track } from '../data/mockData';
import { usePlayer } from '../context/PlayerContext';

export function TrackRow({ track }: { track: Track }) {
  const { play, currentTrack, openPlayer } = usePlayer();
  const isActive = currentTrack?.id === track.id;

  const handleTap = () => {
    play(track);
    openPlayer();
  };

  return (
    <button
      onClick={handleTap}
      className="flex items-center gap-3 w-full px-4 py-2 active:opacity-70 transition-opacity"
    >
      <img
        src={track.coverUrl}
        alt={track.title}
        className="w-11 h-11 rounded object-cover flex-shrink-0"
      />
      <div className="flex-1 text-left min-w-0">
        <p
          className="text-sm truncate font-body"
          style={isActive ? { color: 'var(--color-accent)' } : undefined}
        >
          {track.title}
        </p>
        <p className="text-xs text-textSecondary truncate">{track.artist}</p>
      </div>
      <span className="text-xs text-textSecondary ml-2">{track.duration}</span>
    </button>
  );
}
