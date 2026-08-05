'use client'

import { Recycle, Flame, Brain } from 'lucide-react'
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
                <div className="flex h-40 items-center justify-center rounded-xl bg-[linear-gradient(135deg,rgba(59,130,246,0.15),rgba(124,58,237,0.15))]">
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

                <div className="mt-4 rounded-xl border border-border bg-secondary/40 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--cyan)]">
                    Future Improvements
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{p.future}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
