'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo';
import Icon from './Icon';
import { site } from '@/lib/site';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        solid ? 'border-b border-white/[0.07] bg-obsidian/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Logo />

        <ul className="hidden items-center gap-9 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-sm text-steel transition-colors hover:text-ink">
                {item.label}
              </a>
            </li>
          ))}
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
        <div id="mobile-menu" className="border-t border-white/[0.07] px-5 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/[0.06] py-4 font-display text-xl text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary mt-6 w-full">
            Start a project
          </a>
        </div>
      ) : null}
    </header>
  );
}
