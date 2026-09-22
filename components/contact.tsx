'use client'

import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, MapPin, Phone, Send, Download, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Reveal, SectionHeading } from '@/components/reveal'
import { CONTACT, EMAILJS, RESUME_URL } from '@/lib/site'

function Linkedin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

const details = [
  { icon: MapPin, label: 'Location', value: CONTACT.location, href: undefined },
  { icon: Phone, label: 'Phone', value: CONTACT.phone, href: `tel:${CONTACT.phone}` },
  { icon: Mail, label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Sakthi Madasamy',
    href: 'https://www.linkedin.com/in/sakthi-madasamy',
  },
]

type Status = 'idle' | 'sending' | 'success' | 'error'

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef.current) return
    setStatus('sending')
    try {
      const formData = new FormData(formRef.current)
      const fromName = String(formData.get('from_name') ?? '')
      const fromEmail = String(formData.get('reply_to') ?? '')
      const subject = String(formData.get('subject') ?? '')
      const message = String(formData.get('message') ?? '')

      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: fromName,
          from_email: fromEmail,
          reply_to: fromEmail,
          subject,
          message,
        },
        { publicKey: EMAILJS.publicKey },
      )
      setStatus('success')
      formRef.current.reset()
    } catch (err) {
      console.log('[v0] EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          subtitle="Have a project, internship, or collaboration in mind? Reach out and I'll get back to you."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Details */}
          <Reveal className="lg:col-span-2">
            <div className="glass flex h-full flex-col rounded-2xl p-8">
              <h3 className="font-heading text-xl font-semibold">{CONTACT.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Electronics & Communication Engineer
              </p>

              <div className="mt-8 flex flex-col gap-5">
                {details.map((d) => {
                  const content = (
                    <>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                        <d.icon className="h-5 w-5 text-primary" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs uppercase tracking-wide text-muted-foreground">
                          {d.label}
                        </span>
                        <span className="block truncate font-medium">{d.value}</span>
                      </span>
                    </>
                  )
                  return d.href ? (
                    <a
                      key={d.label}
                      href={d.href}
                      target={d.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 transition-colors hover:text-primary"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={d.label} className="flex items-center gap-4">
                      {content}
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
                >
                  <Phone className="h-4 w-4" /> Call
                </a>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                >
                  <Download className="h-4 w-4" /> Resume
                </a>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.15} className="lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={onSubmit}
              className="glass flex h-full flex-col gap-4 rounded-2xl p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="from_name"
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="reply_to"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  required
                  placeholder="What's this about?"
                  className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your idea..."
                  className="w-full resize-none rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send Message
                  </>
                )}
              </button>

              {status === 'success' && (
                <p className="flex items-center gap-2 text-sm text-[var(--cyan)]">
                  <CheckCircle2 className="h-4 w-4" /> Message sent successfully. I&apos;ll reply soon!
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" /> Something went wrong. Please email me directly.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
