import { CompareStrategy } from "../comparator";
import { positiveElevationGain, similarityIndex } from "../utils";

//Algoritmo di confronto che confronta due tracciati GPX in base al dislivello positivo effettuato
export class CompareByAltitude<T extends [number, number, number][]>
  implements CompareStrategy<T>
{
  compare(a: T, b: T): number {
    const altitudeA = positiveElevationGain(a);
    const altitudeB = positiveElevationGain(b);

    return similarityIndex(altitudeA, altitudeB);
  }
}
