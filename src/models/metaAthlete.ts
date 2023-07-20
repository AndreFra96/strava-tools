import Joi from "joi";
import validateModel from "./validateModel";

/**
 *
 * @see https://developers.strava.com/docs/reference/#api-models-MetaAthlete
 */
export interface MetaAthlete {
  id: bigint;
  resource_state: number;
}

export const metaAthleteSchema = Joi.object<MetaAthlete>({
  id: Joi.number().required(),
  resource_state: Joi.number().required(),
});

export function isMetaAthlete(metaAthlete: any): metaAthlete is MetaAthlete {
  return validateModel(metaAthlete, metaAthleteSchema);
}

//NOTE: aggiunto validazione con JOI, note da integrare nei commit
