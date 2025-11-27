import { describe, it, expect } from "vitest";
import { routeRightToLeft, Rect } from "./router";

function rect(x: number, y: number, width: number, height: number): Rect {
    return { x, y, width, height };
}

describe("routeRightToLeft New Cases", () => {
    it("New Case 1: (0, 0, 100, 40) -> (92, -26, 100, 40)", () => {
        const A = rect(0, 0, 100, 40);
        const B = rect(92, -26, 100, 40);
        const points = routeRightToLeft(A, B);
        expect(points).toEqual([
            { x: 100, y: 20 },
            { x: 120, y: 20 },
            { x: 120, y: 60 },
            { x: -20, y: 60 },
            { x: -20, y: -6 },
            { x: 92, y: -6 },
        ]);
    });

    it("New Case 2: (0, 0, 100, 40) -> (80, 30, 100, 40)", () => {
        const A = rect(0, 0, 100, 40);
        const B = rect(80, 30, 100, 40);
        const points = routeRightToLeft(A, B);
        expect(points).toEqual([
            { x: 100, y: 20 },
            { x: 120, y: 20 },
            { x: 200, y: 20 },
            { x: 200, y: 90 },
            { x: 60, y: 90 },
            { x: 60, y: 50 },
            { x: 80, y: 50 },
        ]);
    });
});
