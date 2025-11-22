import type { Rect } from "./router";
import { routeRightToLeft } from "./router";

interface TestCase {
    A: Rect;
    B: Rect;
    note?: string; // optional commentary appended to generated name
}

// Some useful test cases (the ones we discussed)
const TEST_CASES: TestCase[] = [
    {
        note: "(simple horizontal)",
        A: { x: 0, y: 0, width: 100, height: 40 },
        B: { x: 400, y: 0, width: 100, height: 40 },
    },
    {
        A: { x: 0, y: 0, width: 100, height: 40 },
        B: { x: 400, y: 50, width: 100, height: 40 },
    },
    {
        A: { x: 0, y: 0, width: 100, height: 40 },
        B: { x: 80, y: 150, width: 100, height: 40 },
    },
    {
        A: { x: 100, y: 70, width: 100, height: 40 },
        B: { x: 200, y: 10, width: 100, height: 40 },
    },
    {
        A: { x: 0, y: 200, width: 120, height: 50 },
        B: { x: 300, y: 200, width: 120, height: 50 },
    },
    {
        A: { x: 0, y: 0, width: 100, height: 40 },
        B: { x: 200, y: 300, width: 120, height: 60 },
    },
    {
        A: { x: 200, y: 300, width: 120, height: 60 },
        B: { x: 0, y: 0, width: 100, height: 40 },
    },
    {
        A: { x: 0, y: 0, width: 160, height: 60 },
        B: { x: 120, y: 120, width: 160, height: 60 },
    },
    {
        A: { x: 120, y: 120, width: 160, height: 60 },
        B: { x: 0, y: 0, width: 160, height: 60 },
    },
    {
        A: { x: 0, y: 100, width: 150, height: 50 },
        B: { x: 120, y: 90, width: 200, height: 50 },
    },
    {
        A: { x: 200, y: 40, width: 140, height: 50 },
        B: { x: 60, y: 180, width: 120, height: 40 },
    },
    {
        A: { x: 500, y: 50, width: 150, height: 60 },
        B: { x: 200, y: 200, width: 140, height: 60 },
    },
    {
        A: { x: 100, y: 100, width: 80, height: 40 },
        B: { x: 160, y: 110, width: 80, height: 40 },
    },
    {
        A: { x: 0, y: 0, width: 150, height: 60 },
        B: { x: 10, y: 300, width: 150, height: 60 },
    },
    {
        A: { x: 140, y: 20, width: 100, height: 60 },
        B: { x: 20, y: 20, width: 100, height: 60 },
    },
    {
        A: { x: 140, y: 20, width: 100, height: 60 },
        B: { x: 20, y: 30, width: 100, height: 60 },
    },
    {
        A: { x: 140, y: 20, width: 100, height: 60 },
        B: { x: 20, y: 40, width: 100, height: 60 },
    },
    {
        A: { x: 140, y: 20, width: 100, height: 60 },
        B: { x: 20, y: 10, width: 100, height: 60 },
    },
    {
        A: { x: 0, y: 0, width: 100, height: 40 },
        B: { x: 105, y: 0, width: 100, height: 40 },
    },
    {
        A: { x: 0, y: 0, width: 100, height: 40 },
        B: { x: 100, y: 0, width: 100, height: 40 },
    },
    {
        A: { x: 0, y: 0, width: 100, height: 40 },
        B: { x: 80, y: 0, width: 100, height: 40 },
    },
    {
        A: { x: 0, y: 0, width: 200, height: 40 },
        B: { x: 80, y: 0, width: 60, height: 40 },
    },

    {
        A: { x: 0, y: 0, width: 120, height: 60 },
        B: { x: 0, y: 80, width: 120, height: 60 },
    },
    {
        A: { x: 50, y: 100, width: 100, height: 40 },
        B: { x: 50, y: 40, width: 100, height: 40 },
    },
    {
        A: { x: 100, y: 100, width: 100, height: 40 },
        B: { x: 110, y: 220, width: 100, height: 40 },
    },
    {
        A: { x: 200, y: 0, width: 80, height: 40 },
        B: { x: 220, y: 600, width: 80, height: 40 },
    },

    {
        A: { x: 0, y: 0, width: 150, height: 80 },
        B: { x: 200, y: 20, width: 150, height: 80 },
    },
    {
        A: { x: 0, y: 0, width: 150, height: 80 },
        B: { x: 100, y: 40, width: 150, height: 80 },
    },
    {
        A: { x: 0, y: 120, width: 150, height: 80 },
        B: { x: 100, y: 40, width: 150, height: 80 },
    },
    {
        A: { x: 100, y: 100, width: 120, height: 60 },
        B: { x: 180, y: 60, width: 120, height: 140 },
    },

    {
        A: { x: 200, y: 200, width: 100, height: 40 },
        B: { x: 50, y: 100, width: 100, height: 40 },
    },
    {
        A: { x: 200, y: 50, width: 120, height: 60 },
        B: { x: 40, y: 220, width: 120, height: 60 },
    },
    {
        A: { x: 200, y: 0, width: 120, height: 40 },
        B: { x: 40, y: 0, width: 120, height: 40 },
    },

    {
        A: { x: 100, y: 100, width: 200, height: 120 },
        B: { x: 140, y: 130, width: 80, height: 60 },
    },
    {
        A: { x: 140, y: 130, width: 80, height: 60 },
        B: { x: 100, y: 100, width: 200, height: 120 },
    },
    {
        A: { x: 100, y: 100, width: 120, height: 60 },
        B: { x: 100, y: 100, width: 120, height: 60 },
    },

    {
        A: { x: 0, y: 0, width: 100, height: 40 },
        B: { x: 2000, y: 50, width: 100, height: 40 },
    },
    {
        A: { x: -200, y: -100, width: 120, height: 60 },
        B: { x: 150, y: 80, width: 120, height: 60 },
    },
    {
        A: { x: 100, y: 0, width: 100, height: 40 },
        B: { x: 0, y: 40, width: 100, height: 40 },
    },
    {
        A: { x: 100, y: 0, width: 100, height: 40 },
        B: { x: 0, y: 41, width: 100, height: 40 },
    },
    {
        A: { x: 100, y: 0, width: 100, height: 40 },
        B: { x: 0, y: 42, width: 100, height: 40 },
    },
    {
        A: { x: 100, y: 0, width: 100, height: 40 },
        B: { x: 0, y: 43, width: 100, height: 40 },
    },
    {
        A: { x: 100, y: 0, width: 100, height: 40 },
        B: { x: 0, y: 50, width: 100, height: 40 },
    },
    {
        A: { x: 100, y: 0, width: 100, height: 40 },
        B: { x: 0, y: 60, width: 100, height: 40 },
    },
];

