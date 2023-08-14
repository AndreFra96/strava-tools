import {
  CompareByLength,
  Coordinate,
  similarityIndex,
} from "../../../../src/lib/similarity/algoritmi/compareByLength";
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

describe("numbersSimilarity test suite", () => {
  test("1 is similar to 1", () => {
    expect(similarityIndex(1, 1)).toBe(1);
  });
  test("0 is similar to 0", () => {
    expect(similarityIndex(0, 0)).toBe(1);
  });
  test("la similarità fra 1000 e 500 è la metà (0.5)", () => {
    expect(similarityIndex(1000, 500)).toBe(0.5);
  });
  test("la similarità fra 1000 e 250 è un quarto (0.25)", () => {
    expect(similarityIndex(1000, 250)).toBe(0.25);
  });
  test("la similarità fra 1000 e 999 è quasi totale (0.999)", () => {
    expect(similarityIndex(1000, 999)).toBe(0.999);
  });
  test("la similarità fra 1000 e 1000 è totale (1)", () => {
    expect(similarityIndex(1000, 1000)).toBe(1);
  });
  test("la similarità fra 500 e 250 è la metà (0.5)", () => {
    expect(similarityIndex(500, 250)).toBe(0.5);
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
