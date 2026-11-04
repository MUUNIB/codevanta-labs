import { NextResponse } from 'next/server';
import { inquiryText, validateInquiry } from '@/lib/contact';
import { site } from '@/lib/site';

// Best-effort rate limit per server instance: 5 inquiries per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map();

function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Send the inquiry as JSON.' }, { status: 400 });
  }

  const values = {
    name: String(body?.name ?? ''),
    email: String(body?.email ?? ''),
    service: String(body?.service ?? ''),
    budget: String(body?.budget ?? ''),
    details: String(body?.details ?? ''),
  };

  // Honeypot filled in: pretend success so bots learn nothing.
  if (body?.company) return NextResponse.json({ ok: true, delivered: true });

  const errors = validateInquiry(values);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many inquiries from this connection. Try again in 10 minutes.' }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || site.email;

  // No mail provider configured: the browser falls back to mailto.
  if (!apiKey || !from) return NextResponse.json({ ok: true, delivered: false });

  const text = inquiryText(values);
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email.trim(),
        subject: `Project inquiry: ${values.service} (${values.name.trim()})`,
        text,
        html: `<pre style="font-family:ui-monospace,monospace;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
      }),
    });
    if (!res.ok) {
      console.error('Resend error', res.status, await res.text().catch(() => ''));
      return NextResponse.json({ ok: true, delivered: false });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error('Contact delivery failed', err);
    return NextResponse.json({ ok: true, delivered: false });
  }
}
