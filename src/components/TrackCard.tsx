import type { Track } from '../data/mockData';
import { usePlayer } from '../context/PlayerContext';
import { useNavigate } from 'react-router-dom';
import { MarqueeText } from './MarqueeText';

export function TrackCard({ track }: { track: Track }) {
  const { play } = usePlayer();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => { play(track); navigate('/player'); }}
      className="flex-shrink-0 flex flex-col gap-2 active:opacity-70 transition-opacity min-w-[140px] w-[140px]"
    >
      <img
        src={track.coverUrl}
        alt={track.title}
        className="w-[140px] h-[140px] rounded-card object-cover"
      />
      <div className="text-left w-full overflow-hidden">
        <MarqueeText text={track.title} className="text-xs font-body text-textPrimary" />
        <p className="text-xs text-textSecondary truncate">{track.artist}</p>
      </div>
    </button>
  );
}
