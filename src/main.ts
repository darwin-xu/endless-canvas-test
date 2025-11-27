import type { Rect } from "./router";
import { routeRightToLeft } from "./router";

interface TestCase {
    A: Rect;
    B: Rect;
    note?: string;
}

const TEST_CASES: TestCase[] = [
    { note: "(simple horizontal)", A: { x: 0, y: 0, width: 100, height: 40 }, B: { x: 400, y: 0, width: 100, height: 40 } },
    { A: { x: 0, y: 0, width: 100, height: 40 }, B: { x: 400, y: 50, width: 100, height: 40 } },
    { A: { x: 0, y: 0, width: 100, height: 40 }, B: { x: 80, y: 150, width: 100, height: 40 } },
    { A: { x: 100, y: 70, width: 100, height: 40 }, B: { x: 200, y: 10, width: 100, height: 40 } },
    { A: { x: 0, y: 200, width: 120, height: 50 }, B: { x: 300, y: 200, width: 120, height: 50 } },
    { A: { x: 0, y: 0, width: 100, height: 40 }, B: { x: 200, y: 300, width: 120, height: 60 } },
    { A: { x: 200, y: 300, width: 120, height: 60 }, B: { x: 0, y: 0, width: 100, height: 40 } },
    { A: { x: 0, y: 0, width: 160, height: 60 }, B: { x: 120, y: 120, width: 160, height: 60 } },
    { A: { x: 120, y: 120, width: 160, height: 60 }, B: { x: 0, y: 0, width: 160, height: 60 } },
    { A: { x: 0, y: 100, width: 150, height: 50 }, B: { x: 120, y: 90, width: 200, height: 50 } },
    { A: { x: 200, y: 40, width: 140, height: 50 }, B: { x: 60, y: 180, width: 120, height: 40 } },
    { A: { x: 500, y: 50, width: 150, height: 60 }, B: { x: 200, y: 200, width: 140, height: 60 } },
    { A: { x: 100, y: 100, width: 80, height: 40 }, B: { x: 160, y: 110, width: 80, height: 40 } },
    { A: { x: 0, y: 0, width: 150, height: 60 }, B: { x: 10, y: 300, width: 150, height: 60 } },
    { A: { x: 140, y: 20, width: 100, height: 60 }, B: { x: 20, y: 20, width: 100, height: 60 } },
    { A: { x: 140, y: 20, width: 100, height: 60 }, B: { x: 20, y: 30, width: 100, height: 60 } },
    { A: { x: 140, y: 20, width: 100, height: 60 }, B: { x: 20, y: 40, width: 100, height: 60 } },
    { A: { x: 140, y: 20, width: 100, height: 60 }, B: { x: 20, y: 10, width: 100, height: 60 } },
    { A: { x: 0, y: 0, width: 100, height: 40 }, B: { x: 105, y: 0, width: 100, height: 40 } },
    { A: { x: 0, y: 0, width: 100, height: 40 }, B: { x: 100, y: 0, width: 100, height: 40 } },
    { A: { x: 0, y: 0, width: 100, height: 40 }, B: { x: 80, y: 0, width: 100, height: 40 } },
    { A: { x: 0, y: 0, width: 200, height: 40 }, B: { x: 80, y: 0, width: 60, height: 40 } },
    { A: { x: 0, y: 0, width: 120, height: 60 }, B: { x: 0, y: 80, width: 120, height: 60 } },
    { A: { x: 50, y: 100, width: 100, height: 40 }, B: { x: 50, y: 40, width: 100, height: 40 } },
    { A: { x: 100, y: 100, width: 100, height: 40 }, B: { x: 110, y: 220, width: 100, height: 40 } },
    { A: { x: 200, y: 0, width: 80, height: 40 }, B: { x: 220, y: 600, width: 80, height: 40 } },
    { A: { x: 0, y: 0, width: 150, height: 80 }, B: { x: 200, y: 20, width: 150, height: 80 } },
    { A: { x: 0, y: 0, width: 150, height: 80 }, B: { x: 100, y: 40, width: 150, height: 80 } },
    { A: { x: 0, y: 120, width: 150, height: 80 }, B: { x: 100, y: 40, width: 150, height: 80 } },
    { A: { x: 100, y: 100, width: 120, height: 60 }, B: { x: 180, y: 60, width: 120, height: 140 } },
    { A: { x: 200, y: 200, width: 100, height: 40 }, B: { x: 50, y: 100, width: 100, height: 40 } },
    { A: { x: 200, y: 50, width: 120, height: 60 }, B: { x: 40, y: 220, width: 120, height: 60 } },
    { A: { x: 200, y: 0, width: 120, height: 40 }, B: { x: 40, y: 0, width: 120, height: 40 } },
    { A: { x: 100, y: 100, width: 200, height: 120 }, B: { x: 140, y: 130, width: 80, height: 60 } },
    { A: { x: 140, y: 130, width: 80, height: 60 }, B: { x: 100, y: 100, width: 200, height: 120 } },
    { A: { x: 100, y: 100, width: 120, height: 60 }, B: { x: 100, y: 100, width: 120, height: 60 } },
    { A: { x: 0, y: 0, width: 100, height: 40 }, B: { x: 2000, y: 50, width: 100, height: 40 } },
    { A: { x: -200, y: -100, width: 120, height: 60 }, B: { x: 150, y: 80, width: 120, height: 60 } },
    { A: { x: 100, y: 0, width: 100, height: 40 }, B: { x: 0, y: 40, width: 100, height: 40 } },
    { A: { x: 100, y: 0, width: 100, height: 40 }, B: { x: 0, y: 41, width: 100, height: 40 } },
    { A: { x: 100, y: 0, width: 100, height: 40 }, B: { x: 0, y: 42, width: 100, height: 40 } },
    { A: { x: 100, y: 0, width: 100, height: 40 }, B: { x: 0, y: 43, width: 100, height: 40 } },
    { A: { x: 100, y: 0, width: 100, height: 40 }, B: { x: 0, y: 50, width: 100, height: 40 } },
    { A: { x: 100, y: 0, width: 100, height: 40 }, B: { x: 0, y: 60, width: 100, height: 40 } },
    { A: { x: 0, y: 0, width: 200, height: 120 }, B: { x: 100, y: 100, width: 200, height: 120 } },
];

