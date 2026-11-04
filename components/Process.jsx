'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { steps } from '@/lib/content';

export default function Process() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 80%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });

  return (
    <section id="process" aria-labelledby="process-title" className="relative border-t border-white/[0.06] py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="process-title" title="How a project runs">
          Four stages, each ending with something you can review before we move on.
        </SectionHeading>

        <div className="relative">
          {/* Progress line: vertical on mobile, horizontal on desktop */}
          <div aria-hidden="true" className="absolute bottom-2 left-[21px] top-2 w-px bg-white/10 lg:hidden">
            <motion.div className="h-full w-full origin-top bg-linear-to-b from-electric to-royal" style={{ scaleY: progress }} />
          </div>
          <div aria-hidden="true" className="absolute left-0 right-0 top-[21px] hidden h-px bg-white/10 lg:block">
            <motion.div className="h-full w-full origin-left bg-linear-to-r from-electric to-royal" style={{ scaleX: progress }} />
          </div>

          <ol ref={listRef} className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, i) => (
              <li key={step.title} className="relative grid grid-cols-[44px_1fr] gap-5 lg:block">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-electric/40 bg-obsidian font-display text-sm font-semibold text-electric shadow-[0_0_24px_-6px_rgb(0_240_255/0.7)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="lg:mt-8">
                  <h3 className="font-display text-2xl font-semibold leading-tight text-ink">{step.title}</h3>
                  <p className="mt-3 max-w-[34ch] leading-relaxed text-steel">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
