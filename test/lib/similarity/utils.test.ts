import {
  similarityIndex,
  pathDistance,
  coordinatesDistance,
  positiveElevationGain,
} from "../../../src/lib/similarity/utils";
import { describe, test, expect } from "vitest";

describe("pathDistance test suite", () => {
  type TestInput = { input: [number, number][]; output: number };

  const tests: TestInput[] = [
    {
      input: [
        [0, 0],
        [0, 0],
      ],
      output: 0,
    },
    {
      input: [
        [0, 0],
        [0, 0],
      ],
      output: 0,
    },
    {
      input: [
        [45.45079, 9.212707],
        [45.447689, 9.210175],
      ],
      output: 442.2174198211073,
    },
  ];

  test.each(tests)(
    `expect pathDistance on $input to be $output`,
    ({ input, output }) => {
      expect(pathDistance(input)).toBe(output);
    }
  );
});

describe("positiveElevationGain test suite", () => {
  type TestInput = { input: [number, number, number][]; output: number };

  const tests: TestInput[] = [
    {
      input: [
        [0, 0, -10],
        [0, 0, 10],
      ],
      output: 20,
    },
    {
      input: [],
      output: 0,
    },
    {
      input: [
        [0, 0, 0],
        [0, 0, 0],
      ],
      output: 0,
    },
    {
      input: [
        [0, 0, 0],
        [0, 0, 100],
      ],
      output: 100,
    },
    {
      input: [
        [0, 0, 0],
        [0, 0, 20],
        [0, 0, 10],
        [0, 0, 100],
      ],
      output: 110,
    },
  ];

  test.each(tests)(
    `expect positiveElevationGain on $input to be $output`,
    ({ input, output }) => {
      expect(positiveElevationGain(input)).toBe(output);
    }
  );
});

describe("coordinatesDistance test suite", () => {
  type TestInput = { a: [number, number]; b: [number, number]; output: number };

  const tests: TestInput[] = [
    {
      a: [0, 0],
      b: [0, 0],
      output: 0,
    },
    {
      a: [45.45079, 9.212707],
      b: [45.447689, 9.210175],
      output: 442.2174198211073,
    },
  ];

  test.each(tests)(
    `expect coordinatesDistance between $a and $b to be $output`,
    ({ a, b, output }) => {
      expect(coordinatesDistance(a, b)).toBe(output);
    }
  );
});

describe("similarityIndex test suite", () => {
  type TestInput = { a: number; b: number; output: number };

  const tests: TestInput[] = [
    {
      a: 1,
      b: 1,
      output: 1,
    },
    {
      a: 0,
      b: 0,
      output: 1,
    },
    {
      a: 1,
      b: 0,
      output: 0,
    },
    {
      a: 10,
      b: 5,
      output: 0.5,
    },
    {
      a: 1000,
      b: 250,
      output: 0.25,
    },
    {
      a: 452,
      b: 452,
      output: 1,
    },
    {
      a: 500,
      b: 250,
      output: 0.5,
    },
  ];

  test.each(tests)(
    "expect similarityIndex between $a and $b to be $output",
    ({ a, b, output }) => {
      expect(similarityIndex(a, b)).toBe(output);
    }
  );

  test("la similarità fra 1000 e 250 è uguale a quella fra 250 e 1000", () => {
    expect(similarityIndex(1000, 250)).toBe(similarityIndex(250, 1000));
  });

  test("la similarità fra 200 e 199 è quasi totale (>0.99)", () => {
    expect(similarityIndex(200, 199)).toBeGreaterThan(0.99);
  });

  test("expect to return NaN if anything else then number is passed", () => {
    const response = similarityIndex("A" as any, 2);
    expect(response).toBeNaN();
  });
});
