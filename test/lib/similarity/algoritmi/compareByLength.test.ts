import { CompareByLength } from "../../../../src/lib/similarity/algoritmi/CompareByLength";
import { Comparator } from "../../../../src/lib/similarity/comparator";
import { describe, test, expect } from "vitest";

describe("compareByLength test suite", async () => {
  const comparator = new Comparator(new CompareByLength());

  test("no coordinates is different from [[0,0],[1,1]]", () => {
    const similarity = comparator.compare(
      [
        [0, 0],
        [1, 1],
      ],
      []
    );
    expect(similarity).not.toBe(1.0);
  });

  test("one coordinate is the same as zero coordinates", () => {
    const similarity = comparator.compare([[1, 1]], []);
    expect(similarity).toBe(1.0);
  });

  test("zero coordinates is the same as zero coordinates", () => {
    const similarity = comparator.compare([], []);
    expect(similarity).toBe(1.0);
  });

  test("reverse path should have the same length", () => {
    const randomPath = generateRandomPath(100);
    const similarity = comparator.compare(randomPath, randomPath.reverse());
    expect(similarity).toBe(1.0);
  });
});

//Generate a random path of length
function generateRandomPath(length: number): GeoJSON.Position[] {
  const path: GeoJSON.Position[] = [];
  for (let i = 0; i < length; i++) {
    path.push([Math.random(), Math.random()]);
  }
  return path;
}
