import ContactForm from './ContactForm';
import Icon from './Icon';
import { site } from '@/lib/site';

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-white/[0.06] py-28 lg:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(124_58_237/0.22),transparent)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id="contact-title" className="font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.01em]">
            Start a project
          </h2>
          <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-steel">
            Tell us what you are building. We will come back with questions, a rough plan and an estimate.
          </p>

          <dl className="mt-12 space-y-7">
            <div>
              <dt className="text-sm text-steel">Email</dt>
              <dd className="mt-1.5">
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 font-display text-xl text-ink transition-colors hover:text-electric sm:text-2xl">
                  <Icon name="mail" className="h-5 w-5 text-electric" />
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-steel">Phone</dt>
              <dd className="mt-1.5">
                <a href={site.phoneHref} className="inline-flex items-center gap-3 font-display text-xl text-ink transition-colors hover:text-electric sm:text-2xl">
                  <Icon name="phone" className="h-5 w-5 text-electric" />
                  {site.phone}
                </a>
              </dd>
            </div>
          </dl>

          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-10">
            <Icon name="chat" className="h-5 w-5 text-electric" />
            Chat on WhatsApp
          </a>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
