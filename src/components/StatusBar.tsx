/** Fake iOS status bar — 44px tall, sits at top of device shell */
export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 bg-bg flex-shrink-0" style={{ height: 44 }}>
      {/* Time */}
      <span className="text-sm font-semibold text-textPrimary" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '-0.3px' }}>
        9:41
      </span>

      {/* Right cluster: cellular · wifi · battery */}
      <div className="flex items-center gap-1.5" style={{ color: 'var(--color-text-primary)' }}>
        {/* Cellular signal — 4 bars */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0"    y="7"  width="3" height="4"  rx="0.5" opacity="1"/>
          <rect x="4.5"  y="5"  width="3" height="6"  rx="0.5" opacity="1"/>
          <rect x="9"    y="2.5" width="3" height="8.5" rx="0.5" opacity="1"/>
          <rect x="13.5" y="0"  width="3" height="11" rx="0.5" opacity="1"/>
        </svg>

        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeLinecap="round">
          <path d="M8 9.5 a0.5 0.5 0 1 1 0.001 0Z" fill="currentColor" stroke="none"/>
          <path d="M5.3 7.3 Q8 4.8 10.7 7.3" strokeWidth="1.3"/>
          <path d="M2.8 4.8 Q8 0.5 13.2 4.8" strokeWidth="1.3"/>
        </svg>

        {/* Battery */}
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
          <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke="currentColor" strokeOpacity="0.35"/>
          <rect x="1.5" y="1.5" width="18" height="10" rx="2.5" fill="currentColor"/>
          <path d="M23.5 4.5 L23.5 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}
