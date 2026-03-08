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
  { id: 'ar1',  name: 'Chromatic',     imageUrl: 'https://picsum.photos/seed/chromatic/200/200',     trackCount: 5 },
  { id: 'ar2',  name: 'Dissolve',      imageUrl: 'https://picsum.photos/seed/dissolve/200/200',      trackCount: 7 },
  { id: 'ar3',  name: 'Echo Chamber',  imageUrl: 'https://picsum.photos/seed/echo-chamber/200/200',  trackCount: 4 },
  { id: 'ar4',  name: 'Glass Phantom', imageUrl: 'https://picsum.photos/seed/glass-phantom/200/200', trackCount: 6 },
  { id: 'ar5',  name: 'Neon Veil',     imageUrl: 'https://picsum.photos/seed/neon-veil/200/200',     trackCount: 8 },
  { id: 'ar6',  name: 'Null Set',      imageUrl: 'https://picsum.photos/seed/null-set/200/200',      trackCount: 3 },
  { id: 'ar7',  name: 'Obsidian Wave', imageUrl: 'https://picsum.photos/seed/obsidian-wave/200/200', trackCount: 5 },
  { id: 'ar8',  name: 'Phase Drift',   imageUrl: 'https://picsum.photos/seed/phase-drift/200/200',   trackCount: 4 },
  { id: 'ar9',  name: 'Prisma',        imageUrl: 'https://picsum.photos/seed/prisma/200/200',        trackCount: 6 },
  { id: 'ar10', name: 'SABLE',         imageUrl: 'https://picsum.photos/seed/sable/200/200',         trackCount: 5 },
  { id: 'ar11', name: 'Velvet Decay',  imageUrl: 'https://picsum.photos/seed/velvet-decay/200/200',  trackCount: 7 },
  { id: 'ar12', name: 'Yūrei',         imageUrl: 'https://picsum.photos/seed/yurei/200/200',         trackCount: 4 },
].sort((a, b) => a.name.localeCompare(b.name));

