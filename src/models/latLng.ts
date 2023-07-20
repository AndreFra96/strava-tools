import Joi from "joi";
import validateModel from "./validateModel";

/**
 * Coordinates rappresenta un'array con due numeri, dove il primo numero rappresenta
 * la latitudine e il secondo la longitudine
 * 
 * @see https://developers.strava.com/docs/reference/#api-models-LatLng
 */
export interface LatLng {
    latitude: number;
    longitude: number;
}

export const latLngSchema = Joi.object<LatLng>({
    latitude: Joi.number().required(),
    longitude: Joi.number().required,
});

export function isLatLngStats(
    latLng: any
): latLng is LatLng {
    return validateModel(latLng, latLngSchema);
}


//NOTE: eliminato il type coordinates e reso tutto più "snello"
//NOTE: aggiunto validation con JOI