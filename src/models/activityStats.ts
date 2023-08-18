import { ActivityTotalSchema } from "./activityTotal";
import z from "zod";
import validateZodModel from "./validateZodModel";

/**
 * Statistiche sulle attività di un atleta
 * @see https://developers.strava.com/docs/reference/#api-models-ActivityStats
 */
export const ActivityStatsSchema = z.object({
  biggest_ride_distance: z.number(),
  biggest_climb_elevation_gain: z.number(),
  recent_ride_totals: ActivityTotalSchema,
  recent_run_totals: ActivityTotalSchema,
  recent_swim_totals: ActivityTotalSchema,
  ytd_ride_totals: ActivityTotalSchema,
  ytd_run_totals: ActivityTotalSchema,
  ytd_swim_totals: ActivityTotalSchema,
  all_ride_totals: ActivityTotalSchema,
  all_run_totals: ActivityTotalSchema,
  all_swim_totals: ActivityTotalSchema,
});

export type ActivityStats = z.infer<typeof ActivityStatsSchema>;

export function isActivityStats(
  activityStats: any
): activityStats is ActivityStats {
  return validateZodModel<ActivityStats>(activityStats, ActivityStatsSchema);
}