// Basic padding around drawing
const PADDING = 40;

function createSvgForCase(test: TestCase): SVGSVGElement {
    const { A, B } = test;
    const pathPoints = routeRightToLeft(A, B);

    // compute bounds for viewBox
    const xs = [
        A.x,
        A.x + A.width,
        B.x,
        B.x + B.width,
        ...pathPoints.map((p) => p.x),
    ];
    const ys = [
        A.y,
        A.y + A.height,
        B.y,
        B.y + B.height,
        ...pathPoints.map((p) => p.y),
    ];

    const minX = Math.min(...xs) - PADDING;
    const maxX = Math.max(...xs) + PADDING;
    const minY = Math.min(...ys) - PADDING;
    const maxY = Math.max(...ys) + PADDING;

    const width = maxX - minX;
    const height = maxY - minY;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", String(width));
    svg.setAttribute("height", String(height));
    svg.setAttribute("viewBox", `${minX} ${minY} ${width} ${height}`);

    // draw rect helper
    const addRect = (r: Rect, color: string) => {
        const rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("x", String(r.x));
        rect.setAttribute("y", String(r.y));
        rect.setAttribute("width", String(r.width));
        rect.setAttribute("height", String(r.height));
        rect.setAttribute("fill", "none");
        rect.setAttribute("stroke", color);
        rect.setAttribute("stroke-width", "2");
        svg.appendChild(rect);
    };

    addRect(A, "black");
    addRect(B, "black");

    // polyline for connector
    const poly = document.createElementNS(svgNS, "polyline");
    const pointsAttr = pathPoints.map((p) => `${p.x},${p.y}`).join(" ");
    poly.setAttribute("points", pointsAttr);
    poly.setAttribute("fill", "none");
    poly.setAttribute("stroke", "red");
    poly.setAttribute("stroke-width", "2");
    svg.appendChild(poly);

    // optional: show ports
    const portCircle = (x: number, y: number, color: string) => {
        const c = document.createElementNS(svgNS, "circle");
        c.setAttribute("cx", String(x));
        c.setAttribute("cy", String(y));
        c.setAttribute("r", "3");
        c.setAttribute("fill", color);
        svg.appendChild(c);
    };

    // start + end markers
    const start = pathPoints[0];
    const end = pathPoints[pathPoints.length - 1];
    portCircle(start.x, start.y, "blue");
    portCircle(end.x, end.y, "green");

    return svg;
}

function main() {
    const app = document.getElementById("app");
    const select = document.getElementById(
        "case-select",
    ) as HTMLSelectElement | null;
    const pointsList = document.getElementById("points-list");
    if (!app || !select) return;

    const rectSummary = (r: Rect) => `(${r.x},${r.y},${r.width},${r.height})`;
    const caseName = (t: TestCase) => {
        const base = `${rectSummary(t.A)} → ${rectSummary(t.B)}`;
        return t.note ? `${base} ${t.note}` : base;
    };

    // populate dropdown
    TEST_CASES.forEach((c, idx) => {
        const opt = document.createElement("option");
        opt.value = String(idx);
        opt.textContent = caseName(c);
        select.appendChild(opt);
    });

    const render = () => {
        const idx = Number(select.value) || 0;
        const test = TEST_CASES[idx];
        const pathPoints = routeRightToLeft(test.A, test.B);
        app.innerHTML = "";
        // Build SVG using existing helper (will recompute points internally).
        app.appendChild(createSvgForCase(test));

        // Populate points list
        if (pointsList) {
            pointsList.innerHTML = "";
            pathPoints.forEach((p, i) => {
                const li = document.createElement("li");
                li.textContent = `${i}: (${p.x}, ${p.y})`;
                pointsList.appendChild(li);
            });
        }
    };

    select.addEventListener("change", render);

    // initial
    select.value = "0";
    render();
}

main();
