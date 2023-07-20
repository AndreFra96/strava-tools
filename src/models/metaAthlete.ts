import Joi from "joi";
import validateModel from "./validateModel";

/**
 * 
 * @see https://developers.strava.com/docs/reference/#api-models-MetaAthlete
 */
export interface MetaAthlete {
    id: bigint;
}


export const metaAthleteSchema = Joi.object<MetaAthlete>({
    id: Joi.number().required()
});

export function isMetaAthleteTotal(
    metaAthlete: any
): metaAthlete is MetaAthlete {
    return validateModel(metaAthlete, metaAthleteSchema);
}


  //NOTE: aggiunto validazione con JOI, note da integrare nei commit