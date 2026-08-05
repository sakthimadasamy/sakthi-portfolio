'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Mail, Cpu, Code2, Brain, Wifi, CircuitBoard, Cloud } from 'lucide-react'
import { RESUME_URL } from '@/lib/site'

const roles = [
  'Electronics & Communication Engineer',
  'IoT Developer',
  'Embedded Systems Enthusiast',
  'AI & Machine Learning Explorer',
  'Java Developer',
  'Web Developer',
]

const floatingIcons = [
  { icon: Code2, label: 'Java', pos: 'left-0 top-6' },
  { icon: Brain, label: 'AI', pos: 'right-0 top-2' },
  { icon: Wifi, label: 'IoT', pos: '-left-4 top-1/2' },
  { icon: Cpu, label: 'Embedded', pos: 'right-2 top-1/2' },
  { icon: CircuitBoard, label: 'PCB', pos: 'left-8 bottom-2' },
  { icon: Cloud, label: 'Cloud', pos: 'right-8 bottom-0' },
]

function useTyping(words: string[]) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]
    const speed = deleting ? 45 : 90
    const timeout = setTimeout(() => {
      setText((prev) =>
        deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
      )
      if (!deleting && text === current) {
        setTimeout(() => setDeleting(true), 1400)
      } else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => i + 1)
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [text, deleting, index, words])

  return text
}

export function Hero() {
  const typed = useTyping(roles)

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="relative flex min-h-screen items-center px-5 pt-28 pb-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-[var(--cyan)]" />
            Available for internships & projects
          </span>

          <h1 className="mt-6 font-heading text-4xl font-extrabold leading-tight text-balance sm:text-5xl lg:text-6xl">
            Hello, I&apos;m <br />
            <span className="text-gradient">Sakthi Madasamy</span>
          </h1>

          <p className="mt-4 h-8 font-heading text-lg font-medium text-primary sm:text-xl">
            {typed}
            <span className="ml-0.5 inline-block h-6 w-0.5 animate-pulse bg-primary align-middle" />
          </p>

          <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
            I am an Electronics and Communication Engineering student passionate about building
            innovative solutions by combining hardware and software technologies. I enjoy creating
            IoT systems, embedded applications, AI-powered solutions, and modern software that solve
            real-world problems.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo('projects')}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
            <button
              onClick={() => scrollTo('contact')}
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </button>
          </div>
        </motion.div>

        {/* Right - profile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto flex h-80 w-80 items-center justify-center sm:h-96 sm:w-96"
        >
          {/* rotating gradient ring */}
          <div className="animate-spin-slow absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,var(--primary),var(--cyan),var(--purple),var(--primary))] blur-[2px]" />
          <div className="absolute inset-[6px] rounded-full bg-background" />

          {/* profile image with filters */}
          <div className="animate-float relative h-[86%] w-[86%] overflow-hidden rounded-full glow-border">
            <Image
              src="/images/sakthi.jpg"
              alt="Portrait of Sakthi Madasamy"
              fill
              priority
              sizes="(max-width: 640px) 18rem, 24rem"
              className="object-cover object-center contrast-110 saturate-125 brightness-105"
            />
            {/* subtle brand tint filter */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/25 via-transparent to-[var(--purple)]/25 mix-blend-overlay" />
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
          </div>

          {/* floating tech icons */}
          {floatingIcons.map(({ icon: Icon, label, pos }, i) => (
            <motion.div
              key={label}
              className={`absolute ${pos} glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-foreground`}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Icon className="h-3.5 w-3.5 text-primary" />
              {label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
