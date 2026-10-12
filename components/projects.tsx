'use client'

import { Recycle, Flame, Brain, Briefcase, ExternalLink } from 'lucide-react'
import { Reveal, SectionHeading } from '@/components/reveal'

const projects = [
  {
    icon: Recycle,
    title: 'Waste Segregation Machine',
    tech: ['Embedded Systems', 'Sensors', 'Automation'],
    desc: 'Developed a smart dustbin capable of automatically separating biodegradable and non-biodegradable waste using sensor-based detection. Integrates hardware and software for efficient waste management while promoting recycling.',
    future: 'Enhanced plastic identification accuracy.',
  },
  {
    icon: Flame,
    title: 'Fire Fighting Robot',
    tech: ['Embedded Systems', 'Sensors', 'Automation'],
    desc: 'Designed a robotic system capable of detecting fire and activating a water-spraying mechanism for firefighting. Demonstrates practical applications of embedded systems for safety and emergency response.',
    future: 'Autonomous navigation and multi-room coverage.',
  },
  {
    icon: Brain,
    title: 'Early Glioma Detection from Limited MRI Slices',
    tech: ['Python', 'Deep Learning', 'Computer Vision', 'AI', 'Medical Imaging'],
    desc: 'Developed a deep learning model for early glioma detection from limited MRI slices. Integrated Grad-CAM overlays to provide explainable AI visualizations, improving clinical interpretability by highlighting affected regions.',
    future: 'Broader dataset training and 3D volumetric analysis.',
  },
  {
    icon: Briefcase,
    title: 'JobTrack: Job Application Tracker',
    tech: ['React', 'Node.js', 'Express', 'REST API', 'Vercel', 'Render'],
    desc: 'Built a full-stack application to manage job applications and offers in one place. Users can add or delete applications and update their status across Applied, Interview, Offer, and Rejected. The React frontend connects to Node.js and Express REST APIs, with the frontend deployed on Vercel and the backend on Render.',
    link: 'https://joboffertrack.vercel.app',
  },
]

export function Projects() {
  return (
    <section id="projects" className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Solving real-world problems with hardware & AI"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <article className="group glass flex h-full flex-col rounded-2xl p-6 transition-all hover:-translate-y-2 hover:glow-border">
                <div className="flex h-40 items-center justify-center rounded-xl bg-[linear-gradient(135deg,rgba(23,133,130,0.15),rgba(191,161,129,0.15))]">
                  <p.icon className="h-14 w-14 text-primary transition-transform duration-500 group-hover:scale-110" />
                </div>

                <h3 className="mt-5 font-heading text-lg font-semibold text-balance">{p.title}</h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>

                {p.future && (
                  <div className="mt-4 rounded-xl border border-border bg-secondary/40 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--cyan)]">
                      Future Improvements
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{p.future}</p>
                  </div>
                )}
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-[var(--cyan)]"
                  >
                    View Live Project
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
