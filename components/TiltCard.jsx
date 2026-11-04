'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

// Card that tilts toward the cursor with a soft light that follows it.
// Mouse only: touch and reduced-motion users get a flat card.
export default function TiltCard({ children, className = '', as = 'article', ...rest }) {
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 170, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 170, damping: 18, mass: 0.6 });
  const rotateY = useTransform(sx, [0, 1], [-7, 7]);
  const rotateX = useTransform(sy, [0, 1], [6, -6]);
  const lx = useTransform(sx, (v) => `${v * 100}%`);
  const ly = useTransform(sy, (v) => `${v * 100}%`);
  const light = useMotionTemplate`radial-gradient(520px circle at ${lx} ${ly}, rgb(8 145 178 / 0.08), transparent 42%)`;

  useEffect(() => {
    setMounted(true);
  }, []);

  const Tag = motion[as] || motion.article;

  function onPointerMove(e) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function onPointerLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  // Prevent SSR/Hydration mismatch by returning flat card prior to mounting
  if (!mounted) {
    const FallbackTag = as;
    return (
      <FallbackTag className={`group panel relative h-full rounded-[26px] ${className}`} {...rest}>
        <div className="relative h-full">{children}</div>
      </FallbackTag>
    );
  }

  return (
    <Tag
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`group panel relative h-full rounded-[26px] transition-[border-color,box-shadow] duration-300 ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
      }}
      {...rest}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[26px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: light }}
      />
      <div className="relative h-full" style={{ transform: reduce ? 'none' : 'translateZ(28px)' }}>
        {children}
      </div>
    </Tag>
  );
}