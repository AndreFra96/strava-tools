import { CompareStrategy } from "../comparator";
import { positiveElevationGain, similarityIndex } from "../utils";

//Algoritmo di confronto che confronta due tracciati GPX in base al dislivello positivo effettuato
export class CompareByAltitude
  implements CompareStrategy<[number, number, number][]>
{
  compare(
    a: [number, number, number][],
    b: [number, number, number][]
  ): number {
    const altitudeA = positiveElevationGain(a);
    const altitudeB = positiveElevationGain(b);

    return similarityIndex(altitudeA, altitudeB);
  }
}
