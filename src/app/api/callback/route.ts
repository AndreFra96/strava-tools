import { codeForTokenExchange } from "@/functions";
import { cookies } from "next/dist/client/components/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const callBackURL = new URL(request.url);
  const code = callBackURL.searchParams.get("code");

  if (!code) return NextResponse.redirect("http://localhost:3000/"); //return NextResponse.json({'error':'Invalid code'})

  if (!process.env.STRAVA_CLIENT_ID || !process.env.STRAVA_CLIENT_SECRET)
    return NextResponse.json({ error: "Invalid clientId e clientSecret" });

  const tokenResponse = await codeForTokenExchange(
    process.env.STRAVA_CLIENT_ID,
    process.env.STRAVA_CLIENT_SECRET,
    code
  );

  cookies().set("strava_session", JSON.stringify(tokenResponse));

  const baseURL = new URL("/user", request.url);
  return NextResponse.redirect(baseURL);
}
