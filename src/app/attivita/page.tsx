import { getAthleteStats } from "@/functions";
import { cookies } from "next/dist/client/components/headers";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default async function Attivita() {

    const stats = await getStats();

    return (
        <div>{JSON.stringify(stats)}</div>
    )
}

async function getStats(){

    const session_cookie = cookies().get('strava_session')

    if(!session_cookie || !session_cookie.value)
        return {'error': 'nessuna sessione attiva'};

    const session_data = JSON.parse(session_cookie.value)

    return await getAthleteStats(session_data.access_token, session_data.athlete.id)

}