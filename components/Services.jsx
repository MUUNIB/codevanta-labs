import TiltCard from './TiltCard';
import Icon from './Icon';
import SectionHeading from './SectionHeading';
import { services } from '@/lib/content';

// Fixed Bento layout: 2 wide top cards (3 cols each = 6 total), 3 bottom cards (2 cols each = 6 total)
const SPANS = [
  'lg:col-span-3', 
  'lg:col-span-3', 
  'lg:col-span-2', 
  'lg:col-span-2', 
  'lg:col-span-2'
];

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="services-title" title="Five practices, one team">
          Engineering, AI, data and growth work best when they share a roadmap. Pick one practice or combine them.
        </SectionHeading>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {services.map((s, i) => (
            <TiltCard key={s.id} className={SPANS[i] || 'lg:col-span-2'} aria-labelledby={`svc-${s.id}`}>
              <div className="flex h-full flex-col p-7 sm:p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-electric/30 bg-electric/[0.07] text-electric shadow-[0_0_24px_-6px_rgb(0_240_255/0.6)]">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>

                <h3 id={`svc-${s.id}`} className="mt-7 font-display text-[1.6rem] font-semibold leading-[1.1] text-ink">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-[46ch] leading-relaxed text-steel">{s.summary}</p>

                <ul className="mt-6 space-y-2.5 text-[0.95rem] text-ink/90">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 flex-none rotate-45 bg-electric" />
                      {d}
                    </li>
                  ))}
                </ul>

                <ul className="mt-auto flex flex-wrap gap-2 pt-8" aria-label="Technologies">
                  {s.stack.map((t) => (
                    <li key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-steel">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}