// ---------- TRACKS (20) ----------
export const TRACKS: Track[] = [
  { id: 't1',  title: 'Midnight Protocol',      artist: 'Neon Veil',     album: 'Luminous Drift',       duration: '4:11', coverUrl: 'https://picsum.photos/seed/synthwave1/400/400',  audioSrc: '' },
  { id: 't2',  title: 'Shattered Glass',         artist: 'Glass Phantom', album: 'Refracted Light',      duration: '3:42', coverUrl: 'https://picsum.photos/seed/darkwave2/400/400',   audioSrc: '' },
  { id: 't3',  title: 'Electric Bloom',          artist: 'Prisma',        album: 'Spectral Garden',      duration: '5:18', coverUrl: 'https://picsum.photos/seed/ambient3/400/400',    audioSrc: '' },
  { id: 't4',  title: 'Phantom Frequency',       artist: 'Phase Drift',   album: 'Signal Loss',          duration: '4:33', coverUrl: 'https://picsum.photos/seed/lofi4/400/400',      audioSrc: '' },
  { id: 't5',  title: 'Dissolving Borders',      artist: 'Dissolve',      album: 'Entropy',              duration: '6:07', coverUrl: 'https://picsum.photos/seed/techno5/400/400',    audioSrc: '' },
  { id: 't6',  title: 'Neon Baptism',            artist: 'Neon Veil',     album: 'Luminous Drift',       duration: '3:55', coverUrl: 'https://picsum.photos/seed/neon6/400/400',      audioSrc: '' },
  { id: 't7',  title: 'Velvet Undertow',         artist: 'Velvet Decay',  album: 'Soft Collapse',        duration: '5:21', coverUrl: 'https://picsum.photos/seed/velvet7/400/400',    audioSrc: '' },
  { id: 't8',  title: 'Obsidian Pulse',          artist: 'Obsidian Wave', album: 'Deep Current',         duration: '4:48', coverUrl: 'https://picsum.photos/seed/obsidian8/400/400',  audioSrc: '' },
  { id: 't9',  title: 'Static Prayer',           artist: 'Yūrei',         album: 'Ghost Frequency',      duration: '3:29', coverUrl: 'https://picsum.photos/seed/ghost9/400/400',     audioSrc: '' },
  { id: 't10', title: 'Chrome Cathedral',        artist: 'Chromatic',     album: 'Metallic Bloom',       duration: '4:15', coverUrl: 'https://picsum.photos/seed/chrome10/400/400',   audioSrc: '' },
  { id: 't11', title: 'Hollow Signal',           artist: 'Null Set',      album: 'Zero State',           duration: '5:02', coverUrl: 'https://picsum.photos/seed/null11/400/400',     audioSrc: '' },
  { id: 't12', title: 'Amber Drift',             artist: 'SABLE',         album: 'Desert Noir',          duration: '4:37', coverUrl: 'https://picsum.photos/seed/amber12/400/400',    audioSrc: '' },
  { id: 't13', title: 'Fading Architecture',     artist: 'Echo Chamber',  album: 'Reverb City',          duration: '6:44', coverUrl: 'https://picsum.photos/seed/echo13/400/400',     audioSrc: '' },
  { id: 't14', title: 'Liquid Mercury',          artist: 'Glass Phantom', album: 'Refracted Light',      duration: '3:58', coverUrl: 'https://picsum.photos/seed/mercury14/400/400',  audioSrc: '' },
  { id: 't15', title: 'Subterranean Bloom',      artist: 'Dissolve',      album: 'Entropy',              duration: '7:12', coverUrl: 'https://picsum.photos/seed/sub15/400/400',      audioSrc: '' },
  { id: 't16', title: 'Burning Periphery',       artist: 'Velvet Decay',  album: 'Soft Collapse',        duration: '4:05', coverUrl: 'https://picsum.photos/seed/burning16/400/400',  audioSrc: '' },
  { id: 't17', title: 'Spectral Residue',        artist: 'Prisma',        album: 'Spectral Garden',      duration: '5:33', coverUrl: 'https://picsum.photos/seed/spectral17/400/400', audioSrc: '' },
  { id: 't18', title: 'Terminal Glow',           artist: 'Neon Veil',     album: 'Luminous Drift',       duration: '4:22', coverUrl: 'https://picsum.photos/seed/terminal18/400/400', audioSrc: '' },
  { id: 't19', title: 'Concrete Mirage',         artist: 'Obsidian Wave', album: 'Deep Current',         duration: '3:47', coverUrl: 'https://picsum.photos/seed/concrete19/400/400', audioSrc: '' },
  { id: 't20', title: 'Phosphor Dreams',         artist: 'Phase Drift',   album: 'Signal Loss',          duration: '5:55', coverUrl: 'https://picsum.photos/seed/phosphor20/400/400', audioSrc: '' },
];

// ---------- ALBUMS (6) ----------
export const ALBUMS: Album[] = [
  { id: 'al1', title: 'Luminous Drift',   artist: 'Neon Veil',     coverUrl: 'https://picsum.photos/seed/album-luminous/400/400',   year: 2024, trackIds: ['t1','t6','t18'] },
  { id: 'al2', title: 'Refracted Light',  artist: 'Glass Phantom', coverUrl: 'https://picsum.photos/seed/album-refracted/400/400',  year: 2023, trackIds: ['t2','t14'] },
  { id: 'al3', title: 'Spectral Garden',  artist: 'Prisma',        coverUrl: 'https://picsum.photos/seed/album-spectral/400/400',   year: 2025, trackIds: ['t3','t17'] },
  { id: 'al4', title: 'Entropy',          artist: 'Dissolve',      coverUrl: 'https://picsum.photos/seed/album-entropy/400/400',    year: 2024, trackIds: ['t5','t15'] },
  { id: 'al5', title: 'Soft Collapse',    artist: 'Velvet Decay',  coverUrl: 'https://picsum.photos/seed/album-softcollapse/400/400', year: 2023, trackIds: ['t7','t16'] },
  { id: 'al6', title: 'Deep Current',     artist: 'Obsidian Wave', coverUrl: 'https://picsum.photos/seed/album-deepcurrent/400/400',  year: 2025, trackIds: ['t8','t19'] },
];

