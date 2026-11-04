'use client';

import dynamic from 'next/dynamic';

// Dynamically import Hero with SSR disabled to eliminate hydration errors
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });

import Canvas3D from '@/components/Canvas3D';
import Navbar from '@/components/Navbar';
import Services from '@/components/Services';
import TechStack from '@/components/TechStack';
import Process from '@/components/Process';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative bg-obsidian text-white selection:bg-cyan selection:text-obsidian">
      <Navbar />
      <Hero />
      <Services />
      <TechStack />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}