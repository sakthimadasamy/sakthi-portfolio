'use client'

import { Award, Trophy, Rocket, Users, Medal } from 'lucide-react'
import { Reveal, SectionHeading } from '@/components/reveal'

const certifications = [
  { title: 'Java Programming & Object-Oriented Programming (OOP)', org: 'Certification' },
  { title: 'PCB Design Workshop', org: 'NIT Calicut' },
  { title: 'Embedded Systems & IoT Internship', org: 'Innovate Engineering Products' },
]

const achievements = [
  { icon: Users, title: 'Joint Treasurer', desc: 'IETE Student Forum' },
  { icon: Medal, title: 'Event Coordinator', desc: 'Organized and coordinated departmental events' },
  { icon: Rocket, title: 'Smart India Hackathon 2025', desc: 'Participant' },
  { icon: Trophy, title: 'Inter-College Project Expo', desc: 'Participant' },
]

export function Certifications() {
  return (
    <section className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Credentials" title="Certifications, achievements & leadership" />

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Certifications */}
          <div>
            <h3 className="mb-5 font-heading text-lg font-semibold text-muted-foreground">
              Certifications
            </h3>
            <div className="flex flex-col gap-4">
              {certifications.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.08}>
                  <div className="glass flex items-start gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-1">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                      <Award className="h-5 w-5 text-primary" />
                    </span>
                    <div>
                      <p className="font-heading font-semibold text-balance">{c.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{c.org}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="mb-5 font-heading text-lg font-semibold text-muted-foreground">
              Achievements & Leadership
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {achievements.map((a, i) => (
                <Reveal key={a.title} delay={i * 0.08}>
                  <div className="glass h-full rounded-2xl p-5 transition-transform hover:-translate-y-1">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--primary),var(--purple))]">
                      <a.icon className="h-5 w-5 text-white" />
                    </span>
                    <p className="mt-4 font-heading font-semibold">{a.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
