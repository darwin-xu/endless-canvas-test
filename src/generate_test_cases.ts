
import { routeRightToLeft, type Rect } from "./router";

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
    { note: "New Case 1", A: { x: 0, y: 0, width: 100, height: 40 }, B: { x: 92, y: -26, width: 100, height: 40 } },
    { note: "New Case 2", A: { x: 0, y: 0, width: 100, height: 40 }, B: { x: 80, y: 30, width: 100, height: 40 } },
    { A: { x: 0, y: 120, width: 150, height: 80 }, B: { x: 100, y: 40, width: 150, height: 80 } },
];

const skipIndices = new Set([0, 1, 2, 3, 20, 29, 46, 47, 48]);

console.log('// Generated test cases from main.ts');
TEST_CASES.forEach((testCase, index) => {
    if (skipIndices.has(index)) return;

    const points = routeRightToLeft(testCase.A, testCase.B);
    const note = testCase.note ? ` ${testCase.note}` : '';
    
    console.log(`
    it("Generated Case ${index}:${note} A(${testCase.A.x},${testCase.A.y}) -> B(${testCase.B.x},${testCase.B.y})", () => {
        const A = rect(${testCase.A.x}, ${testCase.A.y}, ${testCase.A.width}, ${testCase.A.height});
        const B = rect(${testCase.B.x}, ${testCase.B.y}, ${testCase.B.width}, ${testCase.B.height});
        const points = routeRightToLeft(A, B);
        expect(points).toEqual(${JSON.stringify(points, null, 12).replace(/"x":/g, 'x:').replace(/"y":/g, 'y:')});
    });`);
});
