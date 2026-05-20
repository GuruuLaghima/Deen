import { useRef, useEffect, useCallback } from 'react'

const INK = '#1A1A1A'
const CELL = 20  // quadrillé — 20px squares

function drawBackground(ctx, w, h) {
  ctx.fillStyle = '#FAFAF6'
  ctx.fillRect(0, 0, w, h)

  for (let x = 0; x <= w; x += CELL) {
    const major = Math.round(x / CELL) % 5 === 0
    ctx.strokeStyle = major ? '#C4BDB1' : '#DDD6CC'
    ctx.lineWidth = major ? 0.8 : 0.5
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
  }
  for (let y = 0; y <= h; y += CELL) {
    const major = Math.round(y / CELL) % 5 === 0
    ctx.strokeStyle = major ? '#C4BDB1' : '#DDD6CC'
    ctx.lineWidth = major ? 0.8 : 0.5
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
  }

  ctx.strokeStyle = '#C4BDB1'
  ctx.lineWidth = 1
  ctx.strokeRect(0.5, 0.5, w - 1, h - 1)
}

export default function WritingCanvas({ text }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const drawing = useRef(false)
  const pts = useRef([])

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const dpr = window.devicePixelRatio || 1
    const w = wrap.offsetWidth
    const h = wrap.offsetHeight
    if (!w || !h) return
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    drawBackground(ctx, w, h)
  }, [])

  const clear = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const w = canvas.width / dpr
    const h = canvas.height / dpr
    drawBackground(canvas.getContext('2d'), w, h)
  }, [])

  useEffect(() => { initCanvas() }, [initCanvas])
  // No auto-clear on text change — only the Effacer button clears

  function getPos(e) {
    const rect = canvasRef.current.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      pressure: e.pointerType === 'pen' ? Math.max(0.1, e.pressure) : 0.45,
    }
  }

  function onDown(e) {
    e.preventDefault()
    canvasRef.current.setPointerCapture(e.pointerId)
    drawing.current = true
    const pos = getPos(e)
    pts.current = [pos]
    const ctx = canvasRef.current.getContext('2d')
    ctx.fillStyle = INK
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, pos.pressure * 3 + 0.5, 0, Math.PI * 2)
    ctx.fill()
  }

  function onMove(e) {
    if (!drawing.current) return
    e.preventDefault()
    const pos = getPos(e)
    pts.current.push(pos)
    const p = pts.current
    if (p.length < 2) return
    const ctx = canvasRef.current.getContext('2d')
    ctx.strokeStyle = INK
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = pos.pressure * 6 + 1
    if (p.length === 2) {
      ctx.beginPath(); ctx.moveTo(p[0].x, p[0].y); ctx.lineTo(p[1].x, p[1].y); ctx.stroke()
    } else {
      const prev = p[p.length - 3], last = p[p.length - 2], cur = p[p.length - 1]
      const pm = { x: (prev.x + last.x) / 2, y: (prev.y + last.y) / 2 }
      const m  = { x: (last.x + cur.x) / 2, y: (last.y + cur.y) / 2 }
      ctx.beginPath()
      ctx.moveTo(pm.x, pm.y)
      ctx.quadraticCurveTo(last.x, last.y, m.x, m.y)
      ctx.stroke()
    }
  }

  function onUp() { drawing.current = false; pts.current = [] }

  return (
    <div className="writing-section">
      <div className="writing-header">
        <div className="writing-ref-row">
          <span className="writing-label">✎ Pratique d'écriture</span>
          {text && <span className="writing-ref arabic">{text}</span>}
        </div>
        <button className="btn-clear" onClick={clear}>✕ Effacer</button>
      </div>
      <div className="writing-canvas-wrap" ref={wrapRef}>
        <canvas
          ref={canvasRef}
          className="writing-canvas"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
          onPointerCancel={onUp}
          style={{ touchAction: 'none', cursor: 'crosshair', display: 'block' }}
        />
      </div>
      <p className="writing-hint">
        {navigator.maxTouchPoints > 0
          ? 'Écris avec ton stylet — la pression est prise en compte.'
          : 'Dessine avec ta souris pour pratiquer.'}
      </p>
    </div>
  )
}
