//Questa potrebbe essere una possibile implementazione OOP del problema

/**
 * GEOJSON
 *
 * GeoJSON è un formato per rappresentare dati geografici in formato JSON, in particolare tracciati GPX.
 *
 * E' composto da una serie di tipi di dati:
 * - Point
 * - LineString (quello che ci interessa)
 * - Polygon
 * - MultiPoint
 * - MultiLineString
 * - MultiPolygon
 * - GeometryCollection
 * - Feature
 * - FeatureCollection
 *
 * Per maggiori informazioni: https://geojson.org/
 *
 * PERCHE' GEOJSON?
 *
 * Piuttosto che utilizzare il formato gpx che in typescript non è supportato nativamente,
 * utilizziamo GeoJSON che invece lo è! In questo modo sarà molto più semplice lavorare con i dati.
 * Ci sono diverse librerie che permettono di convertire da gpx a GeoJSON.
 *
 */

/**
 *
 * PATTERN STRATEGY
 *
 * Utiliziamo il pattern strategy per definire vari algoritmi di confronto.
 *
 * Il pattern strategy permette di definire una famiglia di algoritmi, incapsularli e
 * renderli intercambiabili.
 * In questo caso, vogliamo creare una serie di algoritmi di confronto fra due tracciati GPX
 * per poterli utilizzare in modo intercambiabile.
 *
 * Il pattern strategy è composto da tre parti:
 * 1) Un'interfaccia che definisce l'intestazione che devono avere gli algoritmi (in questo caso la classe CompareStrategy)
 * 2) Una serie di classi che implementano l'interfaccia degli algoritmi (in questo caso CompareByLength)
 * 3) Una classe che utilizza gli algoritmi (in questo caso GpxComparator)
 */

//Ogni algoritmo di confronto deve implementare questa interfaccia
export interface CompareStrategy<T> {
  /**
   * Restituisce l'indice di similarità fra due elementi, 1 se sono uguali, 0 se sono completamente diversi
   **/
  compare(a: T, b: T): number;
}

//Classe comparatore che prende una strategia di confronto e la utilizza
export class Comparator<T> {
  private strategy: CompareStrategy<T>;

  constructor(strategy: CompareStrategy<T>) {
    this.strategy = strategy;
  }

  /**
   * Restituisce l'indice di similarità fra due elementi, 1 se sono uguali, 0 se sono completamente diversi
   **/
  compare(a: T, b: T): number {
    return this.strategy.compare(a, b);
  }
}
