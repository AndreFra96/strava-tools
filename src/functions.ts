import { AthleteActivity, isAthleteActivity } from "./models/athleteActivity";
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

type ActivityOptions = {
  page: number;
  per_page: number;
};

/**
 * NOTE: attenzione a come viene costruita la stringa URL, da rivedere
 * @param token_access
 * @returns
 */
async function getAthleteActivities(
  token_access: string,
  options: ActivityOptions = { page: 1, per_page: 10 }
): Promise<AthleteActivity[]> {
  const url = new URL(`${process.env.STRAVA_BASE_URL}/athlete/activities`);
  url.searchParams.set("page", options.page.toString());
  url.searchParams.set("per_page", options.per_page.toString());

  const config = {
    headers: {
      Authorization: "Bearer " + token_access,
    },
  };
  const response = await fetch(url, config);

  console.log(`sono qua! ${response.url}`);

  const data = await response.json();

  if (!Array.isArray(data)) return [];

  data.forEach((activity) => {
    if (!isAthleteActivity(activity))
      throw new Error("Invalid activity", activity);
  });

  return data as AthleteActivity[];
}

export { codeForTokenExchange, getAthleteStats, getAthleteActivities };
