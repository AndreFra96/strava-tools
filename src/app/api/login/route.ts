import { url } from "inspector";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  if (!process.env.STRAVA_CLIENT_ID || !process.env.STRAVA_REDIRECT_URI) {
    //non dovrebbe essere process.env.STRAVA_CLIENT_SECRET?
    return NextResponse.json({ error: "ClientID e ClientSecret no present" });
  }

  const stravaURL = new URL("https://www.strava.com/oauth/authorize");
  stravaURL.searchParams.set("client_id", process.env.STRAVA_CLIENT_ID);
  stravaURL.searchParams.set("response_type", "code");
  stravaURL.searchParams.set("redirect_uri", process.env.STRAVA_REDIRECT_URI);
  stravaURL.searchParams.set("scope", "activity:read_all,activity:write");

  return NextResponse.redirect(stravaURL);
}
