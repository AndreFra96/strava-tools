import { AthleteSchema } from "./athlete";
import { z } from "zod";
import validateZodModel from "./validateZodModel";

export const SessionSchema = z.object({
  token_type: z.string(),
  expires_at: z.number(),
  expires_in: z.number(),
  refresh_token: z.string(),
  access_token: z.string(),
  athlete: AthleteSchema,
});

export type Session = z.infer<typeof SessionSchema>;

//Funzione che controlla se un oggetto è una sessione valida
//Se la variabile passata come parametro è una sessione valida la funzione restituisce true, false altrimenti.
//Inoltre la funzione aggiunge il tipo alla variabile in modo che typescript la riconosca come sessione
export function isSession(session: any): session is Session {
  return validateZodModel<Session>(session, SessionSchema);
}