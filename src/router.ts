// src/router.ts
export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Point {
    x: number;
    y: number;
}

/**
 * Route from A -> B:
 * - from center of A's right edge
 * - to center of B's left edge
 * - orthogonal only
 * - leave/enter horizontally (perpendicular to edges)
 * - try to use vertical gap between rects; otherwise detour outside
 */
export function routeRightToLeft(A: Rect, B: Rect): Point[] {
    const points: Point[] = [];

    // 1. Ports
    const S: Point = {
        x: A.x + A.width,
        y: A.y + A.height / 2,
    };

    const E: Point = {
        x: B.x,
        y: B.y + B.height / 2,
    };

    points.push(S);

    // small step out of A to the right (perpendicular to right edge)
    const outX = S.x + 20;
    points.push({ x: outX, y: S.y });

    const topA = A.y;
    const bottomA = A.y + A.height;
    const topB = B.y;
    const bottomB = B.y + B.height;

    // --- Try vertical corridor (gap) between A and B ---
    let corridorY: number | null = null;

    // A above B
    if (bottomA + 5 < topB - 5) {
        corridorY = (bottomA + topB) / 2;
    }

    // B above A
    if (bottomB + 5 < topA - 5) {
        corridorY = (bottomB + topA) / 2;
    }

    if (corridorY !== null) {
        // go into vertical gap
        points.push({ x: outX, y: corridorY });

        // choose an x left of B for approach
        const leftOfB = B.x - 20;
        points.push({ x: leftOfB, y: corridorY });

        // go to B center line
        points.push({ x: leftOfB, y: E.y });

        // final entry
        points.push(E);
        return points;
    }

    // --- No vertical gap: outer detour ---
    const rightMax = Math.max(A.x + A.width, B.x + B.width);
    const detourX = rightMax + 20;

    const bottomMax = Math.max(bottomA, bottomB);
    const detourY = bottomMax + 20;

    points.push({ x: detourX, y: S.y });
    points.push({ x: detourX, y: detourY });
    points.push({ x: B.x - 20, y: detourY });
    points.push({ x: B.x - 20, y: E.y });
    points.push(E);

    return points;
}
