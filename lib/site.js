// Single source of truth for brand details used across the site.
export const site = {
  name: 'CodeVanta Labs',
  tagline: 'Your idea. Our code.',
  description:
    'CodeVanta Labs designs, builds and scales web platforms, mobile apps, AI systems, data products and growth campaigns.',
  email: 'thecodevantalabs@gmail.com',
  phone: '+92 3265889969',
  phoneHref: 'tel:+923269869744',
  whatsapp: 'https://wa.me/923269869744',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/codevanta-labs-755a6a44b' },
    { label: 'Instagram', href: 'https://www.instagram.com/codevantalabs' },
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61596270297538' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@codevantalabs' },
  ],
  // Order matches the page. Each href must match a section id in app/page.jsx.
  nav: [
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Stack', href: '#stack' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ],
};
