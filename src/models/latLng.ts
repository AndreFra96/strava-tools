import { z } from "zod";
import validateZodModel from "./validateZodModel";

/**
 * Coordinate attività
 * @see https://developers.strava.com/docs/reference/#api-models-LatLng
 */
export const LatLngSchema = z.number().array().length(2); // must contain 2 items exactly

export type LatLng = z.infer<typeof LatLngSchema>;

export function isLatLng(latLng: any): latLng is LatLng {
    return validateZodModel<LatLng>(latLng, LatLngSchema);
}