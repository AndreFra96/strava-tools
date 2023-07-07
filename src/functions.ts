import fs from "fs";
import { Decoder, Stream } from "./lib/garmin-fit-sdk/src";

async function codeForTokenExchange(
  client_id: string,
  client_secret: string,
  code: string,
  grant_type = "authorization_code"
) {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code,
      grant_type,
    }),
  };

  const response = await fetch("https://www.strava.com/oauth/token", config);
  const data = await response.json();

  return data;
}

async function getAthleteStats(token_access: string, id_atleta: string) {
  const config = {
    headers: {
      Authorization: "Bearer " + token_access,
    },
  };

  const response = await fetch(
    `https://www.strava.com/api/v3/athletes/${id_atleta}/stats`,
    config
  );
  const data = await response.json();

  return data;
}

async function getAthleteActivies(token_access: string) {
  const config = {
    headers: {
      Authorization: "Bearer " + token_access,
    },
  };

  const response = await fetch(
    `https://www.strava.com/api/v3/athlete/activities`,
    config
  );
  const data = await response.json();

  return data;
}

type DecodedFit = {
  messages: Record<string, any>;
  errors: any[];
};

/**
 * Decodifica un file .fit restituendo il contenuto in formato JSON
 * @param filePath file .fit da decodificare
 * @returns contenuto del file .fit decodificato
 */
async function decodeFit(
  filePath: fs.PathOrFileDescriptor
): Promise<DecodedFit> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      const stream = Stream.fromBuffer(data);
      const decoder = new Decoder(stream);
      const fitData = decoder.read();
      if (err) {
        reject(err);
        return;
      }
      if (
        !fitData.hasOwnProperty("messages") ||
        !fitData.hasOwnProperty("errors")
      ) {
        reject("Errore nella lettura del file FIT");
        return;
      }
      const { messages, errors } = fitData as {
        messages: Record<string, any>;
        errors: any[];
      };
      resolve({ messages, errors });
    });
  });
}

export { codeForTokenExchange, getAthleteStats, getAthleteActivies, decodeFit };
