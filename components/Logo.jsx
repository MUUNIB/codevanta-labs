import Image from 'next/image';

export default function Logo({ href = '#top', size = 40 }) {
  return (
    <a href={href} className="group flex items-center gap-2.5 rounded-lg" aria-label="CodeVanta Labs, back to top">
      <Image
        src="/logo-emblem.webp"
        alt=""
        width={Math.round(size * 1.21)}
        height={size}
        priority
        className="transition-transform duration-300 group-hover:-rotate-6"
      />
      <span className="font-display text-lg font-semibold tracking-wide text-ink">
        CodeVanta <span className="font-medium text-steel">Labs</span>
      </span>
    </a>
  );
}
