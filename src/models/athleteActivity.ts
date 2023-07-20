import Joi, { any } from "joi";
import { LatLng, latLngSchema } from "./latLng";
import { MetaAthlete, metaAthleteSchema } from "./metaAthlete";
import { PolylineMap, polylineMapSchema } from "./polylineMap";
import { SportType, sportTypeSchema } from "./sportType";
import validateModel from "./validateModel";

/**
 * informazioni sulle attività di un atleta
 * @see https://developers.strava.com/docs/reference/#api-Activities-getLoggedInAthleteActivities
 */
export interface AthleteActivity { //DONE: usare lo stesso di strava che mi sembra sia 'AthleteActivity' anzi che 'ActivityAthlete'(controllare)
    id: bigint;
    external_id: string;
    upload_id: bigint;
    athlete: MetaAthlete;
    name: string;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    total_elevation_gain: number;
    elev_high: number;
    elev_low: number;
    type: SportType;
    sport_type: SportType;
    start_date: Date;
    timezone: string;
    start_latlng: LatLng;
    end_latlng: LatLng;
    achievement_count: number;
    kudos_count: number;
    comments_count: number;
    athlete_count: number;
    photo_count: number;
    total_photo_count: number;
    map: PolylineMap;
    trainer: boolean;
    commute: boolean;
    manual: boolean;
    private: boolean;
    flaggged: boolean;
    workout_type: number;
    upload_id_str: string;
    average_speed: number;
    max_speed: number;
    has_kudoed: boolean;
    hide_from_home: boolean;
    gear_id: string;
    kilojoules: number;
    average_watts: number;
    device_watts: number;
    max_watts: number;
    weighted_average_watts: number;

}

export const activityAthleteSchema = Joi.object<AthleteActivity>({
    id: Joi.number().required(),
    external_id: Joi.string().required(),
    upload_id: Joi.number().required(),
    athlete: metaAthleteSchema.required(),
    name: Joi.string().required(),
    distance: Joi.number().required(),
    moving_time: Joi.number().required(),
    elapsed_time: Joi.number().required(),
    total_elevation_gain: Joi.number().required(),
    elev_high: Joi.number().required(),
    elev_low: Joi.number().required(),
    type: sportTypeSchema.required(),
    sport_type: sportTypeSchema.required(),
    start_date: Joi.number().required(),//NOTE: dubbio su questo DATE
    timezone: Joi.number().required(),
    start_latlng: latLngSchema.required(),
    end_latlng: latLngSchema.required(),
    achievement_count: Joi.number().required(),
    kudos_count: Joi.number().required(),
    comments_count: Joi.number().required(),
    athlete_count: Joi.number().required(),
    photo_count: Joi.number().required(),
    total_photo_count: Joi.number().required(),
    map: polylineMapSchema.required(),
    trainer: Joi.boolean().required(),
    commute: Joi.boolean().required(),
    manual: Joi.boolean().required(),
    private: Joi.boolean().required(),
    flaggged: Joi.boolean().required(),
    workout_type: Joi.number().required(),
    upload_id_str: Joi.string().required,
    average_speed: Joi.number().required(),
    max_speed: Joi.number().required(),
    has_kudoed: Joi.boolean().required(),
    hide_from_home: Joi.boolean().required(),
    gear_id: Joi.string().required,
    kilojoules: Joi.number().required(),
    average_watts: Joi.number().required(),
    device_watts: Joi.number().required(),
    max_watts: Joi.number().required(),
    weighted_average_watts: Joi.number().required(),
});

export function isActivityStats(
    activityAthlete: any
): activityAthlete is AthleteActivity {
    return validateModel(activityAthlete, activityAthleteSchema);
}
