import Joi from "joi";
import validateModel from "./validateModel";
import { z } from "zod";
import validateZodModel from "./validateZodModel";

//Interfaccia che rappresenta l'atleta
// export interface Athlete {
//   id: number;
//   username?: string;
//   resource_state: number;
//   firstname: string;
//   lastname: string;
//   bio?: string;
//   city?: string;
//   state?: string;
//   country?: string;
//   sex?: string;
//   premium: boolean;
//   summit: boolean;
//   created_at: Date;
//   updated_at: Date;
//   badge_type_id: number;
//   weight?: number;
//   profile_medium: string;
//   profile: string;
//   friend?: any; //TODO: definire interfaccia
//   follower?: any; //TODO: definire interfaccia
// }

// //Schema utilizzato per validare l'atleta
// export const athleteSchema = Joi.object<Athlete>({
//   id: Joi.number().required(),
//   username: Joi.string().required().allow(null),
//   resource_state: Joi.number().required(),
//   firstname: Joi.string().required(),
//   lastname: Joi.string().required(),
//   bio: Joi.string().required().allow(null).allow(""),
//   city: Joi.string().required().allow(null),
//   state: Joi.string().required().allow(null),
//   country: Joi.string().required().allow(null),
//   sex: Joi.string().required().allow(null),
//   premium: Joi.boolean().required(),
//   summit: Joi.boolean().required(),
//   created_at: Joi.date().required(),
//   updated_at: Joi.date().required(),
//   badge_type_id: Joi.number().required(),
//   weight: Joi.number().required().allow(null),
//   profile_medium: Joi.string().required(),
//   profile: Joi.string().required(),
//   friend: Joi.required().allow(null),
//   follower: Joi.required().allow(null),
// });

// //Funzione che controlla se un oggetto è un atleta valido
// export function isAthlete(athlete: any): athlete is Athlete {
//   return validateModel<Athlete>(athlete, athleteSchema);
// }

export const AthleteSchema = z.object({
  id: z.number(),
  username: z.string(),
  resource_state: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  bio: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  sex: z.string(),
  premium: z.boolean(),
  summit: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  badge_type_id: z.number(),
  weight: z.number(),
  profile_medium: z.string(),
  profile: z.string(),
  friend: z.any(), //TODO: definire interfaccia
  follower: z.any(),
});

export type Athlete = z.infer<typeof AthleteSchema>;

export function isAthlete(athlete: any): athlete is Athlete {
  return validateZodModel<Athlete>(athlete, AthleteSchema);
}