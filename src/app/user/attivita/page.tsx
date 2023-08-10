import ActivitiesTable from "@/components/ActivitiesTable";
import { Session } from "@/models/session";
import { cookies } from "next/dist/client/components/headers";

export default async function Attivita() {

    const session: Session = getSession();

    return (
        <div>
            <h1>Attività</h1>
            <ActivitiesTable session={session} />
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
