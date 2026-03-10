import { useState } from 'react';
import { ALBUMS, TRACKS, PLAYLISTS, ARTISTS, DOWNLOADED_ITEMS } from '../data/mockData';

// Map DOWNLOADED_ITEMS to real artwork from ALBUMS (which has Deezer/iTunes URLs)
const downloadedWithArt = DOWNLOADED_ITEMS.map(item => ({
  ...item,
  coverUrl: ALBUMS.find(a => a.title.toLowerCase() === item.title.toLowerCase())?.coverUrl ?? item.coverUrl,
}));
import { usePlayer } from '../context/PlayerContext';

type Filter = 'Playlists' | 'Albums' | 'Artists' | 'Downloaded';
const FILTERS: Filter[] = ['Playlists', 'Albums', 'Artists', 'Downloaded'];

export function LibraryScreen() {
  const [active, setActive] = useState<Filter>('Albums');
  const { play, openPlayer } = usePlayer();

  return (
    <div className="scroll-y h-full pb-28">
      {/* App Bar — slim, standard flex row: title left, icons right */}
      <div className="screen-header flex items-center justify-between px-4 py-3 sticky top-0 bg-bg z-10">
        <h1 className="text-2xl font-display text-textPrimary">Library</h1>
        <div className="flex gap-3">
          <button className="text-textSecondary active:text-accent transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
          {/* Upgrade 9: Larger + button with 44px touch target */}
          <button className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-textSecondary hover:bg-white/10 active:bg-white/20 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="scroll-x flex gap-2 px-4 pt-3 pb-4">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`filter-chip flex-shrink-0 text-xs font-mono px-3 py-1.5 rounded-btn border transition-colors ${
              active === f
                ? 'bg-accent text-bg border-accent'
                : 'bg-surface text-textSecondary border-border'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ---- Playlists Tab (2-column grid) ---- */}
      {active === 'Playlists' && (
        <div className="grid grid-cols-2 gap-4 px-4">
          {PLAYLISTS.map(pl => (
            <button
              key={pl.id}
              onClick={() => { play(TRACKS[0]); openPlayer(); }}
              className="active:opacity-70 transition-opacity text-left"
            >
              <img src={pl.coverUrl} alt={pl.name} className="track-cover aspect-square rounded-lg object-cover w-full" />
              <p className="text-sm text-textPrimary font-body font-bold mt-2 truncate">{pl.name}</p>
              <p className="text-xs text-textSecondary">{pl.trackCount} tracks</p>
            </button>
          ))}
        </div>
      )}

      {/* ---- Albums Tab ---- */}
      {active === 'Albums' && (
        <div>
          {ALBUMS.map(album => (
            <button
              key={album.id}
              onClick={() => { play(TRACKS[0]); openPlayer(); }}
              className="flex items-center gap-3 w-full px-4 py-3 active:opacity-70 transition-opacity"
            >
              <img src={album.coverUrl} alt={album.title} className="track-cover w-[52px] h-[52px] rounded object-cover flex-shrink-0" />
              <div className="text-left min-w-0">
                <p className="text-sm text-textPrimary font-body truncate">{album.title}</p>
                <p className="text-xs text-textSecondary">
                  {album.artist} · {album.trackIds.length} tracks
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ---- Artists Tab (Upgrade 7) ---- */}
      {active === 'Artists' && (
        <div>
          {[...ARTISTS].sort((a, b) => a.name.localeCompare(b.name)).map(artist => (
            <button
              key={artist.id}
              onClick={() => { play(TRACKS[0]); openPlayer(); }}
              className="flex items-center gap-3 w-full px-4 py-3 active:opacity-70 transition-opacity"
            >
              <img
                src={artist.imageUrl}
                alt={artist.name}
                className="rounded-full w-12 h-12 object-cover flex-shrink-0"
              />
              <div className="text-left min-w-0">
                <p className="text-sm text-textPrimary font-body truncate">{artist.name}</p>
                <p className="text-xs text-textSecondary">{artist.trackCount} tracks</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ---- Downloaded Tab (Upgrade 8): 2-column grid ---- */}
      {active === 'Downloaded' && (
        <div className="grid grid-cols-2 gap-4 px-4">
          {downloadedWithArt.map(item => (
            <button
              key={item.id}
              onClick={() => { play(TRACKS[0]); openPlayer(); }}
              className="active:opacity-70 transition-opacity text-left"
            >
              <img
                src={item.coverUrl}
                alt={item.title}
                className="aspect-square rounded-lg object-cover w-full"
              />
              <p className="text-sm text-textPrimary font-body mt-2 truncate">{item.title}</p>
              <p className="text-xs text-textSecondary truncate">{item.artist}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
