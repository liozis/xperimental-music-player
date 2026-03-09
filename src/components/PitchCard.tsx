import { ScrewHead } from './ScrewHead';

interface PitchCardProps {
  pitch: number;
  onPitchChange: (v: number) => void;
}

/** Format pitch value as a speed label for the scale markings */
function pitchLabel(v: number): string {
  return `${(v / 100).toFixed(2)}x`;
}

export function PitchCard({ pitch, onPitchChange }: PitchCardProps) {
  const isSlowed  = pitch < 100;
  const isFast    = pitch > 100;
  const deviation = Math.abs(pitch - 100);

  return (
    <div
      className="pitch-card hardware-panel relative bg-surface border border-border shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
      style={{ borderRadius: 'var(--radius-card)' }}
    >
      {/* Corner screws */}
      <span className="absolute top-[4px] left-[4px] z-10"><ScrewHead /></span>
      <span className="absolute top-[4px] right-[4px] z-10"><ScrewHead /></span>
      <span className="absolute bottom-[4px] left-[4px] z-10"><ScrewHead /></span>
      <span className="absolute bottom-[4px] right-[4px] z-10"><ScrewHead /></span>

      {/* Card label bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <span className="text-[10px] font-mono uppercase tracking-widest text-textSecondary">
          Pitch / Speed
        </span>
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-mono tabular-nums"
            style={{
              color: deviation > 30
                ? 'var(--color-accent)'
                : 'var(--color-text-secondary)',
            }}
          >
            {pitchLabel(pitch)}
          </span>
          <span className="text-[10px] font-mono text-accent tabular-nums font-bold">
            {pitch}%
          </span>
        </div>
      </div>

      {/* Slider section */}
      <div className="px-4 pt-3 pb-1">
        {/* Scale labels — top */}
        <div className="flex justify-between items-center mb-2">
          <span className={`text-[9px] font-mono ${isSlowed ? 'text-accent' : 'text-textSecondary/50'}`}>
            0.50x
          </span>
          <span className="text-[9px] font-mono text-textSecondary/50">NORMAL</span>
          <span className={`text-[9px] font-mono ${isFast ? 'text-accent' : 'text-textSecondary/50'}`}>
            2.00x
          </span>
        </div>

        {/* Horizontal pitch slider */}
        <input
          type="range"
          min={50}
          max={200}
          step={1}
          value={pitch}
          onChange={e => onPitchChange(Number(e.target.value))}
          className="pitch-slider w-full"
          aria-label="Pitch and speed control"
        />

        {/* Tick marks row */}
        <div className="relative mt-1.5 h-3">
          {/* Center normal marker */}
          <div
            className="absolute top-0 bottom-0 w-px bg-textSecondary/25"
            style={{ left: '50%' }}
          />
          {/* Quarter marks */}
          <div className="absolute top-0 h-1.5 w-px bg-textSecondary/15" style={{ left: '25%' }} />
          <div className="absolute top-0 h-1.5 w-px bg-textSecondary/15" style={{ left: '75%' }} />
        </div>

        {/* Semantic labels row */}
        <div className="flex justify-between mt-0.5">
          <span className="text-[8px] font-mono text-textSecondary/40 uppercase tracking-widest">SLOW</span>
          <span className="text-[8px] font-mono text-textSecondary/40 uppercase tracking-widest">NORM</span>
          <span className="text-[8px] font-mono text-textSecondary/40 uppercase tracking-widest">FAST</span>
        </div>
      </div>

      {/* Reset + Presets row */}
      <div className="flex items-center justify-between px-3 pb-3 pt-1.5 gap-2">
        {/* Preset buttons */}
        <div className="flex gap-1.5">
          {[75, 100, 125, 150].map(preset => (
            <button
              key={preset}
              onClick={() => onPitchChange(preset)}
              className={`pitch-preset-btn text-[9px] font-mono px-1.5 py-0.5 border transition-colors ${
                pitch === preset
                  ? 'bg-accent text-bg border-accent'
                  : 'bg-surface text-textSecondary border-border active:opacity-70'
              }`}
              style={{ borderRadius: 'var(--radius-btn)' }}
            >
              {preset}%
            </button>
          ))}
        </div>
        {/* Reset to normal */}
        <button
          onClick={() => onPitchChange(100)}
          className="text-[9px] font-mono text-textSecondary border border-border px-2 py-0.5 active:text-accent active:border-accent transition-colors"
          style={{ borderRadius: 'var(--radius-btn)' }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
