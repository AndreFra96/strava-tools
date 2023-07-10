import { getAthleteActivies, getAthleteStats } from "@/functions";
import { Session } from "@/models/session";
import { cookies } from "next/dist/client/components/headers";

export default async function Attivita() {

    const stats = await getStats();
    const activies = await getActivies();

    return (
        <div>
            {/* <div id="back_button_container">            
                <button onClick={() => {location.href="/user/"}}>Home</button>             
            </div>  */}
            {/* {JSON.stringify(stats)} */}

            <a href="/user/">Home</a>
            <table style={{ border: "1px solid black" }}>
                {
                    activies.map((item: any) => {
                        return <tr key={item}>
                            <td>{item.name}</td>
                            <td>{item.distance}</td>
                        </tr>
                    })
                }
            </table>


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

async function getStats() {

    const session = getSession();

    return await getAthleteStats(session.access_token, session.athlete.id)

}

async function getActivies() {

    const session = getSession();

    return await getAthleteActivies(session.access_token)

}