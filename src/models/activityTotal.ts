import Joi from "joi";
import validateModel from "./validateModel";

/**
 * Statistiche sulle attività di una specifica categoria
 * @see https://developers.strava.com/docs/reference/#api-models-ActivityTotal
 */
export interface ActivityTotal {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
  achievement_count?: number;
}

export const activityTotalSchema = Joi.object<ActivityTotal>({
  count: Joi.number().required(),
  distance: Joi.number().required(),
  moving_time: Joi.number().required(),
  elapsed_time: Joi.number().required(),
  elevation_gain: Joi.number().required(),
  achievement_count: Joi.number(),
});

export function isActivityTotal(
  activityTotal: any
): activityTotal is ActivityTotal {
  return validateModel(activityTotal, activityTotalSchema);
}
