import { CompareByAltitude } from "@/lib/similarity/algoritmi/CompareByAltitude";
import { CompareByLength } from "@/lib/similarity/algoritmi/CompareByLength";
import { Comparator } from "@/lib/similarity/comparator";
import {
  loadGPXasGeoJSON,
  loadStravaGPXasGeoJSON,
  pathDistance,
  positiveElevationGain,
} from "@/lib/similarity/utils";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(request: NextRequest) {
  const firstFile = await loadStravaGPXasGeoJSON(
    path.join(
      process.cwd(),
      "src",
      "lib",
      "similarity",
      "esempi",
      "casa-lavoro",
      "primo.gpx"
    )
  );

  const secondFile = await loadStravaGPXasGeoJSON(
    path.join(
      process.cwd(),
      "src",
      "lib",
      "similarity",
      "esempi",
      "casa-lavoro",
      "secondo.gpx"
    )
  );

  const distance1 = pathDistance(firstFile.features[0].geometry.coordinates);
  const distance2 = pathDistance(secondFile.features[0].geometry.coordinates);

  const elevationGain1 = positiveElevationGain(
    firstFile.features[0].geometry.coordinates
  );
  const elevationGain2 = positiveElevationGain(
    secondFile.features[0].geometry.coordinates
  );

  const lengthComparator = new Comparator(new CompareByLength());
  const altitudeComparator = new Comparator(new CompareByAltitude());

  return NextResponse.json({
    distance: [distance1, distance2],
    elevation: [elevationGain1, elevationGain2],
    similarity: {
      length: lengthComparator.compare(
        firstFile.features[0].geometry.coordinates,
        secondFile.features[0].geometry.coordinates
      ),
      altitude: altitudeComparator.compare(
        firstFile.features[0].geometry.coordinates,
        secondFile.features[0].geometry.coordinates
      ),
    },
  });
}
