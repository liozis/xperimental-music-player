/** Philips-head industrial screw icon for hardware panel corners */
export function ScrewHead({ size = 9 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      aria-hidden="true"
      className="screw-head pointer-events-none select-none"
    >
      {/* Outer rim — raised chrome ring */}
      <circle cx="5" cy="5" r="4.6" fill="#9a948c" stroke="rgba(0,0,0,0.55)" strokeWidth="0.6" />
      {/* Body — matte metal disc */}
      <circle cx="5" cy="5" r="3.6" fill="#7e7870" />
      {/* Philips cross — horizontal + vertical slots */}
      <rect x="4.35" y="2.4" width="1.3" height="5.2" rx="0.35" fill="rgba(0,0,0,0.68)" />
      <rect x="2.4" y="4.35" width="5.2" height="1.3" rx="0.35" fill="rgba(0,0,0,0.68)" />
      {/* Specular highlight — top-left catch light */}
      <circle cx="4" cy="4" r="1.1" fill="rgba(255,255,255,0.28)" />
    </svg>
  );
}
