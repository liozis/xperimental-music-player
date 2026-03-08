// ============================================================
// CENTRALIZED MOCK DATA — Single source of truth
// ============================================================

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  audioSrc: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  trackCount: number;
  tracks: string[]; // track IDs
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  trackCount: number;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  year: number;
  trackIds: string[];
}

// ---------- ARTISTS (alphabetical) ----------
export const ARTISTS: Artist[] = [
  { id: 'artist-1',  name: 'Air',            imageUrl: 'https://picsum.photos/seed/air/200/200',            trackCount: 1 },
  { id: 'artist-2',  name: 'Aphex Twin',     imageUrl: 'https://picsum.photos/seed/aphextwin/200/200',     trackCount: 1 },
  { id: 'artist-3',  name: 'Bent',           imageUrl: 'https://picsum.photos/seed/bent/200/200',           trackCount: 1 },
  { id: 'artist-4',  name: 'Burial',         imageUrl: 'https://picsum.photos/seed/burial/200/200',         trackCount: 1 },
  { id: 'artist-5',  name: 'Grimes',         imageUrl: 'https://picsum.photos/seed/grimes/200/200',         trackCount: 2 },
  { id: 'artist-6',  name: 'Groove Armada',  imageUrl: 'https://picsum.photos/seed/groovearmada/200/200',  trackCount: 1 },
  { id: 'artist-7',  name: 'Madonna',        imageUrl: 'https://picsum.photos/seed/madonna/200/200',        trackCount: 1 },
  { id: 'artist-8',  name: 'Magdalena Bay',  imageUrl: 'https://picsum.photos/seed/magdalenabay/200/200',  trackCount: 1 },
  { id: 'artist-9',  name: 'Massive Attack', imageUrl: 'https://picsum.photos/seed/massiveattack/200/200', trackCount: 2 },
  { id: 'artist-10', name: 'Moby',           imageUrl: 'https://picsum.photos/seed/moby/200/200',           trackCount: 1 },
  { id: 'artist-11', name: 'Röyksopp',       imageUrl: 'https://picsum.photos/seed/royksopp/200/200',       trackCount: 1 },
  { id: 'artist-12', name: 'U96',            imageUrl: 'https://picsum.photos/seed/u96/200/200',            trackCount: 1 },
  { id: 'artist-13', name: 'Underworld',     imageUrl: 'https://picsum.photos/seed/underworld/200/200',     trackCount: 2 },
].sort((a, b) => a.name.localeCompare(b.name));

