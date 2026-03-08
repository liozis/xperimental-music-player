import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type SkinId = 'cassette' | 'acidgrafix' | 'metalheart' | 'medieval';

interface SkinContextType {
  skin: SkinId;
  setSkin: (s: SkinId) => void;
}

const SkinContext = createContext<SkinContextType>({ skin: 'cassette', setSkin: () => {} });

export function SkinProvider({ children }: { children: ReactNode }) {
  const [skin, setSkinState] = useState<SkinId>(() => {
    return (localStorage.getItem('xp-skin') as SkinId) || 'cassette';
  });

  const setSkin = (s: SkinId) => {
    setSkinState(s);
    localStorage.setItem('xp-skin', s);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-skin', skin);
  }, [skin]);

  return <SkinContext.Provider value={{ skin, setSkin }}>{children}</SkinContext.Provider>;
}

export const useSkin = () => useContext(SkinContext);
