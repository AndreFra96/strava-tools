import { z } from "zod";
import validateZodModel from "./validateZodModel";

/**
 * Dati sull'Atleta attualmente autenticato.
 * @see https://developers.strava.com/docs/reference/#api-Athletes-getLoggedInAthlete
 */
export const AthleteSchema = z.object({
  id: z.number(),
  username: z.string().nullable(),
  resource_state: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  bio: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  country: z.string().nullable(),
  sex: z.string().nullable(),
  premium: z.boolean(),
  summit: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  badge_type_id: z.number(),
  weight: z.number().nullable(),
  profile_medium: z.string(),
  profile: z.string(),
  friend: z.any().nullable(),
  follower: z.any().nullable(),
});

export type Athlete = z.infer<typeof AthleteSchema>;

export function isAthlete(athlete: any): athlete is Athlete {
  return validateZodModel<Athlete>(athlete, AthleteSchema);
}