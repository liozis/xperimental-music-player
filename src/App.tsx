import { HashRouter, Routes, Route } from 'react-router-dom';
import { SkinProvider } from './context/SkinContext';
import { PlayerProvider, usePlayer } from './context/PlayerContext';
import { BottomNav } from './components/BottomNav';
import { MiniPlayer } from './components/MiniPlayer';
import { StatusBar } from './components/StatusBar';
import { FloatingThemeSwitcher } from './components/FloatingThemeSwitcher';
import { HomeScreen }    from './screens/HomeScreen';
import { SearchScreen }  from './screens/SearchScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { PlayerScreen }  from './screens/PlayerScreen';

function AppRoutes() {
  const { showPlayer } = usePlayer();
  // MiniPlayer and BottomNav hide whenever the full player overlay is visible
  const showNav = !showPlayer;

  return (
    /* flex-col locks StatusBar at top, content area fills remaining height */
    <div className="flex flex-col h-full bg-bg overflow-hidden">
      <StatusBar />
      {/* Routes container: relative + flex-1 so all screens get identical height */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <Routes>
          <Route path="/"        element={<HomeScreen />} />
          <Route path="/search"  element={<SearchScreen />} />
          <Route path="/library" element={<LibraryScreen />} />
        </Routes>
        {showNav && <MiniPlayer />}
        {showNav && <BottomNav />}
        {/* PlayerScreen lives outside Routes — persistent overlay driven by showPlayer state */}
        <PlayerScreen />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SkinProvider>
      <PlayerProvider>
        {/* Full-viewport backdrop — color tracks active skin */}
        <div
          className="min-h-screen w-full flex items-center justify-center transition-colors duration-500"
          style={{ backgroundColor: 'var(--color-body-bg, #0a0a0a)' }}
        >
          {/* iPhone 15 Pro Max device shell — id used by cinematic blink */}
          <div
            id="iphone-shell"
            className="relative overflow-hidden rounded-[40px] border border-white/10"
            style={{ width: 430, height: 932 }}
          >
            <HashRouter>
              <AppRoutes />
            </HashRouter>
          </div>

          {/* External floating theme switcher (outside device) */}
          <FloatingThemeSwitcher />
        </div>
      </PlayerProvider>
    </SkinProvider>
  );
}
