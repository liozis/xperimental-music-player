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
    // ── Cinematic blink: CRT flash masks the CSS variable repaint ──
    // data-blinking on <html> triggers ::after flash overlay on #iphone-shell
    document.documentElement.setAttribute('data-blinking', 'true');
    // Switch skin variables at the peak of the flash (75ms = halfway through 150ms blink)
    setTimeout(() => {
      setSkinState(s);
      localStorage.setItem('xp-skin', s);
    }, 75);
    // Remove flag after full 300ms animation completes
    setTimeout(() => {
      document.documentElement.removeAttribute('data-blinking');
    }, 320);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-skin', skin);
  }, [skin]);

  return <SkinContext.Provider value={{ skin, setSkin }}>{children}</SkinContext.Provider>;
}

export const useSkin = () => useContext(SkinContext);
