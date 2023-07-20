import { Athlete, athleteSchema } from "./athlete";

import Joi from "joi";
import validateModel from "./validateModel";

//Interfaccia che rappresenta la sessione
export interface Session {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: Athlete;
}

//Schema utilizzato per validare la sessione
export const sessionSchema = Joi.object<Session>({
  token_type: Joi.string().required(),
  expires_at: Joi.number().required(),
  expires_in: Joi.number().required(),
  refresh_token: Joi.string().required(),
  access_token: Joi.string().required(),
  athlete: athleteSchema.required(),
});

//Funzione che controlla se un oggetto è una sessione valida
//Se la variabile passata come parametro è una sessione valida la funzione restituisce true, false altrimenti.
//Inoltre la funzione aggiunge il tipo alla variabile in modo che typescript la riconosca come sessione
export function isSession(session: any): session is Session {
  return validateModel<Session>(session, sessionSchema);
}
