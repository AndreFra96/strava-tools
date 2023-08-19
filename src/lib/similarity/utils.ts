import { gpx } from "@tmcw/togeojson";
import { DOMParser } from "xmldom";
import fs from "fs";

export function loadGPXasGeoJSON(
  path: fs.PathOrFileDescriptor
): Promise<GeoJSON.FeatureCollection> {
  return new Promise<GeoJSON.FeatureCollection>((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const parser = new DOMParser();
      const document = parser.parseFromString(data.toString());
      const geoJSON: GeoJSON.FeatureCollection = gpx(document);
      resolve(geoJSON);
    });
  });
}

type StravaGPX = GeoJSON.FeatureCollection & {
  features: [
    {
      type: "Feature";
      properties: {
        _gpxType: "trk";
        name: string;
        type: string;
        time: string;
      };
      geometry: {
        type: "LineString";
        coordinates: [number, number, number][];
      };
    },
    ...Array<{}>
  ];
};

export async function loadStravaGPXasGeoJSON(
  path: fs.PathOrFileDescriptor
): Promise<StravaGPX> {
  const geoJSON: GeoJSON.FeatureCollection = await loadGPXasGeoJSON(path);
  //TODO: controllare che rispetti il formato di Strava definito sopra
  return geoJSON as StravaGPX;
}

/**
 * Calcola la distanza in metri fra due coordinate geografiche.
 * Il calcolo è basato sulla formula di Haversine che considera
 * la sfericità della terra (https://en.wikipedia.org/wiki/Haversine_formula).
 */
export function coordinatesDistance(
  first: GeoJSON.Position,
  second: GeoJSON.Position
): number {
  var R = 6378.137; // Radius of earth in KM
  var dLat = (second[1] * Math.PI) / 180 - (first[1] * Math.PI) / 180;
  var dLon = (second[0] * Math.PI) / 180 - (first[0] * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((first[1] * Math.PI) / 180) *
      Math.cos((second[1] * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d * 1000; // meters
}

/**
 * Calcola la distanza totale di un percorso utilizzando un array di coordinate attraversate.
 */
export function pathDistance(coordinates: GeoJSON.Position[]): number {
  let totalDistance = 0;
  for (let i = 0; i < coordinates.length - 1; i++) {
    totalDistance += coordinatesDistance(coordinates[i], coordinates[i + 1]);
  }
  return totalDistance;
}

/**
 * Calcola il dislivello positivo di un percorso utilizzando un array di coordinate attraversate.
 */
export function positiveElevationGain(
  coordinates: [number, number, number][]
): number {
  let elevationGain = 0;
  for (let i = 0; i < coordinates.length - 1; i++) {
    if (coordinates[i + 1][2] > coordinates[i][2])
      elevationGain += coordinates[i + 1][2] - coordinates[i][2];
  }
  return elevationGain;
}

/**
 * Controlla che una feature sia di tipo LineString
 * @param feature Controlla che una feature sia di tipo LineString
 * @returns true se la feature è di tipo LineString, false altrimenti
 */
export function isLineString(
  feature: GeoJSON.Feature
): feature is GeoJSON.Feature<GeoJSON.LineString> {
  return feature.geometry.type === "LineString";
}

//Calcola l'indice di somiglianza tra due numeri, 1 se sono uguali, 0 se sono diversi
export function similarityIndex(a: number, b: number): number {
  if (a == 0 && b == 0) return 1;
  return 1 - Math.abs(a - b) / Math.max(a, b);
}