// ---------- PLAYLISTS (10) ----------
export const PLAYLISTS: Playlist[] = [
  { id: 'pl1',  name: 'Late Night Drive',       description: 'Nocturnal electronics for empty highways',  coverUrl: 'https://picsum.photos/seed/playlist-latenight/400/400',  trackCount: 24, tracks: ['t1','t5','t7','t10','t15','t18'] },
  { id: 'pl2',  name: 'Deep Focus',             description: 'Ambient textures for concentration',        coverUrl: 'https://picsum.photos/seed/playlist-deepfocus/400/400',  trackCount: 18, tracks: ['t3','t9','t11','t13','t20'] },
  { id: 'pl3',  name: 'Dark Synthetics',        description: 'Industrial and darkwave essentials',        coverUrl: 'https://picsum.photos/seed/playlist-darksyn/400/400',    trackCount: 31, tracks: ['t2','t4','t8','t16','t19'] },
  { id: 'pl4',  name: 'Morning Vapor',          description: 'Soft textures for waking up slow',          coverUrl: 'https://picsum.photos/seed/playlist-vapor/400/400',      trackCount: 16, tracks: ['t6','t12','t14','t17'] },
  { id: 'pl5',  name: 'Ghost Frequencies',      description: 'Hauntological dub and static',              coverUrl: 'https://picsum.photos/seed/playlist-ghost/400/400',      trackCount: 22, tracks: ['t9','t11','t13','t15'] },
  { id: 'pl6',  name: 'Concrete & Glass',       description: 'Brutalist electronics',                     coverUrl: 'https://picsum.photos/seed/playlist-concrete/400/400',   trackCount: 19, tracks: ['t8','t10','t19','t20'] },
  { id: 'pl7',  name: 'Velvet Hours',           description: 'Downtempo warmth for slow evenings',        coverUrl: 'https://picsum.photos/seed/playlist-velvet/400/400',     trackCount: 27, tracks: ['t7','t12','t16','t3'] },
  { id: 'pl8',  name: 'Signal & Noise',         description: 'Experimental electronic explorations',      coverUrl: 'https://picsum.photos/seed/playlist-signal/400/400',     trackCount: 14, tracks: ['t4','t11','t20'] },
  { id: 'pl9',  name: 'Neon District',          description: 'Cyberpunk-adjacent night music',            coverUrl: 'https://picsum.photos/seed/playlist-neon/400/400',       trackCount: 21, tracks: ['t1','t2','t6','t18'] },
  { id: 'pl10', name: 'Dissolved Boundaries',   description: 'Genre-fluid ambient and beyond',            coverUrl: 'https://picsum.photos/seed/playlist-dissolved/400/400',  trackCount: 15, tracks: ['t5','t9','t13','t17'] },
];

// ---------- CURATED LISTS ----------
export const RECENTLY_PLAYED = TRACKS.filter(t => ['t2','t10','t16','t4','t11'].includes(t.id));
export const JUMP_BACK_IN    = TRACKS.filter(t => ['t3','t8','t15','t1','t7'].includes(t.id));
export const RECOMMENDED     = TRACKS.filter(t => ['t5','t9','t12','t13','t6','t14'].includes(t.id));

// ---------- DOWNLOADED (subset for grid gallery) ----------
export const DOWNLOADED_ITEMS = [
  { id: 'dl1', title: 'Luminous Drift',   artist: 'Neon Veil',     coverUrl: 'https://picsum.photos/seed/dl-luminous/400/400' },
  { id: 'dl2', title: 'Entropy',          artist: 'Dissolve',      coverUrl: 'https://picsum.photos/seed/dl-entropy/400/400' },
  { id: 'dl3', title: 'Soft Collapse',    artist: 'Velvet Decay',  coverUrl: 'https://picsum.photos/seed/dl-softcollapse/400/400' },
  { id: 'dl4', title: 'Deep Current',     artist: 'Obsidian Wave', coverUrl: 'https://picsum.photos/seed/dl-deepcurrent/400/400' },
  { id: 'dl5', title: 'Ghost Frequency',  artist: 'Yūrei',         coverUrl: 'https://picsum.photos/seed/dl-ghost/400/400' },
  { id: 'dl6', title: 'Refracted Light',  artist: 'Glass Phantom', coverUrl: 'https://picsum.photos/seed/dl-refracted/400/400' },
  { id: 'dl7', title: 'Signal Loss',      artist: 'Phase Drift',   coverUrl: 'https://picsum.photos/seed/dl-signal/400/400' },
  { id: 'dl8', title: 'Spectral Garden',  artist: 'Prisma',        coverUrl: 'https://picsum.photos/seed/dl-spectral/400/400' },
];
