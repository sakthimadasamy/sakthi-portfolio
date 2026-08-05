'use client'

import { motion } from 'framer-motion'
import { Code2, Cpu, Brain, CircuitBoard, MonitorCog } from 'lucide-react'
import { Reveal, SectionHeading } from '@/components/reveal'

const groups = [
  {
    icon: Code2,
    title: 'Programming',
    skills: [
      { name: 'Java', level: 88 },
      { name: 'Python', level: 85 },
      { name: 'JavaScript', level: 75 },
      { name: 'OOP', level: 85 },
      { name: 'Data Structures & Algorithms', level: 80 },
    ],
  },
  {
    icon: Cpu,
    title: 'Embedded Systems',
    skills: [
      { name: 'Embedded Systems', level: 85 },
      { name: 'IoT', level: 88 },
      { name: 'Microcontrollers', level: 82 },
      { name: 'Sensor Integration', level: 84 },
      { name: 'Wireless Sensor Networks', level: 75 },
    ],
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    skills: [
      { name: 'Machine Learning', level: 80 },
      { name: 'Deep Learning', level: 76 },
      { name: 'Computer Vision', level: 78 },
      { name: 'Grad-CAM', level: 72 },
      { name: 'MRI Image Analysis', level: 70 },
    ],
  },
  {
    icon: CircuitBoard,
    title: 'Hardware Design',
    skills: [
      { name: 'PCB Design', level: 85 },
      { name: 'Proteus (ARES & ISIS)', level: 82 },
      { name: 'Circuit Design', level: 84 },
      { name: 'DRC', level: 78 },
      { name: 'Gerber File Generation', level: 80 },
    ],
  },
  {
    icon: MonitorCog,
    title: 'Computer Science',
    skills: [
      { name: 'Operating Systems', level: 78 },
      { name: 'Computer Networks', level: 76 },
      { name: 'Web Development', level: 80 },
    ],
  },
]

function Bar({ name, level }: { name: string; level: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--primary),var(--cyan))]"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title="A versatile technical toolkit"
          subtitle="From low-level embedded programming to AI models and modern web apps."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.08}>
              <div className="glass h-full rounded-2xl p-6 transition-transform hover:-translate-y-1">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15">
                    <g.icon className="h-5 w-5 text-primary" />
                  </span>
                  <h3 className="font-heading text-lg font-semibold">{g.title}</h3>
                </div>
                <div className="flex flex-col gap-4">
                  {g.skills.map((s) => (
                    <Bar key={s.name} {...s} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
