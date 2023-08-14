import { CompareStrategy } from "../comparator";
import { pathDistance } from "../utils";

export type Coordinate = [number, number] | [number, number, number];

//Algoritmo di confronto che confronta due tracciati GPX in base alla loro lunghezza
export class CompareByLength<T extends Coordinate[]>
  implements CompareStrategy<T>
{
  compare(a: T, b: T): number {
    const distanceA = pathDistance(a);
    const distanceB = pathDistance(b);

    return similarityIndex(distanceA, distanceB);
  }
}

//Calcola l'indice di somiglianza tra due numeri, 1 se sono uguali, 0 se sono diversi
export function similarityIndex(a: number, b: number): number {
  if (a == 0 && b == 0) return 1;
  return 1 - Math.abs(a - b) / Math.max(a, b);
}
