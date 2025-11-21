import { Rect, routeRightToLeft } from './router'

interface TestCase {
  name: string
  A: Rect
  B: Rect
}

// Some useful test cases (the ones we discussed)
const TEST_CASES: TestCase[] = [
  {
    name: '(0,0,100,40) → (400,0,100,40) (simple horizontal)',
    A: { x: 0, y: 0, width: 100, height: 40 },
    B: { x: 400, y: 0, width: 100, height: 40 },
  },
  {
    name: '(0,0,100,40) → (400,50,100,40)',
    A: { x: 0, y: 0, width: 100, height: 40 },
    B: { x: 400, y: 50, width: 100, height: 40 },
  },
  {
    name: '(0,0,100,40) → (80,150,100,40)',
    A: { x: 0, y: 0, width: 100, height: 40 },
    B: { x: 80, y: 150, width: 100, height: 40 },
  },
  {
    name: '(100,70,100,40) → (200,10,100,40)',
    A: { x: 100, y: 70, width: 100, height: 40 },
    B: { x: 200, y: 10, width: 100, height: 40 },
  },
]

// Basic padding around drawing
const PADDING = 40

function createSvgForCase(test: TestCase): SVGSVGElement {
  const { A, B } = test
  const pathPoints = routeRightToLeft(A, B)

  // compute bounds for viewBox
  const xs = [
    A.x,
    A.x + A.width,
    B.x,
    B.x + B.width,
    ...pathPoints.map((p) => p.x),
  ]
  const ys = [
    A.y,
    A.y + A.height,
    B.y,
    B.y + B.height,
    ...pathPoints.map((p) => p.y),
  ]

  const minX = Math.min(...xs) - PADDING
  const maxX = Math.max(...xs) + PADDING
  const minY = Math.min(...ys) - PADDING
  const maxY = Math.max(...ys) + PADDING

  const width = maxX - minX
  const height = maxY - minY

  const svgNS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(svgNS, 'svg')
  svg.setAttribute('width', String(width))
  svg.setAttribute('height', String(height))
  svg.setAttribute(
    'viewBox',
    `${minX} ${minY} ${width} ${height}`,
  )

  // draw rect helper
  const addRect = (r: Rect, color: string) => {
    const rect = document.createElementNS(svgNS, 'rect')
    rect.setAttribute('x', String(r.x))
    rect.setAttribute('y', String(r.y))
    rect.setAttribute('width', String(r.width))
    rect.setAttribute('height', String(r.height))
    rect.setAttribute('fill', 'none')
    rect.setAttribute('stroke', color)
    rect.setAttribute('stroke-width', '2')
    svg.appendChild(rect)
  }

  addRect(A, 'black')
  addRect(B, 'black')

  // polyline for connector
  const poly = document.createElementNS(svgNS, 'polyline')
  const pointsAttr = pathPoints.map((p) => `${p.x},${p.y}`).join(' ')
  poly.setAttribute('points', pointsAttr)
  poly.setAttribute('fill', 'none')
  poly.setAttribute('stroke', 'red')
  poly.setAttribute('stroke-width', '2')
  svg.appendChild(poly)

  // optional: show ports
  const portCircle = (x: number, y: number, color: string) => {
    const c = document.createElementNS(svgNS, 'circle')
    c.setAttribute('cx', String(x))
    c.setAttribute('cy', String(y))
    c.setAttribute('r', '3')
    c.setAttribute('fill', color)
    svg.appendChild(c)
  }

  // start + end markers
  const start = pathPoints[0]
  const end = pathPoints[pathPoints.length - 1]
  portCircle(start.x, start.y, 'blue')
  portCircle(end.x, end.y, 'green')

  return svg
}

function main() {
  const app = document.getElementById('app')
  const select = document.getElementById('case-select') as HTMLSelectElement | null
  if (!app || !select) return

  // populate dropdown
  TEST_CASES.forEach((c, idx) => {
    const opt = document.createElement('option')
    opt.value = String(idx)
    opt.textContent = c.name
    select.appendChild(opt)
  })

  const render = () => {
    const idx = Number(select.value) || 0
    const test = TEST_CASES[idx]
    app.innerHTML = ''
    app.appendChild(createSvgForCase(test))
  }

  select.addEventListener('change', render)

  // initial
  select.value = '0'
  render()
}

main()
