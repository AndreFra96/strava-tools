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

async function getAthleteActivities(token_access: string) {
  const config = {
    headers: {
      Authorization: "Bearer " + token_access,
    },
  };

  const response = await fetch(
    `${process.env.STRAVA_BASE_URL}/athlete/activities`,
    config
  );
  const data = await response.json();

  return data;
}

export { codeForTokenExchange, getAthleteStats, getAthleteActivities };
