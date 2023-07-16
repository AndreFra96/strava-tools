import Joi from "joi";
import { ActivityTotal, activityTotalSchema } from "./activityTotal";
import validateModel from "./validateModel";

/**
 * Statistiche sulle attività di un atleta
 * @see https://developers.strava.com/docs/reference/#api-models-ActivityStats
 */
export interface ActivityStats {
  biggest_ride_distance: number;
  biggest_climb_elevation_gain: number;
  recent_ride_totals: ActivityTotal;
  recent_run_totals: ActivityTotal;
  recent_swim_totals: ActivityTotal;
  ytd_ride_totals: ActivityTotal;
  ytd_run_totals: ActivityTotal;
  ytd_swim_totals: ActivityTotal;
  all_ride_totals: ActivityTotal;
  all_run_totals: ActivityTotal;
  all_swim_totals: ActivityTotal;
}

export const activityStatsSchema = Joi.object<ActivityStats>({
  biggest_ride_distance: Joi.number().required(),
  biggest_climb_elevation_gain: Joi.number().required(),
  recent_ride_totals: activityTotalSchema.required(),
  recent_run_totals: activityTotalSchema.required(),
  recent_swim_totals: activityTotalSchema.required(),
  ytd_ride_totals: activityTotalSchema.required(),
  ytd_run_totals: activityTotalSchema.required(),
  ytd_swim_totals: activityTotalSchema.required(),
  all_ride_totals: activityTotalSchema.required(),
  all_run_totals: activityTotalSchema.required(),
  all_swim_totals: activityTotalSchema.required(),
});

export function isActivityStats(
  activityStats: any
): activityStats is ActivityStats {
  return validateModel(activityStats, activityStatsSchema);
}
