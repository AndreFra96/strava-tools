import Joi from "joi";
import validateModel from "./validateModel";

enum Sport_Types {
    AlpineSki = "AlpineSki",
    BackcountrySki = "BackcountrySki",
    Badminton = "Badminton",
    Canoeing = "Canoeing",
    Crossfit = "Crossfit",
    EBikeRide = "EBikeRide",
    Elliptical = "Elliptical",
    EMountainBikeRide = "EMountainBikeRide",
    Golf = "Golf",
    GravelRide = "GravelRide",
    Handcycle = "Handcycle",
    HighIntensityIntervalTraining = "HighIntensityIntervalTraining",
    Hike = "Hike",
    IceSkate = "IceSkate",
    InlineSkate = "InlineSkate",
    Kayaking = "Kayaking",
    Kitesurf = "Kitesurf",
    MountainBikeRide = "MountainBikeRide",
    NordicSki = "NordicSki",
    Pickleball = "Pickleball",
    Pilates = "Pilates",
    Racquetball = "Racquetball",
    Ride = "Ride",
    RockClimbing = "RockClimbing",
    RollerSki = "RollerSki",
    Rowing = "Rowing",
    Run = "Run",
    Sail = "Sail",
    Skateboard = "Skateboard",
    Snowboard = "Snowboard",
    Snowshoe = "Snowshoe",
    Soccer = "Soccer",
    Squash = "Squash",
    StairStepper = "StairStepper",
    StandUpPaddling = "StandUpPaddling",
    Surfing = "Surfing",
    Swim = "Swim",
    TableTennis = "TableTennis",
    Tennis = "Tennis",
    TrailRun = "TrailRun",
    Velomobile = "Velomobile",
    VirtualRide = "VirtualRide",
    VirtualRow = "VirtualRow",
    VirtualRun = "VirtualRun",
    Walk = "Walk",
    WeightTraining = "WeightTraining",
    Wheelchair = "Wheelchair",
    Windsurf = "Windsurf",
    Workout = "Workout",
    Yoga = "Yoga"
}

/**
 * I tipi di sport che un'attività può avere
 * @see https://developers.strava.com/docs/reference/#api-models-SportType
 */
export interface SportType {
    AlpineSki: Sport_Types.AlpineSki;
    BackcountrySki: Sport_Types.BackcountrySki;
    Badminton: Sport_Types.Badminton;
    Canoeing: Sport_Types.Canoeing;
    Crossfit: Sport_Types.Crossfit;
    EBikeRide: Sport_Types.EBikeRide;
    Elliptical: Sport_Types.Elliptical;
    EMountainBikeRide: Sport_Types.EMountainBikeRide;
    Golf: Sport_Types.Golf;
    GravelRide: Sport_Types.GravelRide;
    Handcycle: Sport_Types.Handcycle;
    HighIntensityIntervalTraining: Sport_Types.HighIntensityIntervalTraining;
    Hike: Sport_Types.Hike;
    IceSkate: Sport_Types.IceSkate;
    InlineSkate: Sport_Types.InlineSkate;
    Kayaking: Sport_Types.Kayaking;
    Kitesurf: Sport_Types.Kitesurf;
    MountainBikeRide: Sport_Types.MountainBikeRide;
    NordicSki: Sport_Types.NordicSki;
    Pickleball: Sport_Types.Pickleball;
    Pilates: Sport_Types.Pilates;
    Racquetball: Sport_Types.Racquetball;
    Ride: Sport_Types.Ride;
    RockClimbing: Sport_Types.RockClimbing;
    RollerSki: Sport_Types.RollerSki;
    Rowing: Sport_Types.Rowing;
    Run: Sport_Types.Run;
    Sail: Sport_Types.Sail;
    Skateboard: Sport_Types.Skateboard;
    Snowboard: Sport_Types.Snowboard;
    Snowshoe: Sport_Types.Snowshoe;
    Soccer: Sport_Types.Soccer;
    Squash: Sport_Types.Squash;
    StairStepper: Sport_Types.StairStepper;
    StandUpPaddling: Sport_Types.StandUpPaddling;
    Surfing: Sport_Types.Surfing;
    Swim: Sport_Types.Swim;
    TableTennis: Sport_Types.TableTennis;
    Tennis: Sport_Types.Tennis;
    TrailRun: Sport_Types.TrailRun;
    Velomobile: Sport_Types.Velomobile;
    VirtualRide: Sport_Types.VirtualRide;
    VirtualRow: Sport_Types.VirtualRow;
    VirtualRun: Sport_Types.VirtualRun;
    Walk: Sport_Types.Walk;
    WeightTraining: Sport_Types.WeightTraining;
    Wheelchair: Sport_Types.Wheelchair;
    Windsurf: Sport_Types.Windsurf;
    Workout: Sport_Types.Workout;
    Yoga: Sport_Types.Yoga;
}

export const sportTypeSchema = Joi.object<SportType>({
    AlpineSki: Joi.string().required(),
    BackcountrySki: Joi.string().required(),
    Badminton: Joi.string().required(),
    Canoeing: Joi.string().required(),
    Crossfit: Joi.string().required(),
    EBikeRide: Joi.string().required(),
    Elliptical: Joi.string().required(),
    EMountainBikeRide: Joi.string().required(),
    Golf: Joi.string().required(),
    GravelRide: Joi.string().required(),
    Handcycle: Joi.string().required(),
    HighIntensityIntervalTraining: Joi.string().required(),
    Hike: Joi.string().required(),
    IceSkate: Joi.string().required(),
    InlineSkate: Joi.string().required(),
    Kayaking: Joi.string().required(),
    Kitesurf: Joi.string().required(),
    MountainBikeRide: Joi.string().required(),
    NordicSki: Joi.string().required(),
    Pickleball: Joi.string().required(),
    Pilates: Joi.string().required(),
    Racquetball: Joi.string().required(),
    Ride: Joi.string().required(),
    RockClimbing: Joi.string().required(),
    RollerSki: Joi.string().required(),
    Rowing: Joi.string().required(),
    Run: Joi.string().required(),
    Sail: Joi.string().required(),
    Skateboard: Joi.string().required(),
    Snowboard: Joi.string().required(),
    Snowshoe: Joi.string().required(),
    Soccer: Joi.string().required(),
    Squash: Joi.string().required(),
    StairStepper: Joi.string().required(),
    StandUpPaddling: Joi.string().required(),
    Surfing: Joi.string().required(),
    Swim: Joi.string().required(),
    TableTennis: Joi.string().required(),
    Tennis: Joi.string().required(),
    TrailRun: Joi.string().required(),
    Velomobile: Joi.string().required(),
    VirtualRide: Joi.string().required(),
    VirtualRow: Joi.string().required(),
    VirtualRun: Joi.string().required(),
    Walk: Joi.string().required(),
    WeightTraining: Joi.string().required(),
    Wheelchair: Joi.string().required(),
    Windsurf: Joi.string().required(),
    Workout: Joi.string().required(),
    Yoga: Joi.string().required(),
});

export function isSportType(
    sportType: any
): sportType is SportType {
    return validateModel(sportType, sportTypeSchema);
}


//NOTE: rivedere assieme se va serve l'interface o meno
//NOTE: molto attenzione da rivedere assolutamente la validazione joi