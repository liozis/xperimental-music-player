import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_FILE = path.join(__dirname, '../src/data/artwork.json');
const DELAY_MS = 300;

const delay = ms => new Promise(r => setTimeout(r, ms));

const DATASET = [
  { id: 't-1',   title: 'I Against I',                        artist: 'Massive Attack',        album: 'Blade II Soundtrack',                      year: 2002 },
  { id: 't-2',   title: 'Born Slippy .NUXX',                  artist: 'Underworld',            album: 'Trainspotting Soundtrack',                 year: 1995 },
  { id: 't-3',   title: 'Xtal',                               artist: 'Aphex Twin',            album: 'Selected Ambient Works 85-92',             year: 1992 },
  { id: 't-4',   title: 'The Spoils',                         artist: 'Massive Attack',        album: 'The Spoils (EP)',                          year: 2016 },
  { id: 't-5',   title: 'At the River',                       artist: 'Groove Armada',         album: 'Vertigo',                                  year: 1997 },
  { id: 't-6',   title: 'Sola Sistim',                        artist: 'Underworld',            album: 'A Hundred Days Off',                       year: 2002 },
  { id: 't-7',   title: 'Dark Room Rituals',                  artist: 'U96',                   album: 'Reboot',                                   year: 2018 },
  { id: 't-8',   title: 'K.I.S.S.E.S',                       artist: 'Bent',                  album: 'Ariels',                                   year: 2004 },
  { id: 't-9',   title: 'Lift Me Up',                         artist: 'Moby',                  album: 'Hotel',                                    year: 2005 },
  { id: 't-10',  title: 'Archangel',                          artist: 'Burial',                album: 'Untrue',                                   year: 2007 },
  { id: 't-11',  title: 'Oblivion',                           artist: 'Grimes',                album: 'Visions',                                  year: 2012 },
  { id: 't-12',  title: 'Fear, Sex',                          artist: 'Magdalena Bay',         album: 'A Little Rhythm... (EP)',                  year: 2020 },
  { id: 't-13',  title: 'Be a Body',                          artist: 'Grimes',                album: 'Visions',                                  year: 2012 },
  { id: 't-14',  title: 'Nothing Really Matters',             artist: 'Madonna',               album: 'Ray of Light',                             year: 1998 },
  { id: 't-15',  title: "You Don't Have a Clue",              artist: 'Röyksopp',              album: 'Junior',                                   year: 2009 },
  { id: 't-16',  title: 'Sexy Boy',                           artist: 'Air',                   album: 'Moon Safari',                              year: 1998 },
  { id: 't-17',  title: 'Glory Box',                          artist: 'Portishead',            album: 'Dummy',                                    year: 1994 },
  { id: 't-18',  title: '6 Underground',                      artist: 'Sneaker Pimps',         album: 'Becoming X',                               year: 1996 },
  { id: 't-19',  title: 'Mad About You',                      artist: 'Hooverphonic',          album: 'The Magnificent Tree',                     year: 2000 },
  { id: 't-20',  title: 'Destiny',                            artist: 'Zero 7',                album: 'Simple Things',                            year: 2001 },
  { id: 't-21',  title: 'Hell Is Round The Corner',           artist: 'Tricky',                album: 'Maxinquaye',                               year: 1995 },
  { id: 't-22',  title: 'The Sea',                            artist: 'Morcheeba',             album: 'Big Calm',                                 year: 1998 },
  { id: 't-23',  title: 'Les Nuits',                          artist: 'Nightmares on Wax',     album: 'Carboot Soul',                             year: 1999 },
  { id: 't-24',  title: 'All Is Full of Love',                artist: 'Björk',                 album: 'Homogenic',                                year: 1997 },
  { id: 't-25',  title: 'Lebanese Blonde',                    artist: 'Thievery Corporation',  album: 'The Richest Man in Babylon',               year: 2002 },
  { id: 't-26',  title: 'Utopia',                             artist: 'Goldfrapp',             album: 'Felt Mountain',                            year: 2000 },
  { id: 't-27',  title: 'Dayvan Cowboy',                      artist: 'Boards of Canada',      album: 'The Campfire Headphase',                   year: 2005 },
  { id: 't-28',  title: 'Rabbit In Your Headlights',          artist: 'UNKLE',                 album: 'Psyence Fiction',                          year: 1998 },
  { id: 't-29',  title: 'Breathe',                            artist: 'Télépopmusik',          album: 'Genetic World',                            year: 2001 },
  { id: 't-30',  title: 'High Noon',                          artist: 'Kruder & Dorfmeister',  album: 'The K&D Sessions',                         year: 1998 },
  { id: 't-31',  title: 'Space Walk',                         artist: 'Lemon Jelly',           album: 'Lost Horizons',                            year: 2002 },
  { id: 't-32',  title: 'Building Steam With a Grain of Salt',artist: 'DJ Shadow',             album: 'Endtroducing.....',                        year: 1996 },
  { id: 't-33',  title: 'Kiara',                              artist: 'Bonobo',                album: 'Black Sands',                              year: 2010 },
  { id: 't-34',  title: 'Two Weeks',                          artist: 'FKA twigs',             album: 'LP1',                                      year: 2014 },
  { id: 't-35',  title: 'Human',                              artist: 'Sevdaliza',             album: 'ISON',                                     year: 2017 },
  { id: 't-36',  title: 'Gorecki',                            artist: 'Lamb',                  album: 'Lamb',                                     year: 1996 },
  { id: 't-37',  title: 'Glue',                               artist: 'Bicep',                 album: 'Bicep',                                    year: 2017 },
  { id: 't-38',  title: 'Odessa',                             artist: 'Caribou',               album: 'Swim',                                     year: 2010 },
  { id: 't-39',  title: 'Crystallised',                       artist: 'The xx',                album: 'xx',                                       year: 2009 },
  { id: 't-40',  title: 'Let Go',                             artist: 'Frou Frou',             album: 'Details',                                  year: 2002 },
  { id: 't-41',  title: 'Porcelain',                          artist: 'Moby',                  album: 'Play',                                     year: 1999 },
  { id: 't-42',  title: 'Smack My Bitch Up',                  artist: 'The Prodigy',           album: 'The Fat of the Land',                      year: 1997 },
  { id: 't-43',  title: 'Hey Boy Hey Girl',                   artist: 'The Chemical Brothers', album: 'Surrender',                                year: 1999 },
  { id: 't-44',  title: 'Insomnia',                           artist: 'Faithless',             album: 'Reverence',                                year: 1995 },
  { id: 't-45',  title: 'Around the World',                   artist: 'Daft Punk',             album: 'Homework',                                 year: 1997 },
  { id: 't-46',  title: 'Halcyon On and On',                  artist: 'Orbital',               album: 'Brown Album',                              year: 1993 },
  { id: 't-47',  title: 'Phat Planet',                        artist: 'Leftfield',             album: 'Rhythm and Stealth',                       year: 1999 },
  { id: 't-48',  title: 'Atom Bomb',                          artist: 'Fluke',                 album: 'Risotto',                                  year: 1997 },
  { id: 't-49',  title: 'Busy Child',                         artist: 'The Crystal Method',    album: 'Vegas',                                    year: 1997 },
  { id: 't-50',  title: 'Right Here, Right Now',              artist: 'Fatboy Slim',           album: "You've Come a Long Way, Baby",             year: 1998 },
  { id: 't-51',  title: 'Sandstorm',                          artist: 'Darude',                album: 'Before the Storm',                         year: 1999 },
  { id: 't-52',  title: 'Better Off Alone',                   artist: 'Alice Deejay',          album: 'Who Needs Guitars Anyway?',                year: 1999 },
  { id: 't-53',  title: 'Music Sounds Better With You',       artist: 'Stardust',              album: 'Single',                                   year: 1998 },
  { id: 't-54',  title: 'Red Alert',                          artist: 'Basement Jaxx',         album: 'Remedy',                                   year: 1999 },
  { id: 't-55',  title: 'Cassius 1999',                       artist: 'Cassius',               album: '1999',                                     year: 1999 },
  { id: 't-56',  title: 'Lady (Hear Me Tonight)',             artist: 'Modjo',                 album: 'Modjo',                                    year: 2000 },
  { id: 't-57',  title: 'Windowlicker',                       artist: 'Aphex Twin',            album: 'Windowlicker (EP)',                        year: 1999 },
  { id: 't-58',  title: 'D.A.N.C.E.',                         artist: 'Justice',               album: '† (Cross)',                                year: 2007 },
  { id: 't-59',  title: 'NY Excuse',                          artist: 'Soulwax',               album: 'Any Minute Now',                           year: 2004 },
  { id: 't-60',  title: 'Poney Pt. 1',                        artist: 'Vitalic',               album: 'OK Cowboy',                                year: 2005 },
  { id: 't-61',  title: 'Nightcall',                          artist: 'Kavinsky',              album: 'OutRun',                                   year: 2010 },
  { id: 't-62',  title: 'Viol',                               artist: 'Gesaffelstein',         album: 'Conspiracy Pt. 2',                         year: 2011 },
  { id: 't-63',  title: 'Moan',                               artist: 'Trentemøller',          album: 'The Last Resort',                          year: 2006 },
  { id: 't-64',  title: '& Down',                             artist: 'Boys Noize',            album: 'Oi Oi Oi',                                 year: 2007 },
  { id: 't-65',  title: 'Sunglasses at Night',                artist: 'Tiga',                  album: 'Sexor',                                    year: 2006 },
  { id: 't-66',  title: 'Shockwave',                          artist: 'The Hacker',            album: 'Rêves Mécaniques',                         year: 2004 },
  { id: 't-67',  title: 'Crimewave',                          artist: 'Crystal Castles',       album: 'Crystal Castles',                          year: 2008 },
  { id: 't-68',  title: 'Fineshrine',                         artist: 'Purity Ring',           album: 'Shrines',                                  year: 2012 },
  { id: 't-69',  title: 'The Mother We Share',                artist: 'Chvrches',              album: 'The Bones of What You Believe',            year: 2013 },
  { id: 't-70',  title: 'Dancing On My Own',                  artist: 'Robyn',                 album: 'Body Talk',                                year: 2010 },
  { id: 't-71',  title: 'Bulletproof',                        artist: 'La Roux',               album: 'La Roux',                                  year: 2009 },
  { id: 't-72',  title: 'Destroy Everything You Touch',       artist: 'Ladytron',              album: 'Witching Hour',                            year: 2005 },
  { id: 't-73',  title: "So Hot You're Hurting My Feelings",  artist: 'Caroline Polachek',     album: 'Pang',                                     year: 2019 },
  { id: 't-74',  title: 'Vroom Vroom',                        artist: 'Charli XCX',            album: 'Vroom Vroom (EP)',                         year: 2016 },
  { id: 't-75',  title: 'XS',                                 artist: 'Rina Sawayama',         album: 'Sawayama',                                 year: 2020 },
  { id: 't-76',  title: 'Just for me',                        artist: 'PinkPantheress',        album: 'to hell with it',                          year: 2021 },
  { id: 't-77',  title: 'SLIME',                              artist: 'Shygirl',               album: 'ALIAS (EP)',                               year: 2020 },
  { id: 't-78',  title: 'Immaterial',                         artist: 'Sophie',                album: "Oil of Every Pearl's Un-Insides",          year: 2018 },
  { id: 't-79',  title: 'Hot Pink',                           artist: "Let's Eat Grandma",     album: "I'm All Ears",                             year: 2018 },
  { id: 't-80',  title: 'money machine',                      artist: '100 gecs',              album: '1000 gecs',                                year: 2019 },
  { id: 't-81',  title: 'O.N.E.',                             artist: 'Yeasayer',              album: 'Odd Blood',                                year: 2010 },
  { id: 't-82',  title: 'Time to Pretend',                    artist: 'MGMT',                  album: 'Oracular Spectacular',                     year: 2007 },
  { id: 't-83',  title: 'Walking On A Dream',                 artist: 'Empire of the Sun',     album: 'Walking On A Dream',                       year: 2008 },
  { id: 't-84',  title: 'Animal',                             artist: 'Miike Snow',            album: 'Miike Snow',                               year: 2009 },
  { id: 't-85',  title: 'Dance Yrself Clean',                 artist: 'LCD Soundsystem',       album: 'This Is Happening',                        year: 2010 },
  { id: 't-86',  title: 'Over and Over',                      artist: 'Hot Chip',              album: 'The Warning',                              year: 2006 },
  { id: 't-87',  title: 'Heartbeats',                         artist: 'The Knife',             album: 'Deep Cuts',                                year: 2002 },
  { id: 't-88',  title: 'If I Had A Heart',                   artist: 'Fever Ray',             album: 'Fever Ray',                                year: 2009 },
  { id: 't-89',  title: 'Play',                               artist: 'Iamamiwhoami',          album: 'Kin',                                      year: 2012 },
  { id: 't-90',  title: 'Fuck the Pain Away',                 artist: 'Peaches',               album: 'The Teaches of Peaches',                   year: 2000 },
  { id: 't-91',  title: 'Frozen',                             artist: 'Madonna',               album: 'Ray of Light',                             year: 1998 },
  { id: 't-92',  title: 'Bike',                               artist: 'Autechre',              album: 'Incunabula',                               year: 1993 },
  { id: 't-93',  title: 'Beep Street',                        artist: 'Squarepusher',          album: 'Hard Normal Daddy',                        year: 1997 },
  { id: 't-94',  title: 'Acid Rain',                          artist: 'Lorn',                  album: 'The Maze To Nowhere',                      year: 2014 },
  { id: 't-95',  title: 'Ted',                                artist: 'Clark',                 album: 'Body Riddle',                              year: 2006 },
  { id: 't-96',  title: 'Do The Astral Plane',                artist: 'Flying Lotus',          album: 'Cosmogramma',                              year: 2010 },
  { id: 't-97',  title: 'Open Eye Signal',                    artist: 'Jon Hopkins',           album: 'Immunity',                                 year: 2013 },
  { id: 't-98',  title: 'Lush',                               artist: 'Four Tet',              album: 'New Energy',                               year: 2017 },
  { id: 't-99',  title: 'Space Is Only Noise If You Can See', artist: 'Nicolas Jaar',          album: 'Space Is Only Noise',                      year: 2011 },
  { id: 't-100', title: 'A New Error',                        artist: 'Moderat',               album: 'Moderat',                                  year: 2009 },
  { id: 't-101', title: 'Goodbye',                            artist: 'Apparat',               album: "The Devil's Walk",                         year: 2011 },
  { id: 't-102', title: 'Traffic',                            artist: 'Thom Yorke',            album: 'ANIMA',                                    year: 2019 },
  { id: 't-103', title: 'Gosh',                               artist: 'Jamie xx',              album: 'In Colour',                                year: 2015 },
  { id: 't-104', title: 'Nova',                               artist: 'Burial',                album: 'Nova (Single)',                            year: 2012 },
  { id: 't-105', title: 'Hyph Mngo',                          artist: 'Joy Orbison',           album: 'Hyph Mngo (Single)',                       year: 2009 },
  { id: 't-106', title: 'Pain',                               artist: 'Boy Harsher',           album: 'Yr Body Is Nothing',                       year: 2016 },
  { id: 't-107', title: 'Sulk',                               artist: 'TR/ST',                 album: 'TRST',                                     year: 2012 },
  { id: 't-108', title: 'Gallowdance',                        artist: 'Lebanon Hanover',       album: 'Tomb for Two',                             year: 2013 },
  { id: 't-109', title: 'Ritüel',                             artist: 'She Past Away',         album: 'Belirdi Gece',                             year: 2012 },
  { id: 't-110', title: 'Vessel',                             artist: 'Zola Jesus',            album: 'Conatus',                                  year: 2011 },
  { id: 't-111', title: '16 Psyche',                          artist: 'Chelsea Wolfe',         album: 'Hiss Spun',                                year: 2017 },
  { id: 't-112', title: 'Blue Monday',                        artist: 'Health',                album: 'Blue Monday (Single)',                     year: 2017 },
  { id: 't-113', title: 'Not In Love',                        artist: 'Crystal Castles',       album: 'Crystal Castles (II)',                     year: 2010 },
  { id: 't-114', title: 'The Robots',                         artist: 'Kraftwerk',             album: 'The Man-Machine',                          year: 1978 },
  { id: 't-115', title: 'Enjoy the Silence',                  artist: 'Depeche Mode',          album: 'Violator',                                 year: 1990 },
  { id: 't-116', title: 'Blue Monday',                        artist: 'New Order',             album: 'Power, Corruption & Lies',                 year: 1983 },
];

