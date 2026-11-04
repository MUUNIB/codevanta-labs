// Line icons drawn on a 24px grid. Stroke colour follows `currentColor`.
const PATHS = {
  code: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 8.5h18M10 12.5l-2 2 2 2M14 12.5l2 2-2 2" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
      <path d="M11 18.5h2" />
    </>
  ),
  ai: (
    <>
      <circle cx="6" cy="7" r="2" />
      <circle cx="6" cy="17" r="2" />
      <circle cx="18" cy="12" r="2.2" />
      <circle cx="12" cy="4" r="1.5" />
      <circle cx="12" cy="20" r="1.5" />
      <path d="M8 7.8l8 3.4M8 16.2l8-3.4M7.7 5.9l2.9-1.2M7.7 18.1l2.9 1.2M13.2 5.1l3.6 5.1M13.2 18.9l3.6-5.1" />
    </>
  ),
  chart: <path d="M3 20.5h18M6 16.5v-4M10 16.5v-8M14 16.5v-6M18 16.5V5" />,
  growth: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  chat: (
    <>
      <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z" />
      <path d="M9 10.5h6M9 13.5h4" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  left: <path d="M15 5l-7 7 7 7" />,
  right: <path d="M9 5l7 7-7 7" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
};

export default function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.8 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
