import { describe, it, expect } from "vitest";
import { routeRightToLeft, Rect } from "./router";

function rect(x: number, y: number, width: number, height: number): Rect {
    return { x, y, width, height };
}

describe("routeRightToLeft", () => {
    it("Case 1: straight horizontal line", () => {
        const A = rect(0, 0, 100, 40);
        const B = rect(400, 0, 100, 40);
        const points = routeRightToLeft(A, B);
        expect(points).toEqual([
            { x: 100, y: 20 },
            { x: 400, y: 20 },
        ]);
    });

    it("Case 2: mid corridor with vertical offset", () => {
        const A = rect(0, 0, 100, 40);
        const B = rect(400, 50, 100, 40);
        const points = routeRightToLeft(A, B);
        expect(points).toEqual([
            { x: 100, y: 20 },
            { x: 250, y: 20 },
            { x: 250, y: 70 },
            { x: 400, y: 70 },
        ]);
    });

    it("Case 3: vertical corridor A above B", () => {
        const A = rect(0, 0, 100, 40);
        const B = rect(80, 150, 100, 40);
        const points = routeRightToLeft(A, B);
        expect(points).toEqual([
            { x: 100, y: 20 },
            { x: 120, y: 20 },
            { x: 120, y: 95 },
            { x: 60, y: 95 },
            { x: 60, y: 170 },
            { x: 80, y: 170 },
        ]);
    });

    it("Case 4: vertical corridor B above A", () => {
        const A = rect(100, 70, 100, 40);
        const B = rect(200, 10, 100, 40);
        const points = routeRightToLeft(A, B);
        expect(points).toEqual([
            { x: 200, y: 90 },
            { x: 220, y: 90 },
            { x: 220, y: 60 },
            { x: 180, y: 60 },
            { x: 180, y: 30 },
            { x: 200, y: 30 },
        ]);
    });
});
