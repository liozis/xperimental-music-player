import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import type { Track } from '../data/mockData';
import { TRACKS } from '../data/mockData';

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  queue: Track[];
  progress: number;
  showPlayer: boolean;
  pitch: number;
  play: (track: Track) => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  setProgress: (p: number) => void;
  setPitch: (p: number) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  openPlayer: () => void;
  closePlayer: () => void;
}

const PlayerContext = createContext<PlayerContextType>({} as PlayerContextType);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  // Pitch/Speed — 50 = 0.5x (slow), 100 = 1.0x (normal), 200 = 2.0x (fast)
  const [pitch, setPitchState] = useState(100);
  const audioRef = useRef<HTMLAudioElement>(null);

  const setPitch = (p: number) => {
    const clamped = Math.min(200, Math.max(50, p));
    setPitchState(clamped);
    if (audioRef.current) audioRef.current.playbackRate = clamped / 100;
  };
  const queue = TRACKS;

  const openPlayer  = () => setShowPlayer(true);
  const closePlayer = () => setShowPlayer(false);

  const play = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgress(0);
  };

  const togglePlay = () => setIsPlaying(p => !p);

  const next = () => {
    if (!currentTrack) return;
    const idx = queue.findIndex(t => t.id === currentTrack.id);
    const nextTrack = queue[(idx + 1) % queue.length];
    play(nextTrack);
  };

  // ── Simulated playback: increment progress second-by-second ──
  useEffect(() => {
    if (!isPlaying || !currentTrack) return;
    const [m, s] = currentTrack.duration.split(':').map(Number);
    const totalSecs = (m || 0) * 60 + (s || 0);
    if (totalSecs <= 0) return;
    const increment = 100 / totalSecs;
    const id = setInterval(() => {
      setProgress(p => Math.min(p + increment, 100));
    }, 1000);
    return () => clearInterval(id);
  }, [isPlaying, currentTrack?.id]);

  const prev = () => {
    if (!currentTrack) return;
    const idx = queue.findIndex(t => t.id === currentTrack.id);
    const prevTrack = queue[(idx - 1 + queue.length) % queue.length];
    play(prevTrack);
  };

  return (
    <PlayerContext.Provider value={{
      currentTrack, isPlaying, queue, progress, showPlayer, pitch,
      play, togglePlay, next, prev, setProgress, setPitch, audioRef,
      openPlayer, closePlayer,
    }}>
      <audio ref={audioRef} />
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
