import z from "zod";
import validateZodModel from "./validateZodModel";

/**
 * Statistiche sulle attività di una specifica categoria
 * @see https://developers.strava.com/docs/reference/#api-models-ActivityTotal
 */
export const ActivityTotalSchema = z.object({
  count: z.number(),
  distance: z.number(),
  moving_time: z.number(),
  elapsed_time: z.number(),
  elevation_gain: z.number(),
  achievement_count: z.number().optional(),
});

export type ActivityTotal = z.infer<typeof ActivityTotalSchema>;

export function isActivityTotal(
  activityTotal: any
): activityTotal is ActivityTotal {
  return validateZodModel<ActivityTotal>(activityTotal, ActivityTotalSchema);
}