const PADDING = 40;

let activeA: Rect = { ...TEST_CASES[0].A };
let activeB: Rect = { ...TEST_CASES[0].B };
let currentIndex = 0;
let dragging: null | { target: "A" | "B"; dx: number; dy: number } = null;

function toSvgPoint(svg: SVGSVGElement, clientX: number, clientY: number) {
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    return pt.matrixTransform(svg.getScreenCTM()!.inverse());
}

function buildSvg(): SVGSVGElement {
    const pathPoints = routeRightToLeft(activeA, activeB);
    const xs = [activeA.x, activeA.x + activeA.width, activeB.x, activeB.x + activeB.width, ...pathPoints.map(p => p.x)];
    const ys = [activeA.y, activeA.y + activeA.height, activeB.y, activeB.y + activeB.height, ...pathPoints.map(p => p.y)];
    const minX = Math.min(...xs) - PADDING;
    const maxX = Math.max(...xs) + PADDING;
    const minY = Math.min(...ys) - PADDING;
    const maxY = Math.max(...ys) + PADDING;
    const width = maxX - minX;
    const height = maxY - minY;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", String(width));
    svg.setAttribute("height", String(height));
    svg.setAttribute("viewBox", `${minX} ${minY} ${width} ${height}`);
    const addRect = (r: Rect, label: "A" | "B") => {
        const rect = document.createElementNS(svg.namespaceURI, "rect") as SVGRectElement;
        rect.setAttribute("x", String(r.x));
        rect.setAttribute("y", String(r.y));
        rect.setAttribute("width", String(r.width));
        rect.setAttribute("height", String(r.height));
        rect.setAttribute("fill", "none");
        rect.setAttribute("stroke", "black");
        rect.setAttribute("stroke-width", "2");
        rect.setAttribute("data-box", label);
        rect.style.cursor = "move";
        svg.appendChild(rect);
    };
    addRect(activeA, "A");
    addRect(activeB, "B");
    const poly = document.createElementNS(svg.namespaceURI, "polyline");
    poly.setAttribute("points", pathPoints.map(p => `${p.x},${p.y}`).join(" "));
    poly.setAttribute("fill", "none");
    poly.setAttribute("stroke", "red");
    poly.setAttribute("stroke-width", "2");
    svg.appendChild(poly);

    // Add numeric labels above each path point (only the index number)
    pathPoints.forEach((p, i) => {
        const t = document.createElementNS(svg.namespaceURI, "text") as SVGTextElement;
        t.textContent = String(i);
        t.setAttribute("x", String(p.x));
        // place label slightly above the point
        t.setAttribute("y", String(p.y - 8));
        t.setAttribute("font-size", "10");
        t.setAttribute("fill", "#222");
        t.setAttribute("text-anchor", "middle");
        svg.appendChild(t);
    });
    return svg;
}

