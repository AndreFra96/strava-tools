import { z } from "zod";
import validateZodModel from "./validateZodModel";

const ResolutionSchema = z.enum(["low", "medium", "high"] as const);
const SeriesTypeSchema = z.enum(["distance", "time"] as const);

//Ogni attività ha diversi tipi di stream (es. latlong, altitude, ecc.)
//ogni stream è fatto nello stesso modo, l'unica differenza è per lo stream latlong dove il campo 'data'
//è un array di array di numeri mentre per gli altri è un array di numeri
//Per questo motivo ho creato la funzione getStreamModel che mi restituisce il modello di uno stream
//impostando tipo del campo 'data' in base al parametro dataSchema
const getStreamModel = <T extends Zod.ZodSchema>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    original_size: z.number(),
    resolution: ResolutionSchema,
    series_type: SeriesTypeSchema,
  });

const ArraySchema = z.array(z.number());
const ArrayOfArraySchema = z.array(z.array(z.number()).length(2));

const ActivityStreamSchema = z.object({
  distance: getStreamModel(ArraySchema),
  time: getStreamModel(ArraySchema).optional(),
  latlng: getStreamModel(ArrayOfArraySchema).optional(),
  altitude: getStreamModel(ArraySchema).optional(),
  velocity_smooth: getStreamModel(ArraySchema).optional(),
  heartrate: getStreamModel(ArraySchema).optional(),
  cadence: getStreamModel(ArraySchema).optional(),
  moving: getStreamModel(ArraySchema).optional(),
  temp: getStreamModel(ArraySchema).optional(),
  watts: getStreamModel(ArraySchema).optional(),
  grade_smooth: getStreamModel(ArraySchema).optional(),
});

export type ActivityStream = z.infer<typeof ActivityStreamSchema>;

export function isActivityStream(
  activityStream: any
): activityStream is ActivityStream {
  return validateZodModel<ActivityStream>(activityStream, ActivityStreamSchema);
}
