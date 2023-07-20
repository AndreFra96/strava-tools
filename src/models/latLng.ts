import Joi from "joi";
import validateModel from "./validateModel";

/**
 * Coordinates rappresenta un'array con due numeri, dove il primo numero rappresenta
 * la latitudine e il secondo la longitudine
 *
 * @see https://developers.strava.com/docs/reference/#api-models-LatLng
 */

export type LatLng = [number, number];

export const latLngSchema = Joi.array()
    .items(Joi.number())
    .length(2)
    .required();

export function isLatLng(latLng: any): latLng is LatLng {
    return validateModel<LatLng>(latLng, latLngSchema);
}