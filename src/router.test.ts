import { describe, it, expect } from "vitest";
import { routeRightToLeft, type Rect } from "./router";

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

    it("Case 5: start inside target (overlap) escape quickly", () => {
        const A = rect(0, 0, 100, 40);
        const B = rect(80, 0, 100, 40);
        const points = routeRightToLeft(A, B);
        expect(points).toEqual([
            { x: 100, y: 20 },
            { x: 120, y: 20 },
            { x: 120, y: 60 },
            { x: 60, y: 60 },
            { x: 60, y: 20 },
            { x: 80, y: 20 },
        ]);
    });

    it("Case 6: overlapping vertically, prefer closer downward detour", () => {
        const A = rect(0, 120, 150, 80);
        const B = rect(100, 40, 150, 80);
        const points = routeRightToLeft(A, B);
        expect(points).toEqual([
            { x: 150, y: 160 }, // S
            { x: 170, y: 160 }, // out from A
            { x: 170, y: 220 }, // down at outX
            { x: -20, y: 220 }, // left under both
            { x: -20, y: 80 }, // up to E.y
            { x: 100, y: 80 }, // E
        ]);
    });

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

    // -------------------------------------------------------
    // Comprehensive Edge Cases
    // -------------------------------------------------------

    // 1. Reverse Horizontal: A is to the right of B
    it("Reverse Horizontal: A(400,0) -> B(0,0)", () => {
        const A = rect(400, 0, 100, 40);
        const B = rect(0, 0, 100, 40);
        // S=(500,20), E=(0,20)
        // Should go out right, down/up, left, back to E
        const points = routeRightToLeft(A, B);
        
        // Basic checks
        expect(points[0]).toEqual({ x: 500, y: 20 }); // S
        expect(points[points.length - 1]).toEqual({ x: 0, y: 20 }); // E
        
        // Should have detoured
        expect(points.length).toBeGreaterThan(2);
        
        // Check bounding box of path to ensure it went around
        const xs = points.map(p => p.x);
        const maxX = Math.max(...xs);
        expect(maxX).toBeGreaterThan(500); // Should go right of A
    });

    // 2. Blocked Exit (Near): B is just to the right of A, blocking the 20px exit
    // Since they are vertically aligned, Case 0 (Straight Line) takes precedence.
    it("Blocked Exit (Aligned): A(0,0) -> B(110,-10)", () => {
        const A = rect(0, 0, 100, 40); // Right: 100
        const B = rect(110, -10, 100, 60); // Left: 110. Gap 10.
        // S=(100,20). E=(110,20).
        const points = routeRightToLeft(A, B);
        
        // Should go straight because Case 0 allows it
        expect(points.length).toBe(2);
        expect(points[0]).toEqual({ x: 100, y: 20 });
        expect(points[1]).toEqual({ x: 110, y: 20 });
    });

    // 3. A inside B
    it("A inside B: A(50,10) -> B(0,0)", () => {
        const A = rect(50, 10, 20, 20); // x:50-70, y:10-30
        const B = rect(0, 0, 100, 100); // x:0-100, y:0-100
        // S=(70,20). Inside B.
        // E=(0,50).
        const points = routeRightToLeft(A, B);
        
        expect(points[0]).toEqual({ x: 70, y: 20 });
        expect(points[points.length - 1]).toEqual({ x: 0, y: 50 });
        
        // Should escape B
        const ys = points.map(p => p.y);
        
        // Should go right out of B or down out of B?
        // Current logic for "startInsideB" goes to outX (S.x+20 = 90) then detourY (maxBottom+20 = 120)
        // 90 is still inside B (0-100).
        // But detourY 120 is below B (100).
        // So it goes (70,20) -> (90,20) -> (90,120) -> ...
        // This is valid.
        expect(Math.max(...ys)).toBeGreaterThanOrEqual(120);
    });

    // 4. B inside A
    it("B inside A: A(0,0) -> B(50,10)", () => {
        const A = rect(0, 0, 100, 100);
        const B = rect(50, 10, 20, 20);
        // S=(100,50). E=(50,20).
        // S is outside B.
        // E is inside A.
        // Path must go from 100 to 50.
        const points = routeRightToLeft(A, B);
        
        expect(points[0]).toEqual({ x: 100, y: 50 });
        expect(points[points.length - 1]).toEqual({ x: 50, y: 20 });
    });
    
    // 5. Touching Edges
    it("Touching Edges: A(0,0) -> B(100,0)", () => {
        const A = rect(0, 0, 100, 40);
        const B = rect(100, 0, 100, 40);
        // S=(100,20). E=(100,20).
        // S == E.
        const points = routeRightToLeft(A, B);
        // Should probably be just [S, E] or similar.
        expect(points.length).toBeGreaterThanOrEqual(2);
        expect(points[0]).toEqual({ x: 100, y: 20 });
        expect(points[points.length - 1]).toEqual({ x: 100, y: 20 });
    });
});
