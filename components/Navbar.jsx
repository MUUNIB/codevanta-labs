'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo';
import Icon from './Icon';
import { site } from '@/lib/site';

const SECTION_IDS = site.nav.map((item) => item.href.slice(1));

// The section whose top has passed 40% of the viewport is the one being read.
// Measured on scroll (not with an observer) so sections that mount late, like the hero, still count.
function currentSection() {
  const probe = window.innerHeight * 0.4;
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  if (atBottom) return SECTION_IDS[SECTION_IDS.length - 1];
  let current = '';
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= probe) current = id;
  }
  return current;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  // Solid header after the first scroll, plus the active-section highlight.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      setActive(currentSection());
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // While the mobile menu is open: lock page scroll, close on Escape or when the window grows to desktop width.
  useEffect(() => {
    if (!open) return undefined;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';

    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const desktop = window.matchMedia('(min-width: 768px)');
    const onWiden = (e) => e.matches && setOpen(false);

    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onWiden);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onWiden);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        solid
          ? 'border-b border-line bg-white/80 shadow-[0_10px_30px_-22px_rgb(15_23_42/0.45)] backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Logo />

        <ul className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative py-2 text-sm transition-colors hover:text-ink ${isActive ? 'text-ink' : 'text-steel'}`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left rounded-full bg-linear-to-r from-electric to-royal transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <a href="#contact" className="btn btn-primary btn-sm hidden md:inline-flex">
          Start a project
        </a>

        <button
          type="button"
          className="-mr-2 grid h-11 w-11 place-items-center rounded-full text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
        </button>
      </nav>

      {open ? (
        <div id="mobile-menu" className="h-[calc(100svh-4rem)] overflow-y-auto border-t border-line px-5 pb-8 pt-2 md:hidden">
          <ul className="flex flex-col">
            {site.nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={isActive ? 'true' : undefined}
                    className={`flex items-center justify-between border-b border-line py-4 font-display text-xl transition-colors ${
                      isActive ? 'text-accent' : 'text-ink'
                    }`}
                  >
                    {item.label}
                    <Icon name="arrowRight" className="h-5 w-5 text-steel" />
                  </a>
                </li>
              );
            })}
          </ul>
          <a href="#contact" onClick={closeMenu} className="btn btn-primary mt-7 w-full">
            Start a project
          </a>
        </div>
      ) : null}
    </header>
  );
}
