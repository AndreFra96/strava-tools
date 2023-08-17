//ESEMPIO SEMPLICE DI COMPARATORE

import { Comparator, CompareStrategy } from "../comparator";
import { similarityIndex } from "../utils";

class Animal {
  size: number;

  constructor(size: number) {
    this.size = size;
  }
}

class CompareBySize implements CompareStrategy<Animal> {
  compare(a: Animal, b: Animal): number {
    return similarityIndex(a.size, b.size);
  }
}

// const animaleSizeComparator = new Comparator(new CompareBySize());
// const animalA = new Animal(100);
// const animalB = new Animal(200);
// const similarity = animaleSizeComparator.compare(animalA, animalB);
