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

    return Math.abs(distanceA - distanceB);
  }
}
