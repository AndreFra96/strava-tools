import Joi, { any } from "joi";
import { LatLng, LatLngSchema } from "./latLng";
import { MetaAthlete, MetaAthleteSchema } from "./metaAthlete";
import { PolylineMap, PolylineMapSchema } from "./polylineMap";
import { SportType, SportTypeSchema } from "./sportType";
import validateModel from "./validateModel";
import { z } from "zod";
import validateZodModel from "./validateZodModel";

/**
 * informazioni sulle attività di un atleta
 * @see https://developers.strava.com/docs/reference/#api-Activities-getLoggedInAthleteActivities
 */
// export interface AthleteActivity {
//   id: bigint;
//   external_id: string;
//   upload_id: bigint;
//   athlete: MetaAthlete;
//   name: string;
//   distance: number;
//   moving_time: number;
//   elapsed_time: number;
//   total_elevation_gain: number;
//   elev_high: number;
//   elev_low: number;
//   type: SportType;
//   sport_type: SportType;
//   start_date: Date;
//   timezone: string;
//   start_latlng: LatLng;
//   end_latlng: LatLng;
//   achievement_count: number;
//   kudos_count: number;
//   comment_count: number;
//   athlete_count: number;
//   photo_count: number;
//   total_photo_count: number;
//   map: PolylineMap;
//   trainer: boolean;
//   commute: boolean;
//   manual: boolean;
//   private: boolean;
//   flagged: boolean;
//   workout_type?: number;
//   upload_id_str: string;
//   average_speed: number;
//   max_speed: number;
//   has_kudoed: boolean;
//   hide_from_home?: boolean;
//   gear_id?: string;
//   kilojoules?: number;
//   average_watts?: number;
//   device_watts?: boolean;
//   max_watts?: number;
//   weighted_average_watts?: number;
//   resource_state: number;
//   start_date_local: Date;
// }

// export const activityAthleteSchema = Joi.object<AthleteActivity>({
//   id: Joi.number().required(),
//   external_id: Joi.string().required(),
//   upload_id: Joi.number().required(),
//   athlete: MetaAthleteSchema.required(),
//   name: Joi.string().required(),
//   distance: Joi.number().required(),
//   moving_time: Joi.number().required(),
//   elapsed_time: Joi.number().required(),
//   total_elevation_gain: Joi.number().required(),
//   elev_high: Joi.number().required(),
//   elev_low: Joi.number().required(),
//   type: sportTypeSchema.required(),
//   sport_type: sportTypeSchema.required(),
//   start_date: Joi.date().required(), //NOTE: dubbio su questo DATE
//   timezone: Joi.string().required(),
//   start_latlng: latLngSchema.required(),
//   end_latlng: latLngSchema.required(),
//   achievement_count: Joi.number().required(),
//   kudos_count: Joi.number().required(),
//   comment_count: Joi.number().required(),
//   athlete_count: Joi.number().required(),
//   photo_count: Joi.number().required(),
//   total_photo_count: Joi.number().required(),
//   map: polylineMapSchema.required(),
//   trainer: Joi.boolean().required(),
//   commute: Joi.boolean().required(),
//   manual: Joi.boolean().required(),
//   private: Joi.boolean().required(),
//   flagged: Joi.boolean().required(),
//   workout_type: Joi.number().allow(null),
//   upload_id_str: Joi.string().required(),
//   average_speed: Joi.number().required(),
//   max_speed: Joi.number().required(),
//   has_kudoed: Joi.boolean().required(),
//   hide_from_home: Joi.boolean(),
//   gear_id: Joi.string().required().allow(null),
//   kilojoules: Joi.number(),
//   average_watts: Joi.number(),
//   device_watts: Joi.boolean(),
//   max_watts: Joi.number(),
//   weighted_average_watts: Joi.number(),
//   resource_state: Joi.number().required(),
//   start_date_local: Joi.date().required(),
// });

// export function isAthleteActivity(
//   activityAthlete: any
// ): activityAthlete is AthleteActivity {
//   return validateModel<AthleteActivity>(activityAthlete, activityAthleteSchema);
// }



export const ActivityAthleteSchema = z.object({ //AthleteActivity
  id: z.number(), //z.coerce.bigint()
  external_id: z.string(),
  upload_id: z.number(), //z.coerce.bigint()
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
  workout_type: z.number(),
  upload_id_str: z.string(),
  average_speed: z.number(),
  max_speed: z.number(),
  has_kudoed: z.boolean(),
  hide_from_home: z.boolean(),
  gear_id: z.string(),
  kilojoules: z.number(),
  average_watts: z.number(),
  device_watts: z.boolean(),
  max_watts: z.number(),
  weighted_average_watts: z.number(),
  resource_state: z.number(),
  start_date_local: z.string().datetime(),
});

export type AthleteActivity = z.infer<typeof ActivityAthleteSchema>;


export function isAthleteActivity(athleteActivity: any): athleteActivity is AthleteActivity {
  return validateZodModel<AthleteActivity>(athleteActivity, ActivityAthleteSchema);
}