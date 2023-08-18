import { z } from "zod";
import validateZodModel from "./validateZodModel";

/**
 *
 * @see https://developers.strava.com/docs/reference/#api-models-PolylineMap
 */
export const PolylineMapSchema = z.object({
    id: z.string(),
    summary_polyline: z.string(),
    resource_state: z.number(),
});

export type PolylineMap = z.infer<typeof PolylineMapSchema>;

export function isPolylineMap(polylineMap: any): polylineMap is PolylineMap {
    return validateZodModel<PolylineMap>(polylineMap, PolylineMapSchema);
}