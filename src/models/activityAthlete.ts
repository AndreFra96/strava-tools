import { LatLng } from "./latLng";
import { MetaAthlete } from "./metaAthlete";
import { PolylineMap } from "./polylineMap";
import { SportType } from "./sportType";

export interface ActivityAthlete {
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