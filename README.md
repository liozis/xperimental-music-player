# Experimental Music Player
### High-Fidelity Multi-Skin Audio Player with Procedural Visualizers and Retro-Aesthetics

---

## A Design Experiment: From Static Mockups to High-Fidelity Soul

As a **Product Designer**, I've spent years crafting high-fidelity mockups in Figma, often spending 4–5 weeks on a single project just to show a *glimpse* of interaction. Usually, by the time a design reaches development, the most "tactile" and "expressive" details are simplified due to technical constraints or timeline pressures.

**This project is my breakthrough.**

### The Vision: Reviving the Soul of UI

I deeply miss the color, vitality, and sheer personality of early UI design. Modern interfaces have become sterile and overly standardized. This experiment was my playground to realize a design fantasy: bringing back the tactile, maximalist, and "soulful" energy of the early 2000s software era.

This project is a direct **tribute to Winamp skin culture**—a time when software was an extension of your personality, not just a utility.

### The Power of AI-Native Design

By adopting an **AI-Native workflow** with Claude, I completely bypassed the "static design" phase and moved directly into building a fully functional product. What would have normally taken me over a month to prototype—with far less realistic animations—was achieved in a fraction of the time.

- **Zero Compromise**: I didn't have to simplify my vision. The extreme skeuomorphism, complex gradients, and hardware-inspired layouts were implemented exactly as I imagined them, without "dumbing down" the UI for easier coding.
- **Designer as Creator**: With AI, the distance between a designer's raw vision and a functional, polished output has vanished. I am no longer just drawing buttons; I am engineering an entire sensory experience.

### Visual & Aesthetic References

This study was heavily influenced by the incredible archives of:

