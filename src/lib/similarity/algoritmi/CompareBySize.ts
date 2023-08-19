//ESEMPIO SEMPLICE DI COMPARATORE

import { Comparator, CompareStrategy } from "../comparator";
import { similarityIndex } from "../utils";
import { CompareByAltitude } from "./CompareByAltitude";

class Animal {
  size: number;
  weight: number;

  constructor(size: number, weight: number) {
    this.size = size;
    this.weight = weight;
  }
}

class CompareBySize implements CompareStrategy<Animal> {
  compare(a: Animal, b: Animal): number {
    return similarityIndex(a.size, b.size);
  }
}

class CompareByWeight implements CompareStrategy<Animal> {
  compare(a: Animal, b: Animal): number {
    return similarityIndex(a.size, b.size);
  }
}

/*

//Array di comparatori fra animali
const animalComparators: Comparator<Animal>[] = [
  new Comparator(new CompareBySize()),
];
// Posso aggiungere un nuovo comparatore di animali
animalComparators.push(new Comparator(new CompareByWeight()))  //FUNZIONA CORRETTAMENTE!

// Ma non posso aggiungere un nuovo comparatore di altro tipo
animalComparators.push(new Comparator(new CompareByAltitude())) //ERRORE!

const animalA = new Animal(100, 10);
const animalB = new Animal(200, 20);

for (const comparator of animalComparators) {
  const similarity = comparator.compare(animalA, animalB);
  console.log(similarity);
}
 */
