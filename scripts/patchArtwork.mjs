/**
 * patchArtwork.mjs
 * Reads artwork.json and replaces all picsum placeholder URLs in mockData.ts
 * with real Deezer/iTunes artwork URLs.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname  = path.dirname(fileURLToPath(import.meta.url));
const ARTWORK    = path.join(__dirname, '../src/data/artwork.json');
const MOCKDATA   = path.join(__dirname, '../src/data/mockData.ts');

const artworkMap = JSON.parse(fs.readFileSync(ARTWORK, 'utf-8'));

function artistKey(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

let content = fs.readFileSync(MOCKDATA, 'utf-8');
let trackHits  = 0;
let artistHits = 0;
let albumHits  = 0;

// ── 1. Patch TRACK coverUrls ──────────────────────────────────────────────
// Matches: { id: 't-N', ..., coverUrl: 'https://picsum.photos/...' ...
content = content.replace(
  /(\{ id: '(t-\d+)'[^\n}]*coverUrl: )'https:\/\/picsum\.photos\/[^']+'/g,
  (match, prefix, trackId) => {
    const url = artworkMap[trackId];
    if (url) { trackHits++; return `${prefix}'${url}'`; }
    return match;
  }
);

// ── 2. Patch ARTIST imageUrls ─────────────────────────────────────────────
// Matches: { id: 'a-N', name: 'Artist Name', imageUrl: 'https://picsum...'
content = content.replace(
  /(\{ id: 'a-\d+', name: '([^']+)', imageUrl: )'https:\/\/picsum\.photos\/[^']+'/g,
  (match, prefix, artistName) => {
    const key = `artist-${artistKey(artistName)}`;
    const url = artworkMap[key];
    if (url) { artistHits++; return `${prefix}'${url}'`; }
    return match;
  }
);

// ── 3. Patch ALBUM coverUrls ──────────────────────────────────────────────
// Albums use the same cover as their first track.
// Build: albumTitle → first track coverUrl from the now-patched TRACKS lines.
const trackCoverMap = {};
const trackLineRe = /\{ id: '(t-\d+)'[^\n]*title: '([^']*)'[^\n]*album: '([^']*)'[^\n]*coverUrl: '(https:\/\/[^']+)'/g;
let m;
while ((m = trackLineRe.exec(content)) !== null) {
  const [, , , albumTitle, coverUrl] = m;
  if (!trackCoverMap[albumTitle]) trackCoverMap[albumTitle] = coverUrl;
}

// Now replace album coverUrls where we have a track match
content = content.replace(
  /(\{ id: 'al-\d+', title: '([^']+)'[^\n]*coverUrl: )'https:\/\/picsum\.photos\/[^']+'/g,
  (match, prefix, albumTitle) => {
    const url = trackCoverMap[albumTitle];
    if (url) { albumHits++; return `${prefix}'${url}'`; }
    return match;
  }
);

fs.writeFileSync(MOCKDATA, content, 'utf-8');

console.log('');
console.log('━━━ patchArtwork.mjs ━━━━━━━━━━━━━━━━');
console.log(`Track  covers patched: ${trackHits}/116`);
console.log(`Artist images patched: ${artistHits}/108`);
console.log(`Album  covers patched: ${albumHits}`);
console.log('Written: src/data/mockData.ts');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
