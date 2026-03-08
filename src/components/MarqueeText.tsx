interface MarqueeTextProps {
  text: string;
  className?: string;
  threshold?: number;
}

export function MarqueeText({ text, className = '', threshold = 18 }: MarqueeTextProps) {
  const shouldAnimate = text.length > threshold;

  if (!shouldAnimate) {
    return <span className={`truncate block ${className}`}>{text}</span>;
  }

  return (
    <span className={`marquee-container block ${className}`}>
      <span className="marquee-text">{text}</span>
      <span className="marquee-text" aria-hidden>{text}</span>
    </span>
  );
}
