import { pathDistance } from "../../../../src/lib/similarity/utils";
import {
  CompareByLength,
  Coordinate,
} from "../../../../src/lib/similarity/algoritmi/compareByLength";
import { Comparator } from "../../../../src/lib/similarity/comparator";
import { describe, test, expect } from "vitest";

describe("compareByLength test suite", async () => {
  const comparator = new Comparator(new CompareByLength());

  test("no coordinates is different from [[0,0],[1,1]]", () => {
    const difference = comparator.compare(
      [
        [0, 0],
        [1, 1],
      ],
      []
    );
    expect(difference).not.toBe(0.0);
  });

  test("one coordinate is the same as zero", () => {
    const difference = comparator.compare([[1, 1]], []);
    expect(difference).toBe(0.0);
  });

  test("reverse path should have the same length", () => {
    const randomPath = generateRandomPath(100);
    const difference = comparator.compare(randomPath, randomPath.reverse());
    expect(difference).toBe(0.0);
  });
});

//Generate a random path of length
function generateRandomPath(length: number): Coordinate[] {
  const path: Coordinate[] = [];
  for (let i = 0; i < length; i++) {
    path.push([Math.random(), Math.random()]);
  }
  return path;
}
