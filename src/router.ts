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

export function routeRightToLeft(A: Rect, B: Rect): Point[] {
    // ---- 1. Ports ----
    const S: Point = {
        x: A.x + A.width,
        y: A.y + A.height / 2,
    };

    const E: Point = {
        x: B.x,
        y: B.y + B.height / 2,
    };

    // Helpful ranges
    const Aleft = A.x;
    const Aright = A.x + A.width;
    const Atop = A.y;
    const Abottom = A.y + A.height;

    const Bleft = B.x;
    const Bright = B.x + B.width;
    const Btop = B.y;
    const Bbottom = B.y + B.height;

    // -------------------------------------------------------
    // CASE 0 — Simple straight horizontal line (ideal case)
    // -------------------------------------------------------

    if (S.y === E.y) {
        const y = S.y;
        const x1 = Math.min(S.x, E.x);
        const x2 = Math.max(S.x, E.x);
        // Treat touching the boundary (>= right or <= left) as non-intersection
        const hitsA = y > Atop && y < Abottom && !(x2 <= Aleft || x1 >= Aright);
        const hitsB = y > Btop && y < Bbottom && !(x2 <= Bleft || x1 >= Bright);
        if (!hitsA && !hitsB) return [S, E];
    }

    // -------------------------------------------------------
    // SIMPLE MID CORRIDOR (A fully left of B, vertical offset)
    // -------------------------------------------------------
    if (Aright < Bleft && S.y !== E.y) {
        const midX = (S.x + E.x) / 2;
        return [S, { x: midX, y: S.y }, { x: midX, y: E.y }, E];
    }

    // -------------------------------------------------------
    // CASE 1 — Leave A horizontally (required)
    // -------------------------------------------------------
    const outX = S.x + 20;
    const first = { x: outX, y: S.y };

    // -------------------------------------------------------
    // CASE 2 — Try to find a vertical corridor between A and B
    // -------------------------------------------------------

    // A above B
    if (Abottom + 5 < Btop - 5) {
        const mid = (Abottom + Btop) / 2;
        const leftOfB = Bleft - 20;

        return [
            S,
            first,
            { x: outX, y: mid },
            { x: leftOfB, y: mid },
            { x: leftOfB, y: E.y },
            E,
        ];
    }

    // B above A
    if (Bbottom + 5 < Atop - 5) {
        const mid = (Bbottom + Atop) / 2;
        const leftOfB = Bleft - 20;

        return [
            S,
            first,
            { x: outX, y: mid },
            { x: leftOfB, y: mid },
            { x: leftOfB, y: E.y },
            E,
        ];
    }

    // -------------------------------------------------------
    // SPECIAL — Start point lies inside B, escape quickly
    // -------------------------------------------------------
    const startInsideB = S.x > Bleft && S.x < Bright && S.y > Btop && S.y < Bbottom;
    if (startInsideB) {
        const bottomMaxLocal = Math.max(Abottom, Bbottom);
        const detourYLocal = bottomMaxLocal + 20;
        const leftOfBLocal = Bleft - 20;
        return [
            S,
            first,
            { x: outX, y: detourYLocal },
            { x: leftOfBLocal, y: detourYLocal },
            { x: leftOfBLocal, y: E.y },
            E,
        ];
    }

    // -------------------------------------------------------
    // CASE 3 — No corridor; choose safe outer detour
    // -------------------------------------------------------

    const rightMax = Math.max(Aright, Bright);
    const detourX = rightMax + 20;

    const bottomMax = Math.max(Abottom, Bbottom);
    const detourY = bottomMax + 20;
    const leftOfB = Bleft - 20;

    // Prefer a tighter detour: go down at outX if that vertical segment stays outside B.
    const canTightDetour = S.y > Bbottom || S.y < Btop; // vertical move at outX won't cross interior of B
    if (canTightDetour) {
        return [
            S,
            first,
            { x: outX, y: detourY },
            { x: leftOfB, y: detourY },
            { x: leftOfB, y: E.y },
            E,
        ];
    }

    // Fallback: wide outer detour
    return [
        S,
        first,
        { x: detourX, y: S.y },
        { x: detourX, y: detourY },
        { x: leftOfB, y: detourY },
        { x: leftOfB, y: E.y },
        E,
    ];
}
