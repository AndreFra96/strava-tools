import { codeForTokenExchange } from "@/functions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { code: string } }
) {
  if (!process.env.STRAVA_CLIENT_ID || !process.env.STRAVA_CLIENT_SECRET) {
    return NextResponse.json({
      error: "STRAVA_CLIENT_ID or STRAVA_CLIENT_SECRET not set",
    });
  }
  const response = await codeForTokenExchange(
    process.env.STRAVA_CLIENT_ID,
    process.env.STRAVA_CLIENT_SECRET,
    context.params.code
  );
  return NextResponse.json(response);
}
