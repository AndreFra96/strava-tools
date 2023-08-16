import Joi from "joi";
import validateModel from "./validateModel";
import { z } from "zod";
import validateZodModel from "./validateZodModel";

/**
 * I tipi di sport che un'attività può avere
 * @see https://developers.strava.com/docs/reference/#api-models-SportType
 */
// export enum SportType {
//   AlpineSki = "AlpineSki",
//   BackcountrySki = "BackcountrySki",
//   Badminton = "Badminton",
//   Canoeing = "Canoeing",
//   Crossfit = "Crossfit",
//   EBikeRide = "EBikeRide",
//   Elliptical = "Elliptical",
//   EMountainBikeRide = "EMountainBikeRide",
//   Golf = "Golf",
//   GravelRide = "GravelRide",
//   Handcycle = "Handcycle",
//   HighIntensityIntervalTraining = "HighIntensityIntervalTraining",
//   Hike = "Hike",
//   IceSkate = "IceSkate",
//   InlineSkate = "InlineSkate",
//   Kayaking = "Kayaking",
//   Kitesurf = "Kitesurf",
//   MountainBikeRide = "MountainBikeRide",
//   NordicSki = "NordicSki",
//   Pickleball = "Pickleball",
//   Pilates = "Pilates",
//   Racquetball = "Racquetball",
//   Ride = "Ride",
//   RockClimbing = "RockClimbing",
//   RollerSki = "RollerSki",
//   Rowing = "Rowing",
//   Run = "Run",
//   Sail = "Sail",
//   Skateboard = "Skateboard",
//   Snowboard = "Snowboard",
//   Snowshoe = "Snowshoe",
//   Soccer = "Soccer",
//   Squash = "Squash",
//   StairStepper = "StairStepper",
//   StandUpPaddling = "StandUpPaddling",
//   Surfing = "Surfing",
//   Swim = "Swim",
//   TableTennis = "TableTennis",
//   Tennis = "Tennis",
//   TrailRun = "TrailRun",
//   Velomobile = "Velomobile",
//   VirtualRide = "VirtualRide",
//   VirtualRow = "VirtualRow",
//   VirtualRun = "VirtualRun",
//   Walk = "Walk",
//   WeightTraining = "WeightTraining",
//   Wheelchair = "Wheelchair",
//   Windsurf = "Windsurf",
//   Workout = "Workout",
//   Yoga = "Yoga",
// }

// export const sportTypeSchema = Joi.string()
//   .allow(...Object.values(SportType))
//   .required();

// export function isSportType(sportType: any): sportType is SportType {
//   return validateModel<SportType>(sportType, sportTypeSchema);
// }


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