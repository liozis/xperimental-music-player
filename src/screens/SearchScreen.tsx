import { useState } from 'react';
import { TRACKS } from '../data/mockData';
import { TrackRow } from '../components/TrackRow';

export function SearchScreen() {
  const [query, setQuery] = useState('');

  const results = query.length > 1
    ? TRACKS.filter(t =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.artist.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="scroll-y h-full pb-28">
      <div className="px-4 pt-6 pb-4 sticky top-0 bg-bg z-10">
        <h1 className="text-2xl font-display text-textPrimary mb-4">Search</h1>
        <div className="flex items-center gap-2 bg-surface border border-border rounded-card px-3 py-2">
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
        </div>
      </div>
      <div>
        {query.length > 1 && results.length === 0 && (
          <p className="text-textSecondary text-sm font-body px-4 py-8 text-center">
            No results for &ldquo;{query}&rdquo;
          </p>
        )}
        {results.map(t => <TrackRow key={t.id} track={t} />)}
        {query.length <= 1 && (
          <div className="px-4 py-8 text-center">
            <p className="text-textSecondary text-sm font-body">Type to search your library</p>
          </div>
        )}
      </div>
    </div>
  );
}
