import Joi from "joi";
import validateModel from "./validateModel";

/**
 * I tipi di sport che un'attività può avere
 * @see https://developers.strava.com/docs/reference/#api-models-SportType
 */
export enum SportType {
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
  Yoga = "Yoga",
}

export const sportTypeSchema = Joi.string()
  .allow(...Object.values(SportType))
  .required();

export function isSportType(sportType: any): sportType is SportType {
  return validateModel<SportType>(sportType, sportTypeSchema);
}