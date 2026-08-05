export function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      {/* gradient blobs */}
      <div className="animate-blob absolute -left-32 top-10 h-[26rem] w-[26rem] rounded-full bg-primary/20 blur-[120px]" />
      <div className="animate-blob absolute -right-24 top-1/3 h-[24rem] w-[24rem] rounded-full bg-[var(--purple)]/20 blur-[120px] [animation-delay:4s]" />
      <div className="animate-blob absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-[var(--cyan)]/15 blur-[120px] [animation-delay:8s]" />
      {/* grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />
    </div>
  )
}
