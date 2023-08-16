import Joi from "joi";
import validateModel from "./validateModel";
import { z } from "zod";
import validateZodModel from "./validateZodModel";

/**
 *
 * @see https://developers.strava.com/docs/reference/#api-models-MetaAthlete
 */
// export interface MetaAthlete {
//     id: bigint;
//     resource_state: number;
// }

// export const metaAthleteSchema = Joi.object<MetaAthlete>({
//     id: Joi.number().required(),
//     resource_state: Joi.number().required(),
// });

// export function isMetaAthlete(metaAthlete: any): metaAthlete is MetaAthlete {
//     return validateModel<MetaAthlete>(metaAthlete, metaAthleteSchema);
// }

export const MetaAthleteSchema = z.object({
    id: z.number(),
    resource_state: z.number(),
});

export type MetaAthlete = z.infer<typeof MetaAthleteSchema>;

export function isMetaAthlete(metaAthlete: any): metaAthlete is MetaAthlete {
    return validateZodModel<MetaAthlete>(metaAthlete, MetaAthleteSchema);
}