import { useRef, useEffect } from 'react';

interface AudioVisualizerProps {
  isPlaying: boolean;
  progress: number;       // 0–100
  trackId: string;        // triggers profile switch on change
}

const BAR_COUNT = 28;
const INTRO_DURATION = 2.5; // seconds for bars to ease from 0 → full height

/* ================================================================
   CHOREOGRAPHY PROFILES — 3 genre-accurate procedural physics
   ================================================================ */

interface Profile {
  tickInterval: number;     // seconds between target generation bursts
  decay: number;            // height-units/sec gravity fall for bars
  peakHoldTime: number;     // seconds a peak dot "hangs" before falling
  peakFallRate: number;     // height-units/sec fall speed for peaks
  generate: (i: number, count: number, t: number) => number;
}

const PROFILES: Profile[] = [

  /* ── Profile 0 · Downtempo ───────────────────────────
     Very slow attack, extremely slow decay. Low overall
     amplitude (~max 0.45). Bars roll gently like a deep
     lazy bassline. Bass-heavy left side, very smooth. */
  {
    tickInterval: 0.18,
    decay: 0.6,
    peakHoldTime: 0.8,
    peakFallRate: 0.3,
    generate(i, count, t) {
      const pos = i / count;
      // Deep bass emphasis on left side
      const bass = Math.max(0, 1 - pos * 2.0);
      // Slow sine waves for gentle rolling motion
      const wave1 = Math.sin(t * 1.2 + i * 0.35) * 0.5 + 0.5;
      const wave2 = Math.sin(t * 0.7 + i * 0.6)  * 0.5 + 0.5;
      const breathe = Math.sin(t * 0.4) * 0.1 + 0.1;
      const n = Math.random();
      return Math.max(0, Math.min(0.45,
        wave1 * bass * 0.22
        + wave2 * 0.12
        + breathe * (1 - Math.abs(pos - 0.3))
        + n * 0.04,
      ));
    },
  },

  /* ── Profile 1 · Minimal Tech ────────────────────────
     Sharp precise sparse. Fast attack, fast decay. Bars
     sit near-zero, spike sharply on simulated kick beats.
     Very mechanical, ~128 BPM precision timing. */
  {
    tickInterval: 0.04,
    decay: 5.0,
    peakHoldTime: 0.1,
    peakFallRate: 2.5,
    generate(i, count, t) {
      const pos = i / count;
      // 128 BPM = 2.133 beats/sec → period ≈ 0.469s
      const beatPhase = (t * 2.133) % 1.0;
      const kick = beatPhase < 0.08 ? 1.0 : 0.0;
      // Hi-hat on offbeats (every half-beat)
      const hatPhase = (t * 4.266) % 1.0;
      const hat = hatPhase < 0.04 ? 0.6 : 0.0;
      // Bass on left, hat on right
      const bassWeight = Math.max(0, 1 - pos * 2.5);
      const hatWeight  = Math.max(0, (pos - 0.5) * 2.0);
      const n = Math.random();
      // Mostly silent floor, sharp spikes
      return Math.min(1.0,
        kick * bassWeight * (0.7 + n * 0.3)
        + hat * hatWeight * (0.3 + n * 0.2)
        + n * 0.01,
      );
    },
  },

  /* ── Profile 2 · Trip Hop ────────────────────────────
     Syncopated and groovy. Irregular peaks, atmospheric
     holds, mid-tempo bounce (~90 BPM). Mix of deep bass
     rolls and sudden sharp snare spikes. */
  {
    tickInterval: 0.1,
    decay: 1.8,
    peakHoldTime: 0.35,
    peakFallRate: 0.8,
    generate(i, count, t) {
      const pos = i / count;
      // ~90 BPM = 1.5 beats/sec
      const beatPos = (t * 1.5) % 4.0;
      // Syncopated kick: hits on 1, skips 2, hits on "and" of 3
      const kick = (beatPos < 0.15 || (beatPos > 2.4 && beatPos < 2.6)) ? 1.0 : 0.0;
      // Snare on beat 3 with swing
      const snare = (beatPos > 2.9 && beatPos < 3.15) ? 1.0 : 0.0;
      // Deep bass roll (slow sine, left-weighted)
      const bassRoll = (Math.sin(t * 1.5 + i * 0.2) * 0.5 + 0.5)
                       * Math.max(0, 1 - pos * 1.8);
      // Atmospheric mid-range hold
      const atmos = Math.sin(t * 0.6 + i * 0.4) * 0.5 + 0.5;
      const midWeight = Math.max(0, 1 - Math.abs(pos - 0.45) * 3.0);
      const n = Math.random();
      return Math.min(0.85,
        kick * Math.max(0, 1 - pos * 2.0) * (0.5 + n * 0.35)
        + snare * (0.35 + n * 0.3)
        + bassRoll * 0.18
        + atmos * midWeight * 0.15
        + n * 0.03,
      );
    },
  },
];

/** Deterministic: same trackId → same profile index */
function trackToProfile(trackId: string): number {
  let h = 0;
  for (let i = 0; i < trackId.length; i++) {
    h = ((h << 5) - h + trackId.charCodeAt(i)) | 0;
  }
  return (h >>> 0) % PROFILES.length;
}

/* ================================================================
   PHYSICS STATE
   ================================================================ */

interface PhysicsState {
  heights: Float32Array;      // current visual bar height 0–1
  targets: Float32Array;      // target height for next attack
  peaks: Float32Array;        // peak-dot position 0–1
  peakTimers: Float32Array;   // seconds remaining in peak hold
}

