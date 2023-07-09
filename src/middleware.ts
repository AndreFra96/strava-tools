import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  //se la richiesta è per una pagina che richiede una sessione attiva
  //e non è presente un cookie di sessione valido reindirizzo alla pagina di login
  if (pathName.startsWith("/user") && !hasValidSession(request))
    return NextResponse.redirect(new URL("/", request.url));
}

/**
 * Controlla se all'interno della richiesta è presente un cookie di sessione valido
 * @param request richiesta http in ingresso
 * @returns true se la sessione è valida, false altrimenti
 */
function hasValidSession(request: NextRequest): boolean {
  const cookiesStorage = request.cookies;

  const stravaSession = cookiesStorage.get("strava_session");

  if (!stravaSession || !stravaSession.value) return false;

  //TODO: qui dobbiamo aggiungere ulteriori controlli sul token!

  return true;
}
