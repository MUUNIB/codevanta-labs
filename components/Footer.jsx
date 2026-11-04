import Logo from './Logo';
import { site } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.07]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo size={36} />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-steel">{site.tagline} Software, AI and growth engineering.</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="text-sm text-steel">Explore</h2>
          <ul className="mt-4 space-y-3">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-ink/90 transition-colors hover:text-electric">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="text-sm text-steel">Follow</h2>
          <ul className="mt-4 space-y-3">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-ink/90 transition-colors hover:text-electric">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/[0.05]">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs text-steel sm:px-8">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
