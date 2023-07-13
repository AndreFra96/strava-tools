import { url } from "inspector";
import { cookies } from "next/dist/client/components/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookie = cookies().get("strava_session");

  if (!cookie || !cookie.value)
    return NextResponse.json({ error: "nessuna sessione attiva" });

  return NextResponse.json({ session: cookie.value });
}
