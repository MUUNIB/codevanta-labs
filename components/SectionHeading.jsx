export default function SectionHeading({ id, title, children }) {
  return (
    <div className="mb-14 grid gap-5 lg:mb-20 lg:grid-cols-12 lg:items-end">
      <h2 id={id} className="font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.01em] lg:col-span-7">
        {title}
      </h2>
      {children ? <p className="max-w-xl text-[1.05rem] leading-relaxed text-steel lg:col-span-5 lg:justify-self-end">{children}</p> : null}
    </div>
  );
}
