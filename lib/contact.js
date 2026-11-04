// Shared by the contact form (browser) and /api/contact (server).
import { site } from './site';
import { services } from './content';

export const SERVICE_OPTIONS = [...services.map((s) => s.title), 'Something else'];

export const BUDGET_OPTIONS = ['Under $1,000', '$1,000 – $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000+', 'Not sure yet'];

export const EMPTY_INQUIRY = { name: '', email: '', service: '', budget: '', details: '' };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateInquiry(v) {
  const errors = {};
  const name = (v.name || '').trim();
  const email = (v.email || '').trim();
  const details = (v.details || '').trim();
  if (name.length < 2) errors.name = 'Enter your full name.';
  else if (name.length > 120) errors.name = 'Keep your name under 120 characters.';
  if (!EMAIL_RE.test(email)) errors.email = 'Enter an email address like name@company.com.';
  if (!SERVICE_OPTIONS.includes(v.service)) errors.service = 'Choose the service you need.';
  if (!BUDGET_OPTIONS.includes(v.budget)) errors.budget = 'Choose a budget range, or "Not sure yet".';
  if (details.length < 20) errors.details = 'Tell us a bit more: at least 20 characters about the project.';
  else if (details.length > 5000) errors.details = 'Keep project details under 5,000 characters.';
  return errors;
}

export function inquiryText(v) {
  return [
    `Name: ${v.name.trim()}`,
    `Email: ${v.email.trim()}`,
    `Service: ${v.service}`,
    `Budget: ${v.budget}`,
    '',
    'Project details:',
    v.details.trim(),
  ].join('\n');
}

// mailto: URLs get unreliable past ~2,000 characters, so long details are shortened there.
export function buildMailto(v) {
  const short = { ...v, details: v.details.trim().length > 1400 ? `${v.details.trim().slice(0, 1400)}…` : v.details };
  const subject = `Project inquiry: ${v.service} (${v.name.trim()})`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(inquiryText(short))}`;
}
