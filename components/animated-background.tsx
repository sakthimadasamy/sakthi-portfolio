'use client'

import { useEffect, useRef } from 'react'

const RAMP = ' .:-=+*#%@'
const FONT_FAMILY = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const settings = {
      background: '#071C22',
      textColor: '#A3B7BC',
      accent: '#FF7849',
      fontSize: 12,
      size: 10,
      rain: 100,
      hover: 100,
      reach: 420,
      speed: 50,
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) settings.rain = 0

    let width = 0
    let height = 0
    let dpr = 1
    let glyphWidth = 0
    let glyphHeight = 0
    let cellWidth = 0
    let cellHeight = 0
    let cols = 0
    let rows = 0
    let values = new Float32Array(0)
    let activeCells = new Uint32Array(0)
    let textAtlas: HTMLCanvasElement
    let accentAtlas: HTMLCanvasElement
    let simTime = 0
    let nextDrop = 0.3
    let heartbeat = 0
    let lastTime = performance.now()
    let frameId = 0
    let disposed = false
    const ripples: { x: number; y: number; t0: number; amp: number; speedFactor: number }[] = []
    const pending: typeof ripples = []
    const pointer = { x: 0, y: 0, lastX: 0, lastY: 0, inside: false, movedAt: 0 }

    const buildAtlases = () => {
      glyphWidth = Math.max(1, Math.round(settings.fontSize * 0.62 * dpr))
      glyphHeight = Math.max(1, Math.round(settings.fontSize * 1.15 * dpr))
      cellWidth = glyphWidth / dpr
      cellHeight = glyphHeight / dpr

      const makeAtlas = (color: string) => {
        const atlas = document.createElement('canvas')
        atlas.width = glyphWidth * RAMP.length
        atlas.height = glyphHeight
        const atlasContext = atlas.getContext('2d')
        if (!atlasContext) return atlas
        atlasContext.font = `500 ${settings.fontSize * dpr}px ${FONT_FAMILY}`
        atlasContext.textAlign = 'center'
        atlasContext.textBaseline = 'middle'
        atlasContext.fillStyle = color
        for (let i = 1; i < RAMP.length; i++) {
          atlasContext.fillText(RAMP[i], i * glyphWidth + glyphWidth / 2, glyphHeight / 2)
        }
        return atlas
      }

      textAtlas = makeAtlas(settings.textColor)
      accentAtlas = makeAtlas(settings.accent)
      cols = Math.ceil(width / cellWidth)
      rows = Math.ceil(height / cellHeight)
      values = new Float32Array(cols * rows)
      activeCells = new Uint32Array(cols * rows)
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      buildAtlases()
    }

    const exponential = (mean: number) => -Math.log(1 - Math.random()) * mean

    const addRainDrop = () => {
      const x = Math.random() * width
      const y = Math.random() * height
      let start = simTime
      for (let i = 0; i < 3; i++) {
        pending.push({ x, y, t0: start, amp: 0.9 * (1 - 0.2 * i), speedFactor: 1 })
        start += 0.06 + exponential(0.16)
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      if (settings.hover <= 0) return
      if (!pointer.inside) {
        pointer.lastX = event.clientX
        pointer.lastY = event.clientY
      }
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.inside = true
      pointer.movedAt = performance.now()
      heartbeat = 0

      const dx = pointer.x - pointer.lastX
      const dy = pointer.y - pointer.lastY
      const distance = Math.hypot(dx, dy)
      if (distance < 26) return

      const count = Math.floor(distance / 26)
      for (let i = 1; i <= count; i++) {
        const fraction = (26 * i) / distance
        ripples.push({
          x: pointer.lastX + dx * fraction,
          y: pointer.lastY + dy * fraction,
          t0: simTime,
          amp: 0.85 * (settings.hover / 100),
          speedFactor: 1,
        })
      }
      pointer.lastX += (dx * 26 * count) / distance
      pointer.lastY += (dy * 26 * count) / distance
    }

    const onPointerLeave = () => {
      pointer.inside = false
    }

    const addSpan = (row: number, startX: number, endX: number, x: number, dy: number, radius: number, sigma: number, amplitude: number) => {
      const firstCol = Math.max(0, Math.floor(startX / cellWidth))
      const lastCol = Math.min(cols - 1, Math.floor(endX / cellWidth))
      const rowOffset = row * cols
      for (let col = firstCol; col <= lastCol; col++) {
        const dx = (col + 0.5) * cellWidth - x
        const distance = Math.sqrt(dx * dx + dy * dy)
        const normalized = (distance - radius) / sigma
        values[rowOffset + col] += Math.exp(-normalized * normalized) * amplitude
      }
    }

    const updateField = () => {
      values.fill(0)
      const sigma = Math.max(1.5, settings.size * 0.9)
      const band = sigma * 2.2

      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i]
        const radius = 260 * ripple.speedFactor * (simTime - ripple.t0)
        if (radius >= settings.reach) {
          ripples.splice(i, 1)
          continue
        }

        const fade = Math.pow(Math.max(0, 1 - radius / settings.reach), 1.4)
        const amplitude = ripple.amp * fade
        if (amplitude < 0.01) continue

        const outer = radius + band
        const inner = radius - band
        const firstRow = Math.max(0, Math.floor((ripple.y - outer) / cellHeight))
        const lastRow = Math.min(rows - 1, Math.floor((ripple.y + outer) / cellHeight))

        for (let row = firstRow; row <= lastRow; row++) {
          const dy = (row + 0.5) * cellHeight - ripple.y
          const absY = Math.abs(dy)
          if (absY > outer) continue
          const outerHalfWidth = Math.sqrt(outer * outer - dy * dy)
          if (inner > absY) {
            const innerHalfWidth = Math.sqrt(inner * inner - dy * dy)
            addSpan(row, ripple.x - outerHalfWidth, ripple.x - innerHalfWidth, ripple.x, dy, radius, sigma, amplitude)
            addSpan(row, ripple.x + innerHalfWidth, ripple.x + outerHalfWidth, ripple.x, dy, radius, sigma, amplitude)
          } else {
            addSpan(row, ripple.x - outerHalfWidth, ripple.x + outerHalfWidth, ripple.x, dy, radius, sigma, amplitude)
          }
        }
      }

      for (let i = 0; i < values.length; i++) values[i] = Math.min(1, values[i])
    }

    const draw = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.globalAlpha = 1
      ctx.fillStyle = settings.background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const dotSize = Math.max(1, Math.round(dpr * 1.3))
      const dotOffsetX = (glyphWidth - dotSize) >> 1
      const dotOffsetY = (glyphHeight - dotSize) >> 1
      let activeCount = 0
      ctx.beginPath()
      for (let index = 0; index < values.length; index++) {
        if (values[index] < 0.05) {
          const col = index % cols
          const row = (index / cols) | 0
          ctx.rect(col * cellWidth * dpr + dotOffsetX, row * cellHeight * dpr + dotOffsetY, dotSize, dotSize)
        } else {
          activeCells[activeCount++] = index
        }
      }
      ctx.globalAlpha = 0.3
      ctx.fillStyle = settings.textColor
      ctx.fill()

      for (let i = 0; i < activeCount; i++) {
        const index = activeCells[i]
        const col = index % cols
        const row = (index / cols) | 0
        const value = values[index]
        const rampIndex = 1 + Math.floor(Math.min(value, 0.999) * (RAMP.length - 1))
        const mix = Math.min(1, value * 1.2)
        const smoothMix = mix * mix * (3 - 2 * mix)
        const opacity = Math.min(1, 0.4 + value * 1.4)
        const sourceX = rampIndex * glyphWidth
        const destX = col * cellWidth * dpr
        const destY = row * cellHeight * dpr

        if (smoothMix < 0.98) {
          ctx.globalAlpha = (1 - smoothMix) * opacity
          ctx.drawImage(textAtlas, sourceX, 0, glyphWidth, glyphHeight, destX, destY, glyphWidth, glyphHeight)
        }
        if (smoothMix > 0.02) {
          ctx.globalAlpha = smoothMix * opacity
          ctx.drawImage(accentAtlas, sourceX, 0, glyphWidth, glyphHeight, destX, destY, glyphWidth, glyphHeight)
        }
      }
    }

    const frame = (now: number) => {
      if (disposed) return
      const delta = Math.min(0.05, (now - lastTime) / 1000)
      lastTime = now
      const speed = settings.speed / 50
      simTime += delta * speed

      if (speed > 0 && settings.rain > 0) {
        nextDrop -= delta * speed
        if (nextDrop <= 0) {
          addRainDrop()
          nextDrop = exponential(1 / (settings.rain / 100 * 1.1))
        }
      }

      if (speed > 0 && pointer.inside && settings.hover > 0 && now - pointer.movedAt > 350) {
        heartbeat -= delta * speed
        if (heartbeat <= 0) {
          const amplitude = 0.55 * (settings.hover / 100)
          pending.push(
            { x: pointer.x, y: pointer.y, t0: simTime, amp: amplitude, speedFactor: 0.55 },
            { x: pointer.x, y: pointer.y, t0: simTime + 0.3, amp: amplitude * 0.7, speedFactor: 0.55 },
          )
          heartbeat = 1.8
        }
      }

      for (let i = pending.length - 1; i >= 0; i--) {
        const ripple = pending[i]
        if (ripple.t0 <= simTime) {
          ripples.push(ripple)
          pending.splice(i, 1)
        }
      }

      updateField()
      draw()
      frameId = window.requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerleave', onPointerLeave)
    frameId = window.requestAnimationFrame(frame)

    return () => {
      disposed = true
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
