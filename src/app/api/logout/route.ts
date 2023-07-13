import { url } from "inspector";
import { cookies } from "next/dist/client/components/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookie = cookies().delete("strava_session");

  const baseURL = new URL("/", request.url);

  return NextResponse.redirect(baseURL);
}
