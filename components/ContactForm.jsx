'use client';

import { useRef, useState } from 'react';
import Icon from './Icon';
import { site } from '@/lib/site';
import { BUDGET_OPTIONS, EMPTY_INQUIRY, SERVICE_OPTIONS, validateInquiry } from '@/lib/contact';

const ORDER = ['name', 'email', 'service', 'budget', 'details'];

function FieldError({ k, errors }) {
  return errors[k] ? (
    <p id={`f-${k}-error`} className="mt-2 text-sm text-red-300">
      {errors[k]}
    </p>
  ) : null;
}

export default function ContactForm() {
  const formRef = useRef(null);
  const [values, setValues] = useState(EMPTY_INQUIRY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle · sending · sent · error
  const [sentTo, setSentTo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const update = (key) => (e) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    const found = validateInquiry(values);
    setErrors(found);
    const first = ORDER.find((k) => found[k]);
    if (first) {
      formRef.current?.elements.namedItem(first)?.focus();
      return;
    }

    // Bot trap check
    const honeypot = formRef.current?.elements.namedItem('company')?.value || '';
    if (honeypot) {
      setStatus('sent');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('https://formspree.io/f/xqppwlyw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          service: values.service,
          budget: values.budget,
          message: values.details,
        }),
      });

      if (res.ok) {
        setSentTo(values.email.trim());
        setStatus('sent');
        setValues(EMPTY_INQUIRY);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || 'Something went wrong while sending your inquiry. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Network error. Please check your internet connection and try again.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="panel flex h-full flex-col items-start justify-center rounded-[28px] p-8 sm:p-10">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-electric/10 text-electric">
          <Icon name="check" className="h-6 w-6" />
        </span>
        <h3 className="mt-6 font-display text-3xl font-semibold text-ink">Inquiry sent</h3>
        <p className="mt-3 max-w-md leading-relaxed text-steel">
          Thanks! Your inquiry has been delivered straight to our inbox. We will reply to <span className="text-electric font-medium">{sentTo}</span> shortly.
        </p>
        <button type="button" className="btn btn-ghost mt-8" onClick={() => setStatus('idle')}>
          Send another inquiry
        </button>
      </div>
    );
  }

  const fieldProps = (key) => ({
    id: `f-${key}`,
    name: key,
    value: values[key],
    onChange: update(key),
    'aria-invalid': errors[key] ? 'true' : undefined,
    'aria-describedby': errors[key] ? `f-${key}-error` : undefined,
    className: 'field',
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="panel relative rounded-[28px] p-6 sm:p-9" aria-describedby="form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className="mb-2 block text-sm font-medium text-ink">
            Full name
          </label>
          <input {...fieldProps('name')} type="text" autoComplete="name" placeholder="Ayesha Khan" />
          <FieldError k="name" errors={errors} />
        </div>
        <div>
          <label htmlFor="f-email" className="mb-2 block text-sm font-medium text-ink">
            Email
          </label>
          <input {...fieldProps('email')} type="email" autoComplete="email" inputMode="email" placeholder="you@company.com" />
          <FieldError k="email" errors={errors} />
        </div>
        <div>
          <label htmlFor="f-service" className="mb-2 block text-sm font-medium text-ink">
            Service needed
          </label>
          <select {...fieldProps('service')}>
            <option value="" disabled>
              Choose a service
            </option>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <FieldError k="service" errors={errors} />
        </div>
        <div>
          <label htmlFor="f-budget" className="mb-2 block text-sm font-medium text-ink">
            Budget range
          </label>
          <select {...fieldProps('budget')}>
            <option value="" disabled>
              Choose a range
            </option>
            {BUDGET_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <FieldError k="budget" errors={errors} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-details" className="mb-2 block text-sm font-medium text-ink">
            Project details
          </label>
          <textarea
            {...fieldProps('details')}
            rows={5}
            placeholder="What are you building, who is it for, and is there a deadline?"
            className="field min-h-[140px] resize-y"
          />
          <FieldError k="details" errors={errors} />
        </div>
      </div>

      {/* Bot trap: hidden from people, filled in by spam bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-company">Company</label>
        <input id="f-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending inquiry…' : 'Send inquiry'}
        </button>
        <p id="form-note" className="text-sm text-steel">
          Goes straight to {site.email}
        </p>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm leading-relaxed text-red-300">
          {errorMessage}
        </p>
      )}
    </form>
  );
}