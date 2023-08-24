import { AthleteActivity, isAthleteActivity } from "./models/athleteActivity";
import { ActivityStats, isActivityStats } from "./models/activityStats";
import { ActivityStream, isActivityStream } from "./models/activityStream";

const streamTypes = [
  "time",
  "latlng",
  "distance",
  "altitude",
  "velocity_smooth",
  "heartrate",
  "cadence",
  "watts",
  "temp",
  "moving",
  "grade_smooth",
] as const;

type StreamType = (typeof streamTypes)[number];

//Effettua una richiesta alla API di Strava per ottenere tutti i tipi di stream di un'attività
async function getActivityStream(
  access_token: string,
  activity_id: string,
  keys: StreamType[] = ["distance"]
): Promise<ActivityStream> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_STRAVA_BASE_URL}/activities/${activity_id}/streams`
  );
  url.searchParams.set("keys", keys.join(","));
  url.searchParams.set("key_by_type", "true");
  url.searchParams.set("resolution", "high");

  const config = {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  };
  //Response is a stream
  const response = await fetch(url, config);

  //Read the stream
  const data = await response.json();

  if (!isActivityStream(data)) {
    throw new Error("Invalid activity stream");
  }

  return data;
}

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
    `${process.env.NEXT_PUBLIC_STRAVA_BASE_URL}/athletes/${id_atleta}/stats`,
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
  const url = new URL(
    `${process.env.NEXT_PUBLIC_STRAVA_BASE_URL}/athlete/activities`
  );
  url.searchParams.set("page", options.page.toString());
  url.searchParams.set("per_page", options.per_page.toString());

  const config = {
    headers: {
      Authorization: "Bearer " + token_access,
    },
  };
  const response = await fetch(url, config);

  const data = await response.json();

  if (!Array.isArray(data)) return [];

  data.forEach((activity) => {
    if (!isAthleteActivity(activity))
      throw new Error("Invalid activity", activity);
  });

  return data as AthleteActivity[];
}

export {
  codeForTokenExchange,
  getAthleteStats,
  getAthleteActivities,
  getActivityStream,
};
