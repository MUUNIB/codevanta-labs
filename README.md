# CodeVanta Labs website

Marketing site for CodeVanta Labs, built with Next.js (App Router), Tailwind CSS v4, Framer Motion and React Three Fiber.

## Run it

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## What's where

```
app/
  layout.jsx            Fonts (self-hosted via Fontsource), metadata, theme colour
  page.jsx              Section order
  globals.css           Tailwind theme tokens, buttons, form fields, panels
  icon.png              Favicon (generated from the logo)
  api/contact/route.js  Optional server delivery of contact-form inquiries
components/
  Navbar.jsx            Fixed header, mobile menu
  Hero.jsx              Headline, CTAs, switches between the 3D scene and the 2D fallback
  Canvas3D.jsx          React Three Fiber scene: faceted crystal emblem, particle floor, dust, camera parallax
  FallbackBackground.jsx 2D canvas particle grid + floating logo (no WebGL, reduced motion, or while 3D loads)
  Services.jsx          Five service cards in a bento grid
  Projects.jsx          Projects: category filter, tech filter, "Show all", case-study dialog
  ProjectPreview.jsx    Illustrated device mockups (browser, phone, desktop) for each project
  TiltCard.jsx          Cursor-following 3D tilt with a soft light
  TechStack.jsx         Draggable 3D ring of technologies
  Process.jsx           Four-step workflow with a scroll-linked progress line
  Contact.jsx           Contact section: direct email, phone, WhatsApp
  ContactForm.jsx       Inquiry form with validation and mailto routing
  Footer.jsx, Logo.jsx, Icon.jsx, SectionHeading.jsx
lib/
  site.js               Email, phone, WhatsApp, social links, navigation
  content.js            All service, project, tech stack and process copy
  contact.js            Form options (incl. custom budget), validation and mailto builder
  webgl.js              WebGL support check
public/
  logo-emblem.webp      Logo emblem
```

Most text changes happen in `lib/content.js` and `lib/site.js`.

## Projects

Projects live in `lib/content.js` (`projects`). Each one has a `kind`:

- `product` or `client`: work you have shipped. `client` adds a "Client project" badge and the `client` name in the case study.
- `concept`: a sample build that shows what a practice can deliver. It gets a "Concept" badge and a note in the case study. Switch it to `client` or `product` once you have shipped something like it.

Every card shows an illustrated interface drawn in `components/ProjectPreview.jsx`. To use real material instead:

1. Put files in `public/projects/` (e.g. `agriguard.png`, `agriguard.mp4`).
2. On the project, set `image: '/projects/agriguard.png'` to replace the illustration, and/or `video: '/projects/agriguard.mp4'` to play a demo in the case study.

Keep videos short and compressed (under ~10 MB, H.264 MP4) so the page stays fast.

## Contact form

When a visitor sends the form:

1. The browser posts the inquiry to `/api/contact`, which validates it, applies a simple rate limit and checks a hidden bot-trap field.
2. If email delivery is configured, the server emails the inquiry to `thecodevantalabs@gmail.com` with the visitor's address as reply-to, and the visitor sees "Inquiry sent".
3. If it is not configured (the default) or delivery fails, the browser opens the visitor's email app with the inquiry pre-filled and addressed to `thecodevantalabs@gmail.com` (mailto).

To turn on direct delivery, create a free [Resend](https://resend.com) account, verify a sending domain, then copy `.env.example` to `.env.local` (or set the variables on your host):

```
RESEND_API_KEY=re_...
CONTACT_FROM_EMAIL="CodeVanta Labs <hello@yourdomain.com>"
CONTACT_TO_EMAIL=thecodevantalabs@gmail.com
```

## 3D scene and fallbacks

- The hero always paints the 2D canvas scene first, so there is never a blank hero.
- If the browser supports WebGL and the visitor has not asked for reduced motion, the 3D scene loads in the background and fades in once its first frame is ready.
- If WebGL is missing or the 3D scene throws, the 2D scene stays.
- The 3D scene stops rendering when the hero scrolls out of view, lowers pixel density on slow devices (drei `PerformanceMonitor`), and uses fewer particles on phones and low-core machines.
- With reduced motion turned on, the headline, ring and floating logo stop animating, and card tilt is disabled.

## Before launch

- Confirm the Facebook URL in `lib/site.js`. Instagram already points to @codevantalabs.
- Replace the Propex AI `liveUrl` in `lib/content.js`: it currently points at this site.
- Replace `public/logo-emblem.webp` with a high-resolution transparent PNG or WebP of the logo. The current file was cut from the promo reel.
- Add an Open Graph image (`app/opengraph-image.png`, 1200x630) for link previews.

## Deploy

The site deploys to Vercel with no configuration: import the repository, add the optional Resend variables, deploy. Any Node.js host that runs `npm run build && npm start` also works. The contact API route needs a server, so a purely static export is not supported.
