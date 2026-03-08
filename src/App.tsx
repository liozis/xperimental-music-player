import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SkinProvider } from './context/SkinContext';
import { PlayerProvider } from './context/PlayerContext';
import { BottomNav } from './components/BottomNav';
import { MiniPlayer } from './components/MiniPlayer';
import { StatusBar } from './components/StatusBar';
import { FloatingThemeSwitcher } from './components/FloatingThemeSwitcher';
import { HomeScreen }    from './screens/HomeScreen';
import { SearchScreen }  from './screens/SearchScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { PlayerScreen }  from './screens/PlayerScreen';

function AppRoutes() {
  const { pathname } = useLocation();
  const showNav = pathname !== '/player';

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
          <Route path="/player"  element={<PlayerScreen />} />
        </Routes>
        {showNav && <MiniPlayer />}
        {showNav && <BottomNav />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SkinProvider>
      <PlayerProvider>
        {/* Full-viewport dark backdrop */}
        <div className="min-h-screen w-full flex items-center justify-center bg-neutral-950">
          {/* iPhone 15 Pro Max device shell */}
          <div
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
