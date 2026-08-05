'use client'

import { Briefcase, CircuitBoard } from 'lucide-react'
import { Reveal, SectionHeading } from '@/components/reveal'

const experiences = [
  {
    icon: Briefcase,
    role: 'Embedded Systems & IoT Intern',
    org: 'Innovate Engineering Products',
    tags: [
      'MicroPython',
      'Node.js',
      'Microprocessor-based Systems',
      'Sensor Integration',
      'Blynk IoT Platform',
      'Cloud Monitoring',
      'Embedded Programming',
    ],
  },
  {
    icon: CircuitBoard,
    role: 'PCB Design Workshop',
    org: 'National Institute of Technology Calicut',
    tags: [
      'PCB Layout',
      'Schematic Design',
      'Proteus ARES',
      'Proteus ISIS',
      'Gerber Files',
      'NC Drill Files',
      'Design Rule Checks',
    ],
  },
]

export function Experience() {
  return (
    <section id="experience" className="relative px-5 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Experience" title="Where I have applied my skills" />

        <div className="relative ml-3 border-l border-border pl-8">
          {experiences.map((e, i) => (
            <Reveal key={e.role} delay={i * 0.1}>
              <div className="relative mb-10 last:mb-0">
                <span className="absolute -left-[42px] flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background glow-border">
                  <e.icon className="h-4 w-4 text-primary" />
                </span>
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-heading text-lg font-semibold">{e.role}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{e.org}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
