import { LatLngSchema } from "./latLng";
import { MetaAthleteSchema } from "./metaAthlete";
import { PolylineMapSchema } from "./polylineMap";
import { SportTypeSchema } from "./sportType";
import { z } from "zod";
import validateZodModel from "./validateZodModel";

/**
 * 
 * @see https://developers.strava.com/docs/reference/#api-Activities-getActivityById
 */
export const ActivityAthleteSchema = z.object({
  id: z.coerce.bigint(),
  external_id: z.string(),
  upload_id: z.coerce.bigint(),
  athlete: MetaAthleteSchema,
  name: z.string(),
  distance: z.number(),
  moving_time: z.number(),
  elapsed_time: z.number(),
  total_elevation_gain: z.number(),
  elev_high: z.number(),
  elev_low: z.number(),
  type: SportTypeSchema,
  sport_type: SportTypeSchema,
  start_date: z.string().datetime(),
  timezone: z.string(),
  start_latlng: LatLngSchema,
  end_latlng: LatLngSchema,
  achievement_count: z.number(),
  kudos_count: z.number(),
  comment_count: z.number(),
  athlete_count: z.number(),
  photo_count: z.number(),
  total_photo_count: z.number(),
  map: PolylineMapSchema,
  trainer: z.boolean(),
  commute: z.boolean(),
  manual: z.boolean(),
  private: z.boolean(),
  flagged: z.boolean(),
  workout_type: z.number().nullable(),
  upload_id_str: z.string(),
  average_speed: z.number(),
  max_speed: z.number(),
  has_kudoed: z.boolean(),
  hide_from_home: z.boolean().optional(),
  gear_id: z.string().nullable(),
  kilojoules: z.number().optional(),
  average_watts: z.number().optional(),
  device_watts: z.boolean().optional(),
  max_watts: z.number().optional(),
  weighted_average_watts: z.number().optional(),
  resource_state: z.number(),
  start_date_local: z.string().datetime(),
});

export type AthleteActivity = z.infer<typeof ActivityAthleteSchema>;

export function isAthleteActivity(athleteActivity: any): athleteActivity is AthleteActivity {
  return validateZodModel<AthleteActivity>(athleteActivity, ActivityAthleteSchema);
}