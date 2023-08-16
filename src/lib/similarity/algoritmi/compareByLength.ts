import { CompareStrategy } from "../comparator";
import { pathDistance, similarityIndex } from "../utils";

//Algoritmo di confronto che confronta due tracciati GPX in base alla loro lunghezza
export class CompareByLength<T extends GeoJSON.Position[]>
  implements CompareStrategy<T>
{
  compare(a: T, b: T): number {
    const distanceA = pathDistance(a);
    const distanceB = pathDistance(b);

    return similarityIndex(distanceA, distanceB);
  }
}
