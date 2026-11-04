'use client';

import { useEffect, useRef } from 'react';
import { animate, motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import Icon from './Icon';
import SectionHeading from './SectionHeading';
import { stack } from '@/lib/content';

const STEP = 360 / stack.length;

function Badge({ item, index, rotation, radius }) {
  const transform = useTransform(radius, (r) => `rotateY(${index * STEP}deg) translateZ(${r}px)`);
  // Badges facing the viewer are bright; the ones turned away fade back.
  const facing = useTransform(rotation, (rot) => Math.cos(((index * STEP + rot) * Math.PI) / 180));
  const opacity = useTransform(facing, (f) => 0.22 + 0.78 * Math.max(0, f));

  return (
    <motion.li
      style={{ transform, opacity, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
      className="absolute left-1/2 top-1/2 -ml-[70px] -mt-[52px] flex h-[104px] w-[140px] flex-col justify-center rounded-[20px] border border-line bg-surface px-4 shadow-[0_18px_40px_-18px_rgb(15_23_42/0.25),0_2px_6px_-2px_rgb(15_23_42/0.08)] md:-ml-[95px] md:-mt-[64px] md:h-[128px] md:w-[190px] md:px-5"
    >
      <span className="font-display text-xl font-semibold text-ink md:text-[1.8rem]">{item.name}</span>
      <span className="mt-1 text-xs leading-snug text-steel md:text-[0.8rem]">{item.use}</span>
    </motion.li>
  );
}

export default function TechStack() {
  const reduce = useReducedMotion();
  const rotation = useMotionValue(0);
  const radius = useMotionValue(300);
  const hovering = useRef(false);
  const drag = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const set = () => radius.set(mq.matches ? 400 : 230);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, [radius]);

  useAnimationFrame((_, delta) => {
    if (reduce || hovering.current || drag.current) return;
    rotation.set(rotation.get() - Math.min(delta, 50) * 0.01);
  });

  const ringTransform = useTransform([rotation, radius], ([rot, r]) => `translateZ(${-r}px) rotateX(-7deg) rotateY(${rot}deg)`);

  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, start: rotation.get() };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    rotation.set(drag.current.start + (e.clientX - drag.current.x) * 0.35);
  };
  const endDrag = () => {
    drag.current = null;
  };

  const turn = (dir) => {
    const target = Math.round((rotation.get() + dir * STEP) / STEP) * STEP;
    animate(rotation, target, reduce ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 20 });
  };

  return (
    <section id="stack" aria-labelledby="stack-title" className="relative overflow-clip border-t border-line py-28 lg:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgb(15_23_42/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(15_23_42/0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="stack-title" title="The tools we ship with">
          Proven, well-supported technology chosen for each job. Drag the ring or use the arrows to explore it.
        </SectionHeading>

        <div
          className="relative mx-auto h-[300px] max-w-4xl cursor-grab touch-pan-y select-none active:cursor-grabbing md:h-[340px]"
          style={{ perspective: 1100 }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerEnter={() => (hovering.current = true)}
          onPointerLeave={() => {
            hovering.current = false;
            endDrag();
          }}
        >
          <div aria-hidden="true" className="absolute left-1/2 top-[62%] h-24 w-[70%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(8_145_178/0.16),transparent)] blur-xl" />
          <motion.ul
            aria-label="Technologies we use"
            className="absolute inset-0"
            style={{ transform: ringTransform, transformStyle: 'preserve-3d' }}
          >
            {stack.map((item, i) => (
              <Badge key={item.name} item={item} index={i} rotation={rotation} radius={radius} />
            ))}
          </motion.ul>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <button type="button" onClick={() => turn(1)} className="btn btn-ghost h-12 w-12 p-0" aria-label="Show previous tool">
            <Icon name="left" />
          </button>
          <button type="button" onClick={() => turn(-1)} className="btn btn-ghost h-12 w-12 p-0" aria-label="Show next tool">
            <Icon name="right" />
          </button>
        </div>
      </div>
    </section>
  );
}
