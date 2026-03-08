import { usePlayer } from '../context/PlayerContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { MarqueeText } from './MarqueeText';

export function MiniPlayer() {
  const { currentTrack, isPlaying, togglePlay } = usePlayer();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (!currentTrack || pathname === '/player') return null;

  return (
    <div className="absolute left-0 right-0 bottom-14 bg-surface border-t border-border z-40">
      <div className="flex items-center gap-3 px-4 py-2">
        <button onClick={() => navigate('/player')} className="flex items-center gap-3 flex-1 min-w-0">
          <img
            src={currentTrack.coverUrl}
            alt={currentTrack.title}
            className="w-9 h-9 rounded object-cover flex-shrink-0"
          />
          <div className="text-left min-w-0 overflow-hidden">
            <MarqueeText text={currentTrack.title} className="text-sm text-textPrimary font-body" threshold={22} />
            <MarqueeText text={currentTrack.artist} className="text-xs text-textSecondary" threshold={28} />
          </div>
        </button>
        <button onClick={togglePlay} className="text-accent min-w-[44px] min-h-[44px] flex items-center justify-center active:opacity-70">
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,3 19,12 5,21"/>
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16"/>
      <rect x="14" y="4" width="4" height="16"/>
    </svg>
  );
}
