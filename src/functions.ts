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

async function getAthleteStats(token_access: string, id_atleta: number) {
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

  return data;
}

async function getAthleteActivies(token_access: string) {
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

export { codeForTokenExchange, getAthleteStats, getAthleteActivies };
