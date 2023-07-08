import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookiesStorage = request.cookies;

  const stravaSession = cookiesStorage.get("strava_session");

  //se il cookie non è valido o non esiste allora reindirizzo alla pagina di login
  if (!stravaSession || !stravaSession.value) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //TODO: qui dobbiamo aggiungere ulteriori controlli sul token

  return NextResponse.next();
}

// Qui definiamo le pagine che vogliamo proteggere
export const config = {
  matcher: "/user/:path*",
};
