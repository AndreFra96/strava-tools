import ActivitiesTable from "@/components/TableActivities";
import { getAthleteActivies, getAthleteStats } from "@/functions";
import { ActivityStats } from "@/models/activityStats";
import { Session } from "@/models/session";
import { cookies } from "next/dist/client/components/headers";

export default async function Attivita() {

    const stats: ActivityStats = await getStats();
    const activities = await getActivies();

    return (
        <div>
            <ActivitiesTable activities={activities} />
        </div>
    )
}

/**
 * Restituisce la sessione attiva
 * 
 * TODO: questa funzione dovrebbe essere spostata in un file a parte, in modo da poterla riutilizzare
 */
function getSession(): Session {

    //possiamo usare l'operatore '!' perche è giò stato verificato che il cookie esista all'interno del middleware
    const session = cookies().get('strava_session')!.value;

    //possiamo usare l'operatore 'as' perchè è già stato verificato che la sessione sia valida all'interno del middleware
    const parsed = JSON.parse(session) as Session;

    return parsed;
}

async function getStats(): Promise<ActivityStats> {

    const session = getSession();

    return await getAthleteStats(session.access_token, session.athlete.id)

}

async function getActivies() {

    const session = getSession();

    return await getAthleteActivies(session.access_token)

}