// Normalize artist name to a stable key
function artistKey(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// PRIMARY: Deezer — returns album cover + artist photo in one call
async function fetchDeezer(artist, title) {
  try {
    const q = encodeURIComponent(`track:"${title}" artist:"${artist}"`);
    const res = await fetch(`https://api.deezer.com/search?q=${q}&limit=5`, {
      headers: { 'User-Agent': 'XperimentalPlayer/1.0' },
      signal: AbortSignal.timeout(8000),
    });
    const data = await res.json();
    if (data.data?.length > 0) {
      const hit = data.data[0];
      return {
        coverUrl: hit.album.cover_xl ?? hit.album.cover_big ?? null,
        artistImageUrl: hit.artist.picture_xl ?? hit.artist.picture_big ?? null,
        artistName: hit.artist.name,
      };
    }
  } catch { /* fall through */ }
  return null;
}

// FALLBACK: iTunes — album cover only
async function fetchiTunes(artist, title) {
  try {
    const term = encodeURIComponent(`${artist} ${title}`);
    const res = await fetch(
      `https://itunes.apple.com/search?term=${term}&media=music&entity=song&limit=5`,
      { signal: AbortSignal.timeout(8000) }
    );
    const data = await res.json();
    if (data.results?.length > 0) {
      const cover = data.results[0].artworkUrl100?.replace('100x100bb', '600x600bb') ?? null;
      return { coverUrl: cover, artistImageUrl: null };
    }
  } catch { /* fall through */ }
  return null;
}

// Targeted artist photo from Deezer artist search
async function fetchArtistPhoto(artistName) {
  try {
    const q = encodeURIComponent(artistName);
    const res = await fetch(`https://api.deezer.com/search/artist?q=${q}&limit=1`, {
      headers: { 'User-Agent': 'XperimentalPlayer/1.0' },
      signal: AbortSignal.timeout(8000),
    });
    const data = await res.json();
    if (data.data?.length > 0) {
      return data.data[0].picture_xl ?? data.data[0].picture_big ?? null;
    }
  } catch { /* fall through */ }
  return null;
}

async function main() {
  const artworkMap = {};   // t-N  → coverUrl
  const artistImages = {}; // key  → imageUrl

  console.log(`\n━━━ fetchArtwork.mjs — ${DATASET.length} tracks ━━━\n`);

  for (let i = 0; i < DATASET.length; i++) {
    const { id, title, artist } = DATASET[i];
    const label = `[${String(i + 1).padStart(3, '0')}/${DATASET.length}]`;
    process.stdout.write(`${label} ${artist} — ${title} … `);

    let result = await fetchDeezer(artist, title);
    let source = 'deezer';
    if (!result?.coverUrl) {
      result = await fetchiTunes(artist, title);
      source = 'itunes';
    }

    const status = [];
    if (result?.coverUrl) {
      artworkMap[id] = result.coverUrl;
      status.push('cover✓');
    } else {
      status.push('cover✗');
    }

    if (result?.artistImageUrl) {
      const key = artistKey(artist);
      if (!artistImages[key]) {
        artistImages[key] = result.artistImageUrl;
        status.push('artist✓');
      }
    }

    console.log(`${status.join(' ')} (${source})`);
    await delay(DELAY_MS);
  }

  // Second pass: fill missing artist photos
  const uniqueArtists = [...new Set(DATASET.map(t => t.artist))];
  const missing = uniqueArtists.filter(a => !artistImages[artistKey(a)]);

  if (missing.length > 0) {
    console.log(`\n━━━ Artist photo pass — ${missing.length} missing ━━━\n`);
    for (const artistName of missing) {
      process.stdout.write(`  ${artistName} … `);
      const url = await fetchArtistPhoto(artistName);
      if (url) {
        artistImages[artistKey(artistName)] = url;
        console.log('✓');
      } else {
        console.log('✗');
      }
      await delay(DELAY_MS);
    }
  }

  // Merge artist images into map with "artist-" prefix
  for (const [key, url] of Object.entries(artistImages)) {
    artworkMap[`artist-${key}`] = url;
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(artworkMap, null, 2));

  const trackHits  = DATASET.filter(t => artworkMap[t.id]).length;
  const artistHits = Object.keys(artistImages).length;
  const total      = uniqueArtists.length;

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Track covers:  ${trackHits}/${DATASET.length}`);
  console.log(`Artist photos: ${artistHits}/${total}`);
  console.log(`Written:       src/data/artwork.json`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
}

main().catch(console.error);