function render() {
    const app = document.getElementById("app");
    const pointsList = document.getElementById("points-list");
    const itemCoords = document.getElementById("item-coords");
    if (!app) return;
    app.innerHTML = "";
    const svg = buildSvg();
    app.appendChild(svg);

    // Update item coords
    if (itemCoords) {
        const fmt = (r: Rect) => `(${Math.round(r.x)}, ${Math.round(r.y)})`;
        itemCoords.innerHTML = `<strong>A:</strong> ${fmt(activeA)}<br><strong>B:</strong> ${fmt(activeB)}`;
    }

    // Attach drag listeners
    svg.querySelectorAll("rect[data-box]").forEach(rectEl => {
        rectEl.addEventListener("pointerdown", (e: Event) => {
            const box = (rectEl as SVGRectElement).getAttribute("data-box") as "A" | "B";
            const pe = e as PointerEvent;
            const pt = toSvgPoint(svg, pe.clientX, pe.clientY);
            const r = box === "A" ? activeA : activeB;
            dragging = { target: box, dx: pt.x - r.x, dy: pt.y - r.y };
        });
    });
    svg.addEventListener("pointermove", (e: Event) => {
        if (!dragging) return;
        const pe = e as PointerEvent;
        const pt = toSvgPoint(svg, pe.clientX, pe.clientY);
        const r = dragging.target === "A" ? activeA : activeB;
        r.x = pt.x - dragging.dx;
        r.y = pt.y - dragging.dy;
        // Rebuild for updated geometry
        render();
    });
    svg.addEventListener("pointerup", () => { dragging = null; });
    svg.addEventListener("pointerleave", () => { dragging = null; });

    // Points list
    if (pointsList) {
        const pathPoints = routeRightToLeft(activeA, activeB);
        pointsList.innerHTML = "";
        pathPoints.forEach((p, i) => {
            const li = document.createElement("li");
            li.textContent = `${i}: (${Math.round(p.x)}, ${Math.round(p.y)})`;
            pointsList.appendChild(li);
        });
    }
}

function init() {
    const select = document.getElementById("case-select") as HTMLSelectElement | null;
    if (!select) return;
    const rectSummary = (r: Rect) => `(${Math.round(r.x)},${Math.round(r.y)},${Math.round(r.width)},${Math.round(r.height)})`;
    const caseName = (t: TestCase) => {
        const base = `${rectSummary(t.A)} → ${rectSummary(t.B)}`;
        return t.note ? `${base} ${t.note}` : base;
    };
    TEST_CASES.forEach((c, idx) => {
        const opt = document.createElement("option");
        opt.value = String(idx);
        opt.textContent = caseName(c);
        select.appendChild(opt);
    });
    select.addEventListener("change", () => {
        currentIndex = Number(select.value) || 0;
        const test = TEST_CASES[currentIndex];
        activeA = { ...test.A };
        activeB = { ...test.B };
        render();
    });
    select.value = "0";
    render();
}

init();
