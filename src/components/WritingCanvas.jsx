import { useRef, useEffect, useCallback } from 'react'

const INK = '#1A1A1A'
const GRID = '#E8E3DA'
const GRID_CENTER = '#D0C8BC'

export default function WritingCanvas({ letter }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const drawing = useRef(false)
  const pts = useRef([])

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const dpr = window.devicePixelRatio || 1
    const size = wrap.offsetWidth
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    drawBackground(ctx, size, size)
  }, [])

  function drawBackground(ctx, w, h) {
    ctx.clearRect(0, 0, w, h)
    // Background
    ctx.fillStyle = '#FAFAF7'
    ctx.fillRect(0, 0, w, h)
    // Grid thirds
    ctx.strokeStyle = GRID
    ctx.lineWidth = 0.75
    for (let i = 1; i <= 2; i++) {
      ctx.beginPath(); ctx.moveTo(w * i / 3, 0); ctx.lineTo(w * i / 3, h); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, h * i / 3); ctx.lineTo(w, h * i / 3); ctx.stroke()
    }
    // Center baseline (horizontal)
    ctx.strokeStyle = GRID_CENTER
    ctx.lineWidth = 1
    ctx.setLineDash([6, 4])
    ctx.beginPath(); ctx.moveTo(0, h * 0.6); ctx.lineTo(w, h * 0.6); ctx.stroke()
    ctx.setLineDash([])
    // Border
    ctx.strokeStyle = '#D0C8BC'
    ctx.lineWidth = 1
    ctx.strokeRect(0.5, 0.5, w - 1, h - 1)
  }

  const clear = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const w = canvas.width / dpr
    const h = canvas.height / dpr
    const ctx = canvas.getContext('2d')
    drawBackground(ctx, w, h)
  }, [])

  useEffect(() => { initCanvas() }, [initCanvas])
  useEffect(() => { clear() }, [letter, clear])

  function getPos(e) {
    const rect = canvasRef.current.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      // Stylus pressure (0-1), fallback 0.5 for mouse/finger
      pressure: e.pointerType === 'pen'
        ? Math.max(0.1, e.pressure)
        : 0.45,
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
      ctx.beginPath()
      ctx.moveTo(p[0].x, p[0].y)
      ctx.lineTo(p[1].x, p[1].y)
      ctx.stroke()
    } else {
      // Smooth bezier through midpoints
      const prev = p[p.length - 3]
      const last = p[p.length - 2]
      const cur = p[p.length - 1]
      const prevMid = { x: (prev.x + last.x) / 2, y: (prev.y + last.y) / 2 }
      const mid = { x: (last.x + cur.x) / 2, y: (last.y + cur.y) / 2 }
      ctx.beginPath()
      ctx.moveTo(prevMid.x, prevMid.y)
      ctx.quadraticCurveTo(last.x, last.y, mid.x, mid.y)
      ctx.stroke()
    }
  }

  function onUp() {
    drawing.current = false
    pts.current = []
  }

  return (
    <div className="writing-section">
      <div className="writing-header">
        <span className="writing-label">Pratique d'écriture ✎</span>
        <button className="btn-clear" onClick={clear}>✕ Effacer</button>
      </div>
      <div className="writing-body">
        <div className="writing-ref-block">
          <div className="writing-ref arabic">{letter}</div>
          <div className="writing-ref-hint">modèle</div>
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
      </div>
      <p className="writing-hint">
        {navigator.maxTouchPoints > 0
          ? 'Écris avec ton stylet — la pression est prise en compte.'
          : 'Dessine avec ta souris pour pratiquer.'}
      </p>
    </div>
  )
}
