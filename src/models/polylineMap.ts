import Joi from "joi";
import validateModel from "./validateModel";
import { z } from "zod";
import validateZodModel from "./validateZodModel";

/**
 *
 * @see https://developers.strava.com/docs/reference/#api-models-PolylineMap
 */
// export interface PolylineMap {
//     id: string;
//     //   polyline: string;
//     summary_polyline: string;
//     resource_state: number;
// }

// export const polylineMapSchema = Joi.object<PolylineMap>({
//     id: Joi.string().required(),
//     //   polyline: Joi.string().required(),
//     summary_polyline: Joi.string().required(),
//     resource_state: Joi.number().required(),
// });

// export function isPolylineMap(polylineMap: any): polylineMap is PolylineMap {
//     return validateModel<PolylineMap>(polylineMap, polylineMapSchema);
// }


export const PolylineMapSchema = z.object({
    id: z.number(),
    summary_polyline: z.string(),
    resource_state: z.number(),
});

export type PolylineMap = z.infer<typeof PolylineMapSchema>;

export function isPolylineMap(polylineMap: any): polylineMap is PolylineMap {
    return validateZodModel<PolylineMap>(polylineMap, PolylineMapSchema);
}