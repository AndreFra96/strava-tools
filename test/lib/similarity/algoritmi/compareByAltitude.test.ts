import { CompareByAltitude } from "../../../../src/lib/similarity/algoritmi/CompareByAltitude";
import { Comparator } from "../../../../src/lib/similarity/comparator";
import { describe, test, expect } from "vitest";

describe("compareByAltiture test suite", () => {
  const comparator = new Comparator(new CompareByAltitude());

  type TestInput = {
    a: [number, number, number][];
    b: [number, number, number][];
    output: number;
  };

  const tests: TestInput[] = [
    {
      a: [
        [0, 0, 0],
        [0, 0, 0],
      ],
      b: [[0, 0, 0]],
      output: 1,
    },
    {
      a: [
        [0, 0, 0],
        [0, 0, 100],
      ],
      b: [
        [0, 0, 0],
        [0, 0, 50],
        [0, 0, 90],
      ],
      output: 0.9,
    },
  ];

  test.each(tests)(
    `expect compareByAltiture between $a and $b to be $output`,
    ({ a, b, output }) => {
      expect(comparator.compare(a, b)).toBe(output);
    }
  );
});
