'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

// 2D canvas version of the hero scene: a perspective particle floor and
// drifting dust with pointer parallax. Shown while the 3D scene loads, and
// permanently when WebGL is unavailable or reduced motion is requested.
export default function FallbackBackground({ animate = true, showEmblem = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let raf = 0;
    const start = performance.now();
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    let seed = 11;
    const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    const dust = Array.from({ length: 80 }, () => ({ x: rand(), y: rand(), depth: 0.3 + rand() * 0.7, speed: 0.004 + rand() * 0.01 }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now) => {
      const t = animate ? (now - start) / 1000 : 0;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      ctx.clearRect(0, 0, width, height);

      // Perspective dot floor.
      const horizon = height * 0.64 + pointer.y * 10;
      const cx = width / 2 - pointer.x * 40;
      const focal = height * 0.9;
      const camHeight = 1.5;
      for (let r = 0; r < 28; r++) {
        const z = 1.4 + ((((r * 1.05 - t * 0.7) % 29.4) + 29.4) % 29.4);
        const sy = horizon + (focal * camHeight) / z / 3.2;
        if (sy > height + 6) continue;
        const fade = Math.max(0, 1 - z / 30) * Math.min(1, (z - 1.4) / 2);
        const radius = Math.max(0.6, 3.2 / z);
        for (let c = -22; c <= 22; c++) {
          const sx = cx + (focal * c * 0.9) / z / 3.2;
          if (sx < -6 || sx > width + 6) continue;
          const mix = (c + 22) / 44;
          const rr = Math.round(8 + 116 * mix);
          const gg = Math.round(145 - 87 * mix);
          const bb = Math.round(178 + 59 * mix);
          ctx.fillStyle = `rgba(${rr},${gg},${bb},${(fade * 0.6).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(sx, sy, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Dust with depth parallax.
      for (const d of dust) {
        const y = (((d.y - t * d.speed) % 1) + 1) % 1;
        const px = d.x * width - pointer.x * 30 * d.depth;
        const py = y * height * 0.9 - pointer.y * 20 * d.depth;
        ctx.fillStyle = `rgba(8,145,178,${(0.08 + d.depth * 0.3).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px, py, 0.6 + d.depth * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      if (animate) raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onResize = () => {
      resize();
      if (!animate) draw(performance.now());
    };

    resize();
    draw(performance.now());
    window.addEventListener('resize', onResize);
    if (animate) window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
    };
  }, [animate]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
      {showEmblem ? (
        <div className="pointer-events-none absolute left-1/2 top-[13%] w-[62vw] max-w-[320px] -translate-x-1/2 md:left-auto md:right-[8%] md:top-1/2 md:w-[34vw] md:max-w-[440px] md:-translate-y-1/2 md:translate-x-0">
          <div className="absolute inset-[-25%] rounded-full bg-[radial-gradient(closest-side,rgb(124_58_237/0.18),rgb(6_182_212/0.1)_55%,transparent)]" />
          <Image src="/logo-emblem.webp" alt="" width={460} height={380} priority className="emblem-float relative h-auto w-full" />
        </div>
      ) : null}
    </div>
  );
}