// ---------- TRACKS (16) ----------
export const TRACKS: Track[] = [
  { id: 'track-1',  title: 'I Against I',             artist: 'Massive Attack ft. Mos Def',       album: '100th Window',                    duration: '4:06', coverUrl: 'https://picsum.photos/seed/massiveattack1/400/400',  audioSrc: '' },
  { id: 'track-2',  title: 'Born Slippy',             artist: 'Underworld',                       album: 'Second Toughest in the Infants',  duration: '9:46', coverUrl: 'https://picsum.photos/seed/underworld2/400/400',    audioSrc: '' },
  { id: 'track-3',  title: 'Xtal',                    artist: 'Aphex Twin',                       album: 'Selected Ambient Works 85-92',    duration: '4:54', coverUrl: 'https://picsum.photos/seed/aphextwin3/400/400',     audioSrc: '' },
  { id: 'track-4',  title: 'The Spoils',              artist: 'Massive Attack ft. Hope Sandoval', album: 'Ritual Spirit',                   duration: '3:57', coverUrl: 'https://picsum.photos/seed/massiveattack4/400/400',  audioSrc: '' },
  { id: 'track-5',  title: 'At the River',            artist: 'Groove Armada',                    album: 'Vertigo',                         duration: '4:48', coverUrl: 'https://picsum.photos/seed/groovearmada5/400/400',  audioSrc: '' },
  { id: 'track-6',  title: 'Sola Sistim',             artist: 'Underworld',                       album: 'Dubnobasswithmyheadman',          duration: '5:24', coverUrl: 'https://picsum.photos/seed/underworld6/400/400',    audioSrc: '' },
  { id: 'track-7',  title: 'Dark Room Rituals',       artist: 'U96',                              album: 'U96',                             duration: '5:11', coverUrl: 'https://picsum.photos/seed/u96dark7/400/400',       audioSrc: '' },
  { id: 'track-8',  title: 'K.I.S.S.E.S',             artist: 'Bent',                             album: 'Programmed to Love',              duration: '4:32', coverUrl: 'https://picsum.photos/seed/bent8/400/400',          audioSrc: '' },
  { id: 'track-9',  title: 'Lift Me Up',              artist: 'Moby',                             album: 'Hotel',                           duration: '4:19', coverUrl: 'https://picsum.photos/seed/moby9/400/400',          audioSrc: '' },
  { id: 'track-10', title: 'Archangel',               artist: 'Burial',                           album: 'Untrue',                          duration: '3:58', coverUrl: 'https://picsum.photos/seed/burial10/400/400',       audioSrc: '' },
  { id: 'track-11', title: 'Oblivion',                artist: 'Grimes',                           album: 'Visions',                         duration: '4:11', coverUrl: 'https://picsum.photos/seed/grimes11/400/400',       audioSrc: '' },
  { id: 'track-12', title: 'Fear, Sex',               artist: 'Magdalena Bay',                    album: 'Imaginal Disk',                   duration: '3:44', coverUrl: 'https://picsum.photos/seed/magdalenabay12/400/400', audioSrc: '' },
  { id: 'track-13', title: 'Be a Body',               artist: 'Grimes',                           album: 'Visions',                         duration: '5:02', coverUrl: 'https://picsum.photos/seed/grimes13/400/400',       audioSrc: '' },
  { id: 'track-14', title: 'Nothing Really Matters',  artist: 'Madonna',                          album: 'Ray of Light',                    duration: '4:27', coverUrl: 'https://picsum.photos/seed/madonna14/400/400',      audioSrc: '' },
  { id: 'track-15', title: "You Don't Have a Clue",   artist: 'Röyksopp',                         album: 'Junior',                          duration: '3:36', coverUrl: 'https://picsum.photos/seed/royksopp15/400/400',     audioSrc: '' },
  { id: 'track-16', title: 'Sexy Boy',                artist: 'Air',                              album: 'Moon Safari',                     duration: '4:58', coverUrl: 'https://picsum.photos/seed/air16/400/400',          audioSrc: '' },
];

// ---------- ALBUMS (8) ----------
export const ALBUMS: Album[] = [
  { id: 'al1', title: '100th Window',                   artist: 'Massive Attack',  coverUrl: 'https://picsum.photos/seed/album-100thwindow/400/400',  year: 2003, trackIds: ['track-1'] },
  { id: 'al2', title: 'Second Toughest in the Infants', artist: 'Underworld',      coverUrl: 'https://picsum.photos/seed/album-secondtoughest/400/400', year: 1996, trackIds: ['track-2'] },
  { id: 'al3', title: 'Selected Ambient Works 85-92',   artist: 'Aphex Twin',      coverUrl: 'https://picsum.photos/seed/album-saw8592/400/400',     year: 1992, trackIds: ['track-3'] },
  { id: 'al4', title: 'Untrue',                         artist: 'Burial',          coverUrl: 'https://picsum.photos/seed/album-untrue/400/400',      year: 2007, trackIds: ['track-10'] },
  { id: 'al5', title: 'Visions',                        artist: 'Grimes',          coverUrl: 'https://picsum.photos/seed/album-visions/400/400',     year: 2012, trackIds: ['track-11', 'track-13'] },
  { id: 'al6', title: 'Moon Safari',                    artist: 'Air',             coverUrl: 'https://picsum.photos/seed/album-moonsafari/400/400',  year: 1998, trackIds: ['track-16'] },
  { id: 'al7', title: 'Ray of Light',                   artist: 'Madonna',         coverUrl: 'https://picsum.photos/seed/album-rayoflight/400/400',  year: 1998, trackIds: ['track-14'] },
  { id: 'al8', title: 'Imaginal Disk',                  artist: 'Magdalena Bay',   coverUrl: 'https://picsum.photos/seed/album-imaginaldisk/400/400', year: 2024, trackIds: ['track-12'] },
];

