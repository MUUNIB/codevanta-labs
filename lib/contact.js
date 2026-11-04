// Shared by the contact form (browser) and /api/contact (server).
import { site } from './site';
import { services } from './content';

export const SERVICE_OPTIONS = [...services.map((s) => s.title), 'Something else'];

// Budget: a preset range, the client's own figure, or "Not sure yet".
export const CUSTOM_BUDGET = 'Enter my own';
export const BUDGET_RANGES = ['Under $1,000', '$1,000 – $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000+'];
export const BUDGET_CHOICES = [...BUDGET_RANGES, CUSTOM_BUDGET, 'Not sure yet'];
export const CURRENCIES = ['USD', 'PKR', 'EUR', 'GBP', 'AED', 'SAR'];

export const EMPTY_INQUIRY = {
  name: '',
  email: '',
  service: '',
  budget: '',
  budgetCurrency: 'USD',
  budgetAmount: '',
  details: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// "250,000" or "2 500" → 250000. Anything that isn't a plain number → NaN.
export function parseAmount(raw) {
  const cleaned = String(raw ?? '').replace(/[,\s]/g, '');
  return /^\d+(\.\d{1,2})?$/.test(cleaned) ? Number(cleaned) : NaN;
}

// The budget as one readable line, for the email.
export function budgetLabel(v) {
  if (v.budget !== CUSTOM_BUDGET) return v.budget;
  return `${v.budgetCurrency} ${parseAmount(v.budgetAmount).toLocaleString('en-US')} (client's own figure)`;
}

export function validateInquiry(v) {
  const errors = {};
  const name = (v.name || '').trim();
  const email = (v.email || '').trim();
  const details = (v.details || '').trim();
  if (name.length < 2) errors.name = 'Enter your full name.';
  else if (name.length > 120) errors.name = 'Keep your name under 120 characters.';
  if (!EMAIL_RE.test(email)) errors.email = 'Enter an email address like name@company.com.';
  if (!SERVICE_OPTIONS.includes(v.service)) errors.service = 'Choose the service you need.';
  if (!BUDGET_CHOICES.includes(v.budget)) {
    errors.budget = 'Choose a range, enter your own budget, or pick "Not sure yet".';
  } else if (v.budget === CUSTOM_BUDGET) {
    const amount = parseAmount(v.budgetAmount);
    if (!CURRENCIES.includes(v.budgetCurrency)) errors.budgetAmount = 'Choose a currency.';
    else if (!(amount > 0)) errors.budgetAmount = 'Enter your budget as a number, like 2500 or 250,000.';
    else if (amount > 1e12) errors.budgetAmount = 'Check the amount: it looks too large.';
  }
  if (details.length < 20) errors.details = 'Tell us a bit more: at least 20 characters about the project.';
  else if (details.length > 5000) errors.details = 'Keep project details under 5,000 characters.';
  return errors;
}

export function inquiryText(v) {
  return [
    `Name: ${v.name.trim()}`,
    `Email: ${v.email.trim()}`,
    `Service: ${v.service}`,
    `Budget: ${budgetLabel(v)}`,
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
