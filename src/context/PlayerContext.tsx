import { createContext, useContext, useState, useRef, ReactNode } from 'react';
import type { Track } from '../data/mockData';
import { TRACKS } from '../data/mockData';

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  queue: Track[];
  progress: number;
  play: (track: Track) => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  setProgress: (p: number) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const PlayerContext = createContext<PlayerContextType>({} as PlayerContextType);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const queue = TRACKS;

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

  const prev = () => {
    if (!currentTrack) return;
    const idx = queue.findIndex(t => t.id === currentTrack.id);
    const prevTrack = queue[(idx - 1 + queue.length) % queue.length];
    play(prevTrack);
  };

  return (
    <PlayerContext.Provider value={{ currentTrack, isPlaying, queue, progress, play, togglePlay, next, prev, setProgress, audioRef }}>
      <audio ref={audioRef} />
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