// ---------- PLAYLISTS (8) ----------
export const PLAYLISTS: Playlist[] = [
  { id: 'pl1', name: 'Late Night Drive',     description: 'Nocturnal electronics for empty highways',       coverUrl: 'https://picsum.photos/seed/playlist-latenight/400/400',    trackCount: 24, tracks: ['track-1', 'track-2', 'track-6', 'track-10', 'track-16'] },
  { id: 'pl2', name: '3AM Headphones',       description: 'When the world is asleep and the bass is deep',  coverUrl: 'https://picsum.photos/seed/playlist-3am/400/400',          trackCount: 18, tracks: ['track-3', 'track-10', 'track-7', 'track-6', 'track-9'] },
  { id: 'pl3', name: 'Sunday Comedown',      description: 'Soft landings after long weekends',              coverUrl: 'https://picsum.photos/seed/playlist-sundaycomedown/400/400', trackCount: 16, tracks: ['track-5', 'track-8', 'track-16', 'track-9', 'track-15'] },
  { id: 'pl4', name: 'Dark Electronics',     description: 'Industrial textures and shadowy beats',          coverUrl: 'https://picsum.photos/seed/playlist-darkelectronics/400/400', trackCount: 22, tracks: ['track-1', 'track-7', 'track-4', 'track-10', 'track-13'] },
  { id: 'pl5', name: 'Trip Hop Essentials',  description: 'The pillars of downtempo and trip hop',          coverUrl: 'https://picsum.photos/seed/playlist-triphop/400/400',      trackCount: 31, tracks: ['track-1', 'track-4', 'track-5', 'track-10', 'track-14', 'track-16'] },
  { id: 'pl6', name: 'Bedroom Chill',        description: 'Warm ambient for winding down',                  coverUrl: 'https://picsum.photos/seed/playlist-bedroomchill/400/400', trackCount: 19, tracks: ['track-3', 'track-8', 'track-12', 'track-15', 'track-16'] },
  { id: 'pl7', name: '90s Underground',      description: 'Pre-millennium electronic gold',                 coverUrl: 'https://picsum.photos/seed/playlist-90sunderground/400/400', trackCount: 14, tracks: ['track-2', 'track-3', 'track-6', 'track-14', 'track-16'] },
  { id: 'pl8', name: 'Melancholy Machine',   description: 'Bittersweet circuits and synthetic grief',       coverUrl: 'https://picsum.photos/seed/playlist-melancholy/400/400',   trackCount: 20, tracks: ['track-4', 'track-9', 'track-11', 'track-13', 'track-14', 'track-15'] },
];

// ---------- CURATED LISTS ----------
export const RECENTLY_PLAYED = TRACKS.filter(t => ['track-1', 'track-10', 'track-3', 'track-14', 'track-7'].includes(t.id));
export const JUMP_BACK_IN    = TRACKS.filter(t => ['track-2', 'track-5', 'track-11', 'track-16', 'track-8'].includes(t.id));
export const RECOMMENDED     = TRACKS.filter(t => ['track-4', 'track-6', 'track-9', 'track-12', 'track-13', 'track-15'].includes(t.id));

// ---------- DOWNLOADED (subset for grid gallery) ----------
export const DOWNLOADED_ITEMS = [
  { id: 'dl1', title: 'Untrue',                         artist: 'Burial',         coverUrl: 'https://picsum.photos/seed/dl-untrue/400/400' },
  { id: 'dl2', title: 'Selected Ambient Works 85-92',   artist: 'Aphex Twin',     coverUrl: 'https://picsum.photos/seed/dl-saw/400/400' },
  { id: 'dl3', title: 'Moon Safari',                    artist: 'Air',            coverUrl: 'https://picsum.photos/seed/dl-moonsafari/400/400' },
  { id: 'dl4', title: 'Visions',                        artist: 'Grimes',         coverUrl: 'https://picsum.photos/seed/dl-visions/400/400' },
  { id: 'dl5', title: 'Ray of Light',                   artist: 'Madonna',        coverUrl: 'https://picsum.photos/seed/dl-rayoflight/400/400' },
  { id: 'dl6', title: 'Imaginal Disk',                  artist: 'Magdalena Bay',  coverUrl: 'https://picsum.photos/seed/dl-imaginaldisk/400/400' },
  { id: 'dl7', title: 'Dubnobasswithmyheadman',         artist: 'Underworld',     coverUrl: 'https://picsum.photos/seed/dl-dubno/400/400' },
  { id: 'dl8', title: 'Vertigo',                        artist: 'Groove Armada',  coverUrl: 'https://picsum.photos/seed/dl-vertigo/400/400' },
];
