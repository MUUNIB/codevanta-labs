'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon';
import SectionHeading from './SectionHeading';
import ProjectPreview from './ProjectPreview';
import { projectGroups, projects } from '@/lib/content';

const INITIAL_COUNT = 7; // flagship + six cards before "Show all"

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function LiveLink({ href }) {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-steel transition-colors hover:text-ink">
      Live site
      <Icon name="external" className="h-4 w-4" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function Badges({ project }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.flagship ? <span className="badge badge-flagship">Flagship</span> : null}
      {project.kind === 'client' ? <span className="badge badge-flagship">Client project</span> : null}
      {project.kind === 'concept' ? <span className="badge badge-concept">Concept</span> : null}
      <span className="badge">{project.category}</span>
    </div>
  );
}

// Tech pills double as a filter: pressing one shows every project built with it.
function StackPills({ project, tech, onTech }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={`${project.title} stack`}>
      {project.stack.map((t) => (
        <li key={t}>
          <button type="button" className="tag" aria-pressed={tech === t} onClick={() => onTech(t)}>
            {t}
          </button>
        </li>
      ))}
    </ul>
  );
}

function Facts({ facts, className = '' }) {
  if (!facts?.length) return null;
  return (
    <dl className={`grid grid-cols-2 gap-3 ${className}`}>
      {facts.map((f) => (
        <div key={f.label} className="well rounded-2xl px-4 py-3">
          <dt className="text-xs text-steel">{f.label}</dt>
          <dd className="mt-0.5 font-display text-xl font-semibold text-accent">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function BuiltList({ items, className = '' }) {
  return (
    <ul className={`space-y-3 text-[0.95rem] leading-relaxed text-ink/85 ${className}`}>
      {items.map((b) => (
        <li key={b} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 flex-none rotate-45 bg-linear-to-br from-electric to-royal" />
          {b}
        </li>
      ))}
    </ul>
  );
}

function CaseStudyButton({ project, onOpen }) {
  return (
    <button type="button" className="link-arrow" aria-haspopup="dialog" onClick={() => onOpen(project.id)}>
      View Case Study
      <Icon name="arrowRight" className="h-4 w-4" />
      <span className="sr-only">: {project.title}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Cards                                                               */
/* ------------------------------------------------------------------ */

function FlagshipCard({ project: p, tech, onTech, onOpen }) {
  return (
    <article aria-labelledby={`project-${p.id}`} className="panel group relative overflow-clip rounded-[28px] md:col-span-2 xl:col-span-3">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-linear-to-r from-electric to-royal" />
      <div className="grid items-center gap-8 p-5 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-10">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <Badges project={p} />
          <h3 id={`project-${p.id}`} className="mt-5 font-display text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-[1] tracking-[-0.01em]">
            {p.title}
          </h3>
          <p className="mt-4 max-w-[52ch] text-[1.05rem] leading-relaxed text-steel">{p.summary}</p>
          <div className="mt-7">
            <StackPills project={p} tech={tech} onTech={onTech} />
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
            <CaseStudyButton project={p} onOpen={onOpen} />
            <LiveLink href={p.liveUrl} />
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-7">
          <ProjectPreview project={p} />
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project: p, tech, onTech, onOpen }) {
  return (
    <article aria-labelledby={`project-${p.id}`} className="panel group relative flex flex-col overflow-clip rounded-[24px]">
      <div className="p-3">
        <ProjectPreview project={p} />
      </div>
      <div className="flex flex-1 flex-col px-6 pb-6 pt-3">
        <Badges project={p} />
        <h3 id={`project-${p.id}`} className="mt-4 font-display text-[1.65rem] font-semibold leading-[1.1]">
          {p.title}
        </h3>
        <p className="mt-3 leading-relaxed text-steel">{p.summary}</p>
        <div className="mt-auto pt-6">
          <StackPills project={p} tech={tech} onTech={onTech} />
          <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
            <CaseStudyButton project={p} onOpen={onOpen} />
            <LiveLink href={p.liveUrl} />
          </div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Case-study dialog                                                   */
/* ------------------------------------------------------------------ */

// One native <dialog> for all projects: showModal() gives focus trapping,
// Escape to close and focus return for free.
function CaseStudyDialog({ project, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (project && dialog && !dialog.open) dialog.showModal();
  }, [project]);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      className="case-dialog"
      aria-labelledby="case-title"
      onClose={onClose}
      onClick={(e) => {
        // A click on the dialog element itself is a click on the backdrop.
        if (e.target === e.currentTarget) close();
      }}
    >
      {project ? (
        <div className="p-5 sm:p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <Badges project={project} />
              <h3 id="case-title" className="mt-4 font-display text-[clamp(2rem,5vw,2.8rem)] font-semibold leading-[1]">
                {project.title}
              </h3>
              {project.client ? <p className="mt-2 text-sm text-steel">Built for {project.client}</p> : null}
            </div>
            <button type="button" onClick={close} className="btn btn-ghost btn-icon flex-none" aria-label="Close case study">
              <Icon name="close" />
            </button>
          </div>

          <div className="mt-6">
            {project.video ? (
              <video src={project.video} poster={project.image || undefined} controls playsInline preload="metadata" className="aspect-video w-full rounded-[18px] bg-ink" />
            ) : (
              <ProjectPreview project={project} flat />
            )}
          </div>

          <div className="mt-8 grid gap-10 md:grid-cols-[1.25fr_1fr]">
            <div>
              <p className="text-[1.05rem] leading-relaxed text-steel">{project.summary}</p>
              <h4 className="mt-8 font-display text-lg font-semibold">{project.kind === 'concept' ? 'What it includes' : 'What we built'}</h4>
              <BuiltList items={project.built} className="mt-4" />
            </div>
            <div>
              <Facts facts={project.facts} />
              <h4 className={`font-display text-lg font-semibold ${project.facts?.length ? 'mt-8' : ''}`}>Stack</h4>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
              {project.kind === 'concept' ? (
                <p className="well mt-8 rounded-2xl p-4 text-sm leading-relaxed text-steel">
                  This is a concept build: a sample of the kind of system we design in this area, not a delivered client project.
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-7">
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Open live site
                <Icon name="external" className="h-4 w-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
            <a href="#contact" onClick={close} className={`btn ${project.liveUrl ? 'btn-ghost' : 'btn-primary'}`}>
              {project.kind === 'concept' ? 'Build something like this' : 'Discuss a similar project'}
            </a>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function Projects() {
  const [group, setGroup] = useState('all');
  const [tech, setTech] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [openId, setOpenId] = useState(null);

  const counts = useMemo(() => {
    const c = { all: projects.length };
    projects.forEach((p) => p.groups.forEach((g) => (c[g] = (c[g] || 0) + 1)));
    return c;
  }, []);

  const filtered = projects.filter((p) => (group === 'all' || p.groups.includes(group)) && (!tech || p.stack.includes(tech)));
  const filtering = group !== 'all' || Boolean(tech);
  const visible = filtering || showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hiddenCount = filtered.length - visible.length;

  const chooseGroup = (id) => {
    setGroup(id);
    setTech(null);
  };
  const toggleTech = (t) => {
    setTech((cur) => (cur === t ? null : t));
    setGroup('all');
  };
  const openProject = projects.find((p) => p.id === openId) || null;

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative border-t border-line py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="projects-title" title="Projects and case studies">
          Products we have shipped, work for clients, and concept builds that show what each of our practices can deliver.
        </SectionHeading>

        <div className="mb-8 flex flex-col gap-3">
          <div role="group" aria-label="Filter projects by category" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {[{ id: 'all', label: 'All work' }, ...projectGroups].map((g) => (
              <button key={g.id} type="button" className="chip flex-none" aria-pressed={group === g.id && !tech} onClick={() => chooseGroup(g.id)}>
                {g.label}
                <span className="chip-count">{counts[g.id] || 0}</span>
              </button>
            ))}
          </div>
          <p aria-live="polite" className="flex min-h-9 items-center gap-3 text-sm text-steel">
            {tech ? (
              <>
                <span>
                  {filtered.length} {filtered.length === 1 ? 'project uses' : 'projects use'} <span className="font-semibold text-accent">{tech}</span>
                </span>
                <button type="button" onClick={() => setTech(null)} className="btn btn-ghost btn-sm">
                  Clear
                </button>
              </>
            ) : (
              'Tip: select a technology on any card to see every project that uses it.'
            )}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((p) =>
            p.flagship && !filtering ? (
              <FlagshipCard key={p.id} project={p} tech={tech} onTech={toggleTech} onOpen={setOpenId} />
            ) : (
              <ProjectCard key={p.id} project={p} tech={tech} onTech={toggleTech} onOpen={setOpenId} />
            )
          )}
        </div>

        {hiddenCount > 0 ? (
          <div className="mt-10 flex justify-center">
            <button type="button" onClick={() => setShowAll(true)} className="btn btn-ghost">
              Show all {filtered.length} projects
              <span className="text-steel">({hiddenCount} more)</span>
            </button>
          </div>
        ) : null}
      </div>

      <CaseStudyDialog project={openProject} onClose={() => setOpenId(null)} />
    </section>
  );
}
