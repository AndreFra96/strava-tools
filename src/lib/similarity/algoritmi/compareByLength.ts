import { CompareStrategy } from "../comparator";
import { pathDistance } from "../utils";

//Algoritmo di confronto che confronta due tracciati GPX in base alla loro lunghezza
export class CompareByLength<T extends GeoJSON.Feature<GeoJSON.LineString>>
  implements CompareStrategy<T>
{
  compare(a: T, b: T): number {
    const distanceA = pathDistance(a.geometry.coordinates);
    const distanceB = pathDistance(b.geometry.coordinates);

    return Math.abs(distanceA - distanceB);
  }
}
