'use client';

import { Component, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import FallbackBackground from './FallbackBackground';
import { hasWebGL } from '@/lib/webgl';

const Canvas3D = dynamic(() => import('./Canvas3D'), { ssr: false, loading: () => null });

const HEADLINE = ['We Engineer', 'Modern Software,', 'AI Solutions &', 'Digital Growth Engines'];

// If the 3D chunk fails to load or WebGL crashes, drop back to the 2D scene.
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError?.();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  // 'fallback' → 2D only · 'loading' → 3D mounting behind the 2D scene · 'ready' → 3D visible
  const [mode, setMode] = useState('fallback');
  const [inView, setInView] = useState(true);

  useEffect(() => {
    if (!reduce && hasWebGL()) setMode('loading');
  }, [reduce]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ready = mode === 'ready';

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-0' : 'opacity-100'}`}>
        <FallbackBackground animate={!reduce && !ready && inView} showEmblem={!ready} />
      </div>

      {mode !== 'fallback' ? (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
          <SceneBoundary onError={() => setMode('fallback')}>
            <Canvas3D active={inView} onReady={() => setMode('ready')} />
          </SceneBoundary>
        </div>
      ) : null}

      {/* Keeps the copy readable over the scene */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--color-obsidian)_8%,rgb(11_15_23/0.55)_45%,transparent_75%)] md:bg-[linear-gradient(to_right,var(--color-obsidian)_0%,rgb(11_15_23/0.7)_38%,transparent_62%),linear-gradient(to_top,var(--color-obsidian),transparent_30%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-16 pt-28 sm:px-8 md:justify-center md:pb-24">
        <h1
          id="hero-title"
          className="font-display text-[clamp(2.2rem,5.4vw,4.6rem)] font-semibold leading-[1] tracking-[-0.015em] text-ink"
        >
          {HEADLINE.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
               initial={false}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
         initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mt-6 max-w-[34rem] text-base leading-relaxed text-steel md:mt-7 md:text-lg">
            Your idea, our code. CodeVanta Labs designs, builds and scales web platforms, mobile apps, AI systems and growth
            campaigns, with one team from the first sketch to launch day.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#services" className="btn btn-ghost">
              Explore services
            </a>
            <a href="#contact" className="btn btn-primary">
              Start a project
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
