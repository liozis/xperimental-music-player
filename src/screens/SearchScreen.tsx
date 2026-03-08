import { useState } from 'react';
import { TRACKS, ARTISTS, PLAYLISTS } from '../data/mockData';
import { TrackRow } from '../components/TrackRow';
import { usePlayer } from '../context/PlayerContext';
import { useNavigate } from 'react-router-dom';

const RECENT_SEARCHES = [
  { id: 'r1', type: 'track',    label: TRACKS[1].title,   sub: TRACKS[1].artist,                         img: TRACKS[1].coverUrl,   round: false },
  { id: 'r2', type: 'artist',   label: ARTISTS[0].name,   sub: 'Artist',                                 img: ARTISTS[0].imageUrl,  round: true  },
  { id: 'r3', type: 'playlist', label: PLAYLISTS[0].name, sub: `Playlist · ${PLAYLISTS[0].trackCount} tracks`, img: PLAYLISTS[0].coverUrl, round: false },
  { id: 'r4', type: 'track',    label: TRACKS[5].title,   sub: TRACKS[5].artist,                         img: TRACKS[5].coverUrl,   round: false },
];

const POPULAR_TILES = [
  { id: 'p1', label: 'Electronic', img: ARTISTS[1].imageUrl },
  { id: 'p2', label: 'Trip Hop',   img: ARTISTS[2].imageUrl },
  { id: 'p3', label: 'Ambient',    img: ARTISTS[3].imageUrl },
  { id: 'p4', label: 'Soundscape', img: ARTISTS[4].imageUrl },
  { id: 'p5', label: 'Dance',      img: ARTISTS[5].imageUrl },
  { id: 'p6', label: 'Downtempo',  img: ARTISTS[6].imageUrl },
];

export function SearchScreen() {
  const [query, setQuery] = useState('');
  const { play } = usePlayer();
  const navigate = useNavigate();

  const results = query.length > 1
    ? TRACKS.filter(t =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.artist.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const showBrowse = query.length <= 1;

  return (
    <div className="scroll-y h-full pb-28">

      {/* ── Sticky header ──────────────────────────────────── */}
      <div className="px-4 pt-6 pb-4 sticky top-0 bg-bg z-10">
        <h1 className="text-2xl font-display text-textPrimary mb-4">Search</h1>
        <div className="flex items-center gap-2 bg-surface border border-border px-3 py-2.5" style={{ borderRadius: 'var(--radius-card)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-textSecondary flex-shrink-0">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Artists, songs, albums..."
            className="bg-transparent text-sm text-textPrimary placeholder-textSecondary flex-1 outline-none font-body"
          />
          {query.length > 0 && (
            <button onClick={() => setQuery('')} className="text-textSecondary active:text-textPrimary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── Search results ─────────────────────────────────── */}
      {!showBrowse && (
        <div>
          {results.length === 0 ? (
            <p className="text-textSecondary text-sm font-body px-4 py-8 text-center">
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            results.map(t => <TrackRow key={t.id} track={t} />)
          )}
        </div>
      )}

      {/* ── Browse mode ────────────────────────────────────── */}
      {showBrowse && (
        <>
          {/* Recent Searches — no trailing icons */}
          <section className="mb-6">
            <h2 className="text-[10px] font-mono uppercase tracking-widest text-textSecondary px-4 mb-1">
              Recent Searches
            </h2>
            {RECENT_SEARCHES.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.type === 'track') {
                    const track = TRACKS.find(t => t.title === item.label);
                    if (track) { play(track); navigate('/player'); }
                  }
                }}
                className="flex items-center gap-3 w-full px-4 py-2.5 active:opacity-70 transition-opacity"
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-11 h-11 object-cover flex-shrink-0"
                  style={{ borderRadius: item.round ? '50%' : 'var(--radius-card)' }}
                />
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm text-textPrimary font-body truncate">{item.label}</p>
                  <p className="text-xs text-textSecondary truncate capitalize">{item.sub}</p>
                </div>
              </button>
            ))}
          </section>

          {/* Popular — uniform bg-surface color, adapts to active skin */}
          <section className="px-4">
            <h2 className="text-[10px] font-mono uppercase tracking-widest text-textSecondary mb-3">
              Popular
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {POPULAR_TILES.map(tile => (
                <div
                  key={tile.id}
                  className="relative overflow-hidden h-20 flex items-end"
                  style={{ borderRadius: 'var(--radius-card)', background: 'var(--color-surface)' }}
                >
                  <img
                    src={tile.img}
                    alt={tile.label}
                    className="absolute bottom-0 right-0 w-16 h-16 object-cover opacity-50"
                    style={{ transform: 'rotate(12deg) translate(4px, 4px)' }}
                  />
                  <span className="relative z-10 text-sm font-display text-textPrimary px-3 pb-2.5 leading-tight">
                    {tile.label}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
