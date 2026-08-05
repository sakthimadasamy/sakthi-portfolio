'use client'

import { GraduationCap, Lightbulb, Rocket, Users, Zap, Puzzle } from 'lucide-react'
import { Reveal, SectionHeading } from '@/components/reveal'

const traits = [
  { icon: Puzzle, label: 'Problem Solver' },
  { icon: Zap, label: 'Fast Learner' },
  { icon: Users, label: 'Team Player' },
  { icon: Rocket, label: 'Leadership Skills' },
  { icon: Lightbulb, label: 'Innovative Thinker' },
]

export function About() {
  return (
    <section id="about" className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About Me"
          title="Designing intelligent systems that bridge hardware & software"
        />

        <div className="grid gap-8 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <div className="glass h-full rounded-2xl p-8">
              <p className="leading-relaxed text-muted-foreground">
                I am an Electronics and Communication Engineering student with strong interests in
                Embedded Systems, IoT, Artificial Intelligence, Machine Learning, and Software
                Development. I enjoy designing intelligent systems that combine electronics with
                programming to solve practical problems. I continuously improve my technical
                knowledge by building projects, participating in workshops, internships, and
                technical competitions.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {traits.map((t) => (
                  <span
                    key={t.label}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm font-medium"
                  >
                    <t.icon className="h-4 w-4 text-[var(--cyan)]" />
                    {t.label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-2">
            <div className="glass glow-border flex h-full flex-col justify-between rounded-2xl p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </span>
                <div>
                  <p className="font-heading font-semibold">ECE Student</p>
                  <p className="text-sm text-muted-foreground">Dr. N.G.P. Institute of Technology</p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-background/40 p-4">
                  <p className="font-heading text-2xl font-bold text-gradient">2023–27</p>
                  <p className="mt-1 text-sm text-muted-foreground">Duration</p>
                </div>
                <div className="rounded-xl border border-border bg-background/40 p-4">
                  <p className="font-heading text-2xl font-bold text-gradient">7.68</p>
                  <p className="mt-1 text-sm text-muted-foreground">Current CGPA</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
