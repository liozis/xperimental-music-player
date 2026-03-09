import { useState, useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { TRACKS } from '../data/mockData';
import { MainPlayerCard } from '../components/MainPlayerCard';
import { EqualizerCard }  from '../components/EqualizerCard';
import { QueueCard }      from '../components/QueueCard';
import { InfoHubCard }    from '../components/InfoHubCard';
import { PitchCard }      from '../components/PitchCard';

export function PlayerScreen() {
  const {
    currentTrack, isPlaying, togglePlay, next, prev,
    progress, setProgress, play, queue,
    showPlayer, closePlayer,
    pitch, setPitch,
  } = usePlayer();

  const [eqValues, setEqValues] = useState<Record<string, number>>({
    'eq-60hz': 60, 'eq-230hz': 45, 'eq-910hz': 50, 'eq-4khz': 40, 'eq-14khz': 55,
  });
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat]   = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Drive slide-in / out via showPlayer from context (no routing dependency)
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showPlayer) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
    }
  }, [showPlayer]);

  // Reset like when track changes
  useEffect(() => { setIsLiked(false); }, [currentTrack?.id]);

  const dismiss = () => {
    setVisible(false);
    setTimeout(() => closePlayer(), 300);
  };

  if (!showPlayer && !visible) return null;
  if (!currentTrack) return null;

  // Up Next — 4 tracks wrapping around queue
  const currentIdx = queue.findIndex(t => t.id === currentTrack.id);
  const upNext = Array.from({ length: 4 }, (_, i) => {
    const idx = (currentIdx + 1 + i) % TRACKS.length;
    return TRACKS[idx];
  });

  return (
    <div
      className="absolute inset-0 bg-bg z-50 flex flex-col overflow-hidden"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >

      {/* ── Screen chrome: dismiss bar ────────────────────────── */}
      <div className="flex items-center justify-between px-4 pt-5 pb-3 flex-shrink-0">
        <button
          onClick={dismiss}
          className="text-textSecondary active:text-accent min-w-[44px] min-h-[44px] flex items-center justify-center -ml-2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6,9 12,15 18,9"/>
          </svg>
        </button>

        <p className="text-[10px] font-mono text-textSecondary tracking-widest uppercase">
          Now Playing
        </p>

        <button
          onClick={() => setIsLiked(l => !l)}
          className={`min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2 transition-colors ${
            isLiked ? 'text-accent' : 'text-textSecondary active:text-accent'
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      {/* ── Scrollable card stack ─────────────────────────────── */}
      {/* overflow-y-auto lets all four cards render at natural height */}
      <div className="flex-1 min-h-0 overflow-y-auto px-3 pb-6 flex flex-col gap-3">

        {/* CARD 1 — Main Player */}
        <MainPlayerCard
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          progress={progress}
          shuffle={shuffle}
          repeat={repeat}
          onTogglePlay={togglePlay}
          onNext={next}
          onPrev={prev}
          onSeek={setProgress}
          onToggleShuffle={() => setShuffle(s => !s)}
          onToggleRepeat={() => setRepeat(r => !r)}
        />

        {/* CARD 2 — Information Display Hub */}
        <InfoHubCard
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          pitch={pitch}
        />

        {/* CARD 3 — Equalizer */}
        <EqualizerCard
          eqValues={eqValues}
          onEqChange={(id, value) => setEqValues(v => ({ ...v, [id]: value }))}
        />

        {/* CARD 4 — Pitch / Speed */}
        <PitchCard pitch={pitch} onPitchChange={setPitch} />

        {/* CARD 5 — Queue / Up Next */}
        <QueueCard tracks={upNext} onPlay={play} />

      </div>
    </div>
  );
}
