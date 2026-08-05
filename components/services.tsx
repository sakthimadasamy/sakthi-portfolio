'use client'

import { Wifi, Coffee, Globe } from 'lucide-react'
import { Reveal, SectionHeading } from '@/components/reveal'

const services = [
  {
    icon: Wifi,
    title: 'IoT Solutions',
    desc: 'Build smart connected systems using sensors, microcontrollers, cloud platforms, and embedded technologies.',
  },
  {
    icon: Coffee,
    title: 'Java Development',
    desc: 'Develop efficient Java applications using object-oriented programming principles and clean code practices.',
  },
  {
    icon: Globe,
    title: 'Web Development',
    desc: 'Create responsive, modern, and user-friendly websites with attractive UI and optimized performance.',
  },
]

export function Services() {
  return (
    <section id="services" className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Services" title="What I can build for you" />

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="group glass relative h-full overflow-hidden rounded-2xl p-8 transition-all hover:-translate-y-2 hover:glow-border">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--purple))]">
                  <s.icon className="h-7 w-7 text-white" />
                </span>
                <h3 className="mt-6 font-heading text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
