import { usePlayer } from '../context/PlayerContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { TRACKS } from '../data/mockData';

const EQ_BANDS = [
  { id: 'eq-60hz',  label: '60Hz' },
  { id: 'eq-230hz', label: '230Hz' },
  { id: 'eq-910hz', label: '910Hz' },
  { id: 'eq-4khz',  label: '4kHz' },
  { id: 'eq-14khz', label: '14kHz' },
];

export function PlayerScreen() {
  const { currentTrack, isPlaying, togglePlay, next, prev, progress, setProgress, play, queue } = usePlayer();
  const navigate = useNavigate();
  const [eqValues, setEqValues] = useState<Record<string, number>>({
    'eq-60hz': 60, 'eq-230hz': 45, 'eq-910hz': 50, 'eq-4khz': 40, 'eq-14khz': 55,
  });
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Reset like state when track changes
  useEffect(() => { setIsLiked(false); }, [currentTrack?.id]);

  if (!currentTrack) return null;

  // Convert EQ 0-100 to dB string (-12 to +12)
  const toDB = (v: number) => {
    const db = ((v / 100) * 24 - 12).toFixed(0);
    return Number(db) > 0 ? `+${db}` : db;
  };

  // Up Next: next 4 tracks wrapping around
  const currentIdx = queue.findIndex(t => t.id === currentTrack.id);
  const upNext = Array.from({ length: 4 }, (_, i) => {
    const idx = (currentIdx + 1 + i) % TRACKS.length;
    return TRACKS[idx];
  });

  return (
    <div className="absolute inset-0 bg-bg z-50 flex flex-col overflow-hidden">
      {/* Header — no hamburger, only back + heart */}
      <div className="flex items-center justify-between px-4 pt-6 pb-2 flex-shrink-0">
        <button onClick={() => navigate(-1)} className="text-textSecondary active:text-accent p-2 -ml-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"/>
          </svg>
        </button>
        <p className="text-xs font-mono text-textSecondary tracking-widest uppercase">Now Playing</p>
        <button
          onClick={() => setIsLiked(l => !l)}
          className={`p-2 -mr-2 transition-colors ${isLiked ? 'text-accent' : 'text-textSecondary active:text-accent'}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      {/* Cover Art + Track Info */}
      <div className="flex items-center gap-4 px-4 flex-shrink-0">
        <img
          src={currentTrack.coverUrl}
          alt={currentTrack.title}
          className="w-[72px] h-[72px] rounded object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-display text-textPrimary leading-tight truncate">
            {currentTrack.title}
          </h2>
          <p className="text-sm text-textSecondary font-body truncate">{currentTrack.artist}</p>
          <p className="text-xs text-textSecondary font-mono mt-0.5 truncate">{currentTrack.album}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 mt-4 flex-shrink-0">
        <input
          type="range" min={0} max={100} value={progress}
          onChange={e => setProgress(Number(e.target.value))}
          className="w-full accent-[var(--color-accent)] h-1"
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs font-mono text-textSecondary">
            {String(Math.floor((progress / 100) * 4)).padStart(1, '0')}:
            {String(Math.floor(((progress / 100) * 4 * 60) % 60)).padStart(2, '0')}
          </span>
          <span className="text-xs font-mono text-textSecondary">{currentTrack.duration}</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-between px-8 mt-2 flex-shrink-0">
        <button onClick={() => setShuffle(s => !s)} className={`p-2 transition-colors ${shuffle ? 'text-accent' : 'text-textSecondary'}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16,3 21,3 21,8"/><line x1="4" y1="20" x2="21" y2="3"/>
            <polyline points="21,16 21,21 16,21"/><line x1="4" y1="4" x2="9" y2="9"/>
          </svg>
        </button>
        <button onClick={prev} className="text-textPrimary active:text-accent p-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="19,20 9,12 19,4"/>
            <line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
        <button onClick={togglePlay} className="w-14 h-14 rounded-full bg-accent flex items-center justify-center active:opacity-80 transition-opacity">
          {isPlaying
            ? <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-bg)"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            : <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-bg)"><polygon points="5,3 19,12 5,21"/></svg>
          }
        </button>
        <button onClick={next} className="text-textPrimary active:text-accent p-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,4 15,12 5,20"/>
            <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
        <button onClick={() => setRepeat(r => !r)} className={`p-2 transition-colors ${repeat ? 'text-accent' : 'text-textSecondary'}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="17,1 21,5 17,9"/><path d="M3,11V9a4,4,0,0,1,4-4h14"/>
            <polyline points="7,23 3,19 7,15"/><path d="M21,13v2a4,4,0,0,1-4,4H3"/>
          </svg>
        </button>
      </div>

      {/* Interactive EQ with dB readout */}
      <div className="px-4 mt-4 flex-shrink-0">
        <div className="flex justify-between gap-1">
          {EQ_BANDS.map(band => (
            <div key={band.id} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-[10px] font-mono text-accent tabular-nums">{toDB(eqValues[band.id])}dB</span>
              <input
                type="range" min={0} max={100}
                id={band.id} name={band.id}
                value={eqValues[band.id]}
                onChange={e => setEqValues(v => ({ ...v, [band.id]: Number(e.target.value) }))}
                className="eq-slider"
              />
              <span className="text-[10px] font-mono text-textSecondary">{band.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Up Next queue */}
      <div className="flex-1 flex flex-col px-4 mt-4 min-h-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2 flex-shrink-0">
          Up Next
        </p>
        <div className="overflow-y-auto flex-1">
          {upNext.map(track => (
            <button
              key={track.id}
              onClick={() => play(track)}
              className="flex items-center gap-3 w-full py-2 active:opacity-70 transition-opacity"
            >
              <img src={track.coverUrl} alt={track.title} className="w-10 h-10 rounded object-cover flex-shrink-0" />
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm text-textPrimary font-body truncate">{track.title}</p>
                <p className="text-xs text-textSecondary truncate">{track.artist}</p>
              </div>
              <span className="text-xs text-textSecondary ml-2">{track.duration}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
