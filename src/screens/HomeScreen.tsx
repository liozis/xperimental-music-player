import { RECENTLY_PLAYED, JUMP_BACK_IN, RECOMMENDED } from '../data/mockData';
import type { Track } from '../data/mockData';
import { TrackCard } from '../components/TrackCard';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

interface SectionProps {
  title: string;
  tracks: Track[];
}

function HorizontalSection({ title, tracks }: SectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-base font-display text-textSecondary px-4 mb-4 tracking-widest uppercase">
        {title}
      </h2>
      <div className="scroll-x flex gap-4 px-4">
        {tracks.map(t => <TrackCard key={t.id} track={t} />)}
      </div>
    </section>
  );
}

export function HomeScreen() {
  return (
    <div className="scroll-y h-full pb-28">
      <div className="px-4 pt-8 pb-6">
        <p className="text-xs text-textSecondary font-mono tracking-widest uppercase">
          {greeting()}
        </p>
        <h1 className="text-2xl font-display text-textPrimary mt-1">Home</h1>
      </div>
      <HorizontalSection title="Recently Played" tracks={RECENTLY_PLAYED} />
      <HorizontalSection title="Jump Back In"    tracks={JUMP_BACK_IN} />
      <HorizontalSection title="Recommended"     tracks={RECOMMENDED} />
    </div>
  );
}