function createPhysics(): PhysicsState {
  return {
    heights:    new Float32Array(BAR_COUNT),       // start at 0 for intro
    targets:    new Float32Array(BAR_COUNT),
    peaks:      new Float32Array(BAR_COUNT),
    peakTimers: new Float32Array(BAR_COUNT),
  };
}

/* ================================================================
   COMPONENT
   ================================================================ */

export function AudioVisualizer({ isPlaying, progress, trackId }: AudioVisualizerProps) {
  const barRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const peakRefs = useRef<(HTMLDivElement | null)[]>([]);

  const physics      = useRef(createPhysics());
  const profileIdx   = useRef(trackToProfile(trackId));
  const isPlayingR   = useRef(isPlaying);
  const progressR    = useRef(progress);
  const originTime   = useRef(performance.now() / 1000);
  const introStart   = useRef(performance.now() / 1000);
  const tickAccum    = useRef(0);

  // ── Sync mutable refs every render ────────────────────
  isPlayingR.current = isPlaying;

  // ── Detect progress scrub → trigger visual burst ──────
  useEffect(() => {
    const delta = Math.abs(progress - progressR.current);
    progressR.current = progress;
    if (delta > 3) {
      const s = physics.current;
      for (let i = 0; i < BAR_COUNT; i++) {
        s.targets[i] = 0.45 + Math.random() * 0.55;
      }
    }
  }, [progress]);

  // ── Main physics loop (setInterval — immune to off-screen RAF throttling) ──
  // Re-starts whenever trackId changes (ensures fresh refs + profile)
  useEffect(() => {
    // Reset physics for new track
    profileIdx.current = trackToProfile(trackId);
    const nowSec = performance.now() / 1000;
    originTime.current = nowSec;
    introStart.current = nowSec;       // reset intro build-up
    tickAccum.current  = 0;
    const s = physics.current;
    s.heights.fill(0);                 // start at 0 for intro
    s.targets.fill(0);
    s.peaks.fill(0);
    s.peakTimers.fill(0);

    let last = performance.now();

    const tick = () => {
      try {
        const now   = performance.now();
        const dtRaw = (now - last) / 1000;
        const dt    = Math.min(dtRaw, 0.05);   // cap at 50 ms
        last = now;

        const st      = physics.current;
        const p       = PROFILES[profileIdx.current];
        const playing = isPlayingR.current;
        const elapsed = now / 1000 - originTime.current;

        // ── Intro build-up: ease max height 0% → 100% ────
        const introElapsed = now / 1000 - introStart.current;
        let introLimit = Math.min(1, introElapsed / INTRO_DURATION);
        // Smoothstep easing: 3t² - 2t³
        introLimit = introLimit * introLimit * (3 - 2 * introLimit);

        /* ── Generate new targets ───────────────────────── */
        if (playing) {
          tickAccum.current += dt;
          while (tickAccum.current >= p.tickInterval) {
            tickAccum.current -= p.tickInterval;
            for (let i = 0; i < BAR_COUNT; i++) {
              st.targets[i] = p.generate(i, BAR_COUNT, elapsed) * introLimit;
            }
          }
        } else {
          // Paused → targets bleed to zero
          for (let i = 0; i < BAR_COUNT; i++) {
            st.targets[i] *= 0.93;
          }
        }

        /* ── Per-bar physics ────────────────────────────── */
        const minH = 0.015 * introLimit;  // floor also eases in

        for (let i = 0; i < BAR_COUNT; i++) {

          // ▸ ATTACK / DECAY
          if (st.targets[i] > st.heights[i]) {
            st.heights[i] = st.targets[i]; // instant snap up
          } else {
            st.heights[i] -= p.decay * dt; // gravity fall
          }
          if (st.heights[i] < minH) st.heights[i] = minH;

          // ▸ PEAK HOLD
          if (st.heights[i] >= st.peaks[i] - 0.008) {
            st.peaks[i] = Math.max(st.peaks[i], st.heights[i]);
            st.peakTimers[i] = p.peakHoldTime;
          } else if (st.peakTimers[i] > 0) {
            st.peakTimers[i] -= dt;
          } else {
            st.peaks[i] -= p.peakFallRate * dt;
          }
          if (st.peaks[i] < 0) st.peaks[i] = 0;

          // ▸ WRITE TO DOM
          const barEl = barRefs.current[i];
          if (barEl) {
            barEl.style.height = `${(st.heights[i] * 100).toFixed(1)}%`;
          }
          const peakEl = peakRefs.current[i];
          if (peakEl) {
            peakEl.style.bottom  = `${(st.peaks[i] * 100).toFixed(1)}%`;
            peakEl.style.opacity = st.peaks[i] > 0.025 ? '1' : '0';
          }
        }
      } catch (_) {
        // Swallow errors to keep the loop alive
      }
    };

    // ~60 fps via setInterval — reliable even when off-screen
    const id = setInterval(tick, 16);
    return () => clearInterval(id);
  }, [trackId]); // restart loop on track change

  /* ── Render ──────────────────────────────────────────── */
  return (
    <div className="visualizer-bars">
      {Array.from({ length: BAR_COUNT }, (_, i) => (
        <div key={i} className="viz-col">
          <div
            className="viz-bar"
            ref={el => { barRefs.current[i] = el; }}
          />
          <div
            className="viz-peak"
            ref={el => { peakRefs.current[i] = el; }}
          />
        </div>
      ))}
    </div>
  );
}
