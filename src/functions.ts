import { AthleteActivity } from "./models/athleteActivity";
import { ActivityStats, isActivityStats } from "./models/activityStats";

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

/**
 * Restituisce le statistiche sulle attività di un atleta
 *
 * @see https://developers.strava.com/docs/reference/#api-Athletes-getStats
 * @param token_access token di accesso
 * @param id_atleta id dell'atleta
 * @returns statistiche delle attività dell'atleta
 */
async function getAthleteStats(
  token_access: string,
  id_atleta: number
): Promise<ActivityStats> {
  const config = {
    headers: {
      Authorization: "Bearer " + token_access,
    },
  };

  const response = await fetch(
    `${process.env.STRAVA_BASE_URL}/athletes/${id_atleta}/stats`,
    config
  );
  const data = await response.json();

  if (!isActivityStats(data)) throw new Error("Invalid activity stats", data);

  return data;
}


/**
 * NOTE: attenzione a come viene costruita la stringa URL, da rivedere
 * @param token_access 
 * @returns 
 */
async function getAthleteActivities(token_access: string): Promise<AthleteActivity> {
  const opts = {
    before: "56",
    after: "56",
    page: "56",
    per_page: "56",
  }
  const config = {
    headers: {
      Authorization: "Bearer " + token_access,
    },
  };

  const response = await fetch(
    `${process.env.STRAVA_BASE_URL}/athlete/activities/${JSON.stringify(opts)}`,
    config
  );
  const data = await response.json();

  return data;
}

export { codeForTokenExchange, getAthleteStats, getAthleteActivities };
