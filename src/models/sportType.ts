import { z } from "zod";
import validateZodModel from "./validateZodModel";

/**
 * Un'enumerazione dei tipi di sport che un'attività può avere. Distinto da ActivityType in quanto ha nuovi tipi (ad esempio MountainBikeRide)
 * @see https://developers.strava.com/docs/reference/#api-models-SportType
 */
export const SportTypeSchema = z.enum([
  "AlpineSki",
  "BackcountrySki",
  "Badminton",
  "Canoeing",
  "Crossfit",
  "EBikeRide",
  "Elliptical",
  "EMountainBikeRide",
  "Golf",
  "GravelRide",
  "Handcycle",
  "HighIntensityIntervalTraining",
  "Hike",
  "IceSkate",
  "InlineSkate",
  "Kayaking",
  "Kitesurf",
  "MountainBikeRide",
  "NordicSki",
  "Pickleball",
  "Pilates",
  "Racquetball",
  "Ride",
  "RockClimbing",
  "RollerSki",
  "Rowing",
  "Run",
  "Sail",
  "Skateboard",
  "Snowboard",
  "Snowshoe",
  "Soccer",
  "Squash",
  "StairStepper",
  "StandUpPaddling",
  "Surfing",
  "Swim",
  "TableTennis",
  "Tennis",
  "TrailRun",
  "Velomobile",
  "VirtualRide",
  "VirtualRow",
  "VirtualRun",
  "Walk",
  "WeightTraining",
  "Wheelchair",
  "Windsurf",
  "Workout",
  "Yoga",
]);

export type SportType = z.infer<typeof SportTypeSchema>

export function isSportType(sportType: any): sportType is typeof SportTypeSchema {
  return validateZodModel<SportType>(sportType, SportTypeSchema);
}