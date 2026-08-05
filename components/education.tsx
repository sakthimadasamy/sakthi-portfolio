'use client'

import { GraduationCap, School } from 'lucide-react'
import { Reveal, SectionHeading } from '@/components/reveal'

const timeline = [
  {
    icon: School,
    school: 'T.N.P.M.N.M. Hr Secondary School',
    place: 'Thalavaipuram',
    degree: 'Higher Secondary Education',
    period: '2017 – 2023',
    score: '75%',
    scoreLabel: 'Percentage',
  },
  {
    icon: GraduationCap,
    school: 'Dr. N.G.P. Institute of Technology',
    place: 'Coimbatore',
    degree: 'Bachelor of Engineering — Electronics and Communication Engineering',
    period: '2023 – 2027',
    score: '7.68',
    scoreLabel: 'CGPA',
  },
]

export function Education() {
  return (
    <section id="education" className="relative px-5 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Education" title="My academic journey" />

        <div className="relative ml-3 border-l border-border pl-8">
          {/* gap between school and college entries via mb-16 */}
          {timeline.map((t, i) => (
            <Reveal key={t.school} delay={i * 0.12}>
              <div className="relative mb-16 last:mb-0">
                <span className="absolute -left-[42px] flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background glow-border">
                  <t.icon className="h-4 w-4 text-primary" />
                </span>
                <div className="glass rounded-2xl p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-balance">{t.school}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{t.place}</p>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {t.period}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.degree}</p>
                  <div className="mt-5 inline-flex items-baseline gap-2 rounded-xl border border-border bg-background/40 px-4 py-2">
                    <span className="font-heading text-2xl font-bold text-gradient">{t.score}</span>
                    <span className="text-sm text-muted-foreground">{t.scoreLabel}</span>
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