- **[CARI (Consumer Aesthetics Research Institute)](https://cari.institute/aesthetics)**: My primary guide for defining aesthetics like Metalheart, Acidgrafix, and Future Medieval.
- **[The Winamp Skin Museum](https://skins.webamp.org/)**: A frequent source of inspiration during development, reminding me of how fun and expressive software used to be.

---

## Four Unique Skins

### 1. **Cassette Futurism**
**Aesthetic**: Vintage hardware meets nostalgic 80s/90s energy
- **Visualizer**: Stacked LED segment meters in matte orange (`#FF8C00`)
- **Peak Display**: Single floating LED block above each bar
- **Dark PCB Background**: Authentic cassette deck feel with dark hardware palette
- **Buttons**: Orange glow when active, dimmed brown when inactive
- **Best For**: Retro synthwave, electronic, and house music

### 2. **Future Medieval**
**Aesthetic**: Cathedral stained glass meets futuristic minimalism
- **Visualizer**: 4-color stained glass cycles (Ruby Red, Cobalt Blue, Emerald Green, Amber Yellow)
- **Architecture**: Gothic arch-topped blocks with cast-iron dark borders
- **Peak Display**: Matching colored glass blocks with luminous glow
- **Background**: Radiant gradient suggesting light through stained glass
- **Best For**: Ambient, orchestral, experimental, and atmospheric music

### 3. **AcidGrafix**
**Aesthetic**: Toxic neon cyberpunk with sharp contrasts
- **Visualizer**: Electric magenta blocks (`#FF00FF`) when active, 100% bright toxic green (`#B2ED32`) when inactive
- **Peak Display**: Toxic green blocks with neon glow (sharp magenta contrast when playing)
- **Shuffle/Repeat**: Bright green inactive — Electric magenta active (unmistakable toggle feedback)
- **Effects**: Aggressive neon glow shadows and glitch aesthetics
- **Best For**: Techno, acid house, industrial, and glitch music

### 4. **MetalHeart**
**Aesthetic**: Liquid metal chrome meets industrial robotics
- **Visualizer**: 6-stop chrome gradient segmented into discrete blocks via CSS mask-image
- **3D Depth**: Inset shadows create cylindrical volume effect
- **Peak Display**: Chrome gradient floating blocks with sapphire glow
- **Background**: Navy-steel gradient suggesting liquid metal pools
- **Best For**: Darkwave, industrial, and futuristic genres

---

## Custom JavaScript Physics Engine

The visualizer runs on a **custom JavaScript procedural animation system** (not CSS keyframes) that generates realistic, genre-aware choreographies. Each track automatically selects a profile based on its ID hash, ensuring consistent per-track behavior.

### Core Features

**Attack/Decay Physics**
- **Instant Attack**: Bars snap to target height immediately (Winamp-style responsiveness)
- **Gravity Decay**: Bars fall with real-world-inspired gravity, decay rate depends on genre
- **Minimum Floor**: 1.5% baseline height ensures bars never fully disappear

**Peak Hold Mechanic** (Winamp Signature)
- Floating peak blocks that hover above bars at their maximum reached height
- Configurable hold time before slow fall (varies by profile)
- Creates a "memory" effect showing the peak amplitude of each beat

**Realistic Intro Build-Up**
- Bars start at **0 height** when a track begins
- Smoothstep easing over **2.5 seconds** gradually brings amplitude from 0% to 100%
- Simulates natural song fade-in and beat building up before full intensity

### 3 Genre-Accurate Profiles

#### **Profile 0: Downtempo**
- **Tempo Feel**: ~60 BPM, lazy and atmospheric
- **Characteristics**: Very slow attack, extremely slow decay, bass-heavy left side, max 45% amplitude
- **Physics**: `tickInterval: 0.18`, `decay: 0.6`, `peakHoldTime: 0.8s`, `peakFallRate: 0.3`
- **Use Case**: Deep basslines rolling gently, perfect for lo-fi and ambient

#### **Profile 1: Minimal Tech**
- **Tempo Feel**: 128 BPM, mechanical and precise
- **Characteristics**: Fast target generation, aggressive decay, sparse near-zero activity with sharp kick spikes
- **Physics**: `tickInterval: 0.04`, `decay: 5.0`, `peakHoldTime: 0.1s`, `peakFallRate: 2.5`
- **Use Case**: Techno kicks, minimal house, where rhythm is sparse but punchy

#### **Profile 2: Trip Hop**
- **Tempo Feel**: ~90 BPM, syncopated and groovy
- **Characteristics**: Syncopated kick pattern, deep bass rolls, atmospheric mid-range holds
- **Physics**: `tickInterval: 0.1`, `decay: 1.8`, `peakHoldTime: 0.35s`, `peakFallRate: 0.8`
- **Use Case**: Trip-hop, downbeat, R&B, where rhythm breathes and grooves

---

## Player Features

### Playback Controls
- **Play/Pause**: Toggle playback with visual feedback (paused state dims bars)
- **Next/Previous**: Skip tracks (visualizer profile switches automatically)
- **Shuffle**: Toggle shuffle mode (AcidGrafix shows bright green inactive — magenta active)
- **Repeat**: Toggle repeat mode (same visual feedback as shuffle)
- **Progress Slider**: Scrub to any position with real-time visualizer sync

### Visual Feedback
- **Pause Decay**: When paused, bars gently decay to idle state (no hard cut)
- **Intro Sequence**: New tracks fade in visually over 2.5s (not instant blasts)
- **Peak Hold**: Peak blocks linger after beat, then gradually fall
- **Skin Switching**: All skins use unified block architecture for consistency
- **Responsive**: Visualizer adapts container height dynamically

---

## Technical Stack

**Frontend Framework**
- React 19 (Vite dev server)
- TypeScript for type safety
- Tailwind CSS for responsive layout

**Styling**
- CSS3 custom properties (variables) for skin theming
- `repeating-linear-gradient` for segmented block architecture
- CSS `mask-image` for MetalHeart chrome segments
- Box shadows and text shadows for glow effects

**Physics Engine**
- `setInterval(tick, 16)` for reliable 60 FPS timing
- `Float32Array` for efficient per-bar state management
- Mutable refs pattern for performance (no React re-renders during animation)
- Seeded random number generator (deterministic per-track variation)

---

## Getting Started

### Installation
```bash
git clone https://github.com/liozis/xperimental-music-player.git
cd xperimental-music-player
npm install
```

### Development
```bash
npm run dev
```
Opens dev server at `http://localhost:5173` with hot module reloading.

### Build for Production
```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── AudioVisualizer.tsx       # Procedural physics engine & 3 profiles
│   ├── MainPlayerCard.tsx        # Player UI & controls
│   ├── EqualizerCard.tsx         # EQ sliders
│   └── QueueCard.tsx             # Track queue display
├── screens/
│   ├── PlayerScreen.tsx          # Player modal + state management
│   └── HomeScreen.tsx            # Music library browsing
├── context/
│   ├── PlayerContext.tsx         # Global playback state
│   └── SkinContext.tsx           # Skin theme management
├── index.css                     # All styling (variables, skins, visualizer)
└── main.tsx                      # Entry point
```

---

## Perfect Matching Scenarios

| Skin | Music Genres | Vibe |
|------|-------------|------|
| **Cassette** | Synthwave, House, Electronic | Nostalgic warmth, vintage hardware |
| **Medieval** | Ambient, Orchestral, Experimental | Timeless cathedral, spiritual |
| **AcidGrafix** | Techno, Industrial, Glitch | Cyber dystopia, neon chaos |
| **MetalHeart** | Darkwave, Futurism, Sci-Fi | Liquid metal, high-tech luxury |

---

## License

MIT License - Feel free to fork, modify, and deploy!

---

**Made with 💜 by Selen İdil Öziş**
