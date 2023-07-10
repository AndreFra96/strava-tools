import { Athlete, athleteSchema } from "./athlete";

import Joi from "joi";

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
export const sessionSchema = Joi.object({
  token_type: Joi.string().required(),
  expires_at: Joi.number().required(),
  expires_in: Joi.number().required(),
  refresh_token: Joi.string().required(),
  access_token: Joi.string().required(),
  athlete: athleteSchema.required(),
});

//Funzione che controlla se un oggetto è una sessione valida
//Dopo aver chiamato questa funzione passando una variabile, quella variabile sarà di tipo Session
export function isSession(session: any): session is Session {
  const result = sessionSchema.validate(session);
  if (result.error) {
    console.log(`Session is not valid: ${result.error}`, session);
    return false;
  }
  return true;
}
