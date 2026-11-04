'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import TechStack from '@/components/TechStack';
import Process from '@/components/Process';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// The hero renders only in the browser (its canvas and 3D scene need `window`).
// The placeholder holds its full-screen slot so the sections below don't jump when it mounts.
const Hero = dynamic(() => import('@/components/Hero'), {
  ssr: false,
  loading: () => <section id="top" aria-hidden="true" className="min-h-[100svh]" />,
});

// Scroll order: Hero → Services → Projects → TechStack → Process → Contact → Footer.
// Section ids match the nav links in lib/site.js.
export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="relative">
        <Hero />
        <Services />
        <Projects />
        <TechStack />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
