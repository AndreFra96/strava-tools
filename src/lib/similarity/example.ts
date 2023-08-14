import path from "path";
import { Comparator } from "./comparator";
import { isLineString, loadGPXasGeoJSON } from "./utils";
import { CompareByLength } from "./algoritmi/compareByLength";

//Esempio di utilizzo
export async function esempioDiUtilizzo() {
  //Creo il comparatore
  const lengthGpxComparator = new Comparator(new CompareByLength());

  //Carico due file GPX
  const firstFile = await loadGPXasGeoJSON(
    path.join(process.cwd(), "/src/lib/similarity/esempi/Afternoon_Ride.gpx")
  );
  const secondFile = await loadGPXasGeoJSON(
    path.join(process.cwd(), "/src/lib/similarity/esempi/Ciclismo_Notturno.gpx")
  );

  //Controllo che fra le informazioni ci siano i tracciati
  if (firstFile.features.length < 0 || secondFile.features.length < 0) {
    console.log("Non ci sono tracciati da confrontare");
    return;
  }

  //Utilizzo la prima feature di ogni file, che nel formato fornito
  // da strava contiene le coordinate
  //TODO: migliorare
  const firstFeature = firstFile.features[0];
  const secondFeature = secondFile.features[0];

  //Controllo che le feature estratte siano quelle contententi le coordinate
  if (!isLineString(firstFeature) || !isLineString(secondFeature)) {
    console.log("La feature estratta non contiene le coordinate GPX");
    return;
  }

  //Utilizzo il comparatore per confrontare i due tracciati
  const result = lengthGpxComparator.compare(firstFeature, secondFeature);
  return result;
}
