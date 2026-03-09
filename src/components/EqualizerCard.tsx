const EQ_BANDS = [
  { id: 'eq-60hz',  label: '60Hz'  },
  { id: 'eq-230hz', label: '230Hz' },
  { id: 'eq-910hz', label: '910Hz' },
  { id: 'eq-4khz',  label: '4kHz'  },
  { id: 'eq-14khz', label: '14kHz' },
];

function toDB(v: number): string {
  const db = ((v / 100) * 24 - 12).toFixed(0);
  return Number(db) > 0 ? `+${db}` : db;
}

interface EqualizerCardProps {
  eqValues: Record<string, number>;
  onEqChange: (id: string, value: number) => void;
  pitch: number;
  onPitchChange: (v: number) => void;
}

/** Trigger the per-skin dB number micro-animation when a band changes */
function fireDbTick(bandId: string) {
  const el = document.getElementById(`db-${bandId}`);
  if (!el) return;
  // Force reflow to restart the animation if already mid-tick
  el.removeAttribute('data-ticking');
  void el.offsetWidth;
  el.setAttribute('data-ticking', 'true');
  setTimeout(() => el.removeAttribute('data-ticking'), 220);
}

export function EqualizerCard({ eqValues, onEqChange, pitch, onPitchChange }: EqualizerCardProps) {
  const handleChange = (id: string, value: number) => {
    fireDbTick(id);
    onEqChange(id, value);
  };

  const speedLabel = `${(pitch / 100).toFixed(2)}x`;
  const isNormal   = pitch === 100;

  return (
    <div
      className="bg-surface border border-border shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
      style={{ borderRadius: 'var(--radius-card)' }}
    >
      {/* ── Card label bar ─────────────────────────────────── */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <span className="text-[10px] font-mono uppercase tracking-widest text-textSecondary">
          Equalizer
        </span>
        <span className="text-[10px] font-mono text-accent">EQ</span>
      </div>

      {/* ── EQ Band Sliders ────────────────────────────────── */}
      <div className="flex justify-between gap-1 px-3 pt-3 pb-2">
        {EQ_BANDS.map(band => (
          <div key={band.id} className="flex flex-col items-center gap-1 flex-1">
            {/* id="db-{band.id}" is targeted by fireDbTick for skin micro-animation */}
            <span
              id={`db-${band.id}`}
              className="eq-db-value text-[10px] font-mono text-accent tabular-nums"
            >
              {toDB(eqValues[band.id])}dB
            </span>
            <input
              type="range" min={0} max={100}
              id={band.id} name={band.id}
              value={eqValues[band.id]}
              onChange={e => handleChange(band.id, Number(e.target.value))}
              className="eq-slider"
            />
            <span className="text-[10px] font-mono text-textSecondary">{band.label}</span>
          </div>
        ))}
      </div>

      {/* ── Divider between EQ and Pitch ───────────────────── */}
      <div className="mx-3 border-t border-border/50" />

      {/* ── Pitch / Speed Section ──────────────────────────── */}
      <div className="px-3 pt-2.5 pb-3">
        {/* Header row */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-textSecondary">
            Pitch / Speed
          </span>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-mono tabular-nums ${isNormal ? 'text-textSecondary/50' : 'text-accent'}`}>
              {speedLabel}
            </span>
            <span className="text-[10px] font-mono text-accent font-bold tabular-nums">
              {pitch}%
            </span>
            {!isNormal && (
              <button
                onClick={() => onPitchChange(100)}
                className="text-[9px] font-mono text-textSecondary border border-border/60 px-1.5 py-0.5 active:text-accent transition-colors"
                style={{ borderRadius: 'var(--radius-btn)' }}
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Horizontal pitch slider — deep channel with metallic knob */}
        <input
          type="range"
          min={50} max={200} step={1}
          value={pitch}
          onChange={e => onPitchChange(Number(e.target.value))}
          className="pitch-slider w-full"
          aria-label="Pitch and speed control"
        />

        {/* Scale markings */}
        <div className="flex justify-between mt-1.5">
          <span className="text-[8px] font-mono text-textSecondary/40 uppercase tracking-wide">0.50x</span>
          <span className="text-[8px] font-mono text-textSecondary/40 uppercase tracking-wide">NORM</span>
          <span className="text-[8px] font-mono text-textSecondary/40 uppercase tracking-wide">2.00x</span>
        </div>
      </div>
    </div>
  );
}
