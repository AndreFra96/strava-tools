import { z } from "zod";
import validateZodModel from "./validateZodModel";

/**
 *
 * @see https://developers.strava.com/docs/reference/#api-models-MetaAthlete
 */
export const MetaAthleteSchema = z.object({
    id: z.number(),
    resource_state: z.number(),
});

export type MetaAthlete = z.infer<typeof MetaAthleteSchema>;

export function isMetaAthlete(metaAthlete: any): metaAthlete is MetaAthlete {
    return validateZodModel<MetaAthlete>(metaAthlete, MetaAthleteSchema);
}